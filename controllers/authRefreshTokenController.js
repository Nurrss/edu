const jwt = require("jsonwebtoken");

const Users = require("../models/Subject");

const handleRefreshToken = async (req, res) => {
  const refreshToken = req.body.refreshToken;
  const user = Users.findOne({ refreshToken });
  if (!user) {
    return res.status(401).json({ error: "Invalid refreshToken" });
  }
  const email = user.email;
  const role = user.role;

  try {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const accessToken = generateAccessToken(email, role);
    res.json({
      accessToken,
      refreshToken,
      success: true,
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      const newRefreshToken = generateRefreshToken(
        email,
        firstName,
        lastName,
        role
      );
      const newAccessToken = generateAccessToken(
        email,
        firstName,
        lastName,
        role
      );

      user.refreshToken = newRefreshToken;
      await user.save();

      return res.json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        success: true,
      });
    }

    return res.status(401).json({ error: "Invalid refreshToken" });
  }
};

function generateAccessToken(email, role) {
  return jwt.sign(
    {
      UserInfo: {
        email,
        role,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" }
  );
}

function generateRefreshToken(email, role) {
  const refreshToken = jwt.sign(
    {
      UserInfo: {
        email,
        role,
      },
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "365d" }
  );
  return refreshToken;
}

module.exports = handleRefreshToken;
