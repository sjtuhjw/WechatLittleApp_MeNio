// app.js
App({
  onLaunch: function() {

      if(!wx.cloud){
        console.error('请使用2.2.3或以上的基础库以使用云能力')
      }else{
        wx.cloud.init({
          env:'cloud1-5gel9har6a17b1da',
          traceUser:true,
        })
      }

      this.globalData = {}
  }
})
