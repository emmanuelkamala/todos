import { renderProjects } from './renderProjects';
import { renderList } from './renderList';

const renderApp = (() => {
	const render = () => {
		renderProjects.render();
		const project = document.querySelector('.projects-column').firstElementChild;
		renderList.render(parseInt(project.dataset.id));
	}

	return { render };
})();

export { renderApp };
