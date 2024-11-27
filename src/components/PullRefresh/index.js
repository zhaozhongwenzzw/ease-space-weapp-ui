// index.js
const DEFAULT_HEAD_HEIGHT = 50;
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    status: { // 接收父组件传递的值
      type: Boolean,
      value: false,
    },
    disabled: {
      type: Boolean,
      value: false
    },
    pullDistance: {
      type: Number,
      value: 0
    },
    upDistance: {
      type: Number,
      value: 0
    },
    headHeight: {
      type: Number,
      value: DEFAULT_HEAD_HEIGHT
    },
    footHeight: {
      type: Number,
      value: DEFAULT_HEAD_HEIGHT
    },
    animationDuration: {
      type: Number,
      value: 300
    },
    pullingText: {
      type: String,
      value: '下拉即可刷新...'
    },
    upingText: {
      type: String,
      value: '上拉即可加载...'
    },
    loosingText: {
      type: String,
      value: '释放即可刷新...'
    },
    upLoosingText: {
      type: String,
      value: '释放即可加载...'
    },
    loadingText: {
      type: String,
      value: '加载中...'
    },
    //是否使用上拉
    isUpPull: {
      type: Boolean,
      value: false
    },
    useSlot: {
      type: Object,
      value: {
        headSlot: false,
        loadingSlot: false,
        loosingSlot: false,
        pullingSlot: false,
        footSlot: false,
        upingSlot: false,
        upLoosingSlot: false,
        upLoadingSlot: false
      }
    }
  },
  observers: {
    status(newVal) {
      // 判断是否为布尔值
      if (typeof newVal !== 'boolean') {
        console.warn(`[van-pull-refresh]: The 'status' property should be a boolean value. Received: ${typeof newVal}`);
        return; // 终止后续逻辑
      }
      if (newVal === false) {
        this.setData({
          [`state.status`]: 'normal'
        });
        this.setStatus(0, false);
      }
    }
  },
  data: {
    TEXT_STATUS: ['pulling', 'loosing', 'success'],
    state: {
      status: 'normal',
      distance: 0,
      duration: 0
    },
    startX: 0,
    startY: 0,
    deltaY: 0
  },
  methods: {
    touchstart(event) {
      this.setData({
        [`state.duration`]: 0
      })
      this.start(event);
    },
    touchmove(event) {
      this.move(event)
    },
    onTouchEnd(event) {
      this.setData({
        ['state.duration']: +this.properties.animationDuration
      })
      if (this.data.state.status === 'loosing') {
        this.setStatus(this.properties.headHeight, true);
        this.refresh();
      } else if(this.data.state.status === 'uping') {
         this.setStatus(-this.properties.footHeight, true);
         this.upRefresh();
      } else {
        this.setStatus(0);
      }
    },
    //是否处于可滑动的状态
    isTouchable() {
      return this.data.state.status !== 'loading' && this.data.state.status !== 'success' && !this.properties.disabled
    },
    start(event) {
      if (this.isTouchable()) {
        this.setData({
          startY: event.touches[0].clientY
        })
      }
    },
    move(event) {
      const touch = event.touches[0];
      this.data.deltaY = touch.clientY - this.data.startY;
      if (this.properties.isUpPull) {
          this.setStatus(this.ease(this.data.deltaY));
      }else {
        if (this.data.deltaY>= 0 && this.isTouchable()) { 
          this.setStatus(this.ease(this.data.deltaY));
        }
      }

    },
    //动画
    ease(distance) {
      const pullDistance = +(this.properties.pullDistance || this.properties.headHeight);
      // 参数调整
      const initialDamping = 0.45; // 初始阶段阻尼系数
      const secondaryDamping = 0.4; // 中间阶段阻尼系数
      const finalDamping = 0.25; // 最终阶段阻尼系数
      const maxDistance = pullDistance * 2; // 最大允许的拉动距离
      if (distance <= pullDistance) {
        // 初始阶段：线性阻尼
        return Math.round(distance * initialDamping);
      } else if (distance <= maxDistance) {
        // 中间阶段：逐步减速
        const excess = distance - pullDistance;
        return Math.round(pullDistance * initialDamping + excess * secondaryDamping);
      } else {
        // 最终阶段：极限阻尼，缓慢变化
        const excess = distance - maxDistance;
        return Math.round(pullDistance * (initialDamping + secondaryDamping) + excess * finalDamping);
      }
    }

    ,
    setStatus(distance, isLoading) {
      //获取触发下拉刷新的距离
      const pullDistance = +(this.properties.pullDistance || this.properties.headHeight);
      //获取触发上拉加载的距离
      const upDistance = +(this.properties.upDistance || this.properties.footHeight);
      this.setData({
        [`state.distance`]: distance
      })
      // todo 这里可以再优化一下触发事件的频率，现在有点频繁
      if (isLoading) {
        this.change('loading')
      } else if (distance === 0) {
        this.change('normal')
      }else if (distance < 0) {
        this.change('uping')
      } else if (distance < pullDistance) {
        this.change('pulling')
      } else {
        this.change('loosing')
      }
    },
    //下拉高度改变时
    change(status) {
      this.setData({
        [`state.status`]: status
      })
      this.triggerEvent('change', {
        status,
        distance: this.data.state.distance
      });
    },
    //下拉刷新触发时
    refresh() {
      this.triggerEvent('refresh');
    },
    //上拉刷新触发时
    upRefresh() {
      this.triggerEvent('upRefresh');
    }
  }
})
