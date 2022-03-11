const { DataTypes, Model } = require('sequelize');

class Comment extends Model {
  static init(sequelize) {
    return super.init(
      {
        comment: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Comment',
        tableName: 'comments',
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: true,
      },
    );
  }

  static associate(db) {
    this.belongsToMany(db.Movie, { through: 'MovieComments' });
    this.belongsTo(db.User, { foreignKey: 'commenter' });
    this.belongsToMany(db.User, { through: 'LikeComments', as: 'likers' });
    this.belongsToMany(db.Comment, { through: 'ReplyComments', as: 'replies', foreignKey: 'replyId' });
    this.belongsToMany(db.Comment, { through: 'ReplyComments', as: 'originalComments', foreignKey: 'originalCommentId' });
  }
}

module.exports = Comment;