/* eslint-disable */
import { model } from "./model";

const renderForm = (() => {
	const main = document.querySelector('.main');
	
	const show = (type, id = "") => {
		const formDiv = document.createElement('div');
		formDiv.classList.add('form-div');
		type === 'project' ? _projectForm(formDiv) : _itemForm(formDiv);
		main.appendChild(formDiv);
		if (Number.isInteger(id)) {
			type === 'project' ? _populateProjectForm(id) : _populateItemForm(id);
			const button = document.querySelector(`.create-${type}-btn`);
			button.value = 'Update';
			button.classList.add(`update-${type}-btn`);
			button.classList.remove(`create-${type}-btn`);
		}
	}

	const remove = () => {
		while (main.childElementCount > 2) {
			const form = document.querySelector('.form-div')
			main.removeChild(form);
		}
	}

	// PRIVATE

	const _populateProjectForm = (id) => {
		const project = model.getProject(id);
		document.getElementById('title').value = project.title;
	}

	const _populateItemForm = (id) => {
		const item = model.getItem(id);
		document.getElementById('title').value = item.title;
		document.getElementById('description').value = item.description;
		document.getElementById('dueDate').value = item.dueDate;
		document.getElementById('priority').checked = item.priority;
		
	}

	const _projectForm = (formDiv) => {
		formDiv.innerHTML =
			`
				<form class="project-form" name="ProjectForm">
					<h2>Project Information</h2>
					
					<label for="title">Title</label>
					<input type="text" name="title" id="title" autocomplete="off">

					<div class="form-buttons">
						<input type="button" class="button create-project-btn" value="Create">
						<input type="button" class="button cancel" value="Cancel">
					</div>
				</form>
			`
	}

	const _itemForm = (formDiv) => {
		formDiv.innerHTML =
			`
				<form class="item-form" name="ItemForm">
					<h2>Item Information</h2>

					<label for="title">Title</label>
					<input type="text" name="title" id="title" autocomplete="off">

					<label for="description">Description</label>
					<input type="text" name="description" id="description" autocomplete="off">

					<label for="dueDate">Due date</label>
					<input type="date" name="dueDate" id="dueDate">

					<div class="priority">
						<label for="priority">Priority?</label>
						<input type="checkbox" name="priority" id="priority">
					</div>

					<div class="form-buttons">
						<input type="button" class="button create-item-btn" value="Create">
						<input type="button" class="button cancel" value="Cancel">
					</div>
				</form>
			`
	}

	return { show, remove }
})();

export { renderForm };