const Object = require('../../models/object/Object');

module.exports = {
  async accepptObject(req, res) {
    try {
      const object = await Object.findOne({ _id: req.params.id, acceppt: false });

      if (object != null) {
        await object.updateOne({ $set: { acceppt: true } });

        return res.json({ meta: { success: true, message: 'Objeto aceito com sucesso!' } });
      } else {
        return res.status(404).json({ meta: { success: false, message: 'Objeto não existe ou já foi ativado.' } });
      }
    } catch(error) {
      return res.status(500).json({ meta: { success: false, message: 'Ocorreu um erro inesperado, tente novamente mais tarde.' } });
    }
  }
};
