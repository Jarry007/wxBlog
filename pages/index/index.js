//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
      StatusBar: app.globalData.StatusBar,
      CustomBar: app.globalData.CustomBar,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    src : '',
    appid:'wx41756aa8716ef1b9',
    secret_key:'1feda11f97b5cc35808b31a66915e0b3',
    code:''
  },
  onLoad: function () {
    let that = this;
    wx.login({
      success:function(e){
        that.setData({
          code:e.code
        })
        if (e.code){
          wx.getUserInfo({
            success:function(res){
              console.log({encryptedData:res.encryptedData,iv:res.iv,code:e.code})
            },
            fail:function(){
              console.log('fail')
            }
          });
          let appid = that.data.appid,
          secret = that.data.secret_key,
          code = that.data.code;
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid'+appid+'&secret='+secret+'&js_code='+code+'&grant_type=authorization_code',
              header: {
                  'content-type': 'application/x-www-form-urlencoded'
              },
            success:function(s){
              console.log({'s':s})
            }
          })
        }
        else{
          console.log('登录失败：'+e.errMsg)
        }
        

      },
      fail:function(){
        callback(false)
      }
    });
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        //console.log(res.encryptedData)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  choose:function(){
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths
        that.setData({
          src:tempFilePaths
        })
      }
    })
  },
  upload:function(){
    let that = this,
    src = that.data.src,
    name = that.data.userInfo.nickName
    wx.uploadFile({
      url: 'https://blogai.cn/api/v/upload/'+name,
      filePath: String(src),
      name: 'test',
      success:function(res){
        console.log(res)
      }
    })
  }
})
