import { shallowMount, createLocalVue } from '@vue/test-utils';
// Importamos librerías de estilos e iconos
import SvgIcon from 'vue-svgicon'
import ColorButton from './ColorButton.component.vue';

const localVue = createLocalVue()
localVue.use(SvgIcon, {
  tagName: 'az-icon',
  classPrefix: 'az',
})

describe('ColorButton.vue', () => {
  const build = () => {
    const wrapper = shallowMount(ColorButton, {
      localVue,
    })

    return {
      wrapper,
    }
  }

  it('Comprueba renderizado del componente ColorButton con snapshot', () => {
    const { wrapper } = build()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('Comprueba que emite evento "click" al ser pulsado', async () => {
    const { wrapper } = build();
    // Al pulsar sobre el elemento lanza el evento click
    wrapper.trigger('click');
    // Esperamos para que emits sea manejado
    await wrapper.vm.$nextTick()
    // Comprobamos que se ha emitido el evento click
    expect(wrapper.emitted().click).toBeTruthy();
    expect(wrapper.emitted().click.length).toBe(1);
  });

  it('Comprueba que la propiedad color por defecto no seleccionada', async () => {
    const { wrapper } = build();
    // Comprobamos que se tiene las props por defecto
    expect(wrapper.vm.color).toStrictEqual(1);
    expect(wrapper.vm.selected).toStrictEqual(false);
    // Comprobamos que se ha añadido la clase con color 1
    expect(wrapper.find('.colorButton__fill__color-1').isVisible()).toBe(true);
  });

  it('Comprueba que la propiedad color por defecto seleccionada', async () => {
    const { wrapper } = build();
    // Si actualizamos la propiedad selected, añade la clase selected
    await wrapper.setProps({
      selected: true,
    });
    // Esperamos para que se actualice la prop
    await wrapper.vm.$nextTick()
    // Comprobamos que se ha actualizado las props
    expect(wrapper.vm.color).toStrictEqual(1);
    expect(wrapper.vm.selected).toStrictEqual(true);
    // Comprobamos que se ha añadido la clase con color 1
    expect(wrapper.find('.colorButton__fill__color-1').isVisible()).toBe(true);
    // Comprobamos que se ha añadido la clase con color 1 seleccionada
    expect(wrapper.find('.colorButton__fill__color-1--selected').isVisible()).toBe(true);
  });

  it('Comprueba que la propiedad con color 2', async () => {
    const { wrapper } = build();
    // Si actualizamos la propiedad color, añade la clase colorButton__fill__color-2
    await wrapper.setProps({
      color: 2,
    });
    // Esperamos para que se actualice la prop
    await wrapper.vm.$nextTick()
    // Comprobamos que se ha actualizado las props
    expect(wrapper.vm.color).toStrictEqual(2);
    // Comprobamos que se ha añadido la clase con color 2
    expect(wrapper.find('.colorButton__fill__color-2').isVisible()).toBe(true);
  });

  it('Comprueba que la propiedad color con valor 2 y seleccionada', async () => {
    const { wrapper } = build();
    // Si actualizamos la propiedad selected y color, añade la clase selected al color seleccionado
    await wrapper.setProps({
      color: 2,
      selected: true,
    });
    // Esperamos para que se actualice la prop
    await wrapper.vm.$nextTick()
        // Comprobamos que se ha actualizado las props
    expect(wrapper.vm.color).toStrictEqual(2);
    expect(wrapper.vm.selected).toStrictEqual(true);
    // Comprobamos que se ha añadido la clase con color 2
    expect(wrapper.find('.colorButton__fill__color-2').isVisible()).toBe(true);
    // Comprobamos que se ha añadido la clase con color 2 seleccionada
    expect(wrapper.find('.colorButton__fill__color-2--selected').isVisible()).toBe(true);
  });
});
