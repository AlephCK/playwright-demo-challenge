//@ts-check
const { test, expect } = require('@playwright/test');
const { apiData, hash } = require('../../data/apiConfig')

test.describe("Valid GET Requests Scenarios", () => {

  let comicId;
  test('Fetch All Comics', async ({ request }) => {
    const response = await request.get(`comics`, {
      params: {
        //@ts-ignore
        apikey: apiData.publicKey,
        limit: apiData.limit,
        ts: apiData.timeStamp,
        hash: hash.md5Hash,
        titleStartsWith: apiData.comicSeries
      },
    });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const respBody = await response.json();
    comicId = respBody.data.results[10].id;
  });

  test('Fetch All Characters from Comic', async ({ request }) => {
    const response = await request.get(`comics/${comicId}/characters`, {
      params: {
        ts: apiData.timeStamp,
        //@ts-ignore
        apikey: apiData.publicKey,
        hash: hash.md5Hash
      },
    });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const respBody = await response.json();
    expect(respBody.data.results[0]).toHaveProperty("description");
  });
});

test.describe("Invalid GET Requests Scenarios", async () => {

  test('GET All Characters from Invalid Comic Id', async ({ request }) => {
    const response = await request.get(`comics/test/characters`, {
      params: {
        ts: apiData.timeStamp,
        //@ts-ignore
        apikey: apiData.publicKey,
        hash: hash.md5Hash
      },
    });
    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(409);
    const respBody = await response.json();
    expect(respBody).toHaveProperty("status", "You must pass at least one valid issue id if you set the issue filter.");
  });

  test('GET All Characters Without Comic Id', async ({ request }) => {
    const response = await request.get(`comics/characters`, {
      params: {
        ts: apiData.timeStamp,
        //@ts-ignore
        apikey: apiData.publicKey,
        hash: hash.md5Hash
      },
    });
    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(404);
    const respBody = await response.json();
    expect(respBody).toHaveProperty("status", "We couldn\'t find that comic_issue");
  });
});