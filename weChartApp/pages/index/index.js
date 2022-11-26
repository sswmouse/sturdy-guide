// pages/index/index.js
const APP = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图
    imgs: [APP.globalUrl.url + "images/index_banner.png", APP.globalUrl.url + "images/banner.png",APP.globalUrl.url + "images/index_banner.png"],
    imgs2: ['../../images/first.png','../../images/first.png','../../images/first.png','../../images/first.png','../../images/first.png'],
    // 选项图标，文字
    icon: [APP.globalUrl.url + "images/ruku.png", APP.globalUrl.url + "images/chuku.png", APP.globalUrl.url + "images/ks.png", APP.globalUrl.url + "images/spfl.png", APP.globalUrl.url + "images/member.png"],
    text: ['功能1', '功能2', '功能3', '功能4', '功能5','功能6', '功能7', '功能8', '功能9', '功能10'],
    url: ['/pages/ruku_gl/ruku_gl', "/pages/chuku_gl/chuku_gl", "/pages/kucun_gl/kucun_gl", "/pages/good_gl/good_gl", "/pages/people_gl/people_gl"],
    icon2: ['../../images/success.png','../../images/mail.png','../../images/inform.png','../../images/纸飞机.png','../../images/电脑.png'],
    icon3: ['../../images/success.png','../../images/文件夹.png','../../images/inform.png','../../images/纸飞机.png','../../images/电脑.png','../../images/success.png','../../images/mail.png','../../images/inform.png','../../images/纸飞机.png','../../images/电脑.png'],
    text3: ['功能A', '功能B', '功能C', '功能D', '功能E','功能F', '功能G', '功能H', '功能I', '功能J'],
    show: false
  },
  to: function () {
    wx.navigateTo({ 
      url: "/pages/goods_detail/goods_detail?id=A68" 
    })
  },
  onShowModel(e) {
    this.setData({
      show: !this.data.show
    })
    // wx.showModal({
    //   title: '提示',
    //   content: '这是一个模态弹窗',
    //   success (res) {
    //     if (res.confirm) {
    //       console.log('用户点击确定')
    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //     }
    //   }
    // })
  },
  /** nihao
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    // console.log(APP.globalUrl.url)
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
    if(APP.globalData.is_register=='true'){
      wx.showToast({
        title: '注册成功,欢迎使用！',
        icon: 'none',
        duration: 2000//持续的时间
      })
      APP.globalData.is_register='false'
    }
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
        this.getTabBar().setData({
            // 首页为 0
            selected: 0
        })
    }
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