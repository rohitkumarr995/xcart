const mongoosee = require('mongoose')
const  {DB_URI}  = require( '../constants.js')
 const connectDB = async()=>{

    try {
        const connectionInstance = await mongoosee.connect(DB_URI)
        console.log(`DB Connected.. || ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("error caught while connecting DB", error);
        process.exit(1)
    }
}

module.exports = connectDB


