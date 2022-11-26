// pages/dy_gl/dy_gl.js
const url = getApp().globalUrl.url
const APP = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dy_li: [],
    all_dy: []
  },
  //获取数据
  get_dy() {
    var that = this
    wx.request({
      url: url + 'get_dy',
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        // console.log(res.data)
        that.setData({
          // dy_li:JSON.parse(res.data)
          dy_li: res.data,
          all_dy: res.data
        })
      }
    })
  },
  //点击查看详情
  ch_peo(e) {
    wx.navigateTo({
      url: '/pages/ch_dy/ch_dy',
      events: {
      },
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', e.currentTarget.dataset.peo)
      }
    })
  },
  //跳转增加
  to_add() {
    if (!APP.globalData.is_login) {
      wx.showToast({
        title: '请先登录',
        icon: 'error',
        duration: 1000
      })
    } else {
      wx.navigateTo({
        url: '/pages/new_lihuo/new_lihuo',
      })
    }
  },
  //搜索
  sel_dy(e) {
    var x = e.detail.value
    var all_dy = this.data.all_dy
    var showli = []
    if (x != "") {
      for (var i = 0; i < all_dy.length; i++) {
        if (all_dy[i].dy_name.search(x) != -1) {
          showli.push(all_dy[i])
        }
      }
      this.setData({
        dy_li: showli
      })
    }
    else {
      this.setData({
        dy_li: this.data.all_dy
      })
    }
  },
  //删除
  dele(e) {
    var that = this
    if (!APP.globalData.is_login) {
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
                formdata: { dy_id: id },
                para: "3"
              },
              method: "POST",
              header: {
                'content-type': 'application/json'
              },
              success(res) {
                console.log(res.data)
                that.get_dy()
              }
            })
          } else {
            console.log("用户点了取消")
          }
        }
      })

    }
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
    this.get_dy()
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