// @ts-check
const { test } = require('@playwright/test');

const { toastNotification } = require('../data/toastNotificationData');
const { employeeInfo } = require('../data/employeeInputData')

const { LoginPage } = require('../pages/login-page');
const { GeneralElementsPage } = require('../pages/general-elements-page');
const { EmployeePage } = require('../pages/pim-employees-page');


test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  const generalElementsPage = new GeneralElementsPage(page);

  await loginPage.goto();
  await loginPage.checkLoginPage();
  await loginPage.inputUserCredentials('Admin', 'admin123')
  await generalElementsPage.checkTopHeaderText('Dashboard');

  await generalElementsPage.clickMenuItem('PIM');
  await generalElementsPage.checkTopHeaderText('PIM');
});

test('Add new employee', async ({ page }) => {
  const employeePage = new EmployeePage(page);
  const generalElementsPage = new GeneralElementsPage(page);

  await generalElementsPage.clickAddButton();
  await employeePage.fillNewEmployee();
  await generalElementsPage.clickSaveButton();
  await generalElementsPage.checkToastNotification(toastNotification.succesfulMessage);

  await employeePage.validateEmployeeData(employeeInfo.employeeData.FirstName1);
});

test('Search an employee', async ({ page }) => {
  const employeePage = new EmployeePage(page);
  const generalElementsPage = new GeneralElementsPage(page);

  await employeePage.searchEmployeeByName(employeeInfo.employeeData.FirstName1);
  await generalElementsPage.clickSearchButton();
  await employeePage.checkSearchEmployeeByNameResults(employeeInfo.employeeData.FirstName1);
});

test('Update an employee', async ({ page }) => {
  const employeePage = new EmployeePage(page);
  const generalElementsPage = new GeneralElementsPage(page);

  await employeePage.searchEmployeeByName(employeeInfo.employeeData.FirstName1);
  await generalElementsPage.clickSearchButton();
  await employeePage.checkSearchEmployeeByNameResults(employeeInfo.employeeData.FirstName1);

  await generalElementsPage.clickEditButton();
  await generalElementsPage.checkifLoaderIsNotVisible();
  await employeePage.updateEmployee(employeeInfo.employeeData.FirstName2);
  await generalElementsPage.checkToastNotification(toastNotification.updatedMessage);
  await employeePage.validateEmployeeData(employeeInfo.employeeData.FirstName2);
});

test('Delete an employee', async ({ page }) => {
  const employeePage = new EmployeePage(page);
  const generalElementsPage = new GeneralElementsPage(page);

  await employeePage.searchEmployeeByName(employeeInfo.employeeData.FirstName2);
  await generalElementsPage.clickSearchButton();
  await employeePage.checkSearchEmployeeByNameResults(employeeInfo.employeeData.FirstName2);

  await generalElementsPage.clickDeleteButton();
  await generalElementsPage.checkToastNotification(toastNotification.deletedMessage);

  await employeePage.searchEmployeeByName(employeeInfo.employeeData.FirstName2);
  await generalElementsPage.clickSearchButton();
  await employeePage.checkIfDeletedEmployeeReturnsNoResults(employeeInfo.employeeData.FirstName2);
});