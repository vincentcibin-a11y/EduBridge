import test, { before, after } from "node:test";
import assert from "node:assert/strict";
import mongoose from "mongoose";
import { createServer } from "node:http";

process.env.JWT_SECRET = process.env.JWT_SECRET || "edubridge-integration-test-secret";
process.env.MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/edubridge_test";

const { default: app } = await import("../app.js");

let server;
let baseUrl;

before(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  await Promise.all(
    Object.values(mongoose.connection.collections).map((collection) =>
      collection.deleteMany({})
    )
  );

  server = createServer(app);
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  if (server?.listening) {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
  await mongoose.disconnect();
});

async function request(path, { token, ...options } = {}) {
  const headers = new Headers(options.headers || {});
  if (token) headers.set("Authorization", `Bearer ${token}`);
  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  const response = await fetch(`${baseUrl}${path}`, { ...options, headers });
  const body = await response.json();
  return { response, body };
}

async function registerUser(suffix, name) {
  const { response, body } = await request("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({
      name,
      email: `${suffix}@example.test`,
      password: "test-password-123",
      college: "EduBridge Test College",
      course: "MCA"
    })
  });
  assert.equal(response.status, 201, JSON.stringify(body));
  assert.ok(body.token);
  assert.ok(body.user.id);
  return body;
}

test("registration, peer doubt solving, booking, completion and review work end to end", async (t) => {
  const learner = await registerUser("learner", "Test Learner");
  const tutor = await registerUser("tutor", "Test Tutor");

  await t.test("login returns a token and public user data", async () => {
    const { response, body } = await request("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: "LEARNER@example.test",
        password: "test-password-123"
      })
    });
    assert.equal(response.status, 200);
    assert.ok(body.token);
    assert.equal(body.user.email, "learner@example.test");
    assert.equal("password" in body.user, false);
  });

  let doubtId;
  await t.test("learner can create a doubt and tutor can answer it", async () => {
    const created = await request("/api/doubts", {
      method: "POST",
      token: learner.token,
      body: JSON.stringify({
        title: "How do indexes work?",
        description: "Please explain database indexes with an example.",
        subject: "DBMS",
        tags: ["mongodb", "indexes"]
      })
    });
    assert.equal(created.response.status, 201, JSON.stringify(created.body));
    doubtId = created.body.doubt._id;
    assert.equal(created.body.doubt.title, "How do indexes work?");

    const answered = await request(`/api/doubts/${doubtId}/answers`, {
      method: "POST",
      token: tutor.token,
      body: JSON.stringify({ content: "An index helps the database find records faster." })
    });
    assert.equal(answered.response.status, 201, JSON.stringify(answered.body));
    assert.equal(answered.body.doubt.answers.length, 1);

    const resolved = await request(`/api/doubts/${doubtId}/status`, {
      method: "PUT",
      token: learner.token,
      body: JSON.stringify({ status: "resolved" })
    });
    assert.equal(resolved.response.status, 200, JSON.stringify(resolved.body));
    assert.equal(resolved.body.doubt.status, "resolved");
  });

  let bookingId;
  await t.test("learner can book a tutor and the tutor can accept and complete it", async () => {
    const tomorrow = new Date();
    tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
    const date = tomorrow.toISOString().slice(0, 10);

    const created = await request("/api/bookings", {
      method: "POST",
      token: learner.token,
      body: JSON.stringify({
        tutor: tutor.user.id,
        subject: "DBMS",
        mode: "online",
        date,
        time: "14:30",
        notes: "Integration test session"
      })
    });
    assert.equal(created.response.status, 201, JSON.stringify(created.body));
    bookingId = created.body.booking._id;
    assert.equal(created.body.booking.status, "pending");

    const accepted = await request(`/api/bookings/${bookingId}/accept`, {
      method: "PUT",
      token: tutor.token
    });
    assert.equal(accepted.response.status, 200, JSON.stringify(accepted.body));
    assert.equal(accepted.body.booking.status, "accepted");

    const completed = await request(`/api/bookings/${bookingId}/complete`, {
      method: "PUT",
      token: tutor.token
    });
    assert.equal(completed.response.status, 200, JSON.stringify(completed.body));
    assert.equal(completed.body.booking.status, "completed");
  });

  await t.test("learner can review a completed session only once", async () => {
    const submitted = await request(`/api/reviews/booking/${bookingId}`, {
      method: "POST",
      token: learner.token,
      body: JSON.stringify({ rating: 5, feedback: "Clear and helpful explanation." })
    });
    assert.equal(submitted.response.status, 201, JSON.stringify(submitted.body));
    assert.equal(submitted.body.ratingAverage, 5);
    assert.equal(submitted.body.ratingCount, 1);

    const duplicate = await request(`/api/reviews/booking/${bookingId}`, {
      method: "POST",
      token: learner.token,
      body: JSON.stringify({ rating: 4, feedback: "Duplicate review" })
    });
    assert.equal(duplicate.response.status, 409);

    const tutorReviews = await request(`/api/reviews/tutor/${tutor.user.id}`, {
      token: learner.token
    });
    assert.equal(tutorReviews.response.status, 200);
    assert.equal(tutorReviews.body.reviews.length, 1);
    assert.equal(tutorReviews.body.reviews[0].rating, 5);
  });
});
