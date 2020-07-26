import { RenderProject } from './controller'


const render = RenderProject();

/**
 * listen to the event when click on the delte icon on the project
 */
document.getElementById('projects-body').addEventListener('click', function (e) {

    if (e.target && e.target.dataset.deleteIndex != undefined) {
        let index = e.target.dataset.deleteIndex;
        render.deleteProject(index);
    }
})

/**
 * this function renders the todos inside any project depends on the click target
 */
document.getElementById('projects-body').addEventListener('click', function (e) {
    if (e.target && e.target.dataset.infoIndex != undefined) {
        let index = e.target.dataset.infoIndex;
        render.renderSelectedProjectName(index);
        render.clearTodosListUi();
        render.renderTodo(index);
    }
})

/**
 * this function render the projects from the objects array
 * once the user add new project and click add button
 */
const renderCurrentProjects = function () {

    render.clearProjectsListUi();

    let projName = document.getElementById('project-input-name').value;

    render.addProject(projName);

    render.renderProjects();

    document.getElementById('project-input-name').value = "";

    //hide the form after clicking the button
    $('.modal').modal('hide')

    //this function call to control todo items toggling
    render.toggleTodo();
}

/**
 * this function adds a new Todo to a specific proect's todos array
 * at a specific index
 */
const addNewTodo = function () {
    let selectedProjName = document.getElementById('selected-project-name');
    let index = selectedProjName.getAttribute('selected-name-index');
    render.addTodo(index);
    render.clearTodosListUi();
    render.renderTodo(index);
    document.getElementById('todo-input-name').value = "";
    document.getElementById('todo-input-description').value = "";
    document.getElementById('todo-date').value = "";
    document.getElementById('priority').value = "";
    //hide the form after clicking the button
    $('.modal').modal('hide')
    //this function call to control todo items toggling
    render.toggleTodo();
}


// Add project button event when it's clicked
document.getElementById('add-project-button').addEventListener('click', renderCurrentProjects);

// Add todo button event when it's clicked
document.getElementById('add-todo-button').addEventListener('click', addNewTodo);

//this function call to control todo items toggling
render.toggleTodo();

