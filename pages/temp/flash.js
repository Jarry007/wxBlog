// pages/index/flash.js
const app = getApp()
var router = require('../index/router.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
      StatusBar: app.globalData.StatusBar,
      CustomBar: app.globalData.CustomBar,
      notice: '',
      TabCur: 0,
      scrollLeft: 0,
      page:1,
      tab2:false,
      route:'mp/notice'

  },
    tabSelect(e) {
        console.log(e);
        this.setData({
            TabCur: e.currentTarget.dataset.id,
            scrollLeft: (e.currentTarget.dataset.id - 1) * 60
        })
    },
    onLoad: function (options) {
        let stroage = wx.getStorageSync('final_data'),
        route = this.data.route,
        page = this.data.page;
        if (stroage) {
            let info = {
                openId: stroage.openId,
                page :page
            };
          this.pagenation(route,info)
        }
        else {
            wx.navigateTo({
                url: '../login/login',
            })
        }
    },
  // ListTouch触摸开始
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
  },

  // ListTouch计算方向
  ListTouchMove(e) {
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    })
  },

  // ListTouch计算滚动
  ListTouchEnd(e) {
    if (this.data.ListTouchDirection == 'left') {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
    })
  },
  pagenation(route,info){
      router.route_request(route, info).catch(res => {
          let data_ = res.all,
          page = this.data.page
          if (data_.length != 0 && this){
          let notice = this.data.notice;
          if (page==1){
          this.setData({
              notice: res.all
          })
          }else{
              this.setData({
                  notice:notice.concat(res.all)
              })
          }
          }else{
              wx.showToast({
                  title: '全部加载完毕...',
                  icon: 'success',
                  duration: 1000
              })
          }
      })
  }
  ,
    onReachBottom: function () {
        wx.showLoading({
            title: '数据加载中...',
            icon: 'loading',
            duration: 1000
        })
        let page = this.data.page + 1,
        route = this.data.route,
         stroage = wx.getStorageSync('final_data');
         let info = {
             openId: stroage.openId,
             page: page
         }
         this.pagenation(info)
        this.setData({
            page: page
        })


    },
  toDelect(e){
    console.log('删除:'+e.detail)
  },
    tabSelect(e){
        let tabId = e.currentTarget.dataset.id
        if (tabId==1){
            let stroage = wx.getStorageSync('final_data'),
                page = 1,
                info = {
                    openId: stroage.openId,
                    page: page
                };
                this.setData({
                    page:page,
                    tab2:true,
                    route:'mp/notice_reply'
                })
                this.pagenation('mp/notice_reply', info)
        }else{

        }
    }
})