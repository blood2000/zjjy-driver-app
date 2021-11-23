const store = {
	state: {
		headerInfo: {
			a: 123
		},
		statusBarHeight: 0,
		vehicleMsg: {
			name: '辛弃疾',
			vehicleCode: '闽A123456',
			phone: '13566668888',
			auth: true,
		}
	},
	getters: {
		headerInfo: state => state.headerInfo
	},
	mutations: {
		getLoginInfo: (state, val) => {
			state.headerInfo = {
				...val
			};
		},
		
		getStatusBarHeight: (state, val) => {
			state.statusBarHeight = val || 0;
		},
		getVehicleMsg: (state, obj) => {
			state.vehicleMsg = Object.assign(state.vehicleMsg, obj);
		},
	},
	actions: {
		getLoginInfoAction: ({
			commit
		}, val) => {
			commit('getLoginInfo', val)
		},
		
		getStatusBarHeightAction: ({
			commit
		}, val) => {
			commit('getStatusBarHeight', val)
		},
		getVehicleMsgAction: ({
			commit
		}, val) => {
			commit('getVehicleMsg', val)
		}
	}
}
export default store