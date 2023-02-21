import { mount, createLocalVue } from '@vue/test-utils';
// Importamos librerías de estilos e iconos
import SvgIcon from 'vue-svgicon'
import Cell from './Cell.vue';

const localVue = createLocalVue()
localVue.use(SvgIcon, {
  tagName: 'az-icon',
  classPrefix: 'az',
})

describe('Cell.vue', () => {
  const build = () => {
    const wrapper = mount(Cell, {
      localVue,
    })

    return {
      wrapper,
      cell: wrapper.find('.az-cell__body'),
    }
  }

  it('Comprueba renderizado del componente Cell con snapshot', () => {
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

  it('Comprueba que el botón tiene la propiedad isLink activada', async () => {
    const { wrapper } = build();
    // Si actualizamos la propiedad isLink, añade la clase az-button--isLink
    await wrapper.setProps({
      isLink: true,
    });
    // Esperamos para que se actualice la prop
    await wrapper.vm.$nextTick()
    // Comprobamos que se ha activado la prop
    expect(wrapper.vm.isLink).toStrictEqual(true);
    // Comprobamos que se ha añadido la clase isLink
    expect(wrapper.find('.az-cell--link').isVisible()).toBe(true);
  });

  it('Comprueba que el botón tiene la propiedad valueAlign a la izquierda', async () => {
    const { wrapper, cell } = build();
    // Si actualizamos la propiedad valueAlign, añade el valor flex-start al estilo justify-content
    await wrapper.setProps({
      valueAlign: 'left',
    });
    // Esperamos para que se actualice la prop
    await wrapper.vm.$nextTick()
    // Comprobamos que se ha activado la prop
    expect(wrapper.vm.valueAlign).toStrictEqual('left');
    expect(wrapper.html()).toMatchSnapshot()
    // Comprobamos que se ha añadido el valor flex-start al estilo justify-content
    expect(cell.element.style.getPropertyValue('justify-content')).toBe('flex-start');
  });

  it('Comprueba que el botón tiene la propiedad valueAlign a la derecha', async () => {
    const { wrapper , cell } = build();
    // Si actualizamos la propiedad valueAlign, añade el valor flex-end al estilo justify-content
    await wrapper.setProps({
      title: 'myTitle',
      valueAlign: 'right',
    });
    // Esperamos para que se actualice la prop
    await wrapper.vm.$nextTick()
    // Comprobamos que se ha activado la prop
    expect(wrapper.vm.valueAlign).toStrictEqual('right');
    // Comprobamos que se ha añadido el valor flex-end al estilo justify-content
    expect(cell.element.style.getPropertyValue('justify-content')).toBe('flex-end');
  });

  it('Comprueba que el botón tiene la propiedad valueAlign al centro', async () => {
    const { wrapper, cell } = build();
    // Si actualizamos la propiedad valueAlign, añade el valor center al estilo justify-content
    await wrapper.setProps({
      title: 'myTitle',
      valueAlign: 'center',
    });
    // Esperamos para que se actualice la prop
    await wrapper.vm.$nextTick()
    // Comprobamos que se ha activado la prop
    expect(wrapper.vm.valueAlign).toStrictEqual('center');
    // Comprobamos que se ha añadido el valor center al estilo justify-content
    expect(cell.element.style.getPropertyValue('justify-content')).toBe('center');
  });

  it('Comprueba que tiene el icono de la izquierda', async () => {
    const { wrapper } = build();
    // Si actualizamos la propiedad leftIcon, añade el icono
    await wrapper.setProps({
      leftIcon: 'nest',
    });
    // Esperamos para que se actualice la prop
    await wrapper.vm.$nextTick()
    // Comprobamos que se ha activado la prop
    expect(wrapper.vm.leftIcon).toStrictEqual('nest');
    // Comprobamos que se ha añadido el icono
    expect(wrapper.find('.az-cell__left-icon').isVisible()).toBe(true);
  });

  it('Comprueba que tiene el icono de la izquierda con escalado', async () => {
    const { wrapper } = build();
    // Si actualizamos la propiedad leftIcon, añade el icono con scale
    await wrapper.setProps({
      leftIcon: 'nest',
      scaleLeftIcon: '1',
    });
    // Esperamos para que se actualice la prop
    await wrapper.vm.$nextTick()
        expect(wrapper.html()).toMatchSnapshot()
    // Comprobamos que se ha activado la prop
    expect(wrapper.vm.leftIcon).toStrictEqual('nest');
    expect(wrapper.vm.scaleLeftIcon).toStrictEqual('1');
    expect(wrapper.find('.az-cell__left-icon').isVisible()).toBe(true);
    // expect(wrapper.find('.az-icon').isVisible()).toBe(true);
    // Comprobamos que se ha añadido el icono con scale
    // expect(wrapper.find('.az-cell__link-icon').attributes().scale).toStrictEqual('1');
  });

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
    expect(wrapper.find('.az-cell__title').isVisible()).toBe(true);
    expect(wrapper.find('.az-cell__title').text()).toBe('myTitle');
    expect(wrapper.find('.az-cell__title').element.style.getPropertyValue('width')).toStrictEqual('90px');
    expect(wrapper.find('.az-cell__title').element.style.getPropertyValue('text-align')).toStrictEqual('left');
  });

  it('Comprueba que tiene el titulo con estilos', async () => {
    const { wrapper } = build();
    // Si actualizamos la propiedad leftIcon, añade el icono con scale
    await wrapper.setProps({
      title: 'myTitle',
      titleWidth: '30%',
      titleAlign: 'center',
    });
    // Esperamos para que se actualice la prop
    await wrapper.vm.$nextTick()
    // Comprobamos que se ha activado la prop
    expect(wrapper.vm.title).toStrictEqual('myTitle');
    // Comprobamos que se ha añadido el titulo con estilos
    expect(wrapper.find('.az-cell__title').isVisible()).toBe(true);
    expect(wrapper.find('.az-cell__title').text()).toBe('myTitle');
    expect(wrapper.find('.az-cell__title').element.style.getPropertyValue('width')).toStrictEqual('30%');
    expect(wrapper.find('.az-cell__title').element.style.getPropertyValue('text-align')).toStrictEqual('center');
  });

  it('Comprueba que tiene el titulo con etiqueta', async () => {
    const { wrapper } = build();
    // Si actualizamos la propiedad title y label, añade el título y label
    await wrapper.setProps({
      title: 'myTitle',
      label: 'myLabel'
    });
    // Esperamos para que se actualice las props
    await wrapper.vm.$nextTick()
    // Comprobamos que se han activado la props
    expect(wrapper.vm.title).toStrictEqual('myTitle');
    // Comprobamos que se ha añadido el titulo y label
    expect(wrapper.find('.az-cell__title').isVisible()).toBe(true);
    expect(wrapper.find('.az-cell__label').isVisible()).toBe(true);
    expect(wrapper.find('.az-cell__label').text()).toBe('myLabel');
  });

  it('Comprueba que tiene el icono de la derecha', async () => {
    const { wrapper } = build();
    // Si actualizamos la propiedad rightIcon, añade el icono de la derecha
    await wrapper.setProps({
      rightIcon: 'rightArrow',
    });
    // Esperamos para que se actualice la prop
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()
    // Comprobamos que se han activado la prop
    expect(wrapper.vm.rightIcon).toStrictEqual('rightArrow');
    // Comprobamos que se ha añadido el icono con su name right
    expect(wrapper.find('.az-cell__right-icon').isVisible()).toBe(true);
    // expect(wrapper.find('.az-icon').isVisible()).toBe(true);
    // expect(wrapper.find('.az-cell__link-icon').attributes().name).toBe('rightArrow');
  });

  it('Comprueba que tiene el icono con dirección y escalado', async () => {
    const { wrapper } = build();
    // Si actualizamos las propiedades arrowDirection, añade el icono con escalado
    await wrapper.setProps({
      arrowDirection: 'up',
      isLink: true,
    });
    // Esperamos para que se actualice la prop
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()
    // Comprobamos que se han activado la prop
    expect(wrapper.vm.arrowDirection).toStrictEqual('up');
    // Comprobamos que se ha añadido el icono con su name y escalado
    expect(wrapper.find('.az-cell__link-icon').isVisible()).toBe(true);
    // expect(wrapper.find('.az-icon').isVisible()).toBe(true);
    // expect(wrapper.find('.az-cell__link-icon').attributes().name).toBe('up');
    // expect(wrapper.find('.az-cell__link-icon').attributes().scale).toBe('1');
  });

  it('Comprueba el validator para la alineación del título "titleAlign"', async () => {
    // NOTA: Los validadores es mejor testearlos de forma aislada (sin montar);
    const validator = Cell.props.titleAlign.validator;

    // Testeamos el validador de la prop como una función normal
    expect(validator('left')).toBe(true);
    expect(validator('right')).toBe(true);
    expect(validator('center')).toBe(true);
    expect(validator('fakealign')).toBe(false);
  });

  it('Comprueba el validator para la alineación del valor "valueAlign"', async () => {
    // NOTA: Los validadores es mejor testearlos de forma aislada (sin montar);
    const validator = Cell.props.valueAlign.validator;

    // Testeamos el validador de la prop como una función normal
    expect(validator('left')).toBe(true);
    expect(validator('right')).toBe(true);
    expect(validator('center')).toBe(true);
    expect(validator('fakealign')).toBe(false);
  });

  it('Comprueba el validator para la dirección de flecha "arrowDirection"', async () => {
    // NOTA: Los validadores es mejor testearlos de forma aislada (sin montar);
    const validator = Cell.props.arrowDirection.validator;

    // Testeamos el validador de la prop como una función normal
    expect(validator('left')).toBe(true);
    expect(validator('right')).toBe(true);
    expect(validator('up')).toBe(true);
    expect(validator('down')).toBe(true);
    expect(validator('fakedirection')).toBe(false);
  });
})
