import User from "../models/User.js";

export async function getRecommendedUsers(req, res) {
  try {
    const currentUserId = req.user.id;
    const currentUser = req.user;

    const recomendeddUsers = await User.find({
      $and: [
        { _id: { $ne: currentUserId } }, //excude myself
        { $id: { $nin: currentUser.friends } },
        { isOnboarded: true },
      ],
    });
    res.status(200).json(recomendeddUsers);
  } catch (error) {
    console.error("Error in getRecommendeduser Controller", error.message);
    res.status(500).json({
      message: "Server Error",
    });
  }
}

export async function getMyFriends(req, res) {
  try {
    const user = await User.findById(req.user.id)
      .select("friends")
      .populate(
        "friends",
        "fullName profilepic nativeLanguage learningLanguage"
      );

      res.status(200).json(user.friends)
  } catch (error) {
    console.error("Error in getFriends Controller", error.message);
    res.status(500).json({
      message: "Server Error",
    });
  }
}
