const AccessControl = require("accesscontrol");
const accessControl = new AccessControl();

exports.roles = (() => {
  accessControl.grant('client')
    .readOwn('user')
    .updateOwn('user')
    .createOwn('object')
    .readAny('object');

  accessControl.grant('admin')
    .extend('client')
    .createAny('object')
    .updateAny('object');

  accessControl.grant('super-admin')
    .extend('client')
    .extend('admin')
    .deleteAny('object')
    .createAny('user')
    .readAny('user')
    .updateAny('user')
    .deleteAny('user');

  return accessControl;
})();
