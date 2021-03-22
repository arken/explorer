import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Base from "../components/Base";
import { config } from "../explorer_config";
import { getStyledPath } from "../components/KeysetList";
import { getKeyset, getSha } from "../external/github";
import { LoaderCircles } from "slate-react-system";
import GalleryFiles from "../components/GalleryFiles";
import "../styles/gallery.scss";

const Gallery = () => {
  const { pathname, search } = useLocation();
  const params = new URLSearchParams(search);
  const ksPath = pathname.substring(config.basePath.length + 1);

  const [sha, setSha] = useState<string | null>(params.get("sha"));
  const [keyset, setKeyset] = useState<string[][] | null>(null);
  const [fetchingSha, setFetchingSha] = useState(sha === null);
  const [fetchingKeyset, setFetchingKeyset] = useState(false);

  const getShaCB = useCallback(async () => {
    if (!fetchingSha) setFetchingSha(true);
    setSha(await getSha(ksPath));
    setFetchingSha(false);
  }, [ksPath, fetchingSha]);

  useEffect(() => {
    if (sha) return;
    getShaCB().then();
  }, [sha, getShaCB]);

  const getKeysetCB = useCallback(async () => {
    if (!sha) return; //Should probably re-fetch the sha?
    if (!fetchingKeyset) setFetchingKeyset(true);
    setKeyset(await getKeyset(sha));
    setFetchingKeyset(false);
  }, [fetchingKeyset, sha]);

  useEffect(() => {
    getKeysetCB().then();
  }, []); //yes there's a warning here but if i get rid of deps it spams GH with requests
  return (
    <Base pageName={"gallery"}>
      <Link to={config.basePath}>Back to {config.repository.copyName}</Link>
      <h1>{getStyledPath(ksPath)}</h1>
      {(fetchingSha || fetchingKeyset) && (
        <div style={{ textAlign: "center" }}>
          {fetchingSha && sha === null && "Fetching SHA..."}
          <LoaderCircles />
        </div>
      )}
      {!fetchingSha && sha === null && (
        <span className={"error"}>
          Something went wrong fetching the Keyset's SHA
        </span>
      )}
      {keyset && !fetchingKeyset && <GalleryFiles keyset={keyset} />}
    </Base>
  );
};

export default Gallery;
