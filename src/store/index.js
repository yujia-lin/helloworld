import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
		hasLogin:false,
		userInfo:{},
	},
    mutations: {
		login(state,provider){
			state.hasLogin=true;
			state.userInfo=provider;
			uni.setStorage({
				key:"userInfo",
				data:provider
			})
			console.log(state.userInfo)
		},
		getLoginStatus(state,callback){
			uni.getStorage({
				key: 'userInfo',
				success: function (res) {
					state.userInfo=res.data
					console.log(res.data);
					callback("success");
				},
				fail:function(){
					console.log(456456)
					callback("error");
				}
				
			});
		}
	},
    actions: {}
})
export default store