import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import QuestionsPanel from '../QuestionsPanel.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(QuestionsPanel, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Question Panel')
  })
})
