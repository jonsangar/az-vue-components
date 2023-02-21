import { shallowMount, createLocalVue } from '@vue/test-utils';

// Importamos librerías de estilos e iconos
import SvgIcon from 'vue-svgicon'
import CellGroup from './CellGroup.vue';

const localVue = createLocalVue()
localVue.use(SvgIcon, {
  tagName: 'az-icon',
  classPrefix: 'az',
})

describe('CellGroup.vue', () => {
  const build = () => {
    const wrapper = shallowMount(CellGroup, {
      localVue,
    })

    return {
      wrapper,
    }
  }

  it('Comprueba renderizado del componente CellGroup con snapshot', () => {
    const { wrapper } = build()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('Comprueba que tiene el titulo', async () => {
    const { wrapper } = build();
    // Si actualizamos la propiedad title, añade el título
    await wrapper.setProps({
      title: 'myTitle',
    });
    // Esperamos para que se actualice la prop
    await wrapper.vm.$nextTick()
    // Comprobamos que se ha activado la prop
    expect(wrapper.vm.title).toStrictEqual('myTitle');
    // Comprobamos que se ha añadido el titulo con estilos por defecto
    expect(wrapper.find('.az-cell-group__title').isVisible()).toBe(true);
    expect(wrapper.find('.az-cell-group__title').text()).toBe('myTitle');
  });
})
