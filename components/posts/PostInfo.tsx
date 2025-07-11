import { Calendar, Tag, ExternalLink } from "lucide-react";
import Link from "next/link";
import { AudioPlayer } from "./AudioPlayer";

interface PostInfoProps {
  filename: string;
  date: string;
  title: string;
  tags: string[];
  categories: string[];
  mediumLink: string;
  audioLink: string;
}

export default function PostInfo({
  filename,
  date,
  title,
  tags,
  categories,
  mediumLink,
  audioLink,
}: PostInfoProps) {
  return (
    <div className="max-w-2xl mx-auto rounded-lg overflow-hidden">
      <div className="p-6 flex flex-col items-center">
        <h1
          id="post-title"
          className="text-3xl text-center font-bold text-primary-foreground mb-4"
        >
          {title}
        </h1>
        <div className="flex items-center text-muted-foreground mb-4">
          <Calendar className="w-5 h-5 mr-2" />
          <time dateTime={new Date(date).toISOString()}>
            {new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              timeZone: "UTC",
            })}
          </time>
        </div>
        <div className=" flex items-center justify-around gap-4">
          <div className="flex flex-wrap items-center">
            <Tag className="w-5 h-5 mr-2 text-blue-500" />
            {tags.map((tag, index) => (
              <Link
                key={index}
                href={`/posts/tags/${encodeURIComponent(tag.toLowerCase())}`}
                className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                tabIndex={0}
                aria-label={`View posts tagged with ${tag}`}
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
        {categories.includes("medium") && (
          <div className="flex flex-wrap items-center py-2 my-2">
            <ExternalLink className="w-5 h-5 mr-2 text-green-500" />
            <Link
              href={mediumLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
              tabIndex={0}
              aria-label="View English version on Medium"
            >
              Link to En version on Medium
            </Link>
          </div>
        )}
      </div>
      <div className="flex items-center justify-center">
        {audioLink && (
          <AudioPlayer
            filePath={`/blogs/${filename}/${audioLink}`}
            className="w-full max-w-md"
          />
        )}
      </div>
    </div>
  );
}
