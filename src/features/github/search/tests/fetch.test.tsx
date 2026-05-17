import { describe, it, expect, vi } from "vitest";
import { fetchDefaultRepositories, fetchRepository, fetchRepositoryDetail } from "@/src/features/github/search/api/githubApi";

const mockFetch = vi.fn();

vi.stubGlobal("fetch", mockFetch);

describe("初期表示のfetchRepository", () => {
  it("APIが正しく呼ばれる", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ items: [] }),
    });

    await fetchDefaultRepositories(1);

    expect(fetch).toHaveBeenCalledWith(
      "/api/github?q=stars:>&sort=stars&order=desc&page=1&per_page=10",
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      }
    );
  });
});
describe("検索結果のfetchRepository", () => {
  it("APIが正しく呼ばれる", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ items: [] }),
    });

    await fetchRepository("react", 1);

    expect(fetch).toHaveBeenCalledWith(
      "/api/github?q=react&page=1&per_page=10",
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      }
    );
  });
});
describe("詳細画面のfetchRepositoryDetail", () => {
  it("APIが正しく呼ばれる", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ id: 1, name: "react" }),
    });

    await fetchRepositoryDetail("react", "react");

    expect(fetch).toHaveBeenCalledWith(
      "https://api.github.com/repos/react/react",
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      }
    );
  });
});