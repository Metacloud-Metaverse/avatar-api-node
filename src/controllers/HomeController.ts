const apiResponseHandler = require('../helper/ApiResponse.ts')
const db = require('../models/index');

class HomeController {

   static async test(req, res, next) {
        try {
            const data = "test user API";
            const message = "user test API is Working";
            apiResponseHandler.send(req, res, "DATA", data, message)
        } catch (error) {
            next(error);
        }
    }
    static async testDb(req, res,next){
        console.log(db.sequelize.config)
        const data = db.sequelize.config
        const message = "Database connection is done";
        apiResponseHandler.send(req, res, "DATA", data, message)
    }
}

module.exports = HomeController;