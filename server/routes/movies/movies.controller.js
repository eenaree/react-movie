const { Movie, User } = require('../../models');

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