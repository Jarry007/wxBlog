const app = getApp()

function route_like(info){
    wx.request({
        url: 'http://127.0.0.1:5000/mp/like',
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
            info: JSON.stringify(info) //把object转化为json数据
        },
        method: 'POST',
        success: e => {
            console.log(e.data)
            wx.showToast({
                title: '点赞成功',
                icon: 'success',
                duration: 1000
            })
           

        },
        fail: err => {
            wx.showToast({
                title: '点赞失败',
                icon: 'fail',
                duration: 1000
            })
        },
    })
   
}
function route_comment(info){
    wx.request({
        url: 'http://127.0.0.1:5000/mp/comment',
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
            info: JSON.stringify(info) //把object转化为json数据
        },
        method: 'POST',
        success: e => {
            console.log(e)
            wx.showToast({
                title: '评论成功',
                icon: 'success',
                duration: 1000
            })
        },
        fail: err => {
            wx.showToast({
                title: '评论失败',
                icon: 'fail',
                duration: 1000
            })
        }
    })
}
function route_mylike(info){
    wx.request({
        url: 'http://127.0.0.1:5000/mp/my_like',
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
            info: JSON.stringify(info) //把object转化为json数据
        },
        method: 'POST',
        success: e => {
            console.log(e)
            this.setData({
                like: e.data.all
            })
            wx.showToast({
                title: '成功',
                icon: 'success',
                duration: 1000
            })
        },
        fail: err => {
            wx.showToast({
                title: '失败',
                icon: 'fail',
                duration: 1000
            })

        }
    })
}
function route_mysay(info){
    wx.request({
        url: 'http://127.0.0.1:5000/mp/my_say',
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
            info: JSON.stringify(info) //把object转化为json数据
        },
        method: 'POST',
        success: e => {
            console.log(e)
            this.setData({
                comment: e.data.all
            })
            wx.showToast({
                title: '成功',
                icon: 'success',
                duration: 1000
            })
        },
        fail: err => {
            wx.showToast({
                title: '失败',
                icon: 'fail',
                duration: 1000
            })

        }
    })
}
function route_refresh(info){
    var promise = new Promise(function (resolve,reject){
    wx.request({
        url: 'http://127.0.0.1:5000/mp/refresh',
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
            info: JSON.stringify(info) //把object转化为json数据
        },
        method: 'POST',
        success: e => {
            wx.showToast({
                title: '成功',
                icon: 'success',
                duration: 1000
            })
            resolve(e.data)
        },
        fail: err => {
            wx.showToast({
                title: '失败',
                icon: 'fail',
                duration: 1000
            })
            reject(err)

        }
    })
    })
    return promise
}

function route_request(route, info){
    return new Promise((resolve, reject) => {
        wx.request({
            url: `${app.globalData.url}${route}`,
            method: 'POST',
            data: {
                info: JSON.stringify(info) //把object转化为json数据
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success(request) {
                if (request.data.code === 200) {
                    resolve(request.data)
                } else {
                    reject(request.data)
                }
            },
            fail(error) {
                reject(error.data)
            }
        })
    })
}


module.exports = {
    route_request: route_request
};