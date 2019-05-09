const app = getApp()
const accountInfo = wx.getAccountInfoSync()
console.log(accountInfo.miniProgram.appId) 

function route_request(route, info) {
    return new Promise((resolve, reject) => {
        wx.request({
            url: `${app.globalData.url}${route}`,
            method: 'POST',
            data: {
                info: JSON.stringify(info),
                appid: JSON.stringify(accountInfo.miniProgram.appId) //把object转化为json数据
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