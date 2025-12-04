const User = require("./User.model");
const Store = require("./Store.model");
const Rating = require("./Rating.model");

// USER  STORE
User.hasMany(Store, {
  foreignKey: "ownerId",
  as: "stores",
});

Store.belongsTo(User, {
  foreignKey: "ownerId",
  as: "owner",
});

// STORE  RATING
Store.hasMany(Rating, {
  foreignKey: "storeId",
  as: "ratings", 
});

Rating.belongsTo(Store, {
  foreignKey: "storeId",
  as: "store",
});

// USER RATING
User.hasMany(Rating, {
  foreignKey: "userId",
  as: "userRatings",
});

Rating.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

module.exports = { User, Store, Rating };
