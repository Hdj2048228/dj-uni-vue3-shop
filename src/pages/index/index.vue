<template>
  <view class="container">
    <!-- 小程序头部兼容 -->
    <!-- #ifdef MP -->
    <view class="mp-search-box">
      <input class="ser-input" type="text" value="输入关键字搜索" />
    </view>
    <!-- #endif -->
    <!-- 头部轮播 -->
    <view class="carousel-section">
      <!-- 标题栏和状态栏占位符 -->
      <view class="titleNview-placing"></view>
      <!-- 背景色区域 -->
      <view class="titleNview-background" :style="{ backgroundColor: titleNViewBackground }"></view>
      <swiper class="carousel" circular @change="swiperChange">
        <swiper-item
          v-for="(item, index) in cgList.carouselList"
          :key="index"
          class="carousel-item"
          @click="navToDetailPage({ title: '轮播广告' })"
        >
          <image :src="item.src" />
        </swiper-item>
      </swiper>
      <!-- 自定义swiper指示器 -->
      <view class="swiper-dots">
        <text class="num">{{ swiperCurrent + 1 }}</text>
        <text class="sign">/</text>
        <text class="num">{{ swiperLength }}</text>
      </view>
    </view>
    <!-- 分类 -->
    <view class="cate-section">
      <view class="cate-item">
        <image src="/static/temp/c3.png"></image>
        <text>环球美食</text>
      </view>
      <view class="cate-item">
        <image src="/static/temp/c5.png"></image>
        <text>个护美妆</text>
      </view>
      <view class="cate-item">
        <image src="/static/temp/c6.png"></image>
        <text>营养保健</text>
      </view>
      <view class="cate-item">
        <image src="/static/temp/c7.png"></image>
        <text>家居厨卫</text>
      </view>
      <view class="cate-item">
        <image src="/static/temp/c8.png"></image>
        <text>速食生鲜</text>
      </view>
    </view>

    <view class="ad-1">
      <image src="/static/temp/ad1.jpg" mode="scaleToFill"></image>
    </view>

    <!-- 秒杀楼层 -->
    <view class="seckill-section m-t">
      <view class="s-header">
        <image class="s-img" src="/static/temp/secskill-img.jpg" mode="widthFix"></image>
        <text class="tip">8点场</text>
        <text class="hour timer">07</text>
        <text class="minute timer">13</text>
        <text class="second timer">55</text>
        <text class="yticon icon-you"></text>
      </view>
      <scroll-view class="floor-list" scroll-x>
        <view class="scoll-wrapper">
          <view
            v-for="(item, index) in cgList.goodsList"
            :key="index"
            class="floor-item"
            @click="navToDetailPage(item)"
          >
            <image :src="item?.image" mode="aspectFill"></image>
            <text class="title clamp">{{ item.title }}</text>
            <text class="price">￥{{ item.price }}</text>
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- 团购楼层 -->
    <view class="f-header m-t">
      <image src="/static/temp/h1.png"></image>
      <view class="tit-box">
        <text class="tit">精品团购</text>
        <text class="tit2">Boutique Group Buying</text>
      </view>
      <text class="yticon icon-you"></text>
    </view>
    <view class="group-section">
      <swiper class="g-swiper" :duration="500">
        <swiper-item
          v-for="(item, index) in cgList.goodsList"
          v-show="index % 2 === 0"
          :key="index"
          class="g-swiper-item"
          @click="navToDetailPage(item)"
        >
          <view class="g-item left">
            <image :src="item.image" mode="aspectFill"></image>
            <view class="t-box">
              <text class="title clamp">{{ item.title }}</text>
              <view class="price-box">
                <text class="price">￥{{ item.price }}</text>
                <text class="m-price">￥188</text>
              </view>

              <view class="pro-box">
                <view class="progress-box">
                  <progress percent="72" activeColor="#fa436a" active stroke-width="6" />
                </view>
                <text>6人成团</text>
              </view>
            </view>
          </view>
          <view v-if="index < cgList.goodsList.length - 1" class="g-item right">
            <image :src="cgList.goodsList[index + 1].image" mode="aspectFill"></image>
            <view class="t-box">
              <text class="title clamp">{{ cgList.goodsList[index + 1].title }}</text>
              <view class="price-box">
                <text class="price">￥{{ cgList.goodsList[index + 1].price }}</text>
                <text class="m-price">￥188</text>
              </view>
              <view class="pro-box">
                <view class="progress-box">
                  <progress percent="72" activeColor="#fa436a" active stroke-width="6" />
                </view>
                <text>10人成团</text>
              </view>
            </view>
          </view>
        </swiper-item>
      </swiper>
    </view>

    <!-- 分类推荐楼层 -->
    <view class="f-header m-t">
      <image src="/static/temp/h1.png"></image>
      <view class="tit-box">
        <text class="tit">分类精选</text>
        <text class="tit2">Competitive Products For You</text>
      </view>
      <text class="yticon icon-you"></text>
    </view>
    <view class="hot-floor">
      <view class="floor-img-box">
        <image class="floor-img" :src="defaultImage" mode="scaleToFill"></image>
      </view>
      <scroll-view class="floor-list" scroll-x>
        <view class="scoll-wrapper">
          <view
            v-for="(item, index) in cgList.goodsList"
            :key="index"
            class="floor-item"
            @click="navToDetailPage(item)"
          >
            <image :src="item.image" mode="aspectFill"></image>
            <text class="title clamp">{{ item.title }}</text>
            <text class="price">￥{{ item.price }}</text>
          </view>
          <view class="more">
            <text>查看全部</text>
            <text>More+</text>
          </view>
        </view>
      </scroll-view>
    </view>
    <view class="hot-floor">
      <view class="floor-img-box">
        <image class="floor-img" :src="defaultImage" mode="scaleToFill"></image>
      </view>
      <scroll-view class="floor-list" scroll-x>
        <view class="scoll-wrapper">
          <view
            v-for="(item, index) in cgList.goodsList"
            :key="index"
            class="floor-item"
            @click="navToDetailPage(item)"
          >
            <image :src="item.image3" mode="aspectFill"></image>
            <text class="title clamp">{{ item.title }}</text>
            <text class="price">￥{{ item.price }}</text>
          </view>
          <view class="more">
            <text>查看全部</text>
            <text>More+</text>
          </view>
        </view>
      </scroll-view>
    </view>
    <view class="hot-floor">
      <view class="floor-img-box">
        <image class="floor-img" :src="defaultImage" mode="scaleToFill"></image>
      </view>
      <scroll-view class="floor-list" scroll-x>
        <view class="scoll-wrapper">
          <view
            v-for="(item, index) in cgList.goodsList"
            :key="index"
            class="floor-item"
            @click="navToDetailPage(item)"
          >
            <image :src="item.image2" mode="aspectFill"></image>
            <text class="title clamp">{{ item.title }}</text>
            <text class="price">￥{{ item.price }}</text>
          </view>
          <view class="more">
            <text>查看全部</text>
            <text>More+</text>
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- 猜你喜欢 -->
    <view class="f-header m-t">
      <image src="/static/temp/h1.png"></image>
      <view class="tit-box">
        <text class="tit">猜你喜欢</text>
        <text class="tit2">Guess You Like It</text>
      </view>
      <text class="yticon icon-you"></text>
    </view>

    <view class="guess-section">
      <view
        v-for="(item, index) in cgList.goodsList"
        :key="index"
        class="guess-item"
        @click="navToDetailPage(item)"
      >
        <view class="image-wrapper">
          <image :src="item.image" mode="aspectFill"></image>
        </view>
        <text class="title clamp">{{ item.title }}</text>
        <text class="price">￥{{ item.price }}</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { getCarouselListApi, getGoodListApi } from '@/api.js'
import { useDefaultImage } from '@/hooks/useDefaultImage'
const titleNViewBackground = ref<string>('')
const { defaultImage } = useDefaultImage()
let swiperCurrent = ref<number>(0)
type IndexDataType = {
  carouselList: []
  goodsList: []
}
const cgList = reactive<IndexDataType>({
  carouselList: [],
  goodsList: [],
})

let swiperLength = 0
const loadData = async () => {
  const c = await getCarouselListApi()
  titleNViewBackground.value = c[0].background
  swiperLength = c.length
  cgList.carouselList = c
  const gL = await getGoodListApi()
  cgList.goodsList = gL || []
}
//轮播图切换修改背景色
const swiperChange = (e) => {
  const index = e.detail.current
  swiperCurrent = index
  titleNViewBackground.value = carouselList[index].background
}
//详情页
const navToDetailPage = (item) => {
  //测试数据没有写id，用title代替
  const id = item.title
  uni.navigateTo({
    url: `/pages/product/product?id=${id}`,
  })
}
onLoad(() => {
  loadData()
})
// #ifndef MP
// 标题栏input搜索框点击
onNavigationBarSearchInputClicked(async function (e) {
  await console.log(e, 'onNavigationBarSearchInputClicked')
})
//点击导航栏 buttons 时触发
onNavigationBarButtonTap((e: any) => {
  const index = e.index
  if (index === 0) {
    console.log('点击了扫描')
  } else if (index === 1) {
    // #ifdef APP-PLUS
    const pages = getCurrentPages()
    const page = pages[pages.length - 1]
    const currentWebview = page.$getAppWebview()
    currentWebview.hideTitleNViewButtonRedDot({
      index,
    })
    // #endif
    uni.navigateTo({
      url: '/pages/notice/notice',
    })
  }
})

// #endif
</script>

<style lang="scss">
/* #ifdef MP */
.mp-search-box {
  position: absolute;
  left: 0;
  top: 30upx;
  z-index: 9999;
  width: 100%;
  padding: 0 80upx;
  .ser-input {
    flex: 1;
    height: 56upx;
    line-height: 56upx;
    text-align: center;
    font-size: 28upx;
    color: $font-color-base;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.6);
  }
}
page {
  .cate-section {
    position: relative;
    z-index: 5;
    border-radius: 16upx 16upx 0 0;
    margin-top: -20upx;
  }
  .carousel-section {
    padding: 0;
    .titleNview-placing {
      padding-top: 0;
      height: 0;
    }
    .carousel {
      .carousel-item {
        padding: 0;
      }
    }
    .swiper-dots {
      left: 45upx;
      bottom: 40upx;
    }
  }
}
/* #endif */

page {
  background: #f5f5f5;
}
.m-t {
  margin-top: 16upx;
}
/* 头部 轮播图 */
.carousel-section {
  position: relative;
  padding-top: 10px;

  .titleNview-placing {
    height: var(--status-bar-height);
    padding-top: 44px;
    box-sizing: content-box;
  }

  .titleNview-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 426upx;
    transition: 0.4s;
  }
}
.carousel {
  width: 100%;
  height: 350upx;

  .carousel-item {
    width: 100%;
    height: 100%;
    padding: 0 28upx;
    overflow: hidden;
  }

  image {
    width: 100%;
    height: 100%;
    border-radius: 10upx;
  }
}
.swiper-dots {
  display: flex;
  position: absolute;
  left: 60upx;
  bottom: 15upx;
  width: 72upx;
  height: 36upx;

  .num {
    width: 36upx;
    height: 36upx;
    border-radius: 50px;
    font-size: 24upx;
    color: #fff;
    text-align: center;
    line-height: 36upx;
  }

  .sign {
    position: absolute;
    top: 0;
    left: 50%;
    line-height: 36upx;
    font-size: 12upx;
    color: #fff;
    transform: translateX(-50%);
  }
}
/* 分类 */
.cate-section {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  padding: 30upx 22upx;
  background: #fff;
  .cate-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: $font-sm + 2upx;
    color: $font-color-dark;
  }
  /* 原图标颜色太深,不想改图了,所以加了透明度 */
  image {
    width: 88upx;
    height: 88upx;
    margin-bottom: 14upx;
    border-radius: 50%;
    opacity: 0.7;
    box-shadow: 4upx 4upx 20upx rgba(250, 67, 106, 0.3);
  }
}
.ad-1 {
  width: 100%;
  height: 210upx;
  padding: 10upx 0;
  background: #fff;
  image {
    width: 100%;
    height: 100%;
  }
}
/* 秒杀专区 */
.seckill-section {
  padding: 4upx 30upx 24upx;
  background: #fff;
  .s-header {
    display: flex;
    align-items: center;
    height: 92upx;
    line-height: 1;
    .s-img {
      width: 140upx;
      height: 30upx;
    }
    .tip {
      font-size: $font-base;
      color: $font-color-light;
      margin: 0 20upx 0 40upx;
    }
    .timer {
      display: inline-block;
      width: 40upx;
      height: 36upx;
      text-align: center;
      line-height: 36upx;
      margin-right: 14upx;
      font-size: $font-sm + 2upx;
      color: #fff;
      border-radius: 2px;
      background: rgba(0, 0, 0, 0.8);
    }
    .icon-you {
      font-size: $font-lg;
      color: $font-color-light;
      flex: 1;
      text-align: right;
    }
  }
  .floor-list {
    white-space: nowrap;
  }
  .scoll-wrapper {
    display: flex;
    align-items: flex-start;
  }
  .floor-item {
    width: 150upx;
    margin-right: 20upx;
    font-size: $font-sm + 2upx;
    color: $font-color-dark;
    line-height: 1.8;
    image {
      width: 150upx;
      height: 150upx;
      border-radius: 6upx;
    }
    .price {
      color: $uni-color-primary;
    }
  }
}

.f-header {
  display: flex;
  align-items: center;
  height: 140upx;
  padding: 6upx 30upx 8upx;
  background: #fff;
  image {
    flex-shrink: 0;
    width: 80upx;
    height: 80upx;
    margin-right: 20upx;
  }
  .tit-box {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .tit {
    font-size: $font-lg + 2upx;
    color: #font-color-dark;
    line-height: 1.3;
  }
  .tit2 {
    font-size: $font-sm;
    color: $font-color-light;
  }
  .icon-you {
    font-size: $font-lg + 2upx;
    color: $font-color-light;
  }
}
/* 团购楼层 */
.group-section {
  background: #fff;
  .g-swiper {
    height: 650upx;
    padding-bottom: 30upx;
  }
  .g-swiper-item {
    width: 100%;
    padding: 0 30upx;
    display: flex;
  }
  image {
    width: 100%;
    height: 460upx;
    border-radius: 4px;
  }
  .g-item {
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .left {
    flex: 1.2;
    margin-right: 24upx;
    .t-box {
      padding-top: 20upx;
    }
  }
  .right {
    flex: 0.8;
    flex-direction: column-reverse;
    .t-box {
      padding-bottom: 20upx;
    }
  }
  .t-box {
    height: 160upx;
    font-size: $font-base + 2upx;
    color: $font-color-dark;
    line-height: 1.6;
  }
  .price {
    color: $uni-color-primary;
  }
  .m-price {
    font-size: $font-sm + 2upx;
    text-decoration: line-through;
    color: $font-color-light;
    margin-left: 8upx;
  }
  .pro-box {
    display: flex;
    align-items: center;
    margin-top: 10upx;
    font-size: $font-sm;
    color: $font-base;
    padding-right: 10upx;
  }
  .progress-box {
    flex: 1;
    border-radius: 10px;
    overflow: hidden;
    margin-right: 8upx;
  }
}
/* 分类推荐楼层 */
.hot-floor {
  width: 100%;
  overflow: hidden;
  margin-bottom: 20upx;
  .floor-img-box {
    width: 100%;
    height: 320upx;
    position: relative;
    &:after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(rgba(255, 255, 255, 0.06) 30%, #f8f8f8);
    }
  }
  .floor-img {
    width: 100%;
    height: 100%;
  }
  .floor-list {
    white-space: nowrap;
    padding: 20upx;
    padding-right: 50upx;
    border-radius: 6upx;
    margin-top: -140upx;
    margin-left: 30upx;
    background: #fff;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
    position: relative;
    z-index: 1;
  }
  .scoll-wrapper {
    display: flex;
    align-items: flex-start;
  }
  .floor-item {
    width: 180upx;
    margin-right: 20upx;
    font-size: $font-sm + 2upx;
    color: $font-color-dark;
    line-height: 1.8;
    image {
      width: 180upx;
      height: 180upx;
      border-radius: 6upx;
    }
    .price {
      color: $uni-color-primary;
    }
  }
  .more {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    flex-shrink: 0;
    width: 180upx;
    height: 180upx;
    border-radius: 6upx;
    background: #f3f3f3;
    font-size: $font-base;
    color: $font-color-light;
    text:first-child {
      margin-bottom: 4upx;
    }
  }
}
/* 猜你喜欢 */
.guess-section {
  display: flex;
  flex-wrap: wrap;
  padding: 0 30upx;
  background: #fff;
  .guess-item {
    display: flex;
    flex-direction: column;
    width: 48%;
    padding-bottom: 40upx;
    &:nth-child(2n + 1) {
      margin-right: 4%;
    }
  }
  .image-wrapper {
    width: 100%;
    height: 330upx;
    border-radius: 3px;
    overflow: hidden;
    image {
      width: 100%;
      height: 100%;
      opacity: 1;
    }
  }
  .title {
    font-size: $font-lg;
    color: $font-color-dark;
    line-height: 80upx;
  }
  .price {
    font-size: $font-lg;
    color: $uni-color-primary;
    line-height: 1;
  }
}
</style>
