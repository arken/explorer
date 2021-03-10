export enum FileCategory {
  IMAGE,
  AUDIO,
  VIDEO,
  TEXT,
  PDF,
  OTHER,
}

const images = new Set<string>([
  "jpg",
  "gif",
  "avif",
  "jpeg",
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
  "jsfl",
  ".kt-kotlin",
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

export const getFileCategory = (name: string): FileCategory => {
  const dot = name.lastIndexOf(".") + 1;
  if (dot === 0) {
    return FileCategory.OTHER;
  }
  const ext = name.substring(dot).toLowerCase();
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
