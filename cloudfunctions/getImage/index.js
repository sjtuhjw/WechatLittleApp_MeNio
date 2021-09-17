// 云函数入口文件
const cloud = require('wx-server-sdk')
const CloudBase = require('@cloudbase/manager-node')

cloud.init()
const {
  storage
} = new CloudBase()


// 云函数入口函数
exports.main = async (event, context) => {
  var file_name = event.file_name;
  file_name =  "titbits/"+file_name;
  console.log(file_name);
  const result = await storage.listDirectoryFiles(file_name)
  result.splice(0, 1);

  let requestList = [];
      //把key提取出来
  result.map((value) => {
    requestList.push(value['Key']);
  });

  let fileIdList = []
  //构建请求文件fileID数组
  fileIdList = requestList.map((value) => {
    return {
        cloudPath: value,
        maxAge: 1800
        }
  })

  let responseList = [];
  //请求临时链接
  return responseList = await storage.getTemporaryUrl(fileIdList);
  
}