const { Model, DataTypes } = require('sequelize');

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        date: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        quantityByProduct: {
          type: DataTypes.ARRAY(DataTypes.JSON),
          allowNull: false,
        },
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { as: 'buyer', foreignKey: 'buyer_id' });
    this.belongsTo(models.Company, { as: 'company', foreignKey: 'company_id' });
    this.belongsTo(models.PaymentMethod, {
      as: 'paymentMethod',
      foreignKey: 'payment_method_id',
    });
  }
}

module.exports = Order;
