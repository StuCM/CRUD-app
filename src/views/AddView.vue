<script setup>
import { onMounted, reactive, watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { addCustomer, getCustomerById, updateCustomer } from '@/services/CustomerDataService'

const customer = reactive({
    id: '',
  name: '',
  email: '',
  phone: '',
  active: true
})

const error = reactive({
  name: '',
  email: '',
  phone: ''
})

const isEdit = ref(false);

const router = useRouter();

//remove error message when input is not empty
watch(customer, (newValue) => {
  Object.keys(newValue).forEach((key) => {
    if (newValue[key] !== "") {
      error[key] = ''
    }
  })
})

onMounted(async () => {
  if (useRoute().params.id) {
    const currentCustomer = await getCustomerById(useRoute().params.id)
    customer.id = currentCustomer.id
    customer.name = currentCustomer.name
    customer.email = currentCustomer.email
    customer.phone = currentCustomer.phone
    customer.active = currentCustomer.active
    isEdit.value = true;
  }
});

const validateForm = () => {
  if (!customer.name) {
    error.name = 'Name is required'
  }
  if (!customer.email) {
    error.email = 'Email is required'
  }
  if (!customer.phone) {
    error.phone = 'Phone is required'
  }
}

const addUser = async () => {
  await addCustomer(customer)
}

const resetInputs = () => {
  customer.name = ''
  customer.email = ''
  customer.phone = ''
  error.name = ''
  error.email = ''
  error.phone = ''
}

const onSubmit = (event) => {
  event.preventDefault()
  validateForm()
  if (customer.name && customer.email && customer.phone) {
    if(!isEdit.value){
        addUser()
        resetInputs()
    } else {
        updateCustomer(customer);
        router.push({ name: 'home' })
    }
  }
}

const onCancel = () => {
  router.push({ name: 'home' })
}
</script>

<template>
  <main>
    <form @submit="onSubmit">
      <label for="name">Name:</label>
      <p class="error" v-if="error.name">{{ error.name }}</p>
      <input id="name" type="text" name="name" v-model="customer.name" placeholder="Full Name" />

      <label for="email">Email:</label>
      <p class="error" v-if="error.email">{{ error.email }}</p>
      <input
        id="email"
        type="email"
        name="email"
        v-model="customer.email"
        placeholder="Enter your email"
      />

      <label for="phone">Phone:</label>
      <p class="error" v-if="error.phone">{{ error.phone }}</p>
      <input id="phone" type="tel" name="phone" v-model="customer.phone" placeholder="Phone" />

      <button v-if="!isEdit" type="submit">Submit</button>
      <div v-else>
        <button type="submit">Save</button>
        <button @click="onCancel">Cancel</button>
      </div>
    </form>
  </main>
</template>

<style lang="scss" scoped>
main {
  width: 800px;
  height: 100%;
  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    label {
      margin: 1rem 0 0.5rem 0.5rem;
      font-size: 1rem;
    }
    input {
      padding: 0.75rem 1rem;
      min-width: 400px;
      border: 1px solid #bbbbbb;
      border-radius: 40px;
      margin-bottom: 1rem;
    }
  }
}

.error {
  color: red;
  margin: 0rem 0 0 0.5rem;
  font-size: 0.8rem;
}

button {
  padding: 10px 20px;
  margin: 1rem;
  border: none;
  border-radius: 40px;
  background-color: hsla(160, 100%, 37%, 1);
  color: white;
  cursor: pointer;
  transition: 0.4s;
  font-size: 1rem;
  &:hover {
    background-color: hsla(160, 100%, 27%, 1);
  }
}
</style>
