const Object = require('../../models/object/Object');

module.exports = {
  async index(req, res) {
    try {
      const { key = 'acceppt', value = 'true' } = req.query;

      const query = JSON.parse(`{ "${ key }": "${ value }" }`);
      const objects = await Object.paginate(query);

      return res.json({ data: objects, meta: { success: true, message: 'Objetos recuperados com sucesso!' } });
    } catch(error) {
      return res.status(500).json({ meta: { success: false, message: 'Ocorreu um erro inesperado, tente novamente mais tarde.' } });
    }
  },

  async show(req, res) {
    try {
      const object = await Object.findById(req.params.id);

      if (object != null)
        return res.json({ data: object, meta: { success: true, message: 'Objeto recuperado com sucesso!' } });
      else
        return res.status(404).json({ data: {}, meta: { success: false, message: 'Objeto não encontrado' } });
    } catch(error) {
      return res.status(500).json({ meta: {success: false, message: 'Ocorreu um erro inesperado, tente novamente mais tarde.' } });
    }
  },

  async store(req, res) {
    try {
      const object = await Object.create(req.body);
      return res.status(201).json({ data: object, meta: { success: true, message: 'Objeto cadastrado com sucesso!' } });
    } catch(error) {
      return res.status(500).json({ meta: { success: false, message: 'Ocorreu um erro inesperado, tente novamente mais tarde.' } });
    }
  },

  async update(req, res ) {
    try {
      const object = await Object.findByIdAndUpdate(req.params.id, req.body, { new: true });

      if (object != null)
        return res.json({ data: object, meta: { success: true, message: 'Objeto atualizado com sucesso!' } });
      else
        return res.status(404).json({ data: {}, meta: { success: false, message: 'Objeto não encontrado' } });
    } catch(error) {
      return res.status(500).json({ meta: { success: false, message: 'Ocorreu um erro inesperado, tente novamente mais tarde.' } });
    }
  },

  async destroy(req, res) {
    try {
      if (await Object.findByIdAndRemove(req.params.id) != null)
        return res.json({ data: {}, meta: { success: true, message: 'Objeto deletado com sucesso!' } });
      else
        return res.status(404).json({ data: {}, meta: { success: false, message: 'Objeto não encontrado' } });
    } catch(error) {
      return res.status(500).json({ meta: { success: false, message: 'Ocorreu um erro inesperado, tente novamente mais tarde.' } });
    }
  }
};
