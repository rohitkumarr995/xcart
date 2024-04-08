class APIError extends Error{
    constructor(statusCode, message){
        super(message)
        this.statusCode = statusCode
        this.message = message || "Something went wrong"
        this.isOperational = true;
    }
}

module.exports =  APIError
