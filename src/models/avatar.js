'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Avatar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Avatar.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    data: 
    {
      type: DataTypes.JSON,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('now')
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('now')
    },
  }, {
    sequelize,
    modelName: 'Avatar',
    timestamps: false
  });
  return Avatar;
};