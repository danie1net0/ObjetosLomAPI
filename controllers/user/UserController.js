const User = require('../../models/user/User');

module.exports = {
  async index(req, res) {
    try {
      const { page = 1 } = req.query;
      const users = await User.paginate({}, { page: page, limit: 10 });

      return res.json({ data: users, meta: { success: true, message: 'Usuários recuperados com sucesso!' } });
    } catch(error) {
      return res.status(500).json({ meta: { success: false, message: 'Ocorreu um erro inesperado, tente novamente mais tarde.' } });
    }
  }, 

  async show(req, res) {
    try {
      const user = await User.findById(req.params.id);

      if (user != null)
        return res.json({ data: user, meta: { success: true, message: 'Usuário recuperado com sucesso!' } });
      else
        return res.status(404).json({ data: {}, meta: { success: false, message: 'Usuário não encontrado' } });
    } catch(error) {
      return res.status(500).json({ meta: { success: error, message: 'Ocorreu um erro inesperado, tente novamente mais tarde.' } });
    }
  },

  async store(req, res) {
    try {
      const user = await User.create(req.body);
      return res.status(201).json({ data: user, meta: { success: true, message: 'Usuário cadastrado com sucesso!' } });
    } catch(error) {
      return res.status(500).json({ meta: { success: false, message: 'Ocorreu um erro inesperado, tente novamente mais tarde.' } });
    }
  },

  async update(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

      if (user != null)
        return res.json({ data: user, meta: { success: true, message: 'Usuário atualizado com sucesso!' } });
      else
        return res.status(404).json({ data: {}, meta: { success: false, message: 'Usuário não encontrado' } });
    } catch(error) {
      return res.status(500).json({ meta: { success: false, message: 'Ocorreu um erro inesperado, tente novamente mais tarde.' } });
    }
  },

  async destroy(req, res) {
    try {
      if (await User.findByIdAndRemove(req.params.id) != null)  
        return res.json({ data: {}, meta: { success: true, message: 'Usuário deletado com sucesso!' } });
      else
        return res.status(404).json({ data: {}, meta: { success: false, message: 'Usuário não encontrado' } });
    } catch(error) {
      return res.status(500).json({ meta: { success: false, message: 'Ocorreu um erro inesperado, tente novamente mais tarde.' } });
    }  
  }
};