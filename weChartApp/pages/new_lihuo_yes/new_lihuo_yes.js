// pages/new_lihuo_yes/new_lihuo_yes.js
const url = getApp().globalUrl.url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formdata: { dy_right: "理货员", dy_name: "", dy_tel: "" }
  },

  pull() {
    if (this.data.formdata.dy_name.indexOf("'") != -1 || this.data.formdata.dy_tel.indexOf("'") != -1) {
      wx.showToast({
        title: '输入内容中请不要包含引号！',
        icon: 'none',
        duration: 1000
      })
    } else if (this.data.formdata.dy_name != '' && this.data.formdata.dy_tel != '') {
      var that = this
      wx.request({
        url: url + 'add_peo',
        data: {
          formdata: that.data.formdata,
          para: "3"
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
  // pull(){
  //   var that=this
  //   console.log(this.data.formdata)
  //   wx.request({
  //     url: url+'add_peo',
  //     data: {
  //       formdata:that.data.formdata,
  //       para:"3"
  //     },
  //     method:"POST",
  //     header: {
  //       'content-type': 'application/json'
  //     },
  //     success (res) {
  //       console.log(res.data)
  //     }
  //   })
  //   wx.navigateBack({
  //     delta: 1
  //   })
  // },

  input1(e) {
    this.data.formdata.dy_name = e.detail.value
  },

  input2(e) {
    this.data.formdata.dy_tel = e.detail.value
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