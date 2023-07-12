import { faker } from '@faker-js/faker';

const employeeData = {
  FirstName1: 'Cyberto',
  FirstName2: 'Buggerto',
  middleName: faker.person.middleName(),
  lastName: faker.person.lastName()
};

export const employeeInfo = {
  employeeData
};