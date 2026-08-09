import User from "../models/User.js";

export const getUser = async (req, res) => {
  const { email } = req.user;

  if (!email) {
    return res.status(400).json({ message: "Account has no email address" });
  }

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { $setOnInsert: { email } },
      { new: true, upsert: true }
    );

    res.json(user);
  } catch (err) {
    console.error("Failed to save user:", err);
    res.status(500).json({ message: "Could not save user" });
  }
};
