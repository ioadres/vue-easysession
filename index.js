var SessionStorage = require('./session-storage');

var VueEasySession = {}

VueEasySession.getVueSession = function (options) {
    var VueSession = {};
    VueSession.install = function (Vue, options) {
        Vue.prototype.$session = new SessionStorage.default(options);
    }

    return VueSession;
}

VueEasySession.getInstance = function (options) {
    return new SessionStorage.default(options);
}

module.exports = VueEasySession;
