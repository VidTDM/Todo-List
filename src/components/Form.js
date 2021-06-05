import React from 'react';

const Form = ({ setInputText, todos, setTodos, inputText, setStatus }) => {
    const inputTextHandler = (e) => { setInputText(e.target.value); }
    const submitTodoHandler = (e) => {
        e.preventDefault();
        if (inputText === '') return console.error('Todo Name Is Empty')
        if (/^\s+$/.test(inputText)) return console.error('Todo Name Is Whitespace')
        if (inputText.length > 200) return console.error('Todo Name Too Log')
        setTodos([
            {
                text: inputText,
                completed: false,
                id: Math.random() * 1000
            },
            ...todos
        ]);
        setInputText('');
    }
    const statusHandler = (e) => { setStatus(e.target.value) }
    return (
        <form>
            <input value={inputText} onChange={inputTextHandler} type="text" placeholder="Enter Todo" className="todo-input" />
            <button onClick={submitTodoHandler} className="todo-button" type="submit">
                <i className="fas fa-plus-square"></i>
            </button>
            <div onChange={statusHandler} className="select">
                <select name="todos" className="filter-todo">
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="uncompleted">Uncompleted</option>
                </select>
            </div>
        </form>
    );
}

export default Form;