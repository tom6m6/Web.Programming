<template>
  <div class="feedback-container">
    <h2>意见反馈</h2>
    <form>
      <textarea v-model="feedback" placeholder="请输入您的意见..." required></textarea>
      <el-button type="submit" @click="save">提交</el-button>
    </form>

    <div v-if="submitted" class="thank-you-message">
      谢谢您的反馈
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      feedback: '',
      submitted: false
    };
  },
  methods: {
    save() {
      if (this.feedback.trim() !== '') {
        this.submitted = true;
        console.log('反馈内容:', this.feedback);
        this.feedback = ''; // 清空输入框
        setTimeout(() => {
          this.submitted = false; // 5秒后隐藏提示信息
        }, 5000);
      }
    }
  }
};
</script>

<style scoped>
.feedback-container {
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
}

textarea {
  resize: none;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  min-height: 100px;
}

button {
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

.thank-you-message {
  margin-top: 20px;
  text-align: center;
  color: green;
  font-size: 18px;
}
</style>

<style>
body {
  background: url('../assets/background.jpg') no-repeat center center fixed;
  background-size: cover;
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}
</style>
