const components = [
  'layout',
  'row',
  'button',
  'form',
  'input',
  'divider',
  'page-header',
  'affix',
  'menu',
  'drawer',
  'card',
  'avatar',
  'typography',
  'popover',
  'carousel',
  'result',
  'auto-complete',
  'select'
]

const styles = components.map((component) =>
  import(`antd/es/${component}/style`)
)

export default { ...styles }
