export enum FileCategory {
  IMAGE,
  AUDIO,
  VIDEO,
  TEXT,
  PDF,
  OTHER,
}

const images = new Set<string>([
  "apng",
  "jpg",
  "jpeg",
  "gif",
  "avif",
  "png",
  "svg",
  "webp",
]);

const audios = new Set<string>([
  "mp3",
  "ogg",
  "aac",
  "wav",
  "flac",
  "wma",
  "aiff",
  "alac",
]);
const videos = new Set<string>([
  "wmv",
  "mp4",
  "avi",
  "mpeg",
  "mkv",
  "webm",
  "m4v",
  "mov",
]);
const texts = new Set<string>([
  "txt",
  "text",
  "html",
  "xhtml",
  "tex",
  "xml",
  "adb",
  "ads",
  "ahk",
  "applescript",
  "as",
  "asm",
  "au3",
  "bat",
  "bas",
  "btm",
  "cljs",
  "cmd",
  "coffee",
  "c",
  "cpp",
  "c++",
  "cxx",
  "cs",
  "c#",
  "ino",
  "egg",
  "egt",
  "erb",
  "go",
  "hta",
  "ibi",
  "ici",
  "ijs",
  "itcl",
  "js",
  "ts",
  "tsx",
  "jsfl",
  "ini",
  "kt-kotlin",
  "lua",
  "m",
  "mrc",
  "ncf",
  "nud",
  "nut",
  "pde",
  "php",
  "pl",
  "pm",
  "ps1",
  "ps1xml",
  "psc1",
  "psd1",
  "psm1",
  "py",
  "pyc",
  "pyo",
  "r",
  "rb",
  "rdp",
  "red",
  "rs",
  "yaml",
  "yml",
  "config",
  "toml",
  "sb2/sb3",
  "scpt",
  "scptd",
  "sdl",
  "sh",
  "syjs",
  "sypy",
  "tcl",
  "tns",
  "vbs",
  "xpl",
  "ebuild",
]);

export type FileTileProps = {
  ipfsHash: string;
  name: string;
};

export const getFileExtension = (fileName: string): string => {
  const dot = fileName.lastIndexOf(".") + 1;
  if (dot === 0) {
    return "";
  }
  return fileName.substring(dot);
};

export const getFileCategory = (name: string): FileCategory => {
  const ext = getFileExtension(name);
  if (images.has(ext)) {
    return FileCategory.IMAGE;
  } else if (ext === "pdf") {
    return FileCategory.PDF;
  } else if (audios.has(ext)) {
    return FileCategory.AUDIO;
  } else if (videos.has(ext)) {
    return FileCategory.VIDEO;
  } else if (texts.has(ext)) {
    return FileCategory.TEXT;
  } else {
    return FileCategory.OTHER;
  }
};

export const getUrl = (hash: string) => `https://link.arken.io/ipfs/${hash}`;

export const fetchData = async (
  url: string,
  type: "Uint8Array" | "Blob" | "Text" //how the data will be extracted from the response
): Promise<Uint8Array | string | Blob | null> => {
  let result: Uint8Array | string | Blob | null = null;
  let data: Response;
  try {
    data = await fetch(url);
  } catch {
    return null;
  }
  if (type === "Blob") {
    result = await data.blob();
  } else if (type === "Uint8Array") {
    result = new Uint8Array(await data.arrayBuffer());
  } else if (type === "Text") {
    result = await data.text();
  } else {
    return null;
  }
  return result;
};
