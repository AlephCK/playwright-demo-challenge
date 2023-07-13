// @ts-check
const { test } = require('@playwright/test');

const { toastNotification } = require('../../data/toastNotificationData');
const { dataInfo } = require('../../data/inputData');

const { LoginPage } = require('../../pages/login-page');
const { GeneralElementsPage } = require('../../pages/general-elements-page');
const { EmployeePage } = require('../../pages/pim-employees-page');


test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  const generalElementsPage = new GeneralElementsPage(page);

  await loginPage.goto();
  await loginPage.checkLoginPage();
  await loginPage.inputUserCredentials(process.env.USERNAME, process.env.PASSWORD);
  await generalElementsPage.checkTopHeaderText('Dashboard');

  await generalElementsPage.clickMenuItem('PIM');
  await generalElementsPage.checkTopHeaderText('PIM');
});

test('Add new employee', async ({ page }) => {
  const employeePage = new EmployeePage(page);
  const generalElementsPage = new GeneralElementsPage(page);

  await generalElementsPage.clickAddButton();
  await employeePage.fillNewEmployee(
    dataInfo.employeeData.firstName1,
    dataInfo.employeeData.lastName
  );
  await generalElementsPage.clickSaveButton();
  await generalElementsPage.checkToastNotification(toastNotification.succesfulMessage);

  await employeePage.validateEmployeeData(dataInfo.employeeData.firstName1);
});

test('Search an employee', async ({ page }) => {
  const employeePage = new EmployeePage(page);
  const generalElementsPage = new GeneralElementsPage(page);

  await employeePage.searchEmployeeByName(dataInfo.employeeData.firstName1);
  await generalElementsPage.clickSearchButton();
  await employeePage.checkSearchEmployeeByNameResults(dataInfo.employeeData.firstName1);
});

test('Update an employee', async ({ page }) => {
  const employeePage = new EmployeePage(page);
  const generalElementsPage = new GeneralElementsPage(page);

  await employeePage.searchEmployeeByName(dataInfo.employeeData.firstName1);
  await generalElementsPage.clickSearchButton();
  await employeePage.checkSearchEmployeeByNameResults(dataInfo.employeeData.firstName1);

  await generalElementsPage.clickEditButton();
  await generalElementsPage.checkifLoaderIsNotVisible();
  await employeePage.updateEmployee(
    dataInfo.employeeData.firstName2,
    dataInfo.employeeData.lastName
  );
  await generalElementsPage.clickSaveButton();
  await generalElementsPage.checkToastNotification(toastNotification.updatedMessage);
  await employeePage.validateEmployeeData(dataInfo.employeeData.firstName2);
});

test('Delete an employee', async ({ page }) => {
  const employeePage = new EmployeePage(page);
  const generalElementsPage = new GeneralElementsPage(page);

  await employeePage.searchEmployeeByName(dataInfo.employeeData.firstName2);
  await generalElementsPage.clickSearchButton();
  await employeePage.checkSearchEmployeeByNameResults(dataInfo.employeeData.firstName2);

  await generalElementsPage.clickDeleteButton();
  await generalElementsPage.checkToastNotification(toastNotification.deletedMessage);

  await employeePage.searchEmployeeByName(dataInfo.employeeData.firstName2);
  await generalElementsPage.clickSearchButton();
  await employeePage.checkIfDeletedEmployeeReturnsNoResults(dataInfo.employeeData.firstName2);
});