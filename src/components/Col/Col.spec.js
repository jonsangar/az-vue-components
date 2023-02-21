import { shallowMount, createLocalVue } from '@vue/test-utils';
// Importamos librerías de estilos e iconos
import SvgIcon from 'vue-svgicon'
import Col from './Col.vue';

const localVue = createLocalVue()
localVue.use(SvgIcon, {
  tagName: 'az-icon',
  classPrefix: 'az',
})

describe('Col.vue', () => {
  const slotContent = '<span>foo</span>';

  const build = () => {
    const wrapper = shallowMount(Col, {
      localVue,
      slots: {
        default: slotContent
      }
    })

    return {
      wrapper,
    }
  }

  it('Comprueba renderizado del componente Col con snapshot', () => {
    const { wrapper } = build()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('Renderiza el contenido del slot', () => {
    const { wrapper } = build()
    expect(wrapper.html()).toContain(slotContent);
  });

  it('Comprueba que tiene responsive', async () => {
    const { wrapper } = build();
    // Si actualizamos la propiedad celda, añade la clase celda
    await wrapper.setProps({
      cols: '3',
      // offset: 3,
      // auto: true,
      // expand: true,
    });
    // Esperamos para que se actualice la prop
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()
    // Comprobamos que se ha activado la prop
    // expect(wrapper.vm.cell).toStrictEqual(true);
    // Comprobamos que se ha añadido el titulo con estilos por defecto
    // expect(wrapper.find('.az-checkbox-group--cell').isVisible()).toBe(true);
  });
});
