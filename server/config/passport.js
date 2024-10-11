// server/config/passport.js
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;
const User = require("../models/User");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
const generateUniqueUsername = async (baseName) => {
  let username = baseName;
  let suffix = 1;
  while (await User.findOne({ username })) {
    username = `${baseName}${suffix}`;
    suffix++;
  }
  return username;
};

// Only initialize Google Strategy if credentials exist
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
        scope: ["profile", "email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ email: profile.emails[0].value });

          if (!user) {
            const username = await generateUniqueUsername(
              profile.displayName.replace(/\s+/g, "").toLowerCase()
            );
            user = await User.create({
              providerId: profile.id,
              provider: "google",
              name: profile.displayName,
              email: profile.emails[0].value,
              avatar: profile.photos[0].value,
              username: username,
            });
          } else if (!user.providerId) {
            user.providerId = profile.id;
            user.provider = "google";
            await user.save();
          }

          done(null, user);
        } catch (error) {
          done(error, null);
        }
      }
    )
  );
}

// GitHub Strategy
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: `${process.env.SERVER_URL}/auth/github/callback`,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email =
            profile.emails?.[0]?.value || `no-email-${profile.id}@github.com`;

          let user = await User.findOne({ email });

          if (!user) {
            const username = await generateUniqueUsername(
              profile.username || `GitHubUser-${profile.id}`
            );
            user = await User.create({
              providerId: profile.id,
              provider: "github",
              name:
                profile.displayName ||
                profile.username ||
                `GitHubUser-${profile.id}`,
              email: email,
              avatar: profile.photos?.[0]?.value,
              username: username,
            });
          } else if (!user.providerId) {
            user.providerId = profile.id;
            user.provider = "github";
            await user.save();
          }

          done(null, user);
        } catch (error) {
          done(error, null);
        }
      }
    )
  );
}

module.exports = passport;
