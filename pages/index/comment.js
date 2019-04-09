
function get_openid(){
    var final_data = '';
    wx.login({
    success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
            wx.getUserInfo({
                success: e => {
                    let info = {
                        encryptedData: e.encryptedData,
                        iv: e.iv,
                        code: res.code
                    }
                    wx.request({
                        url: 'http://127.0.0.1:5000/mp/like',
                        header: {
                            'content-type': 'application/x-www-form-urlencoded'
                        },
                        data: {
                            info: JSON.stringify(info) //把object转化为json数据
                        },
                        method: 'POST',
                        success: function (u) {
                            const encryptedData = u.data
                            console.log({'openid:':encryptedData})
                            final_data = encryptedData
                        },
                        fail: function (f) {
                            console.log(f)
                        },
                    })
                },
                fail: function () {
                    console.log('fail,login_fail')
                }
            })
        }
    }
})
    wx.checkSession({
    success() {
    },
    fail() {
        wx.login() // 重新登录
    }
})
}
function like(e){
    get_openid()
    let id = get_openid.final_data
    console.log('like'+id)
}

module.exports = {
    like: like
};