import { Context, APIGatewayProxyResult } from 'aws-lambda';
import axios from 'axios';

const CHANNEL_ID = "845133014957948993";
export const handler = async (event: any, context: Context): Promise<APIGatewayProxyResult> => {

    if (event.message === undefined) {
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "No Message Parameter Provided",
            })
        }
    }


    const url = `https://discord.com/api/channels/${CHANNEL_ID}/messages`

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
                enb: process.env
            })
        }
    }
};