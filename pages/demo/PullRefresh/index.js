// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const DEFAULT_HEAD_HEIGHT = 170;
Page({
  data: {
    active:0,
    status: false,
    headHeight: 170,
    count: 0,
    distance: 0,
    useSlot: {
      headSlot: true
    }
  },
  onChange(event) {
    wx.showToast({
      title: `切换到标签 ${event.detail.name}`,
      icon: 'none',
    });
  },
  statusChange(e){
    this.setData({
      distance: e.detail.distance>80 ? 80: e.detail.distance
    })
  },
  refresh1(){
    setTimeout(() => {
      wx.showToast({
        title: '刷新成功'
      });
      this.setData({
        status: false,
        count: this.data.count+1
      })
    }, 1000);
  },
  refresh2(){
    setTimeout(() => {
      this.setData({
        status: false
      })
    }, 1000);
  },
  refresh(){
    setTimeout(()=>{
      this.setData({
        status: false
      })
    },2000)
  }
})
