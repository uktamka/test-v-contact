import { boot } from 'quasar/wrappers'
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { showErrorNotification, showSuccessNotification } from 'src/helpers'

export interface AxiosReqConfig extends AxiosRequestConfig {
  __showDefaultNotification?: boolean
}
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({
  baseURL: process.env.HOST_API,
  __showDefaultNotification: true,
  timeout: 20000,
} as AxiosReqConfig)

api.interceptors.response.use(
  (response) => {
    const config: AxiosReqConfig = response.config
    if (config.__showDefaultNotification && response.data?.message)
      showSuccessNotification(response.data?.message)

    return response
  },
  (error) => {
    if (error?.config?.__showDefaultNotification) showErrorNotification(error)
    return Promise.reject(error)
  }
)

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export const defaultLimit = 10
export * from 'boot/UsersApi'
export * from 'boot/TagsApi'
export { api }
