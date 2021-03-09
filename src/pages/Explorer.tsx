/*
 * This is what you will get at arken.io/explorer
 */
import React, { useEffect, useState } from "react";
import { LoaderCircles } from "slate-react-system";
import Base from "../components/Base";
import { Octokit } from "@octokit/rest";
import "../styles/explorer.scss";
import KeysetList from "../components/KeysetList";

export type KeysType = Array<any> | null;

export const Explorer = () => {
  const [keys, setKeys] = useState<KeysType>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    new Octokit().search
      .code({ q: `extension:ks+repo:arken/core-keyset` })
      .then((res) => {
        setKeys(res.data.items);
      })
      .catch(() => {
        setKeys(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <Base pageName={"main"}>
      <div>
        <h1>Arken Explorer</h1>
        <h3>
          Explore the{" "}
          <a
            href={"https://github.com/arken/core-keyset"}
            target={"_blank"}
            rel="noreferrer"
          >
            Core Keyset
          </a>
        </h3>
        <div className={`keyset-list-container${loading ? " loading" : ""}`}>
          {loading ? (
            <>
              Searching...
              <LoaderCircles />
            </>
          ) : keys === null ? (
            <>An error occurred. Please wait for about a minute then refresh.</>
          ) : (
            <KeysetList keysets={keys} repoName={"Core Keyset"} />
          )}
        </div>
      </div>
    </Base>
  );
};

export default Explorer;
