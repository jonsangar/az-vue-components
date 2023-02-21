import { shallowMount, createLocalVue } from '@vue/test-utils';
// Importamos librerías de estilos e iconos
import SvgIcon from 'vue-svgicon'
import Checkbox from './Checkbox.vue';

const localVue = createLocalVue()
localVue.use(SvgIcon, {
  tagName: 'az-icon',
  classPrefix: 'az',
})

describe('Checkbox.vue', () => {
  const build = () => {
    const wrapper = shallowMount(Checkbox, {
      localVue,
    })

    return {
      wrapper,
    }
  }

  it('Comprueba renderizado del componente Checkbox con snapshot', () => {
    const { wrapper } = build()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('Comprueba que emite evento "click" al ser pulsado', async () => {
    const { wrapper } = build();
    // Al pulsar sobre el elemento lanza el evento click
    wrapper.trigger('click');
    // Esperamos para que emits sea manejado
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()
    // Comprobamos que se ha emitido el evento click
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input.length).toBe(1);
    expect(wrapper.emitted().input[0]).toEqual([true])
  });

  it('Comprueba que no emite evento "click" al ser pulsado, cuando está deshabilitado', async () => {
    const { wrapper } = build();
    // Si actualizamos la propiedad disabled, no emite evento click
    await wrapper.setProps({
      disabled: true,
    });
    // Al pulsar sobre el elemento lanza el evento click
    wrapper.trigger('click');
    // Esperamos para que emits sea manejado
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()
    // Comprobamos que se ha emitido el evento click
    expect(wrapper.emitted().input).toBe(undefined);
  });

  // it('Comprueba que tiene el titulo', async () => {
  //   const { wrapper } = build();
  //   // Si actualizamos la propiedad title, añade el título
  //   await wrapper.setProps({
  //     title: 'myTitle',
  //   });
  //   // Esperamos para que se actualice la prop
  //   await wrapper.vm.$nextTick()
  //   // Comprobamos que se ha activado la prop
  //   expect(wrapper.vm.title).toStrictEqual('myTitle');
  //   // Comprobamos que se ha añadido el titulo con estilos por defecto
  //   expect(wrapper.find('.az-cell-group__title').isVisible()).toBe(true);
  //   expect(wrapper.find('.az-cell-group__title').text()).toBe('myTitle');
  // });
})
