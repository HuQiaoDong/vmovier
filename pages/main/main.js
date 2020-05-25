// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    show: false,
    cateList: '',
    findCateList: '',
    posts: [],
    lastid: '',
    maskShow: true,
    postsHidden: false,
    elTop:'',

    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 5000,
    circular:true,
    duration: 500,
    indicator_color:'rgba(255,255,255,.3)',
    indicator_active_color:'rgba(255,255,255,.9)'
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
    this.getFindPageData();
    this.getCateList();
  },
  changeIndicatorDots() {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },

  changeAutoplay() {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },

  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },

  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  },
  routeToPostList: function (e) {
    console.log('jump', e.currentTarget.dataset);

    // let id = e.currentTarget.dataset.cateid;
    // let tab = e.currentTarget.dataset.tab;
    if (e.currentTarget.dataset.tab) {
      var tab = e.currentTarget.dataset.tab
      console.log(tab);

      wx.navigateTo({
        url: '../posts/posts?tab=' + tab,
      })
    } else {
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
  // 发现页面数据
  getFindPageData() {
    var cacheFindCateList = wx.getStorageSync('findCateList')
    if (cacheFindCateList) {
      cacheFindCateList = JSON.parse(cacheFindCateList)
      console.log(cacheFindCateList);
    }


    if (cacheFindCateList.expires > Date.now()) {
      console.log('缓存拿数据');
      console.log(this.data.posts);
      let k = cacheFindCateList.data.posts;
      // let k = this.data.posts.push(cacheFindCateList.data.posts);
      this.setData({
        findCateList: cacheFindCateList.data,
        lastid: cacheFindCateList.data.posts.lastid,
      })

      console.log('posts', this.data.posts);

    } else {
      this.setData({
        show: true
      })
      wx.request({
        url: 'https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/index/index',
        success: (response) => {
          console.log(response);
          if (response.data.data) {
            wx.setStorage({
              data: JSON.stringify({
                expires: Date.now() + 3 * 60 * 60 * 1000,
                data: response.data.data
              }),
              key: 'findCateList',
            })
            this.setData({
              findCateList: response.data.data,
              // posts:this.data.posts.push(response.data.data.posts),
              lastid: response.data.data.posts.lastid
            })
            console.log(this.data.findCateList);
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
    this.getNextPostData(this.data.lastid);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  getNextPostData(lastid) {
    console.log('下一个post', lastid);

    // this.data.scrollLoading = false;
    wx.request({
      // https://api.kele8.cn/agent/
      url: `https://api.kele8.cn/agent/http://app.vmovier.com/apiv3/index/getIndexPosts/lastid/${lastid}`,
      success: (response) => {
        if (this.data.posts.length == 0) {
          console.log('next ==> ', response.data.data);
          this.data.posts[0] = response.data.data;
          console.log(this.data.posts);
          this.setData({
            // posts:newPosts,
            posts: this.data.posts,
            lastid: response.data.data.lastid,
          })
          // this.afterSuccess(response)
          console.log('newPosts ==> ', this.data.posts);
        } else {
          console.log('第二次下拉', response.data.data);
          this.setData({
            posts: this.data.posts.concat([response.data.data]),
            lastid: response.data.data.lastid
          })
          console.log(this.data.posts);

        }
      },
      error: () => {

      },
      complete: () => {
        // this.data.scrollLoading = true;
      }

    })
  },
  routeToFindCardContentPage() {
    console.log('tap');
  },
  //获取从FindPageCard子组件传递的遮罩显示状态
  isMaskShow(e) {
    this.setData({
      maskShow: e.detail
    })
  },
  //获取从FindPageCard子组件传递的页面隐藏状态
  getShowContent(e) {
    console.log(e.detail);

    this.setData({
      postsHidden: e.detail,
      // maskShow:true,
    })
  },
  //获取从FindPageCard子组件传递的具体内容
  getPostData(e) {
    console.log(e.detail);
    if (e.detail) {
      this.setData({
        postData: e.detail,
      })
    }
  },
  backFindPage(){
    this.setData({
      postsHidden:!this.data.postsHidden,
      elTop:0
      // maskShow:
    })
  }
})