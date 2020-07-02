
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
  'lồn',
  'wtf',
  'đụ'
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
    const regex = new RegExp(`${word}`, 'gi')
    b = b.replace(regex, replaceWord(word))
  })
  // onClick={() => {
  // }}
  return b
}
export const HighLightToxicWords = value => {
  let b = value
  toxicWords.map(word => {
    const regex = new RegExp(`${word}`, 'gi')
    b = b.replace(regex, `<span style="background-color:rgb(255, 10, 9, 0.7)">${word}</span>`)
  })
  return b
}
