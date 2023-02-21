import { shallowMount, createLocalVue } from '@vue/test-utils';
// Importamos librerías de estilos e iconos
import SvgIcon from 'vue-svgicon'
import Fieldset from './Fieldset.vue';

const localVue = createLocalVue()
localVue.use(SvgIcon, {
  tagName: 'az-icon',
  classPrefix: 'az',
})

describe('Fieldset.vue', () => {
  const build = () => {
    const wrapper = shallowMount(Fieldset, {
      localVue,
    })

    return {
      wrapper,
    }
  }

  it('Comprueba renderizado del componente Fieldset con snapshot', () => {
    const { wrapper } = build()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('Comprueba que la propiedad boxShadow es false por defecto y no existe la clase shadow-3', async () => {
    const { wrapper } = build();
    // Comprobamos que se tiene las props por defecto
    expect(wrapper.vm.boxShadow).toStrictEqual(false);
    expect(wrapper.vm.title).toStrictEqual('');
    // Comprobamos que se ha añadido la clase shadow-3
    expect(wrapper.find('.shadow-3').exists()).toBe(false);
  });

  it('Comprueba que la propiedad boxShadow es true y existe la clase shadow-3', async () => {
    const { wrapper } = build();
    // Si actualizamos la propiedad boxsadow a true, la clase shadow-3 existe
    await wrapper.setProps({
      boxShadow: true,
    });
    await wrapper.vm.$nextTick()
    // Comprobamos que se tiene las props por defecto
    expect(wrapper.vm.boxShadow).toStrictEqual(true);
    expect(wrapper.vm.title).toStrictEqual('');
    // Comprobamos que se ha añadido la clase shadow-3
    expect(wrapper.find('.shadow-3').exists()).toBe(true);
  });

  it('Comprueba la propiedad title con valor y que existe el texto', async () => {
    const { wrapper } = build();
    // Si actualizamos la propiedad boxsadow a false, la clase shadow-3 no existe
    await wrapper.setProps({
      title: 'myTitle',
    });
    // Comprobamos que se tiene las props por defecto
    expect(wrapper.vm.boxShadow).toStrictEqual(false);
    expect(wrapper.vm.title).toStrictEqual('myTitle');
    // Comprobamos que se ha añadido el texto myTitle
    expect(wrapper.find('.az-fieldset__title').text()).toBe('myTitle');
  });
})
