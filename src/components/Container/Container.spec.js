import { shallowMount, createLocalVue } from '@vue/test-utils';
// Importamos librerías de estilos e iconos
import SvgIcon from 'vue-svgicon'
import Container from './Container.vue';

const localVue = createLocalVue()
localVue.use(SvgIcon, {
  tagName: 'az-icon',
  classPrefix: 'az',
})

describe('Container.vue', () => {
  const build = () => {
    const wrapper = shallowMount(Container, {
      localVue,
    })

    return {
      wrapper,
    }
  }

  it('Comprueba renderizado del componente Container con snapshot', () => {
    const { wrapper } = build()
    expect(wrapper.html()).toMatchSnapshot()

  })
})
