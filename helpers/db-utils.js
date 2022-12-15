import { MongoClient } from 'mongodb';

// https://www.npmjs.com/package/mongodb
const KEY = process.env.REACT_APP_MGKEY;
const USER = process.env.REACT_APP_MGUSER;

export async function connectDatabase() {
    const url = `mongodb+srv://${USER}:${KEY}@cluster0.bfble3u.mongodb.net/events?retryWrites=true&w=majority`;
    console.log(USER, KEY)
    const client = new MongoClient(url);
    client.connect();
    return client;
};

export async function insertDocument(client, collection, document) {
    const db = client.db();
    const result = await db.collection(collection).insertOne(document);
    return result;
};

export async function getAllDocuments(client, collection, sort, filter = {}) {
    const db = client.db();
    const documents = await db
    .collection(collection)
    .find(filter)
    .sort(sort)
    .toArray();
    return documents;
};