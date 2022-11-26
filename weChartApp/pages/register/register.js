// pages/register/register.js
var app = getApp()
const url = getApp().globalUrl.url
Page({
  /**
   * 页面的初始数据
   */
  data: {
    mendian: "",
    dizi: "",
    name: "",
    sex_item: [{ value: "女", name: '女' }, { value: "男", name: '男' }],
    sex: "男",
    phone: ""
  },

  login() {
    let that = this
    wx.getUserProfile({
      desc: '获取用户信息用户登录演示', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        let wxuserinfo = res.userInfo
        console.log(wxuserinfo)
        wx.login({
          success(res) {
            if (res.code) {
              wx.request({
                url: url + 'onLogin',
                data: {
                  code: res.code
                },
                method: "POST",
                success(res) {
                  let myuserinfo = res.data.detail[0]
                  console.log(myuserinfo)
                  that.setData({
                    //拼接用户注册信息和用户信息
                    userInfo: Object.assign(myuserinfo, wxuserinfo),
                    hasUserInfo: true
                  })
                  wx.setStorageSync('user', that.data.userInfo)
                }
              })
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
      }
    })
  },

  //保存按钮点击事件
  keep: function () {
    var data = {
      name: this.data.name,
      mendian: this.data.mendian,
      dizi: this.data.dizi,
      sex: this.data.sex,
      phone: this.data.phone,
    }
    if (this.data.name != '' && this.data.mendian != '' && this.data.dizi != '' && this.data.sex != '' && this.data.phone != '') {
      wx.login({
        success(res) {
          if (res.code) {
            wx.request({
              url: url + 'register',
              data: {
                code: res.code,
                data: data
              },
              method: "POST",
              success(res) {
                wx.setStorageSync('openid', res.data.detail)
                // app.globalData.is_login = true
                wx.switchTab({
                  url: "/pages/index/index",
                })
              }
            })
          } else {
            wx.showToast({
              title: '注册失败！' + res.errMsg,
              icon: 'none',
              duration: 1000//持续的时间
            })
          }
        }
      })
    } else {
      wx.showToast({
        title: '请完善信息！',
        icon: 'none',
        duration: 1000//持续的时间
      })
    }
  },
  //输入框数据双向绑定
  xiugai: function (e) {
    if (e.currentTarget.dataset.index == 0) {
      this.data.mendian = e.detail.value
    } else if (e.currentTarget.dataset.index == 1) {
      this.data.dizi = e.detail.value
    } else if (e.currentTarget.dataset.index == 2) {
      this.data.name = e.detail.value
    } else if (e.currentTarget.dataset.index == 3) {
      this.data.phone = e.detail.value
    }
  },
  //性别数据绑定
  radioChange(e) {
    this.data.sex = e.detail.value
  },
  /**
   * 生命周期函数--监听页面加载
   */
  exit() {
    var that = this
    wx.enableAlertBeforeUnload({
      message: '尚未注册，是否退出！',
      success(res) {
        console.log(res)
      }, fail(err) {
        console.log(err)
      }, complete(sss) {
        console.log(sss)
      }
    })
  },
  onLoad: function (options) {
    this.exit()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.exitMiniProgram({
      success() {
        console.log(111)
      }, fail(err) {
        console.log(err)
      }, complete() {
        console.log(333)
      }
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})