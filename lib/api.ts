/**
 * Placeholder frontend API utility (Phase 3.1).
 *
 * Not wired up yet — Phase 3.1 uses frontend/lib/mockData.ts instead.
 * This only reserves the shape a later phase will use to fetch from
 * the FastAPI backend. The frontend never calls an external financial
 * API directly; the intended flow is always:
 *
 *   FastAPI -> Next.js -> UI
 */

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api/v1";

export async function apiGet<T>(path: string): Promise<T> {
  throw new Error(
    `apiGet() is not implemented yet (Phase 3.1 uses mock data). Requested path: ${path}`
  );
}
