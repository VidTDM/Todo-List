import React, { useState, useEffect, useRef } from 'react';

const Todo = ({ text, todo, todos, setTodos }) => {
    const li = useRef(null);
    // UseEffect
    const newText = useRef();
    useEffect(() => {
        const regex = /(https|http):\/\/([a-z.0-9-]+)([\S+])*/gim;

        newText.current = text
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(regex, match => {
                return `<a href="${match}" target="_blank" rel=noopener>${match}</a>`
            });

        li.current.innerHTML = newText.current;
    });
    // Use States
    const [todo_itemDisplay, setTodo_itemDisplay] = useState('unset');
    const [todo_itemInputDisplay, setTodo_itemInputDisplay] = useState('none');
    const [editBtnDisplay, setEditBtnDisplay] = useState('unset');
    const [saveBtnDisplay, setSaveBtnDisplay] = useState('none');
    const [editInputText, setEditInputText] = useState(text);
    // Events
    const deleteHandler = () => { setTodos(todos.filter(el => el.id !== todo.id)) }
    const completeHandler = () => {
        setTodos(todos.map(item => {
            if (item.id === todo.id) {
                return {
                    ...item,
                    completed: !item.completed
                }
            }
            return item;
        }));
    }
    const editHandler = () => {
        setTodo_itemDisplay('none');
        setTodo_itemInputDisplay('unset');
        setEditBtnDisplay('none');
        setSaveBtnDisplay('unset');
    }
    const saveHandler = () => {
        if (editInputText === '') return console.error('Todo Name Is Empty')
        if (/^\s+$/.test(editInputText)) return console.error('Todo Name Is Whitespace')
        if (editInputText.length > 200) return console.error('Todo Name Is Too Long')
        setEditInputText('');
        setTodo_itemDisplay('unset');
        setTodo_itemInputDisplay('none');
        setEditBtnDisplay('unset');
        setSaveBtnDisplay('none');
        const todos = JSON.parse(localStorage.todos);
        todos.forEach(item => {
            if (item.id === todo.id) item.text = editInputText
        });
        setTodos(todos);
        setEditInputText(text);
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    const editInputHandler = (e) => { setEditInputText(e.target.value) }
    return (
        <div className="todo">
            <li className={`todo-item ${todo.completed ? "completed" : ''}`} style={{ display: todo_itemDisplay }} ref={li}>{text}</li>
            <input value={editInputText} placeholder={text} style={{ display: todo_itemInputDisplay }} id="edit-input" onChange={editInputHandler} onKeyDown={e => { if (e.key === 'Enter') saveHandler() }} />
            <div className="todo-actions-list">
                <button onClick={editHandler} className="edit-btn" style={{ display: editBtnDisplay }}>
                    <i className="fas fa-pencil-alt"></i>
                </button>
                <button onClick={saveHandler} className="save-btn" style={{ display: saveBtnDisplay }}>
                    <i className="fas fa-save"></i>
                </button>
                <button onClick={completeHandler} className="complete-btn">
                    <i className="fas fa-check"></i>
                </button>
                <button onClick={deleteHandler} className="trash-btn">
                    <i className="fas fa-trash"></i>
                </button>
            </div>
        </div>
    )
}

export default Todo;