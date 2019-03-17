import { isVueOpts, warning } from './utils'
import RenderItemOpts from './renderItemOpts'

export default {
  props: ['api', 'item'],

  render(h) {
    if (typeof this.item !== 'object') return

    const { label, component, model, props } = this.item

    if (!component) {
      warning('[ElvForm]: `component` is required!')
      return
    }

    if (!model) {
      warning('[ElvForm]: `model` is required! Missed `model` with', {
        ...this.item
      })
      return
    }

    const isVue = isVueOpts(component)

    const Item = isVue
      ? component
      : `el-${component.replace(/(checkbox|radio)-button/, '$1-group')}`

    return (
      <ElFormItem label={label}>
        <Item
          onInput={this.emit}
          value={this.api.value[model]}
          {...{
            props
          }}
        >
          {...RenderItemOpts(h, this.item)}
        </Item>
      </ElFormItem>
    )
  },

  mounted() {
    const { value } = this.item
    if (value) {
      this.emit(value)
    }
  },

  methods: {
    emit(value) {
      this.$emit('update', { model: this.item.model, value })
    }
  }
}
