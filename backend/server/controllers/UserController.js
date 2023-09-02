const query = require('../database/mariadb');

module.exports.index = async (req, res) => {
    res.json({ msg: "get", body: "List of user" });
};

module.exports.create = async (req, res) => {
    res.json({ msg: "post", body: "creating a user" });
};

module.exports.delete = async (req, res) => {
    res.json({ msg: "delete", body: "deleting a user" });

};