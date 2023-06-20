import { shortenString } from "@/lib/utils";
import Link from "next/link";

const Synopsis = ({ content, url }: { content: string; url: string }) => {
  return (
    <div className="mt-4 mb-2">
      {content ? (
        <p className="text-sm">
          {shortenString(content.replace("[Written by MAL Rewrite]", ""))}{" "}
          <span>
            <Link
              className="text-blue-600 dark:text-blue-500 hover:underline"
              href={url}
              target="_blank"
            >
              See more
            </Link>
          </span>
        </p>
      ) : null}
    </div>
  );
};

export default Synopsis;
