"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/src/app/components/ui/button";
import { Input } from "@/src/app/components/ui/input";
import "@/src/app/globals.css";

type Props = {
  setKeyword: (keywords: string) => void;
  keyword: string;
  onSearch: (keyword: string, page?: number) => Promise<void>;
};

export default function SearchForm({ keyword, setKeyword, onSearch }: Props) {
  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSearch(keyword, 1);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="
        flex
        gap-3
        mb-8
      "
    >
      <Input
        type="text"
        value={keyword}
        onChange={(ev) => setKeyword(ev.target.value)}
        placeholder="
          リポジトリ検索
        "
        className="
          flex-1
          border
          rounded
          p-3
        "
      />

      <Button
        type="submit"
        className="
          bg-black
          text-white
          px-6
          rounded
        "
      >
        Search
      </Button>
    </form>
  );
}
