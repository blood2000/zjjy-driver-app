const apiUrl = {
  login: '/zjz1-jyz-service/wxmp/login/wxLogin',//微信授权登录
  registerDriver: '/zjz1-jyz-service/wxmp/login/registerDriver',//微信授权登录
  uploadImg: '/fmswxmp/system/common/v1/upload',
  driverInfo: '/zjz1-jyz-service/wxmp/login/getDriver',
}


const orderUrl = {
  scannerCodeOrOpenLink: '/jyz/wxmp/jyz-waybill-opera/scannerCodeOrOpenLink', //扫码或点击链接获取 
  receiveOrder: '/jyz/wxmp/jyz-waybill-opera/receiveOrder',//接单
  addVehicle: '/jyz/wxmp/jyz-waybill-opera/addVehicle',//添加车辆
  authDriverTeam:'/assets/driver-app/authDriverTeam'
}
export default { ...orderUrl, ...apiUrl }