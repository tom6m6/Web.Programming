<template>
  <div class="container">
    <video autoplay muted loop class="background-video">
      <source src="../assets/background.mp4" type="video/mp4">
      Your Browser doesn't support HTML5 videos.
    </video>
    <div class="content">
      <h1>你好，欢迎来到个人新闻管理系统</h1>
      <h4>短视频时代，传统新闻媒体凭借多年来积累的公信力和权威性，依然是我们获取信息的重要来源。</h4>
      <h4>面对排山倒海的信息，我们的时间精力是有限的，只能挑选感兴趣的几条来阅览。</h4>
      <h4>依托新浪新闻、网易新闻、东方财富这三个知名平台，凭借动态爬虫技术，今天，您就是海量信息流的主人。</h4>
      <button @click="goToHome">这么牛？我想赶紧试一下！</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",
  methods: {
    goToHome() {
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
.container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.background-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1; /* 将视频放在内容后面 */
}

.content {
  position: relative;
  z-index: 1; /* 确保内容在视频前面 */
  text-align: center;
  background-color: rgba(255, 255, 255, 0.8); /* 半透明白色背景 */
  padding: 20px;
  border-radius: 10px;
}

h1 {
  font-size: 2em;
  color: #333;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1em;
  color: #fff;
  background-color: #007BFF; /* 蓝色背景 */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3; /* 深蓝色背景 */
}
</style>
