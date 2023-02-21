import { shallowMount, createLocalVue } from '@vue/test-utils';
// Importamos librerías de estilos e iconos
import SvgIcon from 'vue-svgicon'
import Step from './Step.component.vue';

const localVue = createLocalVue()
localVue.use(SvgIcon, {
  tagName: 'az-icon',
  classPrefix: 'az',
})

describe('Step.vue', () => {
  const build = () => {
    const wrapper = shallowMount(Step, {
      localVue,
    })

    return {
      wrapper,
    }
  }

  it('Comprueba renderizado del componente Step con props por defecto con snapshot', () => {
    const { wrapper } = build()
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.vm.title).toBe('Step')
    expect(wrapper.vm.isActive).toBe(false)
    expect(wrapper.vm.hasError).toBe(false)
    expect(wrapper.vm.isSuccess).toBe(false)
    expect(wrapper.vm.icon).toBe('save')
  })

  it('Comprueba que se actualizan las props cuando se asignan las props', async () => {
    const { wrapper } = build()
    wrapper.setProps({
      title: 'MyStep',
      order: '1',
      isActive: true,
      isSuccess: true,
      icon: 'check',
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.title).toBe('MyStep')
    expect(wrapper.vm.order).toBe('1')
    expect(wrapper.vm.isActive).toBe(true)
    expect(wrapper.vm.isSuccess).toBe(true)
    expect(wrapper.vm.icon).toBe('check')
  });
});
