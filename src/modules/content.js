
import { controller, defaultSettings } from './controller'
import { addTodoForm } from './todoform'

const listArray = []

const listContent = list => {
    function textCompleted() {
        return defaultSettings.showCompleted
            ? 'Hide Completed'
            : 'Show Completed'
    }

    const mainContent = document.querySelector('.mainContent')
    controller().clearDiv(mainContent)
    const listElements = {
        title: document.createElement('h2'),
        buttons: document.createElement('div'),
        description: document.createElement('p'),
        todoList: document.createElement('div'),
        addTodo: document.createElement('button'),
    }

    const buttonsElements = {
        edit: document.createElement('button'),
        delete: document.createElement('button'),
        completed: document.createElement('button'),
    }

    listElements.title.textContent = listArray[list].title
    buttonsElements.delete.textContent = 'Delete List'
    buttonsElements.edit.textContent = 'Edit List'
    buttonsElements.completed.textContent = textCompleted()
    listElements.description.textContent = listArray[list].description
    listElements.addTodo.textContent = '+ Add a New Todo'

    for (let element in listElements) {
        mainContent.appendChild(listElements[element])
        listElements[element].setAttribute('class', `${element}`)
    }

    for (let element in buttonsElements) {
        listElements.buttons.appendChild(buttonsElements[element])
        buttonsElements[element].setAttribute('class', `${element}`)
    }

    controller().renderTodos(list)

    buttonsElements.delete.addEventListener('click', function() {
        if (window.confirm('To confirm deleting this List, Press "OK"')) {
            controller().deleteProject(listArray.indexOf(listArray[list]))
            controller().clearDiv(mainContent)
            controller().renderList()
        }
    })

    buttonsElements.edit.addEventListener('click', function() {
        editList(list)
        mainContent.querySelector('.edit').style.display = 'none'
    })

    buttonsElements.completed.addEventListener('click', function() {
        if (defaultSettings.showCompleted) {
            defaultSettings.showCompleted = false
            buttonsElements.completed.textContent = 'Show Completed'
            controller().clearDiv(listElements.todoList)
            controller().renderTodos(list)
        } else {
            defaultSettings.showCompleted = true
            buttonsElements.completed.textContent = 'Hide Completed'
            controller().clearDiv(listElements.todoList)
            controller().renderTodos(list)
        }
    })

    listElements.addTodo.addEventListener('click', function() {
        mainContent.removeChild(mainContent.lastChild)
        addTodoForm(mainContent, list)
    })
}

const editList = list => {
    const mainContent = document.querySelector('.mainContent')
    const editForm = document.createElement('div')
    editForm.setAttribute('class', 'editForm')
    mainContent.insertBefore(editForm, document.querySelector('.todoList'))

    const editElements = {
        title: document.createElement('span'),
        titleInput: document.createElement('input'),
        desc: document.createElement('span'),
        descInput: document.createElement('textarea'),
        buttons: document.createElement('div'),
    }

    editElements.title.textContent = 'Title'
    editElements.titleInput.value = listArray[list].title
    editElements.desc.textContent = 'Description'
    editElements.descInput.value = listArray[list].description

    for (let element in editElements) {
        editForm.appendChild(editElements[element])
    }

    const buttonElements = {
        submit: document.createElement('button'),
        cancel: document.createElement('button'),
    }

    buttonElements.submit.textContent = 'Submit'
    buttonElements.cancel.textContent = 'Cancel'

    for (let element in buttonElements) {
        editElements.buttons.appendChild(buttonElements[element])
        buttonElements[element].setAttribute('class', `${element}`)
    }

    buttonElements.submit.addEventListener('click', function() {
        let title = editElements.titleInput.value
        let description = editElements.descInput.value
        controller().editProject(list, title, description)
        mainContent.querySelector('.edit').style.display = 'block'
        listContent(list)
        controller().renderList()
    })

    buttonElements.cancel.addEventListener('click', function() {
        mainContent.removeChild(editForm)
        mainContent.querySelector('.edit').style.display = 'block'
    })
}

export { listContent }