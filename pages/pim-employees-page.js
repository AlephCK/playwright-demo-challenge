const { expect } = require('@playwright/test');
const { employeeInfo } = require('../data/employeeInputData')


exports.EmployeePage = class EmployeePage {
  constructor(page) {
    this.page = page;
    this.employeeFirstName = page.getByPlaceholder('First Name');
    this.employeeMiddleName = page.getByPlaceholder('Middle Name');
    this.employeeLastName = page.getByPlaceholder('Last Name');
    this.employeePersonalDetailHeader = page.locator('.orangehrm-edit-employee-content > :nth-child(1) > .oxd-text--h6', { hasText: 'Personal Details' });
    this.employeeSaveButton = page.locator('.orangehrm-horizontal-padding').getByRole('button', { hasText: 'Save' });
    this.employeeImage = page.locator('.employee-image');
    this.employeeNameSearchField = page.locator(':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-autocomplete-wrapper > .oxd-autocomplete-text-input > input');
    this.employeeFirstRow = page.getByRole('row').first();
  }

  async goto() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList')
  }

  async fillNewEmployee() {
    await expect(this.page).toHaveURL(new RegExp('/addEmployee'));
    await expect(this.employeeFirstName).toBeVisible();

    await this.employeeFirstName.inputValue();
    await this.employeeMiddleName.inputValue();
    await this.employeeLastName.inputValue();

    await this.employeeFirstName.type(employeeInfo.employeeData.FirstName1);
    await this.employeeMiddleName.type(employeeInfo.employeeData.middleName);
    await this.employeeLastName.type(employeeInfo.employeeData.lastName);

    await this.employeeFirstName.inputValue();
    await this.employeeMiddleName.inputValue();
    await this.employeeLastName.inputValue();
  }

  async updateEmployee(employeeName) {
    await expect(this.page).toHaveURL(new RegExp('/empNumber'));
    await expect(this.employeeFirstName).toBeVisible();
    await this.page.waitForTimeout(5000);

    await this.employeeFirstName.inputValue();
    await this.employeeFirstName.fill(employeeName);
    await this.employeeMiddleName.fill(employeeInfo.employeeData.middleName);
    await this.employeeLastName.fill(employeeInfo.employeeData.lastName);
    await this.employeeFirstName.inputValue();

    await this.employeeSaveButton.first().click();
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
    await expect(this.employeeMiddleName).toHaveValue(employeeInfo.employeeData.middleName);
    await expect(this.employeeLastName).toHaveValue(employeeInfo.employeeData.lastName);
  }

}