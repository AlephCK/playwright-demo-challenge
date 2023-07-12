const { expect } = require('@playwright/test');

exports.GeneralElementsPage = class GeneralElementsPage {
  constructor(page) {
    this.page = page;
    this.topbarHeader = page.locator('.oxd-topbar-header-breadcrumb > .oxd-text');
    this.companyLogo = page.locator('.oxd-brand-banner > img');
    this.addButton = page.locator('.orangehrm-header-container > .oxd-button', { hasText: 'Add' });
    this.modalTitle = page.getByText('Are you Sure?')
    this.modalDeleteButton = page.locator('.oxd-button--label-danger', { hasText: 'Yes, Delete' });
    this.saveButton = page.locator('.oxd-button--secondary', { hasText: 'Save' });
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.editButton = page.locator('.bi-pencil-fill');
    this.deleteButton = page.locator('.bi-trash');
    this.toastNotification = page.locator('.oxd-toast', { has: page.locator('.oxd-text--toast-message') });
    this.toastNotificationMessage = page.locator('.oxd-text--toast-message');
    this.toastNotificationCloseButton = page.locator('.oxd-toast', { has: page.locator('.oxd-toast-close') });
    this.loadingSpinner = page.locator('.oxd-loading-spinner');
    this.formLoader = page.locator('.oxd-form-loader');
  }

  async checkTopHeaderText(option) {
    await this.page.waitForLoadState();
    const headerPage = this.topbarHeader;

    await headerPage.waitFor();
    await expect(this.topbarHeader).toBeVisible();
    await expect(this.topbarHeader).toHaveText(option);
    await expect(this.companyLogo).toBeVisible();
  }

  async checkifLoaderIsNotVisible() {
    await expect(this.loadingSpinner).not.toBeVisible();
    await expect(this.formLoader).not.toBeVisible()
  }

  async clickMenuItem(option) {
    await expect(this.page.getByRole('link', { name: option })).toBeVisible();
    await this.page.getByRole('link', { name: option }).click();
  }

  async checkToastNotification(message) {
    await expect(this.toastNotification).toBeVisible();
    await expect(this.toastNotificationMessage).toContainText(message);
    await this.page.waitForLoadState();
    await this.toastNotificationCloseButton.click();
  }

  async clickAddButton() {
    await expect(this.addButton).toBeVisible();
    await this.addButton.click();
  }

  async clickSaveButton() {
    await expect(this.saveButton).toBeVisible();
    await this.saveButton.click();
  }

  async clickSearchButton() {
    await this.page.waitForTimeout(3000);

    await expect(this.searchButton).toBeVisible();
    await this.searchButton.click();
  }

  async clickEditButton() {
    await this.page.waitForTimeout(2000);

    await expect(this.editButton).toBeVisible();
    await this.editButton.click();

  }

  async clickDeleteButton() {
    await this.page.waitForTimeout(2000);

    await expect(this.deleteButton).toBeVisible();
    await this.deleteButton.click();

    await expect(this.modalTitle).toBeVisible();
    await expect(this.modalDeleteButton).toBeVisible();

    await this.modalDeleteButton.click();
  }
}