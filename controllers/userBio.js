const { User_bio } = require("../models");
const imagekit = require("../utils/media_handling/imagekit");

module.exports = {
  createPage: async (req, res, next) => {
    try {
      return res.render("userBio/createBio");
    } catch (error) {
      next(error);
    }
  },
  create: async (req, res, next) => {
    try {
      const user = req.user;
      const file = req.file.buffer.toString("base64");
      const { bio } = req.body;

      const exist = await User_bio.findOne({
        where: { user_id: user.id },
      });

      if (exist) {
        return res.status(400).json({
          status: false,
          mesage: "ALready Created a bio",
          data: null,
        });
      }

      const uploadedFile = await imagekit.upload({
        file,
        fileName: req.file.originalname,
      });

      const userBio = await User_bio.create({
        avatar: uploadedFile.url,
        file_name: uploadedFile.name,
        email: user.email,
        bio,
        user_id: user.id,
      });

      return res.status(200).json({
        status: true,
        message: "Bio Created",
        data: userBio,
      });
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const user = req.user;
      const file = req.file.buffer.toString("base64");
      const { bio } = req.body;

      const exist = await User_bio.findOne({
        where: { user_id: user.id },
      });

      if (!exist) {
        return res.status(400).json({
          status: false,
          mesage: "Create Bio First",
          data: null,
        });
      }

      const uploadedFile = await imagekit.upload({
        file,
        fileName: req.file.originalname,
      });

      const userBio = await User_bio.update(
        {
          avatar: uploadedFile.url,
          file_name: uploadedFile.name,
          bio,
        },
        { where: { user_id: user.id } }
      );

      return res.status(200).json({
        status: true,
        message: "Bio Updated",
        data: userBio,
      });
    } catch (error) {
      next(error);
    }
  },
};
