const csrf = require('csurf');

const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    secure: false, // Set to true in production (https)
    sameSite: 'Lax',
  },
});

module.exports = csrfProtection;
