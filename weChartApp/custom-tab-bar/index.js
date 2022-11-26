// custom-tab-bar/index.js
Component({
  data: {
    color: "#515151",
    selectedColor: "#DAA520",
    backgroundColor: "#ffffff",
    list: [
      {
        pagePath: "/pages/index/index",
        text: "工作",
        iconPath: "/images/tabbar/text.png",
        selectedIconPath: "/images/tabbar/onText.png"
      },
      {
        pagePath: "/pages/goods/goods",
        text: "助手",
        iconPath: "/images/tabbar/assistants.png",
        selectedIconPath: "/images/tabbar/onAssistants.png"
      },
      {
        bulge: true,
        pagePath: "/pages/add_goods/add_goods",
        text: "常用",
        iconPath: "/images/tabbar/add.png",
        selectedIconPath: "/images/tabbar/onAdd.png"
      },
      {
        pagePath: "/pages/good_gl/good_gl",
        text: "分析",
        iconPath: "/images/tabbar/analyse.png",
        selectedIconPath: "/images/tabbar/onAnalyse.png"
      },
      {
        pagePath: "/pages/mine/mine",
        text: "我",
        iconPath: "/images/tabbar/mine.png",
        selectedIconPath: "/images/tabbar/onMine.png"
      }
    ]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url}) 
    }
  }
})
