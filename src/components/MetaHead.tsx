import Head from "next/head";
import React from "react";

const MetaHead: React.FC<{
  title: string;
}> = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content="Polley App" />
    </Head>
  );
};

export default MetaHead;
