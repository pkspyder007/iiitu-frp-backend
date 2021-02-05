const jwt = require("jsonwebtoken");

exports.checkAuth = (req, res, next) => {
  const authtkn = req.cookies.authtkn;
  if (!authtkn) {
    return res
      .status(400)
      .json({ msg: "No auth token found. Please login again." });
    }
    try {
        let decoded = jwt.verify(authtkn, process.env.JWT_SECRET);
        req.user = decoded;
        console.log("Data: " , decoded);
    } catch (error) {
        return res
          .status(400)
          .json({ msg: "Invalid auth token. Please login again." });
  }

  next();
};

exports.isAdmin = (req, res, next) => {
    if(req.user.role === "admin") {
        next();
    } else {
        res.status(403).json({msg: "Unauthorized!"})
    }
}

exports.isUser = (req, res, next) => {
    if(req.user.role === "user") {
        next();
    } else {
        res.status(403).json({msg: "Unauthorized!"})
    }
}