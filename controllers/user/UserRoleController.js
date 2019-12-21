const User = require('../../models/user/User');

module.exports = {
  async update(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id, active: true });
      const { role } = req.body;

      if (user == null)
        return res.status(404).json({ meta: { success: false, message: 'Usuário não encontrado.' } });

      if (role === undefined)
        return res.status(422).json({ meta: { success: false, message: 'A função do usuário deve ser enviada no corpo da requisição. ' } });

      if (!['client', 'admin', 'super-admin'].includes(role))
        return res.status(422).json({ meta: { success: false, message: 'Função de usuário inválida! ' } });

      await user.updateOne({ $set: { role: role } });

      return res.json({ meta: { success: true, message: 'Permissões de usuário alteradas com sucesso!' } });
    } catch(error) {
      return res.status(500).json({ meta: { success: false, message: 'Ocorreu um erro inesperado, tente novamente mais tarde.' } });
    }
  }
};
