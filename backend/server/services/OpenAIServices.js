const { OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY
});

module.exports.ask = async (prompt) => {
    const openAiRequest = await openai.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        functions: [
            {
                "name": "generate_community",
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
                            "description": "Description of the community (max 250 char)",
                        },
                    } 
                },
            },
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
            },
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
            },
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

module.exports.imagine = async (prompt) => {
    const imageRequest = await openai.images.generate({
        prompt: prompt,
        n: 1,
        size: "512x512",
      });

    return imageRequest.data[0].url;
}