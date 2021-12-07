import dateFilter from './dateFilter.js'

export default (app) => {
  app.config.globalProperties.$filters = {
    dateFilter
  }
}
