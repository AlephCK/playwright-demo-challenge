// @ts-check
const { test, chromium } = require('@playwright/test');

const { toastNotification } = require('../../data/toastNotificationData');
const { dataInfo } = require('../../data/inputData');

const { LoginPage } = require('../../pages/login-page');
const { GeneralElementsPage } = require('../../pages/general-elements-page');
const { EmployeePage } = require('../../pages/pim-employees-page');
const { SystemUserPage } = require('../../pages/system-users-page');


test.beforeAll(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const loginPage = new LoginPage(page);
  const generalElementsPage = new GeneralElementsPage(page);
  const employeePage = new EmployeePage(page);

  await loginPage.goto();
  await loginPage.checkLoginPage();
  await loginPage.inputUserCredentials(process.env.USERNAME, process.env.PASSWORD);
  await generalElementsPage.checkTopHeaderText('Dashboard');

  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPersonalDetails/empNumber/7');
  await employeePage.updateEmployee(
    dataInfo.employeeData.adminEmployeeFirstName,
    dataInfo.employeeData.adminEmployeeLastName
  );
  await generalElementsPage.clickSaveButton();
  await loginPage.logoutUser();
});

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  const generalElementsPage = new GeneralElementsPage(page);

  await loginPage.goto();
  await loginPage.checkLoginPage();
  await loginPage.inputUserCredentials(process.env.USERNAME, process.env.PASSWORD);
  await generalElementsPage.checkTopHeaderText('Dashboard');

  await generalElementsPage.clickMenuItem('Admin');
  await generalElementsPage.checkTopHeaderText('Admin');
});

test('Add a system user', async ({ page }) => {
  const generalElementsPage = new GeneralElementsPage(page);
  const systemUserPage = new SystemUserPage(page);

  await generalElementsPage.clickAddButton();
  await systemUserPage.addNewSystemUser(
    dataInfo.adminData.adminUser1,
    dataInfo.adminData.adminPassword1
  );
  await generalElementsPage.clickSaveButton();
  await generalElementsPage.checkToastNotification(toastNotification.succesfulMessage);

});

test('Search a system user', async ({ page }) => {
  const generalElementsPage = new GeneralElementsPage(page);
  const systemUserPage = new SystemUserPage(page);

  await systemUserPage.searchSystemUser(dataInfo.adminData.adminUser1);
  await generalElementsPage.clickSearchButton();
  await systemUserPage.checkSearchSystemUserResults(dataInfo.adminData.adminUser1);
});

test('Update a system user', async ({ page }) => {
  const generalElementsPage = new GeneralElementsPage(page);
  const systemUserPage = new SystemUserPage(page);

  await systemUserPage.searchSystemUser(dataInfo.adminData.adminUser1);
  await generalElementsPage.clickSearchButton();
  await systemUserPage.checkSearchSystemUserResults(dataInfo.adminData.adminUser1);

  await generalElementsPage.clickEditButton();
  await generalElementsPage.checkifLoaderIsNotVisible();
  await systemUserPage.updateSystemUser(
    dataInfo.adminData.adminUser2,
    dataInfo.adminData.adminPassword2
  );
  await generalElementsPage.clickSaveButton();
  await generalElementsPage.checkToastNotification(toastNotification.updatedMessage);
});

test('Delete a system user', async ({ page }) => {
  const generalElementsPage = new GeneralElementsPage(page);
  const systemUserPage = new SystemUserPage(page);

  await systemUserPage.searchSystemUser(dataInfo.adminData.adminUser2);
  await generalElementsPage.clickSearchButton();
  await systemUserPage.checkSearchSystemUserResults(dataInfo.adminData.adminUser2);

  await generalElementsPage.clickDeleteButton();
  await generalElementsPage.checkToastNotification(toastNotification.deletedMessage);

  await systemUserPage.searchSystemUser(dataInfo.adminData.adminUser2);
  await generalElementsPage.clickSearchButton();
  await systemUserPage.checkIfDeletedSystemUserReturnsNoResults(dataInfo.adminData.adminUser2);
});