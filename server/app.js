import express from "express";
const app = express();
const port = 3000;

app.get("/", async (req, res) => {
	res.send("Ecwid task server");
});

app.listen(port, () => {
	`App running on port: ${port}`;
});
