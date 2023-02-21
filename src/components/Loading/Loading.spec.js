
import { shallowMount, createLocalVue } from '@vue/test-utils';
// Importamos librerías de estilos e iconos
import SvgIcon from 'vue-svgicon'
import Loading from './Loading.vue';

const localVue = createLocalVue()
localVue.use(SvgIcon, {
  tagName: 'az-icon',
  classPrefix: 'az',
})

describe('Loading.vue', () => {
  const build = () => {
    const wrapper = shallowMount(Loading, {
      localVue
    })

    return {
      wrapper,
    }
  }

  it('Comprueba renderizado del componente Loading con snapshot', () => {
    const { wrapper } = build()
    expect(wrapper.html()).toMatchSnapshot()

  })

  it('Renderiza el loading con estilos por defecto', () => {
    const { wrapper } = build()
    expect(wrapper.html()).toContain('az-loading');
    expect(wrapper.find('.az-loading').attributes().style).toContain('--color-az-loading: var(--color-brand)');
  });

  it('Comprueba el validator para el tipo de loading "type"', async () => {
    // NOTA: Los validadores es mejor testearlos de forma aislada (sin montar);
    const validator = Loading.props.type.validator;

    // Testeamos el validador de la prop como una función normal
    expect(validator('bars')).toBe(true);
    expect(validator('circle')).toBe(true);
    expect(validator('star')).toBe(true);
    expect(validator('blobs')).toBe(true);
    expect(validator('square')).toBe(true);
    expect(validator('faketype')).toBe(false);
  });

  it('Comprueba que el estilo del loading es var(--color-danger) cuando se asigna dicho color', async () => {
    const { wrapper } = build()
    // Asignamos otro color para lanzar el watch
    wrapper.setProps({
      color: 'var(--color-danger)'
    })
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.az-loading').attributes().style).toContain('--color-az-loading: var(--color-danger)');
  });
});
