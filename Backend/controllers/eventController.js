const createEvent = async (req, res) => {
    const { title, description, date, location, category, created_by } = req.body;
    const db = req.app.locals.db;

    try {
        await db.run('INSERT INTO events (title, description, date, location, category, created_by) VALUES (?, ?, ?, ?, ?, ?)', [title, description, date, location, category, created_by]);
        res.json({ message: 'Event created successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};

const getAllEvents = async (req, res) => {
    const db = req.app.locals.db;

    try {
        const events = await db.all('SELECT * FROM events ORDER BY date ASC');
        res.json({ events });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};

const getNearbyEvents = async (req, res) => {
    const { location } = req.query;
    const db = req.app.locals.db;

    try {
        const events = await db.all('SELECT * FROM events WHERE location LIKE ?', [`%${location}%`]);
        res.json({ events });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};

module.exports = { createEvent, getAllEvents, getNearbyEvents };
