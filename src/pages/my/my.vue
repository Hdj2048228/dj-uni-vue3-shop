<template>
  <view class="container">
    <view class="user-section">
      <image class="bg" src="/static/user-bg.jpg"></image>
      <view class="user-info-box">
        <view class="portrait-box">
          <image class="portrait" :src="userInfo.avatarUrl || '/static/missing-face.png'"></image>
        </view>
        <view class="info-box">
          <text class="username">{{ userInfo.nickName || '游客' }}</text>
        </view>
        <view v-if="hasLogin" class="btn-login-out" @click.stop="loginOut"> (退出)</view>
      </view>
      <view class="vip-card-box" @click="loginMethod">
        <image class="card-bg" src="/static/vip-card-bg.png" mode=""></image>
        <view class="b-btn">
          {{ hasLogin ? '立即开通' : '立即登录' }}
        </view>
        <view class="tit">
          <text class="yticon icon-iLinkapp-"></text>
          DCloud会员
        </view>
        <text class="e-m">DCloud Union</text>
        <text class="e-b">开通会员开发无bug 一测就上线</text>
      </view>
    </view>

    <view
      class="cover-container"
      :style="[
        {
          transform: coverTransform,
          transition: coverTransition,
        },
      ]"
      @touchstart="coverTouchstart"
      @touchmove="coverTouchmove"
      @touchend="coverTouchend"
    >
      <!--  -->
      <image class="arc" src="/static/arc.png"></image>

      <view class="tj-sction">
        <view class="tj-item">
          <text class="num">128.8</text>
          <text>余额</text>
        </view>
        <view class="tj-item">
          <text class="num">0</text>
          <text>优惠券</text>
        </view>
        <view class="tj-item">
          <text class="num">20</text>
          <text>积分</text>
        </view>
      </view>
      <!-- 订单 -->
      <view class="order-section">
        <view
          class="order-item"
          hover-class="common-hover"
          :hover-stay-time="50"
          @click="navTo('/pages/order/order?state=0')"
        >
          <text class="yticon icon-shouye"></text>
          <text>全部订单</text>
        </view>
        <view
          class="order-item"
          hover-class="common-hover"
          :hover-stay-time="50"
          @click="navTo('/pages/order/order?state=1')"
        >
          <text class="yticon icon-daifukuan"></text>
          <text>待付款</text>
        </view>
        <view
          class="order-item"
          hover-class="common-hover"
          :hover-stay-time="50"
          @click="navTo('/pages/order/order?state=2')"
        >
          <text class="yticon icon-yishouhuo"></text>
          <text>待收货</text>
        </view>
        <view
          class="order-item"
          hover-class="common-hover"
          :hover-stay-time="50"
          @click="navTo('/pages/order/order?state=4')"
        >
          <text class="yticon icon-shouhoutuikuan"></text>
          <text>退款/售后</text>
        </view>
      </view>
      <!-- 浏览历史 -->
      <view class="history-section icon">
        <view class="sec-header">
          <text class="yticon icon-lishijilu"></text>
          <text>浏览历史</text>
        </view>
        <scroll-view scroll-x class="h-list">
          <image
            :src="defaultImage"
            mode="aspectFill"
            @click="navTo('/pages/product/product')"
          ></image>
          <image
            :src="defaultImage"
            mode="aspectFill"
            @click="navTo('/pages/product/product')"
          ></image>
          <image
            :src="defaultImage"
            mode="aspectFill"
            @click="navTo('/pages/product/product')"
          ></image>
          <image
            :src="defaultImage"
            mode="aspectFill"
            @click="navTo('/pages/product/product')"
          ></image>
          <image
            :src="defaultImage"
            mode="aspectFill"
            @click="navTo('/pages/product/product')"
          ></image>
          <image
            :src="defaultImage"
            mode="aspectFill"
            @click="navTo('/pages/product/product')"
          ></image>
        </scroll-view>
        <list-cell
          icon="icon-iconfontweixin"
          icon-color="#e07472"
          title="我的钱包"
          tips="您的会员还有3天过期"
        ></list-cell>
        <list-cell
          icon="icon-dizhi"
          icon-color="#5fcda2"
          title="地址管理"
          @eventClick="navTo('/pages/address/address')"
        ></list-cell>
        <list-cell
          icon="icon-share"
          icon-color="#9789f7"
          title="分享"
          tips="邀请好友赢10万大礼"
        ></list-cell>
        <list-cell
          icon="icon-pinglun-copy"
          icon-color="#ee883b"
          title="晒单"
          tips="晒单抢红包"
        ></list-cell>
        <list-cell
          icon="icon-shoucang_xuanzhongzhuangtai"
          icon-color="#54b4ef"
          title="我的收藏"
        ></list-cell>
        <list-cell
          icon="icon-shezhi1"
          icon-color="#e07472"
          title="设置"
          border=""
          @eventClick="navTo('/pages/set/set')"
        ></list-cell>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import listCell from '@/components/mixListCell.vue'
import { useDefaultImage } from '@/hooks/useDefaultImage'
const { defaultImage } = useDefaultImage()
let startY = 0,
  moveY = 0,
  pageAtTop = true
const { hasLogin, userInfo, login, logout } = useStore('user')
const coverTransform = ref('translateY(0px)')
const coverTransition = ref('0s')
const moving = ref(false)
/**
 * 统一跳转接口,拦截未登录路由
 * navigator标签现在默认没有转场动画，所以用view
 */
const navTo = (url: string) => {
  if (!hasLogin) {
    url = '/pages/public/login'
  }
  uni.navigateTo({
    url,
  })
}

/**
 *  会员卡下拉和回弹
 *  1.关闭bounce避免ios端下拉冲突
 *  2.由于touchmove事件的缺陷（以前做小程序就遇到，比如20跳到40，h5反而好很多），下拉的时候会有掉帧的感觉
 *    transition设置0.1秒延迟，让css来过渡这段空窗期
 *  3.回弹效果可修改曲线值来调整效果，推荐一个好用的bezier生成工具 http://cubic-bezier.com/
 */
const coverTouchstart = (e: TouchEvent) => {
    if (!pageAtTop) {
      return
    }
    coverTransition.value = 'transform .1s linear'
    startY = e.touches[0].clientY
  },
  coverTouchmove = (e: TouchEvent) => {
    moveY = e.touches[0].clientY
    let moveDistance = moveY - startY
    if (moveDistance < 0) {
      moving.value = false
      return
    }
    moving.value = true
    if (moveDistance >= 80 && moveDistance < 100) {
      moveDistance = 80
    }

    if (moveDistance > 0 && moveDistance <= 80) {
      coverTransform.value = `translateY(${moveDistance}px)`
    }
  }
const loginMethod = () => {
  uni.getUserProfile({
    desc: 'login',
    lang: 'zh_CN',
    success(res: any) {
      login(res.userInfo)
    },
    fail(err) {
      console.error(err)
      uni.showToast({
        title: JSON.stringify(err),
      })
    },
  })
}

const loginOut = () => {
  logout()
}
</script>

<style lang="scss">
%flex-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
%section {
  display: flex;
  justify-content: space-around;
  align-content: center;
  background: #fff;
  border-radius: 10upx;
}

.user-section {
  height: 520upx;
  padding: 100upx 30upx 0;
  position: relative;
  .bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    filter: blur(1px);
    opacity: 0.7;
  }
}
.user-info-box {
  height: 180upx;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
  .portrait {
    width: 130upx;
    height: 130upx;
    border: 5upx solid #fff;
    border-radius: 50%;
  }
  .username {
    font-size: $font-lg + 6upx;
    color: $font-color-dark;
    margin-left: 20upx;
  }
  .btn-login-out {
    margin-left: 5px;
  }
}

.vip-card-box {
  display: flex;
  flex-direction: column;
  color: #f7d680;
  height: 240upx;
  background: linear-gradient(to left, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8));
  border-radius: 16upx 16upx 0 0;
  overflow: hidden;
  position: relative;
  padding: 20upx 24upx;
  .card-bg {
    position: absolute;
    top: 20upx;
    right: 0;
    width: 380upx;
    height: 260upx;
  }
  .b-btn {
    position: absolute;
    right: 20upx;
    top: 16upx;
    width: 132upx;
    height: 40upx;
    text-align: center;
    line-height: 40upx;
    font-size: 22upx;
    color: #36343c;
    border-radius: 20px;
    background: linear-gradient(to left, #f9e6af, #ffd465);
    z-index: 1;
  }
  .tit {
    font-size: $font-base + 2upx;
    color: #f7d680;
    margin-bottom: 28upx;
    .yticon {
      color: #f6e5a3;
      margin-right: 16upx;
    }
  }
  .e-b {
    font-size: $font-sm;
    color: #d8cba9;
    margin-top: 10upx;
  }
}
.cover-container {
  background: $page-color-base;
  margin-top: -150upx;
  padding: 0 30upx;
  position: relative;
  background: #f5f5f5;
  padding-bottom: 20upx;
  .arc {
    position: absolute;
    left: 0;
    top: -34upx;
    width: 100%;
    height: 36upx;
  }
}
.tj-sction {
  @extend %section;
  .tj-item {
    @extend %flex-center;
    flex-direction: column;
    height: 140upx;
    font-size: $font-sm;
    color: #75787d;
  }
  .num {
    font-size: $font-lg;
    color: $font-color-dark;
    margin-bottom: 8upx;
  }
}
.order-section {
  @extend %section;
  padding: 28upx 0;
  margin-top: 20upx;
  .order-item {
    @extend %flex-center;
    width: 120upx;
    height: 120upx;
    border-radius: 10upx;
    font-size: $font-sm;
    color: $font-color-dark;
  }
  .yticon {
    font-size: 48upx;
    margin-bottom: 18upx;
    color: #fa436a;
  }
  .icon-shouhoutuikuan {
    font-size: 44upx;
  }
}
.history-section {
  padding: 30upx 0 0;
  margin-top: 20upx;
  background: #fff;
  border-radius: 10upx;
  .sec-header {
    display: flex;
    align-items: center;
    font-size: $font-base;
    color: $font-color-dark;
    line-height: 40upx;
    margin-left: 30upx;
    .yticon {
      font-size: 44upx;
      color: #5eba8f;
      margin-right: 16upx;
      line-height: 40upx;
    }
  }
  .h-list {
    white-space: nowrap;
    padding: 30upx 30upx 0;
    image {
      display: inline-block;
      width: 160upx;
      height: 160upx;
      margin-right: 20upx;
      border-radius: 10upx;
    }
  }
}
</style>
