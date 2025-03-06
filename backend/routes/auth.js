const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get(
    "/google",
    passport.authenticate("google", {
      scope: [
        "openid",
        "profile",
        "email",
        "https://www.googleapis.com/auth/drive.file"
      ],
      accessType: "offline", // ✅ Request refresh token
      prompt: "consent", // ✅ Ensure a new refresh token each login
    })
  );
  
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect(`${process.env.FRONTEND_URL}/editor`);
  }
);

router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect(process.env.FRONTEND_URL);
  });
});

router.get("/user", (req, res) => {
  res.json(req.user || null);
});

module.exports = router;
