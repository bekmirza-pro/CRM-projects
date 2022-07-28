const {
  verify
} = require("jsonwebtoken")
const {
  JWT_KEY
} = require("../../config/keys")
const ErrorResponse = require("../../utils/errorResponse")

const { Op } = require("sequelize");

const {
  models: {
    users,
    user_sessions,
  }
} = require("../../sequelize/db");

const protect = async (req, res, next) => {
  try {
    let authToken = ""

    const authorization = req.headers.authorization

    if (authorization && authorization.startsWith("Bearer ")) {
      authToken = authorization.split(" ")[1];
    }
    if (!authToken) throw new res.error(401, "Please login in to get access")

    const decodedToken = verify(authToken, JWT_KEY);

    if(!decodedToken) throw new res.error(400, "Unauthorized!")

    const user = await users.findByPk(decodedToken.user_id, {
      attributes: ["id"],
      raw: true
    })

    if (!user) throw new res.error(401, "User does not exist")

    const session = await user_sessions.findOne({
      where: {
        token_id: decodedToken.token_id
      }
    });

    if (session.is_logged_out) {
      throw new res.error(401, 'You are not logged in! Please log in to get access.')
    }

    req.user = user;
    req.session = session;
    req.decodedToken = decodedToken;

    next()

  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unathorized!"
    })
    return
  }
}

module.exports = protect