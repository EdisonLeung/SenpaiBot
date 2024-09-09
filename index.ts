import { Context, APIGatewayProxyResult } from 'aws-lambda';
import axios from 'axios';

export const handler = async (event: any, context: Context): Promise<APIGatewayProxyResult> => {

    if (event.message === undefined || event.channel === undefined) {
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "No Message or Channel Parameter Provided",
            })
        }
    }


    const url = `https://discord.com/api/channels/${event.message.channel}/messages`

    const content = {
        content: event.message
    }

    try {
        await axios.post(url, content, {
            headers: {
                Authorization: `Bot ${process.env.DISCORD_TOKEN}`
            }
        })

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Sucessfully sent message to discord",
            })
        }
    } catch (e) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "Failed to send message to discord",
                error: JSON.stringify(e, undefined, 2),
            })
        }
    }
};