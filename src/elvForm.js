import RenderItem from './renderItem'
import { mixinProps, mixinOnUpdate, mixinElFormProps } from './mixins'

export default {
  name: 'ElvForm',

  mixins: [mixinProps, mixinOnUpdate, mixinElFormProps],

  render(h) {
    const items = new Set()
    this.config.forEach(item => {
      items.add(
        <RenderItem api={this} item={item || {}} onUpdate={this.onUpdate} />
      )
    })

    return (
      <ElForm
        ref="elForm"
        {...{
          props: this.$props
        }}
      >
        {[...items, this.$slots.default]}
      </ElForm>
    )
  },

  data() {
    return {
      value: {}
    }
  },

  methods: {
    getValue() {
      return { ...this.value }
    }
  }
}
