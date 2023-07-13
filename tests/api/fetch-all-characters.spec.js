const { test, expect } = require('@playwright/test');

const { apiData, hash } = require('../../data/apiConfig')

test.describe("Valid GET Requests Scenarios", () => {

  let comicId;
  test('GET All Characters', async ({ request }) => {
    const response = await request.get(`characters`, {
      params: {
        apikey: apiData.publicKey,
        limit: apiData.limit,
        ts: apiData.timeStamp,
        hash: hash.md5Hash,
      },
    });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const respBody = await response.json();
    expect(respBody.data.results[0]).toHaveProperty("comics");
  });

});

test.describe("Invalid GET Requests Scenarios", async () => {

  test('GET All Characters without hash', async ({ request }) => {
    const response = await request.get(`characters`, {
      params: {
        ts: apiData.timeStamp,
        apikey: apiData.publicKey
      },
    });
    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(409);
    const respBody = await response.json();
    expect(respBody).toHaveProperty("message", "You must provide a hash.");
  });

  test('GET All Characters without timestamp', async ({ request }) => {
    const response = await request.get(`characters`, {
      params: {
        hash: hash.md5Hash,
        apikey: apiData.publicKey
      },
    });
    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(409);
    const respBody = await response.json();
    expect(respBody).toHaveProperty("message", "You must provide a timestamp.");
  });

  test('GET All Characters without timestamp and hash', async ({ request }) => {
    const response = await request.get(`characters`, {
      params: {
        apikey: apiData.publicKey
      },
    });
    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(409);
    const respBody = await response.json();
    expect(respBody).toHaveProperty("message", "You must provide a hash.");
  });

  test('GET All Characters without apiKey', async ({ request }) => {
    const response = await request.get(`characters`, {
      params: {
        ts: apiData.timeStamp,
        hash: hash.md5Hash
      },
    });
    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(409);
    const respBody = await response.json();
    expect(respBody).toHaveProperty("message", "You must provide a user key.");
  });

  test('GET All Characters without any parameters', async ({ request }) => {
    const response = await request.get(`characters`, {});
    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(409);
    const respBody = await response.json();
    expect(respBody).toHaveProperty("message", "You must provide a user key.");
  });

  test('GET All Characters wit invalid timestamp', async ({ request }) => {
    const response = await request.get(`characters`, {
      params: {
        ts: 'test',
        apikey: apiData.publicKey,
        hash: hash.md5Hash
      },
    });
    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(401);
    const respBody = await response.json();
    expect(respBody).toHaveProperty("message", "That hash, timestamp and key combination is invalid.");
  });

  test('GET All Characters wit invalid timestamp and hash', async ({ request }) => {
    const response = await request.get(`characters`, {
      params: {
        ts: 'test',
        apikey: apiData.publicKey,
        hash: 'test'
      },
    });
    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(401);
    const respBody = await response.json();
    expect(respBody).toHaveProperty("message", "That hash, timestamp and key combination is invalid.");
  });

  test('GET All Characters wit invalid apiKey', async ({ request }) => {
    const response = await request.get(`characters`, {
      params: {
        ts: apiData.timeStamp,
        apikey: 'test',
        hash: hash.md5Hash
      },
    });
    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(401);
    const respBody = await response.json();
    expect(respBody).toHaveProperty("message", "The passed API key is invalid.");
  });

  test('GET All Characters wit invalid apiKey and timestamp', async ({ request }) => {
    const response = await request.get(`characters`, {
      params: {
        ts: 'test',
        apikey: 'test',
        hash: hash.md5Hash
      },
    });
    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(401);
    const respBody = await response.json();
    expect(respBody).toHaveProperty("message", "The passed API key is invalid.");
  });

  test('GET All Characters wit invalid apiKey and hash', async ({ request }) => {
    const response = await request.get(`characters`, {
      params: {
        ts: apiData.timeStamp,
        apikey: 'test',
        hash: 'test'
      },
    });
    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(401);
    const respBody = await response.json();
    expect(respBody).toHaveProperty("message", "The passed API key is invalid.");
  });

  test('GET All Characters wit invalid parameters', async ({ request }) => {
    const response = await request.get(`characters`, {
      params: {
        ts: 'test',
        apikey: 'test',
        hash: 'test'
      },
    });
    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(401);
    const respBody = await response.json();
    expect(respBody).toHaveProperty("message", "The passed API key is invalid.");
  });
});