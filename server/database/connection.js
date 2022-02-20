const {MongoClient} = require('mongodb');

const uri = 'mongodb+srv://pointr-admin:raikes2022@cluster0.kyao8.mongodb.net/Cluster0?retryWrites=true&w=majority';


async function connect(database) {
    const client = new MongoClient(uri);
    try {
        await client.connect();
    } catch (e) {
        console.error(e);
    }
    return client.db(database);
}

async function getUser(db, user) {
    return await db.collection('users').findOne({name: user});
}

async function addUser(db, user) {
    await db.collection('users').insertOne(user)
}

module.exports = {
    connect,
    getUser,
    addUser
}