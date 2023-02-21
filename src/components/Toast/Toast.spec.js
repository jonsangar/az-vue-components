import { shallowMount, createLocalVue } from '@vue/test-utils';
// Importamos librerías de estilos e iconos
import SvgIcon from 'vue-svgicon'
import Toast from './Toast.vue';

const localVue = createLocalVue()
localVue.use(SvgIcon, {
  tagName: 'az-icon',
  classPrefix: 'az',
})

describe('Toats.vue', () => {

  const build = () => {
    const wrapper = shallowMount(Toast, {
      localVue,
      props: {
        value: true,
        type: 'error',
        icon: 'warning',
        title: 'Error'
      },
      mocks: {
        $constants: {
          IS_PRODUCTION: false
        }
      }
    })

    return {
      wrapper,
    }
  }

  it('Comprueba renderizado del componente Toast con snapshot', () => {
    const { wrapper } = build()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('Comprueba que emite el evento opened con el evento after-enter', async () => {
    const { wrapper } = build()

    await wrapper.vm.onAfterEnter()
    expect(wrapper.emitted().opened).toBeTruthy()
    expect(wrapper.emitted().opened.length).toBe(1)
    expect(wrapper.emitted().opened[0]).toEqual([])
  });

  it('Comprueba que emite el evento closed con el evento after-leave', async () => {
    const { wrapper } = build()

    await wrapper.vm.onAfterLeave()
    expect(wrapper.emitted().closed).toBeTruthy()
    expect(wrapper.emitted().closed.length).toBe(1)
    expect(wrapper.emitted().closed[0]).toEqual([])
  });

  it('Comprueba que se muestra el título correctamente cuando el Toast tiene título y es de tipo error', async () => {
    const { wrapper } = build()

    expect(wrapper.find('.toast__title--onlyTitle').exists()).toBe(true)
  });
})

describe('Toats.vue', () => {

  const build = () => {
    const wrapper = shallowMount(Toast, {
      localVue,
      propsData: {
        value: true,
        type: 'error',
        icon: 'warning',
        title: 'Error',
        message: 'Error'
      },
      mocks: {
        $constants: {
          IS_PRODUCTION: false
        }
      }
    })

    return {
      wrapper,
    }
  }

  it('Comprueba que se muestra el mensaje correctamente cuando el Toast tiene mensaje y es de tipo error', async () => {
    const { wrapper } = build()

    expect(wrapper.find('.toast__message').exists()).toBe(true)
  });
})

describe('Toats.vue', () => {

  const build = () => {
    const wrapper = shallowMount(Toast, {
      localVue,
      propsData: {
        value: true,
        type: 'error',
        icon: 'warning',
        errorCode: 'Error'
      },
      mocks: {
        $constants: {
          IS_PRODUCTION: false
        }
      }
    })

    return {
      wrapper,
    }
  }

  it('Comprueba que se muestra el código de error correctamente cuando el Toast tiene código de error y es de tipo error', async () => {
    const { wrapper } = build()

    expect(wrapper.find('.toast__errorCode').exists()).toBe(true)
  });
})

describe('Toats.vue', () => {

  const build = () => {
    const wrapper = shallowMount(Toast, {
      localVue,
      propsData: {
        value: true,
        type: 'error',
        icon: 'warning',
        errorInfo: { param: 'Error', value: '0x01' }
      },
      mocks: {
        $constants: {
          IS_PRODUCTION: false
        }
      }
    })

    return {
      wrapper,
    }
  }

  it('Comprueba que se muestra la información del error correctamente cuando el Toast tiene información del error y es de tipo error', async () => {
    const { wrapper } = build()

    expect(wrapper.find('.toast__errorInfo').exists()).toBe(true)
  });
});
