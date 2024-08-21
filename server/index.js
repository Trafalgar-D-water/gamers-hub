'use strict';
const Glue = require('@hapi/glue');
const manifest = require('./manifest');
const HapiPino = require('hapi-pino');
const mongoose = require('mongoose')
require('dotenv').config()
const connectToDb = require('./db')


exports.deployment = async(start)=>{
    try{
        console.log('cool');
    const server = await Glue.compose(manifest , {relativeTo : __dirname}) 

    // await server.register({
    //     plugin : HapiPino,
    // });

    await server.initialize();
    

    if(!server){
        return server;
    }

    await server.start();
    connectToDb();
    
    console.log(`Server running at ${server.info.uri}`);
    return server ;
    }
    catch(err){
        console.log('Error while starting the server:' , err);  
    }
    
}

if(require.main === module){
    exports.deployment(true)
}