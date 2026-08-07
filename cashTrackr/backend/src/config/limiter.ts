import { rateLimit } from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 min
  limit: 10,
  message: { error: "You've reached your limit of requests" },
});
