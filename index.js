var sessionStorage = require('./session-storage')

const VueEasySession = {
    install: function (Vue, options) {
        Vue.prototype.$session = sessionStorage.create(options);
        Vue.prototype.$session.runExpire()
    },

    getInstance: function (options) {
        return sessionStorage.create(options);
    }

}

module.exports = VueEasySession;
