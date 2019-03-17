export function isVueOpts(opts) {
  if (!opts) return false
  return typeof opts.template === 'string' || typeof opts.render === 'function'
}

export function warning(...args) {
  console.log(`%c${args[0]}`, 'color: #f04;', ...args.slice(1))
}
