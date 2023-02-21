import { shallowMount, createLocalVue } from '@vue/test-utils';
// Importamos librerías de estilos e iconos
import SvgIcon from 'vue-svgicon'
import WeatherIcon from './WeatherIcon.component.vue';

const localVue = createLocalVue()
localVue.use(SvgIcon, {
  tagName: 'az-icon',
  classPrefix: 'az',
})

describe('WeatherIcon.vue', () => {
  const build = () => {
    const wrapper = shallowMount(WeatherIcon, {
      localVue,
      propsData: {
        sunriseToday: '2021-12-01T07:11:51.000Z',
        sunsetToday: '2021-12-01T17:02:04.000Z',
        sunriseTomorrow: '2021-12-02T07:12:46.000Z',
        sunsetTomorrow: '2021-12-02T17:01:54.000Z',
      }
    })

    return {
      wrapper,
    }
  }


  it('Comprueba renderizado del componente WeatherIcon con snapshot', async() => {
    const { wrapper } = build();
    await wrapper.setProps({
      code: 800
    });

    expect(wrapper.html()).toMatchSnapshot()

  })

  it('Si no recibe un código no renderiza nada', () => {
    const { wrapper } = build();

    expect(wrapper.isVisible()).toBe(false);
  })

  it('Si recibe "code" renderiza el elemento', async () => {
    const { wrapper } = build();

    await wrapper.setProps({
      code: 800
    });

    expect(wrapper.classes()).toContain('weatherIcon')
  });

  it('Si renderiza elemento dibuja el icono', async () => {
    const { wrapper } = build();

    await wrapper.setProps({
      code: 800
    });
    // Se pinta <img> con el tamaño por defecto
    expect(wrapper.find('.weatherIcon').html()).toContain('<img width="25px" src=""></div>');

    await wrapper.setProps({
      size: '40px'
    });

    // Se pinta <img> con el tamaño pasado como prop
    expect(wrapper.find('.weatherIcon').html()).toContain('<img width="40px" src=""></div>');
  })

  it('Si recibe un código inválido no pinta la imagen', async () => {
    const { wrapper } = build();

    await wrapper.setProps({
      code: 10
    });

    // Se pinta <img> con el tamaño por defecto
    expect(wrapper.find('.weatherIcon').html()).not.toContain('<img width="25px" src=""></div>');
  });
});
