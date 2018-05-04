function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch (e) {
        return false;
    }
}

function getStorage(options) {
    var STORAGE = window.sessionStorage;
    if (options == undefined) {
        if (storageAvailable('localStorage')) {
            STORAGE = window.localStorage;
        }
    } else {
        if (options && 'persist' in options && options.persist) STORAGE = window.localStorage;
        else STORAGE = window.sessionStorage;
    }
    return STORAGE
}


const defaultKeySession = 'vue-session-key';

class SessionStorage {
    constructor(options) {
        var key = defaultKeySession;
        if (options && options.keySession === undefined) {
            key = options.keySession
        }
        this.mainKeySession = key;
        this.storage = getStorage(options);
    }

    getAll() {
        var all = JSON.parse(this.storage.getItem(this.mainKeySession));
        return all || {};
    }

    setAll(all) {
        this.storage.setItem(this.mainKeySession, JSON.stringify(all));
    }

    set(key, value) {
        if (key == 'session-id') return false;
        var all = this.getAll();

        if (!('session-id' in all)) {
            this.start();
            all = this.getAll();
        }
        all[key] = value;

        this.setAll(all);
    }

    get(key) {
        var all = this.getAll();
        return all[key];
    }

    start() {
        var all = this.getAll();
        all['session-id'] = 'sess:' + Date.now();

        this.setAll(all);
    }

    renew(sessionId) {
        var all = this.getAll();
        all['session-id'] = 'sess:' + sessionId;
        this.setAll(all);
    }

    exists() {
        var all = this.getAll();
        return 'session-id' in all;
    }

    has(key) {
        var all = this.getAll();
        return key in all;
    }

    remove(key) {
        var all = this.getAll();
        delete all[key];

        this.setAll(all);
    }

    clear() {
        var all = this.getAll();

        this.setAll({ 'session-id': all['session-id'] });
    }

    destroy() {
        this.setAll({});
    }

    id() {
        return this.get('session-id');
    }
}

module.exports = {
    fun: function () { },
    class: SessionStorage
}