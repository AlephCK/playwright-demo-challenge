// @ts-check
const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/login-page');
const { GeneralElementsPage } = require('../pages/general-elements-page');

test('Login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const generalElementsPage = new GeneralElementsPage(page);

  await loginPage.goto();
  await loginPage.checkLoginPage();
  await loginPage.inputUserCredentials('Admin', 'admin123')
  await generalElementsPage.checkTopHeaderText('Dashboard');
});

test('Login with invalid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.checkLoginPage();
  await loginPage.inputUserCredentials('@Admin', '123456');
  await loginPage.checkInvalidCredentialsWarning();
});

test('Logout', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const generalElementsPage = new GeneralElementsPage(page);

  await loginPage.goto();
  await loginPage.checkLoginPage();
  await loginPage.inputUserCredentials('Admin', 'admin123')
  await generalElementsPage.checkTopHeaderText('Dashboard');
  await loginPage.logoutUser();
  await loginPage.checkLoginPage();
});