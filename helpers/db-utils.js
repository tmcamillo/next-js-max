import { MongoClient } from 'mongodb';

// https://www.npmjs.com/package/mongodb

export async function connectDatabase() {
    const url = 'mongodb+srv://admin:0VpKfTlR4CPafiuD@cluster0.bfble3u.mongodb.net/events?retryWrites=true&w=majority';
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