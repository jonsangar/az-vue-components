import Vue from 'vue';
import i18n from 'Core/services/language.service';
import VueToast from './Toast.vue';

const defaultOptions = {
  closeOnClick: true,
  duration: 3000,
  icon: '',
  title: '',
  message: '',
  errorCode: '',
  errorName: '',
  errorDescription: '',
  errorInfo: null,
  transition: 'fade',
  type: 'loading',
  onClose: null,
  onOpened: null,
  value: true,
};

let toastInstance = null;

/**
 * El componente toast permite un uso simplificado donde unicamente pasamos el mensaje.
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
  if (toastInstance) return toastInstance;

  toastInstance = new (Vue.extend(VueToast))({
    el: document.createElement('div'),
  });

  return toastInstance;
}

/**
 * Crea un Objeto Toast
 *
 * @param {Object} options - Opciones del Toast
 */
function createToast(options) {
  const toast = createInstance();

  options = { ...defaultOptions, ...options };

  //
  // Le añado un método para eliminarlo
  //    - Si tiene definido un evento onClose lo ejecuto
  //    - Limpio el timeout para cerrarse automaticamente
  //    - Elimino el nodo del DOM
  //    - Elimino el componente
  //
  options.clear = () => {
    toast.value = false;

    if (options.onClose) {
      options.onClose();
    }

    clearTimeout(toast.timer);
    toastInstance = null;

    const parent = toast.$el.parentNode;
    if (parent) parent.removeChild(toast.$el);

    toast.$destroy();
  };

  //
  // Le paso las opciones a la instancia del toast
  //
  Object.assign(toast, options);

  //
  // Le añado un timeout para que se oculte automaticamente
  //
  clearTimeout(toast.timer);

  if (options.duration > 0) {
    toast.timer = setTimeout(() => {
      toast.clear();
    }, options.duration);
  }

  return toast;
}

/**
 * Creo el objeto Toast que contiene los métodos para crear los diferentes tipos de toast
 */
const Toast = {
  loading: options =>
    createToast({
      type: 'loading',
      icon: 'loading',
      title: i18n.t('messages.loading'),
      duration: 0,
      closeOnClick: false,
      ...parseOptions(options),
    }),

  info: options =>
    createToast({
      type: 'info',
      icon: 'info',
      ...parseOptions(options),
    }),

  success: options =>
    createToast({
      type: 'success',
      icon: 'check',
      title: i18n.t('messages.success'),
      ...parseOptions(options),
    }),

  fail: options =>
    createToast({
      type: 'warning',
      icon: 'warning',
      title: i18n.t('messages.errors.defaultError.title'),
      message: i18n.t('messages.errors.defaultError.message'),
      ...parseOptions(options),
    }),

  error: error => {
    const title = `${error.module}.${error.name}.title`;
    const message = `${error.module}.${error.name}.message`;

    const titleString = i18n.te(title) ? i18n.t(title) : i18n.t('messages.errors.defaultError.title');
    const messageString = i18n.te(message) ? i18n.t(message) : i18n.t('messages.errors.defaultError.message');

    createToast({
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
 * Le añado un método para eliminar el toast
 */
Toast.clear = () => {
  if(toastInstance) toastInstance.clear();
}

Toast.install = () => {
  Vue.use(VueToast);
};

Vue.prototype.$toast = Toast;

export default Toast;
