const app = getApp()
const url = getApp().globalUrl.url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    kehu_li: [],
    all_kehu: []
  },

  /**
   * 生命周期函数--监听页面加载
   */

  get_kehu() {
    var that = this
    wx.request({
      url: url + 'get_kehu',
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        // console.log(res.data)
        that.setData({
          // kehu_li:JSON.parse(res.data)
          kehu_li: res.data,
          all_kehu: res.data
        })
      }
    })
  },
  to_add() {
    if (!app.globalData.is_login) {
      wx.showToast({
        title: '请先登录',
        icon: 'error',
        duration: 1000
      })
    } else {
      wx.navigateTo({
        url: '/pages/new_kehu/new_kehu',
      })
    }
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
                formdata: { kehu_id: id },
                para: "2"
              },
              method: "POST",
              header: {
                'content-type': 'application/json'
              },
              success(res) {
                that.get_kehu()
              }
            })
          } else {
            console.log("用户点了取消")
          }
        }
      })
    }
  },

  sel_kehu(e) {
    var x = e.detail.value
    var all_kehu = this.data.all_kehu
    var showli = []
    if (x != "") {
      for (var i = 0; i < all_kehu.length; i++) {
        if (all_kehu[i].kehu_name.search(x) != -1 || all_kehu[i].kehu_tel.search(x) != -1) {
          showli.push(all_kehu[i])
        }
      }
      this.setData({
        kehu_li: showli
      })
    }
    else {
      this.setData({
        kehu_li: this.data.all_kehu
      })
    }
  },

  ch_peo(e) {
    wx.navigateTo({
      url: '/pages/ch_kehu/ch_kehu',
      events: {
      },
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', e.currentTarget.dataset.peo)
      }
    })
  },

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
    this.get_kehu()
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