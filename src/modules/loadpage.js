import { sidebar } from './sidebar'

const pageLoad = () => {
    const body = document.querySelector('body')
    const bodyElements = {
        header: document.createElement('header'),
        main: document.createElement('div'),
    }

    bodyElements.main.setAttribute('class', 'main')

    for (let element in bodyElements) {
        body.appendChild(bodyElements[element])
    }

    const pageTitle = document.createElement('h1')
    pageTitle.textContent = 'Todo List'
    bodyElements.header.appendChild(pageTitle)

    const main = document.querySelector('.main')

    const mainElements = {
        sidebar: document.createElement('div'),
        mainContent: document.createElement('div'),
    }

    for (let element in mainElements) {
        mainElements[element].setAttribute('class', `${element}`)
        main.appendChild(mainElements[element])
    }

    sidebar()
}

export { pageLoad }