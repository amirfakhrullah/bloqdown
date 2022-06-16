import Head from "next/head";
import React from "react";

const MetaHead: React.FC<{
  title: string;
}> = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content="BloqDown App" />
        <link rel="icon" href="/b.png" />
    </Head>
  );
};

export default MetaHead;
