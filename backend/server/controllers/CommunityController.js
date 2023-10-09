const query = require('../database/mariadb');
const OpenAI = require('../services/OpenAIServices');

module.exports.index = async (req, res) => {
    const data = await query('SELECT * from community');
    res.status(200).json({ msg: "List of all communities", body: data });
};

module.exports.create = async (req, res) => {
    const communityList = await query('SELECT community.name from community');

    const openAIresponce = await OpenAI.ask(`Generate a community with a unique and creative name and description for my Reddit clone. The name should be catchy, relevant, and appealing to potential users. Make sure it does not already exist in this list : ${communityList}`);

    if (!openAIresponce.name || !openAIresponce.description) {
        res.status(503).json({ msg: `OpenAI returned something empty or incomplete, community creation failed.`}); return;
    }

    const insertQuery = await query('INSERT INTO community (name, description) VALUES (?, ?)', [openAIresponce.name, openAIresponce.description])

    res.status(201).json({ 
        msg: `A community was created`, 
        body: { 
            id: Number(insertQuery.insertId), 
            name: openAIresponce.name, 
            description: openAIresponce.description 
        } 
    });
};

module.exports.delete = async (req, res) => {
    const community_id = req.params.id;
    const deleteQuery = await query('DELETE FROM community WHERE community.id=(?)', [community_id]);

    if (deleteQuery.affectedRows == 0) {
        res.status(500).json({ msg: "Community deletion failed." }); return;
    }

    res.status(204).json({ msg: "Deleted a community", body: "Deleted community with id: " + community_id });
};