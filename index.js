import SessionStorage from './session-storage';

ManageSession = {}


ManageSession.GetVueSession = function(options) {
    var VueSession = {};
    VueSession.install = function(Vue, options) {
        Vue.prototype.$session = new SessionStorage(options);
    }

    return VueSession;
}

ManageSession.GetInstance = function(options) {
    return new SessionStorage(options);
}

module.exports = ManageSession;