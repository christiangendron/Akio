const query = require('../database/mariadb');
const { OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY
});

module.exports.index = async (req, res) => {
    const data = await query('SELECT * from community');
    res.json({ msg: "List of community", body: data });
};

module.exports.create = async (req, res) => {
    const communityList = await query('SELECT community.name from community');

    console.log(communityList)

    const openAiRequest = await openai.chat.completions.create({
        messages: [{ role: 'user', content: `Create me a subreddit (community on specific subject) not already in this list : ${communityList}` }],
        functions: [
            {
                "name": "create_community",
                "description": "Function to create a new community",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "name": {
                            "type": "string",
                            "description": "Name of the community",
                        },
                        "description": {
                            "type": "string",
                            "description": "Description of the community",
                        },
                    } 
                },
            }
        ],
        model: 'gpt-3.5-turbo',
      }); 

    const parsedRes = JSON.parse(openAiRequest.choices[0].message.function_call.arguments);

    console.log(parsedRes)

    const creation_query = await query('INSERT INTO community (name, description) VALUES (?, ?)', [parsedRes.name, parsedRes.description])
    const last_created = await query('SELECT * FROM community WHERE id = (?)', [creation_query.insertId])
    res.json({ msg: "Create a community", body: last_created });
};

module.exports.delete = async (req, res) => {
    const community_id = req.params.id;
    await query('DELETE FROM community WHERE community.id=(?)', [community_id]);
    res.json({ msg: "Deleted a community", body: "Deleted community with id: " + community_id });
};