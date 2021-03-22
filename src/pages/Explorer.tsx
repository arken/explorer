/*
 * This is what you will get at arken.io/explorer
 */
import React, { useCallback, useEffect, useState } from "react";
import { LoaderCircles } from "slate-react-system";
import Base from "../components/Base";
import "../styles/explorer.scss";
import KeysetList from "../components/KeysetList";
import { config, getRepoUrl } from "../explorer_config";
import { findKeysets } from "../external/github";

export type KeysType = Array<any> | null;

export const Explorer = () => {
  const [keys, setKeys] = useState<KeysType>([]);
  const [loading, setLoading] = useState(true);
  const fn = useCallback(async () => {
    setLoading(true);
    setKeys(await findKeysets());
    setLoading(false);
  }, []);

  useEffect(() => {
    fn().then(); //weird hack used because useEffects can't be async
  }, [fn]);
  return (
    <Base pageName={"main"}>
      <div>
        <h1>Arken Explorer</h1>
        <h3>
          Explore{" "}
          <a href={getRepoUrl()} target={"_blank"} rel="noreferrer">
            {config.repository.copyName}
          </a>
        </h3>
        <div className={`keyset-list-container${loading ? " loading" : ""}`}>
          {loading ? (
            <>
              Searching...
              <LoaderCircles />
            </>
          ) : keys === null ? (
            "An error occurred. Please wait for about a minute then refresh."
          ) : (
            <KeysetList keyset={keys} repoName={config.repository.copyName} />
          )}
        </div>
      </div>
    </Base>
  );
};

export default Explorer;
