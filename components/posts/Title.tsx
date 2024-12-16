import formatDate from "@/utils/formatDate";
import React from "react";
import { CalendarFold, Timer } from "lucide-react";
import TagBadge from "./TagBadge";

interface Props {
  title: string;
  date: string;
  tags: string[];
  readingTime: number;
}
export default function Title(props: Props) {
  return (
    <div className="my-4 text-center items-center flex flex-col">
      <h1 className="text-5xl font-bold font-cabin">{props.title}</h1>
      <div className="flex gap-3 my-4">
        <div className="flex gap-2">
          <CalendarFold />
          {formatDate(props.date)}
        </div>
        |
        <div className="flex gap-2">
          <Timer />~{props.readingTime} min read
        </div>
      </div>
      <div className="flex gap-2">
        {props.tags.map((tag) => (
          <TagBadge key={tag} text={tag} />
        ))}
      </div>
    </div>
  );
}
