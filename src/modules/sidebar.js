import { addListForm } from './formlist'
import { controller } from './controller'

const sidebar = () => {
    const sidebar = document.querySelector('.sidebar')
    const sideElements = {
        titleDiv: document.createElement('div'),
        projectList: document.createElement('div'),
        addProject: document.createElement('button'),
    }

    sideElements.addProject.textContent = '+ Add a New List'

    for (let element in sideElements) {
        sideElements[element].setAttribute('class', `${element}`)
        sidebar.appendChild(sideElements[element])
    }

    const sideTitle = document.createElement('h2')
    const arrow = document.createElement('i')
    sideTitle.textContent = 'Your Lists'

    sideElements.titleDiv.appendChild(sideTitle)
    sideElements.titleDiv.appendChild(arrow)
    arrow.setAttribute('class', 'down')
    controller().renderList()

    sideElements.addProject.addEventListener('click', function() {
        controller().clearDiv(document.querySelector('.mainContent'))
        addListForm().appendForm()
    })

    sideElements.titleDiv.addEventListener('click', function() {
        let x = document.querySelector('.projectList')
        if (window.getComputedStyle(x).display === 'none') {
            arrow.removeAttribute('class', 'up')
            arrow.setAttribute('class', 'down')
            document.querySelector('.projectList').style.display = 'block'
            document.querySelector('.addProject').style.display = 'block'
        } else {
            arrow.removeAttribute('class', 'down')
            arrow.setAttribute('class', 'up')
            document.querySelector('.projectList').style.display = 'none'
            document.querySelector('.addProject').style.display = 'none'
        }
    })
}

export { sidebar }