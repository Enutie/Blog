/* Theme toggle for the blog — vanilla port of the main site's theme composable.
   The inline <head> script already set data-theme before paint; this keeps the
   switch in sync, handles clicks, and follows the OS when no explicit choice. */
(function () {
  var KEY = 'enutie-theme'
  var root = document.documentElement
  var mq = window.matchMedia('(prefers-color-scheme: dark)')

  function stored() {
    try {
      var v = localStorage.getItem(KEY)
      return v === 'light' || v === 'dark' ? v : null
    } catch (e) {
      return null
    }
  }

  function system() {
    return mq.matches ? 'dark' : 'light'
  }

  function effective() {
    return stored() || system()
  }

  function reflect(theme) {
    var isDark = theme === 'dark'
    root.dataset.theme = isDark ? 'dark' : ''
    var sw = document.querySelector('.theme-switch')
    if (sw) {
      sw.classList.toggle('dark', isDark)
      sw.setAttribute('aria-checked', String(isDark))
    }
  }

  function set(theme) {
    try {
      localStorage.setItem(KEY, theme)
    } catch (e) {}
    reflect(theme)
  }

  // initial sync (data-theme may already be 'dark' from the pre-paint script)
  reflect(effective())

  document.addEventListener('click', function (e) {
    var sw = e.target.closest ? e.target.closest('.theme-switch') : null
    if (!sw) return
    set(root.dataset.theme === 'dark' ? 'light' : 'dark')
  })

  // when the visitor hasn't chosen explicitly, track the OS preference live
  mq.addEventListener('change', function () {
    if (!stored()) reflect(system())
  })
})()
