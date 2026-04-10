const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');
const fs = require('fs');

async function setupDb() {
    const dbPath = path.join(__dirname, '../../Database/eventhub.db');
    const schemaPath = path.join(__dirname, '../../Database/schema.sql');

    const db = await open({
        filename: dbPath,
        driver: sqlite3.Database
    });

    // Run schema if db is new
    if (fs.existsSync(schemaPath)) {
        const schema = fs.readFileSync(schemaPath, 'utf8');
        await db.exec(schema);
    }

    return db;
}

module.exports = setupDb;
