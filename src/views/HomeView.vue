<script setup>
import { getAllCustomers, deleteCustomer } from '@/services/CustomerDataService';
import { onMounted, ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'vue-router';

const customers = ref([]);

onMounted(async () => {
    customers.value = await getAllCustomers();
});

const getCustomersByName = async (event) => {
    if (event.target.value === '') customers.value = await getAllCustomers();
    else {
        customers.value = customers.value.filter((customer) => {
            return customer.name.toLowerCase().includes(event.target.value.toLowerCase());
        });
    }
};

const deleteUser = (id) => {
    customers.value = customers.value.filter((customer) => {
        return customer.id !== id;
    });
    deleteCustomer(id);
};

const router = useRouter();

const editUser = (id) => {
    router.push({ name: 'add', params: { id } });
};
</script>

<template>
    <main>
        <div class="search-container" @input="getCustomersByName">
            <input type="text" placeholder="Search" />
        </div>
        <div class="table-container">
            <table>
                <thead>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Active</th>
                    <th>Actions</th>
                </thead>
                <tr v-for="customer in customers" :key="customer.id">
                    <td>{{ customer.name }}</td>
                    <td>{{ customer.email }}</td>
                    <td>{{ customer.phone }}</td>
                    <td>{{ customer.active }}</td>
                    <td>
                        <button class="icon-button" @click="editUser(customer.id)">
                            <FontAwesomeIcon class="icon icon-edit" :icon="faEdit" />
                        </button>
                        <button class="icon-button" @click="deleteUser(customer.id)">
                            <FontAwesomeIcon class="icon icon-trash" :icon="faTrash" />
                        </button>
                    </td>
                </tr>
            </table>
        </div>
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
.table-container {
    max-height: 550px;
    overflow-y: auto;
}
table {
    min-width: 100%;
    border-collapse: collapse;
    thead {
        position: sticky;
        top: 0;
        background-color: #464646;
    }
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
        width: 100%;
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

.icon {
    cursor: pointer;
    margin: 0 0.75rem;
    &.icon-edit {
        color: #1795c7;
        &:hover {
            color: #137aa3;
        }
    }
    &.icon-trash {
        color: #e61313;
        &:hover {
            color: #be1010;
        }
    }
}
</style>
