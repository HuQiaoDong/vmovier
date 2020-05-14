// components/navBar/navBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    routerData:{
      type:String,
      value:''
    }
  },
  lifetimes:{
    onShow:function(){
      console.log('navBar被显示');
      // console.log(this.data.router);
      console.log(this);
      
    },
    onLoad:function(){
      console.log('navBar被加载');
      console.log(this);
      
    }
  },
  observers:{
    'routerData':function(routerData){
      console.log('gg',this.data.routerData);
      if(this.data.routerData == 'pages/find/find'){
        this.setData({
          sliderIndex:'left',
        })
      }
      else if(this.data.routerData == 'pages/channel/channel'){
        this.setData({
          sliderIndex:'middle',
        })
      }
      else if(this.data.routerData == 'pages/aboutme/aboutme'){
        this.setData({
          sliderIndex:'right',
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentTap:'find',
    sliderIndex:'right',
 
  },

  /**
   * 组件的方法列表
   */
  methods: {
  //   onChange(event) {
  //     wx.showToast({
  //       title: `切换到标签 ${event.detail.name}`,
  //       icon: 'none',
  //     });

  //     if(event.detail.name==1){
  //       wx.switchTab({
  //         url: '../../pages/find/find',
  //       })
  //     }
  //     else if(event.detail.name == 0){
  //       wx.switchTab({
  //         url: '../../pages/channel/channel',
  //       })
  //     }
  //     else if(event.detail.name == 2){
  //       wx.switchTab({
  //         url: '../../pages/aboutme/aboutme',
  //       })
  //     }
  //   },
  //   toFindPage(){
  //     console.log('find');
      
  //     wx.switchTab({
  //       url: '../../pages/find/find',
  //     })
  //   },
  //   toChannelPage(){
  //     console.log('channel');
      
  //     wx.switchTab({
  //       url: '../../pages/channel/channel',
  //     })
  //   }
  }
})
