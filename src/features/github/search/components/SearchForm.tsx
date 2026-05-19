"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/src/app/components/ui/button";
import { Input } from "@/src/app/components/ui/input";
import "@/src/app/globals.css";

type Props = {
  onSearch: (keyword: string) => void;
};

export default function SearchForm({ onSearch }: Props) {
  const [keyword, setKeyword] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!keyword.trim()) {
      return;
    }
    onSearch(keyword);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
        flex
        gap-3
        mb-8
      "
    >
      <Input
        type="text"
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
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
