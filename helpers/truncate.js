const { User } = require("../models");
const { User_bio } = require("../models");
const { User_history } = require("../models");

//
module.exports = {
  user: async () => {
    await User.destroy({ truncate: true, restartIdentity: true });
  },
  userBio: async () => {
    await User_bio.destroy({ truncate: true, restartIdentity: true });
  },
  userHistory: async () => {
    await User_history.destroy({ truncate: true, restartIdentity: true });
  },
  userBioDelete: async () => {
    await User_bio.destroy({ where: { id: 1 } });
  },
  userBioAdd: async () => {
    await User_bio.create({
      username: "userTest",
      bio: "Bio Test",
      user_id: 1,
    });
  },
};
