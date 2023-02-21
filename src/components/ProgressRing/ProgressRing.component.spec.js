import { shallowMount, createLocalVue } from '@vue/test-utils';
// Importamos librerías de estilos e iconos
import SvgIcon from 'vue-svgicon'
import ProgressRing from './ProgressRing.component.vue';

const localVue = createLocalVue()
localVue.use(SvgIcon, {
  tagName: 'az-icon',
  classPrefix: 'az',
})

describe('ProgressRing.vue', () => {
  const build = () => {
    const wrapper = shallowMount(ProgressRing, {
      localVue,
      propsData: {
        radius: 5,
        progress: 10,
        stroke: 1,
        color: 'light',
        color2: 'dark',
        showProgress: true,
        dashWeight: 2,
        label: 'Cargando'
      },
    })

    return {
      wrapper,
    }
  }

  it('Comprueba renderizado del componente ProgressRing con snapshot', () => {
    const { wrapper } = build()
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.vm.radius).toBe(5)
    expect(wrapper.vm.progress).toBe(10)
    expect(wrapper.vm.stroke).toBe(1)
    expect(wrapper.vm.color).toBe('light')
  })

})

describe('ProgressRing.vue', () => {
  const build = () => {
    const wrapper = shallowMount(ProgressRing, {
      localVue,
      propsData: {
        radius: 10,
        progress: 100,
        stroke: 2,
        color: 'blue',
        color2: 'dark',
        showProgress: true,
        dashWeight: 2,
        label: 'Cargando'
      },
    })

    return {
      wrapper,
    }
  }

  it('Comprueba que se renderiza las props cuando se asignan las props', async () => {
    const { wrapper } = build()

    expect(wrapper.vm.radius).toBe(10)
    expect(wrapper.vm.progress).toBe(100)
    expect(wrapper.vm.stroke).toBe(2)
    expect(wrapper.vm.color).toBe('blue')
  })

});
