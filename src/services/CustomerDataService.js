export async function getAllCustomers() {
    try {
        const response = await fetch('http://localhost:3000/customers');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
};

export async function getCustomerById(id) {
    try {
        const response = await fetch(`http://localhost:3000/customers/${id}`);
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
};

export async function addCustomer(customer) {
    try {
        const response = await fetch('http://localhost:3000/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        });
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
};

export async function updateCustomer(customer) {
    try {
        const response = await fetch(`http://localhost:3000/customers/${customer.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        });
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
};

export async function deleteCustomer(id) {
    try {
        const response = await fetch(`http://localhost:3000/customers/${id}`, {
            method: 'DELETE'
        });
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
};