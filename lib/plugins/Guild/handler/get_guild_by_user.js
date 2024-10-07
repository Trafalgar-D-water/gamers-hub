const { Boom } = require("@hapi/boom");

module.exports = async (request , h)=>{
    const  {auth :{credentials} , paylaod , parmas , server }  = request;

    try{
        
    }
    catch(e){
        console.log('this is my error' , e)
        return Boom.badRequest('something went wrong');
    }
}