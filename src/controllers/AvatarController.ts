const db = require('../models/index.js');
const userModel = db.User;
const avatarModel = db.Avatar;
const ApiResponseHandler = require('../helper/ApiResponse.ts')
let isError = false;

class AvatarController{
    static async  testAvatar(req, res) {
        //test api
        const data = "test avatar API";
        const message = "avatar test API is Working";
        ApiResponseHandler.send(req, res, "DATA", data, message)

    }
    static async saveAvatar(req, res, next) {
        try {
            //add contactUs form in avatar
            const data = req.body;
            if (data.user_id == null || data.user_id == "" || data.data == null || data.data == "") {
                isError = true
                const err ="error"
                const message = "Required field is/are empty or null";
                ApiResponseHandler.sendError(req, res, "avatar", err, message)
            } else if (typeof data.user_id !== "number") {
                const err = "error"
                const message = "Datatype does't match for user_id, integer expected";
                isError = true
                ApiResponseHandler.sendError(req, res, "avatar", err, message)
            }else{
                let isUserExist = await AvatarController.userExist(data.user_id)
                    if (!isUserExist) {
                        isError = true
                        const err = "error"
                        const message = "user does not exist";
                        ApiResponseHandler.sendError(req, res, "avatar", err, message)
                    }
            }
            if (!isError) {
                let avatar = function (user_id) {
                    return avatarModel.findOne({ where: { user_id: user_id } })
                }
                let avatarResult = avatar(data.user_id)
                avatarResult.then(async function (result) {
                    if (!result) {
                        await avatarModel.create(data);
                        ApiResponseHandler.send(req, res, "avatar", data, "Avatart saved successfully")
                    }else{
                        let user = function (user_id) {
                            return avatarModel.update(data, { where: { user_id: user_id } });
                        }
                        let userUpdate = user(data.user_id)
                        userUpdate.then(async function (result) {
                            console.log(result)
                        })
                        ApiResponseHandler.send(req, res, "user", data, "Avatart updated successfully")

                    }
                })
            }
        }
        catch (error) {
            next(error);
            const err = "error"
            const message = "error saving an avatar";
            ApiResponseHandler.sendError(req, res, "avatar", err, message)
        }
    }
    static async fetchAvatar(req, res, next) {
        try {
                const user_id = req.params.user_id
                let avatar = function (user_id) {
                    return avatarModel.findOne({ where: { user_id: user_id } })
                }
                let avatarResult = avatar(user_id)
                avatarResult.then(async function (result) {
                    if (!result) {
                        const err = "error"
                        const message = "Avatar not available ";
                        ApiResponseHandler.sendError(req, res, "avatar", err, message)
                    } else {
                        const data =
                        ApiResponseHandler.send(req, res, "user", data, "Avatart updated successfully")

                    }
                })
        } catch(error) {
            next(error);
            const err = "error"
            const message = "error fetching avatar";
            ApiResponseHandler.sendError(req, res, "avatar", err, message)
        }
    }

    static async userExist(id){
        return userModel.findOne({ where: { id: id } })
    }
}

module.exports = AvatarController