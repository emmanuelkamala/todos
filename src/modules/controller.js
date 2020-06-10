import { Project } from './Project'
import { Todo } from './Todo'
import { listArray } from './listArray'
import { listContent } from './listContent'
import { todoContent } from './todoContent'

const controller = () => {
    const addTodo = (project, title, description, dueDate, priority) => {
        let todo = Todo(title, description, dueDate, priority)
        project.todos.push(todo)
        localStorage.removeItem(`list${listArray.indexOf(project)}`)
        localStorage.setItem(
            `list${listArray.indexOf(project)}`,
            JSON.stringify(project)
        )
    }

    const addProject = (title, description) => {
        let project = Project(title, description)
        listArray.push(project)
        localStorage.setItem(
            `list${listArray.indexOf(project)}`,
            JSON.stringify(project)
        )
    }

    const deleteTodo = (list, activeTodo) => {
        listArray[list].todos.splice(
            listArray[list].todos.indexOf(listArray[list].todos[activeTodo]),
            1
        )
        localStorage.removeItem(`list${listArray.indexOf(listArray[list])}`)
        localStorage.setItem(
            `list${listArray.indexOf(listArray[list])}`,
            JSON.stringify(listArray[list])
        )
    }

    const deleteProject = list => {
        listArray.splice(listArray.indexOf(listArray[list]), 1)
        rearrangeStorage()
    }

    const editTodo = (
        list,
        activeTodo,
        title,
        description,
        dueDate,
        priority
    ) => {
        listArray[list].todos[activeTodo].title = title
        listArray[list].todos[activeTodo].description = description
        listArray[list].todos[activeTodo].dueDate = dueDate
        listArray[list].todos[activeTodo].priority = priority
        localStorage.removeItem(`list${listArray.indexOf(listArray[list])}`)
        localStorage.setItem(
            `list${listArray.indexOf(listArray[list])}`,
            JSON.stringify(listArray[list])
        )
    }

    const editProject = (list, title, description) => {
        listArray[list].title = title
        listArray[list].description = description
        localStorage.removeItem(`list${listArray.indexOf(listArray[list])}`)
        localStorage.setItem(
            `list${listArray.indexOf(listArray[list])}`,
            JSON.stringify(listArray[list])
        )
    }

    const clearDiv = div => {
        while (div.firstChild) {
            div.removeChild(div.firstChild)
        }
    }

    const rearrangeStorage = () => {
        localStorage.clear()
        if (listArray.length > 0) {
            for (let x = 0; x < listArray.length; x++) {
                localStorage.setItem(`list${x}`, JSON.stringify(listArray[x]))
            }
        }
    }

    const renderList = () => {
        clearDiv(document.querySelector('.projectList'))
        for (let list in listArray) {
            let div = document.createElement('div')
            div.setAttribute('class', 'list')
            div.setAttribute('id', `list${listArray.indexOf(listArray[list])}`)
            document.querySelector('.projectList').appendChild(div)
            const divElements = {
                title: document.createElement('span'),
                todosCount: document.createElement('span'),
            }
            for (let element in divElements) {
                div.appendChild(divElements[element])
            }

            if (listArray[list].title.length > 20) {
                divElements.title.textContent = `${listArray[list].title.slice(
                    0,
                    16
                )}...`
            } else {
                divElements.title.textContent = `${listArray[list].title}`
            }
            divElements.todosCount.textContent = `${countIncomplete(list)}`
            div.addEventListener('click', function() {
                listContent(listArray.indexOf(listArray[list]))
            })
        }
    }

    const countIncomplete = list => {
        let count = 0
        for (let x in listArray[list].todos) {
            listArray[list].todos[x].completed ? count + 0 : count++
        }

        return count
    }

    const renderTodos = activeList => {
        for (let activeTodo in listArray[activeList].todos) {
            if (
                listArray[activeList].todos[activeTodo].completed &&
                defaultSettings.showCompleted === false
            ) {
                continue
            } else {
                let div = document.createElement('div')
                document.querySelector('.todoList').appendChild(div)
                todoContent(div, activeList, activeTodo)
            }
        }
    }

    function changeCompleted(activeList, activeTodo) {
        listArray[activeList].todos[activeTodo].completed
            ? (listArray[activeList].todos[activeTodo].completed = false)
            : (listArray[activeList].todos[activeTodo].completed = true)
    }

    return {
        addTodo,
        addProject,
        deleteTodo,
        deleteProject,
        editTodo,
        editProject,
        clearDiv,
        renderTodos,
        renderList,
        changeCompleted,
    }
}

const Settings = (showCompleted = false) => {
    return {
        showCompleted,
    }
}

const defaultSettings = Settings()

export { controller, defaultSettings } 