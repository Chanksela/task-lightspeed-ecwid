import express, { Request, Response } from "express";
import cors from "cors";
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
	res.send("Hello World!");
});
app.post("/api/export", (req: Request, res: Response) => {
	console.log("received body: ", req.body);
	res.json({ message: "POST REQUEST WAS SUCCESS!", data: req.body });
});
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
