const UserModel = require('../schema/users');

module.exports = {
    name: 'get_user_by_id',
    method: async (userId) => {
        try {
            return await UserModel.findById(userId);
        } catch (error) {
            console.error('Error in get_user_by_id method:', error);
            throw error;
        }
    }
};