"use strict";const e=require("../../common/vendor.js"),a={__name:"skills",setup(a){const n=()=>{e.index.setStorageSync("skills",l.value),e.index.setStorageSync("wantToLearn",i.value),e.index.navigateBack()},t=()=>{""!==l.value.trim()?""!==i.value.trim()?(e.index.setStorageSync("skills",l.value),e.index.setStorageSync("wantToLearn",i.value),e.index.navigateTo({url:"/pages/interview/interview"})):e.index.showToast({title:"想学不能为空",icon:"none"}):e.index.showToast({title:"已会不能为空",icon:"none"})},l=e.ref(""),i=e.ref("");e.onMounted((()=>{""!==e.index.getStorageSync("skills")&&(l.value=e.index.getStorageSync("skills")),""!==e.index.getStorageSync("wantToLearn")&&(i.value=e.index.getStorageSync("wantToLearn"))}));const o=e.ref(["rule","hide"]),r=e.ref(["rule","hide"]),u=()=>{""===l.value.trim()?o.value=["rule"]:o.value=["rule","hide"]},s=()=>{""===i.value.trim()?r.value=["rule"]:r.value=["rule","hide"]};return(a,v)=>({a:e.o(u),b:l.value,c:e.o((e=>l.value=e.detail.value)),d:e.n(o.value),e:e.o(s),f:i.value,g:e.o((e=>i.value=e.detail.value)),h:e.n(r.value),i:e.o(n),j:e.o(t)})}},n=e._export_sfc(a,[["__scopeId","data-v-8dec3181"]]);wx.createPage(n);
