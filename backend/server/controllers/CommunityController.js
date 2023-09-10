const query = require('../database/mariadb');

module.exports.index = async (req, res) => {
    const data = await query('SELECT * from community');
    res.json({ msg: "List of community", body: data });
};

module.exports.create = async (req, res) => {
    const data = req.body;
    const creation_query = await query('INSERT INTO community (name) VALUES (?)', [data.name])
    const last_created = await query('SELECT * FROM community WHERE id = (?)', [creation_query.insertId])
    res.json({ msg: "Create a community", body: last_created });
};

module.exports.delete = async (req, res) => {
    const community_id = req.params.id;
    await query('DELETE FROM community WHERE community.id=(?)', [community_id]);
    res.json({ msg: "Deleted a community", body: "Deleted community with id: " + community_id });
};