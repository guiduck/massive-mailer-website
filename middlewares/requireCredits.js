module.exports = (req, res, next) => {
  if (!req.user.credits > 1) {
    return res.status(403).send({ error: 'Not enough credits!' });
  }

  //if everything is good it just send it to the next missleware
  next();
};
