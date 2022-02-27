const { Movie } = require('../../models');

exports.getFavoriteStatus = async (req, res) => {
  try {
    // db에 해당 영화 정보가 있는가
    // 1. 있다면 => 즐겨찾기 여부 확인 
    // 2. 없다면 => 영화 정보가 저장되어 있지 않으므로 즐겨찾기 여부도 확인할 수 없음
    console.log(req.query);
    const savedMovie = await Movie.findOne({ where: { movieId: req.query.movieId }});
    if (!savedMovie) {
      return res.json({ success: false, message: '즐겨찾기 되지 않은 영화입니다.' });
    }

    const favoredUsers = await savedMovie.getUsers();
    favoredUsers.map(user => {
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
    res.json({ success: true, message: '즐겨찾기 제거 성공' });
  } catch (error) {
    console.error(error);
  }
};