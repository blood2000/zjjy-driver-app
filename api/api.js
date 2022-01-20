const apiUrl = {
  login: '/zjz1-jyz-service/wxmp/login/wxLogin',//微信授权登录
  registerDriver: '/zjz1-jyz-service/wxmp/login/registerDriver',//注册司机
  relateDriver: '/zjz1-jyz-service/wxmp/login/userAssociation',//关联司机
  uploadImg: '/aiotweb/config/common/v1/uploadFile',
  driverInfo: '/zjz1-jyz-service/wxmp/login/getDriver',
  uploadFile: '/assets/upload/uploadToHW',
  getDriverAuth: '/system/user/certificates',  //获取司机认证信息
  uploadOCR: '/jyz/ocr/getCertInfo',  //OCR识别
  getDriverRelationVoucher: '/zjz1-jyz-service/wx/rcyy/driverReservationRecord/getDriverRelationVoucher',//获取司机关联预约凭证列表
  voucherInfo:"/zjz1-jyz-service/wx/rcyy/driverReservationRecord/getDriverReservationRecord",//获取司机预约凭证列表
  reservationInformation:"/zjz1-jyz-service/wx/rcyy/driverReservationRecord/reservationInformation",//司机预约信息
  delReservationRecord:"/zjz1-jyz-service/wx/rcyy/driverReservationRecord/del/",
  appointmentDetail:'/zjz1-jyz-service/wx/rcyy/driverReservationRecord/getSubscribeRulesVoucherDetails',//获取预约凭证详情
  getMakeAnAppointment:'/zjz1-jyz-service/wx/rcyy/driverReservationRecord/getMakeAnAppointment',//获取预约规则凭证信息
  insertAppointment:'/zjz1-jyz-service/wx/rcyy/driverReservationRecord/insert'//新增司机预约凭证（时间段）
}


const orderUrl = {
  scannerCodeOrOpenLink: '/jyz/wxmp/jyz-waybill-opera/scannerCodeOrOpenLink', //扫码或点击链接获取 
  receiveOrder: '/jyz/wxmp/jyz-waybill-opera/receiveOrder',//接单
  authDriverTeam: '/assets/driver-app/authDriverTeam',
  unload: '/jyz/wxmp/jyz-waybill-opera/unload',  //卸货
  driverAuth: '/assets/driver-app/submitCertificate',  //司机认证
  authOCR: '/fmsweb/basic/common/v1/uploadCertAndGetInfoWithoutToken',  //ocr识别
}
const car = {
  addVehicle: '/assets/jzy-wx/jyzAdd',//jyz添加车辆
  jyzList:'/assets/jzy-wx/jyzList' ,//车辆列表
  listByDictJyz:'/system/dict/data/listByDictJyz',//字典
  driverLicenseNumberRel:'/assets/jzy-wx/driverLicenseNumberRel',//根据车牌绑定司机关系
  delVehicleReDriver:'/assets/jzy-wx/delVehicleReDriver',//删除车辆司机关联
  jyzVehicleExist:'/assets/jzy-wx/jyzVehicleExist',//校验车辆是否已存在
  getByCode:`/assets/jzy-wx/jyzVehicle`,//获取详情
}
export default { ...orderUrl, ...apiUrl, ...car }