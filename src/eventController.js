import { model } from './model';
import { renderForm } from './renderForm';
import { renderProjects } from './renderProjects';
import { renderList } from './renderList';

const controller = (() => {
  let selectedId = 0;
  let itemId = 0;

  const listen = () => {
    window.addEventListener('click', (e) => {
      switch (e.target.className) {
        // Open new project form
        case 'new-project-btn':
          renderForm.remove();
          renderForm.show('project');
          break;
        // Create new project
        case 'button create-project-btn':
          if (model.validateProjectForm()) {
            model.createProject();
            renderForm.remove();
            renderProjects.renderNew();
            selectedId = _findCurrentId();
          }
          break;
          // Open edit project form	
        case 'edit-project-btn':
          selectedId = _findCurrentId();
          renderForm.remove();
          renderForm.show('project', selectedId);
          break;

        // Update project
        case 'button update-project-btn':
          const project = model.getProject(selectedId);
          model.updateProject(selectedId);
          renderProjects.updateProjectBtn(selectedId, project.title);
          renderForm.remove();
          break;

        // Destroy project
        case 'destroy-project-btn':
          selectedId = _findCurrentId();
          if (('Are you sure you want to delete this project?')) {
            model.destroyProjectItems(selectedId);
            model.destroyProject(selectedId);
            renderProjects.destroyProject(selectedId);
            renderList.clearList();
            renderProjects.render();
            selectedId = _findCurrentId();
          }
          break;

        // Open new item form
        case 'new-item-btn':
          selectedId = document.querySelector('.column-btn-selected').dataset.id;
          renderForm.remove();
          renderForm.show('item');
          break;

        // Create new item
        case 'button create-item-btn':
          if (model.validateItemForm()) {
            model.createItem(selectedId);
            renderForm.remove();
          }
          renderList.render(selectedId);
          break;

        // Open edit item form
        case 'item-edit': 
          itemId = parseInt(e.target.parentNode.attributes[1].value, 10);
          renderForm.remove();
          renderForm.show('item', itemId);
          break;
        // Update item
        case 'button update-item-btn':
          model.updateItem(itemId);
          const data = model.getItemFormData();
          renderList.updateItemRow(itemId, data);
          renderForm.remove();
          break;

        // Destroy individual item
        case 'item-remove':
          {
            const itId = parseInt(e.target.parentNode.attributes[1].value, 10);
            model.destroyItem(itId);
            renderList.destroyItem(itId);
          }
          break;

        // Cancel and close form
        case 'button cancel':
          renderForm.remove();
          break;

        // Select project from sidebar
        case 'column-btn':
          renderProjects.toggleProjects(e);
          selectedId = parseInt(e.target.attributes[1].value, 10);
          break;
        // Mark item as done
        case 'item-done': {
            const id = parseInt(e.target.attributes[1].value, 10);
            const item = model.getItem(id);
            item.done = e.target.checked ? true : false;
          }
          break;
        }
    });
  }

  // PRIVATE

  const _findCurrentId = () => {
    if (model.projects.length > 0) {
      const currentProject = document.querySelector('.column-btn-selected');
      return parseInt(currentProject.dataset.id);
    }
  }

  return { listen };
})();

export { controller };


