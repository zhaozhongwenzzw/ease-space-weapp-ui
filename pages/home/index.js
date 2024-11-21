// pages/home/index.js
import  { navConfig } from './navConfig'
import { logo1 } from './logo'
const DEMOBASEURL = '/pages/demo/'
const arrowRight = 
Page({

  /**
   * 页面的初始数据
   */
  data: {
     config: navConfig,
     demoBaseUrl:DEMOBASEURL,
     ArrowRight: '',
     logo1: '',
     logo2: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.setData({
      ArrowRight: this.ArrowRightSvg(),
      logo1: this.getSvgImage(logo1)
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  getSvgImage(svg) {
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  },
  ArrowRightSvg(color = '#eaeaea') {
    const svgXml = `<svg viewBox="0 0 1024 1024" width="135" height="140" xmlns="http://www.w3.org/2000/svg">
    <path
      fill="#B6C3D2"
      d="M601.1 556.5L333.8 289.3c-24.5-24.5-24.5-64.6 0-89.1s64.6-24.5 89.1 0l267.3 267.3c24.5 24.5 24.5 64.6 0 89.1-24.5 24.4-64.6 24.4-89.1-.1z"
    />
    <path
      fill="#B6C3D2"
      d="M690.2 556.5L422.9 823.8c-24.5 24.5-64.6 24.5-89.1 0s-24.5-64.6 0-89.1l267.3-267.3c24.5-24.5 64.6-24.5 89.1 0 24.5 24.6 24.5 64.6 0 89.1z"
    />
    </svg>`;
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgXml)}`;
  },
})