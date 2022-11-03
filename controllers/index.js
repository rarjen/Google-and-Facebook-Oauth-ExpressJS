const auth = require("./auth");
const userBio = require("./userBio");
const userHistory = require("./userhistory");

module.exports = {
  exception: (err, req, res, next) => {
    res.render("server-error", { error: err.message });
  },
  notFound: (req, res, next) => {
    res.render("not-found");
  },
  auth,
  userBio,
  userHistory,
};
