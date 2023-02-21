import { mount, createLocalVue } from '@vue/test-utils';
// Importamos librerías de estilos e iconos
import SvgIcon from 'vue-svgicon'
import Avatar from './Avatar.vue';

const localVue = createLocalVue()
localVue.use(SvgIcon, {
  tagName: 'az-icon',
  classPrefix: 'az',
})

describe('Avatar.vue', () => {
  const build = () => {
    const wrapper = mount(Avatar, {
      localVue
    })

    return {
      wrapper,
    }
  }

  it('Renderiza correctamente el compenente avatar con estilos por defecto',async () => {
    const { wrapper } = build();
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toMatchSnapshot()

    const avatar = wrapper.find('.az-avatar');

    // Contiene un elemento avatar
    expect(avatar.isVisible()).toBe(true);
    // Por defecto contiene los estilo del avatar
    expect(avatar.attributes().style).toContain('background-color: rgb(255, 255, 255); width: 5rem; height: 5rem; line-height: 5rem; font-size: 5rem;');

    const name = wrapper.find('.az-avatar__initials');
    const image = wrapper.find('.az-avatar__image');
    // No contiene la clase de las iniciales del nombre
    expect(name.exists()).toBe(false);
    // No contiene la clase de la imagen
    expect(image.exists()).toBe(false);
    // No es link
    expect(wrapper.find('.az-avatar--link').exists()).toBe(false)
  });
});

describe('Avatar.vue', () => {
  const build = () => {
    const wrapper = mount(Avatar, {
      localVue,
      propsData: {
        src: '@/assets/airzoneWhite.svg',
        name: 'Rafa Montes',
        size: '7rem',
        backgroundColor: '#000',
        textColor: 'var(--color-gray5)',
        isLink: true,
      }
    })

    return {
      wrapper,
    }
  }

  it('Renderiza correctamente el compenente avatar con estilos por defecto',async () => {
    const { wrapper } = build();
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toMatchSnapshot()
    const avatar = wrapper.find('.az-avatar');
    const name = wrapper.find('.az-avatar__initials');
    const image = wrapper.find('.az-avatar__image');
    // Contiene un elemento avatar
    expect(avatar.isVisible()).toBe(true);
    // Los estilos pasados por props se renderizan correctamente
    expect(avatar.attributes().style).toContain('background-color: rgb(0, 0, 0); width: 7rem; height: 7rem; line-height: 7rem; font-size: 7rem;');
    // Contiene la clase y las iniciales del nombre
    expect(name.isVisible()).toBe(true);
    expect(name.text()).toBe('RM');
    // Contiene la clase y los estilos de la imagen
    expect(image.isVisible()).toBe(true);
    expect(image.attributes().style).toContain('background-image: url(@/assets/airzoneWhite.svg);');
    // Es link
    expect(wrapper.find('.az-avatar--link').exists()).toBe(true)
  });

  it('Comprueba que emite el evento clic', async () => {
    const { wrapper } = build()
    await wrapper.vm.$nextTick()
    const e = { currentTarget: true, target: true }
    await wrapper.vm.onClick(e)
    expect(wrapper.emitted().clic).toBeTruthy()
    expect(wrapper.emitted().clic.length).toBe(1)
    expect(wrapper.emitted().clic[0]).toEqual([e])
  });
});
