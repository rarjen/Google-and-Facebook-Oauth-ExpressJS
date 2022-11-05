const { Video } = require("../models");
const imagekit = require("../utils/media_handling/imagekit");

module.exports = {
  uploadVideo: async (req, res, next) => {
    try {
      const { title, description } = req.body;
      const file = req.file.buffer.toString("base64");

      const uploadedFile = await imagekit.upload({
        file,
        fileName: req.file.originalname,
      });

      const newVideo = await Video.create({
        title,
        description,
        video: uploadedFile.url,
      });

      return res.status(200).json({
        status: true,
        message: "Video Uploaded",
        data: newVideo,
      });
    } catch (error) {
      next(error);
    }
  },
  updateVideo: async (req, res, next) => {
    try {
      const { id } = req.params;
      const file = req.file.buffer.toString("base64");
      const { title, description } = req.body;

      const exist = await Video.findOne({ where: { id: id } });
      if (!exist) {
        return res.status(400).json({
          status: true,
          message: "Video Not Found",
          data: null,
        });
      }

      const uploadedFile = await imagekit.upload({
        file,
        fileName: req.file.originalname,
      });

      const videoUpdate = await Video.update(
        {
          title: title,
          description: description,
          video: uploadedFile.url,
        },
        { where: { id: id } }
      );

      return res.status(200).json({
        status: true,
        message: "Video Updated",
        data: videoUpdate,
      });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  },
  deleteVideo: async (req, res, next) => {
    try {
      const { id } = req.params;

      const exist = await Video.findOne({ where: { id } });
      if (!exist) {
        return res.status(400).json({
          status: false,
          message: "Video doesn't exist",
          data: null,
        });
      }

      const deleteVideo = await Video.destroy({ where: { id } });
      return res.status(200).json({
        status: true,
        message: "Delete User Success",
        data: deleteVideo,
      });
    } catch (error) {
      next(error);
    }
  },

  showVideo: async (req, res, next) => {
    try {
      const show = await Video.findAll();

      return res.status(200).json({
        status: true,
        message: "Success Get All Data",
        data: show,
      });
    } catch (error) {
      next(error);
    }
  },
};
