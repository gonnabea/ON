const localsMiddlewares = (req, res, next) => {
  res.locals.currentUser = req.user
  next()
}

export default localsMiddlewares
