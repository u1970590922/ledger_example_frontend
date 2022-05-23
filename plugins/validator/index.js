import Vue from 'vue'
import {
    ValidationObserver,
    ValidationProvider,
    extend,
    localize
} from 'vee-validate'
import * as original from 'vee-validate/dist/rules'
import zh_TW from 'vee-validate/dist/locale/zh_TW'

Object.entries(original).forEach(([name, rule]) => {
    extend(name, rule);
})

localize('zh_TW', zh_TW)

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)