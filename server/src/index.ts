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
	function jsonToCsv(products: any) {
		let csv = "";
		for (let i = 0; i < products.length - 1; i++) {
			const headers = Object.keys(products[0]);
			csv += headers.join(",") + "\n";
			products.forEach((obj: any) => {
				const values = headers.map((header) => obj[header]);
				csv += values.join(",") + "\n";
			});
		}

		return csv;
	}
	const csvData = jsonToCsv(req.body.exportableProducts);
	console.log(csvData);

	res.attachment("products.csv").send(csvData);
});
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
