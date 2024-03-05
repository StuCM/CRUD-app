<script setup>
import { getAllCustomers } from '@/services/CustomerDataService'
import { onMounted, ref } from 'vue'

const customers = ref([])

onMounted(async () => {
  customers.value = await getAllCustomers()
  console.log(customers.value)
})

const getCustomersByName = async (event) => {
  if (event.target.value === '') customers.value = await getAllCustomers();
  else {
    customers.value = customers.value.filter((customer) => {
      return customer.name.toLowerCase().includes(event.target.value.toLowerCase())
    })
  }
}
</script>

<template>
  <main>
    <div class="search-container" @input="getCustomersByName">
      <input type="text" placeholder="Search" />
    </div>

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

.search-container {

  input {
    padding: 1rem;
    min-width: 300px;
    border: 1px solid #bbbbbb;
    border-radius: 40px;
    margin-bottom: 1rem;
  }
}
</style>
