import passport from "passport"
import LocalStrategy from "passport-local"
import db from "./models"

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  db.User.findOne({ where: { id } }).then(function (user) {
    done(null, user)
  })
})

passport.use(
  new LocalStrategy(function (username, password, done) {
    return db.User.findOne({ where: { username } }).then(function (user) {
      if (!user) {
        return done(null, false, { message: "Incorrect username." })
      }
      if (user.password != password) {
        return done(null, false)
      }
      return done(null, user)
    })
  })
)

// passport.use(
//   "local",
//   new LocalStrategy.Strategy((username, password, done) => {
//     db.User.findOne({ where: { username } }).then((user) => {
//         if (!user) {
//           return done(null, false, { message: "Incorrect username and password. " })
//         }

//         return user.validPassword(password)
//           ? done(null, user)
//           : done(null, false, { message: "Incorrect username and password. " })
//       })
//       .catch(() => done(null, false, { message: "Incorrect username and password. " }))
//   })
// )
