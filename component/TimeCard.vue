<script setup>
import { ref, watch, onMounted, computed } from 'vue';
import log from '../utils/log';

const baseUrl = getApp().globalData.baseUrl;

const props = defineProps({
  dateProps: String,
  timeProps: String,
});

const allTimes = ref([]); // 存储所有时间段
const chosenTime = ref('');
const emit = defineEmits(['exit', 'hide']);

// 分页相关变量
const currentPage = ref(1);
const timesPerPage = 6; // 每页显示的时间块数量
const totalPages = ref(1);

const chooseTime = (time) => {
  time = time.split(' ~ ')[0];
  if (!checkTimeIfCanChoose(time)) {
    return;
  }
  chosenTime.value = time;
  emit('exit', time);
};

const isTimeChosen = (time) => chosenTime.value === time;

const convertTimeToTimeSlot = (timeString) => {
  const [hours, minutes] = timeString.split(':').map(Number);
  const endMinutes = minutes + 20;
  const endHours = endMinutes >= 60 ? hours + 1 : hours;
  const endMinutesAdjusted = endMinutes % 60;

  const formattedStart = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  const formattedEnd = `${endHours.toString().padStart(2, '0')}:${endMinutesAdjusted.toString().padStart(2, '0')}`;

  return `${formattedStart} ~ ${formattedEnd}`;
};

let availableTimes = ref([]);
let unavailableTimes = ref([]);
let cookie = uni.getStorageSync('cookie');

onMounted(() => {
  if (props.timeProps) {
    chooseTime(convertTimeToTimeSlot(props.timeProps));
  }
  queryAvailableTimes(props.dateProps);
});

watch(() => props.dateProps, (newDate) => {
  if (newDate) {
    availableTimes.value = [];
    unavailableTimes.value = [];
    allTimes.value = [];
    queryAvailableTimes(newDate);
  }
});

// 查询某一天可用的面试时间
const queryAvailableTimes = (date) => {
  uni.request({
    url: `${baseUrl}/api/student/dateitv?date=2024-${date}T00:00:00`,
    method: 'GET',
    header: {
      'Content-Type': 'application/json',
      "Cookie": cookie
    },
    success: (res) => {
      //添加日志
      log.info({ 
        responseData: res
      });
      if (res.data.success === false) {
        console.log(res.data.message);
      } else {
        if (res.data.data.available === null) {
          console.log(`${date}无可用时间`);
        } else {
          res.data.data.available.forEach(item => {
            const time = item.substring(11, 16);
            availableTimes.value.push(time);
            allTimes.value.push({ time, isAvailable: true });
          });
        }
        if (res.data.data.unavailable !== null) {
          res.data.data.unavailable.forEach(item => {
            const time = item.substring(11, 16);
            unavailableTimes.value.push(time);
            allTimes.value.push({ time, isAvailable: false });
          });
        }
        totalPages.value = Math.ceil(allTimes.value.length / timesPerPage);
        // 如果当前页数大于总页数，重置当前页数
        currentPage.value = 1;
      }
    },
    fail: (err) => {
      console.log(err);
      uni.showToast({
        title: JSON.stringify(err),
        icon: 'none'
      });
    }
  });
};

const checkTimeIfCanChoose = (time) => availableTimes.value.includes(time);

// 分页功能
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const lastPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
// 分页paginatedTimes是对象数组，每个对象包含时间和是否可用两个属性,allTimes:{time:string,isAvailable:boolean}
const paginatedTimes = computed(() => {
  const start = (currentPage.value - 1) * timesPerPage;
  const end = start + timesPerPage;
  return allTimes.value.slice(start, end);
});
</script>

<template>
  <view class="time-container">
    <view class="top">
      <view class="title">时间</view>
      <view class="exit" @click="$emit('hide')">X</view>
    </view>

    <view class="center">
      <view 
        v-for="(timeObj, index) in paginatedTimes" 
        :key="index" 
        class="time-card" 
        :style="{ 
          backgroundColor: isTimeChosen(timeObj.time) ? '#eecfd3' : 'white',
          color: timeObj.isAvailable ? 'black' : '#c7d2d4',
        }" 
        @click="chooseTime(timeObj.time)"
      >
        {{ timeObj.time }}
      </view>
    </view>

    <view class="bottom">
      <view @click="lastPage">
        <text :class="['button', { 'un-clickable': currentPage === 1 }]">{{ '<' }}</text>
      </view>
      <view class="text">{{ currentPage }}/{{ totalPages }}</view>
      <view @click="nextPage">
        <text :class="['button', { 'un-clickable': currentPage === totalPages }]">{{ '>' }}</text>
      </view>
    </view>
  </view>
</template>





<style scoped>
.un-clickable {
  cursor: not-allowed;
  color: #9a9a9a;
}
.hide-center {
  display: none !important;
}
.center {
  width: 700rpx;
  height: 500rpx;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.time-container {
  width: 700rpx;
  height: 800rpx;
  border: 6rpx solid #eecfd3;
  box-shadow: 6rpx 6rpx 20rpx 2rpx #eecfd3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.time-card {
  width: 640rpx;
  height: 80rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: white;
  margin: 10rpx;
}
.bottom {
  width: 700rpx;
  height: 100rpx;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #eecfd3;
}
.button {
  margin: 10rpx 20rpx;
  font-size: 48rpx;
}
.text {
  font-size: 32rpx;
}
.top {
  width: 640rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80rpx;
}
.title {
  font-size: 40rpx;
}
.exit {
  font-size: 40rpx;
  color: #eecfd3;
  padding: 10rpx;
}
</style>
