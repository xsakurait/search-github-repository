import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Pagination from "@/src/features/github/search/components/Pagenation";

describe("Pagination", () => {
  it("Nextボタンでpageが1加算", () => {
    const setPage = vi.fn();

    render(
      <Pagination
        pages={1}
        setPage={setPage}
        repositories={100}
      />
    );

    const button = screen.getByRole("button", { name: /next/i });
    fireEvent.click(button);

    expect(setPage).toHaveBeenCalledWith(2);
  });
});