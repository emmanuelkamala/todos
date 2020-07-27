const model = (() => {
	let items = [];
	let projects = [];
	let projId;
	let itemId;
	
	// Factory function for new project
	const Project = (title, id) => {
		return { title, id };
	};

	// Factory function for new list item
	const Item = (title, description, dueDate, priority, projectId, id, done) => {
		return { title, description, dueDate, priority, projectId, id, done };
	};

	// load data from localStorage
	const loadSaved = () => {
		const savedProjects = JSON.parse(localStorage.getItem('projects'));
		const savedItems = JSON.parse(localStorage.getItem('items'));
		const savedProjId = JSON.parse(localStorage.getItem('projId'));
		const savedItemId = JSON.parse(localStorage.getItem('itemId'));

		if (savedProjId) {
			projId = savedProjId;
		} else {
			projId = 0;
			localStorage.setItem('projId', JSON.stringify(projId));
		}

		if (savedItemId) {
			itemId = savedItemId;
		} else {
			itemId = 0;
			localStorage.setItem('itemId', JSON.stringify(itemId));
		}

		if (savedProjects && savedProjects.length > 0) {
			savedProjects.forEach(project => {
				const newProj = Project(project.title, project.id);
				projects.push(newProj);
			});

			if (savedItems) {
				savedItems.forEach(item => {
					const newItem = Item(item.title, item.description, item.dueDate, item.priority, item.projectId, item.id, item.done);
					items.push(newItem);
				})
			}
		} else  {
			projects.push(Project('default', 'default project', projId++));
			localStorage.setItem('projects', JSON.stringify(projects));
			localStorage.setItem('projId', JSON.stringify(projId));
		}
	}

	// Form validations
	const validateProjectForm = () => {
		const title = document.forms['ProjectForm']['title'];
		if (title.value == '') {
			window.alert('Please enter a title.');
			title.focus();
			return false;
		}

		return true;
	}

	const validateItemForm = () => {
		const title = document.forms['ItemForm']['title'];
		const description = document.forms['ItemForm']['description'];
		const date = document.forms['ItemForm']['dueDate'];

		if (title.value == '') {
			window.alert('Please enter a title.');
			title.focus();
			return false;
		}

		if (description.value == '') {
			window.alert('Please enter a description.');
			description.focus();
			return false;
		}

		if (date.value == '') {
			window.alert('Please enter a due date.');
			date.focus();
			return false;
		}
		return true;
	}

	// Create new objects
	const createProject = () => {
		const data = _getProjectFormData();
		const project = Project(data.title, projId++);
		projects.push(project);
		localStorage.setItem('projects', JSON.stringify(projects));
		localStorage.setItem('projId', JSON.stringify(projId));
	}

	const createItem = (projectId) => {
		const data = getItemFormData();
		const item = Item(data.title, data.description, data.dueDate, data.priority, projectId, itemId++, false);
		items.push(item);
		localStorage.setItem('items', JSON.stringify(items));
		localStorage.setItem('itemId', JSON.stringify(itemId));
	}

	// Read/get objects
	const getProject = (id) => {
		const project = projects.find(project => { return project.id === id });
		return project;
	}

	const getItem = (id) => {
		const item = items.find(item => { return item.id === id });
		return item;
	}

	const getItems = (id) => {
		const listItems = items.filter(item => item.projectId == id);
		return listItems;
	}

	// Update objects
	const updateProject = (id) => {
		const project = getProject(id);
		project.title = document.getElementById('title').value;
		localStorage.setItem('projects', JSON.stringify(projects));
	}

	const updateItem = (id) => {
		const item = getItem(id);
		const data = getItemFormData();
		item.title = data.title;
		item.description = data.description;
		item.data = data.dueDate;
		item.priority = data.priority;
		localStorage.setItem('items', JSON.stringify(items));
	}

	// Destroy objects
	const destroyProject = (id) => {
		for (let i = 0; i < projects.length; i++) {
			if (projects[i].id === id) {
				projects.splice(i, 1);
				break;
			}
		}
		localStorage.setItem('projects', JSON.stringify(projects));
	}

	const destroyItem = (id) => {
		for (let i = 0; i < items.length; i++) {
			if (items[i].id === id) {
				items.splice(i, 1);
				break;
			}
		}
		localStorage.setItem('items', JSON.stringify(items));
	}

	const destroyProjectItems = (projectId) => {
		items.forEach(item => {
			if (item.projectId === projectId) {
				destroyItem(item.id);
			}
		})
	}

	// PRIVATE 

	// Get form data
	const _getProjectFormData = () => {
		const projectFormData = {
			title: document.getElementById('title').value
		}
		return projectFormData;
	}

	const getItemFormData = () => {
		const itemFormData = {
			title: document.getElementById('title').value,
			description: document.getElementById('description').value,
			dueDate: document.getElementById('dueDate').value,
			priority: document.getElementById('priority').checked
		}
		return itemFormData;
	}

	return { 
					projects,
					items,
					validateProjectForm,
					validateItemForm,
					createProject,
					createItem,
					getProject,
					getItems,
					getItem,
					updateProject,
					updateItem,
					destroyProject,
					destroyItem,
					destroyProjectItems,
					getItemFormData,
					loadSaved,
	}
})();

export { model }