require('dotenv').config()
import colors from 'vuetify/es5/util/colors'
import zhHant from 'vuetify/es5/locale/zh-Hant'

export default {
  env: {
    ENV: process.env.ENV,
    BASE_URL: process.env.BASE_URL,
  },
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - ledger',
    title: 'ledger',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  router: {
    base: '/frontend/'
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/transition.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/overlay',
    '~/plugins/message/snackbar',
    '~/plugins/message/dialog',
    '~/plugins/axios',
    '~/plugins/validator',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    '~/components/card',
    '~/components/form'
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: `${process.env.BASE_URL}/api/v1`,
    timeout: 60 * 1000,
    headers: {
      common: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
      }
    },
    progress: false
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'zh_TW',
      name: 'Ledger App',
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
    lang: {
      locales: {
        zhHant
      },
      current: 'zhHant',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
