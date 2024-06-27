module.exports = (roles) => {
    return (req, res, next) => {
      console.log("Checking roles for user:", req.user,req.user.role);
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ msg: "Access denied!!" });
      }
      next();
    };
  };
  