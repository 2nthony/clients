<template>
  <div id="app">
    <ElvForm ref="elvForm" :config="config" label-width="120px">
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button>Cancel</el-button>
      </el-form-item>
    </ElvForm>
  </div>
</template>

<script>
export default {
  data() {
    return {
      config: [
        {
          model: 'name',
          label: 'Activity name',
          component: 'input'
        },
        {
          model: 'zone',
          label: 'Activity zone',
          component: 'select',
          options: [
            {
              label: 'GuangZhou',
              value: 'GuangZhou'
            },
            {
              label: 'Japan',
              value: 'Japan'
            }
          ],
          props: {
            placeholder: 'Please select your zone'
          }
        },
        {
          model: 'delivery',
          label: 'Instant delivery',
          component: 'switch'
        },
        {
          model: 'type',
          label: 'Activity type',
          value: [],
          component: 'checkbox-group',
          options: [
            {
              label: 'Online activities'
            },
            {
              label: 'Promotion activities'
            },
            {
              label: 'Offline activities'
            },
            {
              label: 'Simple brand exposure'
            }
          ]
        },
        {
          model: 'resource',
          label: 'Resources',
          component: 'radio-group',
          options: [
            {
              label: 'Sponsor'
            },
            {
              label: 'Venue'
            }
          ]
        },
        {
          model: 'desc',
          label: 'Activity form',
          component: 'input',
          props: {
            type: 'textarea'
          }
        }
      ]
    }
  },
  methods: {
    onSubmit() {
      console.log('Submit!', 'Form value is', this.$refs.elvForm.getValue())
    }
  }
}
</script>

<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

#app {
  width: 60vw;
}
</style>
