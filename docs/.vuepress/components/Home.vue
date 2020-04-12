<template>
  <div class="home-wrapper">
    <img src="../images/home.png" alt class="home-img">
    <div class="button"></div>
  </div>
</template>

<style>
.home {
  padding: 0 !important;
  max-width: none !important;
}
</style>

<style scoped>
.home-wrapper {
  padding-top: 10px;
}
.home-img {
  width: 100%;
  height: 600px;
}
.button {
  margin: auto;
  border-radius: 20px;
  width: 40px;
  height: 40px;
  overflow: hidden;
  background: #99dd33;

  animation-name: breath; /* 动画名称 */
  animation-duration: 1s; /* 动画时长3秒 */
  animation-timing-function: ease-in-out; /* 动画速度曲线：以低速开始和结束 */
  animation-iteration-count: infinite; /* 播放次数：无限 */

  /* Safari and Chrome */
  -webkit-animation-name: breath; /* 动画名称 */
  -webkit-animation-duration: 1s; /* 动画时长3秒 */
  -webkit-animation-timing-function: ease-in-out; /* 动画速度曲线：以低速开始和结束 */
  -webkit-animation-iteration-count: infinite; /* 播放次数：无限 */
}
@keyframes breath {
  from {
    opacity: 1;
    width: 40px;
    height: 40px;
  } /* 动画开始时 */
  50% {
    opacity: 1;
    width: 60px;
    height: 60px;
    border-radius: 30px;
  } /* 动画50% 时 */
  to {
    opacity: 1;
    width: 40px;
    height: 40px;
  } /* 动画结束时 */
}

@-webkit-keyframes breath {
  from {
    opacity: 1;
    width: 40px;
    height: 40px;
  } /* 动画开始时 */
  50% {
    opacity: 1;
    width: 60px;
    height: 60px;
    border-radius: 30px;
  } /* 动画50% 时 */
  to {
    opacity: 1;
    width: 40px;
    height: 40px;
  } /* 动画结束时的 */
}
</style>
