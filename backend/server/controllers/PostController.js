const query = require('../database/mariadb');
const { OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY
});

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

    const openAiRequest = await openai.chat.completions.create({
        messages: [{ role: 'user', content: `Create a post  in the style of a Reddit post for this community : ${data.community_name}` }],
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

    const parsedRes = JSON.parse(openAiRequest.choices[0].message.function_call.arguments);

    if (parsedRes.has_media) {
        // TODO: Generate an image and place the url in the media_url field
    }

    const creation_query = await query(
        'INSERT INTO post (title, text_content, votes, media_url, community_id, user_id) VALUES (?, ?, ?, ?, ?, ?)',
        [parsedRes.title, parsedRes.text_content, Math.floor(Math.random() * (99 - 1 + 1)) + 1, '', data.community_id, data.user_id]
    )

    const last_created = await query('SELECT * FROM post WHERE id = (?)', [creation_query.insertId])

    res.json({ msg: "Created a post", body: last_created });
};

module.exports.delete = async (req, res) => {
    const post_id = req.params.id;
    await query('DELETE FROM post WHERE post.id=(?)', [post_id]);
    res.json({ msg: "Deleted a post", data: "Deleted post with id: " + post_id });
};