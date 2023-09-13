const { Users, sequelize } = require("../models");

module.exports = {
  get: async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const users = await Users.findAll({ transaction });
      await transaction.commit();
      res.success({ users });
    } catch (err) {
      console.log(err);
      await transaction.rollback();
      res.internalError(err);
    }
  },
  post : async (req, res) => {
    const {id, name,email, status, archived } = req.body;
    const user = await Users.create({
      id,
      name,
      email,
      status,
      archived,
    });
    res.success({ user });

  },
  
  patch: async (req, res) => {
    try {
      const userId = req.params.id;
      const { name, email, status, archived } = req.body;

      const user = await Users.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      user.name = name 
      user.email = email
      user.status = status
      user.archived = archived 

      await user.save();
      res.success({ user });
    } catch (err) {
      console.error(err);
      res.internalError(err);
    }
  },
  
  delete: async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await Users.findByPk(userId);
      await user.destroy();
      res.success({ message:"deleted succesfully" });
    } catch (err) {
      console.error(err);
      res.internalError(err);
    }
  }
};
