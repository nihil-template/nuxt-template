import AppSidebar from '../app/components/common/AppSidebar.vue';
import { ElMenu, ElMenuItem } from 'element-plus';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { navigationItems } from '../app/config/navigation.config';

describe('AppSidebar', () => {
  it('renders every configured navigation item and emits navigate', async () => {
    const wrapper = mount(AppSidebar, {
      global: {
        components: {
          ElMenu,
          ElMenuItem,
        },
        stubs: {
          Icon: {
            props: {
              name: {
                required: true,
                type: String,
              },
            },
            template: '<span :data-icon="name" />',
          },
          NuxtLink: {
            props: {
              to: {
                required: true,
                type: String,
              },
            },
            template: '<a :href="to"><slot /></a>',
          },
        },
      },
    });

    for (const item of navigationItems) {
      const link = wrapper.get(`a[href="${item.to}"]`);

      expect(link.text()).toContain(item.label);
    }

    await wrapper.get('a[href="/settings"]').trigger('click');

    expect(wrapper.emitted('navigate')).toEqual([
      [
        navigationItems[2],
      ],
    ]);
  });
});
