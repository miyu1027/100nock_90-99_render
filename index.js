const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Top page");
});

app.get("/api/hello", (req, res) => {
    res.json({ message: "Hello API!" });
});

app.get("/about", (req, res) => {
    res.send("This is the about page.");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
