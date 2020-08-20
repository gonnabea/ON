import passport from "passport"
import passportLocal from "passport-local"
import db from "./models"

const LocalStrategy = passportLocal.Strategy

passport.serializeUser(function (user, done) {
  console.log(`srealizing: ${user}`)
  done(null, user.id)
})

passport.deserializeUser(function (user, done) {
  console.log(`qqeqeeq: ${user}`)
  db.User.findOne({ where: { id: user.id } })
    .success(function (user) {
      done(null, user)
    })
    .error(function (err) {
      done(err, null)
    })
})

passport.use(
  new LocalStrategy(function (username, password, done) {
    console.log(`username: ${username} password: ${password}`)
    db.User.findOne({ where: { username: username } }).then(function (err, user) {
      if (err) {
        return done(err)
      }

      if (!user) {
        return done(null, false, { message: "Incorrect username." })
      }
      if (!user.verifyPassword(password)) {
        return done(null, false, { message: "Incorrect password." })
      }
      return done(null, user)
    })
  })
)

// passport.use(
//   "local",
//   new LocalStrategy.Strategy((username, password, done) => {
//     db.User.findOne({ where: { username } })
//       .then((user) => {
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
