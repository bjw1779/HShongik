const express = require("express");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const app = express();
const PORT = 1779;
const DATA_FILE = path.join(__dirname, "rows.json");

app.use(express.json());
app.use(express.static(__dirname)); // dashboard.html, map.html 등

// API: GET / POST
app.get("/api/rows", (req, res) => {
    let rows = [];
    if (fs.existsSync(DATA_FILE)) {
        try { rows = JSON.parse(fs.readFileSync(DATA_FILE, "utf8")); } 
        catch{}
    }
    res.json(rows);
});

app.post("/api/rows", (req, res) => {
    let rows = req.body.map(r => {
        if (!r.id) r.id = crypto.randomUUID();
        return r;
    });
    fs.writeFileSync(DATA_FILE, JSON.stringify(rows, null, 2));
    res.json({ status: "ok" });
});

app.listen(PORT, () => console.log(`✅ 서버 실행됨 → http://localhost:${PORT}`));
