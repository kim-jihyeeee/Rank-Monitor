"use client";

import { useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const run = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/monitor-batch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          keywords: ["모두투어서유럽패키지여행"],
          domains: ["modetourgo.com"]
        })
      });

      const json = await res.json();
      setData(json.rows || []);
    } catch (error) {
      console.error(error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>프로젝트3 모니터</h1>
      <button onClick={run} disabled={loading}>
        {loading ? "실행중..." : "실행"}
      </button>

      <div style={{ marginTop: 20 }}>
        {data.map((d, i) => (
          <div key={i}>
            {d.keyword} / {d.rank} / {d.domain}
          </div>
        ))}
      </div>
    </div>
  );
}
