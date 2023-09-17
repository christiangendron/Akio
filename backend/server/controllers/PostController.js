const query = require('../database/mariadb');

module.exports.index = async (req, res) => {
    let data = await query('SELECT post.*, user.username, community.name FROM `post` LEFT JOIN user ON post.user_id = user.id LEFT JOIN community on post.community_id = community.id');

    if (req.query.keyword) {
        data = data.filter(item => item.text_content.includes(req.query.keyword));
    }

    res.json({ msg: "List of all post", body: data });
};

module.exports.indexByCommunityId = async (req, res) => {
    const community_id = req.params.id;

    let data = await query(
        'SELECT post.*, user.username, community.name FROM `post` LEFT JOIN user ON post.user_id = user.id LEFT JOIN community on post.community_id = community.id WHERE post.community_id = (?)',
        [community_id]
    );

    if (req.query.keyword) {
        data = data.filter(item => item.text_content.includes(req.query.keyword));
    }

    res.json({ msg: "List of post for specific community id", body: data });
};

module.exports.indexByUserId = async (req, res) => {
    const user_id = req.params.id;

    let data = await query(
        'SELECT post.*, user.username, community.name FROM `post` LEFT JOIN user ON post.user_id = user.id LEFT JOIN community on post.community_id = community.id WHERE post.user_id = (?)',
        [user_id]
    );

    if (req.query.keyword) {
        data = data.filter(item => item.text_content.includes(req.query.keyword));
    }

    res.json({ msg: "List of post for specific user id", body: data });
};

module.exports.create = async (req, res) => {
    const data = req.body;

    const creation_query = await query(
        'INSERT INTO post (title, text_content, votes, media_url, community_id, user_id) VALUES (?, ?, ?, ?, ?, ?)',
        [data.title, data.text_content, 1, data.media_url, data.community_id, data.user_id]
    )

    const last_created = await query('SELECT * FROM post WHERE id = (?)', [creation_query.insertId])

    res.json({ msg: "Created a post", body: last_created });
};

module.exports.delete = async (req, res) => {
    const post_id = req.params.id;
    await query('DELETE FROM post WHERE post.id=(?)', [post_id]);
    res.json({ msg: "Deleted a post", data: "Deleted post with id: " + post_id });
};