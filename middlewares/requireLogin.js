module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: 'you must log in!' });
  }

  //if everything is good it just send it to the next missleware
  next();
};
