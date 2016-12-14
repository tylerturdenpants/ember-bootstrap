import Config from 'ember-bootstrap/config';

/*globals document */
const hasDOM = typeof document !== 'undefined';

function appendContainerElement(rootElementId, id) {
  if (!hasDOM) {
    return;
  }

  let rootEl = document.querySelector(rootElementId);
  let modalContainerEl = document.createElement('div');
  modalContainerEl.id = id;
  rootEl.appendChild(modalContainerEl);
}

function initialize() {
  if (!Config.insertEmberWormholeElementToDom) {
    return;
  }
  let application = arguments[1] || arguments[0];
  let modalContainerElId = 'ember-bootstrap-modal-container';
  if(application && application.rootElement) {
    appendContainerElement(application.rootElement, modalContainerElId);
  }
}

export default {
  name: 'modals-container',
  initialize
};
