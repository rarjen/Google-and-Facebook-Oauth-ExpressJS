const auth = require("./auth");
// const user_bio = require("./user_bio");
// const user_history = require("./user_history");

module.exports = {
  exception: (err, req, res, next) => {
    res.render("server-error", { error: err.message });
  },
  notFound: (req, res, next) => {
    res.render("not-found");
  },
  auth,
  // user_bio,
  // user_history,
};
