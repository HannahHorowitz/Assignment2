const {
    selectCustomers,
    selectCustomerByCustomerId
    insertCustomer,
    updateCustomer,
    deleteCustomerByCustomerId
} = require('../repositories/customer-repository');

const mapToModel = (customer) => ({
    customerId: customer['customer_id'],
    firstName: customer['first_name'],
    lastName: customer['last_name'],
    email: customer['email']
});

const getAllCustomers = () => {
    const {rows} = selectCustomers();

    return rows.map(mapToModel);
};
const mapToDTO = (customer) => ({
    'customer_id': customer.customerId,
    'email': customer.email,
    'first_name': customer.firstName,
    'last_name': customer.lastName
});


const getCustomerByCustomerId = (customerId) => {
    const customer = selectCustomerByCustomerId(customerId);

    return mapToModel(customer);
};

const addCustomer = (customer) => insertCustomer(mapToDTO(customer));
const modifyCustomer = (customer) => updateCustomer(mapToDTO(customer));
const removeCustomerByCustomerId = (customerId) => deleteCustomerByCustomerId(customerId);


module.exports = {
    addCustomer
    getAllCustomers,
    getCustomerByCustomerId,
    modifyCustomer,
    removeCustomerByCustomerId

};
