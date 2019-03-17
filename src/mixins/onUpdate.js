export default {
  methods: {
    onUpdate({ model, value }) {
      this.value = Object.assign({}, this.value, {
        [model]: value
      })
    }
  }
}
