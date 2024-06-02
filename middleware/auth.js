const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send({ message: "Please log in to view this resource" });
};

const ensureAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === "admin") {
    return next();
  }
  res.status(403).send({ message: "Access denied" });
};

module.exports = {
  ensureAuthenticated,
  ensureAdmin,
};
