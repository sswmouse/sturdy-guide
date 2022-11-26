// pages/gong_gl/gong_gl.js
const app = getApp()
const url = getApp().globalUrl.url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gong_li: [],
    all_gong: [],
  },
  //添加供货商
  to_add_gong() {
    wx.navigateTo({
      url: '/pages/new_gong/new_gong',
    })
  },
  get_gong() {
    var that = this
    wx.request({
      url: url + 'get_gong',
      data: {
        code: "code"
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        // console.log(res.data)
        that.setData({
          // gong_li:JSON.parse(res.data)
          gong_li: res.data,
          all_gong: res.data
        })
      }
    })
  },

  dele(e) {
    var that = this
    if (!app.globalData.is_login) {
      wx.showToast({
        title: '请先登录',
        icon: 'error',
        duration: 1000
      })
    } else {
      wx.showModal({
        title: '确定删除？',
        content: '',
        success: function (res) {
          if (res.confirm) {
            var id = e.currentTarget.dataset.id
            wx.request({
              url: url + 'del_peo',
              data: {
                formdata: { gong_id: id },
                para: "1"
              },
              method: "POST",
              header: {
                'content-type': 'application/json'
              },
              success(res) {
                that.get_gong()
              }
            })
          } else {
            console.log('用户点击取消')
          }
        }
      })
    }
  },

  sel_gong(e) {
    var x = e.detail.value
    var all_gong = this.data.all_gong
    var showli = []
    if (x != "") {
      for (var i = 0; i < all_gong.length; i++) {
        if (all_gong[i].gong_name.search(x) != -1 || all_gong[i].gong_tel.search(x) != -1) {
          showli.push(all_gong[i])
        }
      }
      this.setData({
        gong_li: showli
      })
    }
    else {
      this.setData({
        gong_li: this.data.all_gong
      })
    }
  },

  ch_peo(e) {
    wx.navigateTo({
      url: '/pages/ch_gong/ch_gong',
      events: {
      },
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', e.currentTarget.dataset.peo)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // 获得页面中间部位的高度
    var that = this
    const query = wx.createSelectorQuery()
    query.select('.container').boundingClientRect()
    query.select('.sousuo').boundingClientRect()
    query.select('.inps').boundingClientRect()
    query.exec(function (res) {
      var cha_zhi = res[0].height - res[1].height - res[2].height
      that.setData({
        sx: cha_zhi
      })
    })
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
    this.get_gong()
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