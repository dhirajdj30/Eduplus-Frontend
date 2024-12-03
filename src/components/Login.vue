<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-left">
        <img src="https://www.edupluscampus.com/img/home/Empower.svg" alt="Eduplus Campus Logo" class="eduplus-logo">
      </div>
      <div class="login-right">
        <div class="login-form">
          <img src="https://vierp-test.s3.ap-south-1.amazonaws.com/logo/vit_logo_new.png" alt="Institute Logo" class="institute-logo">
          <h2 class="sign-in">Sign-In</h2>
          <form @submit.prevent="handleLogin">
            <div class="form-group">
              <input type="text" id="username" v-model="username" placeholder="Username" required>
            </div>
            <div class="form-group">
              <input type="password" id="password" v-model="password" placeholder="Password" required>
            </div>
            <button type="submit" class="sign-in-button">SIGN IN</button>
            <div class="form-links">
              <a href="#" class="help-link">Help</a>
              <a href="#" class="forgot-password-link">Forgot Password?</a>
            </div>
          </form>
          <div class="app-links">
            <a href="https://play.google.com/store/apps/details?id=com.edupluscampus.erp_student"><img src="https://learner.vierp.in/assets/android.80197a1a.jpeg" style="height: 35px;" alt="Google Play"></a>
            <a href="https://play.google.com/store/apps/details?id=com.edupluscampus.erp_student"><img src="https://learner.vierp.in/assets/iphone.11b01ecc.jpeg" style="height: 35px;" alt="App Store"></a>
          </div>
        </div>
      </div>
    </div>
    <footer>
      <div class="powered-by">
        Powered By <img src="https://www.edupluscampus.com/img/logos/1.png" alt="Eduplus Campus">
      </div>
      <div class="social-links">
        <a href="https://www.youtube.com/channel/UCisFmSqTOFXMcpb7GlmE_7A/playlists"><img src="https://e7.pngegg.com/pngimages/503/589/png-clipart-youtube-icon-youtube-live-computer-icons-music-youtube-logo-angle-rectangle-thumbnail.png" alt="YouTube"></a>
        <a href="#"><img src="https://bcassetcdn.com/public/blog/wp-content/uploads/2021/11/30142354/SecImage_Facebook.png" alt="Facebook"></a>
        <a href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png" alt="Instagram"></a>
        <a href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/1245px-Logo_of_Twitter.svg.png" alt="Twitter"></a>
        <a href="#"><img src="https://banner2.cleanpng.com/20180710/zfh/aawsmvkao.webp" alt="LinkedIn"></a>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    handleLogin() {
      // Simulate successful login
      const user = { username: this.username };
      // this.$emit('login', user);
      if(user.username == "admin"){
        this.$router.push('/admin');
      }
      else if(user.username == "teacher"){
        this.$router.push('/teacher')
      }
      else{
        this.$router.push('/landing');
      }
    }
  }
}
</script>

<style scoped>
.login-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.login-container {
  display: flex;
  flex: 1;
}

.login-left {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
}

.eduplus-logo {
  max-width: 100%;
  height: auto;
}

.login-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-form {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  text-align: center;
}

.institute-logo {
  max-width: 100px;
  margin-bottom: 20px;
}

.sign-in {
  font-size: 24px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;

}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.sign-in-button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.sign-in-button:hover {
  background-color: #0056b3;
}

.form-links {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.help-link,
.forgot-password-link {
  color: #007bff;
  text-decoration: none;
}

.help-link:hover,
.forgot-password-link:hover {
  text-decoration: underline;
}

.app-links {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.app-links img {
  margin: 0 10px;
}

footer {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: #376BC0;
}

.powered-by {
  display: flex;
  align-items: center;
  color: #f5f5f5;
}

.powered-by img {
  margin-left: 5px;
  height: 30px;
}

.social-links {
  display: flex;
  align-items: center;
  margin-right: 50px;
}

.social-links a {
  margin: 0 5px;
}

.social-links img {
  height: 30px;
  
}

</style>
