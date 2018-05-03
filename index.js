var SessionStorage  =  require ( './session-storage');

var ManageSession = {}


ManageSession.getVueSession = function(options) {
    var VueSession = {};
    VueSession.install = function(Vue, options) {
        Vue.prototype.$session = new SessionStorage.default(options);
    }

    return VueSession;
}

ManageSession.getInstance = function(options) {
    return new SessionStorage.default(options);
}

module.exports = ManageSession;