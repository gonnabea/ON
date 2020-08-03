import passport from "passport";
import LocalStrategy from "passport-local";
import User from "./models/user";

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done){
    User.findOne({where: {id: user.id}}).success(function(user){
        done(null, user);
    }).error(function(err){
        done(err, null)
    })
}
)

passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
      });
    }
  ));