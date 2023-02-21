import { shallowMount, createLocalVue } from '@vue/test-utils';
// Importamos librerías de estilos e iconos
import SvgIcon from 'vue-svgicon'
import AzSectionInfo from 'Core/components/SectionInfo/SectionInfo.component.vue'
import GroupButton from './GroupButton.component.vue';

const localVue = createLocalVue()
localVue.use(SvgIcon, {
  tagName: 'az-icon',
  classPrefix: 'az',
})

localVue.component('AzSectionInfo', AzSectionInfo)

describe('GroupButton.vue', () => {
  const build = () => {
    const wrapper = shallowMount(GroupButton, {
      localVue,
    })

    return {
      wrapper,
    }
  }

  it('Comprueba renderizado del componente GroupButton con snapshot', () => {
    const { wrapper } = build()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('Comprueba que la propiedad available es true por defecto y existe la clase groupButtonComponent', async () => {
    const { wrapper } = build();
    // Comprobamos que se tiene las props por defecto
    expect(wrapper.vm.available).toStrictEqual(true);
    expect(wrapper.vm.label).toStrictEqual('');
    // Comprobamos que se ha añadido la clase shadow-3
    expect(wrapper.find('.groupButtonComponent').isVisible()).toBe(true);
  });

  it('Comprueba la propiedad label con valor y que existe el texto', async () => {
    const { wrapper } = build();
    // Si actualizamos la propiedad boxsadow a false, la clase shadow-3 no existe
    await wrapper.setProps({
      label: 'myTitle',
    });
    // Comprobamos que se tiene las props por defecto
    expect(wrapper.vm.label).toStrictEqual('myTitle');
    // Comprobamos que se ha añadido el texto myTitle
    expect(wrapper.find('az-section-info-stub').attributes().title).toBe('myTitle');
  });

  it('Comprueba la propiedad info con valor y que existe el texto', async () => {
    const { wrapper } = build();
    // Si actualizamos la propiedad boxsadow a false, la clase shadow-3 no existe
    await wrapper.setProps({
      info: 'myTitle',
    });
    // Comprobamos que se tiene las props por defecto
    expect(wrapper.vm.info).toStrictEqual('myTitle');
    // Comprobamos que se ha añadido el texto myTitle
    expect(wrapper.find('az-section-info-stub').attributes().info).toBe('myTitle');
  });

  it('Comprueba la propiedad values con modos disponibles', async () => {
    const { wrapper } = build();
    // Si actualizamos la propiedad values, la clase .groupButtons__item existe
    await wrapper.setProps({
      values: ['cold', 'heat', 'auto'],
    });
    // Comprobamos que se tiene la prop values
    expect(wrapper.vm.values).toStrictEqual(['cold', 'heat', 'auto']);
    // Comprobamos que se ha añadido los modos disponibles
    expect(wrapper.find('.groupButtons__item').exists()).toBe(true);
  });

  it('Comprueba la propiedad values con modos e iconos', async () => {
    const { wrapper } = build();
    // Si actualizamos la propiedad values, la clase .groupButtons__item existe
    await wrapper.setProps({
      values: ['cold', 'heat', 'auto'],
    });
    await wrapper.vm.$nextTick()
    // Comprobamos que se tiene la prop values
    expect(wrapper.vm.values).toStrictEqual(['cold', 'heat', 'auto']);
    // Comprobamos que se ha añadido los modos disponibles
    expect(wrapper.find('.groupButtons__item').exists()).toBe(true);
    // Comprobamos que se ha añadido el modo el texto cold
    expect(wrapper.find('.GroupButton__item__text').text()).toBe('cold');
  });


  it('Comprueba que cuando se clica en cold se emite input cold', async () => {
    const { wrapper } = build();
    // Actualizamos las propiedades necesarias, para clicar modo cold y comprobar input emitido
    await wrapper.setProps({
      values: ['cold', 'heat', 'auto'],
      hasIcons: true,
    });
    await wrapper.vm.$nextTick()
    await wrapper.find('.GroupButton__item__icon').trigger('click')
    // Comprobamos que se ha emitido el evento input
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input.length).toBe(1);
    expect(wrapper.emitted().input[0]).toEqual(['cold'])
  });

  it('Comprueba que cuando se clica en heat se emite click heat', async () => {
    const { wrapper } = build();
    // Actualizamos las propiedades necesarias, para clicar modo auto y comprobar click emitido
    await wrapper.setProps({
      values: ['cold', 'heat', 'auto'],
      hasIcons: true,
      // value: 2,
    });
    await wrapper.vm.$nextTick()
    await wrapper.findAll('az-icon-stub').at(1).trigger('click')
    // Comprobamos que se ha emitido el evento click
    expect(wrapper.emitted().click).toBeTruthy();
    expect(wrapper.emitted().click.length).toBe(1);
    expect(wrapper.emitted().click[0]).toEqual(['heat'])
  });

  it('Comprueba que cuando se clica en auto se emite change auto', async () => {
    const { wrapper } = build();
    // Actualizamos las propiedades necesarias, para clicar modo auto y comprobar change emitido
    await wrapper.setProps({
      values: ['cold', 'heat', 'auto'],
      hasIcons: true,
    });
    await wrapper.vm.$nextTick()
    await wrapper.findAll('az-icon-stub').at(2).trigger('click')
    // Comprobamos que se ha emitido el evento change
    expect(wrapper.emitted().change).toBeTruthy();
    expect(wrapper.emitted().change.length).toBe(1);
    expect(wrapper.emitted().change[0]).toEqual(['auto'])
  });
})
