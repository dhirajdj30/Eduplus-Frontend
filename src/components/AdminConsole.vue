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

    <div class="query-engine">
      <div class="btn">
        <button @click="downloadCSV" class="query-cp">Download CSV</button>
        <button @click="downloadPDF" class="query-submit">Download PDF</button>
      </div>
      <div class="results-container" v-if="results.length">
        <v-data-table 
          :headers="headers" 
          :items="results" 
          class="elevation-1 results-table"
        >
          <template v-slot:item="props">
            <tr>
              <td v-for="(value, key) in props.item" :key="key">{{ value }}</td>
            </tr>
          </template>
        </v-data-table>
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
      headers: []
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
          this.headers = Object.keys(data[0]).map(key => ({
            text: key.charAt(0).toUpperCase() + key.slice(1),
            value: key
          }));
          console.log(this.headers)
          this.results = data;
        } else {
          this.headers = [];
          this.results = [];
        }
      })
      .catch(error => {
        console.error('Error fetching results:', error);
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
  font-size: 18px;
  font-weight: bold;

}
.qinp{
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex: 1;
  font-size: 16px;
}
.query-submit {
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  font-size: 16px;
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
  font-size: 16px;
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
  