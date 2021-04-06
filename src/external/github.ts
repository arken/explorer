import { Octokit } from "@octokit/rest";
import { config } from "../explorer_config";
import { KeysType } from "../pages/Explorer";

const ok = new Octokit();
const KEYSET_SEP = "  ";

export const findKeysets = async () => {
  let keys: KeysType = null;
  const { owner, repo } = config.repository;
  await ok.search
    .code({ q: `extension:ks+repo:${owner}/${repo}` })
    .then((res) => {
      keys = res.data.items;
    })
    .catch(() => {
      keys = null;
    });
  return keys;
};

export const getSha = async (path: string): Promise<string | null> => {
  if (!path) return null;
  const { owner, repo } = config.repository;
  const i = path.lastIndexOf("/") + 1;
  const name = path.substring(i);
  const dir = i > 0 ? path.substring(0, i) : "";
  let response: Response;
  try {
    response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${dir}`
    ); //have to use fetch because Octokit has a cors issue
  } catch {
    return null;
  }
  const data = await response.json();
  for (const file of data) {
    if (file && file.name === name) {
      return file.sha;
    }
  }
  return null;
};

export const getKeyset = async (
  sha: string
): Promise<Array<Array<string>> | null> => {
  if (!sha || sha.length !== 40) return null;
  //^ this check must change if GH ever switches away form SHA1
  try {
    const response = await ok.request(
      "GET /repos/{owner}/{repo}/git/blobs/{file_sha}",
      {
        owner: config.repository.owner,
        repo: config.repository.repo,
        file_sha: sha,
      }
    );
    const str = atob(response.data.content);
    const matrix = str.split("\n").map((line) => line.split(KEYSET_SEP));
    // split by newline, then by KEYSET_SEP
    return matrix.filter((line) => line.length === 2);
  } catch {
    return null;
  }
};
