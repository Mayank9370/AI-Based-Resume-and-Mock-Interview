import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const userLogin = async (req, res) => {
  try {
    const { code } = req.query;

    // 1. Get Access Token
    const accessToken = await getAccessToken(code);

    // 2. Get User Data
    const userData = await getUserData(accessToken.access_token);

    // 3. Check if user exists
    let user = await User.findOne({ email: userData.email });

    if (!user) {
      user = await User.create({
        name: userData.name,
        email: userData.email,
        img: userData.picture,
      });
    }

    // 4. Create JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // 5. Store token in cookie
    res.cookie("token", token, {
      // httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      priority: "medium",  // Add this
    });


    return res.redirect(process.env.VITE_URL + "/profile");

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Login failed" });
  }
};


export const getAccessToken = async (code) => {
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri: process.env.REDIRECT_URI,
  });

  const response = await fetch(
    "https://www.linkedin.com/oauth/v2/accessToken",
    {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body,
    }
  );

  if (!response.ok) throw new Error("Access token failed");

  return await response.json();
};

export const getUserData = async (accessToken) => {
  const response = await fetch("https://api.linkedin.com/v2/userinfo", {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) throw new Error("User data fetch failed");

  return await response.json();
};


export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).lean();
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};


export const userLogout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  return res.redirect("https://www.linkedin.com/m/logout/");
  //return res.redirect(process.env.VITE_URL+ '/')
};