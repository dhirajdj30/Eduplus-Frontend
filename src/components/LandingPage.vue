<template>
    <div class="landing-page">
      <!-- Top Navigation Bar -->
      <nav class="top-navbar">
        <div class="navbar-left">
          <img src="https://vierp-test.s3.ap-south-1.amazonaws.com/logo/vit_logo.png" alt="Logo" class="logo" />
          <span class="institution-name">Vishwakarma Institute of Information Technology</span>
        </div>
        <div class="navbar-right">
          <div class="user-info">
            <img src="../assets/useer.svg" alt="User Profile" class="user-avatar" />
            <span class="user-name">DHIRAJ JAGTAP</span>
            <span class="status active">Active</span>
          </div>
          <div class="registration-info">
            <span class="prn">PRN No.22220027</span>

            <span class="prn">BTech-Information Technology</span>
          </div>
          <div class="user-dropdown">
            <div @click="toggleDropdown" class="user-dropdown-toggle">DJ</div>
            <div v-if="dropdownOpen" class="user-dropdown-menu">
              <a href="#">User Profile</a>
              <a href="#">Change Password</a>
              <a href="#">Virtual ID Card</a>
              <a href="/">Log Out</a>
            </div>
          </div>
        </div>
      </nav>
  
      <!-- Search Module -->
      <div class="search-bar">
        <input type="text" placeholder="Search Module" />
      </div>
  
      <!-- Modules Grid -->
      <div class="modules-container">
        <div class="modules-grid">
          <div class="module-card" v-for="module in modules" :key="module.name">
            <img :src="module.icon" :alt="module.name" class="module-icon" />
            <span>{{ module.name }}</span>
          </div>
        </div>
      </div>
      <ChatBot />
      <!-- Footer -->
      <footer class="footer">
        <span>Powered By EduPlus Campus</span>
        <div class="social-icons">
          <i class="fab fa-facebook"></i>
          <i class="fab fa-twitter"></i>
          <i class="fab fa-instagram"></i>
          <i class="fab fa-linkedin"></i>
          <i class="fab fa-youtube"></i>
        </div>
      </footer>
    </div>
  </template>
  
  <script>
  import ChatBot from "../components/ChatBot.vue";
  export default {
    name: 'LandingPage',
    components: {ChatBot,},
    data() {
      return {
        dropdownOpen: false,
        modules: [
          { name: 'Academics', icon: 'https://vierp-test.s3.ap-south-1.amazonaws.com/GI-VIERPLOGO/academics.svg' },
          { name: 'Accounts', icon: 'https://erpstudentmobileapp.s3.ap-south-1.amazonaws.com/Profileicon/fees.webp' },
          { name: 'Admission', icon: 'https://erpstudentmobileapp.s3.ap-south-1.amazonaws.com/Profileicon/Admission.svg' },
          { name: 'Assignment', icon: 'https://erpstudentmobileapp.s3.ap-south-1.amazonaws.com/Profileicon/Assignment.svg' },
          { name: 'Certificate', icon: 'https://erpstudentmobileapp.s3.ap-south-1.amazonaws.com/Profileicon/certificate.svg' },
          { name: 'Event', icon: 'https://erpstudentmobileapp.s3.ap-south-1.amazonaws.com/Profileicon/Event.svg' },
          { name: 'Examination', icon: 'https://erpstudentmobileapp.s3.ap-south-1.amazonaws.com/Profileicon/lms.svg' },
          { name: 'Feedback', icon: 'https://erpstudentmobileapp.s3.ap-south-1.amazonaws.com/Profileicon/Feedback.svg' },
          { name: 'My Time Table', icon: 'https://erpstudentmobileapp.s3.ap-south-1.amazonaws.com/Profileicon/mytimetable.webp' },
          { name: 'Project Monitoring', icon: 'https://erpstudentmobileapp.s3.ap-south-1.amazonaws.com/Profileicon/lms.svg' },
          { name: 'Quiz', icon: 'https://erpstudentmobileapp.s3.ap-south-1.amazonaws.com/Profileicon/quiz.svg' },
          { name: 'Subject Registration', icon: 'https://erpstudentmobileapp.s3.ap-south-1.amazonaws.com/Profileicon/Subject_registration.svg' },
        ],
      };
    },
    methods: {
      toggleDropdown() {
        this.dropdownOpen = !this.dropdownOpen;
      },
    },
  };

  </script>
  
  <style scoped>
  /* Page Layout */

  .chatbot {
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 1000;
  width: 400px;
  height: 600px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: white;
  overflow: hidden;
}
  .landing-page {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #f5f5f5;
  }
  
  /* Top Navbar */
  .top-navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 30px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #ddd;
  }
  
  .navbar-left {
    display: flex;
    align-items: center;
  }
  
  .logo {
    width: 50px;
    margin-right: 10px;
  }
  
  .institution-name {
    font-size: 1.2rem;
    font-weight: bold;
  }
  
  .navbar-right {
    display: flex;
    align-items: center;
  }
  
  .user-info {
    display: flex;
    align-items: center;
    margin-right: 20px;
  }
  
  .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
  
  .user-name {
    font-weight: bold;
    margin-right: 10px;
  }
  
  .status {
    padding: 5px 10px;
    border-radius: 12px;
    color: white;
  }

  
.prn{
  margin-right: 5px;
  padding-right: 5px;
}
  
  .active {
    background-color: #28a745;
  }
  
  .registration-info {
    text-align: right;
    margin-right: 20px;
  }
  
  .user-dropdown {
    position: relative;
  }
  
  .user-dropdown-toggle {
    background-color: #007bff;
    color: white;
    border-radius: 50%;
    padding: 10px;
    cursor: pointer;
  }
  
  .user-dropdown-menu {
    position: absolute;
    right: 0;
    top: 40px;
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    overflow: hidden;
    z-index: 1000;
  }
  
  .user-dropdown-menu a {
    display: block;
    padding: 10px 20px;
    text-decoration: none;
    color: #333;
  }
  
  .user-dropdown-menu a:hover {
    background-color: #f0f0f0;
  }
  
  /* Search Bar */
  .search-bar {
    margin: 20px auto;
    text-align: center;
  }
  
  .search-bar input {
    width: 300px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
  }
  
  /* Modules Grid */
  .modules-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }
  
  .modules-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  
  .module-card {
    background-color: #f8f9fa;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    padding: 20px;
  }
  
  .module-icon {
    width: 50px;
    height: 50px;
    margin-bottom: 10px;
  }
  
  /* Footer */
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 30px;
    background-color: #0056b3;
    color: white;
    margin-top: auto; /* Push footer to the bottom */
  }
  
  .social-icons i {
    margin: 0 10px;
    color: white;
    cursor: pointer;
  }
  </style>
  