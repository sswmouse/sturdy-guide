// pages/em_good_lei/em_good_lei.js
const url = getApp().globalUrl.url
const APP = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bk_div: 0,
    name: '',
    id: '',
  },
  pull() {
    if (!APP.globalData.is_login) {
      wx.showToast({
        title: '请先登录',
        icon: 'error',
        duration: 1000
      })
    } else {
      var that = this
      if (this.data.id != '' && this.data.name != '') {
        wx.request({
          url: url + 'add_classify',
          data: {
            id: that.data.id,
            name: that.data.name
          },
          method: "post",
          success(res) {
            console.log(res)
            if (res.data.code == 0) {
              console.log('商品类别添加成功')
              that.setData({
                bk_div: 1
              })
            } else {
              wx.showToast({
                title: '商品类别添加失败,排序重复', //提示文字
                icon: 'none', //弹出样式
                duration: 2000 //持续的时间
              })
              console.log('商品类别添加失败')
            }
          }
        })
      } else {
        wx.showToast({
          title: '商品类别添加失败,请输入合法数据', //提示文字
          icon: 'none', //弹出样式
          duration: 2000 //持续的时间
        })
      }
    }
  },
  bindinput1: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  bindinput2: function (e) {
    var reg = /^[1-9]+[0-9]*]*$/;
    if (reg.test(e.detail.value)) {
      this.setData({
        id: e.detail.value
      })
    }
  },

  xxx() {
    this.setData({
      bk_div: 0
    })
    wx.navigateBack({
      delta: 1,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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