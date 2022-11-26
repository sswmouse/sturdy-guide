// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    // 登录
    this.checksession()
    if (wx.getStorageSync('user').openid) {
      this.globalData.is_login = true;
    }
  },
  // 检查微信登录状态
  checksession: function () {
    let that = this
    wx.checkSession({
      success: function (res) {
        console.log(res, '登录未过期')
        that.checkuser()
      },
      fail: function (res) {
        console.log(res, '登录过期')
        that.checkuser()
      }
    })
  },
  // 检查自定义登录状态
  checkuser: function () {
    var that = this 
    wx.login({
      success(res) {
        if (res.code) {
          wx.request({
            url:  that.globalUrl.url + 'onLogin',
            data: {
              code: res.code
            },
            method: "POST",
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              console.log(res);
              if (res.data.code == 0) wx.navigateTo({ url: '/pages/register/register' })
              else if (!wx.getStorageSync('user')) wx.switchTab({ url: '/pages/mine/mine' })
            }, fail() {
              console.log('后台服务器连接失败')
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      },fail(){
        console.log('报错了')
      }
    })
  },
  globalData: {
    userInfo: null,
    is_login:false
  },
  // 全局数据
  globalUrl: {
    url: "https://www.tuqi.online/",
    "@": "./"
    // url: "http://localhost:4000/"
  },
})
