import React from "react";

export default function BlockQuote(props: { children: React.ReactNode }) {
  return (
    <div className="pl-4 border-l-4 border-gray-300 italic my-8">
      <div className="italic text-xl text-gray-500 leading-relaxed">
        {props.children}
      </div>
    </div>
  );
}
