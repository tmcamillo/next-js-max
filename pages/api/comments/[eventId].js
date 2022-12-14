import {
    connectDatabase,
    insertDocument,
    getAllDocuments,
} from '../../../helpers/db-utils'

async function handler(req,res) {
    // it is an API dinamic because the ID of the event to which the comment belongs,
    // should be encoded on URL as part of instructions. path:  /comment/some-eventId
    const eventId = req.query.eventId; //same identifier named on file name retrieve URL id

    let client;

    try {
        client = await connectDatabase();
    } catch (error) {
        res.status(500).json({ message: 'Connecting to the database failed!' });
        return;
    }

    if(req.method === 'POST') {
        const { email, name, text } = req.body
        if(!email || !email.includes('@') || !name || name.trim === '' || !text || text.trim === ''){
            res.status(422).json({message: 'Invalid input.'});
            client.close();
            return;
        }
        const newComment = {
            email,
            name,
            text,
            eventId
        }

        let result;

        try {
            result = await insertDocument(client, 'comments', newComment);
            newComment._id = result.insertedId;
            res.status(201).json({ message: 'Added comment.', comment: newComment });
        } catch (error) {
            res.status(500).json({ message: 'Inserting comment failed!' });
        }
    }
    if(req.method === 'GET') {
        try {
            const documents = await getAllDocuments(client, 'comments', { _id: -1 }, { eventId: eventId });
            res.status(200).json({ comments: documents });
        } catch (error) {
            res.status(500).json({ message: 'Getting comments failed.' });
        }
    }
    client.close();
}
export default handler;