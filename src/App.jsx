import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
	const [toDos, setToDos] = useState([]);
	const [newToDo, setNewToDo] = useState("");
	const [counter, setCounter] = useState();

	useEffect(() => {
		const fetchWithAxios = async () => {
			await axios
				.get("/api/todos")
				.then(res => {
					setToDos(res.data);
				})

				.catch(err => console.error(`Fehler beim fetchen der todos: ${err}`));
		};
		fetchWithAxios();
	}, []);

	const addToDo = () => {
		const postToDo = async () => {
			await axios
				.post("/api/todos", { title: newToDo, completed: false })
				.then(res => {
					setToDos(prevToDos => [...prevToDos, res.data]);
					setNewToDo("");
				})
				.catch(err =>
					console.error(`Fehler beim erstellen des neuen ToDos: ${err}`),
				);
		};
		postToDo();
	};

	return (
		<>
			<div>
				<h1>ToDo Liste</h1>
				<ul>
					{toDos.map((singleTodo, index) => {
						//!DAS RETURN NIIIICHT VERGESSEN!!!!!!!!!
						return <li key={index}>{singleTodo.title}</li>;
					})}
				</ul>

				<input
					type='text'
					value={newToDo}
					onChange={e => setNewToDo(e.target.value)}
				/>
				<button onClick={addToDo}>hinzufuegen</button>
			</div>
		</>
	);
}

export default App;
