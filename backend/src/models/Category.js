const { Model, DataTypes } = require('sequelize');

class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Product);
  }
}

module.exports = Category;