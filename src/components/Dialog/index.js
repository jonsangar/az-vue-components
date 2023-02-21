import Vue from 'vue';
import i18n from 'Core/services/language.service';
import VueDialog from './Dialog.vue';

let dialogInstance = null;

const defaultOptions = {
  icon: '',
  title: '',
  message: '',
  errorCode: '',
  errorName: '',
  errorDescription: '',
  errorInfo: null,
  transition: 'fade',
  type: '',
  onClose: null,
  onOpened: null,
  support: '',
  redirect: '',
  value: true,
  confirm: false,
  callback: action => {
    dialogInstance[action === 'confirm' ? 'resolve' : 'reject'](action);
  },
};

/**
 * El componente dialog permite un uso simplificado donde unicamente pasamos el mensaje.
 * Cuando se pasa un mensaje como opción, tenemos que parsearlo como un objeto
 *
 * @param {Object,String} title
 */
function parseOptions(title) {
  if (typeof title === 'string') {
    return { title };
  }

  return title;
}

/**
 * Crea una nueva instancia del componente,
 * si ya existe una devuelve la que había
 */
function createInstance() {
  if (dialogInstance) return dialogInstance;

  dialogInstance = new (Vue.extend(VueDialog))({
    el: document.createElement('div'),
  });

  return dialogInstance;
}

/**
 * Crea un Objeto Dialog
 *
 * @param {Object} options - Opciones del Dialog
 */
function createDialog(options) {
  return new Promise((resolve, reject) => {
    const dialog = createInstance();

    options = { ...defaultOptions, ...options };

    //
    // Le añado un método para eliminarlo
    //    - Si tiene definido un evento onClose lo ejecuto
    //    - Limpio el timeout para cerrarse automaticamente
    //    - Elimino el nodo del DOM
    //    - Elimino el componente
    //
    options.clear = () => {
      dialog.value = false;

      if (options.onClose) {
        options.onClose();
      }

      dialogInstance = null;

      const parent = dialog.$el.parentNode;
      if (parent) parent.removeChild(dialog.$el);

      dialog.$destroy();
    };

    //
    // Le paso las opciones a la instancia del dialog
    //
    Object.assign(dialog, options, { resolve, reject });
  });
}

/**
 * Creo el objeto Dialog que contiene los métodos para crear los diferentes tipos de dialog
 */
const Dialog = {
  confirm: options =>
    createDialog({
      type: 'warning',
      icon: 'warning',
      confirm: true,
      ...parseOptions(options),
    }),

  info: options =>
    createDialog({
      type: 'info',
      icon: 'info',
      ...parseOptions(options),
    }),

  success: options =>
    createDialog({
      type: 'success',
      icon: 'check',
      title: i18n.t('messages.success'),
      ...parseOptions(options),
    }),

  fail: options =>
    createDialog({
      type: 'warning',
      icon: 'warning',
      title: i18n.t('messages.errors.defaultError.title'),
      message: i18n.t('messages.errors.defaultError.message'),
      ...parseOptions(options),
    }),

  error: error => {
    // const title = `${error.module}.${error.name}.title`; // Estructura de proyecto antigua, traducciones por módulos. Mantenemos por si hubiese que recuperarla
    const title = `messages.errors.${error.name}.title`
    // const message = `${error.module}.${error.name}.message`;
    const message = `messages.errors.${error.name}.message`;
    const titleString = i18n.te(title) ? i18n.t(title) : i18n.t('messages.errors.defaultError.title');
    const messageString = i18n.te(message) ? i18n.t(message) : i18n.t('messages.errors.defaultError.message');


    createDialog({
      type: error.isBlocking ? 'error' : 'warning',
      icon: error.icon || 'warning',
      title: titleString,
      message: messageString,
      errorCode: error.code || '',
      errorName: error.name || '',
      errorDescription: error.description || '',
      errorInfo: error.info || null,
      support: error.support || '',
      ...parseOptions(error),
    });
  },
};

/**
 * Le añado un método para eliminar el dialog
 */
Dialog.clear = () => dialogInstance.clear();

Dialog.install = () => {
  Vue.use(VueDialog);
};

Vue.prototype.$dialog = Dialog;

export default Dialog;
