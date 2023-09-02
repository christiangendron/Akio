const query = require('../database/mariadb');

module.exports.index = async (req, res) => {
    res.json({ msg: "get", body: "List of sub" });
};

module.exports.create = async (req, res) => {
    res.json({ msg: "post", body: "creating a sub" });
};

module.exports.delete = async (req, res) => {
    res.json({ msg: "delete", body: "deleting a sub" });

};