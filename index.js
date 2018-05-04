var sessionStorage = require('./session-storage')

const VueEasySession = {
    install: function (Vue, options) {
        Vue.prototype.$session = sessionStorage.create(options);
    },

    getInstance: function (options) {
        return sessionStorage.create(options);
    }

}

module.exports = VueEasySession;
