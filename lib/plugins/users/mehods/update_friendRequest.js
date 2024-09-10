const userModel = require('../schema/users')
module.exports = {
    name : 'updateFriendRequst',
    method :  async (requesterId , recipientId) =>{
        try {
            // Update the requester user
            const updateRequester = await userModel.findOneAndUpdate(
              { _id: requesterId },
              { $push: { friendRequests: { requester: requesterId, recipient: recipientId, createdAt: new Date() } } },
              { new: true }
            );
            
            if (!updateRequester) {
              throw new Error("Failed to update requester user");
            }
      
            // Update the recipient user
            const updateRecipient = await userModel.findOneAndUpdate(
              { _id: recipientId },
              { $push: { friendRequests: { requester: requesterId, recipient: recipientId, createdAt: new Date() } } },
              { new: true }
            );
      
            if (!updateRecipient) {
              throw new Error("Failed to update recipient user");
            }
      
            return {
              message: "Friend requests updated successfully",
              data: { updateRequester, updateRecipient },
            };
          } catch (error) {
            console.error("Error updating friend requests:", error);
            throw new Error("Error updating friend requests: " + error.message);
          }
    }
}