import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueScrollPicker from 'vue-scroll-picker'
import Timer from './Timer.component.vue';


const localVue = createLocalVue();
localVue.use(VueScrollPicker);

describe('Timer.component.vue', () => {

  const build = () => {
    const wrapper = shallowMount(Timer, {
      localVue,
      propsData: {
        value: 120
      }
    })

    return {
      wrapper
    }
  }

  it('Renderizado del componente con snapshot', () => {
    const { wrapper } = build();

    wrapper.vm.$nextTick();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Comprobar que el valor de los scroll pickers se parsea correctamente', () => {
    const { wrapper } = build();

    wrapper.vm.$nextTick();
    // Por defecto value es 120 min. Equivale a 2h y 0m
    const hoursPicker = wrapper.find('.hours-picker');
    const minutesPicker = wrapper.find('.minutes-picker');

    expect(hoursPicker.attributes().value).toBe("2");
    expect(minutesPicker.attributes().value).toBe("0");

  });

  it('Comprobar que no se muestra titulo cuando no se recibe', () => {
    const {wrapper} = build();

    wrapper.vm.$nextTick();

    const title = wrapper.find('.timerModal__title');

    expect(title.exists()).toBe(false)
  });

  it('Comprobar que se muestra titulo cuando se recibe la prop', () => {
    const wrapper = shallowMount(Timer, {
      localVue,
      propsData: {
        value: 120,
        title: 'Temporizador'
      }
    })

    wrapper.vm.$nextTick();

    const title = wrapper.find('.timerModal__title');

    expect(wrapper.html()).toMatchSnapshot();

    expect(title.isVisible()).toBe(true);
    expect(title.text()).toStrictEqual('Temporizador');


  });

  it('Comprobar que no se muestra message cuando no se recibe', () => {
    const {wrapper} = build();

    wrapper.vm.$nextTick();

    const message = wrapper.find('.timerModal__message');

    expect(message.exists()).toBe(false)
  });

  it('Comprobar que se muestra message cuando se recibe la prop', () => {
    const wrapper = shallowMount(Timer, {
      localVue,
      propsData: {
        value: 120,
        message: 'Lorem ipsum dolor sit amet'
      }
    })

    wrapper.vm.$nextTick();

    const message = wrapper.find('.timerModal__message');

    expect(wrapper.html()).toMatchSnapshot();

    expect(message.isVisible()).toBe(true);
    expect(message.text()).toStrictEqual('Lorem ipsum dolor sit amet');

  });

  it('Comprobar que no se muestran botones de confirmación si no se recibe', () => {
    const {wrapper} = build();

    wrapper.vm.$nextTick();

    const buttons = wrapper.find('.timerModal__buttons');

    expect(buttons.exists()).toBe(false)
  });

  it('Comprobar que se muestran botones de confirmación si se recibe la prop', () => {
    const wrapper = shallowMount(Timer, {
      localVue,
      propsData: {
        value: 120,
        buttons: true
      }
    });

    wrapper.vm.$nextTick();

    const buttons = wrapper.find('.timerModal__buttons');

    expect(wrapper.html()).toMatchSnapshot();

    expect(buttons.isVisible()).toBe(true);
  })
});
