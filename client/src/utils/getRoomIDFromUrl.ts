export default function getRoomIDFromUrl(url: string) {
  return url
    .split('/')
    .filter((part) => part !== '')
    .at(1);
}
