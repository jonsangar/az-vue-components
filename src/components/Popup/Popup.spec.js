import { shallowMount, createLocalVue } from '@vue/test-utils';
// Importamos librerías de estilos e iconos
import SvgIcon from 'vue-svgicon'
import Popup from './Popup.vue';

const localVue = createLocalVue()
localVue.use(SvgIcon, {
  tagName: 'az-icon',
  classPrefix: 'az',
})

describe('Popup.vue', () => {
  const build = () => {
    const wrapper = shallowMount(Popup, {
      localVue,
      propsData: {
        value: true
      }
    })

    return {
      wrapper,
    }
  }

  it('Comprueba renderizado del componente Popup con snapshot', () => {
    const { wrapper } = build()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('Comprueba el validator para la posición "position"', async () => {
    // NOTA: Los validadores es mejor testearlos de forma aislada (sin montar);
    const validator = Popup.props.position.validator;

    // Testeamos el validador de la prop como una función normal
    expect(validator('left')).toBe(true);
    expect(validator('right')).toBe(true);
    expect(validator('bottom')).toBe(true);
    expect(validator('top')).toBe(true);
    expect(validator('')).toBe(true);
    expect(validator('fakeposition')).toBe(false);
  });
})
