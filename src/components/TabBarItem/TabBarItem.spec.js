import { shallowMount, createLocalVue } from '@vue/test-utils';
// Importamos librerías de estilos e iconos
import SvgIcon from 'vue-svgicon'
import VueRouter from 'vue-router'
import AirtoolsBLERoutes from 'Fixtures/AirtoolsBLE.routes';
import TabBar from 'Core/components/TabBar/TabBar.vue';
import TabBarItem from './TabBarItem.vue';

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(SvgIcon, {
  tagName: 'az-icon',
  classPrefix: 'az',
})

const router = new VueRouter({
  routes: AirtoolsBLERoutes
})

describe('TabBarItem.vue', () => {

  const build = () => {
    const wrapper = shallowMount(TabBarItem, {
      localVue,
      parentComponent: TabBar,
      router,
      propsData: {
        value: true,
        icon: 'save',
        name: 'brand',
        dot: true,
        info: 'MyInfo',
        to: { name: 'airtools' },
        active: true,
      },
      computed: {
        tabBarItemStyle: () => jest.fn()
      },
      mocks: {
        $parent: {
          onChange: () => jest.fn()
        }
      }
    })

    return {
      wrapper,
    }
  }

  it('Comprueba renderizado del componente TabBarItem con snapshot', () => {
    const { wrapper } = build()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('Comprueba que se actualizan las props cuando se asignan las props', async () => {
    const { wrapper } = build()

    expect(wrapper.vm.icon).toBe('save')
    expect(wrapper.vm.name).toBe('brand')
    expect(wrapper.vm.dot).toBe(true)
    expect(wrapper.vm.info).toBe('MyInfo')
    expect(wrapper.vm.to).toEqual({ name: 'airtools' })
  });

  it('Comprueba que emite el evento change cuando se clica', async () => {
    const { wrapper } = build()

    const e = {
      event: {
        type: 'change'
      }
    }
    await wrapper.vm.onKeyup(e)
    expect(wrapper.emitted().keyup).toBeTruthy()
    expect(wrapper.emitted().keyup.length).toBe(1)
    expect(wrapper.emitted().keyup[0]).toEqual([e])
  });

  it('Comprueba que emite el evento click cuando se clica', async () => {
    const { wrapper } = build()
    await wrapper.vm.$nextTick()

    const e = {
      event: {
        type: 'click'
      }
    }

    await wrapper.vm.onClick(e)
    expect(wrapper.emitted().click).toBeTruthy()
    expect(wrapper.emitted().click.length).toBe(1)
    expect(wrapper.emitted().click[0]).toEqual([e])
  });
})
