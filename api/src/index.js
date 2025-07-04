const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.get('/ping', (req, res) => {
  res.send('pong');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🔊 API escuchando en http://localhost:${PORT}`));