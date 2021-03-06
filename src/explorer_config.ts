type ConfigRepository = {
  owner: string;
  repo: string;
  copyName: string;
  // copyName is the name to be used in copy, i.e. the name that might appear on
  // the site. It may be title-cased if appropriate.
};

type Config = {
  basePath: string; // where on your website this instance will live
  repository: ConfigRepository;
};

export const config: Config = {
  basePath: "/explorer", //If you change this, also change the "homepage" key in ../package.json
  repository: {
    owner: "DaniloHP",
    repo: "explorer-testing",
    copyName: "core keyset",
  },
};

export const getRepoUrl = () =>
  `https://github.com/${config.repository.owner}/${config.repository.repo}`;
