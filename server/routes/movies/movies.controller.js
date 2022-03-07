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
    const savedMovie = await Movie.findOne({ where: { movieId }});
    if (savedMovie) {
      await savedMovie.addUser(res.locals.user);
      return res.json({ success: true, message: '즐겨찾기 추가 성공' });
    }

    const newSavedMovie = await Movie.create({ movieId, title, release_date, runtime });
    await newSavedMovie.addUser(res.locals.user);
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
    // 1. 있다면 => 사용자 정보와 함께 가져오기 (비밀번호 제외)
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
    // 1. 있다면 => 저장된 영화 정보에 댓글, 사용자 정보 추가
    // 2. 없다면 => 해당 영화 저장 및 댓글, 사용자 정보 추가
    const { movieId, title, runtime, release_date, comment } = req.body;
    const savedMovie = await Movie.findOne({ where: { movieId } });
    if (savedMovie) {
      const newComment = await Comment.create({
        commenter: res.locals.user.id,
        comment,
      });
      await newComment.addMovie(savedMovie);
      
      const newCommentWithUserInfo = await Comment.findOne({
        where: { id: newComment.id },
        include: {
          model: User, 
          required: true, 
          attributes: { exclude: ['password'] }
        }
      });
      return res.json({ success: true, comment: newCommentWithUserInfo });
    } 

    const newComment = await Comment.create({
      commenter: res.locals.user.id,
      comment,
      Movies: [{ movieId, title, runtime, release_date }],
    }, {
      include: [Movie]
    });

    const newCommentWithUserInfo = await Comment.findOne({
      where: { id: newComment.id },
      include: {
        model: User, 
        required: true, 
        attributes: { exclude: ['password'] }
      }
    });
    res.json({ success: true, comment: newCommentWithUserInfo });
  } catch (error) {
    console.error(error);	
  }
};

exports.removeComment = async (req, res) => {
  try {
    // db에 클라이언트로부터 전달받은 댓글 id와 일치하는 댓글이 있는가
    // 1. 있다면 => 해당 댓글과 영화의 관계 제거, 해당 댓글 삭제
    // 2. 없다면 => 댓글이 존재하지 않으므로 댓글 삭제 불가능. 에러 메시지 전달
    const comment = await Comment.findByPk(req.body.commentId);
    if (!comment) {
      return res.status(400).json({ success: false, message: '삭제하려는 댓글이 존재하지 않습니다.' });
    }

    await comment.removeMovies();
    await Comment.destroy({ where: { id: req.body.commentId } });
    res.json({ success: true, message: '댓글 삭제 성공' });
  } catch (error) {
    console.error(error);
  }
};