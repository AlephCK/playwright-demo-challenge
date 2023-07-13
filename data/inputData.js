import { faker } from '@faker-js/faker';

const employeeData = {
  firstName1: 'Cyberto',
  firstName2: 'Buggerto',
  lastName: faker.person.lastName(),
  adminEmployeeFirstName: 'Paul',
  adminEmployeeLastName: 'Collings'
};

const adminData = {
  adminUser1: 'Test-Admin',
  adminPassword1: 'Test-Admin123',
  adminUser2: 'QA-Admin',
  adminPassword2: 'QA-Admin123'
}

export const dataInfo = {
  employeeData,
  adminData
};