const query = require('../database/mariadb');
const { OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY
});

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

    const parsedRes = await askOpenAI(data.community_name);

    if (parsedRes.has_media) {
        parsedRes.media_url = await generateImage(parsedRes.text_content)
    }

    // Get the sum of users and get a random user id
    const userID = await getRandomUserID();

    // Random votes amount for now
    const votes = Math.floor(Math.random() * (99 - 1 + 1)) + 1;

    const created = await createPost(parsedRes.title, parsedRes.text_content, votes, parsedRes.media_url, data.community_id, userID);
    
    res.json(created);
};

module.exports.delete = async (req, res) => {
    const post_id = req.params.id;
    await query('DELETE FROM post WHERE post.id=(?)', [post_id]);
    res.json({ msg: "Deleted a post", data: "Deleted post with id: " + post_id });
};

async function createPost(title, text_content, votes, media_url, community_id, user_id) {
    const creation_query = await query(
        'INSERT INTO post (title, text_content, votes, media_url, community_id, user_id) VALUES (?, ?, ?, ?, ?, ?)',
        [title, text_content, votes, media_url, community_id, user_id]
    )

    const last_created = await query('SELECT * FROM post WHERE id = (?)', [creation_query.insertId])

    return { msg: "Created a post", body: last_created }
}

async function getRandomUserID() {
    const userSumResult = await query('SELECT COUNT(*) as sum FROM user');
    const userSum = Number(userSumResult[0].sum);
    return Math.floor(Math.random() * (userSum - 1 + 1)) + 1
}

async function askOpenAI(community_name) {
    const openAiRequest = await openai.chat.completions.create({
        messages: [{ role: 'user', content: `Create a post  in the style of a Reddit post for this community : ${community_name}` }],
        functions: [
            {
                "name": "create_post",
                "description": "Function to create a post",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "title": {
                            "type": "string",
                            "description": "Title of the post",
                        },
                        "text_content": {
                            "type": "string",
                            "description": "Text content of the post related to the community",
                        },
                        "has_media": {
                            "type": "boolean",
                            "description": "Does it make sense for this post to contain an image",
                        }
                    } 
                },
            }
        ],
        model: 'gpt-3.5-turbo',
      }); 

    return JSON.parse(openAiRequest.choices[0].message.function_call.arguments);
}

async function generateImage(text_content) {
    const imageRequest = await openai.images.generate({
        prompt: text_content,
        n: 1,
        size: "512x512",
      });

    return imageRequest.data[0].url;
}