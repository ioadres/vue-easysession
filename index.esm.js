import SessionStorage from './session-storage';

var ManageSession = {}


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

if(typeof window !== 'undefined' && window.Vue){
    window.ManageSession = ManageSession;
    window.Vue.use(ManageSession.GetVueSession());
}

export default ManageSession;