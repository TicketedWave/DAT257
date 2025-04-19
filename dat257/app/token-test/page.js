"use client";
import { useState } from "react";

export default function TokenTestPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);

  const getToken = async (e) => {
    e.preventDefault();
    setError(null);
    setToken(null);

    try {
      const res = await fetch("https://your-api-url.com/api/v1/token/pair", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        setToken(data.access);
        console.log("Access Token:", data.access);
      } else {
        setError(data.detail || "Something went wrong");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Test API Token</h2>
      <form onSubmit={getToken} style={{ display: "flex", flexDirection: "column", maxWidth: "300px" }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ marginBottom: "1rem", padding: "0.5rem" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ marginBottom: "1rem", padding: "0.5rem" }}
        />
        <button type="submit" style={{ padding: "0.5rem" }}>Get Token</button>
      </form>

      {token && (
        <div style={{ marginTop: "1rem", color: "green" }}>
          <p>✅ Token received!</p>
          <code>{token}</code>
        </div>
      )}
      {error && (
        <div style={{ marginTop: "1rem", color: "red" }}>
          <p>❌ {error}</p>
        </div>
      )}
    </div>
  );
}
