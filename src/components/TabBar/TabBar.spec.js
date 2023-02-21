import { shallowMount, createLocalVue } from '@vue/test-utils';
// Importamos librerías de estilos e iconos
import SvgIcon from 'vue-svgicon'
import TabBar from './TabBar.vue';

const localVue = createLocalVue()
localVue.use(SvgIcon, {
  tagName: 'az-icon',
  classPrefix: 'az',
})

describe('TabBar.vue', () => {

  const build = () => {
    const wrapper = shallowMount(TabBar, {
      localVue,
    })

    return {
      wrapper,
    }
  }

  it('Comprueba renderizado del componente TabBar con las props por defecto con snapshot', () => {
    const { wrapper } = build()
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.vm.value).toBe(0)
    expect(wrapper.vm.fixed).toBe(true)
    expect(wrapper.vm.safeArea).toBe(true)
    expect(wrapper.vm.zIndex).toBe(1)
  })
})

describe('TabBar.vue', () => {

  const build = () => {
    const wrapper = shallowMount(TabBar, {
      localVue,
      propsData: {
        value: 1,
        activeColor: 'brand',
        inactiveColor: 'light',
        fixed: false,
        safeArea: false,
        zIndex: 10,
      },
    })

    return {
      wrapper,
    }
  }

  it('Comprueba que se actualizan las props cuando se asignan las props', async () => {
    const { wrapper } = build()

    expect(wrapper.vm.value).toBe(1)
    expect(wrapper.vm.activeColor).toBe('brand')
    expect(wrapper.vm.inactiveColor).toBe('light')
    expect(wrapper.vm.fixed).toBe(false)
    expect(wrapper.vm.safeArea).toBe(false)
    expect(wrapper.vm.zIndex).toBe(10)
  });
})

describe('TabBar.vue', () => {
  const e = {
    event: {
      type: 'change'
    }
  }

  const build = () => {
    const wrapper = shallowMount(TabBar, {
      localVue,
      propsData: {
        name: 'MyTitle',
        itemID: 'MyItem',
        settingsActive: true,
      },
    })

    return {
      wrapper,
    }
  }

  it('Comprueba que emite el evento keyup cuando se teclea en la pestaña', async () => {
    const { wrapper } = build()

    await wrapper.vm.onKeyup(e)
    expect(wrapper.emitted().keyup).toBeTruthy()
    expect(wrapper.emitted().keyup.length).toBe(1)
    expect(wrapper.emitted().keyup[0]).toEqual([e])
  });

  it('Comprueba que emite el evento input cuando se cambia de pestaña', async () => {
    const { wrapper } = build()

    await wrapper.vm.onChange(e)
    expect(wrapper.emitted().input).toBeTruthy()
    expect(wrapper.emitted().input.length).toBe(1)
    expect(wrapper.emitted().input[0]).toEqual([e])
  });

  it('Comprueba que emite el evento change cuando se cambia de pestaña', async () => {
    const { wrapper } = build()

    await wrapper.vm.onChange(e)
    expect(wrapper.emitted().change).toBeTruthy()
    expect(wrapper.emitted().change.length).toBe(1)
    expect(wrapper.emitted().change[0]).toEqual([e])
  });
})
