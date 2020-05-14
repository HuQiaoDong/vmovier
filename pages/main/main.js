// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 1,
    show: false,
    cateList: ''
  },
  // onClickShow() {
  //   this.setData({ show: true });
  // },

  // onClickHide() {
  //   this.setData({ show: false });
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCateList();
  },
  routeToPostList:function(e){
    console.log('jump',e.currentTarget.dataset);
 
    // let id = e.currentTarget.dataset.cateid;
    // let tab = e.currentTarget.dataset.tab;
    if (e.currentTarget.dataset.tab) {
      var tab = e.currentTarget.dataset.tab
      console.log(tab);
      
      wx.navigateTo({
        url: '../posts/posts?tab=' + tab,
      })
    }
    else{
      var id = e.currentTarget.dataset.cateid
      console.log(id);
      
      wx.navigateTo({
        url: '../posts/posts?id=' + id,
      })
    }

  },
  getCateList: function () {

    var cacheCateList = wx.getStorageSync('cateList')
    if (cacheCateList) {
      cacheCateList = JSON.parse(cacheCateList)
      console.log(cacheCateList);
    }


    if (cacheCateList.expires > Date.now()) {
      console.log('缓存拿数据');

      this.setData({
        cateList: cacheCateList.data
      })
    } else {
      this.setData({
        show: true
      })
      wx.request({
        url: 'https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/cate/getList',
        success: (response) => {
          console.log(response);
          if (response.data.data) {
            wx.setStorage({
              data: JSON.stringify({
                expires: Date.now() + 3 * 60 * 60 * 1000,
                data: response.data.data
              }),
              key: 'cateList',
            })
            this.setData({
              cateList: response.data.data
            })
            console.log(this.data.cateList);
          } else {
            console.log('数据返回成功，但数据有误');
          }

        },
        error: (error) => {

        },
        complete: () => {
          this.setData({
            show: false
          })
        },
      })
    }

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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