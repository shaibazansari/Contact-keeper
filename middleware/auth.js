const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // get token form header
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    return res.status(501).json({ msg: "No token, Authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JSON_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(501).json({ msg: "Token is not valid" });
  }
};
