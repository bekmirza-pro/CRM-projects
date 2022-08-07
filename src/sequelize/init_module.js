const sequelize = require("./db");
const { roles, modules } = sequelize.models;
// const { generateHash } = require("../../src/modules/bcrypt");

const admin_modules_data = [
  "get_all_users",
  "get_user", 
  "delete_user", 

  "get_all_unverified_users",
  "verify_user",

  "ban_user", 
  "get_roles",

  "create_category",
  "update_category",
  "delete_category",

  "get_all_tags",
  "create_tag",
  "delete_tag",
  "add_tag",
]

module.exports = async () => {
  const role_count = await roles.count();
  if (role_count == 0) {
    const roleArr = [
      { name: "admin", description: "Admin role ok" },
      { name: "teacher", description: "Teacher role ok" },
      { name: "student", description: "Student role ok" },
    ];

    for await (let i of roleArr) {
      const role = await roles.create({
        name: i.name.toLowerCase(),
        description: i.description,
      })
    }
  }

  const modulesCount = await modules.count();

  if (modulesCount == 0) {

      // admin modules

      const admin = await roles.findOne({
          where: {
              name: "admin"
          },
          raw: true
      })

      admin_modules_data.forEach(async e => {
          let amodule = await modules.create({
              name: e,
              role_id: admin.id
          })
      })

    }

};

