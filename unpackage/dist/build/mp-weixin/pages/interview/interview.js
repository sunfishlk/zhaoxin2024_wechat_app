"use strict";const e=require("../../common/vendor.js");Math||(a+t)();const a=()=>"../../component/DateCard.js",t=()=>"../../component/TimeCard.js",o={__name:"interview",setup(a){const t=e.ref(e.index.getStorageSync("schoolArea")||"兴庆校区"),o=e.ref(e.index.getStorageSync("date")||""),n=e.ref(e.index.getStorageSync("time")||""),i=e.ref(e.index.getStorageSync("position")||"挑战阁楼");e.onShow((()=>{t.value=e.index.getStorageSync("schoolArea")||"兴庆校区",o.value=e.index.getStorageSync("date")||"",n.value=e.index.getStorageSync("time")||"",i.value=e.index.getStorageSync("position")||"挑战阁楼"}));const l=e.ref(!1),r=()=>{l.value=!0},v=()=>{l.value=!1},u=e.ref(!1),s=()=>{""!==o.value?u.value=!0:e.index.showToast({title:"请先选择日期",icon:"none"})},c=()=>{u.value=!1},d=()=>{e.index.setStorageSync("schoolArea",t.value),e.index.setStorageSync("date",o.value),e.index.setStorageSync("time",n.value),e.index.setStorageSync("position",i.value),e.index.navigateBack()},S=()=>{""!==o.value.trim()?""!==n.value.trim()?(e.index.setStorageSync("schoolArea",t.value),e.index.setStorageSync("date",o.value),e.index.setStorageSync("time",n.value),e.index.setStorageSync("position",i.value),e.index.navigateTo({url:"/pages/message-confirm/message-confirm"})):e.index.showToast({title:"请选择时间",icon:"none"}):e.index.showToast({title:"请选择日期",icon:"none"})};return(a,g)=>e.e({a:l.value},l.value?{b:e.n({show:l.value}),c:e.o(v)}:{},{d:u.value},u.value?{e:e.n({show:u.value}),f:e.o(c)}:{},{g:l.value},l.value?{h:e.o((e=>v())),i:e.o(((e,a)=>{((e,a)=>{o.value=((e,a)=>""===e||""===a?"":`${e<10?"0"+e:e}-${a<10?"0"+a:a}`)(e,a),v()})(e,a),v(),s()})),j:e.n({"date-card-show":l.value}),k:e.p({dateProps:o.value})}:{},{l:u.value},u.value?{m:e.o((e=>c())),n:e.o((e=>{return a=e,c(),void(""!==a&&(n.value=a.split("~")[0].trim()));var a})),o:e.n({"date-card-show":u.value}),p:e.p({dateProps:o.value,timeProps:n.value})}:{},{q:t.value,r:e.o((e=>t.value=e.detail.value)),s:i.value,t:e.o((e=>i.value=e.detail.value)),v:e.t(o.value),w:e.o(r),x:e.t(n.value),y:e.o(s),z:e.o(d),A:e.o(S)})}},n=e._export_sfc(o,[["__scopeId","data-v-b8c8bd8a"]]);wx.createPage(n);
