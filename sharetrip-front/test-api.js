console.log("Testing API..."); fetch("http://localhost:3001/api/accommodations").then(r => r.json()).then(d => console.log("GET:", d)).catch(e => console.error("GET Error:", e));
