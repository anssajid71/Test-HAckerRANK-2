const express = require('express');
const app = express();
app.use(express.json());

const analyticsRoute = require('./routes/analytics');

app.use('/analytics', analyticsRoute);

app.delete('/analytics/:id', (req, res) => {
  res.status(405).json({ error: 'Method Not Allowed' });
});

app.put('/analytics/:id', (req, res) => {
  res.status(405).json({ error: 'Method Not Allowed' });
});

app.patch('/analytics/:id', (req, res) => {
  res.status(405).json({ error: 'Method Not Allowed' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
