import { shallowMount, createLocalVue } from '@vue/test-utils';
// Importamos librerías de estilos e iconos
import SvgIcon from 'vue-svgicon'
import Switch from './Switch.vue';

const localVue = createLocalVue()
localVue.use(SvgIcon, {
  tagName: 'az-icon',
  classPrefix: 'az',
})

describe('Switch.vue', () => {
  const build = () => {
    const wrapper = shallowMount(Switch, {
      localVue,
    })

    return {
      wrapper,
    }
  }

  it('Comprueba renderizado del componente Switch con snapshot', () => {
    const { wrapper } = build()
    wrapper.vm.$nextTick();

    expect(wrapper.html()).toMatchSnapshot()

    const elem = wrapper.find('.az-switch');

    expect(elem.isVisible()).toBe(true);

    expect(elem.attributes().role).toBe('switch');
  })

  it('Comprueba valores activo/inactivo por defecto', () => {
    const { wrapper } = build()
    wrapper.vm.$nextTick();

    expect(wrapper.vm.inactiveValue).toBe(false);
    expect(wrapper.vm.activeValue).toBe(true);
  })

  it('Comprueba valores personalizados de activo/incativo', () => {
    const wrapper = shallowMount(Switch, {
      localVue,
      propsData: {
        value: true,
        activeValue: 'active',
        inactiveValue: 'inactive'
      }
    })
    wrapper.vm.$nextTick();

    expect(wrapper.html()).toMatchSnapshot()

    expect(wrapper.vm.activeValue).toBe('active');
    expect(wrapper.vm.inactiveValue).toBe('inactive');


  })

  it('Comprueba estado "ON" cuando el valor introducido es el adecuado', async () => {
    const wrapper = shallowMount(Switch, {
      localVue,
      propsData: {
        value: true
      }
    }
    )
    wrapper.vm.$nextTick();

    expect(wrapper.html()).toMatchSnapshot();

    const elem = wrapper.find('.az-switch');

    expect(elem.classes()).toContain('az-switch--on');
    expect(elem.attributes()['aria-checked']).toBe('true')

  })

  it('Comprueba estado "OFF" cuando el valor introducido es el adecuado', async () => {
    const { wrapper } = build()
    wrapper.vm.$nextTick();
    // *********************
    // Probando con Boolean
    // *********************
    await wrapper.setProps({
      value: false
    });

    expect(wrapper.html()).toMatchSnapshot();

    const elem = wrapper.find('.az-switch');

    expect(wrapper.vm.checked).toBe(false);
    expect(elem.classes()).not.toContain('az-switch--on');
    expect(elem.attributes()['aria-checked']).toBe('false');
  });

  it('Comprueba que al pasar de "off" a "on" se ejecuta como es debido', async () => {
    const { wrapper } = build();
    wrapper.vm.$nextTick();

    const elem = wrapper.find('.az-switch');

    await elem.trigger('click');
    // Pasamos de inactivo a activo
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input[0]).toEqual([true]);
    expect(wrapper.emitted().change).toBeTruthy();
    expect(wrapper.emitted().change[0]).toEqual([true]);
    // expect(wrapper.vm.value).toBe(true); // Se debería de emitir el y actualizar el valor [!]

  })

  it('Comprueba que al pasar de "on" a "off" se ejecuta como es debido', async () => {
    // Nota inicializamos el valor del props a la hora de montarlo (para forzar estado inicial a true)
    const wrapper = shallowMount(Switch, {
      localVue,
      propsData: {
        value: true
      }
    })

    const elem = wrapper.find('.az-switch');

    await elem.trigger('click');
    // Pasamos de activa a inactivo
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input[0]).toEqual([false]);
    expect(wrapper.emitted().change).toBeTruthy();
    expect(wrapper.emitted().change[0]).toEqual([false]);
    // expect(wrapper.vm.value).toBe(false); // Se debería de emitir el y actualizar el valor [!]

  })

  it('Comprueba que al pasar de "on" a "off" se ejecuta con valores personalizados', async () => {
    // Nota inicializamos el valor del props a la hora de montarlo (para forzar estado inicial a true)
    const wrapper = shallowMount(Switch, {
      localVue,
      propsData: {
        value: 'active',
        activeValue: 'active',
        inactiveValue: 'inactive'
      }
    })

    const elem = wrapper.find('.az-switch');

    await elem.trigger('click');
    // Pasamos de activa a inactivo
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input[0]).toEqual(['inactive']);
    expect(wrapper.emitted().change).toBeTruthy();
    expect(wrapper.emitted().change[0]).toEqual(['inactive']);
    // expect(wrapper.vm.value).toBe('inactive'); // Se debería de emitir el y actualizar el valor [!]

  })

  it('Comprueba que al pasar de "off" a "on" se ejecuta con valores personalizados', async () => {
    // Nota inicializamos el valor del props a la hora de montarlo (para forzar estado inicial a true)
    const wrapper = shallowMount(Switch, {
      localVue,
      propsData: {
        value: 'inactive',
        activeValue: 'active',
        inactiveValue: 'inactive'
      }
    })

    const elem = wrapper.find('.az-switch');

    await elem.trigger('click');
    // Pasamos de activa a inactivo
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input[0]).toEqual(['active']);
    expect(wrapper.emitted().change).toBeTruthy();
    expect(wrapper.emitted().change[0]).toEqual(['active']);
    // expect(wrapper.vm.value).toBe('active'); // Se debería de emitir el y actualizar el valor [!]

  })

  it('Comprueba que se aplica correctamente "activeColor"', async () => {
    const wrapper = shallowMount(Switch, {
      localVue,
      propsData: {
        value: true,
        activeColor: 'red'
      }
    });
    wrapper.vm.$nextTick();

    expect(wrapper.html()).toMatchSnapshot();
    const elem = wrapper.find('.az-switch');

    expect(elem.attributes()).toHaveProperty('style');
    expect(elem.attributes().style).toContain('background-color: red');
  });

  it('Comprueba que no se aplican estilos de "activeColor" cuando Switch está inactivo', async () => {
    const wrapper = shallowMount(Switch, {
      localVue,
      propsData: {
        value: false,
        activeColor: 'red'
      }
    });
    wrapper.vm.$nextTick();

    expect(wrapper.html()).toMatchSnapshot();
    const elem = wrapper.find('.az-switch');

    expect(elem.attributes()).not.toHaveProperty('style');
  });

  it('Comprueba que se aplica correctamente "inactiveColor"', async () => {
    const wrapper = shallowMount(Switch, {
      localVue,
      propsData: {
        value: false,
        inactiveColor: 'blue'
      }
    });
    wrapper.vm.$nextTick();

    expect(wrapper.html()).toMatchSnapshot();
    const elem = wrapper.find('.az-switch');

    expect(elem.attributes().style).toContain('background-color: blue');

  });

  it('Comprueba que no se aplican estilos de "inactiveColor" cuando Switch está activo', async () => {
    const wrapper = shallowMount(Switch, {
      localVue,
      propsData: {
        value: true,
        inactiveColor: 'blue'
      }
    });
    wrapper.vm.$nextTick();

    expect(wrapper.html()).toMatchSnapshot();
    const elem = wrapper.find('.az-switch');

    expect(elem.attributes()).not.toHaveProperty('style');
  });

  it('Comprueba que se aplica el estilo "size small"', async () => {
    const wrapper = shallowMount(Switch, {
      localVue,
      propsData: {
        size: 'small'
      }
    });
    wrapper.vm.$nextTick();

    expect(wrapper.html()).toMatchSnapshot();
    const elem = wrapper.find('.az-switch');
    expect(elem.classes()).toContain('az-switch--small');
  })

  it('Comprueba que se aplica el estilo "size large"', async () => {
    const wrapper = shallowMount(Switch, {
      localVue,
      propsData: {
        size: 'large'
      }
    });
    wrapper.vm.$nextTick();

    expect(wrapper.html()).toMatchSnapshot();
    const elem = wrapper.find('.az-switch');
    expect(elem.classes()).toContain('az-switch--large');
  });

  it('Comprueba que no se aplican "sizes" no válidos', async () => {
    // NOTA: Los validadores es mejor testearlos de forma aislada (sin montar);
    const validator = Switch.props.size.validator;

    // Testeamos el validador de la prop como una función normal
    expect(validator('small')).toBe(true);
    expect(validator('large')).toBe(true);
    expect(validator('fakesize')).toBe(false);
  });


  it('Comprueba el estado "disabled"', async () => {
    const { wrapper } = build();
    wrapper.vm.$nextTick();

    await wrapper.setProps({
      disabled: true
    });

    expect(wrapper.html()).toMatchSnapshot();

    const elem = wrapper.find('.az-switch');

    expect(elem.classes()).toContain('az-switch--disabled');

    await elem.trigger('click');

    expect(wrapper.emitted().input).toBeFalsy();
    expect(wrapper.emitted().change).toBeFalsy();
  });

})
