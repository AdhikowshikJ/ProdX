// server/config/passport.js
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("../models/User");

// Serialize user for the session
passport.serializeUser((user, done) => {
  console.log("Serializing user:", user._id);
  done(null, user._id);
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
  console.log("Deserializing user:", id);
  try {
    const user = await User.findById(id);
    if (!user) {
      console.log("No user found with id:", id);
      return done(null, false);
    }
    console.log("Found user:", user.username);
    done(null, user);
  } catch (error) {
    console.error("Error deserializing user:", error);
    done(error, null);
  }
});

// Helper function to generate unique username
const generateUniqueUsername = async (baseName) => {
  let username = baseName.toLowerCase().replace(/[^a-z0-9]/g, "");
  let suffix = 1;

  while (await User.findOne({ username })) {
    username = `${baseName}${suffix}`;
    suffix++;
  }

  return username;
};

// Google Strategy
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
        proxy: true,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log("Google auth callback - Profile:", profile.id);

          // Try to find user by email or providerId
          let user = await User.findOne({
            $or: [
              { email: profile.emails[0].value },
              { providerId: profile.id, provider: "google" },
            ],
          });

          if (!user) {
            console.log("Creating new user for Google profile:", profile.id);
            const username = await generateUniqueUsername(
              profile.displayName || profile.emails[0].value.split("@")[0]
            );

            user = await User.create({
              providerId: profile.id,
              provider: "google",
              name: profile.displayName,
              email: profile.emails[0].value,
              avatar: profile.photos[0].value,
              username: username,
            });
          } else if (user.provider !== "google") {
            // Update existing user with Google credentials
            user.providerId = profile.id;
            user.provider = "google";
            user.avatar = profile.photos[0].value;
            await user.save();
          }

          console.log(
            "Google authentication successful for user:",
            user.username
          );
          done(null, user);
        } catch (error) {
          console.error("Google strategy error:", error);
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
        scope: ["user:email"],
        proxy: true,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log("GitHub auth callback - Profile:", profile.id);

          // Get primary email or generate fallback
          const email =
            profile.emails?.[0]?.value || `no-email-${profile.id}@github.com`;

          // Try to find user by email or providerId
          let user = await User.findOne({
            $or: [
              { email: email },
              { providerId: profile.id, provider: "github" },
            ],
          });

          if (!user) {
            console.log("Creating new user for GitHub profile:", profile.id);
            const username = await generateUniqueUsername(
              profile.username || profile.displayName || email.split("@")[0]
            );

            user = await User.create({
              providerId: profile.id,
              provider: "github",
              name: profile.displayName || profile.username,
              email: email,
              avatar: profile.photos?.[0]?.value,
              username: username,
            });
          } else if (user.provider !== "github") {
            // Update existing user with GitHub credentials
            user.providerId = profile.id;
            user.provider = "github";
            user.avatar = profile.photos?.[0]?.value;
            await user.save();
          }

          console.log(
            "GitHub authentication successful for user:",
            user.username
          );
          done(null, user);
        } catch (error) {
          console.error("GitHub strategy error:", error);
          done(error, null);
        }
      }
    )
  );
}

module.exports = passport;
