var WxParse = require('../../wxParse/wxParse.js');
var router = require('../index/router.js');
var time_ = require('../../utils/util.js');
var md_ = require('../../utils/md5.js');
var timeago = require('../../utils/timeago.js')
const app = getApp()
Page({

   data: {
      post: '',
      StatusBar: app.globalData.StatusBar,
      CustomBar: app.globalData.CustomBar,
      liked: false,
      like_count: '',
      comment_count: '',
      view_count: '',
      comments: '',
      isZan: '',
      collection: false,
      iscollec: false,
      imgUrl: ''

   },

   onLoad: function(options) {
      let num = options.id,
         info = {
            num: num
         }
      //   console.log(num)
      router.route_request('mp/refresh', info).catch(res => {

         let posts = res;
         // console.log(posts)
         posts['time'] = time_.formatTime(new Date(posts['time'].replace('GMT', '')))
         this.get_data(posts)
         let collec = wx.getStorageSync('collection');
         if (collec) {
            for (let i = 0; i < collec.length; i++) {
               if (collec[i].id == posts.id) {
                  this.setData({
                     iscollec: true
                  })
               }
            }
         }
         let parse = this.data.post.body_html;
         WxParse.wxParse('wxshow', 'html', parse, this, 20);
         if(posts['img']){
            var bgImg = "https://blogai.cn/static/" + posts['img']
         }else{
            var bgImg = 'https://blogai.cn/static/uploads/82f6bfa51778a0c55d42a334321cabf1/20190906180648_94.png'
         }
         if (posts['post.link_.avatar']) {
            var avaImg = "https://blogai.cn/static/" + posts['img']
         } else {
            var avaImg = 'https://blogai.cn/static/uploads/82f6bfa51778a0c55d42a334321cabf1/20190906180648_94.png'
         }

         // 
         wx.getImageInfo({
            src: bgImg,
            success: res_ => {
               this.setData({
                  imgeInfo: res_
               })
            }
         })

         wx.getImageInfo({
            src: avaImg,
            success: res_ => {
               this.setData({
                  avatarInfo: res_
               })
            }
         })
      })

      const sysInfo = wx.getSystemInfoSync();
      const screenWidth = sysInfo.screenWidth;
      const screenHeight = sysInfo.screenHeight;
      this.setData({
         cWidth: screenWidth - 20,
         cHeight: screenHeight - 200
      })




   },
   like(e) {
      //  like_.like()
      wx.vibrateShort({

      })
      let stroage = wx.getStorageSync('final_data');
      if (stroage) {
         let like_count = this.data.like_count,
            liked = this.data.liked,
            num = this.data.post.id,
            info = {
               openId: stroage.openId,
               num: num
            };
         router.route_request('mp/like', info).catch(res => {
            //  console.log({
            //      'res': res
            //  })
         })
         if (!liked) {
            liked = true,
               like_count++;
            wx.showToast({
               title: '点赞成功',
               icon: 'success',
               duration: 2000
            })
         } else {
            liked = false,
               like_count--;
            wx.showToast({
               title: '取消成功',
               icon: 'success',
               duration: 2000
            })
         }
         this.setData({
            liked: liked,
            like_count: like_count
         })

      } else {
         wx.navigateTo({
            url: '../login/login',
         })
      }


   },
   comment(e) {
      wx.vibrateShort({

      })
      if (e.detail.value.comment) {
         let stroage = wx.getStorageSync('final_data')
         //   console.log(stroage)
         if (stroage) {
            let num = this.data.post['id'],
               wx_comment = e.detail.value.comment,
               info = {
                  openId: stroage.openId,
                  wx_comment: wx_comment,
                  num: num
               };
            var wx_uid = md_.md5(stroage['openId']);
            router.route_request('mp/comment', info).catch(res => {
               var comments = res.new_comment.comments
               for (var j = 0; j < comments.length; j++) {
                  comments[j]['time'] = timeago.transDate(comments[j]['time'].replace('GMT', ''))
                  for (var k = 0; k < comments[j].liker.length; k++) {
                     if (comments[j].liker[k].user_id == wx_uid) {
                        comments[j].liked = 'isLike'
                     }
                  }
               }
               this.setData({
                  comments: comments,
                  comment_count: this.data.comment_count + 1
               })
            })
            wx.showToast({
               title: '评论成功',
               duration: 1500
            })
            setTimeout(() => {
               this.tobottom()
            }, 1500)



         } else {
            wx.navigateTo({
               url: '../login/login',
            })
         }
      } else {
         wx.showToast({
            title: '输入不能为空',
            icon: 'none'
         })
      }
   },
   get_data(posts) {
      let view_count = posts['view_count'],
         comments = posts.new_comment.comments,
         like = posts.likes,
         stroage = wx.getStorageSync('final_data');

      if (stroage) {
         var wx_uid = md_.md5(stroage['openId']);

         for (var i = 0; i < like.length; i++) {
            like[i]['time'] = timeago.transDate(like[i]['time'].replace('GMT', ''))
            if (like[i].user_id == wx_uid) {
               var liked = true
            }
         }

         for (var j = 0; j < comments.length; j++) {
            comments[j]['time'] = timeago.transDate(comments[j]['time'].replace('GMT', ''))
            for (var k = 0; k < comments[j].liker.length; k++) {

               if (comments[j].liker[k].user_id == wx_uid) {
                  comments[j].liked = 'isLike'
               }
            }
         }
      } else {
         var liked = false
      }

      view_count++;
      this.setData({
         post: posts,
         like_count: posts['like_count'],
         comment_count: posts['comment'],
         view_count: view_count,
         comments: comments,
         liked: liked
      })

   },
   onPullDownRefresh() {
      wx.vibrateShort({})
      wx.showNavigationBarLoading()
      wx.showLoading({
         title: '更新中...',
         icon: 'loading',
         duration: 1500
      })
      let info = {
         num: this.data.post.id
      }
      router.route_request('mp/refresh', info).catch(res => {
         let posts = res;
         posts['time'] = time_.formatTime(new Date(posts['time'].replace('GMT', '')))
         this.get_data(posts)
      })
      wx.stopPullDownRefresh();
   },
   zan: function(e) {
      wx.vibrateShort({})
      let stroage = wx.getStorageSync('final_data'),
         num = e.currentTarget.dataset.id;
      var index = e.currentTarget.dataset.index;
      if (stroage) {
         let info = {
            openId: stroage.openId,
            num: num
         };
         // console.log('num' + num)
         router.route_request('mp/like_comment', info).catch(res => {
            res.time = timeago.transDate(res['time'].replace('GMT', ''))
            let comments = this.data.comments;
            let liker = comments[index];
            let status = liker.liked ? '' : 'isLike'
            res.liked = status
            comments[index] = res
            this.setData({
               comments: comments
            })

         })


      } else {
         wx.navigateTo({
            url: '../login/login',
         })
      }



   },
   tobottom() {
      wx.createSelectorQuery().select('#b_comment').boundingClientRect(function(rect) {
         // 使页面滚动到底部
         wx.pageScrollTo({
            scrollTop: rect.bottom
         })
      }).exec()
   },
   reply(e) {
      let comment_id = e.currentTarget.dataset.id,
         index = e.currentTarget.dataset.index;
      wx.setStorageSync('comment', this.data.comments[index])
      wx.navigateTo({
         url: 'reply?id=' + comment_id,
      })

   },
   poster() {

   },

   share() {
      
      wx.showLoading({
         title: '生成中....',
      })
      let that = this
      const ctx = wx.createCanvasContext('poster', this)
      const fs = wx.getFileSystemManager();
      const filePath = `${wx.env.USER_DATA_PATH}/interim`;
      router.route_request('mp/get_code').catch(res => {
         console.log(res.access_token)
         wx.request({
            method: 'POST',
            url: `https://api.weixin.qq.com/wxa/getwxacode?access_token=${res.access_token}`,
            data: {
               path: '/pages/index/more?id=' + this.data.post.id
            },
            responseType: 'arraybuffer',
            success: res_ => {
               console.log(res_)
               // let imgUrl = wx.arrayBufferToBase64(res_.data)
               // console.log(imgUrl)
               // this.setData({
               //    imgUrl: imgUrl
               // })
               fs.writeFile({
                  filePath: filePath,
                  data: res_.data,
                  encoding: 'utf-8',
                  success() {
                     console.log('d', filePath)
                     wx.getImageInfo({
                        src: filePath,
                        success: img => {

                           that.setData({
                              imgUrl: img.path
                           })

                           let img_w = that.data.imgeInfo.width,
                              img_h = that.data.imgeInfo.height,
                              scale = img_w / img_h;
                           if (scale > 1) {
                              var width = that.data.cWidth,
                                 height = width / scale
                           } else {
                              var height = that.data.cHeight,
                                 width = scale * height
                           }
                           ctx.beginPath()
                           ctx.setFillStyle('#5e00ff')
                           ctx.rect(0, 0, that.data.cWidth, that.data.cHeight)
                           ctx.fill()

                           ctx.drawImage(that.data.imgeInfo.path, 0, 0, width, height)

                           ctx.draw()
                           that.setData({
                              show: true
                           })

                        }
                     })

                  },
                  fail() {
                     return (new Error('ERROR_WRITE'));
                  },
               });
            }
         })
      })

   console.log('dd')



   },
   onShareAppMessage: function(res) {
      if (res.from == 'button') {
         // 来自页面内转发按钮
         // console.log(res.target)
      }
      return {
         title: this.data.post.tittle,
         path: '/pages/index/more?id=' + this.data.post.id,
         success: res => {
            //  console.log('成功')
         },
         fail: err => {
            //  console.log('失败')
         }
      }

   },
   collection(e) {
      wx.vibrateShort({

      })
      let colloced = this.data.iscollec;
      let post = [this.data.post],
         collec = wx.getStorageSync('collection');
      if (!colloced) {

         if (collec) {
            var collec_post = collec.concat(post)
            wx.setStorageSync('collection', collec_post)
         } else {
            var collec_post = post;
            wx.setStorageSync('collection', collec_post)
         }
         this.setData({
            iscollec: true
         })
      } else {

         for (let i = 0; i < collec.length; i++) {
            let num = this.data.post.id
            if (collec[i].id == num) {
               collec.splice(i, 1)

            }
            wx.setStorageSync('collection', collec)

         }
         // console.log(collec)
         this.setData({
            iscollec: false
         })
      }

   }
})