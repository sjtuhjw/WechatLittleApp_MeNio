// pages/playing/playing.js
var urlArr=[];
var filePath=[];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlList:[]
  },

  getImg(file_name="playing"){
    wx.cloud.callFunction({
      name:"getImage",
      data:{
        file_name:file_name
      }
    }).then(res=>{  
      //把key提取出来
      res.result.map((value) => {
        this.data.urlList.push(value['url']);
      });
      this.setData({
        urlList:this.data.urlList
      })
      // console.log(this.data.urlList)
   })
  },

 chooseImage(){
    wx.chooseImage({
      success:res=>{
        filePath=res.tempFilePaths
         this.setData({
          imgs_temp:filePath
        })
        console.log(filePath)
      }
    })
  },

 uploadImage(){
  filePath.forEach((item,idx)=>{
    var  filename = Date.now() +"_"+idx
      this.cloudFile(filename,item)
      console.log(filename)
    })
 },
 
 cloudFile(filename,tempfile){

    wx.showLoading({
      title: '上传中...',
    })

    wx.cloud.uploadFile({
    cloudPath: "titbits/playing/"+ filename +".jpg", // 上传至云端的路径
    filePath: tempfile // 小程序临时文件路径
    }).then(res=>{
        
        urlArr.push(res.fileID)
        if(filePath.length==urlArr.length){
          this.setData({
            urlArr
          })
        }
        
        wx.hideLoading()
    })
    
    
 },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.getImg()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getImg()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})