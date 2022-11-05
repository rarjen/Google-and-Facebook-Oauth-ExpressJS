const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = process.env;

module.exports = {
  authorize: (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
      return res
        .status(401)
        .json({ status: false, message: "you're not authorized!" });
    }

    const payload = jwt.verify(token, JWT_SECRET_KEY);
    req.user = payload;
    next();
  },
};
