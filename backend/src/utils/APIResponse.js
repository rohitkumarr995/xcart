class APISuccessResponse{
    constructor(status, message){
        this.status = status
        this.message = message || "messsage response success"
    }
}

module.exports =  APISuccessResponse