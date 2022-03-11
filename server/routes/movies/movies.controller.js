const { Movie, User, Comment, Sequelize } = require('../../models');

exports.getFavoriteStatus = async (req, res) => {
  try {
    // db에 사용자 정보가 담긴 해당 영화 정보가 있는가
    // 1. 있다면 => 로그인 유저 정보로 즐겨찾기 여부 확인 
    // 2. 없다면 => 사용자 정보를 포함하지 않으므로 즐겨찾기 상태 아님
    console.log(req.query);
    const movieWithUserInfo = await Movie.findOne({
      where: { movieId: req.query.movieId },
      include: { model: User, required: true }
    });
    if (!movieWithUserInfo) {
      return res.json({ success: false, message: '즐겨찾기 되지 않은 영화입니다.' });
    }

    const favoredUsers = movieWithUserInfo.Users;
    favoredUsers.forEach(user => {
      if (user.id === res.locals.user.id) {
        res.json({ success: true, message: '즐겨찾기된 영화입니다.' });
      } else {
        res.json({ success: false, message: '즐겨찾기 되지 않은 영화입니다.' });
      }
    });
  } catch (error) {
    console.error(error);
  }
};

exports.getFavoriteMovies = async (req, res) => {
  try {
    // 로그인 유저가 즐겨찾기한 영화가 있는가
    // 1. 있다면 => 로그인 유저가 즐겨찾기한 영화 리스트만 추출
    // 2. 없다면 => 즐겨찾기된 영화 없음 
    const favoriteMovies = await res.locals.user.getMovies();
    if (!favoriteMovies) {
      return res.json({ success: false, message: '즐겨찾기된 영화가 없습니다.' });
    }
    res.json({ success: true, favoriteMovies });
  } catch (error) {
    console.error(error);
  }
};

exports.addFavorite = async (req, res) => {
  try {
    // db에 영화 정보가 저장되어 있는가
    // 1. 있다면 => 그 정보에 즐겨찾기만 추가
    // 2. 없다면 => 영화 정보 새로 저장, 즐겨찾기 추가
    const { movieId, title, release_date, runtime } = req.body;
    const [movie] = await Movie.findOrCreate({
      where: { movieId },
      defaults: { movieId, title, release_date, runtime },
    });

    await movie.addUser(res.locals.user);
    res.json({ success: true, message: '즐겨찾기 추가 성공' });
  } catch (error) {
    console.error(error);
  }
};

exports.removeFavorite = async (req, res) => {
  try {
    const { movieId } = req.body;
    const movie = await Movie.findOne({ where: { movieId } });
    if (!movie) {
      return res.status(400).json({ success: false, message: '해당 영화 정보가 없습니다.' });
    }

    await movie.removeUser(res.locals.user);
    const favoriteMovies = await res.locals.user.getMovies();
    res.json({ success: true, message: '즐겨찾기 제거 성공', favoriteMovies });
  } catch (error) {
    console.error(error);
  }
};

exports.getComments = async (req, res) => {
  try {
    // db에서 해당 영화 정보가 저장되어 있고, 댓글이 존재하는가
    // 1. 있다면 => 사용자 정보와 함께 가져오기 (비밀번호 제외), 대댓글 정보도 댓글과 똑같은 형태로 가져오기
    // 2. 없다면 => 가져올 댓글 없음
    const commentsWithUserInfoAboutMovie = await Comment.findAll({
      attributes: {
        include: [
          [Sequelize.fn('DATE_FORMAT', Sequelize.col('Comment.createdAt'), '%Y-%m-%d %H:%i:%s'), 'createdAt'],
        ],
      },
      include: [
        {
          model: Movie,
          where: { movieId: req.query.movieId },
          through: { attributes: [] }
        },
        {
          model: User,
          required: true,
          attributes: { exclude: ['password'] }
        },
        {
          model: Comment,
          as: 'replies',
          attributes: {
            include: [
              [Sequelize.fn('DATE_FORMAT', Sequelize.col('Comment.createdAt'), '%Y-%m-%d %H:%i:%s'), 'createdAt'],
            ],
          },
          include: {
            model: User,
            required: true,
            attributes: { exclude: ['password'] },
          },
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    if (!commentsWithUserInfoAboutMovie) {
      return res.json({ success: false, message: '해당 영화에 대한 댓글이 없습니다.' });
    }

    res.json({ success: true, comments: commentsWithUserInfoAboutMovie });
  } catch (error) {
    console.error(error);
  }
};

exports.addComment = async (req, res) => {
  try {
    // db에 해당 영화 정보가 저장되어 있는가
    // 1. 있다면 => 저장된 영화 정보에 댓글, 사용자 정보 추가 => 대댓글과 사용자 정보가 포함된 댓글 가져오기
    // 2. 없다면 => 해당 영화 저장 및 댓글, 사용자 정보 추가
    const { movieId, title, runtime, release_date, comment } = req.body;
    const [movie] = await Movie.findOrCreate({
      where: { movieId },
      defaults: { movieId, title, runtime, release_date },
    });

    const newComment = await Comment.create({
      commenter: res.locals.user.id,
      comment
    });
    await newComment.addMovie(movie);

    const newCommentWithUserInfo = await Comment.findByPk(newComment.id, {
      attributes: {
        include: [
          [Sequelize.fn('DATE_FORMAT', Sequelize.col('Comment.createdAt'), '%Y-%m-%d %H:%i:%s'), 'createdAt'],
        ],
      },
      include: [
        {
          model: User,
          required: true,
          attributes: { exclude: ['password'] },
        },
        {
          model: Comment,
          as: 'replies',
        },
      ],
    });
    res.json({ success: true, comment: newCommentWithUserInfo });
  } catch (error) {
    console.error(error);	
  }
};

exports.removeComment = async (req, res) => {
  try {
    // db에 클라이언트로부터 전달받은 댓글 id와 일치하는 댓글이 있는가
    // 1. 있다면 => 해당 댓글 및 댓글에 포함된 대댓글 모두 삭제
    // 2. 없다면 => 댓글이 존재하지 않으므로 댓글 삭제 불가능. 에러 메시지 전달
    const comment = await Comment.findByPk(req.body.commentId, {
      include: 'replies',
    });
    if (!comment) {
      return res.status(400).json({ success: false, message: '삭제하려는 댓글이 존재하지 않습니다.' });
    }

    if (comment.replies.length) {
      const replyCommentIds = [];
      comment.replies.forEach(reply => {
        replyCommentIds.push(reply.id);
      });
      await Comment.destroy({ where: { id: replyCommentIds }});
    }
    await Comment.destroy({ where: { id: req.body.commentId } });
    res.json({ success: true, message: '댓글 삭제 성공' });
  } catch (error) {
    console.error(error);
  }
};

exports.likeComment = async (req, res) => {
  try {
    // db에 클라이언트로부터 전달받은 댓글 id와 일치하는 댓글 찾기
    // 1. 댓글이 있다면 => 댓글에 좋아요 표시한 사용자 정보 관계 추가
    // 2. 없다면 => 댓글이 없으므로 좋아요 추가 불가능. 에러메세지 전달
    const comment = await Comment.findByPk(req.body.commentId);
    if (!comment) {
      return res.status(400).json({ success: false, message: '해당 댓글이 존재하지 않습니다.' });
    }

    await comment.addLiker(res.locals.user.id);
    return res.json({ success: true, message: '댓글 좋아요 추가 성공' });
  } catch (error) {
    console.error(error);
  }
};

exports.unlikeComment = async (req, res) => {
  try {
    // 클라이언트로 전달받은 댓글 id와 일치하는 댓글 db에서 찾기
    // 1. 댓글이 있다면 => 댓글과 좋아요 표시한 사용자 정보 관계 제거
    // 2. 없다면 => 댓글이 없으므로 좋아요 제거 불가능. 에러메세지 전달
    const comment = await Comment.findByPk(req.body.commentId);
    if (!comment) {
      return res.status(400).json({ success: false, message: '해당 댓글이 존재하지 않습니다.' });
    }

    await comment.removeLiker(res.locals.user.id);
    return res.json({ success: true, message: '댓글 좋아요 취소 성공' });
  } catch (error) {
    console.error(error);
  }
};

exports.getCommentLikeStatus = async (req, res) => {
  try {
    // db에 좋아요 여부 포함한 해당 댓글 가져오기
    // 1. 좋아요 없음 => 아무도 좋아요 누르지 않았으므로 가져올 좋아요 상태 없음
    // 2. 좋아요 있음 => 로그인 유저의 좋아요 여부 체크 => 있으면 true, 없으면 false
    const commentWithLikers = await Comment.findByPk(req.query.commentId, {
      include: 'likers',
    });

    if (!commentWithLikers.likers.length) {
      return res.json({ success: false, message: '해당 댓글을 사용자가 좋아하지 않습니다.' });
    }

    commentWithLikers.likers.forEach(liker => {
      if (liker.id === res.locals.user.id) {
        res.json({ success: true, message: '해당 댓글을 사용자가 좋아합니다.' });
      } else {
        res.json({ success: false, message: '해당 댓글을 사용자가 좋아하지 않습니다.' });
      }
    });
  } catch (error) {
    console.error(error);
  }
};

exports.getCommentLikers = async (req, res) => {
  try {
    const commentWithLikers = await Comment.findByPk(req.query.commentId, {
      include: 'likers',
    });

    if (!commentWithLikers.likers.length) {
      return res.json({ success: true, likerCount: 0 });
    }

    res.json({ success: true, likerCount: commentWithLikers.likers.length });
  } catch (error) {
    console.error(error);
  }
};

exports.addReplyComment = async (req, res) => {
  // db에 해당 댓글이 있는가
  // 1. 있다면 => 대댓글 생성 및 기존 댓글과의 관계 추가 => 사용자 정보를 포함하는 대댓글 가져오기
  // 2. 없다면 => 댓글이 존재하지 않으므로 대댓글 작성 불가능. 에러메세지 전달
  try {
    const comment = await Comment.findByPk(req.body.commentId);
    if (!comment) {
      return res.status(400).json({ success: false, message: '해당 댓글이 존재하지 않습니다.' });
    }
  
    const newReplyComment = await Comment.create({
      commenter: res.locals.user.id,
      comment: req.body.replyComment,
    });
    await newReplyComment.addOriginalComment(req.body.commentId);

    const newReplyCommentWithUserInfo = await Comment.findByPk(newReplyComment.id, {
      attributes: {
        include: [
          [Sequelize.fn('DATE_FORMAT', Sequelize.col('Comment.createdAt'), '%Y-%m-%d %H:%i:%s'), 'createdAt'],
        ],
      },
      include: {
        model: User,
        required: true,
        attributes: { exclude: ['password'] },
      },
    });
    res.json({ success: true, replyComment: newReplyCommentWithUserInfo });
  } catch (error) {
    console.error(error);
  }
};

exports.removeReplyComment = async (req, res) => {
  // db에 해당 대댓글이 있는가
  // 1. 있다면 => 대댓글 삭제
  // 2. 없다면 => 삭제할 대댓글이 존재하지 않으므로 에러메세지 전달
  try {
    const replyComment = await Comment.findByPk(req.body.replyCommentId);
    if (!replyComment) {
      return res.status(400).json({ success: false, message: '해당 댓글이 존재하지 않습니다.' });
    }

    await Comment.destroy({ where: { id: req.body.replyCommentId }});
    res.json({ success: true, message: '대댓글 삭제 성공' });
  } catch (error) {
    console.error(error);
  }
};