import { listArray } from './listarray'
import { controller } from './controller'


const todoEdit = (div, activeList, activeTodo) => {
    const editDiv = document.createElement('div')
    editDiv.setAttribute('class', 'editDiv')
    div.appendChild(editDiv)

    const editElements = {
        title: document.createElement('span'),
        titleInput: document.createElement('input'),
        desc: document.createElement('span'),
        descInput: document.createElement('textarea'),
        date: document.createElement('span'),
        dateInput: document.createElement('input'),
        prio: document.createElement('span'),
        prioInput: document.createElement('select'),
        buttons: document.createElement('div'),
    }

    editElements.title.textContent = 'Title: '
    editElements.desc.textContent = 'Description (optional): '
    editElements.date.textContent = 'Due Date (optional): '
    editElements.prio.textContent = 'Priority (optional): '
    editElements.titleInput.setAttribute('type', 'text')
    editElements.dateInput.setAttribute('type', 'date')
    editElements.buttons.style.display = 'flex'
    editElements.buttons.style.flexDirection = 'row'
    editElements.titleInput.value =
        listArray[activeList].todos[activeTodo].title
    editElements.descInput.value =
        listArray[activeList].todos[activeTodo].description
    editElements.dateInput.value =
        listArray[activeList].todos[activeTodo].dueDate
    editElements.prioInput.value =
        listArray[activeList].todos[activeTodo].priority

    for (let element in editElements) {
        editDiv.appendChild(editElements[element])
    }

    const prioChoices = {
        None: document.createElement('option'),
        Low: document.createElement('option'),
        Medium: document.createElement('option'),
        High: document.createElement('option'),
    }

    for (let element in prioChoices) {
        editElements.prioInput.appendChild(prioChoices[element])
        prioChoices[element].textContent = `${element}`
        prioChoices[element].setAttribute('value', `${element}`)
    }

    const buttonElements = {
        submit: document.createElement('button'),
        cancel: document.createElement('button'),
    }

    buttonElements.submit.setAttribute('class', 'edit')
    buttonElements.cancel.setAttribute('class', 'delete')

    for (let element in buttonElements) {
        editElements.buttons.appendChild(buttonElements[element])
        buttonElements[element].textContent = `${element}`
    }

    buttonElements.cancel.addEventListener('click', function() {
        div.removeChild(div.lastChild)
        div.querySelector('.edit').style.display = 'initial'
    })

    buttonElements.submit.addEventListener('click', function() {
        if (editElements.title.value === '') {
            alert('A title is required')
        } else {
            let title = editElements.titleInput.value
            let desc = editElements.descInput.value
            let date = editElements.dateInput.value
            let prio = editElements.prioInput.value
            controller().editTodo(
                activeList,
                activeTodo,
                title,
                desc,
                date,
                prio
            )
            div.removeChild(div.lastChild)
            div.querySelector('.edit').style.display = 'initial'
            controller().clearDiv(document.querySelector('.todoList'))
            controller().renderTodos(activeList)
        }
    })
}

export { todoEdit }