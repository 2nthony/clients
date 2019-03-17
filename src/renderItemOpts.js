function resolveComponent(name) {
  switch (name) {
    case 'select':
      return 'el-option'
    case 'radio-group':
      return 'el-radio'
    case 'radio-button':
      return 'el-radio-button'
    case 'checkbox-group':
      return 'el-checkbox'
    case 'checkbox-button':
      return 'el-checkbox-button'
    default:
      return ''
  }
}

export default function(h, { component, options, opts } = {}) {
  const Opt = resolveComponent(component)

  const _Opts = options || opts

  const Options = new Set()

  Array.isArray(_Opts) &&
    _Opts.forEach(opt => {
      Options.add(
        <Opt
          {...{
            props: Object.assign(
              {},
              opt,
              component !== 'select' && {
                label: opt.value || opt.label
              }
            )
          }}
        >
          {component !== 'select' && opt.label}
        </Opt>
      )
    })

  return Options
}
