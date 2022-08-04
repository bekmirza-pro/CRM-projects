const sequelize = require("./db");
const { roles } = sequelize.models;
// const { generateHash } = require("../../src/modules/bcrypt");

module.exports = async () => {
  const role_count = await roles.count();
  if (role_count == 0) {
    const roleArr = [
      { name: "admin", description: "Admin role ok" },
      { name: "student", description: "Student role ok" },
    ];

    for await (let i of roleArr) {
      const role = await roles.create({
        name: i.name.toLowerCase(),
        description: i.description,
      })
    }
  }

};

