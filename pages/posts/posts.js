// pages/posts/posts.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cateData: [],
    page: 1,
    cateId: null,
    scrollLoading: true,
    isEnd: false,

    toView: 'green'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    if (options.tab) {
      this.setData({
        tab:options.tab,
      })
      this.getPostByTab(this.data.tab)
    } else if (options.id) {
      this.setData({
        cateId: options.id
      })
      this.getPostCardInfo(this.data.cateId)
    }
  },
  afterSuccess(response) {
    console.log(response);

    if (response.data.msg == "没有更多内容了") {
      console.log('没有更多内容了');

      this.setData({
        isEnd: true,
        scrollLoading: true,
      })
      console.log('触底' + this.data.isEnd, '加载' + this.data.scrollLoading);

    } else {
      this.setData({
        scrollLoading: false,
      })
      console.log(response);
      this.setData({
        cateData: this.data.cateData.concat(response.data.data)
      })
      console.log(this.data.cateData);
    }
  },
  getShowContent(e){
    console.log('gggkkk');
    console.log(e.detail);
    
    this.setData({
      postsHidden:e.detail,
    })
  },
  getPostData(e){
    console.log(e.detail);
    if (e.detail) {
      this.setData({
        postData:e.detail,
      })
    }
  },
  getPostCardInfo(id) {
    this.data.scrollLoading = true;
    wx.request({
      // https://api.kele8.cn/agent/
      url: 'https://app.vmovier.com/apiv3/post/getPostInCate?p=' + this.data.page + '&size=10&cateid=' + id,
      success: (response) => {
        this.afterSuccess(response)
      },
      error: () => {

      },
      complete: () => {}

    })
  },
  getPostByTab(tab) {
    this.data.scrollLoading = true;
    wx.request({
      url: 'https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/post/getPostByTab?p=' + this.data.page + '&size=10&tab=' + tab,
      success: (response) => {
        this.afterSuccess(response)
      },
      error: () => {

      },
      complete: () => {}

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
    if (this.data.isEnd == false) {
      console.log('触底加载');
      this.setData({
        page: this.data.page + 1,
      })
      console.log(this.data.page);

      this.getPostCardInfo(this.data.cateId)
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: 'scroll-view',
      path: 'page/component/pages/scroll-view/scroll-view'
    }
  },
  isMaskShow(e){
    this.setData({
      maskShow:e.detail
    }) 
  },
  // 横向滚动
  upper(e) {
    console.log(e)
  },

  lower(e) {
    console.log(e)
  },

  scroll(e) {
    console.log(e)
  },

  scrollToTop() {
    this.setAction({
      scrollTop: 0
    })
  },

  tap() {
    for (let i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1],
          scrollTop: (i + 1) * 200
        })
        break
      }
    }
  },

  tapMove() {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  }
})