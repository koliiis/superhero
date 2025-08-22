const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const superheroRoutes = require('./routes/superheroes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/superheroes', superheroRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
