const query = require('../database/mariadb');

module.exports.index = async (req, res) => {
    const data = await query('SELECT * from user');
    res.json({ msg: "List of users", body: data });
};

module.exports.create = async (req, res) => {
    const data = req.body;

    const creation_query = await query(
        'INSERT INTO user (username, role) VALUES (?, ?)',
        [data.username, data.role]
    )

    const last_created = await query('SELECT * FROM user WHERE id = (?)', [creation_query.insertId])

    res.json({ msg: "Created a user", body: last_created });
};

module.exports.delete = async (req, res) => {
    const user_id = req.params.id;
    await query('DELETE FROM user WHERE user.id=(?)', [user_id]);
    res.json({ msg: "Deleted a user", body: "Deleted a user with id: " + user_id });
};