// pages/new_kehu/new_kehu.js
const url = getApp().globalUrl.url
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formdata:{kehu_house:"",kehu_name:"",kehu_tel:""}
  },

  input1(e){
    this.data.formdata.kehu_house=e.detail.value
  },

  input2(e){
    this.data.formdata.kehu_name=e.detail.value
  },

  input3(e){
    this.data.formdata.kehu_tel=e.detail.value
  },



  pull() {
    console.log(this.data.formdata)
    if (!app.globalData.is_login) {
      wx.showToast({
        title: '请先登录',
        icon: 'error',
        duration: 1000
      })
    } else if (this.data.formdata.kehu_house != '' && this.data.formdata.kehu_name != '' && this.data.formdata.kehu_tel != '') {
      var that = this
      wx.request({
        url: url + 'add_peo',
        data: {
          formdata: that.data.formdata,
          para:"2"
        },
        method: "POST",
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          console.log(res.data)
        }
      })
      wx.navigateBack({
        delta: 1
      })
    } else {
      wx.showToast({
        title: '请完善信息',
        icon: 'error',
        duration: 1000
      })
    }
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