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
  // onClick={() => {
  //   if (value.trim() !== '') {
      // firebase
      //   .database()
      //   .ref(`reports/${me?._id}/${me?._id}`)
      //   .set({
      //     reason: value,
      //     createdAt: +new Date()
      //   })
      // notification.success({
      //   message: 'Bạn đã báo cáo bài viết',
      //   duration: 1.5
      // })
      // props.handleOk()
    // } else {
    //   notification.success({
    //     message: 'Bạn chưa báo cáo bài viết',
    //     duration: 1.5
    //   })
    // }
  // }}
  return b
}
