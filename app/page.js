"use client";

import { useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);

  const run = async () => {
    const res = await fetch("/api/monitor-batch", {
      method: "POST",
      body: JSON.stringify({
        keywords: ["모두투어서유럽패키지여행"],
        domains: ["modetourgo.com"]
      })
    });

    const json = await res.json();
    setData(json.rows);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>프로젝트3 모니터</h1>
      <button onClick={run}>실행</button>

      {data.map((d, i) => (
        <div key={i}>
          {d.keyword} / {d.rank} / {d.domain}
        </div>
      ))}
    </div>
  );
}
