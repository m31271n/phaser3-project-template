function isProduction() {
  /* eslint-disable no-undef */
  return process.env.APP_ENV === 'production'
}

export default {
  isProduction,
}
