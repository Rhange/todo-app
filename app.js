const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const emptyState = document.getElementById('emptyState');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

renderTodos();

addBtn.addEventListener('click', addTodo);

todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

function addTodo() {
    const text = todoInput.value.trim();

    if (text === '') {
        alert('할 일을 입력하세요!');
        return;
    }

    const todo = {
        id: Date.now(),
        text,
        completed: false
    };

    todos.push(todo);
    saveTodos();
    renderTodos();

    todoInput.value = '';
    todoInput.focus();
}

function deleteTodo(id) {
    const itemEl = todoList.querySelector(`[data-id="${id}"]`);

    if (itemEl) {
        itemEl.classList.add('removing');
        itemEl.addEventListener(
            'transitionend',
            () => {
                todos = todos.filter((todo) => todo.id !== id);
                saveTodos();
                renderTodos();
            },
            { once: true }
        );
        return;
    }

    todos = todos.filter((todo) => todo.id !== id);
    saveTodos();
    renderTodos();
}

function toggleComplete(id) {
    todos = todos.map((todo) => {
        if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });
    saveTodos();
    renderTodos();
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
    todoList.innerHTML = '';

    if (todos.length === 0) {
        emptyState.hidden = false;
        return;
    }

    emptyState.hidden = true;

    todos.forEach((todo) => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.dataset.id = todo.id;

        li.innerHTML = `
            <input
                type="checkbox"
                class="todo-checkbox"
                ${todo.completed ? 'checked' : ''}
                onchange="toggleComplete(${todo.id})"
                aria-label="완료 체크"
            />
            <span class="todo-text">${escapeHtml(todo.text)}</span>
            <button class="delete-btn" onclick="deleteTodo(${todo.id})" aria-label="삭제">
                <i class="fa-regular fa-trash-can"></i>
            </button>
        `;

        todoList.appendChild(li);
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
