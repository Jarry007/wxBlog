const app = getApp()

class _Router {
  static get(_route, parmas) {
    const tokenName = app.globalData.routerConfig.tokenName
    const header = {}
    header[tokenName] = app.globalData.routerConfig.tokenValue

    return new Promise((resolve, reject) => {
      wx.request({
        url: `${app.globalData.routerConfig.url}${_route}`,
        method: 'GET',
        header: header,
        data: parmas,
        success: res => {
          if (res.data.code == 200) {
            resolve(res.data)
          } else if (res.data.code == '401') {
            wx.clearStorageSync('token')
            wx.showToast({
              title: '登录信息失效，请重新登录',
              icon: 'none',
              duration: 1500
            })
            setTimeout(() => {
              wx.redirectTo({
                url: '/pages/login/login',
              })
            }, 1500)
          } else {
            if (res.data.msg === 'token已过期') {
              wx.clearStorageSync('token')
              setTimeout(() => {
                wx.redirectTo({
                  url: '/pages/login',
                })
              }, 1000)
            }
            reject(res.data)
            wx.showToast({
              title: `${res.data.msg || '网络出了点小问题，请重试~~'}`,
              icon: 'none'
            })
          }
        },
        fail: err => {
          reject(err)
          wx.showToast({
            title: '微信异常，稍后重试',
            icon: 'none'
          })
        }
      })
    })
  }

  static post(_route, _data, _method = false) {
    const tokenName = app.globalData.routerConfig.tokenName
    const header = _method ? {
      'content-type': 'application/x-www-form-urlencoded'
    } : {
      'content-type': 'application/json'
    }
    if (_route !== loginUrl) {
      header[tokenName] = app.globalData.routerConfig.tokenValue
    }


    return new Promise((resolve, reject) => {
      wx.request({
        url: `${app.globalData.routerConfig.url}${_route}`,
        method: 'POST',
        header: header,
        data: _data,
        success: res_ => {
          if (res_.data.code == 200) {
            resolve(res_.data)
          } else if (res_.data.code == '401') {
            wx.clearStorageSync('token')
            wx.showToast({
              title: '登录信息失效，请重新登录',
              icon: 'none',
              duration: 1500
            })
            setTimeout(() => {
              wx.redirectTo({
                url: '/pages/login/login',
              })
            }, 1500)
          } else {
            if (res_.data.msg === 'token已过期') {
              wx.clearStorageSync('token')
              setTimeout(() => {
                wx.redirectTo({
                  url: '/pages/login',
                })
              }, 1000)
            }
            reject(res_.data)
            wx.showToast({
              title: `${res_.data.msg || '网络出了点小问题，请重试~~'}`,
              icon: 'none'
            })
          }
        },
        fail: err_ => {
          reject(err_)
          wx.showToast({
            title: '微信异常，稍后重试',
            icon: 'none'
          })

        }
      })
    })

  }

  static put(_route, _data, _method = false) {
    const tokenName_ = app.globalData.routerConfig.tokenName;
    const header_ = _method ? {
      'content-type': 'application/x-www-form-urlencoded'
    } : {
      'content-type': 'application/json'
    }

    header_[tokenName_] = app.globalData.routerConfig.tokenValue

    return new Promise((res, rej) => {
      wx.request({
        url: `${app.globalData.routerConfig.url}${_route}`,
        method: 'PUT',
        header: header_,
        data: _data,
        success: res_ => {
          if (res_.data.code == 200) {
            res(res_.data)
          } else if (res_.data.code == '401') {
            wx.clearStorageSync('token')
            wx.showToast({
              title: '登录信息失效，请重新登录',
              icon: 'none',
              duration: 1500
            })
            setTimeout(() => {
              wx.redirectTo({
                url: '/pages/login/login',
              })
            }, 1500)
          } else {
            if (res_.data.msg === 'token已过期') {
              wx.clearStorageSync('token')
              setTimeout(() => {
                wx.redirectTo({
                  url: '/pages/login',
                })
              }, 1000)
            }
            rej(res_.data)
            wx.showToast({
              title: `${res_.data.msg || '网络出了点小问题，请重试~~'}`,
              icon: 'none'
            })
          }
        },
        fail: err_ => {
          rej(err_)
          wx.showToast({
            title: '微信异常，稍后重试',
            icon: 'none'
          })
        }
      })
    })
  }

  static del(_route, _data, _method = false) {
    const tokenName_ = app.globalData.routerConfig.tokenName;
    const header_ = _method ? {
      'content-type': 'application/x-www-form-urlencoded'
    } : {
      'content-type': 'application/json'
    }

    header_[tokenName_] = app.globalData.routerConfig.tokenValue

    return new Promise((res, rej) => {
      wx.request({
        url: `${app.globalData.routerConfig.url}${_route}`,
        method: 'DELETE',
        header: header_,
        data: _data,
        success: res_ => {
          if (res_.data.code == 200) {
            res(res_.data)
          } else if (res_.data.code == '401') {
            wx.clearStorageSync('token')
            wx.showToast({
              title: '登录信息失效，请重新登录',
              icon: 'none',
              duration: 1500
            })
            setTimeout(() => {
              wx.redirectTo({
                url: '/pages/login/login',
              })
            }, 1500)

          } else {
            if (res_.data.msg === 'token已过期') {
              wx.clearStorageSync('token')
              setTimeout(() => {
                wx.redirectTo({
                  url: '/pages/login',
                })
              }, 1000)
            }
            rej(res_.data)
            wx.showToast({
              title: `${res_.data.msg || '网络出了点小问题，请重试~~'}`,
            })
          }
        },
        fail: err_ => {
          rej(err_)
          wx.showToast({
            title: '微信异常，稍后重试',
            icon: 'none'
          })
        }
      })
    })
  }

  static upload(_route, _file, ) {
    const tokenName_ = app.globalData.routerConfig.tokenName;
    const header_ = {}
    header_[tokenName_] = app.globalData.routerConfig.tokenValue

    return new Promise((resolve, reject) => {
      wx.uploadFile({
        filePath: _file,
        name: 'file',
        header: header_,
        url: `${app.globalData.routerConfig.url}${_route}`,
        success: res => {
          const result = JSON.parse(res.data)
          if (result.code == 200) {
            resolve(result)
          } else {
            if (result.msg === 'token已过期') {
              wx.clearStorageSync('token')
              setTimeout(() => {
                wx.redirectTo({
                  url: '/pages/login',
                })
              }, 1000)
            }
            reject(result)
          }
        },
        fail: err => {
          reject(err)
          wx.showToast({
            title: '上传图片失败,请重试',
            icon: 'none'
          })
        }
      })
    })
  }

  static scan() {
    return new Promise((resolve, reject) => {
      wx.scanCode({
        success: res => {
          resolve(res)
        },
        fail: err => {
          // console.log('err',err)
          const data = {
            msg: "您取消了扫码~~"
          }
          reject(data)
        }
      })
    })
  }
}

export const Router = _Router