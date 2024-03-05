<script setup>
import { onMounted, reactive, watch, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { addCustomer, getCustomerById, updateCustomer } from '@/services/CustomerDataService';
import AppNotification from '@/components/AppNotification.vue';

const customer = reactive({
    id: '',
    name: '',
    email: '',
    phone: '',
    active: true
});

const error = reactive({
    name: '',
    email: '',
    phone: ''
});

const isEdit = ref(false);
const showMessage = ref(false);

const router = useRouter();
const route = useRoute();

//remove error message when input is not empty
watch(customer, (newValue) => {
    Object.keys(newValue).forEach((key) => {
        if (newValue[key] !== '') {
            error[key] = '';
        }
    });
});

watch(
    () => route.params.id,
    async () => {
        await loadCustomer();
    }
);

onMounted(() => {
    loadCustomer();
});

const loadCustomer = async () => {
    if (route.params.id) {
        const currentCustomer = await getCustomerById(useRoute().params.id);
        customer.id = currentCustomer.id;
        customer.name = currentCustomer.name;
        customer.email = currentCustomer.email;
        customer.phone = currentCustomer.phone;
        customer.active = currentCustomer.active;
        isEdit.value = true;
    } else {
        resetInputs();
    }
};

const validateForm = () => {
    if (!customer.name) {
        error.name = 'Name is required';
    }
    if (!customer.email) {
        error.email = 'Email is required';
    }
    if (!customer.phone) {
        error.phone = 'Phone is required';
    }
};

const addUser = async () => {
    const newCustomer = {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        active: true
    };
    await addCustomer(newCustomer);
};

const resetInputs = () => {
    customer.name = '';
    customer.email = '';
    customer.phone = '';
    error.name = '';
    error.email = '';
    error.phone = '';
    isEdit.value = false;
};

const onSubmit = (event) => {
    event.preventDefault();
    validateForm();
    if (customer.name && customer.email && customer.phone) {
        if (!isEdit.value) {
            addUser();
            resetInputs();
            showMessage.value = true;
            setTimeout(() => {
                showMessage.value = false;
            }, 3000);
        } else {
            updateCustomer(customer);
            router.push({ name: 'home' });
        }
    }
};

const onCancel = () => {
    router.push({ name: 'home' });
};
</script>

<template>
    <main>
        <Transition name="fade">
            <AppNotification v-if="showMessage" message="Customer added successfully" />
        </Transition>
        <form @submit="onSubmit">
            <label for="name">Name:</label>
            <p class="error" v-if="error.name">{{ error.name }}</p>
            <input
                id="name"
                type="text"
                name="name"
                v-model="customer.name"
                placeholder="Full Name"
            />

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
            <input
                id="phone"
                type="tel"
                name="phone"
                v-model="customer.phone"
                placeholder="Phone"
                minlength="6"
            />

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
    background-color: #0ac587;
    color: white;
    cursor: pointer;
    transition: 0.4s;
    font-size: 1rem;
    &:hover {
        background-color: #08aa74;
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
