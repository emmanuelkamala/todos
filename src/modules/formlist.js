import { controller } from './controller'

const addListForm = () => {
    const mainContent = document.querySelector('.mainContent')
    const contentElements = {
        h2: document.createElement('h2'),
        title: document.createElement('h3'),
        titleInput: document.createElement('input'),
        desc: document.createElement('h3'),
        descInput: document.createElement('textarea'),
        buttons: document.createElement('div'),
    }

    contentElements.h2.textContent = 'Add a New List'
    contentElements.title.textContent = 'List Title: '
    contentElements.desc.textContent = 'List Description (Optional): '
    contentElements.titleInput.setAttribute('type', 'text')

    const appendForm = () => {
        for (let element in contentElements) {
            contentElements[element].setAttribute('class', `${element}`)
            mainContent.appendChild(contentElements[element])
        }
    }

    const buttonElements = {
        submit: document.createElement('button'),
        cancel: document.createElement('button'),
    }

    for (let element in buttonElements) {
        buttonElements[element].setAttribute('class', `${element}`)
        contentElements.buttons.appendChild(buttonElements[element])
    }

    buttonElements.submit.textContent = 'Submit'
    buttonElements.cancel.textContent = 'Cancel'

    buttonElements.cancel.addEventListener('click', function() {
        controller().clearDiv(mainContent)
    })

    buttonElements.submit.addEventListener('click', function() {
        let listTitle = contentElements.titleInput.value

        if (listTitle === '') {
            alert('Please add a title, or press cancel')
            return 0
        }

        let listDesc = contentElements.descInput.value
        controller().addProject(listTitle, listDesc)
        controller().clearDiv(document.querySelector('.projectList'))
        controller().renderList()
        controller().clearDiv(mainContent)
    })

    return {
        appendForm,
    }
}

export { addListForm }