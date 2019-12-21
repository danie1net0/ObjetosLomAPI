const {Schema, model} = require('mongoose');
const paginate = require('mongoose-paginate');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    passwordResetToken: {
      type: String,
      select: false
    },
    passwordResetExpires: {
      type: Date,
      select: false
    },
    institution: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    },
    role: {
      type: String,
      default: 'client',
      enum: ['client', 'admin', 'super-admin']
    }
  },
  {
    timestamps: true
  });

UserSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.plugin(paginate);

module.exports = model('User', UserSchema);
