import { shallowMount, createLocalVue } from '@vue/test-utils';
// Importamos librerías de estilos e iconos
import SvgIcon from 'vue-svgicon'
import SectionInfo from './SectionInfo.component.vue';

const localVue = createLocalVue()
localVue.use(SvgIcon, {
  tagName: 'az-icon',
  classPrefix: 'az',
})

describe('SectionInfo.vue', () => {
  const build = () => {
    const wrapper = shallowMount(SectionInfo, {
      localVue,
    })

    return {
      wrapper,
    }
  }

  it('Comprueba renderizado del componente SectionInfo con snapshot', () => {
    const { wrapper } = build()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('Comprueba que se actualizan las props cuando se asignan las props', async () => {
    const { wrapper } = build()
    wrapper.setProps({
      title: 'MyTitle',
      info: 'Info',
      mode: 'brand',
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.title).toBe('MyTitle')
    expect(wrapper.vm.info).toBe('Info')
    expect(wrapper.vm.mode).toBe('brand')
  });

  it('Comprueba que se renderiza las props cuando se asignan las props', async () => {
    const { wrapper } = build()
    wrapper.setProps({
      title: 'MyTitle',
      info: 'Info',
      mode: 'brand',
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.sectionInfo__title').text()).toBe('MyTitle')
    expect(wrapper.find('.sectionInfo__info--brand').exists()).toBe(true)
    expect(wrapper.find('.sectionInfo__info--brand').text()).toBe('Info')
    expect(wrapper.html()).toMatchSnapshot()
  });

});
