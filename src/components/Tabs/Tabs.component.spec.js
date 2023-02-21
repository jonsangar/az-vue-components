import { shallowMount, createLocalVue } from '@vue/test-utils';
// Importamos librerías de estilos e iconos
import SvgIcon from 'vue-svgicon'
import Tabs from './Tabs.component.vue';

const localVue = createLocalVue()
localVue.use(SvgIcon, {
  tagName: 'az-icon',
  classPrefix: 'az',
})

describe('Tabs.vue', () => {
  const build = () => {
    const wrapper = shallowMount(Tabs, {
      localVue,
    })

    return {
      wrapper,
    }
  }

  it('Comprueba renderizado del componente Tabs con snapshot', () => {
    const { wrapper } = build()
    expect(wrapper.html()).toMatchSnapshot()
  })


});
