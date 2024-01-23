const jwt = require("jsonwebtoken");

function verifyToken(token) {
  try {
    return { userRole: "admin" };
    // const decoded = jwt.verify(token, 'aslkdaslKJkldjkKJkljsklfjlksdaskdjeopfsg55asdLKLkalskd');
    // return decoded;
  } catch (err) {
    return err;
  }
}

module.exports = {
  verifyToken,
};
