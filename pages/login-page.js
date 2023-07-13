//@ts-check
const { expect } = require('@playwright/test');

exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.loginLogo = page.locator('.orangehrm-login-branding');
    this.loginTitle = page.getByRole('heading', { name: 'Login' })
    this.usernameField = page.locator('input[name="username"]');
    this.passwordField = page.locator('input[name="password"]');
    this.loginButton = page.getByRole('button', { name: 'Login' })
    this.loginAlert = page.getByRole('alert');
    this.userDropdown = page.locator('.oxd-userdropdown-name');
    this.logoutMenuItem = page.getByRole('menuitem', { name: 'Logout' })
  }

  async goto() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  }

  async checkLoginPage() {
    await expect(this.loginLogo).toBeVisible();
    await expect(this.loginTitle).toBeVisible();
  }

  async inputUserCredentials(username, password) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }

  async checkInvalidCredentialsWarning() {
    await expect(this.loginAlert).toBeVisible();
    await expect(this.loginAlert).toContainText("Invalid credentials");
    await expect(this.usernameField).toHaveValue('');
    await expect(this.passwordField).toHaveValue('');
  }

  async logoutUser() {
    await expect(this.userDropdown).toBeVisible();
    await this.userDropdown.click();
    await expect(this.logoutMenuItem).toBeVisible();
    await this.logoutMenuItem.click();
  }
}