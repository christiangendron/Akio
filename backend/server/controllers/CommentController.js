const query = require('../database/mariadb');
const { OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY
});

module.exports.index = async (req, res) => {
    const post_id = req.params.id;

    const data = await query('SELECT comment.*, user.username FROM `comment` LEFT JOIN user ON comment.user_id = user.id WHERE comment.post_id = (?)', [post_id]);

    res.json({ msg: "List of comment for post id", body: data });
};

module.exports.create = async (req, res) => {
    const post_id = req.params.id;

    const data = await query('SELECT post.text_content, post.user_id from post WHERE post.id = (?)', [post_id]);

    const openAiRequest = await openai.chat.completions.create({
        messages: [{ role: 'user', content: `Here is a text post, create a text comment for it: ${data}` }],
        functions: [
            {
                "name": "create_comment",
                "description": "Function to create a new comment",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "text_content": {
                            "type": "string",
                            "description": "text content of the comment, either positive or negative or funny",
                        },
                    } 
                },
            }
        ],
        model: 'gpt-3.5-turbo',
      }); 

    const parsedRes = JSON.parse(openAiRequest.choices[0].message.function_call.arguments);

    const creation_query = await query(
        'INSERT INTO comment (text_content, votes, user_id, post_id) VALUES (?, ?, ?, ?)', 
        [parsedRes.text_content, 1, 1, post_id]
    )

    const last_created = await query('SELECT * FROM comment WHERE id = (?)', [creation_query.insertId])
    res.json({ msg: "Create a comment", body: last_created });
};

module.exports.delete = async (req, res) => {
    const comment_id = req.params.id;
    await query('DELETE FROM comment WHERE comment.id=(?)', [comment_id]);
    res.json({ msg: "Deleted a comment", data: "Deleted comment with id: " + comment_id });
};