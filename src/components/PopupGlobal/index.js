import Vue from 'vue';
import i18n from 'Core/services/language.service';
import VuePopup from 'Core/components/PopupModal';

let popupInstance = null;

const defaultOptions = {
  loadingText: () => i18n.t('messages.loading'),
  cancelBtnText: () => i18n.t('buttons.cancel'),
  acceptBtnText: () => i18n.t('buttons.accept'),
  callback: action => {
    popupInstance[action === 'confirm' ? 'resolve' : 'reject'](action);
  }
}

/**
 * Crea una nueva instancia del componente,
 * si ya existe una devuelve la que había
 */
function createInstance() {
  if(popupInstance) return popupInstance;

  popupInstance = new (Vue.extend(VuePopup))({
    el: document.createElement('div'),
  });

  return popupInstance;
}

/**
 * Crea un Objeto Dialog
 *
 * @param {Object} options - Opciones del Dialog
 * @param {Object} actions - Objeto para capturar emmiters del componente y ejecutar acciones (ej: {close: () => { ... [function] ... }})
 */
function createPopup(options, actions) {
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

      popupInstance = null;

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
 * Creo el objeto Popup
 */

const Popup = {
    create: (options, actions) =>
      createPopup({
        ...options
      }, actions),

    confirm: (options, actions) =>
      createPopup({
        buttons: true,
        ...options
      }, actions),

    notification: (options, actions) =>
      createPopup({
        buttons: true,
        cancelBtn: false,
        title: i18n.t('home.invited_title'),
        ...options
      }, actions),

    warning: (options, actions) =>
    createPopup({
      subtitle: i18n.t('zones.adjusts.adjust_zone.warnings'),
      buttons: true,
      cancelBtn: false,
      src: "unitError.svg",
      ...options
    }, actions),
 }

/**
* Añadimos un método para eliminar el popup
 */
Popup.clear = () => {
  if(popupInstance)  popupInstance.clear();
}

Popup.install = () => {
  Vue.use(VuePopup);
}

Vue.prototype.$popup = Popup;

export default Popup;
