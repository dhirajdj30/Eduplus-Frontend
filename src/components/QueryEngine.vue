<template>
    <div class="query-engine">
      <h3>Run Query</h3>
      <input v-model="query" placeholder="Enter your query" />
      <button @click="fetchResults">Submit</button>
  
      <div v-if="results.length">
        <v-data-table :items="results" :headers="headers" class="elevation-1">
          <template v-slot:top>
            <v-btn @click="downloadCSV">Download CSV</v-btn>
            <v-btn @click="downloadPDF">Download PDF</v-btn>
          </template>
        </v-data-table>
      </div>
    </div>
  </template>
  
  <script>
  import { VBtn, VDataTable } from 'vuetify/components';
  import { jsPDF } from 'jspdf';
  import Papa from 'papaparse';
  
  export default {
    components: {
      VBtn,
      VDataTable
    },
    data() {
      return {
        query: '',
        results: [],
        headers: [
          { text: 'Student Name', value: 'name' },
          { text: 'Roll Number', value: 'rollNumber' },
          { text: 'Fees Status', value: 'feesStatus' }
        ]
      };
    },
    methods: {
      fetchResults() {
        fetch('http://127.0.0.1:5000/api/query', {
          method: 'POST',
          body: JSON.stringify({ query: this.query }),
          headers: { 'Content-Type': 'application/json' }
        })
          .then(response => response.json())
          .then(data => {
            this.results = data;
            const keys = Object.keys(data);

            console.log("this is key",keys)
            // console.log(data);
            
            
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
        doc.autoTable({
          head: [this.headers.map(header => header.text)],
          body: this.results.map(row => [row.name, row.rollNumber, row.feesStatus])
        });
        doc.save('results.pdf');
      }
    }
  };
  </script>
  
  <style scoped>
  .query-engine {
    padding: 20px;
  }
  </style>
  