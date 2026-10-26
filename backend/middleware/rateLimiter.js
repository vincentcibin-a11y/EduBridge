/**
 * In-memory lightweight rate limiter without external dependencies.
 */
export function createRateLimiter({
  windowMs = 60 * 1000,
  max = 100,
  message = "Too many requests, please try again later.",
  keyGenerator = (req) => req.ip || req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "default"
} = {}) {
  const hits = new Map();

  // Periodic cleanup of stale entries every 5 minutes to prevent memory leak
  const interval = setInterval(() => {
    const now = Date.now();
    for (const [key, data] of hits.entries()) {
      if (now > data.resetTime) {
        hits.delete(key);
      }
    }
  }, 5 * 60 * 1000);

  if (interval.unref) {
    interval.unref();
  }

  const limiter = (req, res, next) => {
    // If in test environment and header indicates skip, allow bypass
    if (process.env.NODE_ENV === "test" && req.headers["x-skip-rate-limit"] === "true") {
      return next();
    }

    const key = keyGenerator(req);
    const now = Date.now();
    let record = hits.get(key);

    if (!record || now > record.resetTime) {
      record = { count: 0, resetTime: now + windowMs };
      hits.set(key, record);
    }

    record.count += 1;

    const remaining = Math.max(0, max - record.count);
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);

    res.setHeader("X-RateLimit-Limit", max);
    res.setHeader("X-RateLimit-Remaining", remaining);
    res.setHeader("X-RateLimit-Reset", Math.ceil(record.resetTime / 1000));

    if (record.count > max) {
      res.setHeader("Retry-After", retryAfter);
      return res.status(429).json({ message });
    }

    next();
  };

  limiter.reset = () => hits.clear();

  return limiter;
}

// 60 requests per 15 minutes for authentication endpoints (prevent brute-force)
export const authLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === "test" ? 200 : 60,
  message: "Too many authentication attempts. Please try again after 15 minutes."
});

// 600 requests per 5 minutes for general API endpoints (prevent flood/DDoS)
export const apiLimiter = createRateLimiter({
  windowMs: 5 * 60 * 1000,
  max: process.env.NODE_ENV === "test" ? 1000 : 600,
  message: "API rate limit exceeded. Please slow down your requests."
});
