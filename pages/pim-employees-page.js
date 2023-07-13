//@ts-check
const { expect } = require('@playwright/test');

exports.EmployeePage = class EmployeePage {
  constructor(page) {
    this.page = page;
    this.employeeFirstName = page.getByPlaceholder('First Name');
    this.employeeMiddleName = page.getByPlaceholder('Middle Name');
    this.employeeLastName = page.getByPlaceholder('Last Name');
    this.employeePersonalDetailHeader = page.locator('.orangehrm-edit-employee-content > :nth-child(1) > .oxd-text--h6', { hasText: 'Personal Details' });
    this.employeeImage = page.locator('.employee-image');
    this.employeeNameSearchField = page.locator(':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-autocomplete-wrapper > .oxd-autocomplete-text-input > input');
    this.employeeFirstRow = page.getByRole('row').first();
  }

  async goto() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList')
  }

  async fillNewEmployee(employeeName, employeeLastName) {
    await expect(this.page).toHaveURL(new RegExp('/addEmployee'));
    await expect(this.employeeFirstName).toBeVisible();

    // Checks that both inputs are empty
    await this.employeeFirstName.inputValue();
    await this.employeeLastName.inputValue();

    await this.employeeFirstName.type(employeeName);
    await this.employeeLastName.type(employeeLastName);

    // Checks that both inputs have a value
    await this.employeeFirstName.inputValue();
    await this.employeeLastName.inputValue();
  }

  async updateEmployee(employeeName, employeeLastName) {
    await expect(this.page).toHaveURL(new RegExp('/empNumber'));
    await expect(this.employeeFirstName).toBeVisible();
    await this.page.waitForTimeout(5000);

    // Checks that input is empty
    await this.employeeFirstName.inputValue();

    await this.employeeFirstName.fill(employeeName);
    await this.employeeMiddleName.fill('');
    await this.employeeLastName.fill(employeeLastName);

    // Checks that input has a value
    await this.employeeFirstName.inputValue();
  }

  async searchEmployeeByName(name) {
    await expect(this.employeeNameSearchField).toBeVisible();
    await this.employeeNameSearchField.fill(name);
    await this.page.keyboard.press('Tab');
  }

  async checkSearchEmployeeByNameResults(name) {
    await expect(this.employeeFirstRow).toBeVisible();
    await expect(this.page.getByText(name)).toBeVisible();
  }

  async checkIfDeletedEmployeeReturnsNoResults(name) {
    await expect(this.employeeFirstRow).not.toBeVisible();
    await expect(this.page.getByText(name)).not.toBeVisible();
  }

  async validateEmployeeData(employeeName) {
    await expect(this.page).toHaveURL(new RegExp('/empNumber'));
    await this.page.waitForLoadState();

    await expect(this.employeeImage).toBeVisible();
    await expect(this.employeePersonalDetailHeader).toBeVisible();

    await expect(this.employeeFirstName).toHaveValue(employeeName);
  }

}