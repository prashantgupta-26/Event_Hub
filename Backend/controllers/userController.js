const createOrUpdateProfile = async (req, res) => {
    const { name, email, phone, location } = req.body;
    const db = req.app.locals.db;

    try {
        let user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
        if (user) {
            await db.run('UPDATE users SET name = ?, phone = ?, location = ? WHERE email = ?', [name, phone, location, email]);
            user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
        } else {
            await db.run('INSERT INTO users (name, email, phone, location) VALUES (?, ?, ?, ?)', [name, email, phone, location]);
            user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
        }
        res.json({ message: 'Profile updated successfully', user });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};

const getProfile = async (req, res) => {
    const { email } = req.query;
    const db = req.app.locals.db;

    try {
        const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ user });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};

module.exports = { createOrUpdateProfile, getProfile };
