const apiUrl = {
  login: '/zjz1-jyz-service/wxmp/login/wxLogin',//微信授权登录
  registerDriver: '/zjz1-jyz-service/wxmp/login/registerDriver',//微信授权登录
  uploadImg: '/aiotweb/config/common/v1/uploadFile',
  driverInfo: '/zjz1-jyz-service/wxmp/login/getDriver',
  uploadFile: '/assets/upload/uploadToHW',
}


const orderUrl = {
  scannerCodeOrOpenLink: '/jyz/wxmp/jyz-waybill-opera/scannerCodeOrOpenLink', //扫码或点击链接获取 
  receiveOrder: '/jyz/wxmp/jyz-waybill-opera/receiveOrder',//接单
  addVehicle: '/jyz/wxmp/jyz-waybill-opera/addVehicle',//添加车辆
  authDriverTeam: '/assets/driver-app/authDriverTeam',
  unload: '/jyz/wxmp/jyz-waybill-opera/unload',  //卸货
  driverAuth: '/assets/driver-app/submitCertificate',  //司机认证
  authOCR: '/fmsweb/basic/common/v1/uploadCertAndGetInfoWithoutToken',  //ocr识别
}
export default { ...orderUrl, ...apiUrl }