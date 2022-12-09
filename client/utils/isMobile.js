export default function isMobile () {
  const system = {
    win: false,
    mac: false,
    xll: false
  }

  const p = navigator.platform

  system.win = p.indexOf('Win') === 0
  system.mac = p.indexOf('Mac') === 0
  system.xll = (p === 'xll') || (p.indexOf('Linux') === 0)

  if (system.win || system.mac || system.xll) {
    return false
  } else {
    return true
  }
}
