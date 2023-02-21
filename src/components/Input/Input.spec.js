import { shallowMount, createLocalVue } from '@vue/test-utils';
import { fireEvent } from '@testing-library/vue';
// Importamos librerías de estilos e iconos
import SvgIcon from 'vue-svgicon'
import Input from './Input.vue';

const localVue = createLocalVue()
localVue.use(SvgIcon, {
  tagName: 'az-icon',
  classPrefix: 'az',
})

describe('Input.vue', () => {

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });



  describe('Input type="text"', () => {

    const build = () => {
      const wrapper = shallowMount(Input, {
        localVue,
      })

      return {
        wrapper,
      }
    }


    it('Comprueba renderizado del componente Input con snapshot', () => {
      const { wrapper } = build()
      expect(wrapper.html()).toMatchSnapshot()

    });

    it('Renderiza correctamente el elemento input',async () => {
      const { wrapper } = build();
      await wrapper.vm.$nextTick();

      const input = wrapper.find('input');

      // Contiene un elemento input
      expect(input.isVisible()).toBe(true);
      // Contiene el atributo type="text"
      expect(input.attributes().type).toStrictEqual('text');
      // El elemento input tiene la clase az-input__control
      expect(input.attributes().class).toContain('__control');
      // Por defecto el align del input es left
      expect(input.attributes().style).toContain('text-align: left');

    });

    it('Comprobamos que no se renderiza el elemento <textarea>', async () => {
      const { wrapper } = build()
      await wrapper.vm.$nextTick();

      expect(wrapper.find('textarea').exists()).toBe(false);
    })

    it('El componente maneja la entrada y salida del valor correctamente para v-model', async () => {
      const { wrapper } = build();
      await wrapper.vm.$nextTick();
      // Pasamos como props un texto
      await wrapper.setProps({
        value: 'Initial input text'
      })
      // El texto debe producir cambios en localValue,
      expect(wrapper.vm.localValue).toBe('Initial input text');
      // localValue tiene un watcher que emitirá el evento input con el nuevo valor
      expect(wrapper.emitted().input).toBeTruthy();
      expect(wrapper.emitted().input[0]).toEqual(['Initial input text']);
      expect(wrapper.emitted().input.length).toBe(1);
      // Modificamos el texto de forma local. El cambio debe emitirse al valor externo
      // (Comportamiento necesario para que funcione v-model)
      await wrapper.setData({
        localValue: 'Text changed'
      });
      // Vuelve a emitirse el nuevo valor
      // Comprobamos que se han emitido los dos cambios
      expect(wrapper.emitted().input).toBeTruthy();
      expect(wrapper.emitted().input[1]).toEqual(['Text changed']);
      expect(wrapper.emitted().input.length).toBe(2);

    });

    it('El input align "center" se modifica correctamente', async () => {
      const { wrapper } = build();
      await wrapper.vm.$nextTick();

      await wrapper.setProps({
        inputAlign: 'center'
      });

      // Pintamos el html en snapshot
      expect(wrapper.html()).toMatchSnapshot();

      const input = wrapper.find('input');

      expect(input.attributes().style).toContain('text-align: center')
    });

    it('El input align "right" se modifica correctamente', async () => {
      const { wrapper } = build();
      await wrapper.vm.$nextTick();

      await wrapper.setProps({
        inputAlign: 'right'
      });

      // Pintamos el html en snapshot
      expect(wrapper.html()).toMatchSnapshot();

      const input = wrapper.find('input');

      expect(input.attributes().style).toContain('text-align: right')
    });

    it('Renderiza correctamente etiqueta (label)', async () => {
      const { wrapper } = build();
      const text = 'Name'
      await wrapper.vm.$nextTick();

      await wrapper.setProps({
        label: text
      });

      expect(wrapper.vm.label).toBe('Name');
      // Pintamos el html en snapshot
      expect(wrapper.html()).toMatchSnapshot();
      // Localizamos el elemento label
      const label = wrapper.find('label');
      // Comprobamos que label está visible
      expect(label.isVisible()).toBe(true);
      // Comprobamos que tiene dentro el texto esperado (pasado por props)
      expect(label.html()).toContain(text);
      // Por defecto, la anchura es de 90px
      expect(label.attributes().style).toContain('width: 90px');
      // Por defecto, el align es left
      expect(label.attributes().style).toContain('text-align: left');


    });

    it('El label width se modifica correctamente', async () => {
      const { wrapper } = build();
      await wrapper.vm.$nextTick();

      await wrapper.setProps({
        label: 'Name',
        labelWidth: '100px'
      });

      // Pintamos el html en snapshot
      expect(wrapper.html()).toMatchSnapshot();
      // Localizamos el elemento label
      const label = wrapper.find('label');
      // Por defecto, la anchura es de 90px
      expect(label.attributes().style).toContain('width: 100px');
    });

    it('El label align "center" se modifica correctamente', async () => {
      const { wrapper } = build();
      await wrapper.vm.$nextTick();

      await wrapper.setProps({
        label: 'Name',
        labelAlign: 'center'
      });

      // Pintamos el html en snapshot
      expect(wrapper.html()).toMatchSnapshot();
      // Localizamos el elemento label
      const label = wrapper.find('label');
      // Por defecto, la anchura es de 90px
      expect(label.attributes().style).toContain('text-align: center');
    });

    it('El label align "right" se modifica correctamente', async () => {
      const { wrapper } = build();
      await wrapper.vm.$nextTick();

      await wrapper.setProps({
        label: 'Name',
        labelAlign: 'right'
      });

      // Pintamos el html en snapshot
      expect(wrapper.html()).toMatchSnapshot();
      // Localizamos el elemento label
      const label = wrapper.find('label');
      // Por defecto, la anchura es de 90px
      expect(label.attributes().style).toContain('text-align: right');
    });

    it('Renderiza correctamente mensaje de error (errorMessage)', async () => {
      const { wrapper } = build();
      const msg = 'Bad parameters'
      await wrapper.vm.$nextTick();

      await wrapper.setProps({
        errorMessage: msg,
      });

      // Pintamos el html en snapshot
      expect(wrapper.html()).toMatchSnapshot();

      const elem = wrapper.find('div[class*="__error-message"]');
      // El elemento es visible
      expect(elem.isVisible()).toBe(true);
      // El mensaje que muestra el elemento es el esperado
      expect(elem.html()).toContain(msg);
      // Align por defecto del elemento
      expect(elem.attributes().style).toContain('text-align: left');
    });

    it('El error align "center" se modifia correctamente', async() => {
      const { wrapper } = build();
      const msg = 'Bad parameters';

      await wrapper.vm.$nextTick();

      await wrapper.setProps({
        errorMessage: msg,
        errorAlign: 'center'
      });

      const elem = wrapper.find('div[class*="__error-message"]');

      expect(elem.attributes().style).toContain('text-align: center');

    });

    it('El error align "right" se modifia correctamente', async() => {
      const { wrapper } = build();
      const msg = 'Bad parameters';
      await wrapper.vm.$nextTick();

      await wrapper.setProps({
        errorMessage: msg,
        errorAlign: 'right'
      });

      const elem = wrapper.find('div[class*="__error-message"]');

      expect(elem.attributes().style).toContain('text-align: right');

    });

    it('Renderiza correctamente mensaje de info (infoMessage)', async () => {
      const { wrapper } = build();
      const msg = 'Info message'
      await wrapper.vm.$nextTick();

      await wrapper.setProps({
        infoMessage: msg,
      });

      // Pintamos el html en snapshot
      expect(wrapper.html()).toMatchSnapshot();

      const elem = wrapper.find('div[class*="__info-message"]');
      // El elemento es visible
      expect(elem.isVisible()).toBe(true);
      // El mensaje que muestra el elemento es el esperado
      expect(elem.html()).toContain(msg);
      // Align por defecto del elemento
      expect(elem.attributes().style).toContain('text-align: left');
    })

    it('El info align "center" se modifia correctamente', async () => {
      const { wrapper } = build();
      const msg = 'Info message';
      await wrapper.vm.$nextTick();

      await wrapper.setProps({
        infoMessage: msg,
        infoAlign: 'center'
      });

      const elem = wrapper.find('div[class*="__info-message"]');

      expect(elem.attributes().style).toContain('text-align: center');
    });

    it('El info align "right" se modifia correctamente', async () => {
      const { wrapper } = build();
      const msg = 'Info message';
      await wrapper.vm.$nextTick();

      await wrapper.setProps({
        infoMessage: msg,
        infoAlign: 'right'
      });

      const elem = wrapper.find('div[class*="__info-message"]');

      expect(elem.attributes().style).toContain('text-align: right');
    });

    it('Funciona correctamente la opción "disabled"', async () => {
      const { wrapper } = build();
      await wrapper.vm.$nextTick();

      await wrapper.setProps({
        disabled: true
      });

      expect(wrapper.html()).toMatchSnapshot();

      const input = wrapper.find('input');

      expect(input.attributes().disabled).toBe('disabled');


    });

    it('Funciona correctamente la opción "readonly"', async () => {
      const { wrapper } = build();
      await wrapper.vm.$nextTick();

      await wrapper.setProps({
        readonly: true
      });

      expect(wrapper.html()).toMatchSnapshot();

      const input = wrapper.find('input');

      expect(input.attributes().readonly).toBe('readonly');


    });

    it('Renderiza correctamente icono función "clear"', async () => {
      const { wrapper } = build();

      await wrapper.vm.$nextTick();

      await wrapper.setProps({
        clearable: true
      });

      // Tomamos el foco del input
      const input = wrapper.find('input');
      // Simulamos tomar el foco sobre el input
      await fireEvent.focus(input.element);
      // Comprobamos que el componente emite el evento
      expect(wrapper.emitted().focus).toBeTruthy();


      // Comprobamos que se pinta clear button
      const button = wrapper.find('div[class*="__clear"]');
      expect(wrapper.html()).toMatchSnapshot();

      expect(button.isVisible()).toBe(true);

    });

    it('Función "onClear" limpia el input y emite correctamente', async () => {
      const { wrapper } = build();
      const text = 'Text in input';
      await wrapper.vm.$nextTick();

      await wrapper.setProps({
        value: text,
        clearable: true
      });
      // Comprobamos que el valor local se ha actualizado con la entrada de value
      expect(wrapper.vm.localValue).toBe(text);

      // Tomamos el foco del input
      const input = wrapper.find('input');
      // Simulamos tomar el foco sobre el input
      await fireEvent.focus(input.element);
      // Localizamos el botón clear
      const button = wrapper.find('div[class*="__clear"]');
      // Simulamos click sobre el botón
      await button.trigger('click');
      // Comprobamos que se limpia
      expect(wrapper.vm.localValue).toBe('');
      expect(wrapper.emitted().clear).toBeTruthy();
      expect(wrapper.emitted().clear.length).toBe(1);
    });

    it('Comprobamos que se emite el evento "focus"', async () => {
      const { wrapper } = build();
      await wrapper.vm.$nextTick();

      // Tomamos el foco del input
      const input = wrapper.find('input');
      // Simulamos tomar el foco sobre el input
      await fireEvent.focus(input.element);

      expect(wrapper.emitted().focus).toBeTruthy();
      expect(wrapper.emitted().focus.length).toBe(1);
    });

    it('Comprobamos que se emite el evento "blur"', async () => {
      const { wrapper } = build();
      await wrapper.vm.$nextTick();

      // Tomamos el foco del input
      const input = wrapper.find('input');
      // Simulamos tomar el foco sobre el input
      await fireEvent.blur(input.element);

      expect(wrapper.emitted().blur).toBeTruthy();
      expect(wrapper.emitted().blur.length).toBe(1);
    });

    it('Comprobamos que se emite el evento "input"', async () => {
      const { wrapper } = build();
      await wrapper.vm.$nextTick();

      // Tomamos el foco del input
      const input = wrapper.find('input');
      // Simulamos tomar el foco sobre el input
      await fireEvent.input(input.element);

      expect(wrapper.emitted().input).toBeTruthy();
      expect(wrapper.emitted().input.length).toBe(1);
    });

    it('Comprobamos que se emite el evento "keyup"', async () => {
      const { wrapper } = build();
      await wrapper.vm.$nextTick();

      // Tomamos el foco del input
      const input = wrapper.find('input');
      // Simulamos tomar el foco sobre el input
      await fireEvent.keyUp(input.element, {key: 'A', charCode: 65});

      expect(wrapper.emitted().keyup).toBeTruthy();
      expect(wrapper.emitted().keyup.length).toBe(1);
    });

    it('Icono izquierdo se pinta correctamente y lanza evento al clickar en él', async () => {
      const { wrapper } = build();
      await wrapper.vm.$nextTick();

      await wrapper.setProps({
        leftIcon: 'user'
      });

      expect(wrapper.html()).toMatchSnapshot();
      // Comprobamos que se renderiza el icono
      const iconWrapper = wrapper.find('div[class*="__left-icon"]');

      expect(iconWrapper.isVisible()).toBe(true);
      // Comprobamos que al hacer click sobre él se lanza el evento
      await iconWrapper.trigger('click');

      expect(wrapper.emitted()['click-left-icon']).toBeTruthy();
      expect(wrapper.emitted()['click-left-icon'].length).toBe(1);
    })

    it('Icono derecho se pinta correctamente y lanza evento al clickar en él', async () => {
      const { wrapper } = build();
      await wrapper.vm.$nextTick();

      await wrapper.setProps({
        rightIcon: 'user'
      });

      expect(wrapper.html()).toMatchSnapshot();
      // Comprobamos que se renderiza el icono
      const iconWrapper = wrapper.find('div[class*="__right-icon"]');

      expect(iconWrapper.isVisible()).toBe(true);
      // Comprobamos que al hacer click sobre él se lanza el evento
      await iconWrapper.trigger('click');

      expect(wrapper.emitted()['click-right-icon']).toBeTruthy();
      expect(wrapper.emitted()['click-right-icon'].length).toBe(1);
    })


  });

  describe('Input type="textarea"', () => {
    const build = () => {
      const wrapper = shallowMount(Input, {
        localVue,
        propsData: {
          type: 'textarea'
        }
      })

      return {
        wrapper,
      }
    }
    it('Renderiza correctamente "textarea"', async () => {
      const {wrapper} = build();
      await wrapper.vm.$nextTick();

      expect(wrapper.html()).toMatchSnapshot();

      const textarea = wrapper.find('textarea');

      expect(textarea.isVisible()).toBe(true)
      // Comprobamos que no se muestra input


    });

    it('Comprobamos que no se renderiza el elemento <input>', async () => {
      const {wrapper} = build();
      await wrapper.vm.$nextTick();

      const input = wrapper.find('input');
      expect(input.exists()).toBe(false);
    })

    it('El textarea align "center" se modifica correctamente', async () => {
      const { wrapper } = build();
      await wrapper.vm.$nextTick();

      await wrapper.setProps({
        inputAlign: 'center'
      });

      // Pintamos el html en snapshot
      expect(wrapper.html()).toMatchSnapshot();

      const input = wrapper.find('textarea');

      expect(input.attributes().style).toContain('text-align: center')
    });

    it('El textarea align "right" se modifica correctamente', async () => {
      const { wrapper } = build();
      await wrapper.vm.$nextTick();

      await wrapper.setProps({
        inputAlign: 'right'
      });

      // Pintamos el html en snapshot
      expect(wrapper.html()).toMatchSnapshot();

      const input = wrapper.find('textarea');

      expect(input.attributes().style).toContain('text-align: right')
    });

    it('Funciona correctamente la opción "disabled"', async () => {
      const { wrapper } = build();
      await wrapper.vm.$nextTick();

      await wrapper.setProps({
        disabled: true
      });

      expect(wrapper.html()).toMatchSnapshot();

      const input = wrapper.find('textarea');

      expect(input.attributes().disabled).toBe('disabled');
    });

    it('Funciona correctamente la opción "readonly"', async () => {
      const { wrapper } = build();
      await wrapper.vm.$nextTick();

      await wrapper.setProps({
        readonly: true,
      });

      expect(wrapper.html()).toMatchSnapshot();

      const input = wrapper.find('textarea');

      expect(input.attributes().readonly).toBe('readonly');
    });

    it('Comprobamos que se emite el evento "focus"', async () => {
      const { wrapper } = build();
      await wrapper.vm.$nextTick();

      // Tomamos el foco del input
      const input = wrapper.find('textarea');
      // Simulamos tomar el foco sobre el input
      await fireEvent.focus(input.element);

      expect(wrapper.emitted().focus).toBeTruthy();
      expect(wrapper.emitted().focus.length).toBe(1);
    });

    it('Comprobamos que se emite el evento "blur"', async () => {
      const { wrapper } = build();
      await wrapper.vm.$nextTick();

      // Tomamos el foco del input
      const input = wrapper.find('textarea');
      // Simulamos tomar el foco sobre el input
      await fireEvent.blur(input.element);

      expect(wrapper.emitted().blur).toBeTruthy();
      expect(wrapper.emitted().blur.length).toBe(1);
    });

    it('Comprobamos que se emite el evento "input"', async () => {
      const { wrapper } = build();
      await wrapper.vm.$nextTick();

      // Tomamos el foco del input
      const input = wrapper.find('textarea');
      // Simulamos tomar el foco sobre el input
      await fireEvent.input(input.element);

      expect(wrapper.emitted().input).toBeTruthy();
      expect(wrapper.emitted().input.length).toBe(1);
    });

    it('Comprobamos que se emite el evento "keyup"', async () => {
      const { wrapper } = build();
      await wrapper.vm.$nextTick();

      // Tomamos el foco del input
      const input = wrapper.find('textarea');
      // Simulamos tomar el foco sobre el input
      await fireEvent.keyUp(input.element, {key: 'A', charCode: 65});

      expect(wrapper.emitted().keyup).toBeTruthy();
      expect(wrapper.emitted().keyup.length).toBe(1);
    });
  });

  describe('Input type="password"', () => {

    const build = () => {
      const wrapper = shallowMount(Input, {
        localVue,
        propsData: {
          type: 'password'
        }
      })

      return {
        wrapper,
      }
    }

    it('Se aplica correctamente el tipo "password" en el input', async () => {
      const { wrapper } = build();
      wrapper.vm.$nextTick();

      expect(wrapper.html()).toMatchSnapshot();

      const input = wrapper.find('input');

      expect(input.attributes().type).toBe('password');

    });

    it('Renderiza correctamente icono ocultar password en input (password)', async () => {
      const { wrapper } = build();
      wrapper.vm.$nextTick();

      expect(wrapper.find('div[class*="__password"').isVisible()).toBe(true);
      expect(wrapper.vm.iconPassword).toBe('password-hide');
    });

    it('Mostrar y ocultar password funciona correctamente', async () => {
      const { wrapper } = build();
      wrapper.vm.$nextTick();

      const input = wrapper.find('input');

      expect(input.attributes().type).toBe('password');

      // Tomamos el botón de mostrar ocultar password
      const toggleButton = wrapper.find('div[class*="__password"')
      // Hacemos click en el botón
      await toggleButton.trigger('click');
      // expect(wrapper.vm.onTogglePassword).toHaveBeenCalled(); // NO FUNCIONA
      // Comprobamos el que el input ahora tipo text y cambia el icono de mostrar password
      expect(input.attributes().type).toBe('text');
      expect(wrapper.vm.iconPassword).toBe('password');

      // Volvemos a ocultar el password
      await toggleButton.trigger('click');

      // Comprobamos el que el input ahora tipo password y cambia el icono de mostrar password-hide
      expect(input.attributes().type).toBe('password');
      expect(wrapper.vm.iconPassword).toBe('password-hide');
    });
  });

  describe('Input type="number"', () => {

    const build = () => {
      const wrapper = shallowMount(Input, {
        localVue,
        propsData: {
          type: 'number'
        }
      })

      return {
        wrapper,
      }
    }

     it('Comprobar que se aplica el tipo "number" correctamente', () => {
      const { wrapper } = build();
      wrapper.vm.$nextTick();

      expect(wrapper.html()).toMatchSnapshot();

      expect(wrapper.find('input').attributes().type).toBe('number');
    })

  });



})
