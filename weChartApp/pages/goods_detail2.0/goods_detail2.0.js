// pages/goods_detail2.0/goods_detail2.0.js
var url = getApp().globalUrl.url
var APP = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let b = options.formdata
    b = b.replace(/\\/g, "");
    b = b.replace(/:"\[/g, ":[");
    b = b.replace(/\]"/g, "]");
    this.setData({
      formdata: JSON.parse(b)
    })
    console.log(this.data.formdata)
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