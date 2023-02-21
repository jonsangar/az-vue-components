import { shallowMount, createLocalVue } from '@vue/test-utils';
// Importamos librerías de estilos e iconos
import SvgIcon from 'vue-svgicon'
import Row from './Row.vue';

const localVue = createLocalVue()
localVue.use(SvgIcon, {
  tagName: 'az-icon',
  classPrefix: 'az',
})

describe('Row.vue', () => {
  const slotContent = '<span>foo</span>';

  const build = () => {
    const wrapper = shallowMount(Row, {
      localVue,
      slots: {
        default: slotContent,
      },
    })

    return {
      wrapper,
    }
  }

  it('Comprueba renderizado del componente Row con snapshot', () => {
    const { wrapper } = build()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('Renderiza el contenido del slot', async () => {
    const { wrapper } = build()
    wrapper.setProps({
      inline: true,
      align: 'center',
      valign: 'middle',
      dir: 'row',
      hwrap: 'nowrap',
      vwrap: 'between',
      vgutter: 'none',
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toContain(slotContent);
    expect(wrapper.html()).toMatchSnapshot()
  });

  it('Comprueba el validator para la alineación "align"', async () => {
    // NOTA: Los validadores es mejor testearlos de forma aislada (sin montar);
    const validator = Row.props.align.validator;

    // Testeamos el validador de la prop como una función normal
    expect(validator('left')).toBe(true);
    expect(validator('right')).toBe(true);
    expect(validator('center')).toBe(true);
    expect(validator('between')).toBe(true);
    expect(validator('around')).toBe(true);
    expect(validator('evenly')).toBe(true);
    expect(validator('')).toBe(true);
    expect(validator('fakealign')).toBe(false);
  });

  it('Comprueba el validator para la alineación vertical "valign"', async () => {
    // NOTA: Los validadores es mejor testearlos de forma aislada (sin montar);
    const validator = Row.props.valign.validator;

    // Testeamos el validador de la prop como una función normal
    expect(validator('stretch')).toBe(true);
    expect(validator('top')).toBe(true);
    expect(validator('middle')).toBe(true);
    expect(validator('bottom')).toBe(true);
    expect(validator('baseline')).toBe(true);
    expect(validator('')).toBe(true);
    expect(validator('fakevalign')).toBe(false);
  });

  it('Comprueba el validator para la dirección "dir"', async () => {
    // NOTA: Los validadores es mejor testearlos de forma aislada (sin montar);
    const validator = Row.props.dir.validator;

    // Testeamos el validador de la prop como una función normal
    expect(validator('row')).toBe(true);
    expect(validator('row-reverse')).toBe(true);
    expect(validator('column')).toBe(true);
    expect(validator('column-resverse')).toBe(true);
    expect(validator('')).toBe(true);
    expect(validator('fakedir')).toBe(false);
  });

  it('Comprueba el validator para la envoltura horizontal "hwrap"', async () => {
    // NOTA: Los validadores es mejor testearlos de forma aislada (sin montar);
    const validator = Row.props.hwrap.validator;

    // Testeamos el validador de la prop como una función normal
    expect(validator('nowrap')).toBe(true);
    expect(validator('wrap')).toBe(true);
    expect(validator('wrap-reverse')).toBe(true);
    expect(validator('')).toBe(true);
    expect(validator('fakehwrap')).toBe(false);
  });

  it('Comprueba el validator para la envoltura vertical "vwrap"', async () => {
    // NOTA: Los validadores es mejor testearlos de forma aislada (sin montar);
    const validator = Row.props.vwrap.validator;

    // Testeamos el validador de la prop como una función normal
    expect(validator('stretch')).toBe(true);
    expect(validator('top')).toBe(true);
    expect(validator('middle')).toBe(true);
    expect(validator('bottom')).toBe(true);
    expect(validator('between')).toBe(true);
    expect(validator('around')).toBe(true);
    expect(validator('')).toBe(true);
    expect(validator('fakevwrap')).toBe(false);
  });

  it('Comprueba el validator para el canalón vertical "hgutter"', async () => {
    // NOTA: Los validadores es mejor testearlos de forma aislada (sin montar);
    const validator = Row.props.hgutter.validator;

    // Testeamos el validador de la prop como una función normal
    expect(validator('none')).toBe(true);
    expect(validator('small')).toBe(true);
    expect(validator('default')).toBe(true);
    expect(validator('large')).toBe(true);
    expect(validator('')).toBe(true);
    expect(validator('fakehgutter')).toBe(false);
  });

  it('Comprueba el validator para el canalón vertical "vgutter"', async () => {
    // NOTA: Los validadores es mejor testearlos de forma aislada (sin montar);
    const validator = Row.props.vgutter.validator;

    // Testeamos el validador de la prop como una función normal
    expect(validator('none')).toBe(true);
    expect(validator('small')).toBe(true);
    expect(validator('default')).toBe(true);
    expect(validator('large')).toBe(true);
    expect(validator('')).toBe(true);
    expect(validator('fakevgutter')).toBe(false);
  });
});
