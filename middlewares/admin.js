const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = process.env;
const Roles = require("../utils/roles");

module.exports = {
  authorize: (req, res, next) => {
    try {
      const token = req.headers["authorization"];
      if (!token) {
        return res
          .status(401)
          .json({ status: false, message: "you're not authorized!" });
      }

      const payload = jwt.verify(token, JWT_SECRET_KEY);
      req.user = payload;

      if (payload.role != Roles.admin) {
        return res.status(401).json({
          status: false,
          message: "you're not Admin",
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  },
};
