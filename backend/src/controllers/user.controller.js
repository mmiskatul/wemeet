import FriendRequest from "../models/friendRequest.js";
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

    res.status(200).json(user.friends);
  } catch (error) {
    console.error("Error in getFriends Controller", error.message);
    res.status(500).json({
      message: "Server Error",
    });
  }
}

export async function sendFriendsRequest(req, res) {
  try {
    const myId = req.user.id;
    const { id: recipientId } = req.params;

    // prevent sending request to yourself

    if (myId === recipientId)
      return res.status(400).json({
        message: "You an't send request to your self",
      });

    // recipient exits
    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({
        message: "Recipient Not Found",
      });
    }
    // check if the user already friend
    if (recipient.friends.includes(myId)) {
      return res.status(400).json({
        message: "You are already friend with the User",
      });
    }
    // check if a req already exists
    const exitingRequest = await FriendRequest.findOne({
      $or: [
        {
          sender: myId,
          recipient: recipientId,
        },
        {
          sender: recipientId,
          recipient: myId,
        },
      ],
    });
    if (exitingRequest) {
      return res.status(400).json({
        message: "A friends request already exits between you and the user",
      });
    }

    const friendRequest = await FriendRequest.create({
      sender: myId,
      recipient: recipientId,
    });

    res.status(201).json(friendRequest);
  } catch (error) {
    console.error("error in sendFriendRequest controller : ", error.message);
    res.status(500).json({
      message: "Server Error",
    });
  }
}

export async function acceptFriendsRequest(req, res) {
  try {
    const { id: requestId } = req.params;
    const friendRequest = await FriendRequest.findById(requestId);
    if (!friendRequest) {
      return res.status(400).json({
        message: "Friend request not Found",
      });
    }

    // check verify current user is the recipient
    if (friendRequest.recipient.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not authorized to accept the request ",
      });
    }
    friendRequest.status = "accepted";
    await friendRequest.save();

    //    add the both user in the other's frined's array
    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: {
        friends: friendRequest.recipient,
      },
    });
    await User.findByIdAndUpdate(friendRequest.recipient, {
      $addToSet: {
        friends: friendRequest.sender,
      },
    });

    res.status(200).json({
      message: "Friend request accepted",
    });
  } catch (error) {
    console.error("Error in AcceptRequestController ", error);
    res.status(500).json({
      message: "Server Error",
    });
  }
}

export async function getFriendRequest(req, res) {
  try {
    const incomingRequest = await FriendRequest.find({
      recipient: req.user.id,
      status: "pending",
    }).populate(
      "sender",
      "fullName profilepic nativeLanguage learningLanguage"
    );
    const acceptedRequest = await FriendRequest.find({
      sender: req.user.id,
      status: "accepted",
    }).populate("recipient", "fullName profilepic");
    res.status(200).json({
      incomingRequest,
      acceptedRequest,
    });
  } catch (error) {
    console.log("Error in getPendingFriendRequest Controller ", error.message);
    res.status(500).json({ message: "Server Error" });
  }
}

export async function getOutgoingFriendReq(req, res) {
  try {
    const outgoingrequest = await FriendRequest.find({
      sender: req.user.id,
      status: "pending",
    }).populate(
      "recipient",
      "fullName profilepic nativeLanguage learningLanguage"
    );
    res.status(200).json(outgoingrequest)
  } catch (error) {
    console.error("Error in the getOutgoingFriendReq controller",error.message);
    res.status(500).json({
        message:"Server Error"
    })
    
  }
}

export async function rejectFriendsRequest(req,res){
    try {
        
    } catch (error) {
        
    }
}
