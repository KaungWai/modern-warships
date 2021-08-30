import Vue from 'vue'
import UrlUtils from './UrlUtils'

const CommonPlugin = {
    install () {
      Vue.prototype.$UrlUtils = UrlUtils
    }
}

export default CommonPlugin