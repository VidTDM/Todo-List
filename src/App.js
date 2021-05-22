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
    const [filteredTodos, setfilteredTodos] = useState([]);
    // run once when the app starts
    useEffect(() => {
        getLocalTodos();
    }, []);
    // Use Effect
    useEffect(() => {
        filterHandler();
        saveLocalTodos();
        // eslint-disable-next-line
    }, [todos, status]);
    // Functions
    const filterHandler = () => {
        switch (status) {
            case "completed":
                setfilteredTodos(todos.filter((todo) => todo.completed === true));
                break;
            case "uncompleted":
                setfilteredTodos(todos.filter((todo) => todo.completed === false));
                break;
            default:
                setfilteredTodos(todos);
                break;
        }
    };
    // Save to local
    const saveLocalTodos = () => { localStorage.setItem("todos", JSON.stringify(todos)); };
    const getLocalTodos = () => {
        switch (localStorage.getItem("todos")) {
            case null:
                localStorage.setItem("todos", JSON.stringify([]))
                break;
            default:
                let todoLocal = JSON.parse(localStorage.getItem("todos"));
                setTodos(todoLocal)
                break;
        }
    };
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