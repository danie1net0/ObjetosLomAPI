const User = require('../../models/user/User');
const bcrypt = require('bcryptjs');

module.exports = {
  async accepptUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id, active: false });

      if (user != null) {
        await user.updateOne({ $set: { active: true } });

        return res.json({ meta: { success: true, message: 'Usuário ativado com sucesso!' } });
      } else {
        return res.status(404).json({ meta: { success: false, message: 'Usuário não existe ou já foi ativado.' } });
      }
    } catch(error) {
      return res.status(500).json({ meta: { success: false, message: 'Ocorreu um erro inesperado, tente novamente mais tarde.' } });
    }
  }
};
