// pages/commodity/Badge/index.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    content: {
      type: Number | String,
      value: ''
    },
    useSlot: {
      type: Object,
      value: {
        content: false
      }
    },
    position: {
      type: 'top-left'| 'bottom-left' |'bottom-right' |'top-right',
      value: 'top-right'
    },
    offset: {
      type: Array,
      value: [],
      observer: function(newVal){
        this.setData({
          style: this.setStyle(newVal)
        })
      }
    },
    badgeStyle: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    style: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setStyle (offset){
      function addUnit(value){
        return value + 'rpx'
      }
      let style = {};
      if (offset) {
        const [x, y] = offset;
        const { position } = this.properties;
        const [offsetY, offsetX] = position.split('-');
        if (typeof y === 'number') {
          style[offsetY] = addUnit(offsetY === 'top' ? y : -y);
          console.log(offsetY);
        } 
        if (typeof x === 'number') {
          style[offsetX] = addUnit(offsetX === 'left' ? x : -x);
        }
      }
      let result = ''
      for (const key in style) {
        result+=`${key}: ${style[key]};`
      }
      return result
    }
  }
})