let todos;
todos = JSON.parse(localStorage.getItem("todos"));

function addTodoToLocal(todoTitle, priorita) {

    if (localStorage.getItem("todos") == null) {
        todos = [];

    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push({
        todo_name: todoTitle,
        todo_priorita: priorita,
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteFromLocal(todoName) {
    let todos;
    todos = JSON.parse(localStorage.getItem("todos"));

    for (let i = 0; i < todos.length; i++) {
        if (todos[i].todo_name.toLowerCase() == todoName) {
            todos.splice(i, 1)
            localStorage.setItem("todos", JSON.stringify(todos));
        }
    }
}

function editTodoLocalS(oldName, newName) {
    let todos;
    todos = JSON.parse(localStorage.getItem("todos"));

    for (let i = 0; i < todos.length; i++) {
        if (todos[i].todo_name.toLowerCase() == oldName) {
            todos[i].todo_name = newName
            localStorage.setItem("todos", JSON.stringify(todos));
        }
    }
}




if (todos != null) {
    for (let i = 0; i < todos.length; i++) {
        let todo = document.createElement('li')
        let todoTitle = document.createElement('p')
        let deleteBtn = document.createElement('button')
        let editBtn = document.createElement('button')
        let btnSpan = document.createElement('span')
        btnSpan.setAttribute('id', 'btnSpan')
        todo.appendChild(todoTitle)
        todo.appendChild(btnSpan)
        editBtn.addEventListener("click", editTodo)
        editBtn.setAttribute('id', 'editBtn')
        editBtn.setAttribute('class', 'spanBtn editBtn')
        btnSpan.appendChild(editBtn)
        deleteBtn.addEventListener("click", deleteTodo)
        deleteBtn.setAttribute('id', 'deleteBtn')
        deleteBtn.setAttribute('class', 'spanBtn deleteBtn')
        btnSpan.appendChild(deleteBtn)

        let priorita = todos[i].todo_priorita
        let container = document.querySelector('#' + priorita)
        container.appendChild(todo)
        todoTitle.innerText = todos[i].todo_name
        todo.setAttribute('id', priorita + 'C')
    }
}



