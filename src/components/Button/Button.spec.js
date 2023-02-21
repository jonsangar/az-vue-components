import { mount, createLocalVue } from '@vue/test-utils';
// Importamos librerías de estilos e iconos
import SvgIcon from 'vue-svgicon'
import AzLoading from 'Core/components/Loading/Loading.vue';
import Button from './Button.vue';

const localVue = createLocalVue()
localVue.use(SvgIcon, {
  tagName: 'az-icon',
  classPrefix: 'az',
})

localVue.component('AzLoading', AzLoading);

describe('Button.vue', () => {
  const build = () => {
    const wrapper = mount(Button, {
      localVue
    })

    return {
      wrapper,
    }
  }

  it('Comprueba renderizado del componente Button con snapshot', () => {
    const { wrapper } = build()
    expect(wrapper.html()).toMatchSnapshot()

  })

  it('Comprueba que emite evento "click" al ser pulsado', async () => {
    const { wrapper } = build();
    // Al pulsar sobre el elemento lanza el evento click
    wrapper.trigger('click');
    // Comprobamos que se ha emitido el evento click
    expect(wrapper.emitted().click).toBeTruthy();
    expect(wrapper.emitted().click.length).toBe(1);
  });

  it('Comprueba que el botón tiene la propiedad disabled activada', async () => {
    const { wrapper } = build();
    // Si actualizamos la propiedad disabled, añade la clase disabled
    await wrapper.setProps({
      disabled: true,
    });

    // Comprobamos que se ha desabilitado la prop
    expect(wrapper.vm.disabled).toStrictEqual(true);
    // Comprobamos que se ha añadido la clase desabilitado
    expect(wrapper.find('.az-button--disabled').isVisible()).toBe(true);
  });
})

describe('Button.vue', () => {
  const build = () => {
    const wrapper = mount(Button, {
      localVue,
      propsData: {
        loading: true,
      }
    })

    return {
      wrapper,
    }
  }

  it('Comprueba que el botón tiene la propiedad loading activada', async () => {
    const { wrapper } = build();
    // Comprobamos que se ha activado la prop
    expect(wrapper.vm.loading).toStrictEqual(true);
    // Comprobamos que se ha añadido la clase loading
    expect(wrapper.find('.az-button--loading').isVisible()).toBe(true);
  });
})

describe('Button.vue', () => {
  const build = () => {
    const wrapper = mount(Button, {
      localVue,
      propsData: {
        loadingIconOnly: true
      }
    })

    return {
      wrapper,
    }
  }

  it('Comprueba que el botón tiene la propiedad loadingIconOnly activada', async () => {
    const { wrapper } = build();
    // Comprobamos que se ha activado la prop
    expect(wrapper.vm.loadingIconOnly).toStrictEqual(true);
    // Comprobamos que se ha añadido la clase loadingIconOnly
    expect(wrapper.find('.az-button--loadingIconOnly').isVisible()).toBe(true);
  });
})

describe('Button.vue', () => {
  const build = () => {
    const wrapper = mount(Button, {
      localVue,
      propsData: {
        block: true,
      }
    })

    return {
      wrapper,
    }
  }

  it('Comprueba que el botón tiene la propiedad block activada', async () => {
    const { wrapper } = build();
    // Comprobamos que se ha activado la prop
    expect(wrapper.vm.block).toStrictEqual(true);
    // Comprobamos que se ha añadido la clase block
    expect(wrapper.find('.az-button--block').isVisible()).toBe(true);
  });
})

describe('Button.vue', () => {
  const build = () => {
    const wrapper = mount(Button, {
      localVue,
      propsData: {
        ghost: true,
      }
    })

    return {
      wrapper,
    }
  }

  it('Comprueba que el botón tiene la propiedad ghost activada', async () => {
    const { wrapper } = build();
    // Comprobamos que se ha activado la prop
    expect(wrapper.vm.ghost).toStrictEqual(true);
    // Comprobamos que se ha añadido la clase ghost
    expect(wrapper.find('.az-button--ghost').isVisible()).toBe(true);
  });
})

describe('Button.vue', () => {
  const build = () => {
    const wrapper = mount(Button, {
      localVue,
      propsData: {
        plain: true,
      }
    })

    return {
      wrapper,
    }
  }

  it('Comprueba que el botón tiene la propiedad plain activada', async () => {
    const { wrapper } = build();
    // Comprobamos que se ha activado la prop
    expect(wrapper.vm.plain).toStrictEqual(true);
    // Comprobamos que se ha añadido la clase ghost
    expect(wrapper.find('.az-button--plain').isVisible()).toBe(true);
  });
})

describe('Button.vue', () => {
  const build = () => {
    const wrapper = mount(Button, {
      localVue,
      propsData: {
        square: true,
      }
    })

    return {
      wrapper,
    }
  }

  it('Comprueba que el botón tiene la propiedad square activada', async () => {
    const { wrapper } = build();
    expect(wrapper.vm.square).toStrictEqual(true);
    // Comprobamos que se ha añadido la clase square
    expect(wrapper.find('.az-button--square').isVisible()).toBe(true);
  });
})

describe('Button.vue', () => {
  const build = () => {
    const wrapper = mount(Button, {
      localVue,
      propsData: {
        circle: true,
      }
    })

    return {
      wrapper,
    }
  }

  it('Comprueba que el botón tiene la propiedad circle activada', async () => {
    const { wrapper } = build();
    expect(wrapper.vm.circle).toStrictEqual(true);
    // Comprobamos que se ha añadido la clase circle
    expect(wrapper.find('.az-button--circle').isVisible()).toBe(true);
  });
})

describe('Button.vue', () => {
  const build = () => {
    const wrapper = mount(Button, {
      localVue,
      propsData: {
        type: 'rafa'
      }
    })

    return {
      wrapper,
    }
  }

  it('Comprueba que el botón tiene la propiedad type activada', async () => {
    const { wrapper } = build();
    // Comprobamos que se ha activado la prop
    expect(wrapper.vm.type).toStrictEqual('rafa');
    // Comprobamos que se ha añadido la clase circle
    expect(wrapper.find('.az-button--rafa').isVisible()).toBe(true);
  });
})

describe('Button.vue', () => {
  const build = () => {
    const wrapper = mount(Button, {
      localVue,
      propsData: {
        size: 'sm'
      }
    })

    return {
      wrapper,
    }
  }

  it('Comprueba que el botón tiene la propiedad size activada', async () => {
    const { wrapper } = build();
    // Comprobamos que se ha activado la prop
    expect(wrapper.vm.size).toStrictEqual('sm');
    // Comprobamos que se ha añadido la clase circle
    expect(wrapper.find('.az-button--sm').isVisible()).toBe(true);
  });
})

describe('Button.vue', () => {
  const build = () => {
    const wrapper = mount(Button, {
      localVue,
      propsData: {
        iconName: 'success',
        iconPosition: 'left'
      }
    })

    return {
      wrapper,
    }
  }

  it('Comprueba que el botón tiene la propiedad iconName e iconPosition', async () => {
    const { wrapper } = build();
      // Comprobamos que se ha activado la prop
    expect(wrapper.vm.iconName).toStrictEqual('success');
    expect(wrapper.vm.iconPosition).toStrictEqual('left');
    // Comprobamos que se ha añadido la clase circle
    expect(wrapper.find('.az-button--icon-left').isVisible()).toBe(true);
  });
})

describe('Button.vue', () => {
  const build = () => {
    const wrapper = mount(Button, {
      localVue,
      propsData: {
        nativeType: 'submit'
      }
    })

    return {
      wrapper,
    }
  }

  it('Comprueba que el botón tiene la propiedad nativeType', async () => {
    const { wrapper } = build();
    // Comprobamos que se ha activado la prop
    expect(wrapper.vm.nativeType).toStrictEqual('submit');
  });
})

describe('Button.vue', () => {
  const build = () => {
    const wrapper = mount(Button, {
      localVue,
      propsData: {
        loadingText: 'montes'
      }
    })

    return {
      wrapper,
    }
  }

  it('Comprueba que el botón tiene la propiedad loadingText', async () => {
    const { wrapper } = build();
    // Comprobamos que se ha activado la prop
    expect(wrapper.vm.loadingText).toStrictEqual('montes');
  });
})

describe('Button.vue', () => {
  const build = () => {
    const wrapper = mount(Button, {
      localVue,
      propsData: {
        loadingType: 'myLoading'
      }
    })

    return {
      wrapper,
    }
  }

  it('Comprueba que el botón tiene la propiedad loadingType', async () => {
    const { wrapper } = build();
    // Comprobamos que se ha activado la prop
    expect(wrapper.vm.loadingType).toStrictEqual('myLoading');
  });
})
