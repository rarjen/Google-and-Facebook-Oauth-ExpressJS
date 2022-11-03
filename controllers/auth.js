const { User } = require("../models");
const googleOauth2 = require("../utils/oauth/google");
const facebookOauth = require("../utils/oauth/facebook");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userType = require("../utils/oauth/enum");
const roles = require("../utils/roles");

module.exports = {
  google: async (req, res, next) => {
    try {
      const code = req.query.code;

      if (!code) {
        const url = googleOauth2.generateAuthURL();
        return res.redirect(url);
      }

      await googleOauth2.setCredentials(code);

      const { data } = await googleOauth2.getUserData();

      var userExist = await User.findOne({
        where: { email: data.email },
      });

      if (!userExist) {
        userExist = await User.create({
          name: data.name,
          email: data.email,
          user_type: userType.google,
          role: roles.user,
        });
      }

      const payload = {
        id: userExist.id,
        name: userExist.name,
        email: userExist.email,
        user_type: userExist.user_type,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);

      return res.status(200).json({
        status: true,
        message: "Success",
        data: {
          user_id: userExist.id,
          token: token,
        },
      });
      // res.send(token);

      // return res.redirect("home");
    } catch (error) {
      next(error);
    }
  },
  facebook: async (req, res, next) => {
    try {
      const code = req.query.code;

      if (!code) {
        const url = facebookOauth.generateAuthURL();

        return res.redirect(url);
      }

      // access token
      const accessToken = await facebookOauth.getAccessToken(code);

      // get user info
      const userInfo = await facebookOauth.getUserInfo(accessToken);

      // check apakah user email ada di db
      const userExist = await User.findOne({
        where: { email: userInfo.email },
      });

      // if !ada -> simpan data user
      if (!userExist) {
        userExist = await User.create({
          name: [userInfo.first_name, userInfo.last_name].join(" "),
          email: userInfo.email,
          user_type: userType.facebook,
          role: roles.user,
        });
      }

      // generate token
      const payload = {
        id: userExist.id,
        name: userExist.name,
        email: userExist.email,
        user_type: userExist.user_type,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);

      return res.status(200).json({
        status: true,
        message: "Success",
        data: {
          user_id: userExist.id,
          token: token,
        },
      });
    } catch (error) {
      next(error);
      // console.log(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const userExist = await User.findOne({
        where: { email },
      });

      // if !ada -> simpan data user
      if (!userExist) {
        return res.status(400).json({
          status: false,
          mesage: "User Not Found!",
          data: null,
        });
      }

      if (userExist.user_type != userType.basic) {
        return res.status(400).json({
          status: false,
          mesage: `Your account is accociated with ${userExist.user_type} oauth`,
          data: null,
        });
      }

      //Check password
      //code here
      const valid = await bcrypt.compare(password, userExist.password);

      if (!valid) {
        return res.status(400).json({
          status: false,
          message: "Wrong Password!",
          data: null,
        });
      }

      const payload = {
        id: userExist.id,
        name: userExist.name,
        email: userExist.email,
        user_type: userExist.user_type,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);

      return res.status(200).json({
        status: true,
        message: "Success",
        data: {
          user_id: userExist.id,
          token: token,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  register: async (req, res, next) => {
    try {
      const {
        name,
        email,
        password,
        user_type = userType.basic,
        role = roles.user,
      } = req.body;

      const userExist = await User.findOne({
        where: { email: email },
      });

      // if !ada -> simpan data user
      if (userExist) {
        if (userExist.user_type != userType.basic) {
          return res.status(400).json({
            status: false,
            mesage: `Your account is accociated with ${userExist.user_type} oauth`,
            data: null,
          });
        }
        return res.status(400).json({
          status: false,
          mesage: "Email Already Used!",
          data: null,
        });
      }

      const hashed = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        name: name,
        email: email,
        password: hashed,
        user_type,
        role,
      });

      if (newUser.user_type === userType.basic) {
        return res.redirect("login/basic");
      } else {
        return res.status(201).json({
          status: true,
          message: "User Created!",
          data: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            user_type: newUser.user_type,
          },
        });
      }
    } catch (error) {
      next(error);
    }
  },
  registerPage: (req, res) => {
    res.render("auth/register");
  },
  loginPage: (req, res) => {
    res.render("auth/login");
  },
};
