require("dotenv").config();
const https = require("https")
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

app.get("/login", (req, res) => {
    const scope = 'user-read-private user-read-email user-top-read playlist-read-private';
    const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
    res.redirect(authUrl);
});

app.post("/callback", async (req, res) => {
    try {
        const code = req.body.code;

        const params = new URLSearchParams();
        params.append('grant_type', 'authorization_code');
        params.append('code', code);
        params.append('redirect_uri', REDIRECT_URI);

        const tokenResponse = await axios.post('https://accounts.spotify.com/api/token', params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')
            },
            httpsAgent: new https.Agent({ rejectUnauthorized: false })
        });

        res.json(tokenResponse.data)
    } catch (error) {
        console.error("\nFull Error:\n", error + "\n");
    }
})

app.get("/me", async (req, res) => {
    const accessToken = req.headers.authorization?.split(' ')[1];  // Expecting: Bearer <token>

    if (!accessToken) {
        return res.status(400).json({ error: "Access Token Missing" });
    }

    try {
        const profileResponse = await axios.get('https://api.spotify.com/v1/me', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            httpsAgent: new https.Agent({ rejectUnauthorized: false })
        });
        res.json(profileResponse.data);
    } catch (error) {
        console.error(`\n${error.response.data}\n`);
        res.status(500).json({ error: "Failed to fetch profile", details: error.response.data, fullerror: error });
    }
});

app.get("/playlists", async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const playlists = await axios.get('https://api.spotify.com/v1/me/playlists', {
            headers: { Authorization: `Bearer ${token}` },
            httpsAgent: new https.Agent({ rejectUnauthorized: false })
        });
        res.json(playlists.data);
    } catch (error) {
        console.error(`\n${error.response.data}\n`);
        res.status(500).json({ error: "Failed to fetch artists", details: error.response.data });
    }
})

app.get("/top-artists", async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const topArtists = await axios.get('https://api.spotify.com/v1/me/top/artists', {
            headers: { Authorization: `Bearer ${token}` }
        });
        res.json(topArtists.data);
    } catch (error) {
        console.error(`\n${error.response.data}\n`);
        res.status(500).json({ error: "Faild to fetch Top Aartists", details: error.response.data })
    }
})

app.get("/search", async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const { q, type } = req.query;
        const searchResults = await axios.get(`https://api.spotify.com/v1/search`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { q, type, limit: 10 }
        });
        res.json(searchResults.data);
    } catch (error) {
        console.error(`\n${error.response.data}\n`);
        res.status(500).json({ error: "Faild to fetch search", details: error.response.data })
    }
})

app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
});