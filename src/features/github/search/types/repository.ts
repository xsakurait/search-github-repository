export type Repository = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  language: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
};

export type SearchRepositoriesResponse = {
  total_count: number;
  items: Repository[];
};
