const {
    getAllCustomers,
    getCustomerByCustomerId
    getCustomerByCustomerId,
    addCustomer,
    modifyCustomer,
    removeCustomerByCustomerId
} = require('../services/customer-service');
const {getCartsByCustomerId} = require('../services/cart-service');
const addCustomersRoute = (server) => {
    server.route({
        handler: (request, h) => {
            const customer = request.payload;

            addCustomer(customer);

            return h.response(customer).code(201);
        },
        method: 'POST',
        path: '/customers'
    });
};

const modifyCustomerRoute = (server) => {
    server.route({
        handler: (request) => {
            modifyCustomer(request.payload);

            return '';
        },
        method: 'PUT',
        path: '/customers/{customerId}'
    });
};

const deleteCustomerRoute = (server) => {
    server.route({
        handler: (request) => {
            removeCustomerByCustomerId(request.params.customerId);

            return '';
        },
        method: 'DELETE',
        path: '/customers/{customerId}'
    });
};


const getCustomersCartsRoute = (server) => {
    server.route({
        path: '/customers/{customerId}/carts',
        method: 'GET',
        handler: (request, h) => {
            const customerId = request.params.customerId;
            const customer = getCustomerByCustomerId(customerId);

            if (!customer) {
                return h.response().code(404);
            }

            return getCartsByCustomerId(customerId);
        }
    });
};

const getCustomersRoute = (server) => {
    server.route({
        path: '/customers',
        method: 'GET',
        handler: (request, h) => {
            return getAllCustomers();
        }
    });
};

const getCustomerByCustomerIdRoute = (server) => {
    server.route({
        path: '/customers/{customerId}',
        method: 'GET',
        handler: (request, h) => {
            const customer = getCustomerByCustomerId(request.params.customerId);

            if (!customer) {
                return h.response().code(404);
            }

            return customer;
        }
    });
};

const initCustomerControllers = (server) => {
    getCustomersRoute(server);
    getCustomerByCustomerIdRoute(server);
    getCustomersCartsRoute(server);
    addCustomersRoute(server);
    modifyCustomerRoute(server);
    deleteCustomerRoute(server);
};

module.exports = {
    initCustomerControllers

};
