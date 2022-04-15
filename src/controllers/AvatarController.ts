const db = require('../models/index.js');
const userModel = db.User;
const avatarModel = db.Avatar;
const ApiResponseHandler = require('../helper/ApiResponse.ts')

class AvatarController{
    static async saveAvatar(req, res, next) {
        try {
            const data = req.body;
            if (data.user_id == null || data.user_id == "" || data.data == null || data.data == "") {
                const message = "Required field is/are empty or null";
                ApiResponseHandler.sendError(req, res, "data", null, message)
            } else if (typeof data.user_id !== "number") {
                const message = "Datatype does't match for user_id, integer expected";
                ApiResponseHandler.sendError(req, res, "data", null, message)
            } else {
                let isUserExist = await AvatarController.userExist(data.user_id)
                    if (!isUserExist) {
                        const message = "user does not exist";
                        ApiResponseHandler.sendError(req, res, "data", null, message)
                    }else{
                        let isAvatarExist = await AvatarController.avatarExist(data.user_id)
                        if (!isAvatarExist) {
                            avatarModel.create(data);
                            ApiResponseHandler.send(req, res, "data", data, "Avatart saved successfully")
                        } else {
                            let updateAvtar = await AvatarController.updateAvatar(data.user_id, data)
                            if (updateAvtar)
                                ApiResponseHandler.send(req, res, "data", data, "Avatart updated successfully")
                            else {
                                const message = "error updating avatar";
                                ApiResponseHandler.sendError(req, res, "data", null, message)
                            }

                        }
                    }
            }
        }
        catch (error) {
            const message = "error saving an avatar";
            ApiResponseHandler.sendError(req, res, "data", null, message)
        }
    }
    static async fetchAvatar(req, res, next) {
        try {
            const user_id = req.params.user_id
            let isAvatarExist = await AvatarController.avatarExist(user_id)
                if (!isAvatarExist) {
                    const message = "Avatar not available ";
                    ApiResponseHandler.sendError(req, res, "data", null, message)
                } else {
                    const data = isAvatarExist
                    ApiResponseHandler.send(req, res, "data", data, "Avatart fetched successfully")
                }
            } catch(error) {
                const message = "error fetching avatar";
                ApiResponseHandler.sendError(req, res, "data", null, message)
            }
    }
    static async userExist(id){
        return userModel.findOne({ where: { id: id } })
    }
    static async avatarExist(user_id){
        return avatarModel.findOne({ where: { user_id: user_id } })
    }
    static async updateAvatar(user_id, data) {
        return avatarModel.update(data, { where: { user_id: user_id } })
    }
}

module.exports = AvatarController