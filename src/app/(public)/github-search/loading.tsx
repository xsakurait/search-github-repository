import { Skeleton } from "@/src/app/components/ui/skeleton";

// AI生成
export default function Loading() {
  return (
    <main
      className="
        max-w-7xl
        mx-auto
        px-6
        py-10
      "
    >
      <div className="space-y-8">
        <Skeleton className="h-10 w-80" />

        <div className="flex gap-4">
          <Skeleton className="h-12 flex-1" />

          <Skeleton className="h-12 w-32" />
        </div>

        <div className="grid gap-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="
                border
                rounded-xl
                p-6
                space-y-4
              "
            >
              <Skeleton className="h-6 w-2/3" />

              <Skeleton className="h-4 w-full" />

              <Skeleton className="h-4 w-5/6" />

              <div className="flex gap-4 pt-2">
                <Skeleton className="h-4 w-20" />

                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
