
import { controller, defaultSettings } from './controller'
import { todoEdit } from './todoedit'

const listArray = []

const todoContent = (div, list, activeTodo) => {
    const appendElements = (parentDiv, elements) => {
        for (let element in elements) {
            parentDiv.appendChild(elements[element])
        }
    }

    let todoIndex = listArray[list].todos.indexOf(
        listArray[list].todos[activeTodo]
    )

    const div2 = document.createElement('div')
    const checkbox = document.createElement('input')
    const div3 = document.createElement('div')
    const info = document.createElement('div')
    const title = document.createElement('span')
    const arrow = document.createElement('i')

    const todoElements = {
        fullTitle: document.createElement('span'),
        description: document.createElement('p'),
        buttons: document.createElement('div'),
    }

    const date = document.createElement('span')
    const priority = document.createElement('span')

    div.setAttribute('class', 'todo')
    div.appendChild(div2)
    div2.setAttribute('class', 'todoDiv2')
    div2.appendChild(checkbox)
    div2.appendChild(div3)
    div3.setAttribute('class', 'todoDiv3')
    div3.appendChild(title)
    div3.appendChild(arrow)

    // If the title of the Todo is too long, shorten it
    if (listArray[list].todos[activeTodo].title.length > 40) {
        title.textContent = `${listArray[list].todos[activeTodo].title.slice(
            0,
            40
        )}...`
    } else {
        title.textContent = listArray[list].todos[activeTodo].title
    }

    checkbox.setAttribute('type', 'checkbox')
    //checkbox.setAttribute('value', 'true');
    arrow.setAttribute('class', 'right')

    const buttonElements = {
        edit: document.createElement('button'),
        delete: document.createElement('button'),
    }

    if (listArray[list].todos[activeTodo].completed) {
        checkbox.checked = true
    }

    todoElements.fullTitle.setAttribute('class', 'fullTitle')
    todoElements.fullTitle.textContent = listArray[list].todos[activeTodo].title
    todoElements.description.setAttribute('class', 'todoDesc')
    todoElements.description.textContent =
        listArray[list].todos[activeTodo].description
    todoElements.buttons.setAttribute('class', 'todoButtons')
    buttonElements.edit.textContent = 'Edit'
    buttonElements.edit.setAttribute('class', 'edit')
    buttonElements.delete.textContent = 'Delete Todo'
    buttonElements.delete.setAttribute('class', 'delete')

    let dropdown = document.createElement('div')
    dropdown.setAttribute('class', 'hidden')
    dropdown.setAttribute('id', `todo${todoIndex}`)
    div.appendChild(info)
    div.appendChild(dropdown)

    appendElements(dropdown, todoElements)
    appendElements(todoElements.buttons, buttonElements)

    info.setAttribute('class', 'todoInfo')
    info.appendChild(date)
    info.appendChild(priority)

    switch (listArray[list].todos[activeTodo].priority) {
        case 'None':
            priority.setAttribute('style', 'color: #999')
            break
        case 'Medium':
            priority.setAttribute('style', 'color: #ff8f33')
            break
        case 'High':
            priority.setAttribute('style', 'color: #f72424')
            break
        default:
            break
    }

    date.textContent = `Due: ${listArray[list].todos[activeTodo].dueDate}`
    priority.textContent = `Priority: ${listArray[list].todos[activeTodo].priority}`

    div3.addEventListener('click', function() {
        let x = document.getElementById(`todo${todoIndex}`)
        if (window.getComputedStyle(x).display === 'none') {
            x.removeAttribute('class', 'hidden')
            arrow.removeAttribute('class', 'right')
            arrow.setAttribute('class', 'down')
        } else {
            x.setAttribute('class', 'hidden')
            arrow.removeAttribute('class', 'down')
            arrow.setAttribute('class', 'right')
        }
    })

    buttonElements.delete.addEventListener('click', function() {
        controller().deleteTodo(list, activeTodo)
        controller().clearDiv(document.querySelector('.todoList'))
        controller().renderTodos(list)
        controller().renderList()
    })

    checkbox.addEventListener('click', function() {
        controller().changeCompleted(list, activeTodo)
        window.setTimeout(function() {
            if (defaultSettings.showCompleted) {
                return 0
            } else {
                controller().clearDiv(document.querySelector('.todoList'))
                controller().renderTodos(list)
                controller().renderList()
            }
        }, 5 * 1000)
    })

    const editEvent = () => {
        let activeDiv = document.querySelector(`#todo${todoIndex}`)
        todoEdit(activeDiv, list, activeTodo)
        activeDiv.querySelector('.edit').style.display = 'none'
    }

    buttonElements.edit.addEventListener('click', editEvent, false)
}

export { todoContent }