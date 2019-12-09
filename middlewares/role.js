const User = require('../models/user/User');
const { roles } = require('../roles/roles');

exports.grantAccess = (action, resource) => {
  return async (req, res, next) => {
    try {
      const { user_id } = req.headers;
      const user = await User.findById(user_id);
      const permission = roles.can(user.role)[action](resource);

      if (!permission.granted) {
        return res.status(401).json({ meta: { success: false, message: 'O usuário não tem permissão para realizar essa ação.' } });
      }

      return next();
    } catch (error) {
      return res.status(500).json({ meta: { success: false, message: 'Ocorreu um erro inesperado, tente novamente mais tarde.' } });
    }
  }
}
