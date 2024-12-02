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
          <span class="user-name">Admin Panel</span>
          <span class="status active">Active</span>
        </div>
        <div class="user-dropdown">
          <div @click="toggleDropdown" class="user-dropdown-toggle">AD</div>
        </div>
      </div>
    </nav>

<!-- 
    <aside class="sidebar">
      <div class="sidebar-header">
        <img src="https://vierp-test.s3.ap-south-1.amazonaws.com/logo/vit_logo.png" alt="Logo" class="sidebar-logo" />
        <span class="sidebar-title">Admin Console</span>
      </div>
      <ul class="sidebar-menu">
        <li><a href="#dashboard">Dashboard</a></li>
        <li><a href="#analytics">Analytics</a></li>
        <li><a href="#settings">Settings</a></li>
        <li><a href="#help">Help</a></li>
      </ul>
    </aside> -->

    <div class="query-engine">
      <div class="btn">
        <button @click="downloadCSV" class="query-cp">Download CSV</button>
        <button @click="downloadPDF" class="query-submit">Download PDF</button>
      </div>

      <div class="results-container">
        <!-- Results Table -->
        <div v-if="results.length && !error" class="results-table">
          <v-data-table 
            :headers="headers"
            :items="results" 
            class="elevation-1"
          >
            <template v-slot:item="props">
              <tr>
                <td v-for="(value, key) in props.item" :key="key">{{ value }}</td>
              </tr>
            </template>
          </v-data-table>
        </div>

        <!-- Error Message -->
        <div v-else-if="error" class="error-message">
          <div class="placeholder">
            <h2>An Error Occurred</h2>
            <p>{{ error }}</p>
          </div>
        </div>

        <!-- Placeholder for No Results -->
        <div v-else class="no-results">
          <div class="placeholder">
            <h2>No Data Found</h2>
            <p>Enter a query to fetch results!</p>
          </div>
        </div>
      </div>



      <div class="prom">
        <div class="prompt">
          <h3 class="Query">Ask Query</h3>
          <input v-model="query" placeholder="Enter your query" class="qinp"/>
          <button @click="fetchResults" class="query-submit">Submit</button>
        </div>
      </div>
    </div>

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
import { VBtn, VDataTable } from 'vuetify/components';
import { jsPDF } from 'jspdf';
import Papa from 'papaparse';
import autoTable from 'jspdf-autotable';

export default {
  components: {
    VBtn,
    VDataTable
  },
  data() {
    return {
      query: '',
      results: [],
      headers: [],
      error: null 
    };
  },
  methods: {
    async fetchResults() {
      fetch('http://127.0.0.1:5000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: this.query })
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.length > 0) {        
          this.results = data;
          this.headers = data.headers;
        } else {
          this.headers = [];
          this.results = [];
        }
      })
      .catch(error => {
        console.error('Error fetching results:', error);
        this.error = 'Failed to fetch results. Please try again later.'
      });
    },
    downloadCSV() {
      const csv = Papa.unparse(this.results);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', 'results.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    downloadPDF() {
      const doc = new jsPDF();
      doc.text('Query Results', 20, 10);
      autoTable(doc, {
        head: [this.headers.map(header => header.text)],
        body: this.results.map(row => this.headers.map(header => row[header.value]))
      });
      doc.save('results.pdf');
    }
  }
};
</script>

  
  <!-- <style scoped> -->
  /* Page Layout */

  <style scoped>

  .error-message .placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  color: #d9534f; /* Red for errors */
}

.error-message .placeholder h2 {
  font-size: 2rem;
  margin: 10px 0;
}

.error-message .placeholder p {
  font-size: 1rem;
}

.sidebar {
  width: 250px;
  background-color: #007bff;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
  position: fixed;
  height: 100vh;
}

.sidebar-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.sidebar-logo {
  width: 40px;
  margin-right: 10px;
}

.sidebar-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.sidebar-menu {
  list-style: none;
  padding: 0;
}

.sidebar-menu li {
  margin: 15px 0;
}

.sidebar-menu a {
  color: white;
  text-decoration: none;
  font-size: 1rem;
}

.sidebar-menu a:hover {
  text-decoration: underline;
}

/* Page Layout */
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

/* Query Engine */
.query-engine {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
}
.prom{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: auto;
  width: 100%;
}
.prompt{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  /* margin: 20px 0; */
  margin-top: 20px;
}

.Query{
  margin: 0 10px 0 0;
  font-size: 20px;
  font-weight: bold;

}
.qinp{
  font-size: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex: 1;
  font-family: sans-serif;
  font-style: oblique;
  /* font-size: 16px; */
}
.query-submit {
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  font-size: 20px;
  cursor: pointer;
  margin-left: 10px;
  transition: background-color 0.3s ease;
}
.query-submit:hover {
  background-color: #0056b3;
}

.query-cp{
  padding: 10px 20px;
  border: none;
  background-color: #ffb700;
  color: rgb(0, 0, 0);
  border-radius: 4px;
  font-size: 20px;
  cursor: pointer;
  margin-left: 10px;
  transition: background-color 0.3s ease;
}

.btn{
  display: flex;

}
/* Results Container */
.results-container {
  flex: 1;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  overflow-y: auto; /* Makes the results area scrollable */
  margin-top: 10px; /* Adds some space between query inputs and results */
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
.results-container {
  flex: 1;
  overflow-y: auto; /* Makes the results area scrollable */
  margin-top: 2px; /* Adds some space between query inputs and results */
}

.results-table {
  margin-top: 20px;
  height: 50vh; /* Set the height to 70% of the viewport height */
}

/* Elevation class to give a shadow effect */
.elevation-1 {
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Light shadow */
  border-radius: 4px; /* Slightly rounded corners */
  background-color: white; /* White background for contrast */
}


.social-icons i {
  margin: 0 10px;
  color: white;
  cursor: pointer;
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
  .admin-query-engine {
    padding: 20px;
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
  
  .active {
    background-color: #28a745;
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
  
  </style>
  