switch (localStorage.getItem('todos')) {
    case null:
        localStorage.setItem('todos', JSON.stringify([]));
        break;
    default:
        setTodos(JSON.parse(localStorage.getItem('todos')));
        break;
}

function setTodos(todos) {
    const ul = document.querySelector('ul.todo-list');
    ul.innerHTML = '';
    const reverseTodos = todos.reverse();
    reverseTodos.forEach(el => {
        const todo = document.createElement('div');
        const li = document.createElement('li');
        const span = document.createElement('span');
        const btn = document.createElement('button');

        li.innerHTML = el.text;
        span.setAttribute('class', 'badge bg-primary');
        span.textContent = el.tag;
        li.appendChild(span);
        btn.innerHTML = '<i class="fas fa-trash"></i>';
        btn.setAttribute('onclick', 'deleteTodo(this.parentNode.id)');
        btn.setAttribute('class', 'btn btn-danger');
        todo.appendChild(li);
        todo.appendChild(btn);
        todo.setAttribute('id', el.id);
        todo.setAttribute('class', 'todo');

        ul.appendChild(todo);
    });
}

function createTodo() {
    const todoTextInput = document.querySelectorAll('input.form-control')[0];
    const tagTextInput = document.querySelectorAll('input.form-control')[1];
    const closeButton = document.querySelector('.close-');

    const rawTodoText = todoTextInput.value;
    const tag = tagTextInput.value;
    if (rawTodoText === '' || /^s+$/.test(rawTodoText) || rawTodoText.length > 200 || tag.length > 10) return closeButton.click()
    const todoText = rawTodoText
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/(https|http):\/\/([a-z.0-9-]+)([\S+])*/gim, m => {
            return `<a href="${m}" target="_blank" rel=noopener>${m}</a>`
        });
    const todos = JSON.parse(localStorage.getItem('todos').replace(/[|]/g, ''));
    localStorage.setItem('todos', JSON.stringify(
        [
            {
                text: todoText,
                tag: tag,
                id: Math.random() * 1000
            },
            ...todos
        ]
    ));
    todoTextInput.value = '';
    tagTextInput.value = '';
    setTodos(JSON.parse(localStorage.getItem('todos')));
    closeButton.click();
}

function deleteTodo(id) {
    const todos = JSON.parse(localStorage.getItem('todos'));
    const deletedTodos = todos.filter(el => el.id != id);
    localStorage.setItem('todos', JSON.stringify(deletedTodos));
    setTodos(JSON.parse(localStorage.getItem('todos')));
}