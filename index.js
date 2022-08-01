const http = require('http');
const sequelize = require("./src/sequelize/db");
const app = require("./src/server")
const init = require("./src/sequelize/init_module")

; (async () => {
  try {
    await sequelize.sync({ force: false });

    await init()
  } catch (error) {
    console.log(error);
  }
})()

const server = http.createServer(app);

// _________LISTEN PORT___________
const port = process.env.PORT || 5000

server.listen(port, () => console.log("Listening port on " + port))
