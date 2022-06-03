import Head from "next/head";
import React from "react";

const MetaHead: React.FC<{
  title: string;
  description?: string;
}> = ({ title, description }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta
        name="description"
        content={description ?? "Polley App"}
      />
    </Head>
  );
};

export default MetaHead;
