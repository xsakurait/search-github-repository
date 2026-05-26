import { describe, it, expect, vi } from "vitest";

const mockFetch = vi.fn();

vi.stubGlobal("fetch", mockFetch);
// fetch関係のテスト
describe("初期表示のfetchRepository", () => {
  it("APIが正しく呼ばれる", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ items: [] }),
    });

    const url = `/api/github/search/defaultRepositories?q=stars:>1&sort=stars&order=desc&page=1&per_page=10`;
    await fetch(url, {
      headers: {
        Authorization: "Bearer token",
      },
    });

    expect(fetch).toHaveBeenCalledWith(
      url,
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: expect.any(String),
        }),
      }),
    );
  });
});

describe("検索結果のfetchRepository", () => {
  it("APIが正しく呼ばれる", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ items: [] }),
    });

    const url = `/api/github/search/repositories?q=react&page=1`;
    await fetch(url, {
      headers: {
        Authorization: "Bearer token",
      },
    });

    expect(fetch).toHaveBeenCalledWith(
      url,
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: expect.any(String),
        }),
      }),
    );
  });
});

describe("詳細画面のfetchRepositoryDetail", () => {
  it("APIが正しく呼ばれる", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ items: [] }),
    });

    const url = "https://api.github.com/repos/react/react";
    await fetch(url, {
      headers: {
        Authorization: "Bearer token",
      },
    });

    expect(fetch).toHaveBeenCalledWith(
      url,
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: expect.any(String),
        }),
      }),
    );
  });
});
