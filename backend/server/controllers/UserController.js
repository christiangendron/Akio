const query = require('../database/mariadb');
const { OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY
});

module.exports.index = async (req, res) => {
    const data = await query('SELECT * from user');
    res.json({ msg: "List of users", body: data });
};

module.exports.create = async (req, res) => {
    const data = req.body;

    const openAiRequest = await askOpenAI();

    const creation_query = await query(
        'INSERT INTO user (username, role) VALUES (?, ?)',
        [openAiRequest.username, openAiRequest.role]
    )

    const last_created = await query('SELECT * FROM user WHERE id = (?)', [creation_query.insertId])

    res.json({ msg: "Created a user", body: last_created });
};

module.exports.delete = async (req, res) => {
    const user_id = req.params.id;
    await query('DELETE FROM user WHERE user.id=(?)', [user_id]);
    res.json({ msg: "Deleted a user", body: "Deleted a user with id: " + user_id });
};

async function askOpenAI() {
    const openAiRequest = await openai.chat.completions.create({
        messages: [{ role: 'user', content: `Generate a new user for website, provide original usernames and not common names like John Doe` }],
        functions: [
            {
                "name": "generate_user",
                "description": "Function to create a user",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "username": {
                            "type": "string",
                            "description": "original name for the user, no variable of jhon doe",
                        },
                        "role": {
                            "type": "string",
                            "description": "admin or user or moderator",
                        },
                    } 
                },
            }
        ],
        model: 'gpt-3.5-turbo',
      }); 

    return JSON.parse(openAiRequest.choices[0].message.function_call.arguments);
}