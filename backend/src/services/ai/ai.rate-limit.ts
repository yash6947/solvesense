interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class AiRateLimiter {
  private userRequests = new Map<string, RateLimitEntry>();
  private readonly WINDOW_MS = 10 * 60 * 1000; // 10 minutes
  private readonly MAX_REQUESTS = 30; // Max 30 AI queries per 10 mins

  public checkLimit(userId: string): { allowed: boolean; remaining: number; resetInSec: number } {
    const now = Date.now();
    const entry = this.userRequests.get(userId);

    if (!entry || now > entry.resetTime) {
      this.userRequests.set(userId, {
        count: 1,
        resetTime: now + this.WINDOW_MS,
      });
      return { allowed: true, remaining: this.MAX_REQUESTS - 1, resetInSec: Math.round(this.WINDOW_MS / 1000) };
    }

    if (entry.count >= this.MAX_REQUESTS) {
      return {
        allowed: false,
        remaining: 0,
        resetInSec: Math.round((entry.resetTime - now) / 1000),
      };
    }

    entry.count += 1;
    return {
      allowed: true,
      remaining: this.MAX_REQUESTS - entry.count,
      resetInSec: Math.round((entry.resetTime - now) / 1000),
    };
  }
}

export const aiRateLimiter = new AiRateLimiter();
