import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import apiRoutes from './routes/api.js';
import productsRoutes from './routes/products.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true }));

// ensure data folder exists
const dataDir = path.resolve('./server/data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

// Routes
app.use('/api', apiRoutes);
app.use('/api/products', productsRoutes);

// health
app.get('/health', (_req, res) => res.json({ ok: true }));

app.listen(port, () => {
  console.log(`Skill_Seva server listening on http://localhost:${port}`);
});
