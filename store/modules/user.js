const store = {
	state: {
		userInfo: {},
		headerInfo: {
			a: 123
		},
		statusBarHeight: 0,
		vehicleMsg: {
			name: '辛弃疾',
			vehicleCode: '闽A123456',
			phone: '13566668888',
			auth: true,
		},
		// licenseNumbers: ["闽A123123", "闽A223123", "闽A423123"],
		licenseNumbers: [],
	},
	// getters: {
	// 	headerInfo: state => state.headerInfo
	// },
	mutations: {
		setUserInfo: (state, val) => {
			state.userInfo = {
				...val
			};
		},
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
		setLicenseNumbers: (state, val) => {
			state.licenseNumbers.push(val);
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
		},
		setLicenseNumbersAction: ({
			commit
		}, val) => {
			commit('setLicenseNumbers', val)
		}
	}
}
export default store