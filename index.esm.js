import SessionStorage from './session-storage';

var VueEasySession = {}

VueEasySession.GetVueSession = function (options) {
    var VueSession = {};
    VueSession.install = function (Vue, options) {
        Vue.prototype.$session = new SessionStorage(options);
    }

    return VueSession;
}

VueEasySession.GetInstance = function (options) {
    return new SessionStorage(options);
}

if (typeof window !== 'undefined' && window.Vue) {
    window.VueEasySession = VueEasySession;
    window.Vue.use(VueEasySession.GetVueSession());
}

export default VueEasySession;
