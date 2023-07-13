//@ts-check
const { expect } = require('@playwright/test');

exports.SystemUserPage = class SystemUserPage {
  constructor(page) {
    this.page = page;
    this.addSystemUserHeader = page.getByText('Add User');
    this.editSystemUserHeader = page.getByText('Edit User');
    this.systemUserHeader = page.locator('.oxd-table-filter-header-title > .oxd-text', { hasText: 'System Users' });
    this.addUserFormBody = page.locator('.orangehrm-card-container');
    this.userRoleDropdownField = page.locator(':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text');
    this.userAdminDropdownOption = page.getByRole('option', { name: 'Admin' });
    this.adminEmployeeNameField = page.getByPlaceholder('Type for hints...');
    this.statusDropdownField = page.locator(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text');
    this.usernameField = page.getByRole('textbox').nth(2);
    this.passwordField = page.getByRole('textbox').nth(3);
    this.confirmPassword = page.getByRole('textbox').nth(4);
    this.usernameSearchField = page.locator(':nth-child(2) > .oxd-input');
    this.systemUserFirstRow = page.getByRole('row').first();
    this.changePasswordCheckbox = page.locator('label').filter({ hasText: 'Yes' }).locator('i');
  }

  async goto() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList')
  }

  async addNewSystemUser(username, password) {
    await expect(this.page).toHaveURL(new RegExp('/saveSystemUser'));
    await expect(this.addUserFormBody).toBeVisible();
    await expect(this.addSystemUserHeader).toBeVisible();

    // Clicks on the dropdown and then selects 'Admin' option
    await this.userRoleDropdownField.click();
    await this.userAdminDropdownOption.click();

    // Clicks on employee name dropdown, types the employee's name and then selects it
    await this.adminEmployeeNameField.click();
    await this.adminEmployeeNameField.fill('Paul C');
    await this.page.getByRole('option', { name: 'Paul Collings' }).first().click();

    await this.statusDropdownField.click();
    await this.page.getByRole('option', { name: 'Enabled' }).click();

    // Checks that all inputs are empty
    await this.usernameField.inputValue();
    await this.passwordField.inputValue();
    await this.confirmPassword.inputValue();

    await this.usernameField.type(username);
    await this.passwordField.type(password);
    await this.confirmPassword.type(password);

    // Checks that all inputs have values
    await this.usernameField.inputValue();
    await this.passwordField.inputValue();
    await this.confirmPassword.inputValue();
  }

  async searchSystemUser(username) {
    await expect(this.usernameSearchField).toBeVisible();
    await this.usernameSearchField.fill(username);
    await this.page.keyboard.press('Tab');
  }

  async checkSearchSystemUserResults(username) {
    await expect(this.systemUserFirstRow).toBeVisible();
    await expect(this.page.getByText(username)).toBeVisible();
  }

  async updateSystemUser(username, password) {
    await expect(this.editSystemUserHeader).toBeVisible();

    await expect(this.changePasswordCheckbox).toBeVisible();
    await this.changePasswordCheckbox.click();

    // Checks that all inputs are empty
    await this.usernameField.inputValue();
    await this.passwordField.inputValue();
    await this.confirmPassword.inputValue();

    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.confirmPassword.fill(password);

    // Checks that all inputs have values
    await this.usernameField.inputValue();
    await this.passwordField.inputValue();
    await this.confirmPassword.inputValue();
  }

  async checkIfDeletedSystemUserReturnsNoResults(username) {
    await expect(this.systemUserFirstRow).toBeVisible();
    await expect(this.page.getByText(username)).not.toBeVisible();
  }
}