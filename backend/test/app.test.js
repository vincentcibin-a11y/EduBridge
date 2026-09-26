import test, { before, after } from "node:test";
import assert from "node:assert/strict";
import jwt from "jsonwebtoken";
import { createServer } from "node:http";

process.env.JWT_SECRET = "edubridge-test-secret";

const { default: app } = await import("../app.js");

let server;
let baseUrl;
const userToken = jwt.sign(
  { id: "507f1f77bcf86cd799439011", role: "student" },
  process.env.JWT_SECRET,
  { expiresIn: "5m" }
);

before(async () => {
  server = createServer(app);
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  if (server?.listening) {
    await new Promise((resolve, reject) => {
      server.close((error) => error ? reject(error) : resolve());
    });
  }
});

async function request(path, options = {}) {
  return fetch(`${baseUrl}${path}`, options);
}

async function json(response) {
  return response.json();
}

test("GET /api/health returns the service health payload", async () => {
  const response = await request("/api/health");
  assert.equal(response.status, 200);
  assert.deepEqual(await json(response), { status: "ok", service: "EduBridge API" });
});

test("unknown API paths return a JSON 404", async () => {
  const response = await request("/api/not-a-route");
  assert.equal(response.status, 404);
  assert.deepEqual(await json(response), { message: "Endpoint not found" });
});

test("protected doubt listing rejects requests without a bearer token", async () => {
  const response = await request("/api/doubts");
  assert.equal(response.status, 401);
  assert.deepEqual(await json(response), { message: "Authentication required" });
});

test("protected routes reject invalid bearer tokens", async () => {
  const response = await request("/api/doubts", {
    headers: { Authorization: "Bearer not-a-valid-token" }
  });
  assert.equal(response.status, 401);
  assert.deepEqual(await json(response), { message: "Invalid or expired token" });
});

test("doubt creation validates required fields before accessing the database", async () => {
  const response = await request("/api/doubts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({})
  });
  assert.equal(response.status, 400);
  assert.deepEqual(await json(response), {
    message: "Title, description and subject are required"
  });
});

test("review submission rejects malformed booking IDs", async () => {
  const response = await request("/api/reviews/booking/not-an-object-id", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ rating: 5 })
  });
  assert.equal(response.status, 400);
  assert.deepEqual(await json(response), { message: "Invalid booking ID" });
});

test("notification read endpoint rejects malformed notification IDs", async () => {
  const response = await request("/api/notifications/not-an-object-id/read", {
    method: "PUT",
    headers: { Authorization: `Bearer ${userToken}` }
  });
  assert.equal(response.status, 400);
  assert.deepEqual(await json(response), { message: "Invalid notification ID" });
});

test("CORS rejects an unapproved origin", async () => {
  const response = await request("/api/health", {
    headers: { Origin: "https://untrusted.example" }
  });
  assert.equal(response.status, 403);
  assert.deepEqual(await json(response), {
    message: "Origin not allowed by CORS policy"
  });
});

test("malformed JSON returns a client error instead of a server error", async () => {
  const response = await request("/api/doubts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json"
    },
    body: "{invalid-json"
  });
  assert.equal(response.status, 400);
  assert.deepEqual(await json(response), { message: "Invalid JSON body" });
});
