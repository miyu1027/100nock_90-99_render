const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    const msg = process.env.MESSAGE || "No env variable set";
    res.send(`ENV MESSAGE: ${msg}`);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
