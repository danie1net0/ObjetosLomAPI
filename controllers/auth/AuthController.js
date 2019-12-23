require('dotenv/config');

const User = require('../../models/user/User');
const mailer = require('../../modules/mailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

module.exports = {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email, active: true }).select('+password');

      if (user == null)
        return res.status(404).json({ meta: { success: false, message: 'Usuário não encontrado.' } });

      if (!await bcrypt.compare(password, user.password))
        return res.status(422).json({ meta: { success: false, message: 'Senha inválida.' } });

      user.password = undefined;

      const token = jwt.sign({ user }, process.env.SECRET_TOKEN, { expiresIn: 86400 });

      return res.json({ data: { token: token }, meta: { success: true, message: 'Usuário autenticado com sucesso!' } });
    } catch(error) {
      return res.status(500).json({ meta: { success: false, message: 'Ocorreu um erro inesperado, tente novamente mais tarde.' } });
    }
  },

  async forgotPassword(req, res) {
    const { email } = req.body;

    try {
      const user = await User.findOne({ email, active: true });

      if (user == null)
        return res.status(404).json({ meta: { success: false, message: 'Usuário não encontrado.' } });

      const token = crypto.randomBytes(20).toString('hex');

      const now = new Date();
      now.setHours(now.getHours() + 1);

      await User.findOneAndUpdate(user.id, {
        $set: {
          passwordResetToken: token,
          passwordResetExpires: now
        }
      }, {
        new: true,
        useFindAndModify: false
      });

      mailer.sendMail({
        from: `Gerenciador de Objetos Edulab ${ process.env.MAIL_USER }`,
        to: email,
        subject: 'Recuperar Senha',
        template: 'auth/forgot-password',
        context: {
          token,
          appUrl: process.env.APP_URL_FRONT
        }
      }, (error) => {
        if (error)
          return res.status(400).json({ meta: { success: false, message: 'Falha ao enviar e-mail de recuperação de senha.' } });

        return res.json({ meta: { success: true, message: 'Recuperação de senha enviada com sucesso!' } });
      });
    } catch (error) {
      return res.status(500).json({ meta: { success: false, message: 'Ocorreu um erro inesperado, tente novamente mais tarde.' } });
    }
  },

  async verifyToken(req, res) {
    try {
      const token = req.params.token;

      const user = await User.findOne({ passwordResetToken: token, active: true }).select('passwordResetToken passwordResetExpires email');
      if (user == null)
        return res.status(404).json({ meta: { success: false, message: 'Token de recuperação de senha inválido!' } });

      const now = new Date();
      if (now > user.passwordResetExpires)
        return res.status(400).json({ meta: { success: false, message: 'Token expirado.' } });

      return res.json({ data: { email: user.email, token: user.passwordResetToken }, meta: { success: true, message: 'Token validado com sucesso!' } });
    } catch (error) {
      return res.status(500).json({ meta: { success: false, message: 'Ocorreu um erro inesperado, tente novamente mais tarde.' } });
    }
  },

  async resetPassword(req, res) {
    const { email, token, password, password_confirmation } = req.body;

    try {
      const user = await User.findOne({ email, active: true }).select('+passwordResetToken passwordResetExpires');

      if (user == null)
        return res.status(404).json({ meta: { success: false, message: 'Usuário não encontrado.' } });

      if (token !== user.passwordResetToken)
        return res.status(400).json({ meta: { success: false, message: 'Token inválido.' } });

      const now = new Date();

      if (now > user.passwordResetExpires)
        return res.status(400).json({ meta: { success: false, message: 'Token expirado.' } });

      if (password !== password_confirmation)
        return res.status(422).json({ meta: { success: false, message: 'A senha não confere com a sua confirmação.' } });

      user.password = password;

      await user.save();
      await user.updateOne({
        $set: {
          passwordResetToken: null,
          passwordResetExpires: null
        }
      });

      return res.json({ meta: { success: true, message: 'Senha redefinida com sucesso!' } });
    } catch (error) {
      return res.status(500).json({ meta: { success: false, message: 'Ocorreu um erro inesperado, tente novamente mais tarde.' } });
    }
  }
};
