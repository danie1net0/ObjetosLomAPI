require('dotenv/config');

const User = require('../../models/user/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  async login(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (user == null) 
      return res.status(404).json({ meta: { success: false, message: 'Usuário não encontrado.' } });
    
    if (!await bcrypt.compare(password, user.password))
        return res.status(422).json({ meta: { success: false, message: 'Senha inválida.' } });

    user.password = undefined;

    const token = jwt.sign({ id: user._id }, process.env.SECRET_TOKEN, { expiresIn: 86400 });

    return res.json({ data: { token: token }, meta: { success: true, message: 'Usuário autenticado com sucesso' } });
  }
};
