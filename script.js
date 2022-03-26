switch (localStorage.getItem('todos')) {
    case null:
        localStorage.setItem('todos', JSON.stringify([]));
        break;
    default:
        setTodos(JSON.parse(localStorage.getItem('todos')), false);
        break;
}

function setTodos(todos, create) {
    const ul = document.querySelector('ul.todo-list');
    ul.innerHTML = '';
    todos.forEach((el, i) => {
        const todo = document.createElement('div');
        const li = document.createElement('li');
        const span = document.createElement('span');
        const btn = document.createElement('button');

        li.innerHTML = el.text;
        span.setAttribute('class', 'badge bg-primary');
        span.textContent = el.tag;
        li.appendChild(span);
        btn.innerHTML = '<i class="fas fa-trash"></i>';
        btn.setAttribute('onclick', 'deleteTodo(this.parentNode)');
        btn.setAttribute('class', 'btn btn-danger');
        todo.appendChild(li);
        todo.appendChild(btn);
        todo.setAttribute('id', el.id);
        todo.setAttribute('class', 'todo animate__animated');
        if (i === 0 && create === true)
            todo.classList.add('animate__lightSpeedInLeft');

        ul.appendChild(todo);
    });
}

function createTodo() {
    const todoTextInput = document.querySelectorAll('input.form-control')[0];
    const tagTextInput = document.querySelectorAll('input.form-control')[1];
    const closeButton = document.querySelector('.btn-close');

    const rawTodoText = todoTextInput.value;
    const tag = tagTextInput.value;
    if (rawTodoText === '' || tagTextInput === '' ||/^s+$/.test(rawTodoText) || rawTodoText.length > 200 || tag.length > 10) return closeButton.click()
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
    setTodos(JSON.parse(localStorage.getItem('todos')), true);
    closeButton.click();
}

function deleteTodo(elem) {
    const todos = JSON.parse(localStorage.getItem('todos'));
    const deletedTodos = todos.filter(el => el.id != elem.id);
    elem.classList.add('animate__lightSpeedOutRight')
    setTimeout(() => {
        localStorage.setItem('todos', JSON.stringify(deletedTodos));
        setTodos(JSON.parse(localStorage.getItem('todos')), false);
    }, 1000);
}

document.querySelectorAll('input.form-control')[1].onkeydown = e => {
    if (e.key === 'Enter') {
        e.preventDefault();
        document.querySelector('.create').focus();
    }
}

document.querySelectorAll('input.form-control')[0].onkeydown = e => {
    if (e.key === 'Enter') {
        e.preventDefault();
        document.querySelectorAll('input.form-control')[1].focus();
    }
}