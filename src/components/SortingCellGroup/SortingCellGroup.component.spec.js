import { shallowMount, createLocalVue } from '@vue/test-utils';
// Importamos librerías de estilos e iconos
import SvgIcon from 'vue-svgicon'
import SortingCellGroup from './SortingCellGroup.component.vue';

const localVue = createLocalVue()
localVue.use(SvgIcon, {
  tagName: 'az-icon',
  classPrefix: 'az',
})

describe('SortingCellGroup.vue', () => {
  const build = () => {
    const wrapper = shallowMount(SortingCellGroup, {
      localVue,
    })

    return {
      wrapper,
    }
  }

  it('Comprueba renderizado del componente SortingCellGroup con snapshot', () => {
    const { wrapper } = build()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('Comprueba que emite el evento focus cuando se activa el modo edición', async () => {
    const { wrapper } = build()

    await wrapper.vm.activeEditMode()
    expect(wrapper.emitted().focus).toBeTruthy()
    expect(wrapper.emitted().focus.length).toBe(1)
    expect(wrapper.emitted().focus[0]).toEqual([])
  });

  it('Comprueba que emite el evento save cuando se ejecuta saveData', async () => {
    const { wrapper } = build()

    const data = {name: 'Rafa'}
    await wrapper.vm.saveData(data)
    expect(wrapper.emitted().save).toBeTruthy()
    expect(wrapper.emitted().save.length).toBe(1)
    expect(wrapper.emitted().save[0]).toEqual([data])
  });
});
