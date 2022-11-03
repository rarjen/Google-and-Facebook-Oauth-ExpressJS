const { User_history } = require("../models");
const Roles = require("../utils/roles");
module.exports = {
  createScore: async (req, res, next) => {
    try {
      const user = req.user;
      const { score } = req.body;

      const createScore = await User_history.create({
        email: user.email,
        score,
        user_id: user.id,
      });

      return res.status(200).json({
        status: true,
        mesage: "Score Created",
        data: createScore,
      });
    } catch (error) {
      next(error);
    }
  },
  getScore: async (req, res, next) => {
    try {
      const { id } = req.params;
      const getScore = await User_history.findAll({
        where: { user_id: id },
      });

      return res.status(200).json({
        status: true,
        mesage: "Get Your Score",
        data: getScore,
      });
    } catch (error) {
      next(error);
    }
  },
  getAllScore: async (req, res, next) => {
    try {
      const user = req.user;
      const getAllScore = await User_history.findAll();

      if (user.role != Roles.admin) {
        return res.status(401).json({
          status: false,
          message: "Not Authorized",
          data: null,
        });
      }

      return res.status(200).json({
        status: true,
        mesage: "Get All Score",
        data: getAllScore,
      });
    } catch (error) {
      next(error);
    }
  },
  updateScore: async (req, res, next) => {
    try {
      const user = req.user;
      const { id, score } = req.body;
      const updateScore = await User_history.update(
        {
          score,
        },
        {
          where: { id },
        }
      );

      if (user.role != Roles.admin) {
        return res.status(401).json({
          status: false,
          message: "Not Authorized",
          data: null,
        });
      }

      return res.status(200).json({
        status: true,
        mesage: "Score Updated",
        data: updateScore,
      });
    } catch (error) {
      next(error);
    }
  },
  deleteScore: async (req, res, next) => {
    try {
      const user = req.user;
      const { id } = req.params;
      const deleteScore = await User_history.destroy({
        where: { user_id: id },
      });

      if (user.role != Roles.admin) {
        return res.status(401).json({
          status: false,
          message: "Not Authorized",
          data: null,
        });
      }

      return res.status(200).json({
        status: true,
        mesage: "Score Deleted",
        data: deleteScore,
      });
    } catch (error) {
      next(error);
    }
  },
};
