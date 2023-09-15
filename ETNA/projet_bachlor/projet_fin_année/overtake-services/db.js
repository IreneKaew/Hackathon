const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("postgres", "postgres", 'ààà"é!', {
  dialect: "postgres",
});

const connectionData = async () => {
  try {
    await sequelize.authenticate();
    console.log("Succesfully connected to DB");
  } catch (error) {
    console.error("Unable to connect to the DB", error);
  }
};

module.exports = { db: sequelize, connectionData };
