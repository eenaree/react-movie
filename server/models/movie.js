const { DataTypes, Model } = require('sequelize');

class Movie extends Model {
  static init(sequelize) {
    return super.init(
      {
        movieId: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        runtime: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        release_date: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Movie',
        tableName: 'movies',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    this.belongsToMany(db.User, { through: 'FavoriteMovies' });
    this.belongsToMany(db.Comment, { through: 'MovieComments' });
  }
}

module.exports = Movie;