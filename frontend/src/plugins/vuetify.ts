/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import colors from 'vuetify/lib/util/colors'

// Composables
import { createVuetify } from 'vuetify'

import { VuetifyDateAdapter } from 'vuetify/labs/date/adapters/vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  date: {
    adapter: VuetifyDateAdapter,
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
          background: colors.amber.lighten5,
        },
      },
    },
  },
})
