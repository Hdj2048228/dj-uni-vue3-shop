<template>
  <view class="uni-numbox">
    <view class="uni-numbox-minus" @click="_calcValue('subtract')">
      <text class="yticon icon--jianhao" :class="minDisabled ? 'uni-numbox-disabled' : ''"></text>
    </view>
    <input
      class="uni-numbox-value"
      type="number"
      :disabled="disabled"
      :value="inputValue"
      @blur="_onBlur"
    />
    <view class="uni-numbox-plus" @click="_calcValue('add')">
      <text class="yticon icon-jia2" :class="maxDisabled ? 'uni-numbox-disabled' : ''"></text>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { onReady } from '@dcloudio/uni-app'
const emit = defineEmits(['eventChange'])
const minDisabled = ref<boolean>(false)
const maxDisabled = ref<boolean>(false)
const props = defineProps({
  isMax: {
    type: Boolean,
    default: false,
  },
  isMin: {
    type: Boolean,
    default: false,
  },
  index: {
    type: Number,
    default: 0,
  },
  value: {
    type: Number,
    default: 0,
  },
  min: {
    type: Number,
    default: -Infinity,
  },
  max: {
    type: Number,
    default: Infinity,
  },
  step: {
    type: Number,
    default: 1,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
const inputValue = ref<number>(props.value)
onReady(() => {
  maxDisabled.value = props.isMax
  minDisabled.value = props.isMin
})
watch(inputValue, (number) => {
  const data = {
    number: number,
    index: props.index,
  }
  console.log(watch, 'inputValue', inputValue)
  emit('eventChange', data)
})
const _calcValue = (type) => {
  const scale = _getDecimalScale()
  const value = inputValue.value * scale
  let newValue = 0
  const st = props.step * scale

  if (type === 'subtract') {
    newValue = value - props.step
    if (newValue <= props.min) {
      minDisabled.value = true
    }
    if (newValue < props.min) {
      newValue = props.min
    }
    if (newValue < props.max && maxDisabled.value === true) {
      maxDisabled.value = false
    }
  } else if (type === 'add') {
    newValue = value + props.step
    if (newValue >= props.max) {
      maxDisabled.value = true
    }
    if (newValue > props.max) {
      newValue = props.max
    }
    if (newValue > props.min && minDisabled.value === true) {
      minDisabled.value = false
    }
  }
  if (newValue === value) {
    return
  }
  inputValue.value = newValue / scale
}
const _getDecimalScale = () => {
  let scale = 1
  // 浮点型
  if (~~props.step !== props.step) {
    scale = Math.pow(10, (props.step + '').split('.')[1].length)
  }
  return scale
}
const _onBlur = (event) => {
  let value = event.detail.value
  if (!value) {
    inputValue.value = 0
    return
  }
  value = +value
  if (value > props.max) {
    value = props.max
  } else if (value < props.min) {
    value = props.min
  }
  inputValue.value = value
}
</script>
<style>
.uni-numbox {
  position: absolute;
  left: 30upx;
  bottom: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 230upx;
  height: 70upx;
  background: #f5f5f5;
}

.uni-numbox-minus,
.uni-numbox-plus {
  margin: 0;
  background-color: #f5f5f5;
  width: 70upx;
  height: 100%;
  line-height: 70upx;
  text-align: center;
  position: relative;
}
.uni-numbox-minus .yticon,
.uni-numbox-plus .yticon {
  font-size: 36upx;
  color: #555;
}

.uni-numbox-minus {
  border-right: none;
  border-top-left-radius: 6upx;
  border-bottom-left-radius: 6upx;
}

.uni-numbox-plus {
  border-left: none;
  border-top-right-radius: 6upx;
  border-bottom-right-radius: 6upx;
}

.uni-numbox-value {
  position: relative;
  background-color: #f5f5f5;
  width: 90upx;
  height: 50upx;
  text-align: center;
  padding: 0;
  font-size: 30upx;
}

.uni-numbox-disabled.yticon {
  color: #d6d6d6;
}
</style>
