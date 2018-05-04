'use strict';

/**
 * Create a new instance of SessionStorage
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function SessionStorage(options) {
  var key = 'vue-session-key';
  if (options && options.keySession !== undefined) {
    key = options.keySession
  }
  if (options && options.expireSessionCallback !== undefined) {
    this.expireSessionCallback = options.expireSessionCallback
  }

  this.mainKeySession = key;
  this.storage = this.getStorage(options);
}

SessionStorage.prototype.getAll = function () {
  var all = JSON.parse(this.storage.getItem(this.mainKeySession));
  return all || {};
}

SessionStorage.prototype.setAll = function (all) {
  this.storage.setItem(this.mainKeySession, JSON.stringify(all));
}

SessionStorage.prototype.set = function (key, value) {
  if (key == 'session-id') return false;
  var all = this.getAll();

  if (!('session-id' in all)) {
    this.start();
    all = this.getAll();
  }
  all[key] = value;

  this.setAll(all);
}

SessionStorage.prototype.get = function (key) {
  var all = this.getAll();
  return all[key];
}

SessionStorage.prototype.start = function (exp) {
  var all = this.getAll();
  var time = new Date();

  all['session-id'] = 'sess:' + time.toJSON();

  if (exp !== undefined) {
    var expiration = new Date();
    expiration.setMilliseconds(expiration.getMilliseconds() + exp);
    all['session-control'] = {
      expiration: expiration.toJSON(),
      exp: exp,
      time: time
    }

    setTimeout(this.expireSession.bind(this), exp);
  }

  this.setAll(all);
}

SessionStorage.prototype.expireSession = function () {
  this.destroy()
  this.expireSessionCallback()
}

SessionStorage.prototype.runExpire = function () {
  var all = this.getAll();
  var sessionControl = all['session-control']
  if (sessionControl && sessionControl.expiration !== undefined && sessionControl.exp !== undefined) {
    var time = new Date();
    if (sessionControl.expiration <= time) {
      this.destroy()
      window.location.href = ''
    } else {
      setTimeout(this.expireSession.bind(this), new Date(sessionControl.expiration) - time)
    }
  }
}

SessionStorage.prototype.renew = function (sessionId) {
  var all = this.getAll();
  all['session-id'] = 'sess:' + sessionId;
  this.setAll(all);
}

SessionStorage.prototype.exists = function () {
  var all = this.getAll();
  return 'session-id' in all;
}

SessionStorage.prototype.has = function (key) {
  var all = this.getAll();
  return key in all;
}

SessionStorage.prototype.remove = function (key) {
  var all = this.getAll();
  delete all[key];

  this.setAll(all);
}

SessionStorage.prototype.clear = function () {
  var all = this.getAll();

  this.setAll({ 'session-id': all['session-id'] });
}

SessionStorage.prototype.destroy = function () {
  this.setAll({});
}

SessionStorage.prototype.id = function () {
  return this.get('session-id');
}

SessionStorage.prototype.storageAvailable = function (type) {
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

SessionStorage.prototype.getStorage = function (options) {
  var STORAGE = window.sessionStorage;
  if (options == undefined) {
    if (this.storageAvailable('localStorage')) {
      STORAGE = window.localStorage;
    }
  } else {
    if (options && 'persist' in options && options.persist) STORAGE = window.localStorage;
    else STORAGE = window.sessionStorage;
  }
  return STORAGE
}


const sessionStorageInstance = {
  create: function (options) {
    return new SessionStorage(options);
  }
}

module.exports = sessionStorageInstance
