import Vue from 'vue';
// import i18n from 'Core/services/language.service';
import VuePopupPin from 'Units/components/PopupPin';

let popupPinInstance = null;

const defaultOptions = {
  pinError: false,
  MaxRetriesPinError: false,
  callback: (action, code) => {
    popupPinInstance[action === 'confirm' ? 'resolve' : 'reject'](code);
  }
}

/**
 * Crea una nueva instancia del componente,
 * si ya existe una devuelve la que había
 */
function createInstance() {
  if(popupPinInstance) return popupPinInstance;

  popupPinInstance = new (Vue.extend(VuePopupPin))({
    el: document.createElement('div'),
  });

  return popupPinInstance;
}

/**
 * Crea un Objeto Dialog
 *
 * @param {Object} options - Opciones del Dialog
 * @param {Object} actions - Objeto para capturar emmiters del componente y ejecutar acciones (ej: {close: () => { ... [function] ... }})
 */
function createPopupPin(options, actions) {
  return new Promise((resolve, reject) => {

    const popup = createInstance();

    if(actions) {
      Object.keys(actions).forEach( key => {
        popup.$on(key, actions[key]);
      })
    }
    // popup.$on('showInfo', item => console.log(item));

    options = {...defaultOptions, ...options}

    //
    // Le añado un método para eliminarlo
    //    - Si tiene definido un evento onClose lo ejecuto
    //    - Limpio el timeout para cerrarse automaticamente
    //    - Elimino el nodo del DOM
    //    - Elimino el componente
    //
    options.clear = () => {
      if(options.onClose) {
        options.onClose();
      }

      popupPinInstance = null;

      const parent = popup.$el.parentNode;
      if(parent) parent.removeChild(popup.$el);

      popup.$destroy();
    };

    //
    // Le paso las opciones a la instancia del dialog
    //
    Object.assign(popup, options, { resolve, reject });

  });
}

/**
 * Creo el objeto PopupPin
 */

const PopupPin = {
  create: (options, actions) =>
    createPopupPin({
      ...options
    }, actions),

  confirm: (options, actions) =>
    createPopupPin({
      buttons: true,
      ...options
    }, actions),
}

/**
* Añadimos un método para eliminar el popup pin
 */
PopupPin.clear = () => {
  if(popupPinInstance)  popupPinInstance.clear();
}

PopupPin.install = () => {
  Vue.use(VuePopupPin);
}

Vue.prototype.$popupPin = PopupPin;

export default PopupPin;
