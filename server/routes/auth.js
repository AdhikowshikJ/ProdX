// server/routes/auth.js
const router = require("express").Router();
const passport = require("passport");

// Google Auth Routes
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: true,
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.CLIENT_URL}/login`,
    keepSessionInfo: true,
  }),
  (req, res) => {
    console.log("Successful Google authentication, user:", req.user?.username);
    res.redirect(process.env.CLIENT_URL);
  }
);

// GitHub Auth Routes
router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["user:email"],
    session: true,
  })
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: `${process.env.CLIENT_URL}/login`,
    keepSessionInfo: true,
  }),
  (req, res) => {
    console.log("Successful GitHub authentication, user:", req.user?.username);
    res.redirect(process.env.CLIENT_URL);
  }
);

// Get current user
router.get("/user", (req, res) => {
  console.log("Auth check - Session:", req.sessionID);
  console.log("Auth check - Is Authenticated:", req.isAuthenticated());
  console.log("Auth check - User:", req.user);
  res.json(req.user || null);
});

// Logout
router.post("/logout", (req, res) => {
  const username = req.user?.username;
  req.logout((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).json({ message: "Error during logout" });
    }
    console.log(`User ${username} logged out successfully`);
    req.session.destroy((err) => {
      if (err) {
        console.error("Session destruction error:", err);
        return res.status(500).json({ message: "Error destroying session" });
      }
      res.clearCookie("sessionId");
      res.json({ message: "Logged out successfully" });
    });
  });
});

module.exports = router;
