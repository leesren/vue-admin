import { setToken } from "@/utils/auth";
import { userApi } from "../../api";
import { $http } from "../../utils/request";
import { clearCache } from "../../utils/auth";
const user = {
  state: {
    userInfo: {
      avatar: "https://avatars0.githubusercontent.com/u/1136893?s=460&v=4"
    },
    roles: []
  },

  mutations: {
    SET_USER_INFO: (state, data) => {
      state.userInfo = {
        ...state.userInfo,
        ...data
      };
    },
    SET_USER_ROLES: (state, data) => {
      state.roles = data;
    }
  },

  actions: {
    async login({ commit }, form) {
      return this.dispatch("auth", { name: form.username })
        .then(authRes => {
          setToken(authRes.accessToken);
          return $http
            .post(`${userApi.login}`, {
              name: form.username,
              password: form.password
            })
            .then(res => {
              return res;
            });
        })
        .then(data => {
          commit("SET_USER_INFO", data);
          return data;
        });
    },
    roleInfo({ commit }, data = ["admin"]) {
      commit("SET_USER_ROLES", data);
      return Promise.resolve(data);
    },
    auth(name) {
      return $http.post(userApi.auth, { name });
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    loginOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        $http
          .get(userApi.loginOut)
          .then(() => {
            commit("SET_ROLES", []);
            clearCache();
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // 动态修改权限
    ChangeRoles({ commit, dispatch }, role) {
      return new Promise(resolve => {
        commit("SET_TOKEN", role);
        setToken(role);
        // getUserInfo(role).then(response => {
        //   const data = response.data;
        //   commit("SET_ROLES", data.roles);
        //   commit("SET_NAME", data.name);
        //   commit("SET_AVATAR", data.avatar);
        //   commit("SET_INTRODUCTION", data.introduction);
        //   dispatch("GenerateRoutes", data); // 动态修改权限后 重绘侧边菜单
        //   resolve();
        // });
      });
    }
  }
};

export default user;
