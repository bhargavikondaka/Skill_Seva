# Skill_Seva

Local shopkeeper assistant (Skill_Seva) — full-stack example:
- Backend: Node.js + Express + SQLite
- Frontend: React (Vite)
- Features: product CRUD, bill generator, OCR upload stub, speech transcription stub, OpenAI integration hooks

## Quick start (Windows / PowerShell)

1. Clone or create folder and paste these files into `Skill_Seva/`.
2. Copy env:
   - `copy server/.env.example server/.env`
   - Edit `server/.env` and set `OPENAI_API_KEY` (optional for some endpoints).
3. Install and run:
```powershell
cd Skill_Seva
npm run setup     # installs server + client
npm run dev       # runs server (3000) and client (5173)
```
