// server/routes/auth.js
const router = require("express").Router();
const passport = require("passport");
const db = require("../models/User");

// Helper function to check if strategy exists
const strategyExists = (name) => {
  return passport._strategies[name] !== undefined;
};

// Google auth routes
router.get("/google", (req, res, next) => {
  if (!strategyExists("google")) {
    return res
      .status(503)
      .json({ message: "Google authentication is not configured" });
  }
  passport.authenticate("google", { scope: ["profile", "email"] })(
    req,
    res,
    next
  );
});

router.get("/google/callback", (req, res, next) => {
  if (!strategyExists("google")) {
    return res.redirect(
      `${process.env.CLIENT_URL}/login?error=google_auth_not_configured`
    );
  }
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: `${process.env.CLIENT_URL}/login`,
  })(req, res, next);
});

// GitHub auth routes
router.get("/github", (req, res, next) => {
  if (!strategyExists("github")) {
    return res
      .status(503)
      .json({ message: "GitHub authentication is not configured" });
  }
  passport.authenticate("github", { scope: ["user:email"] })(req, res, next);
});

router.get("/github/callback", (req, res, next) => {
  if (!strategyExists("github")) {
    return res.redirect(
      `${process.env.CLIENT_URL}/login?error=github_auth_not_configured`
    );
  }
  passport.authenticate("github", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: `${process.env.CLIENT_URL}/login`,
  })(req, res, next);
});

// Twitter auth routes
router.get("/twitter", (req, res, next) => {
  if (!strategyExists("twitter")) {
    return res
      .status(503)
      .json({ message: "Twitter authentication is not configured" });
  }
  passport.authenticate("twitter")(req, res, next);
});

router.get("/twitter/callback", (req, res, next) => {
  if (!strategyExists("twitter")) {
    return res.redirect(
      `${process.env.CLIENT_URL}/login?error=twitter_auth_not_configured`
    );
  }
  passport.authenticate("twitter", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: `${process.env.CLIENT_URL}/login`,
  })(req, res, next);
});

// User info and logout routes
router.get("/user", (req, res) => {
  console.log(req.user);
  res.json(req.user || null);
});

router.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Error during logout" });
    }
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Error destroying session" });
      }
      res.clearCookie("connect.sid");
      res.json({ message: "Logged out successfully" });
    });
  });
});

module.exports = router;
