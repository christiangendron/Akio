const query = require('../database/mariadb');
const OpenAI = require('../services/OpenAIServices');
const ImageService = require('../services/ImageService');

module.exports.index = async (req, res) => {
    let keywordFilter = '';
    let queryParams = [];

    if (req.query.keyword) {
        keywordFilter = 'WHERE post.text_content LIKE ? OR post.title LIKE ?';
        const keywordParam = `%${req.query.keyword}%`;
        queryParams.push(keywordParam, keywordParam);
    }

    const queryStr = `
        SELECT post.*, user.username, community.name
        FROM post
        LEFT JOIN user ON post.user_id = user.id
        LEFT JOIN community ON post.community_id = community.id
        ${keywordFilter}
    `;

    let data = await query(queryStr, queryParams);

    res.status(200).json({ msg: "List of all post", body: data });
};

module.exports.indexByCommunityId = async (req, res) => {
    const community_id = req.params.id;
    const keywordParam = req.query.keyword ? `%${req.query.keyword}%` : null;

    const queryStr = `
        SELECT post.*, user.username, community.name
        FROM post
        LEFT JOIN user ON post.user_id = user.id
        LEFT JOIN community ON post.community_id = community.id
        WHERE post.community_id = ?
        ${keywordParam ? 'AND (post.text_content LIKE ? OR post.title LIKE ?)' : ''}
    `;

    const queryParams = [community_id];

    if (keywordParam) {
        queryParams.push(keywordParam, keywordParam);
    }

    const data = await query(queryStr, queryParams);

    res.status(200).json({ msg: "List of post for specific community id", body: data });
};

module.exports.indexByUserId = async (req, res) => {
    const user_id = req.params.id;
    const keywordParam = req.query.keyword ? `%${req.query.keyword}%` : null;

    const queryStr = `
        SELECT post.*, user.username, community.name
        FROM post
        LEFT JOIN user ON post.user_id = user.id
        LEFT JOIN community ON post.community_id = community.id
        WHERE post.user_id = ?
        ${keywordParam ? 'AND (post.text_content LIKE ? OR post.title LIKE ?)' : ''}
    `;

    const queryParams = [user_id];

    if (keywordParam) {
        queryParams.push(keywordParam, keywordParam);
    }

    const data = await query(queryStr, queryParams);

    res.status(200).json({ msg: "List of post for specific user id", body: data });
};

module.exports.create = async (req, res) => {
    const data = req.body;

    const openAIres = await OpenAI.ask(`Create a post  in the style of a Reddit post for this community : ${data.community_name}`);

    if (!openAIres.title || !openAIres.text_content) {
        res.status(503).json({ msg: `OpenAI returned something empty or incomplete, post creation failed.`}); return;
    }

    if (openAIres.has_media) {
        const imageRequest = await OpenAI.imagine(openAIres.text_content)
        openAIres.media_url = await ImageService.saveImages(imageRequest);
    }

    // Random info for the post for now
    const randomUserID = await getRandomUserID();
    const randomVoteCount = Math.floor(Math.random() * (99 - 1 + 1)) + 1;

    const insertQuery = await query(
        'INSERT INTO post (title, text_content, votes, media_url, community_id, user_id) VALUES (?, ?, ?, ?, ?, ?)',
        [openAIres.title, openAIres.text_content, randomVoteCount, openAIres.media_url, data.community_id, randomUserID]
    )
    
    if (insertQuery.affectedRows == 0) {
        res.status(500).json({ msg: `Post creation failed to save to the database.`}); return;
    }

    res.status(201).json({ 
        msg: `A post was created`, 
        body: { 
            id: Number(insertQuery.insertId), 
            title: openAIres.title, 
            text_content: openAIres.text_content, 
            votes: randomVoteCount, 
            media_url: openAIres.media_url, 
            community_id: data.community_id, 
            user_id: randomUserID 
        } 
    });
};

module.exports.delete = async (req, res) => {
    const post_id = req.params.id;
    const deleteQuery = await query('DELETE FROM post WHERE post.id=(?)', [post_id]);

    if (deleteQuery.affectedRows == 0) {
        res.status(500).json({ msg: "Post deletion failed." }); return;
    }

    res.status(204).json({ msg: "Deleted a post", data: "Deleted post with id: " + post_id });
};

async function getRandomUserID() {
    const userSumResult = await query('SELECT COUNT(*) as sum FROM user');
    const userSum = Number(userSumResult[0].sum);
    return Math.floor(Math.random() * (userSum - 1 + 1)) + 1
}