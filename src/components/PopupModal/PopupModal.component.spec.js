import { mount, createLocalVue } from '@vue/test-utils';
// Importamos librerías de estilos e iconos
import SvgIcon from 'vue-svgicon'
import PopupModal from './PopupModal.component.vue';

const localVue = createLocalVue()
localVue.use(SvgIcon, {
  tagName: 'az-icon',
  classPrefix: 'az',
})

describe('PopupModal.vue', () => {
  const build = () => {
    const wrapper = mount(PopupModal, {
      localVue,
    })

    return {
      wrapper,
    }
  }

  it('Comprueba renderizado del componente PopupModal con snapshot', () => {
    const { wrapper } = build()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('Comprueba que el título se renderiza cuando se asigna la prop', async () => {
    const { wrapper } = build()
    wrapper.setProps({
      title: 'Warnings',
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.popupModal__title').text()).toBe('Warnings')
  })

  it('Comprueba que el subtítulo se renderiza cuando se asigna la prop', async () => {
    const { wrapper } = build()
    wrapper.setProps({
      subtitle: 'MySubtitle',
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.popupModal__subtitle').text()).toBe('MySubtitle')
  })

  it('Comprueba que el mensaje se renderiza cuando se asigna la prop', async () => {
    const { wrapper } = build()
    wrapper.setProps({
      message: 'MyMessage',
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.popupModal__message').text()).toBe('MyMessage')
  })

  it('Comprueba que dos mensajes se renderizan cuando se asignan las props', async () => {
    const { wrapper } = build()
    wrapper.setProps({
      message: 'Message',
      otherMessage: 'OtherMessage',
    })
    await wrapper.vm.$nextTick()
    const messages = wrapper.findAll('.popupModal__message')
    expect(messages.length).toBe(2)
    expect(messages.at(0).text()).toBe('Message')
    expect(messages.at(1).text()).toBe('OtherMessage')
  })

  it('Comprueba que no se renderiza los botones por defecto si no se asignan las props', async () => {
    const { wrapper } = build()
    wrapper.setProps({
      message: 'Message',
      otherMessage: 'OtherMessage',
    })
    await wrapper.vm.$nextTick()
    const buttons = wrapper.findAll('.popupModal__buttons')
    expect(buttons.length).toBe(0)
  })

  it('Comprueba que los dos botones se renderizan cuando se asignan las props', async () => {
    const { wrapper } = build()
    wrapper.setProps({
      message: 'Message',
      otherMessage: 'OtherMessage',
      buttons: true,
    })
    await wrapper.vm.$nextTick()
    const buttons = wrapper.findAll('.popupModal__button')
    expect(buttons.length).toBe(2)
  })

  it('Comprueba que los dos textos de los botones se renderizan cuando se asignan las props', async () => {
    const { wrapper } = build()
    wrapper.setProps({
      message: 'Message',
      otherMessage: 'OtherMessage',
      buttons: true,
      acceptBtn: true,
      cancelBtn: true,
      acceptBtnText: 'Aceptar',
      cancelBtnText: 'Cancelar',
    })
    await wrapper.vm.$nextTick()
    const buttons = wrapper.findAll('.popupModal__button')
    expect(buttons.length).toBe(2)
    expect(buttons.at(0).text()).toBe('Cancelar')
    expect(buttons.at(1).text()).toBe('Aceptar')
  })

  it('Comprueba que solo se renderiza el texto del botón aceptar cuando se asignan las props', async () => {
    const { wrapper } = build()
    wrapper.setProps({
      message: 'Message',
      otherMessage: 'OtherMessage',
      buttons: true,
      acceptBtn: true,
      cancelBtn: false,
      acceptBtnText: 'Aceptar',
    })
    await wrapper.vm.$nextTick()
    const buttons = wrapper.findAll('.popupModal__button')
    expect(buttons.length).toBe(1)
    expect(buttons.at(0).text()).toBe('Aceptar')
  })

  it('Comprueba que solo se renderiza el texto del botón cancelar cuando se asignan las props', async () => {
    const { wrapper } = build()
    wrapper.setProps({
      message: 'Message',
      otherMessage: 'OtherMessage',
      buttons: true,
      acceptBtn: false,
      cancelBtn: true,
      cancelBtnText: 'Cancelar',
    })
    await wrapper.vm.$nextTick()
    const buttons = wrapper.findAll('.popupModal__button--cancel')
    await buttons.trigger('click')
    // Compruebo que existe el botón con el texto
    expect(buttons.length).toBe(1)
    expect(buttons.at(0).text()).toBe('Cancelar')
  })

  it('Comprueba que emite cuando hay info', async () => {
    const { wrapper } = build()
    const item = [{title: 'MyTitle', info: 'warning'}]
    wrapper.setProps({
      title: 'Warnings',
      subtitle: 'MySubtitle',
      listInfo: item,
    })
    await wrapper.vm.$nextTick()
    wrapper.vm.showItemInfo(item)
    expect(wrapper.emitted().showInfo).toBeTruthy()
    expect(wrapper.emitted().showInfo.length).toBe(1)
    expect(wrapper.emitted().showInfo[0]).toEqual([item])
  })

  it('Comprueba que emite cuando se cancela', async () => {
    const { wrapper } = build()
    wrapper.setProps({
      message: 'Message',
      otherMessage: 'OtherMessage',
      buttons: true,
      acceptBtn: false,
      cancelBtn: true,
      cancelBtnText: 'Cancelar',
    })
    await wrapper.vm.$nextTick()
    const buttons = wrapper.findAll('.popupModal__button--cancel')
    await buttons.trigger('click')
    // Compruebo que emite al ser clicado
    expect(wrapper.emitted().cancel).toBeTruthy()
    expect(wrapper.emitted().cancel.length).toBe(1)
    expect(wrapper.emitted().cancel[0]).toEqual([])
  })

  it('Comprueba que emite cuando se cierra', async () => {
    const { wrapper } = build()
    wrapper.setProps({
      message: 'Message',
      otherMessage: 'OtherMessage',
      buttons: true,
    })
    await wrapper.vm.$nextTick()
    const buttons = wrapper.findAll('.popupModal')
    await buttons.trigger('click')
    // Compruebo que emite al ser clicado
    expect(wrapper.emitted().close).toBeTruthy()
    expect(wrapper.emitted().close.length).toBe(1)
    expect(wrapper.emitted().close[0]).toEqual([])
  })

  it('Comprueba que emite cuando se acepta', async () => {
    const { wrapper } = build()
    wrapper.setProps({
      message: 'Message',
      otherMessage: 'OtherMessage',
      buttons: true,
      acceptBtn: true,
    })
    await wrapper.vm.$nextTick()
    const buttons = wrapper.findAll('.popupModal__button')
    await buttons.trigger('click')
    // Compruebo que emite al ser clicado
    expect(wrapper.emitted().accept).toBeTruthy()
    expect(wrapper.emitted().accept.length).toBe(1)
    expect(wrapper.emitted().accept[0]).toEqual([])
  })

  it('Comprueba que emite cuando el botón de texto es una función', async () => {
    const { wrapper } = build()
    const returned = await wrapper.vm.getBtnText('function')
    expect(returned).toBe('function')
  })
});
