<script setup>
import { getAllCustomers } from '@/services/CustomerDataService';
import { onMounted, ref } from 'vue';

const customers = ref([]);

onMounted(async () => {
  customers.value = await getAllCustomers();
  console.log(customers.value);
});
</script>

<template>
  <main>
      <table>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Active</th>
        </tr>
        <tr v-for="customer in customers" :key="customer.id">
          <td>{{ customer.name }}</td>
          <td>{{ customer.email }}</td>
          <td>{{ customer.phone }}</td>
          <td>{{ customer.active }}</td>
        </tr>
      </table>
  </main>
</template>

<style lang="scss">
main {
  width: 800px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
table {
  min-width: 100%;
  border-collapse: collapse;
  th {
    background-color: #464646;
    color: white;
    padding: 1rem;
  }
  td {
    padding: 1rem;
    border-bottom: 1px solid #f1f1f1;
  }
  tr {
    &:hover {
      background-color: #f1f1f1;
    }
  }
}
</style>
