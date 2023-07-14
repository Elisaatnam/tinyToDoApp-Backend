import express from "express";
import fsPromise from "fs/promises";
import { v4 as uuid } from "uuid";

const app = express();
const PORT = 9898;

const pathToToDoFile = new URL("./data/todos.json", import.meta.url);

let fileContent;
const init = async () => {
	const fileContentString = await fsPromise.readFile(pathToToDoFile, {
		encoding: "utf-8",
	});
	fileContent = JSON.parse(fileContentString);
};

init().catch(err => console.error(`Fehler bei der Initialisierung: ${err}`));

const write = async () => {
	const fileContentString = JSON.stringify(fileContent, null, 2);
	await fsPromise.writeFile(pathToToDoFile, fileContentString, {
		encoding: "utf-8",
	});
};

app.use(express.json());

app.get("/api/todos", (req, res) => {
	res.send(fileContent);
});

app.post("/api/todos", async (req, res) => {
	const newToDo = { id: uuid(), ...req.body };
	fileContent.push(newToDo);
	await write();
	res.send(`${newToDo} erfolgreich hinzugefuegt`);
});

app.listen(PORT, () => {
	console.log(`server running on PORT ${PORT}`);
});
