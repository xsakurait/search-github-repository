/** public/icons に置いた {言語}-icon.svg と GitHub の language 名の対応 */
const LANGUAGE_ICON_MAP: Record<string, string> = {
  typescript: "typescript-icon.svg",
  java: "java-icon.svg",
  html: "html-icon.svg",
  c: "c-icon.svg",
  "c++": "c-plusplus-icon.svg",
  css: "css-icon.svg",
  markdown: "markdown-icon.svg",
  php: "php-icon.svg",
  go: "golang-icon.svg",
  golang: "golang-icon.svg",
  python: "python-icon.svg",
  vue: "vue-icon.svg",
  javascript: "react-icon.svg",
  react: "react-icon.svg",
  jsx: "react-icon.svg",
};

export function getLanguageIconSrc(language: string | null): string {
  if (!language) {
    return "/icons/unknown-icon.svg";
  }

  const iconFile =
    LANGUAGE_ICON_MAP[language.toLowerCase()] ?? "unknown-icon.svg";

  return `/icons/${iconFile}`;
}
