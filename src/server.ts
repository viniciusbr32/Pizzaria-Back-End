import express, {
	type NextFunction,
	type Request,
	type Response,
} from "express";
import "express-async-errors";
import { route } from "./routes";
import cors from "cors";
import path from "node:path";
const app = express();

app.use(express.json());
app.use(cors());

app.use(route);

app.use("/files", express.static(path.resolve(__dirname, "..", "tmp")));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	if (err instanceof Error) {
		// se for uma instance do tipo Error
		res.status(400).json({
			error: err.message,
		});
		return;
	}
	res.status(500).json({
		status: "Error",
		message: "Internal server error",
	});
});

app.listen(3333, () => console.log("server running on port 3333"));
