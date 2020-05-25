// components/FindPageCard/FindPageCard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    selectionData: {
      type: Object,
    },
    elDown:{
      type:Number,
    }
  },
  observers:{
    'elDown':function(elDown){
      console.log('elDown ==> ',elDown);
      setTimeout(()=>{
        this.setData({
          elTop:elDown,
          repose:1,
        })
      },100)

    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    elTop: null,
    top: 0,
    animation: false,
    postsHidden: false,
    postData: null,
    maskShow: true,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    routeToFindCardContentPage(params) {
      console.log('tap', params.currentTarget.dataset.postid);
      this.setData({
        animation:true,
        postId: params.currentTarget.dataset.postid,
        repose:9999,
        maskShow:false,
        postsHidden:true,
      })
      this.triggerEvent('mask-show',this.data.maskShow)
      // this.triggerEvent('show-content',this.data.postsHidden)
      wx.request({
        // https://api.kele8.cn/agent/
        url: `https://api.kele8.cn/agent/https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/post/view?postid=${this.data.postId}`,
        success: (response) => {
          this.setData({
            postData: response.data.data,
          })
          console.log('kk', response.data.data);

          this.triggerEvent('trans-post-data', this.data.postData)
        },
        error: () => {

        },
        complete: () => {

        },
      })
      //上移动画
      let id = '#fd' + this.data.postId;
      console.log(id);
      var that = this;
      setTimeout(() => {
        const query = that.createSelectorQuery()
        let q = query.select(id).boundingClientRect()
        console.log(q);
        query.exec(function (res) {
          console.log(res);
          if (res[0] === null) return;

          var t = res[0].top;
          console.log(t);
          that.setData({
            elTop: t,
          })
        })

        // this.triggerEvent('mask-show',this.data.maskShow)
        // console.log(top);
      }, 0);
      setTimeout(()=>{
        // this.setData({
        //   postsHidden:true,
        // })
        // console.log(this.data.postData);
        this.goTop();
        this.triggerEvent('show-content',this.data.postsHidden)
        this.setData({
          maskShow:true,
        })
        this.triggerEvent('mask-show',this.data.maskShow)
      },800)
    },
    //回到页面顶部
    goTop: function (e) {  // 一键回到顶部
      if (wx.pageScrollTo) {
        wx.pageScrollTo({
          scrollTop: 0
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
        })
      }
    },
  }
})