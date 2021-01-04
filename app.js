//app.js
var time = require('utils/util.js')
App({
    onLaunch: function() {
        wx.getSystemInfo({
            success: e => {
                this.globalData.StatusBar = e.statusBarHeight;
                let custom = wx.getMenuButtonBoundingClientRect();
                this.globalData.Custom = custom;
                this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
            }
        })
    },
    globalData: {
        userInfo: null,
        url: 'http://localhost:5000/',
        new_: '',
        StatusBar: '',
        Custom: '',
        CustomBar: '',
        routerConfig:{
            tokenName:'Authorization',
            tokenValue:'',
            url:'http://localhost:5000/'
          }

    }
})