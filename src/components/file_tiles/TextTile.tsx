import React, { useEffect, useState } from "react";
import { fetchData, FileTileProps, getUrl } from "./file_util";
import NewTabLink from "../NewTabLink";

const previewCharLimit = 512;

const TextTile = ({ name, ipfsHash }: FileTileProps) => {
  const [content, setContent] = useState<string | null | undefined>(undefined);
  let preview = "";
  if (content) {
    const lim = Math.min(content.length, previewCharLimit);
    preview = content.substring(0, lim);
    if (lim < content.length) preview += "...";
  }
  const url = getUrl(ipfsHash);
  useEffect(() => {
    fetchData(url, "Text").then((data) => {
      if (!data || typeof data === "string") {
        setContent(data);
      }
    });
  });
  return (
    <div className={"file-tile file-tile--txt"}>
      {content && (
        <>
          <div className={"content-container"}>
            <pre className={"content"}>{preview}</pre>
          </div>
          <NewTabLink href={url}>{name}</NewTabLink>
        </>
      )}
      {content === undefined && "Loading..."}
      {content === null && (
        <>
          Error while fetching or decoding {name}. You can find it{" "}
          <NewTabLink href={url}>here</NewTabLink>
        </>
      )}
    </div>
  );
};

export default TextTile;
