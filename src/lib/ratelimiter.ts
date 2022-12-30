import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.fixedWindow(20, "10 s"),
});

export const setupProdRateLimit = async (ip: string) =>
  process.env.NODE_ENV === "production" ? await ratelimit.limit(ip) : undefined;
