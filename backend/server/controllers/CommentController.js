const query = require('../database/mariadb');
const OpenAI = require('../services/OpenAIServices');


module.exports.index = async (req, res) => {
    const post_id = req.params.id;

    const data = await query('SELECT comment.*, user.username FROM `comment` LEFT JOIN user ON comment.user_id = user.id WHERE comment.post_id = (?)', [post_id]);

    res.status(200).json({ msg: "List of comment for post id", body: data });
};

module.exports.create = async (req, res) => {
    const post_id = req.params.id;

    const data = await query('SELECT post.text_content, post.user_id from post WHERE post.id = (?)', [post_id]);

    const openAiRequest = await OpenAI.ask(`Create a text comment for it this post: ${data}`)
    
    if (!openAiRequest.text_content) {
        res.status(503).json({ msg: `OpenAI returned something empty or incomplete, comment creation failed.`}); return;
    }

    // Random data for now
    const randomUserID = await getRandomUserID();
    const randomVoteCount = Math.floor(Math.random() * (99 - 1 + 1)) + 1;

    const insertQuery = await query(
        'INSERT INTO comment (text_content, votes, user_id, post_id) VALUES (?, ?, ?, ?)', 
        [openAiRequest.text_content, randomVoteCount, randomUserID, post_id]
    )

    if (insertQuery.affectedRows == 0) {
        res.status(500).json({ msg: "Comment creation failed." }); return;
    }

    res.status(201).json({ 
        msg: "Create a comment", 
        body: {
            id: Number(insertQuery.insertId), 
            text_content: openAiRequest.text_content
        } 
    });
};

module.exports.delete = async (req, res) => {
    const comment_id = req.params.id;
    const deleteQuery = await query('DELETE FROM comment WHERE comment.id=(?)', [comment_id]);

    if (deleteQuery.affectedRows == 0) {
        res.status(500).json({ msg: "Post deletion failed." }); return;
    }

    res.status(204).json({ msg: "Deleted a comment", data: "Deleted comment with id: " + comment_id });
};

async function getRandomUserID() {
    const userSumResult = await query('SELECT COUNT(*) as sum FROM user');
    const userSum = Number(userSumResult[0].sum);
    return Math.floor(Math.random() * (userSum - 1 + 1)) + 1
}