/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import { loadFonts } from './webfontloader'
import vuetify from './vuetify'
import router from '../router'
import { setupCalendar } from 'v-calendar';

// Types
import type { App } from 'vue'

export const token = 'gestionnaire_de_taches';
export const baseURL = "http://127.0.0.1:3001/";

export function registerPlugins (app: App) {
  loadFonts()
  app
  .use(vuetify)
  .use(router)
  .use(setupCalendar, {})
}
