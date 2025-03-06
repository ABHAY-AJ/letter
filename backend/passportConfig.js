const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./models/User");

passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL,
        passReqToCallback: true,
        scope: [
          "openid",
          "profile",
          "email",
          "https://www.googleapis.com/auth/drive.file",
        ],
        accessType: "offline", // ✅ Requests refresh token
        prompt: "consent", // ✅ Ensures a new refresh token request
      },
      async (req, accessToken, refreshToken, profile, done) => {
        console.log("Access Token:", accessToken);
        console.log("Refresh Token:", refreshToken); // ✅ Should now be available
  
        try {
          let user = await User.findOne({ googleId: profile.id });
  
          if (!user) {
            user = new User({
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
            });
          }
  
          user.accessToken = accessToken;
  
          if (refreshToken) {
            user.refreshToken = refreshToken; // ✅ Save refresh token if available
          }
  
          await user.save();
          return done(null, user);
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );
  
 
  
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
