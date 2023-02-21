import { shallowMount, createLocalVue } from '@vue/test-utils';
// Importamos librerías de estilos e iconos
import SvgIcon from 'vue-svgicon'
import TabItem from './TabItem.component.vue';

const localVue = createLocalVue()
localVue.use(SvgIcon, {
  tagName: 'az-icon',
  classPrefix: 'az',
})

describe('TabItem.vue', () => {

  const build = () => {
    const wrapper = shallowMount(TabItem, {
      localVue,
      propsData: {
        isActive: true,
        link: 'airtools',
      },
      stubs: ['router-link']
    })

    return {
      wrapper,
    }
  }

  it('Comprueba renderizado del componente TabItem con snapshot', () => {
    const { wrapper } = build()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('Comprueba que se actualizan las props cuando se asignan las props', async () => {
    const { wrapper } = build()

    expect(wrapper.vm.isActive).toBe(true)
    expect(wrapper.vm.link).toBe('airtools')
  });

  it('Comprueba que si está la pestaña activa se renderiza la clase az-tab--selected', async () => {
    const { wrapper } = build()

    expect(wrapper.find('.az-tab--selected').exists()).toBe(true)
  });

});
