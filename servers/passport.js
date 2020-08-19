import passport from "passport"
import LocalStrategy from "passport-local"
import db from "./models"

passport.use(
  new LocalStrategy(function (username, password, done) {
    console.log(username)
    const userProto = db.User.findOne({ where: { username } })
    console.log(userProto)
    db.User.findOne({ where: { username } }, function (err, user) {
      if (err) {
        console.log(err)
      }
      if (!user) {
        console.log("user is not found")
      }
      if (!user.verifyPassword(password)) {
        return done(null, false)
      }
      return done(null, user)
    })
  })
)

// passport.use(
//   "local",
//   new LocalStrategy((username, password, done) => {
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

passport.serializeUser(function (user, done) {
  console.log(`srealizing: ${user}`)
  done(null, user.id)
})

passport.deserializeUser(function (user, done) {
  db.User.findOne({ where: { id: user.id } })
    .success(function (user) {
      done(null, user)
    })
    .error(function (err) {
      done(err, null)
    })
})
