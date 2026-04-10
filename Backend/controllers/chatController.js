const getChatResponse = async (req, res) => {
    const { message } = req.body;

    const mockResponses = [
        "That sounds like a great event idea!",
        "Community events are the best way to meet new people.",
        "I can help you find more events like that.",
        "Have you considered hosting it on a weekend?",
        "Don't forget to invite your friends!"
    ];

    const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];

    setTimeout(() => {
        res.json({ response: randomResponse });
    }, 500); // Simulate network delay
};

module.exports = { getChatResponse };
