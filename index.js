import express from 'express';
import sqlite from 'sqlite';

import api from './api';

const PORT = process.env.PORT || 3001;
const app = express();

sqlite.open('./db.sqlite').then(db => {
  global.db = db;
  app.use('/api', api);
  app.listen(PORT, () => `Listening at http://localhost:${PORT}`);
});
