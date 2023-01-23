import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    user: {
      username: '',
      gender: '',
      level: 0,
      img: ''
    }
  },
  getters: {
    init (state) {
      return state.user.img ? state.user.img : 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
    }
  },
  mutations: {
    updateLogin (state, isLogin) {
      state.isLogin = isLogin
    },
    updateUser (state, User) {
      state.user = User
    },
    logOut (state) {
      state.isLogin = false
      state.user = {
        username: '',
        gender: '',
        level: 0,
        img: ''
      }
    }
  },

  actions: {
    UpdateLogin (context) {
      context.commit('updateLogin')
    },
    UpdateUser (context) {
      context.commit('updateUser')
    }
  }
})
