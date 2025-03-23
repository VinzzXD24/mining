import { useState } from "react";

export default function Home() {
  const [status, setStatus] = useState("");

  const mineBlock = async () => {
    try {
      const res = await fetch("/api/mine");
      const data = await res.json();
      setStatus(JSON.stringify(data, null, 2));
    } catch (error) {
      setStatus("Error: " + error.message);
    }
  };

  const getChain = async () => {
    try {
      const res = await fetch("/api/chain");
      const data = await res.json();
      setStatus(JSON.stringify(data, null, 2));
    } catch (error) {
      setStatus("Error: " + error.message);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", fontFamily: "Arial, sans-serif", textAlign: "center" }}>
      <h1>Simulasi Blockchain</h1>
      <button onClick={mineBlock} style={{ marginRight: "10px", padding: "10px" }}>
        Mine Block
      </button>
      <button onClick={getChain} style={{ padding: "10px" }}>
        Lihat Chain
      </button>
      <h2>Status</h2>
      <pre style={{ background: "#f4f4f4", padding: "10px", textAlign: "left" }}>{status}</pre>
    </div>
  );
          }
