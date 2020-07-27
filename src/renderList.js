import { model } from './model';
import { format } from 'date-fns';

const renderList = (() => {
	const main = document.querySelector('.main');
	const listBox = document.createElement('div');
	const list = document.createElement('ul');

	const render = (id) => {
		clearList();
		_addButton();
		_addLabels();
		_makeList();
		_seedList(id);
	};
	
	const clearList = () => {
		while (list.childElementCount > 0) {
			list.removeChild(list.lastElementChild);
		}
		while (listBox.childElementCount > 0) {
			listBox.removeChild(listBox.lastElementChild);
		}
	}

	const updateItemRow = (id, data) => {
		const key = `[data-item-id="${id}"]`;
		const item = document.querySelector(key);
		const title = document.querySelector(`[data-item-title="${id}"]`);
		title.textContent = data.title;
		const date = document.querySelector(`[data-item-date="${id}"]`);
		date.textContent = data.dueDate;
		data.priority ? item.classList.add('row-priority') : item.classList.remove('row-priority');

	}

	const destroyItem = (id) => {
		const item = document.querySelector(`[data-item-id="${id}"]`);
		const list = document.querySelector('.list');
		list.removeChild(item);
	}

	// PRIVATE

	const _addButton = () => {
		const buttons = document.createElement('div');
		const newItemBtn = document.createElement('div');
		const editBtn = document.createElement('div');
		const deleteBtn = document.createElement('div');
		newItemBtn.classList.add('new-item-btn');
		newItemBtn.textContent = '+';
		editBtn.classList.add('edit-project-btn');
		editBtn.textContent = 'Edit Project';
		deleteBtn.classList.add('destroy-project-btn');
		deleteBtn.textContent = 'Delete Project';
		buttons.classList.add('project-buttons');
		buttons.appendChild(editBtn);
		buttons.appendChild(deleteBtn);
		buttons.appendChild(newItemBtn);
		listBox.appendChild(buttons);
	}

	const _addLabels = () => {
		const row = document.createElement('div');
		row.classList.add('list-row');
		row.classList.add('title-row');
		const done = document.createElement('span');
		done.textContent = 'Done?';
		const title = document.createElement('span');
		title.textContent = 'Title';
		const date = document.createElement('span');
		date.textContent = 'Due date';
		row.appendChild(done);
		row.appendChild(title);
		row.appendChild(date);
		listBox.appendChild(row);
	}

	const _makeList = () => {
		list.classList.add('list');
		listBox.classList.add('list-box');
		listBox.appendChild(list);
		main.appendChild(listBox);
	};

	const _seedList = (id) => {
		const items = model.getItems(id);
		items.forEach(item => _addItem(item));
	};


	const _addItem = (item) => {
		const row = document.createElement('li');
		row.classList.add('list-row');
		row.dataset.itemId = item.id;
		if (item.priority) row.classList.add('row-priority');

		const box = document.createElement('input');
		box.classList.add('item-done');
		box.dataset.itemBox = item.id;
		box.type = 'checkbox';
		box.checked = item.done;
		const title = document.createElement('span');
		title.classList.add('item-title');
		title.dataset.itemTitle = item.id;
		title.textContent = item.title;

		const date = document.createElement('span');
		date.classList.add('item-date');
		date.dataset.itemDate = item.id;
		let newDate = item.dueDate.split('-'); 
		date.textContent = format(new Date(newDate[0], newDate[2], newDate[1]), "LLL d, yy");

		const edit = document.createElement('div');
		const remove = document.createElement('div');
		const specs = [box, title, date, edit, remove];

		edit.classList.add('item-edit');
		edit.innerHTML = '&#128393';
		remove.classList.add('item-remove');
		remove.innerHTML = '&#128465';

		specs.forEach(spec => row.appendChild(spec));
		list.appendChild(row);
	};

	return { render, clearList, destroyItem, updateItemRow };
})();

export { renderList };