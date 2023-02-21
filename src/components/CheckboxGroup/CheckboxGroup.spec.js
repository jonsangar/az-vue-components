import { shallowMount, createLocalVue } from '@vue/test-utils';
// Importamos librerías de estilos e iconos
import SvgIcon from 'vue-svgicon'
import CheckboxGroup from './CheckboxGroup.vue';

const localVue = createLocalVue()
localVue.use(SvgIcon, {
  tagName: 'az-icon',
  classPrefix: 'az',
})

describe('CheckboxGroup.vue', () => {
  const build = () => {
    const wrapper = shallowMount(CheckboxGroup, {
      localVue,
    })

    return {
      wrapper,
    }
  }

  it('Comprueba renderizado del componente CheckboxGroup con snapshot', () => {
    const { wrapper } = build()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('Comprueba que tiene celda', async () => {
    const { wrapper } = build();
    // Si actualizamos la propiedad celda, añade la clase celda
    await wrapper.setProps({
      cell: true,
    });
    // Esperamos para que se actualice la prop
    await wrapper.vm.$nextTick()
    // Comprobamos que se ha activado la prop
    expect(wrapper.vm.cell).toStrictEqual(true);
    // Comprobamos que se ha añadido el titulo con estilos por defecto
    expect(wrapper.find('.az-checkbox-group--cell').isVisible()).toBe(true);
  });
})
