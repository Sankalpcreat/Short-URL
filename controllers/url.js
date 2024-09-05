const URL = require('../models/url');
const shortid = require('shortid');

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;

    if (!body.url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        const shortID = shortid.generate(); // Generate a unique short ID

        await URL.create({
            shortId: shortID,
            redirectURL: body.url,
            visitHistory: [],
        });

        return res.status(201).json({ id: shortID });
    } catch (error) {
        console.error('Error creating short URL:', error); // Log error for debugging
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    handleGenerateNewShortURL,
};
