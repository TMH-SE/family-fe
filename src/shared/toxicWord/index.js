const toxicWords = [
  'dm',
  'cl',
  'clm',
  'đéo',
  'fuck',
  'cmm',
  'shit',
  'dmm',
  'má mày',
  'lồn què'
]
const replaceWord = word => {
  return word
    .split('')
    .map(w => (w.trim() ? '*' : ' '))
    .join('')
}
export const replaceToxicWords = value => {
  let b = value
  toxicWords.map(word => {
    b = b.replace(word, replaceWord(word))
  })
  return b
}
