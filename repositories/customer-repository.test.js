const uuid = require('uuid');

const {
    selectCustomers,
    selectCustomerByCustomerId,
} = require('../../repositories/customer-repository');

describe('customer repository', () => {
    let firstCustomerId,
        secondCustomerId,
        expectedFirstCustomer,
        expectedSecondCustomer;

    beforeEach(() => {
        firstCustomerId = 'd83ff143-9f8b-445a-8d8f-b9b8fe0f9f28';
        secondCustomerId = '5581858f-a20e-4ada-9ccf-dd3e2cea0eb3';

        expectedFirstCustomer = {
            'customer_id': firstCartId
        };
        expectedSecondCustomer = {
            'customer_id': secondCartId
        };
    });

    describe('selectCustomers', () => {
        it('should return all the customers', () => {
            const actualCustomers = selectCustomers();
            const [actualFirstCustomer, actualSecondCustomer] = actualCustomers.rows;

            expect(actualFirstCustomer).toEqual(expectedFirstCustomer);
            expect(actualSecondCustomer).toEqual(expectedSecondCustomer);
        });
    });

    describe('selectCustomerByCustomerId', () => {
        it('should return a specific customer by customerId', () => {
            const actualFirstCustomer = selectCustomerByCustomerId(firstCustomerId);

            expect(actualFirstCustomer).toEqual({
                'customer_id': firstCustomerId
            });

            const actualSecondCustomer = selectCustomerByCustomerId(firstCustomerId);

            expect(actualSecondCustomer).toNotEqual({
                'customer_id': secondCustomerId
            });
        });
    });
