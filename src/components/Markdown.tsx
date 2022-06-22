import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Markdown: React.FC<{ children: string }> = ({ children }) => {
  return (
    <article className="prose sm:prose-base prose-sm prose-gray max-w-none">
      <div className="mardown-group">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
      </div>
    </article>
  );
};

export default Markdown;
