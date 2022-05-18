const bcrypt = require('bcrypt');

function hashPassword(plainPassword) {
    return bcrypt.hashSync(plainPassword, 8);
}

function comparePassword(plainPassword, encrptedPassword) {
    return bcrypt.compareSync(plainPassword, encrptedPassword);
}

module.exports = { hashPassword, comparePassword };
