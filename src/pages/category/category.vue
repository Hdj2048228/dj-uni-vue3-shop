<template>
  <view class="content">
    <scroll-view scroll-y class="left-aside">
      <view
        v-for="item in categoryData.flist"
        :key="item.id"
        class="f-item b-b-b"
        :class="{ active: item.id === currentId }"
        @click="tabtap(item)"
      >
        {{ item.name }}
      </view>
    </scroll-view>
    <scroll-view
      scroll-with-animation
      scroll-y
      class="right-aside"
      :scroll-top="tabScrollTop"
      @scroll="asideScroll"
    >
      <view
        v-for="item in categoryData.slist"
        :id="'main-' + item.id"
        :key="item.id"
        class="s-list"
      >
        <text class="s-item">{{ item.name }}</text>
        <view class="t-list">
          <view
            v-for="titem in categoryData.tlist"
            v-show="titem.pid === item.id"
            :key="titem.id"
            class="t-item"
            @click="navToList(item.id, titem.id)"
          >
            <image :src="titem.picture"></image>
            <text>{{ titem.name }}</text>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script lang="ts" setup>
import { getCateApi } from '@/api.js'
const sizeCalcState = ref<boolean>(false)
const tabScrollTop = ref<number>(0)
const currentId = ref<number>(0)
type CategoryDataType = {
  flist: any[]
  slist: any[]
  tlist: any[]
}
const categoryData = reactive<CategoryDataType>({
  flist: [],
  slist: [],
  tlist: [],
})
const loadData = async () => {
  const list = await getCateApi()
  list.forEach((item) => {
    if (!item.pid) {
      categoryData.flist.push(item) //pid为父级id, 没有pid或者pid=0是一级分类
    } else if (!item.picture) {
      categoryData.slist.push(item) //没有图的是2级分类
    } else {
      categoryData.tlist.push(item) //3级分类
    }
  })
}

onLoad(() => {
  loadData()
})
//计算右侧栏每个tab的高度等信息
const calcSize = () => {
  let h = 0
  categoryData.slist.forEach((item) => {
    const view = uni.createSelectorQuery().select('#main-' + item.id)
    view
      .fields(
        {
          size: true,
        },
        (data: any) => {
          item.top = h
          h += data?.height
          item.bottom = h
        }
      )
      .exec()
  })
  sizeCalcState.value = true
}
//一级分类点击
const tabtap = (item) => {
  if (!sizeCalcState.value) {
    calcSize()
  }

  currentId.value = item.id
  const index = categoryData.slist.findIndex((sitem) => sitem.pid === item.id)
  tabScrollTop.value = categoryData.slist[index].top
}
//右侧栏滚动
const asideScroll = (e) => {
  if (!sizeCalcState.value) {
    calcSize()
  }
  const scrollTop = e.detail.scrollTop
  const tabs = categoryData.slist.filter((item) => item.top <= scrollTop).reverse()
  if (tabs.length > 0) {
    currentId.value = tabs[0].pid
  }
}
const navToList = (sid, tid) => {
  uni.navigateTo({
    url: `/pages/product/list?fid=${currentId.value}&sid=${sid}&tid=${tid}`,
  })
}
</script>

<style lang="scss">
page,
.content {
  height: 100%;
  background-color: #f8f8f8;
}

.content {
  display: flex;
}
.left-aside {
  flex-shrink: 0;
  width: 200upx;
  height: 100%;
  background-color: #fff;
}
.f-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100upx;
  font-size: 28upx;
  color: $font-color-base;
  position: relative;
  &.active {
    color: $base-color;
    background: #f8f8f8;
    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      height: 36upx;
      width: 8upx;
      background-color: $base-color;
      border-radius: 0 4px 4px 0;
      opacity: 0.8;
    }
  }
}

.right-aside {
  flex: 1;
  overflow: hidden;
  padding-left: 20upx;
}
.s-item {
  display: flex;
  align-items: center;
  height: 70upx;
  padding-top: 8upx;
  font-size: 28upx;
  color: $font-color-dark;
}
.t-list {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  background: #fff;
  padding-top: 12upx;
  &:after {
    content: '';
    flex: 99;
    height: 0;
  }
}
.t-item {
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 176upx;
  font-size: 26upx;
  color: #666;
  padding-bottom: 20upx;

  image {
    width: 140upx;
    height: 140upx;
  }
}
</style>
