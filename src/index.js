import { renderApp } from './renderApp.js';
import { controller } from './eventController.js';
import { model } from './model.js';

model.loadSaved();
renderApp.render();
controller.listen();
