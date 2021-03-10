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
  basePath: "/explorer",
  repository: {
    owner: "arken",
    repo: "core-keyset",
    copyName: "core keyset",
  },
};
