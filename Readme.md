# PullRefresh 下拉刷新
### 介绍
用于提供下拉刷新的交互操作。

### 引入
通过以下方式来全局注册组件，更多注册方式请参考[组件注册](#/zh-CN/advanced-usage#zu-jian-zhu-ce)。

```javascript
import { PullRefresh } from 'vant';

const app = createApp();
app.use(PullRefresh);
```

## 代码演示
### 基础用法
下拉刷新时会触发 `refresh` 事件，在事件的回调函数中可以进行同步或异步操作，操作完成后将 `status` 设置为 `false`，表示加载完成。

```html
<pull-refresh status="{{status}}" bind:refresh="onRefresh">
  <p>刷新次数: {{ count }}</p>

</pull-refresh>

```

```javascript
data:{
  status: false,
  count: 0
}
const onRefresh = () => {
      setTimeout(() => {
        wx.showToast('刷新成功');
        this.setData({
          status: false,
          count: this.data.status+1
        })
      }, 1000);
};
```

### 自定义提示
通过插槽可以自定义下拉刷新过程中的提示内容。

```vue
<PullRefresh headHeight="{{80}}" useSlot="{{useSlot}}" status="{{status}}" bind:refresh="refresh2" bind:change="statusChange">
  <view class="demo-van-pull-refresh">
      自定义下拉
  </view>
  <view slot="header">
    <image wx:if="{{distance < 80}}" class="doge" style="transform: scale({{distance / 80}})" src="https://fastly.jsdelivr.net/npm/@vant/assets/doge.png" mode=""/>
    <image wx:else class="doge" src="https://fastly.jsdelivr.net/npm/@vant/assets/doge-fire.jpeg" mode=""/>
  </view>
</PullRefresh>
data:{
  status: false,
  distance: 0
}
statusChange(e){
    this.setData({
      distance: e.detail.distance
    })
}
```

## API
### Props
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| status | 是否处于加载中状态 | _boolean_ | - |
| pullingText | 下拉过程提示文案 | _string_ | `下拉即可刷新...` |
| loosingText | 释放过程提示文案 | _string_ | `释放即可刷新...` |
| loadingText | 加载过程提示文案 | _string_ | `加载中...` |
| headHeight | 顶部内容高度 | _number | string_ | `50` |
| pullDistance | 触发下拉刷新的距离 | _number | string_ | 与 `head-height` 一致 |
| disabled | 是否禁用下拉刷新 | _boolean_ | `false` |
| useSlot | 是否启用插槽 | _object<useSlot>_ | - |


### useSlot
| head_Slot_ | 是否使用顶部插槽,如果启用则_loading、loosing、pulling插槽会失效_ | _boolean_ | `false` |
| --- | --- | --- | --- |
| _loadingSlot_ | 加载时的顶部插槽 | _boolean_ | `false` |
| loosingSlot | 释放时的顶部插槽 | _boolean_ | `false` |
| pullingSlot | 下拉时的顶部插槽 | _boolean_ | `false` |


### Events
| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| refresh | 下拉刷新时触发 | - |
| change | 拖动时或状态改变时触发 | _{ status: string, distance: number }_ |


### Slots
由于微信小程序无作用域插槽，无法在插槽获取_distance，所以可以通过change事件来实时获取，处理不同的逻辑_

_使用插槽时一定要配置useSlot，否则可能会产生内容异常_

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| default | 自定义内容 | - |
| pulling | 下拉过程中顶部内容 | _-_ |
| loosing | 释放过程中顶部内容 | _-_ |
| loading | 加载过程中顶部内容 | _-_ |
| header | 顶部内容 | - |


## 常见问题
### PullRefresh 的内容未填满屏幕时，只有一部分区域可以下拉？
默认情况下，下拉区域的高度是和内容高度保持一致的，如果需要让下拉区域始终为全屏，可以给 包裹内容 设置一个与屏幕大小相等的最小高度：

```html
<pull-refresh >
  <view style="min-height: 100vh;" /></view>
</pull-refresh>
```

### PullRefresh 的包裹的内容无法滚动
由于监听事件使用的是catch:touchmove 导致无法滚动，这里为什么不适用bind:touchmove, 由于bind:touchmove触发的频率很低，导致在手机端ui更新不及时产生卡顿.  如果包裹的内容需要滚动，在外层可以使用scroll-view、

```javascript
<pull-refresh>
  <scroll-view style="min-height: 100vh;" /></view>
</pull-refresh>
```

