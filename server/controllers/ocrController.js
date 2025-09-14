import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { OpenAI } from 'openai';
import toReadableFile from '../utils/toReadableFile.js';

const upload = multer({ dest: './server/tmp' });
const openaiKey = process.env.OPENAI_API_KEY;

async function visionOcr(req, res) {
  // Accept either imageUrl or uploaded file (multipart/form-data)
  try {
    const { imageUrl } = req.body || {};
    if (!imageUrl && !req.file) {
      return res.status(400).json({ error: 'imageUrl or file required' });
    }

    // If no OpenAI key, return a sample response
    if (!openaiKey) {
      return res.json({
        data: { items: [{ name: 'Maggi 70g', price: 14 }, { name: 'Pepsi 600ml', price: 40 }] }
      });
    }

    const client = new OpenAI({ apiKey: openaiKey });

    let fileObj;
    if (req.file) {
      const buffer = fs.readFileSync(req.file.path);
      fileObj = await toReadableFile(buffer, req.file.originalname || 'upload.jpg');
      fs.unlinkSync(req.file.path);
    } else {
      // imageUrl: ask model to extract (for newer APIs you might use vision endpoints)
      // Here we send a chat completion that includes the URL for model to fetch (if supported).
      const completion = await client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'Extract product names and prices from the following image URL. Return valid JSON.' },
          { role: 'user', content: `URL: ${imageUrl}` }
        ],
        response_format: { type: 'json_object' },
        temperature: 0.1
      });
      return res.json({ data: completion.choices?.[0]?.message?.content ?? null });
    }

    // Example: if using OpenAI files or vision pipelines, adapt accordingly.
    const result = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'Extract item names and prices from uploaded image. Return JSON { items:[{name,price}] }.' },
        { role: 'user', content: [{ type: 'text', text: 'Please extract items and prices.' }, { type: 'input_image', image_base64: (await fileObj.arrayBuffer()) ? Buffer.from(await fileObj.arrayBuffer()).toString('base64') : null }] }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.0
    });

    const data = result.choices?.[0]?.message?.content ?? {};
    return res.json({ data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err?.message || 'server_error' });
  }
}

async function transcribeAudio(req, res) {
  // Accept audioBase64 in json -> decode and call OpenAI if key present, else echo
  try {
    const { audioBase64, mimeType = 'audio/mpeg' } = req.body || {};
    if (!audioBase64) return res.status(400).json({ error: 'audioBase64 required' });
    if (!openaiKey) {
      return res.json({ text: '[transcription unavailable without OPENAI_API_KEY]. Sample: Hello from Skill_Seva' });
    }
    const client = new OpenAI({ apiKey: openaiKey });
    const buffer = Buffer.from(audioBase64, 'base64');
    const fileObj = await toReadableFile(buffer, `voice.${mimeType.split('/')[1] || 'mp3'}`);

    const transcription = await client.audio.transcriptions.create({
      model: 'whisper-1',
      file: fileObj
    });
    return res.json({ text: transcription?.text || '' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err?.message || 'server_error' });
  }
}

export default { visionOcr: (req, res, next) => upload.single('file')(req, res, err => { if (err) return res.status(500).json({ error: err.message }); visionOcr(req, res, next); }), transcribeAudio };
