require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const setupDb = require('./config/db');

const userRoutes = require('./routes/user');
const eventRoutes = require('./routes/event');
const chatRoutes = require('./routes/chat');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Main function to run the server
async function startServer() {
    try {
        const db = await setupDb();
        app.locals.db = db;
        console.log('Connected to SQLite Database');

        app.use('/api/user', userRoutes);
        app.use('/api/events', eventRoutes);
        app.use('/api/chat', chatRoutes);

        app.get('/', (req, res) => {
            res.send('EventHub API is running...');
        });

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Failed to connect to database', err);
    }
}

startServer();
