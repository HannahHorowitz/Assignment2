const Hapi = require('@hapi/hapi');
const uuid = require('uuid');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    const bobId = uuid.v4();
    const firstName1= ' Bob'
    const lastName1= 'Bert'
    const customerBob = {
      customerId: bobId,
      firstName1,
      lastName1,
      email: `${firstName1.toLowerCase()}.${lastName1.toLowerCase()}@drake.edu`,
      phoneNumber: '+15155555555'
    };
    const firstName2= 'Kimmy'
    const lastName2= 'Schmidt'
    const customerKimmy = {
        customerId: uuid.v4(),
        firstName2,
        lastName2,
        email: `${firstName2.toLowerCase()}.${lastName2.toLowerCase()}@drake.edu`,
        phoneNumber: '+15155555555'
    };
    const firstName3= 'Peter'
    const lastName3= 'Weber'
    const customerPeter = {
        customerId: uuid.v4(),
        firstName3,
        lastName3,
        email: `${firstName3.toLowerCase()}.${lastName3.toLowerCase()}@drake.edu`,
        phoneNumber: '+15155555555'
    };

    let customers = [customerBob, customerKimmy, customerPeter];

    server.route({
        method: 'GET',
        path: '/customers',
        handler: (request, h) => {
            return customers;
        }
    });

    server.route({
        method: 'GET',
        path: '/customers/{customerId}',
        handler: (request, h) => {
            const {customerId} = request.params;
            const customer = customers.find((cstmr) => cstmr.crocodileId === customerId);

            if (!customer) {
                return h.response().code(404);
            }

            return customer;
        }
    });

    server.route({
        method: 'POST',
        path: '/customers',
        handler: (request, h) => {
            const customer = request.payload;
            const existingCustomer = customers.find((cstmr) => cstmr.customerId === customer.customerId);

            if (existingCustomer) {
                return h.response(existingCustomer).code(303);
            } else {
                customers.push(customer);

                return h.response(customer).code(201);
            }

        }
    });

    server.route({
            method: 'DELETE',
            path: '/customers/{customerId}',
            handler: (request, h) => {
                const {customerId} = request.params;
                const customer = customers.find((cstmr) => cstmr.customerId === customerId);

                if (!customer) {
                              return h.response().code(404);
                          }

                          let newCustomers = [];

                          customers.forEach((cstmr) => {
                              if (cstmr.customerId !== customerId) {
                                  newCustomers.push(cstmr);
                              }
                          });

                          customers = newCustomers;

                          return '';
                      }
                  });

      server.route({
          method: 'PUT',
          path: '/customers/{customerId}',
          handler: (request, h) => {
              const {customerId} = request.params;
              const updatedCustomer = request.payload;

              if (customerId === bobId && updatedCustomer.age !== 20) {
                  return h.response().code(422);
              }

              if (customerId !== updatedCustomer.customerId) {
                  return h.response().code(409);
              }

              let newCustomers = [];

              customers.forEach((cstmr) => {
                  if (cstmr.customerId === customerId) {
                      newCustomers.push(updatedCustomer);
                  } else {
                      newCustomers.push(cstmr);
                  }
              });
  
              customers = newCustomers;

              return '';
          }
      });

      await server.start();
      console.log('Server running on %s', server.info.uri);
  };

  process.on('unhandledRejection', (err) => {

      console.log(err);
      process.exit(1);
  });

  init();
