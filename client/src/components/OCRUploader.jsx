import React, { useState } from "react";

export default function OCRUploader() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result.split(",")[1];
      const res = await fetch("http://localhost:3000/api/vision-ocr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: base64 }),
      });
      const data = await res.json();
      setResult(data.data);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div>
      <h2>📷 OCR</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Extract Text</button>
      </form>

      {result && (
        <pre style={{ textAlign: "left", marginTop: "1rem" }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
