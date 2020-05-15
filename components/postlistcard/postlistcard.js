// components/postlistcard/postlistcard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cardData: {
      type: Object,
    },
    elId: {
      type: String,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    elTop: null,
    top:0,
    animation:false,
    postsHidden:false,
    postData:null,
    maskShow:true,
  },

  /**
   * 组件的方法列表
   */
  methods: {
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
    routeToContentPage(e) {
      console.log(e, e.currentTarget.dataset.card);
      this.setData({
        postId: e.currentTarget.dataset.card.postid,
        repose:9999,
      })
      wx.request({
        // https://api.kele8.cn/agent/
        url: `https://app.vmovier.com/apiv3/post/view?postid=${this.data.postId}`,
        success:(response)=>{
          this.setData({
            postData:response.data.data,
          })
          this.triggerEvent('trans-post-data',this.data.postData)
        },
        error:()=>{

        },
        complete:()=>{

        },
      })
      let id = '#' + this.data.elId;
      console.log(id);
      var that = this;
      setTimeout(()=>{
        const query = wx.createSelectorQuery()
        query.select(id).boundingClientRect()
        // console.log(query.selectViewport);
        query.exec((res) => {
          if(res[0] === null) return;
          console.log(res);
          var t = res[0].top;
          console.log(t);
          that.setData({
            elTop: t,
          })
        });
        this.triggerEvent('mask-show',this.data.maskShow)
        // console.log(top);
      },500);

      // setTimeout(()=>{
      //   let time = setInterval(()=>{
      //     console.log(this.data.elTop);
          
      //     if (this.data.top <= -this.data.elTop) {
      //       clearInterval(time);
      //       // wx.navigateTo({
      //       //   url: '../../pages/content/content',
      //       // })
      //       return;
      //     }else{
      //       this.setData({
      //         top:this.data.top - 1
      //       })
      //     }

      //   },4)
      // },600)
    }
  },
  observers:{
    'elTop':function(elTop){
      console.log(elTop);
      this.setData({
        animation:true
      })
      console.log(this.data.animation);
      setTimeout(()=>{
        this.setData({
          postsHidden:true,
        })
        console.log(this.data.postData);
        this.goTop();
        this.triggerEvent('show-content',this.data.postsHidden)
      },800)
    }
  }
})