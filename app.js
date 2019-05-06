//app.js
var time = require('utils/util.js')
App({
  onLaunch: function() {
    wx.getSystemInfo({
      success: e => {
          console.log({'systemInfo':e})
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        console.log({'custom:':custom})
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })
  },

  globalData: { 
    userInfo: null,
    url:'http://127.0.0.1:5000/',
    new_:''
  }
})