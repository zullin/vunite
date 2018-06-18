import Vue from 'vue'
import VueAffix from 'vue-affix'
import VueScrollTo from 'vue-scrollto'
import VueInfiniteScroll from 'vue-infinite-scroll'
import MavonEditor from 'mavon-editor'
import * as ElementUI from 'element-ui'
import popover from 'element-ui/packages/popover/src/directive'

import axios from 'axios'
import moment from 'moment'
import fontawesome from '@fortawesome/fontawesome'
import faRegular from '@fortawesome/fontawesome-free-regular'
import faSolid from '@fortawesome/fontawesome-free-solid'

import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import 'mavon-editor/dist/css/index.css'
import '@/styles/normalize.css'
import '@/styles/post.css'
import '@/styles/editor.css'

import App from './App'
import { createRouter } from './router'
import { createStore } from './store'
import { DISCOURSE_BACKEND_PROXY } from './const'

fontawesome.library.add(faRegular)
fontawesome.library.add(faSolid)
moment.locale('zh-CN')

export function createApp() {
    var httpOpts = {
        baseURL: DISCOURSE_BACKEND_PROXY,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
        },
        responseType: 'json',
        withCredentials: true,
    }

    Vue.config.productionTip = false

    Vue.http = Vue.prototype.$http = axios.create(httpOpts)

    Vue.use(VueAffix)
    Vue.use(VueScrollTo)
    Vue.use(VueInfiniteScroll)
    Vue.use(MavonEditor)
    Vue.use(ElementUI)
    Vue.directive('popover', popover)

    const router = createRouter()
    const store = createStore()

    sync(store, router)

    /* eslint-disable no-new */
    const app = new Vue({
        el: '#app',
        router,
        store,
        render: h => h(App)
    })

    return { app, router, store }
}
