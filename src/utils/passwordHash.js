const bcrypt = require("bcrypt");

const hash = bcrypt.hashSync("H123456789", 10);
console.log(hash);
