import { shallowMount, createLocalVue } from '@vue/test-utils';
// Importamos librerías de estilos e iconos
import SvgIcon from 'vue-svgicon'
import Pincode from './Pincode.component.vue';

const localVue = createLocalVue()
localVue.use(SvgIcon, {
  tagName: 'az-icon',
  classPrefix: 'az',
})

describe('PinCode.vue', () => {
  const build = () => {
    const wrapper = shallowMount(Pincode, {
      localVue,
    })

    return {
      wrapper,
    }
  }

  it('Comprueba renderizado del componente Pincode con snapshot', () => {
    const { wrapper } = build()
    expect(wrapper.html()).toMatchSnapshot()

  })
});
