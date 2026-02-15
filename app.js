// DOM 요소
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

// 로컬 스토리지에서 TODO 불러오기
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// 페이지 로드 시 TODO 렌더링
renderTodos();

// 추가 버튼 클릭
addBtn.addEventListener('click', addTodo);

// Enter 키로 추가
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// TODO 추가 함수
function addTodo() {
    const text = todoInput.value.trim();
    
    if (text === '') {
        alert('할 일을 입력하세요!');
        return;
    }

    const todo = {
        id: Date.now(),
        text: text,
        completed: false
    };

    todos.push(todo);
    saveTodos();
    renderTodos();
    
    todoInput.value = '';
    todoInput.focus();
}

// TODO 삭제 함수
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
}

// TODO 완료 토글 함수
function toggleComplete(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });
    saveTodos();
    renderTodos();
}

// 로컬 스토리지에 저장
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// TODO 리스트 렌더링
function renderTodos() {
    todoList.innerHTML = '';

    if (todos.length === 0) {
        todoList.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">할 일이 없습니다.</p>';
        return;
    }

    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;

        li.innerHTML = `
            <input 
                type="checkbox" 
                class="todo-checkbox" 
                ${todo.completed ? 'checked' : ''}
                onchange="toggleComplete(${todo.id})"
            />
            <span class="todo-text">${escapeHtml(todo.text)}</span>
            <button class="delete-btn" onclick="deleteTodo(${todo.id})">삭제</button>
        `;

        todoList.appendChild(li);
    });
}

// XSS 방지를 위한 HTML 이스케이프
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
