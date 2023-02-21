import { shallowMount, createLocalVue } from '@vue/test-utils';
import { fireEvent } from '@testing-library/vue';
// Importamos librerías de estilos e iconos
import SvgIcon from 'vue-svgicon'
import SortingCell from './SortingCell.component.vue';

const localVue = createLocalVue()
localVue.use(SvgIcon, {
  tagName: 'az-icon',
  classPrefix: 'az',
})

const elementMock = { addEventListener: jest.fn() };
jest.spyOn(document, 'getElementById').mockImplementation(() => elementMock);

describe('SortingCell.vue', () => {

  const build = () => {
    const wrapper = shallowMount(SortingCell, {
      localVue,
      propsData: {
        name: 'MyTitle',
        itemID: 'MyItem',
        settingsActive: true,
        activeHandle: false,
        isHeader: true,
        maxlength: 10,
        minlength: 2,
      },
      mocks: {
        $constants: {
          IS_MOBILE: 'android'
        }
      }
    })

    return {
      wrapper,
    }
  }

  it('Comprueba renderizado del componente SortingCell con snapshot', () => {
    const { wrapper } = build()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('Comprueba que se actualizan las props cuando se asignan las props', async () => {
    const { wrapper } = build()

    expect(wrapper.vm.localName).toBe('MyTitle')
    expect(wrapper.vm.itemID).toBe('MyItem')
    expect(wrapper.vm.settingsActive).toBe(true)
    expect(wrapper.vm.activeHandle).toBe(false)
    expect(wrapper.vm.isHeader).toBe(true)
    expect(wrapper.vm.maxlength).toBe(10)
    expect(wrapper.vm.minlength).toBe(2)
  });

  it('Comprueba que se renderiza las props cuando se asignan las props', async () => {
    const { wrapper } = build()

    expect(wrapper.find('.az-sorting-cell__content__title').text()).toBe('MyTitle')
    expect(wrapper.find('#input-item-MyItem').exists()).toBe(true)
    expect(wrapper.find('#input-item-MyItem').attributes().disabled).toBe('disabled')
  });
})

describe('SortingCell.vue', () => {

  const build = () => {
    const wrapper = shallowMount(SortingCell, {
      localVue,
      propsData: {
        name: 'MyTitle',
        itemID: 'MyItem',
        settingsActive: true,
      },
      mocks: {
        $constants: {
          IS_MOBILE: 'android'
        }
      }
    })

    return {
      wrapper,
    }
  }

  it('Comprueba que emite el evento focus cuando se activa el modo edición', async () => {
    const { wrapper } = build()

    await wrapper.vm.activeEditMode()
    expect(wrapper.emitted().focus).toBeTruthy()
    expect(wrapper.emitted().focus.length).toBe(1)
    expect(wrapper.emitted().focus[0]).toEqual([])
  });

  it('Comprueba que emite el evento save cuando se ejecuta onSubmit', async () => {
    const { wrapper } = build()

    await wrapper.vm.onSubmit()
    expect(wrapper.emitted().save).toBeTruthy()
    expect(wrapper.emitted().save.length).toBe(1)
    expect(wrapper.emitted().save[0]).toEqual([null])
  });

  it('Comprueba que emite el evento save cuando se hace blur en el input', async () => {
    const { wrapper } = build()

    // Tomamos el foco del input
    const input = wrapper.find('input');
    // Simulamos tomar el foco sobre el input
    await fireEvent.blur(input.element);
    expect(wrapper.emitted().save).toBeTruthy()
    expect(wrapper.emitted().save.length).toBe(1)
    expect(wrapper.emitted().save[0]).toEqual([null])
  });

  it('Comprueba que emite el evento save cuando se pulsa enter en el input', async () => {
    const { wrapper } = build()

    await wrapper.vm.activeEditMode()
    // Tomamos el foco del input
    // const input = wrapper.find('input');
    // Simulamos tomar el foco sobre el input
    // await fireEvent.keyUp(input.element);
    await wrapper.vm.onEnter()
    // console.log(wrapper.vm.$refs.name)
    await wrapper.vm.$refs.name.blur()
    expect(wrapper.vm.$refs.name.value).toBe('MyTitle')
    await wrapper.vm.onBlur()
    expect(wrapper.emitted().save).toBeTruthy()
    expect(wrapper.emitted().save.length).toBe(1)
    expect(wrapper.emitted().save[0]).toEqual([null])
  });
})

describe('SortingCell.vue', () => {

  const build = () => {
    const wrapper = shallowMount(SortingCell, {
      localVue,
      propsData: {
         name: 'MyTitle',
        itemID: 'MyItem',
        settingsActive: true,
        keyboardAdjust: true,
        isAndroid: true,
      },
      mocks: {
        $constants: {
          IS_MOBILE: 'android'
        }
      }
    })

    return {
      wrapper,
    }
  }

  it('Comprueba que emite el evento save cuando se hace blur en el input y el valor de localName es distinto del valor de la prop name', async () => {
    // fake timers
    jest.useFakeTimers()

    const { wrapper } = build()

    // Asignamos un valor distinto a localName para que guarde itemID y localName
    wrapper.vm.localName = 'MyCustomName'
    // Tomamos el foco del input
    const input = wrapper.find('input');
    // Simulamos tomar el foco sobre el input
    await fireEvent.blur(input.element);

    // Wait to setTimout 500
    jest.runTimersToTime(510)

    expect(wrapper.vm.editMode).toBe(false)
    expect(wrapper.emitted().save).toBeTruthy()
    expect(wrapper.emitted().save.length).toBe(1)
    expect(wrapper.emitted().save[0]).toEqual([{id: wrapper.vm.itemID, name: wrapper.vm.localName}])
  });
});
