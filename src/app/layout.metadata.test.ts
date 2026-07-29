import { describe, expect, it } from "vitest";
import { metadata } from "./metadata";

describe("metadata da aplicação (layout raiz)", () => {
  it("declara noindex e nofollow", () => {
    const robots = metadata.robots as { index?: boolean; follow?: boolean };
    expect(robots.index).toBe(false);
    expect(robots.follow).toBe(false);
  });
});
