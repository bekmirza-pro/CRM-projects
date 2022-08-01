const sequelize = require("../sequelize/db");
const { sign, verify } = require('jsonwebtoken')
const { JWT_KEY } = require("../config/keys");
const { v4 } = require("uuid"); 
const { generateHash, compareHash } = require("../modules/bcrypt"); 

const { users, user_roles, user_sessions } = sequelize.models

module.exports = class UserController {

    static async Register(req, res, next) {
        try {
            const { body } = req

            const user = await users.findOne({
                where: {
                    tell: body.tell
                }
            })

            const passwordHesh = generateHash(body.password); 

            if (user) throw new res.error(400, "User already exist")

            const newUser = await users.create({
                username: body.username, 
                age: body.age, 
                tell: body.tell, 
                email: body.email, 
                password: passwordHesh
            })

            const roleUser = await user_roles.create({
                user_id: newUser.id,
                role_id: body.role_id
            })

            res.status(201).json({
                success: true,
                message: "User register successfully",
                data: {
                    user: newUser
                },
            });

        } catch (error) {
            next(error)
        }
    }

    static async Login (req, res, next) {
        try {
          const { body } = req; 

          const user = await users.findOne({
            where: { tell: body.tell },
            raw: true
          }) 

          if (!user) {
              res.status(400).json({
                  success: false,
                  message: "User doesn't exist!"
              })
          }

          const isTrust = compareHash(body.password, user.password); 

          if(!isTrust) throw new res.error(400, "Password is incorrect!")

        req.user = user;
        
        next()
      
        } catch (error) { 
            console.log(error);
          next(error)
        }
      }
      
      
    static async GenerateToken(req, res, next) {
        const {
            user,
        } = req;
        
        const tokenId = v4();

        const remoteIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const device = req.headers['user-agent'];


        const token = sign({
            token_id: tokenId,
            user_id: user.id,
        }, JWT_KEY)

        await user_sessions.create({
            user_id: user.id,
            token_id: tokenId,
            device: device,
            remote_ip: remoteIp,
        });

        res.status(201).json({
            success: true,
            message: "Token",
            data: {
                token: token, 
            },
        });

    };

    static async Logout(req, res, next) {
        try {
            const {
                user,
                decodedToken
            } = req;

            await user_sessions.update({
                is_logged_out: true,
                logged_out_at: new Date()
            }, {
                where: {
                    user_id: user.id,
                    token_id: decodedToken.token_id
                },
            });

            res.status(200).json({
                success: true
            });
        } catch (error) {
            next(error)
        }
    }; 

    static async GetAll(req, res, next) {
        try {
            const allUsers = await users.findAll({
                attributes: {
                    exclude: ["created_at", "updated_at"]
                }
            })
            
            res.status(200).json({
                success: true,
                data: {
                    users: allUsers
                }
            });

        } catch (error) {
            console.log(error);
            next(error)
        }
    };

    static async GetOne(req, res, next) {
        try {
            const { params } = req;
            
            const user = await users.findOne({
                where: {
                    id: params.id
                },
                // include: [
                //     {
                //         model: plan_lists
                //     }
                // ]
            });

            res.status(200).json({
                success: true,
                message: "user",
                data: {
                    user
                }
            })

        } catch (error) {
            next(error)
        }
    }

    static async UpdateUser(req, res, next) {
        try {
            
            const { params, body } = req;

            const isExist = await users.findOne({
                where: {
                    id: params.id
                }
            });

            if(!isExist) throw new res.error(400, "User is not found!");

            const passwordHesh = generateHash(body.password); 

            const updated_user = await users.update({
                username: body.username,
                age: body.age,
                tell:body.tell,
                password:passwordHesh
            }, {
                where: {
                    id: params.id
                },
                returning: true
            });

            res.status(200).json({
                success: true,
                message: "Succesfully updated!",
                data: {
                    user: updated_user
                }
            })
        } catch (error) {
            next(error)
        }
    };

    static async DeleteUser(req, res, next) {
        try {
            const { params } = req;

            const isExist = await users.findOne({
                where: {
                    id: params.id
                }
            });

            if(!isExist) throw new res.error(400, "User is not found!");

            // await plan_lists.destroy({
            //     where: {
            //         plan_id: params.id
            //     }
            // })

            await user_sessions.destroy({
                where: {
                    user_id: params.id
                }
            });

            await users.destroy({
                where: {
                    id: params.id
                }
            });

            res.status(200).json({
                success: true,
                message: "User was deleted succesfully!"
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }


 
}