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
  'select',
  'date-picker',
  'input-number',
  'tag',
  'upload',
  'message',
  'comment',
  'textarea',
  'notification',
  'alert',
  'back-top',
  'badge',
  'calendar',
  'checkbox',
  'col',
  'description',
  'divider',
  'dropdown',
  'empty',
  'grid',
  'icon',
  'list',
  'modal',
  'pagination',
  'pop-confirm',
  'radio',
  'skeleton',
  'space',
  'spin',
  'table',
  'tag',
  'time-picker',
  'tooltip'
]

const styles = components.map(component => import(`antd/es/${component}/style`))

export default { ...styles }
