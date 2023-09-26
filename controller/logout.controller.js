const invalidatedTokens = [];

const logoutCtrl = (req, res, next) => {
    // INVALIDAR TOKEN
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  invalidatedTokens.push(token);
  console.log(invalidatedTokens);
  res.status(204).send();
//   RETORNAR 204
};

module.exports = logoutCtrl;
