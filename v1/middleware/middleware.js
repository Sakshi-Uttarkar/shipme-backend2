const jwt = require('jsonwebtoken');

function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, 'aslkdaslKJkldjkKJkljsklfjlksdaskdjeopfsg55asdLKLkalskd');
        return decoded;
    } catch (err) {
        return err;
    }
}


module.exports = {
    verifyToken,
};