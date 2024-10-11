const { Boom } = require("@hapi/boom")
module.exports = async (request , h)=>{
    const {auth : {credentials} , server} = request;
    try{
        const {id} = credentials;
        const user = await server.methods.get_user_by_id(id);
        if (!user) {
            return Boom.notFound('User not found');
        }

        const { password, ...userWithoutPassword } = user.toObject();
        return h.response({ user: userWithoutPassword }).code(200);
    }
    catch(error){
        console.log(error)
        return Boom.badRequest('error in getting me user')
    }

}