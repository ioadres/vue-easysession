### Install

```bash
npm install vue-sessions --save
```

To install the plugin, do the following:

```javascript
import ManageSession from 'vue-sessions'
Vue.use(ManageSession.getVueSession().install)
```

Now you can use it in your components with the `$session` property.

## Options

VueSession can be started with some options that will change its behavior.

- `persist` A Boolean value to determine whether the data stored in the session may persist between tabs and browser instances. Defaults to `false`.

- `keySession` A String value to determine the key of the current Vue session. Defaults is `vue-session-key``

Pass the options in the `use` method:

```javascript
var options = {
    persist: true,
    keySession: 'myKeySession'
}

Vue.use(VueSession, options)
```

## Reference Vue instance this.$session .vue

- `this.$session.getAll()`, returns all data stored in the Session.
- `this.$session.set(key,value)`, sets a single value to the Session.
- `this.$session.get(key)`, returns the value attributed to the given key.
- `this.$session.start()`, initializes a session with a 'session-id'. If you attempt to save a value without having started a new session, the plugin will automatically start a new session.
- `this.$session.exists()`, checks whether a session has been initialized or not.
- `this.$session.has(key)`, checks whether the key exists in the Session
- `this.$session.remove(key)`, removes the given key from the Session
- `this.$session.clear()`, clear all keys in the Session, except for 'session-id', keeping the Session alive
- `this.$session.destroy()`, destroys the Session
- `this.$session.id()`, returns the 'session-id'
- `this.$session.renew(session_id)`, allows a user to renew a previous session by manually inputting the session_id

## Reference the instance ManageSession

You can use the session in others scripts file

```javascript
import ManageSession from 'vue-sessions'
var session = ManageSession.getInstance()
if(session.exists()) {
  console.log(true);
}
```
you can add the options parameters too in the `ManageSession.getInstance(options)`


## Example

Your login method could look like this:

```javascript
export default {
    name: 'login',
    methods: {
        login: function () {
          this.$http.post('URL', {
            password: this.password,
            username: this.username
          }).then(function (response) {
            if (response.status === 200 && 'token' in response.body) {
              this.$session.start()
              this.$session.set('jwt', response.body.token)
              Vue.http.headers.common['Authorization'] = 'Bearer ' + response.body.token
              this.$router.push('/home')
            }
          }, function (err) {
            console.log('err', err)
          })
        }
    }
}
```

In your logged-in area, you can check whether or not a session is started and destroy it when the user wants to logout:

```javascript
export default {
  name: 'panel',
  data () {
    return { }
  },
  beforeCreate: function () {
    if (!this.$session.exists()) {
      this.$router.push('/')
    }
  },
  methods: {
    logout: function () {
      this.$session.destroy()
      this.$router.push('/')
    }
  }
}
```

This library is based for the repository vue-session of victorsferreira https://github.com/victorsferreira/vue-session
