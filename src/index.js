import { renderApp } from './renderApp';
import  controller from './eventController';
import { model } from './model';

model.loadSaved();
renderApp.render();
controller.listen();