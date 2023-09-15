const query = require('../database/mariadb');

module.exports.index = async (req, res) => {
    const post_id = req.params.id;

    const data = await query('SELECT comment.*, user.username FROM `comment` LEFT JOIN user ON comment.user_id = user.id WHERE comment.post_id = (?)', [post_id]);

    res.json({ msg: "List of comment for post id", body: data });
};