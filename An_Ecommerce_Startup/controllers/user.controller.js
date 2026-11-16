const { users } = require("../data");
const { sendErrorResponse, sendResponse } = require("../utils/response");

const get_user = (req, res) => {
    const id = Number(req.params.id);

    const user = users.find((u) => u.id === id);

    if (!user) {
        return sendErrorResponse(res, {
            message: "User not found",
            statusCode: 404
        });
    }

    return sendResponse(res, user, 200);
};

const get_all_users = (req, res) => {
    if (users.length === 0) {
        return sendErrorResponse(res, {
            message: "No users have been added",
            statusCode: 404
        });
    }

    return sendResponse(res, users, 200);
};

let count = 0;

const post_user = (req, res) => {
    const name = req.body.name;

    count++;

    const newUser = {
        id: count,
        name: name
    };

    users.push(newUser);

    return sendResponse(res, {
        message: "User added successfully",
        user: newUser
    }, 201);
};

module.exports = {
    get_all_users,
    get_user,
    post_user
};