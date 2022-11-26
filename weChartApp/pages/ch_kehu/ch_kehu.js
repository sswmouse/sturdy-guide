// pages/ch_gong/ch_gong.js
const app=getApp()
const url = getApp().globalUrl.url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    peo:{}
  },

  pull() {
    console.log(this.data.peo)
    if (!app.globalData.is_login) {
      wx.showToast({
        title: '请先登录',
        icon: 'error',
        duration: 1000
      })
    } else if (this.data.peo.kehu_house != '' && this.data.peo.kehu_name != '' && this.data.peo.kehu_tel != '') {
      var that = this
      wx.request({
        url: url + 'ch_peo',
        data: {
          formdata: that.data.peo,
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
    var that=this
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
      that.setData({
        peo:data
      })
    })
  },

  input1(e){
    this.data.peo.kehu_house=e.detail.value
  },

  input2(e){
    this.data.peo.kehu_name=e.detail.value
  },

  input3(e){
    this.data.peo.kehu_tel=e.detail.value
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