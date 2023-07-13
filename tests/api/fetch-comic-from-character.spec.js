const { test, expect } = require('@playwright/test');

const { apiData, hash } = require('../../data/apiConfig')

test.describe("Valid GET Requests Scenarios", () => {

  let characterId;
  test('Fetch All Comics from Character', async ({ request }) => {
    const response = await request.get(`characters`, {
      params: {
        limit: apiData.limit,
        ts: apiData.timeStamp,
        apikey: apiData.publicKey,
        hash: hash.md5Hash,
        nameStartsWith: apiData.characterName
      },
    });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const respBody = await response.json();
    characterId = respBody.data.results[10].id;
  });

  test('GET All Comics from Spider-Man', async ({ request }) => {
    const response = await request.get(`characters/${characterId}/comics`, {
      params: {
        limit: apiData.limit,
        ts: apiData.timeStamp,
        apikey: apiData.publicKey,
        hash: hash.md5Hash
      },
    });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const respBody = await response.json();
    expect(respBody.data.results[0]).toHaveProperty("issueNumber");
  });
});

test.describe("Invalid GET Requests Scenarios", async () => {

  test('GET All Characters from Invalid Comic Id', async ({ request }) => {
    const response = await request.get(`characters/test/comics`, {
      params: {
        ts: apiData.timeStamp,
        apikey: apiData.publicKey,
        hash: hash.md5Hash
      },
    });
    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(409);
    const respBody = await response.json();
    expect(respBody).toHaveProperty("status", "You must pass at least one valid character if you set the character filter.");
  });

  test('GET All Characters Without Comic Id', async ({ request }) => {
    const response = await request.get(`characters/comics`, {
      params: {
        ts: apiData.timeStamp,
        apikey: apiData.publicKey,
        hash: hash.md5Hash
      },
    });
    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(404);
    const respBody = await response.json();
    expect(respBody).toHaveProperty("status", "We couldn\'t find that character");
  });
});