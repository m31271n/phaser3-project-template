// Disable scroll, this is useful for built-in Webkit in some native applications.
function disableScroll() {
  document.body.addEventListener(
    'touchmove',
    function(e) {
      e.preventDefault()
    },
    { passive: false }
  )

  document.body.addEventListener(
    'scroll',
    function(e) {
      e.preventDefault()
    },
    { passive: false }
  )
}

export default {
  disableScroll,
}
