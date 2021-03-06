export const getFilename = (url: string) => {
  if (url) {
    var m = url.toString().match(/.*\/(.+?)\./)
    if (m && m.length > 1) {
      return m[1]
    }
  }
  return ''
}
