'use strict';

const Boom = require('@hapi/boom');
const UserModel = require('../schema/users')

module.exports =  async (request  ,h) =>{

    const {auth : {credentials}} = request;
    const loggedInUserId = credentials.id;

    try{
        const users = await UserModel.find({_id : {$ne : loggedInUserId}});


        if(!users){
            return Boom.badRequest('no users are there');
        }

        return {
            statusCode : 200,
            message  : 'this are all the users',
            data : users,
        }
    }
    catch(error){
        console.log('some thing is wrong in getting all the user' , error);
        return Boom.badRequest('wrong' , error)
    }   
}