import Select from "@/components/Select";
import Trash from "@/components/TrashIcon";
import { prisma } from "@/lib/db";
import { removeFromWatchlist } from "@/lib/server/actions";
import { revalidatePath } from "next/cache";

const WatchlistPage = async () => {
  const data = await prisma.animeList.findMany();

  if (!data.length) {
    return (
      <div className="flex justify-center items-center min-h-[500px]">
        <p className="border border-black p-8">
          You do not have any anime watchlisted.
        </p>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <h1 className="text-xl uppercase font-bold my-8">Watchlist</h1>
      <div>
        {data.map((ele, i) => {
          return (
            <div key={ele.id}>
              <div className="card flex-row justify-between items-center h-20 bg-base-200 rounded-box p-2 px-4">
                <div>
                  <h2 className="uppercase font-bold">
                    {ele.title} {ele.year ? <span>({ele.year})</span> : null}
                  </h2>
                  {ele.genres ? (
                    <p className="text-sm">Genres: {ele.genres}</p>
                  ) : null}
                  {ele.type ? (
                    <p className={`badge bg-red-500 text-white uppercase`}>
                      {ele.type}
                    </p>
                  ) : null}
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-grow">
                    <Select status={ele.watch_status} id={ele.id} />
                  </div>
                  <form>
                    <button
                      formAction={async () => {
                        "use server";
                        await removeFromWatchlist(ele.id);
                        revalidatePath("/");
                      }}
                      className="btn btn-ghost btn-sm"
                    >
                      <Trash />
                    </button>
                  </form>
                </div>
              </div>
              {data.length - 1 === i ? null : (
                <div className="divider mx-1 my-1"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WatchlistPage;
