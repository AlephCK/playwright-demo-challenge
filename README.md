# Senior Automation Challenge Project V2
This project contains the Senior Automation Challenge v2 project from Winston Cruz that consists of working the following tasks with a new set of tools:
- Automate 10 test cases for the Orange HRM web application
- Automate 3 API Calls to Marvel API Endpoints, and also automate its invalid scenarios

## UI Testing
The framework containst the following 11 test cases for the webapp https://opensource-demo.orangehrmlive.com/web/index.php/:

**Login**

1. Login
2. Invalid Login
3. Logout

**PIM Employees**

4. Add an Employee
5. Update an Employee
6. Search an Employee
7. Remove an Employee

**Admin Users**

8. Add a System User
9. Update a System User
10. Search a System User
11. Remove a System User

The test case were documented on the Test Management Tool called [Qase](https://app.qase.io) before proceeding the automation work. Feel free to request me the access to the test cases if needed.

## API Testing
For the API testing it was required to be automated 3 request to the Marvel Comics API Marvel Developer Site.
1. Automate that all the characters can be fetch.
2. Automate that all the comics for Spiderman can be fetch.
3. Automate that all characters for the X-Man comic can be fetch

## Tech Stack
- [nodeJS](https://nodejs.org/en/about/)
- [Javascript](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics)
- [Playwright](https://playwright.dev/)
- [eslint](https://www.npmjs.com/package/eslint)
- [blueimp-md5](https://www.npmjs.com/package/blueimp-md5)
- [FakerJS](http://marak.github.io/faker.js/)

## General Requirements

### Clone the Repository
Using SSH
```bash
git clone git@github.com:AlephCK/AutomationChallengeV2.git
```

### Dev Install

Install all dependencies

```bash
npm install
```

### Using credentials to run Playwrigth Tests
First, create a Marvel Developers account and follow their official documentation here: https://developer.marvel.com/documentation/getting_started, in order to get the API Keys that are needed to run this project.

We use the `cypress.env.json` to add the credentials used for both API and e2e specs tests:

```json
{
  "user":{
    "testUser": "Admin",
    "testPassword": "admin123"
  },
  "marvel":{
    "privateKey": "<Insert Marvel API private key here>",
    "publicKey": "<Insert Marvel API public key here>"
  }
}
```

### How To Use Playwright
The following commands can be used in order to run the test cases:

Open UI mode
```bash
npx playwright test --ui
```

#### Linux and Mac Users

Removes test reports
```bash
npm run pretest
```

Run all specs (both API and e2e)
```bash
npm run all-specs
```

Run the e2e tests
```bash
npx playwright test
```

Run the API tests
```bash
npm run api-specs
```

#### Windows Users

Removes test reports
```bash
npm run pretest-windows
```

Run all specs (both API and e2e)
```bash
npm run windows-all-specs
```

Run the e2e tests
```bash
npm run windows-e2e-specs
```

Run the API tests
```bash
npm run windows-api-specs
```

### Before doing a commit

Run ESLint to fix any typos
```bash
npm run lint-fix
```

Run ESLint to look out for any typos
```bash
npm run lint-check
```

### Insomnia Setup
All the API tests (valid and invalid) were done using Insomnia.

#### Install Insomnia
Go to [insomnia.rest/download](https://insomnia.rest/download) to download the Insomnia Client and install in your preferred OS.

#### Import API Collection
Once Insomnia Client is installed, you'll need to import the Insomnia collection file located on the folder `Insomnia API Collection` on the root folder of this project.

To import the file, click on `Create > Import from File` or click `Insomnia > Settings > Data > Import Data`.

Once the collection is imported, click on `No Environment > Manage Environments > Base Environment` and add the apiKey (which is the publicKey provided by Marvel Developer API) and the hash.

To generate the hash, you can use the following [website](https://www.md5.cz) to generate it. The format is the following:
```quote
  md5(ts+marvelPrivateKey+marvelPublicKey)

  Ex:
    ts: 1000
    marvelPrivateKey: abcdef
    marvelPublicKey: 123456

    md5(1000abcdef123456)
```

Where `marvelPrivateKey` and `marvelPublicKey` will be the keys provided by Marvel API Developer.