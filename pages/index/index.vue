<template>
  <view>
    <text>{{ message }}</text>
	  <button @click="navigateTo('home')">扉页</button>
	  <button @click="navigateTo('basic-info')">基本信息</button>
	  <button @click="navigateTo('main-department')">主选部门</button>
	  <button @click="navigateTo('other-department')">意向部门</button>
	  <button @click="navigateTo('skills')">知识与技能</button>
	  <button @click="navigateTo('interview')">面试时间段</button>
	  <button @click="navigateTo('message-confirm')">信息确认</button>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const message = ref('这是首页')

function navigateTo(page) {
  uni.navigateTo({
    url: `/pages/${page}/${page}`
  });
}
</script>

<style>
/* 添加你的样式 */
</style>
