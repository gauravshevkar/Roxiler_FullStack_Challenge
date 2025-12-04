const app = require("./app");
const sequelize = require("./config/db");

require("./models/User.model");
require("./models/Store.model");
require("./models/Rating.model");

const PORT = process.env.PORT || 5000;

sequelize
  .authenticate()
  .then(() => {
    console.log("MySQL Connected!");
    return sequelize.sync();

  })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch((err) => console.log("DB Error:", err));
