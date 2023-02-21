import { shallowMount, createLocalVue } from '@vue/test-utils';
// Importamos librerías de estilos e iconos
import SvgIcon from 'vue-svgicon'
import ColorButtonsSelector from './ColorButtonsSelector.component.vue';

const localVue = createLocalVue()
localVue.use(SvgIcon, {
  tagName: 'az-icon',
  classPrefix: 'az',
})

describe('ColorButtonsSelector.vue', () => {
  const build = () => {
    const wrapper = shallowMount(ColorButtonsSelector, {
      localVue,
      propsData: {
        value: 1
      }
    })

    return {
      wrapper,
      colorButton1: () => wrapper.findAll('.colorButtonsSelector__item').at(0),
      colorButton2: () => wrapper.findAll('.colorButtonsSelector__item').at(1),
      colorButton3: () => wrapper.findAll('.colorButtonsSelector__item').at(2),
      colorButton4: () => wrapper.findAll('.colorButtonsSelector__item').at(3),
      colorButton5: () => wrapper.findAll('.colorButtonsSelector__item').at(4),
      colorButton6: () => wrapper.findAll('.colorButtonsSelector__item').at(5),
    }
  }

  it('Comprueba renderizado del componente ColorButtonsSelector con snapshot', () => {
    const { wrapper } = build()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('Comprueba que la propiedad value es 1 por defecto', async () => {
    const { wrapper, colorButton1 } = build();
    // Comprobamos que se tiene las props por defecto
    expect(wrapper.vm.value).toStrictEqual(1);
    expect(wrapper.vm.colors).toStrictEqual([1,2,3,4,5,6]);
    expect(wrapper.vm.disabled).toStrictEqual(false);
    // Comprobamos que el elemento clicado tiene la propiedad selected con valor true
    expect(colorButton1().attributes().selected).toBe("true");
  });

  it('Comprueba la propiedad value con valor 2', async () => {
    const { wrapper } = build();
    await wrapper.setProps({
      value: 2,
    });
    // Esperamos para que se actualice la prop
    await wrapper.vm.$nextTick()
    // Comprobamos que se tiene las props por defecto
    expect(wrapper.vm.value).toStrictEqual(2);
    expect(wrapper.vm.disabled).toStrictEqual(false);
    expect(wrapper.vm.localValue).toStrictEqual(2);
  })

  it('Comprueba la emite 2 cuando clicamos en el colorButton 2', async () => {
    const { wrapper, colorButton2 } = build();
    await wrapper.setProps({
      value: 2,
    });
    // Esperamos para que se actualice la prop
    await wrapper.vm.$nextTick()
    // Comprobamos que se emite el evento click con valor 2
    await colorButton2().trigger('click')
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().change).toBeTruthy();
    expect(wrapper.emitted().input.length).toBe(1);
    expect(wrapper.emitted().change.length).toBe(1);
    expect(wrapper.emitted().input[0]).toEqual([2])
    expect(wrapper.emitted().change[0]).toEqual([2])
  });

  it('Comprueba que existe la clase selected cuando clicamos en el colorButton 2', async () => {
    const { wrapper, colorButton2 } = build();
    await wrapper.setProps({
      value: 2,
    });
    // Esperamos para que se actualice la prop
    await wrapper.vm.$nextTick()
    // Comprobamos que se emite el evento click con valor 2
    await colorButton2().trigger('click')
    // Comprobamos que el elemento clicado tiene la propiedad selected con valor true
    expect(wrapper.vm.value).toStrictEqual(2);
    expect(colorButton2().attributes().selected).toBe("true");
  });

  it('Comprueba que la propiedad disabled se activa', async () => {
    const { wrapper } = build();
    await wrapper.setProps({
      disabled: true,
    });
    expect(wrapper.vm.disabled).toStrictEqual(true);
    expect(wrapper.find('.colorButtonsSelector--disbled').exists()).toBe(true)
  });

});
