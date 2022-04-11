let addBtn = document.querySelector('#createBtn')
let title = document.querySelector('.input-title')
let todoContainer = document.querySelector('.todo-list')

let maxInputLength = 50

title.setAttribute('maxlength', '50')

title.addEventListener("keypress", e => {
  if (e.keyCode === 13) {
    addTodo()
  } else if (e.target.value.substr(-1) === ' ' && e.keyCode === 32) {
    e.target.value = e.target.value.substr(0, e.target.value.length - 1);
  }
})

addBtn.addEventListener("click", addTodo)

// add todo
async function addTodo() {
  if (title.value === "" || title.value === " ") {
    error()
    return
  }
  if (title.value.length > maxInputLength) {
    errorL()
    return
  }

  let todos;
  todos = JSON.parse(localStorage.getItem("todos"));

  if (todos != null) {
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].todo_name.toLowerCase() == title.value.toLowerCase()) {
        esistente(title.value)
        return
      }
    }
  }


  let todo = document.createElement('li')
  let todoTitle = document.createElement('p')
  let deleteBtn = document.createElement('button')
  let editBtn = document.createElement('button')
  let btnSpan = document.createElement('span')

  btnSpan.setAttribute('id', 'btnSpan')

  todoTitle.innerText = title.value

  hideForm()


  // scelta priorita
  const { value: priorita } = await Swal.fire({
    title: 'Seleziona priorità',
    input: 'select',
    inputOptions: {
      'Priorità': {
        alta: 'Alta',
        media: 'Media',
        bassa: 'Bassa'
      },
    },
    inputPlaceholder: 'Seleziona priorità',
    showCancelButton: false,
    inputValidator: (value) => {
      return new Promise((resolve) => {
        switch (value) {
          case 'alta':
            resolve()
          case 'media':
            resolve()
          case 'bassa':
            resolve()
          case '':
            resolve('Seleziona una priorità!')
        }
      })
    }
  })

  if (priorita) {
    let ulPriorita = document.querySelector('#' + priorita)
    todo.setAttribute('id', priorita + "C")

    ulPriorita.appendChild(todo)
    addTodoToLocal(todoTitle.innerText.trim(), priorita);
  }


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

  title.value = ''
}


// delete todo
function deleteTodo() {
  Swal.fire({
    title: 'Sei sicuro?',
    text: `"${this.parentNode.parentNode.querySelector('p').innerHTML}" verrà eliminato`,
    icon: 'warning',
    showCancelButton: true,
    cancelButtonText: 'No',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Elimina'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Eliminato con successo',
        `"${this.parentNode.parentNode.querySelector('p').innerHTML}" è stato eliminato`,
        'success',
        this.parentNode.parentNode.remove()
      )

      // remove localS
      let name = this.parentNode.parentNode.querySelector('p').innerText.trim()
      deleteFromLocal(name.toLowerCase())

    }
  })
}


// edit todo
let x = 0
function editTodo() {
  if (x == 1) {
    document.querySelector('#editForm').remove()
    x = 0
  }
  x = 1

  let editForm = document.createElement('span')
  let editInput = document.createElement('input')
  let editConfirmBtn = document.createElement('button')
  let closeConfirmFormBtn = document.createElement('button')

  editForm.setAttribute('id', 'editForm')
  editInput.setAttribute('maxlength', '50')
  closeConfirmFormBtn.setAttribute('id', 'closeCreateFormBtn')
  editConfirmBtn.setAttribute('id', 'confirmEditBtn')
  closeConfirmFormBtn.setAttribute('class', 'btnAnim')
  editConfirmBtn.setAttribute('class', 'btnAnim')
  editForm.classList.add('form')

  this.parentNode.parentNode.appendChild(editForm)

  editForm.appendChild(editInput)
  editForm.appendChild(editConfirmBtn)
  editForm.appendChild(closeConfirmFormBtn)

  editInput.value = this.parentNode.parentNode.querySelector('p').innerText

  editConfirmBtn.addEventListener("click", confirmEdit)

  closeConfirmFormBtn.addEventListener("click", closeEdit)


  editInput.addEventListener("keypress", e => {
    if (e.keyCode === 13) {
      confirmEditEnter(editInput)
    } else if (e.target.value.substr(-1) === ' ' && e.keyCode === 32) {
      e.target.value = e.target.value.substr(0, e.target.value.length - 1);
    }
  })

  function confirmEdit() {
    if (editInput.value === "" || editInput.value === " ") {
      error()
      return
    }
    if (editInput.value.length > maxInputLength) {
      errorL()
      return
    }

    let saveP = this.parentNode.parentNode.querySelector('p').innerText

    let oldName = this.parentNode.parentNode.querySelector('p').innerText

    this.parentNode.parentNode.querySelector('p').innerText = editInput.value

    let edited = this.parentNode.parentNode.querySelector('p').innerText
    editTodoLocalS(oldName.toLowerCase(), edited.toLowerCase())

    if (saveP != this.parentNode.parentNode.querySelector('p').innerText) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'success',
        title: 'Modifica effettuata'
      })
    }

    this.parentNode.remove()


    x = 0
  }
  function confirmEditEnter(e) {
    if (editInput.value === "" || editInput.value === " ") {
      error()
      return
    }

    let saveP = e.parentNode.parentNode.querySelector('p').innerText

    let oldName = e.parentNode.parentNode.querySelector('p').innerText

    e.parentNode.parentNode.querySelector('p').innerText = editInput.value

    let edited = e.parentNode.parentNode.querySelector('p').innerText
    editTodoLocalS(oldName.toLowerCase(), edited.toLowerCase())

    if (saveP != e.parentNode.parentNode.querySelector('p').innerText) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'success',
        title: 'Modifica effettuata'
      })
    }

    e.parentNode.remove()

    x = 0
  }
}

function closeEdit() {
  this.parentNode.remove()
  x = 0
}


// funzioni form di creazione
let showFormBtn = document.querySelector('#showFormBtn')
let createForm = document.querySelector('#createForm')
let closeCreateFormBtn = document.querySelector('#closeCreateFormBtn')

showFormBtn.addEventListener("click", showForm)
closeCreateFormBtn.addEventListener("click", hideForm)

function showForm() {
  createForm.style.display = 'block'
}
function hideForm() {
  createForm.style.display = 'none'
  title.value = ''
}

// errore, inserisci un titolo
function error() {
  Swal.fire({
    title: 'Errore',
    text: 'Inserisci un titolo',
    icon: 'error',
    confirmButtonText: 'Ok',
  })
}

// errore, max 50c
function errorL() {
  Swal.fire({
    title: 'Errore',
    text: 'Inserisci massimo 50 caratteri!',
    icon: 'error',
    confirmButtonText: 'Ok',
  })
}

// errore, nome esistente
function esistente(name) {
  Swal.fire({
    title: 'Errore',
    text: `"${name}" esiste già`,
    icon: 'error',
    confirmButtonText: 'Ok',
  })
}


