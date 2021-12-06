const store = {
	state: {
		userInfo: {},
		headerInfo: {
			a: 123
		},
		statusBarHeight: 0,
		vehicleMsg: {
			userCode: '',
			name: '',
			vehicleCode: '',
			phone: '',
			auth: false,
		},
		// licenseNumbers: ["闽A123123", "闽A223123", "闽A423123"],
		licenseNumbers: [],
		locationInfo: {
			latitude: 26.0527,
			longitude: 119.3141,
		},
		scanInfo: {},
		beforeWaybillCode: '',
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
		setScanInfo: (state, val) => {
			state.scanInfo = {
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
		setVehicleMsg: (state, obj) => {
			state.vehicleMsg = Object.assign(state.vehicleMsg, obj);
		},
		setLicenseNumbers: (state, val) => {
			state.licenseNumbers.push(val);
		},
		setBeforeWaybillCode: (state, val) => {
			state.beforeWaybillCode = val;
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
		setVehicleMsgAction: ({
			commit
		}, val) => {
			commit('setVehicleMsg', val)
		},
		setLicenseNumbersAction: ({
			commit
		}, val) => {
			commit('setLicenseNumbers', val)
		}
	}
}
export default store