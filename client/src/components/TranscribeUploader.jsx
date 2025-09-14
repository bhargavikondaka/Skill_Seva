import React, { useState } from 'react';
import { miscApi } from '../api';

export default function TranscribeUploader(){
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  async function submit(e) {
    e.preventDefault();
    if (!file) return;
    const buf = await file.arrayBuffer();
    const b64 = btoa(String.fromCharCode(...new Uint8Array(buf)));
    const res = await miscApi.transcribe({ audioBase64: b64, mimeType: file.type });
    setResult(res);
  }

  return (
    <div>
      <h2>Transcribe</h2>
      <form onSubmit={submit}>
        <input type="file" accept="audio/*" onChange={e=>setFile(e.target.files[0])} />
        <div style={{ marginTop:8 }}>
          <button className="btn" type="submit">Transcribe</button>
        </div>
      </form>

      {result && (
        <div style={{ marginTop:12 }}>
          <h4>Text</h4>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
