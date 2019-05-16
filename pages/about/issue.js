const app = getApp()
const accountInfo = wx.getAccountInfoSync()
var router = require('../index/router.js');
Page({

   
    data: {
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        ColorList: app.globalData.ColorList,
        imgList:[]
    },
    onLoad: function (options) {

    },

    onReady: function () {

    },
    issue(e){
        wx.vibrateShort({})
        let iss = e.detail.value.issue,
        imgs = this.data.imgList;
        if (iss){
        wx.showToast({
            title: '反馈成功',
            icon:'success'
        })
        wx.uploadFile({
            url: 'http://127.0.0.1:5000/mp/send_mail' ,
            header:{
                appid: String (accountInfo.miniProgram.appId),
                iss:JSON.stringify(iss)
            },
            metohd: 'POST',
            filePath: String(imgs[0]),
            name: 'imgs',
            forData:{
               
                iss:JSON.stringify(iss)
                
            },
            success:res=>{
                console.log(res)
            }
        })
            
        }else{
            wx.showToast({
                title: '不能为空',
                icon:'none'
            })
        }

    },
    choose(e){
        wx.vibrateShort({})
       // let imgCount = 3-this.data.imgList.length
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'], 
            sourceType: ['album'],
            success: res=> {
                if (this.data.imgList.length != 0) {
                    this.setData({
                        imgList: this.data.imgList.concat(res.tempFilePaths)
                    })
                } else {
                    this.setData({
                        imgList: res.tempFilePaths
                    })
                }
            }
        })
    },
    ViewImage(e) {
        wx.previewImage({
            urls: this.data.imgList,
            current: e.currentTarget.dataset.url
        });
    },
    closeimg(e){
        this.data.imgList.splice(e.currentTarget.dataset.index, 1);
        this.setData({
            imgList: this.data.imgList
        })
    }
})