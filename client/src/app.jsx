import React, { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import Products from "./components/Products";
import BillGenerator from "./components/BillGenerator";
import OCRUploader from './components/OCRUploader';
import TranscribeUploader from './components/TranscribeUploader';

export default function App() {
  const [view, setView] = useState('dashboard');

  return (
    <div className="app">
      <div className="header">
        <h1>Skill_Seva — Shopkeeper Assistant</h1>
        <div>
          <button className="btn" onClick={() => setView('dashboard')}>Dashboard</button>{' '}
          <button className="btn" onClick={() => setView('products')}>Products</button>{' '}
          <button className="btn" onClick={() => setView('bill')}>Bill</button>{' '}
          <button className="btn" onClick={() => setView('ocr')}>OCR</button>{' '}
          <button className="btn" onClick={() => setView('transcribe')}>Transcribe</button>
        </div>
      </div>

      <div className="grid">
        <div>
          <div className="card" style={{ marginBottom: 12 }}>
            {view === 'dashboard' && <Dashboard />}
            {view === 'products' && <Products />}
            {view === 'bill' && <BillGenerator />}
            {view === 'ocr' && <OCRUploader />}
            {view === 'transcribe' && <TranscribeUploader />}
          </div>
        </div>

        <div>
          <div className="card">
            <h3>Quick Help</h3>
            <p className="small">Use the Products page to add items. Generate a bill on the Bill tab. OCR & Transcription use OpenAI when API key is present on the server.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
