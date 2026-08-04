import AppSidebar from '../app/components/common/AppSidebar.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

describe('AppSidebar', () => {
  it('renders every configured navigation item and emits navigate', async () => {
    const wrapper = mount(AppSidebar, {
      global: {
        stubs: {
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

    expect(wrapper.text()).toContain('대시보드');
    expect(wrapper.get('a[href="/docs"]').text()).toContain('문서');

    await wrapper.get('a[href="/settings"]').trigger('click');

    expect(wrapper.emitted('navigate')).toHaveLength(1);
  });
});
