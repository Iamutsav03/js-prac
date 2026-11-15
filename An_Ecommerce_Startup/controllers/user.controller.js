const { users } = require("../data");

const get_user = (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((u) => {
        return u.id === id;
    })
    res.status(200).send(user || "user not found");
}

const get_all_users = (req, res) => {
    if (users.length === 0) {
        return res.status(200).send("No users has been added");
    }
    res.status(200).send(users);
}
let count = 0;
const post_user = (req, res) => {
    const name = req.body.name;

    count++;

    const newUser = {
        id: count,
        name: name
    };

    users.push(newUser);

    res.status(201).json({
        message: "User added successfully",
        user: newUser
    });
}

module.exports = {
    get_all_users, get_user, post_user
}