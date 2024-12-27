const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = 2200;

app.use(express.json());

app.get('/getMessages', async (req, res) => {
  const token = req.headers['authorization'].split(' ')[1]; // Get Bearer token from Authorization header
  try {
    // Make a request to the Gmail API to fetch messages
    const response = await fetch('https://www.googleapis.com/gmail/v1/users/me/messages', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch messages from Gmail API');
    }

    const data = await response.json();
    const messages = data.messages.map((msg) => ({
      subject: 'Sample Subject',  // For demonstration, change this to actual message data
      body: 'This is a message body', // Replace with real message content
    }));

    res.json({ messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).send('Error fetching messages');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
