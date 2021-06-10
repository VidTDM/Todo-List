import React, { useState, useEffect } from "react";
import "./App.css";
// Importing Componenets
import Form from "./components/Form";
import TodoList from "./components/TodoList";
import Navbar from './components/Navbar';

function App() {
    // State Stuff
    const [inputText, setInputText] = useState("");
    const [todos, setTodos] = useState([]);
    const [status, setStatus] = useState("all");
    const [filteredTodos, setFilteredTodos] = useState([]);
    // Use Effect
    useEffect(() => {
        switch (localStorage.getItem("todos")) {
            case null:
                localStorage.setItem("todos", JSON.stringify([]))
                break;
            default:
                let todoLocal = JSON.parse(localStorage.getItem("todos"));
                setTodos(todoLocal)
                break;
        }
    }, []);
    useEffect(() => {
        switch (status) {
            case "completed":
                setFilteredTodos(todos.filter((todo) => todo.completed === true));
                break;
            case "uncompleted":
                setFilteredTodos(todos.filter((todo) => todo.completed === false));
                break;
            default:
                setFilteredTodos(todos);
                break;
        }
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos, status]);
    return (
        <div className="App">
            <Navbar />
            <header>
                <h1>Todo List</h1>
            </header>
            <Form
                inputText={inputText}
                todos={todos}
                setTodos={setTodos}
                setInputText={setInputText}
                setStatus={setStatus}
            />
            <TodoList
                setTodos={setTodos}
                todos={todos}
                filteredTodos={filteredTodos}
            />
        </div>
    );
}

export default App;