import React, { useEffect, useState } from "react";
import { FileTileProps, getUrl } from "./file_util";
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
    fetch(`${url}`)
      .then((res) =>
        res
          .text()
          .then((content) => {
            setContent(content);
          })
          .catch(() => setContent(null))
      )
      .catch(() => setContent(null));
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
          Error in fetching or decoding {name}. You can find it{" "}
          <NewTabLink href={url}>here</NewTabLink>
        </>
      )}
    </div>
  );
};

export default TextTile;
