/* eslint-disable */
import { model } from './model';
import { renderList } from './renderList';

const renderProjects = (() => {
	const main = document.querySelector('.main');
	const column = document.createElement('div');
	const projects = model.projects;

	const render = () => {
		if (main.childElementCount < 2) _makeColumn();
		if (projects.length === 0) return;
		_seedColumn();
		const initial = column.firstElementChild;
		initial.classList.add('column-btn-selected');
		renderList.render(parseInt(initial.dataset.id));
	}

	const renderNew = () => {
		_seedColumn();
		const newProject = column.lastElementChild;
		newProject.classList.add('column-btn-selected');
		renderList.render(parseInt(newProject.dataset.id));
	}

	const updateProjectBtn = (id, title) => {
		const project = document.querySelector(`[data-id="${id}"]`);
		project.textContent = title;
	}

	const toggleProjects = (e) => {
		if (main.childElementCount < 3) {
			const button = e.target;
			const projects = document.querySelectorAll('.column-btn');
			projects.forEach(btn => btn.classList.remove('column-btn-selected'));
			button.classList.add('column-btn-selected');
			const id = button.dataset.id;
			renderList.render(id);
		}
	}

	const destroyProject = (id) => {
		console.log('hey');
		const project = document.querySelector(`[data-id="${id}"]`);
		console.log(project);
		const column = document.querySelector('.projects-column');
		console.log(column);
		column.removeChild(project);
	}
	
	// PRIVATE

	const _makeColumn = () => {
		column.classList.add('projects-column');
		main.appendChild(column);
	}

	const _seedColumn = () => {
		_clearColumn();
		projects.forEach(project => _makeProjectBtn(project));
	}

	const _clearColumn = () => {
		while (column.childElementCount > 0) {
			column.removeChild(column.lastElementChild);
		}
	}

	const _makeProjectBtn = (project) => {
		const button = document.createElement('div');
		button.textContent = project.title;
		button.classList.add('column-btn');
		button.dataset.id = project.id;
		column.appendChild(button);
	}

	return { 
					render, 
					toggleProjects, 
					updateProjectBtn,
					destroyProject,
					renderNew,
				};
})();

export { renderProjects };

