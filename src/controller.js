import { Todo } from "./todo";
import { Project } from "./project";

//get the projects from localStorage
let storedProjects = localStorage.getItem("projects");

//check if there is something in the localStorage, if not make it an empty array
let projectsArray = (storedProjects) ? JSON.parse(storedProjects) : [];

/**
 * this is out main function which is responsible for rendering,
 * and controlling the whole project this its methods
 */
const RenderProject = () => {

    /**
     * this function adds object of Project
     * @param name is the project name that we pass and we get it from the avlue input from the user
     */
    const addProject = (name) => {
        let newProject = Project(name);
        projectsArray.push(newProject);

        localStorage.setItem('projects', JSON.stringify(projectsArray));
    }

    /**
     * this dunction deletes an entire object at a specific index in the array
     * @param {*} index we pass it through depends on the e.target index
     */
    const deleteProject = (index) => {
        projectsArray.splice(index, 1);
        localStorage.setItem('projects', JSON.stringify(projectsArray));
        clearProjectsListUi();
        clearTodosListUi();
        renderProjects();

        document.getElementById('selected-project-name').innerHTML = 'Select an Existing project';
    }

    /**
     * this function renders the array of projects 
     */
    const renderProjects = () => {
        projectsArray.forEach(element => {
            let index = projectsArray.indexOf(element);
            const deleteProjIcon = document.createElement('i');
            deleteProjIcon.classList.add('material-icons');
            deleteProjIcon.innerHTML = "delete";
            deleteProjIcon.setAttribute('data-delete-index', index);
            const deleteTd = document.createElement('td');
            deleteTd.classList.add('delete-button');
            deleteTd.appendChild(deleteProjIcon);


            const projNameTd = document.createElement('td');
            projNameTd.classList.add('project-name');
            projNameTd.innerHTML = projectsArray[index].name;
            projNameTd.setAttribute('data-info-index', index);

            const bulbProjIcon = document.createElement('i');
            bulbProjIcon.classList.add('material-icons');
            bulbProjIcon.innerHTML = "lightbulb_outline";
            const bulbTd = document.createElement('td');
            bulbTd.classList.add('project-icon');
            bulbTd.appendChild(bulbProjIcon);

            const projItemTr = document.createElement('tr');
            projItemTr.classList.add('project-item');
            projItemTr.appendChild(bulbTd);
            projItemTr.appendChild(projNameTd);
            projItemTr.appendChild(deleteTd);

            const projectsBody = document.getElementById('projects-body');
            projectsBody.appendChild(projItemTr);

        });
    }


    /**
     * this function adds a todo object inside a specific object's todos array
     * @param {*} project the index of the project inside the projectsArray
     * it's getting projectsArray[i]
     */
    const addTodo = (index) => {
        let todoName = document.getElementById('todo-input-name').value;
        let todoDescription = document.getElementById('todo-input-description').value;
        let todoDue = document.getElementById('todo-date').value;
        let e = document.getElementById('priority');
        let priority = e.options[e.selectedIndex].text;
        let isDone = false;

        let newTodo = Todo(todoName, todoDescription, todoDue, priority, isDone);
        projectsArray[index].todos.push(newTodo);

        localStorage.setItem('projects', JSON.stringify(projectsArray));
    }


    /**
     * this function render the todos on the proect object
     * @param {*} index it gets the index of the object
     * and gets into the array of objects todo and itterate over it
     * it requires an array of todos to itterate on projectsArray[i].todos
     */
    const renderTodo = (index) => {
        let collapse = 0;
        let arrayLength = projectsArray[index].todos.length;
        for (let i = 0; i < arrayLength; i++) {

            //Done Icon and its div creation
            let doneIcon = document.createElement('i');
            doneIcon.classList.add('material-icons');
            doneIcon.innerHTML = "done_all";
            let doneIconDiv = document.createElement('div');
            doneIconDiv.classList.add('.col-auto');
            doneIconDiv.setAttribute('id', 'todo-done');
            doneIconDiv.appendChild(doneIcon);

            //Label icon and its div creation
            let labelIcon = document.createElement('i');
            labelIcon.classList.add('material-icons');
            labelIcon.innerHTML = "label_outline";
            labelIcon.setAttribute('id', 'labelIcon')
            let labelIconDiv = document.createElement('div');
            labelIconDiv.classList.add('.col-auto');
            labelIconDiv.setAttribute('id', 'todo-label');
            labelIconDiv.appendChild(labelIcon);

            //the div container for done and label icons
            let doneRow = document.createElement('div');
            doneRow.classList.add('row');
            doneRow.setAttribute('id', 'done-row');
            doneRow.appendChild(doneIconDiv);
            doneRow.appendChild(labelIconDiv);

            //the Todo Name
            let todoName = document.createElement('p');
            todoName.innerHTML = projectsArray[index].todos[i].name
            let todoNameLink = document.createElement('a');
            todoNameLink.classList.add('collapsed');
            todoNameLink.classList.add('card-link');
            todoNameLink.setAttribute('data-toggle', 'collapse');
            todoNameLink.setAttribute('href', `collapse${collapse}`);
            todoNameLink.appendChild(todoName);

            //todo date
            let todoDate = document.createElement('p');
            todoDate.setAttribute('id', 'todo-item-date');
            todoDate.innerHTML = projectsArray[index].todos[i].due;

            //Edit Icon and its div creation
            let editIcon = document.createElement('i');
            editIcon.classList.add('material-icons');
            editIcon.innerHTML = "edit";
            let editIconDiv = document.createElement('div');
            editIconDiv.classList.add('.col-auto');
            editIconDiv.setAttribute('id', 'todo-edit');
            editIconDiv.appendChild(editIcon);

            //Delete icon and its div creation
            let deleteIcon = document.createElement('i');
            deleteIcon.classList.add('material-icons');
            deleteIcon.innerHTML = "delete";
            let deleteIconDiv = document.createElement('div');
            deleteIconDiv.classList.add('.col-auto');
            deleteIconDiv.setAttribute('id', 'todo-delete');
            deleteIconDiv.appendChild(deleteIcon);

            //the div container for edit and delete icons
            let editRow = document.createElement('div');
            editRow.classList.add('row');
            editRow.setAttribute('id', 'edit-row');
            editRow.appendChild(editIconDiv);
            editRow.appendChild(deleteIconDiv);

            //card header div to contain all above
            let cardHeader = document.createElement('div');
            cardHeader.classList.add('card-header');
            cardHeader.appendChild(doneRow);
            cardHeader.appendChild(todoNameLink);
            cardHeader.appendChild(todoDate);
            cardHeader.appendChild(editRow);

            //the card body contains the descretion
            let cardBodyText = document.createElement('div');
            cardBodyText.classList.add('card-body');
            cardBodyText.innerHTML = projectsArray[index].todos[i].descrition;

            //div that contains the card body
            let cardBody = document.createElement('div');
            cardBody.classList.add('collapse');
            cardBody.setAttribute('id', `collapse${collapse}`);
            collapse++;
            cardBody.setAttribute('data-parent', '#accordion');
            cardBody.appendChild(cardBodyText);

            //the card div that contains the card header and card body
            let card = document.createElement('div');
            card.classList.add('card');
            card.appendChild(cardHeader);
            card.appendChild(cardBody);

            //div contains all the cards
            let cardsContainer = document.getElementById('accordion');
            cardsContainer.appendChild(card);

            toggleTodo()

            /**
             *check the periority value and set the label color depends on the value
             */
            const checkPriority = () => {
                if (projectsArray[index].todos[i].priority == "Normal") {
                    labelIcon.style.color = "#00c41f";
                } else if (projectsArray[index].todos[i].priority == "Medium") {
                    labelIcon.style.color = "#fffb00";
                } else if (projectsArray[index].todos[i].priority == "Importnat") {
                    labelIcon.style.color = "red";
                }
                localStorage.setItem('projects', JSON.stringify(projectsArray));
            }

            /**
             * change the Todo state from undone to done
             */
            function changeTodoState() {
                doneIcon.addEventListener('click', () => {
                    projectsArray[index].todos[i].isDone = true;
                    localStorage.setItem('projects', JSON.stringify(projectsArray));
                    changeStateColor();
                })
            }

            /**
             * change the color of the done icon when the todo is done
             */
            const changeStateColor = () => {
                if (projectsArray[index].todos[i].isDone == true) {
                    doneIcon.style.color = "#1fb462";
                    localStorage.setItem('projects', JSON.stringify(projectsArray));
                }
            }

            /**
             * delete Todo item
             */
            const deleteTodo = () => {
                deleteIcon.addEventListener('click', () => {
                    projectsArray[index].todos.splice(i, 1);
                    localStorage.setItem('projects', JSON.stringify(projectsArray));
                    clearTodosListUi();
                    renderTodo(index);
                })
            }

            //function calls
            checkPriority();
            changeStateColor();
            changeTodoState();
            deleteTodo()
        };
    }

    /**
     * this function to render the selected project name
     * @param {*} index the index of the selected project
     */
    const renderSelectedProjectName = (index) => {
        let selectedProjName = document.getElementById('selected-project-name');
        selectedProjName.innerHTML = projectsArray[index].name;
        selectedProjName.setAttribute('selected-name-index', index);
    }

    /**
     * this function to clear the projects list UI
     */
    const clearProjectsListUi = () => {
        document.getElementById('projects-body').innerHTML = "";
    }

    /**
     * this function to clear the todos list UI
     */
    const clearTodosListUi = () => {
        document.getElementById('accordion').innerHTML = "";
    }

    /**
     * this function is responsible for toggling the todo items card
     */
    const toggleTodo = () => {
        $(".card").on("click", function (e) {
            var $_target = $(e.currentTarget);
            var $_cardBody = $_target.find(".collapse");
            if ($_cardBody) {
                $_cardBody.collapse('toggle')
            }
        })
    }


    return {
        addProject,
        deleteProject,
        renderProjects,
        clearProjectsListUi,
        clearTodosListUi,
        addTodo,
        renderTodo,
        renderSelectedProjectName,
        toggleTodo
    }
}

export { RenderProject }

const render = RenderProject();

//adding the first element manually
projectsArray[0] = { name: 'Start', todos: [] };

//todos objects for my tutorial demo to push manually 
let tutotialTodo1 = Todo("Add project", "You can add a new project by clicking '+' next to My projects on the left top and type the project name then press 'Add' ", "2020-07-27", "Normal", true);
let tutotialTodo2 = Todo("Select a specific project", "Then you can select a specefic project you wanna add todos to it", "2020-07-27", "Medium", false);
let tutotialTodo3 = Todo("Adding a new Todo", "To add a new todo, select the targeted project then press '+' on the top righ", "2020-07-27", "Important", true);
let tutotialTodo4 = Todo("Adding a new Todo info", "In the pop up form just fill the information about your todo", "2020-07-27", "Important", false);
let tutotialTodo5 = Todo("See added or existing todo info", "Just click the Todo name and it will toggle a menu with the details you added earlier", "2020-07-27", "Normal", false);
let tutotialTodo6 = Todo("Mark todo done after finishing", "Just click Alright mark next to the todo name and once you click it it will mark green means it's done", "2020-07-27", "Important", false);

//i pushed them manually cause the addTodo function gets the values from the form inputs
projectsArray[0].todos.push(tutotialTodo1);
projectsArray[0].todos.push(tutotialTodo2);
projectsArray[0].todos.push(tutotialTodo3);
projectsArray[0].todos.push(tutotialTodo4);
projectsArray[0].todos.push(tutotialTodo5);
projectsArray[0].todos.push(tutotialTodo6);

render.renderProjects();
render.renderTodo(0);
render.renderSelectedProjectName(0);




