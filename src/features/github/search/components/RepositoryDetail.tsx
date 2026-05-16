import { Repository } from "../types/repository";

type Props = {
  repository: Repository;
};

export default function RepositoryDetail({ repository }: Props) {
  return (
    <div
      className="
      border
      rounded-xl
      p-6
    "
    >
      <div
        className="
        flex
        items-center
        gap-4
        mb-8
      "
      >
        <img
          src={repository.owner.avatar_url}
          alt={repository.owner.login}
          className="
            w-20
            h-20
            rounded-full
          "
        />

        <div>
          <h1
            className="
            text-3xl
            font-bold
          "
          >
            {repository.full_name}
          </h1>

          <p
            className="
            text-gray-500
          "
          >
            {repository.language}
          </p>
        </div>
      </div>

      <p className="mb-8">{repository.description}</p>

      <div
        className="
        grid
        grid-cols-2
        gap-6
      "
      >
        <div>
          <p
            className="
            text-sm
            text-gray-500
          "
          >
            Stars
          </p>

          <p
            className="
            text-2xl
            font-bold
          "
          >
            {repository.stargazers_count}
          </p>
        </div>

        <div>
          <p
            className="
            text-sm
            text-gray-500
          "
          >
            Watchers
          </p>

          <p
            className="
            text-2xl
            font-bold
          "
          >
            {repository.watchers_count}
          </p>
        </div>

        <div>
          <p
            className="
            text-sm
            text-gray-500
          "
          >
            Forks
          </p>

          <p
            className="
            text-2xl
            font-bold
          "
          >
            {repository.forks_count}
          </p>
        </div>

        <div>
          <p
            className="
            text-sm
            text-gray-500
          "
          >
            Issues
          </p>

          <p
            className="
            text-2xl
            font-bold
          "
          >
            {repository.open_issues_count}
          </p>
        </div>
      </div>

      <a
        href={repository.html_url}
        target="_blank"
        className="
          inline-block
          mt-8
          bg-black
          text-white
          px-4
          py-2
          rounded
        "
      >
        Open GitHub
      </a>
    </div>
  );
}
