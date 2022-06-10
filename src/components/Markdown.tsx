import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Markdown: React.FC<{ children: string }> = ({ children }) => {
  return (
    <div id="mardown-group">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
};

export default Markdown;
