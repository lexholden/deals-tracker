const initialState = {
  notificationTimeout: 5000, // Time after which message disappears
  active: false,
  notifications: []
}

export const GET_NOTIFICATIONS = 'GET_NOTIFICATIONS'
export const GET_ACTIVE_NOTIFICATION = 'GET_ACTIVE_NOTIFICATION'
export const PUSH_NOTIFICATION = 'PUSH_NOTIFICATION'
export const REMOVE_ACTIVE_NOTIFICATION = 'REMOVE_ACTIVE_NOTIFICATION'

const ADD_NOTIFICATION_TO_LIST = 'ADD_NOTIFICATION_TO_LIST'

export default {
  state: initialState,
  getters: {
    [GET_NOTIFICATIONS]: state => state.notifications,
    [GET_ACTIVE_NOTIFICATION]: state => state.active
  },
  actions: {
    [PUSH_NOTIFICATION]: pushNotification
  },
  mutations: {
    [ADD_NOTIFICATION_TO_LIST]: (state, notification) => {
      state.notifications.push(notification)
      state.active = notification
    },
    [REMOVE_ACTIVE_NOTIFICATION]: state => { state.active = false }
  }
}

// Actions
function pushNotification ({ commit, state }, notification) {
  commit(ADD_NOTIFICATION_TO_LIST, notification)
  // TODO Track the latest timeout and clear it if we push a new one
  setTimeout(() => commit(REMOVE_ACTIVE_NOTIFICATION), state.notificationTimeout)
}
