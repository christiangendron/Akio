const query = require('../database/mariadb');
const OpenAI = require('../services/OpenAIServices');

module.exports.index = async (req, res) => {
    const data = await query('SELECT * from user');
    res.status(200).json({ msg: "List of users", body: data });
};

module.exports.create = async (req, res) => {
    const openAIres = await OpenAI.ask('Generate a new user, provide original usernames and not common names like John Doe');

    if (!openAIres.username || !openAIres.role) {
        res.status(503).json({ msg: `OpenAI returned something empty or incomplete, user creation failed.`}); return;
    }

    const insert = await query('INSERT INTO user (username, role) VALUES (?, ?)',[openAIres.username, openAIres.role])

    if (insert.affectedRows == 0) {
        res.status(500).json({ msg: `User creation failed to save to the database.`}); return;
    }

    res.status(201).json({ 
        msg: "A new user was created.", 
        body: { 
            id: Number(insert.insertId), 
            username: openAIres.username, 
            role: openAIres.role 
        } 
    });
};

module.exports.delete = async (req, res) => {
    const user_id = req.params.id;
    const deleteQuery = await query('DELETE FROM user WHERE user.id=(?)', [user_id]);

    if (deleteQuery.affectedRows == 0) {
        res.status(500).json({ msg: "User deletion failed." }); return;
    }

    res.status(204).json({ msg: "Deleted a user", body: "Deleted a user with id: " + user_id });
};