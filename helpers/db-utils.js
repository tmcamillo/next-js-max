import { MongoClient } from 'mongodb';

// https://www.npmjs.com/package/mongodb
const KEY = process.env.mongodb_password;
const USER = process.env.mongodb_username;
const CLUSTER = process.env.mongodb_clustername;
const DBNAME = process.env.mongodb_database;

export async function connectDatabase() {
    const url = `mongodb+srv://${USER}:${KEY}@${CLUSTER}.bfble3u.mongodb.net/${DBNAME}?retryWrites=true&w=majority`;
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