import { shallowMount, createLocalVue } from '@vue/test-utils';
// Importamos librerías de estilos e iconos
import SvgIcon from 'vue-svgicon'
import InputNumber from './InputNumber.component.vue';

const localVue = createLocalVue()
localVue.use(SvgIcon, {
  tagName: 'az-icon',
  classPrefix: 'az',
})

describe('InputNumber.vue', () => {
  const build = () => {
    const wrapper = shallowMount(InputNumber, {
      localVue,
      propsData: {
        value: 1,
        valueList: [0,1,2,3,4,5]
      }
    })

    return {
      wrapper,
    }
  }

  it('Comprueba renderizado del componente InputNumber con snapshot', () => {
    const { wrapper } = build()
    expect(wrapper.html()).toMatchSnapshot()

  })

  it('Comprueba que emite el evento click al incrementar', async () => {
    const { wrapper } = build()

    await wrapper.vm.increment()
    expect(wrapper.emitted().click).toBeTruthy()
    expect(wrapper.emitted().click.length).toBe(1)
    expect(wrapper.emitted().click[0]).toEqual([2,])
  });

  it('Comprueba que emite el evento click al decrementar', async () => {
    const { wrapper } = build()

    await wrapper.vm.decrement()
    expect(wrapper.emitted().click).toBeTruthy()
    expect(wrapper.emitted().click.length).toBe(1)
    expect(wrapper.emitted().click[0]).toEqual([0,])
  });
})
