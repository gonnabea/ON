const localsMiddlewares = (req, res, next) => {
  res.locals.user = req.user
  next()
}

export default localsMiddlewares
