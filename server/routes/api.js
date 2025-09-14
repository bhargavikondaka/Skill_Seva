import express from 'express';
import billController from '../controllers/billController.js';
import ocrController from '../controllers/ocrController.js';
import productController from '../controllers/productController.js';

const router = express.Router();

router.get('/health', (_req, res) => res.json({ ok: true }));

// bill
router.post('/bill', billController.generateBill);

// ocr
router.post('/vision-ocr', ocrController.visionOcr);

// transcribe (simple stub)
router.post('/transcribe', ocrController.transcribeAudio);

// product list quick route (delegates to products router too)
router.get('/products/alerts', productController.lowStockAlerts);

export default router;
