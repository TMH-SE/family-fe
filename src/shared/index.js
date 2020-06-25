// import gql from 'graphql-tag'
// const CLOUDINARY_UPLOAD_PRESET =
//   process.env.CLOUDINARY_UPLOAD_PRESET || 'graduation-pj'
// const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME || 'nhuht'
// const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`
// export const uploadImg = async file => {
//   const data = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       file: file,
//       upload_preset: CLOUDINARY_UPLOAD_PRESET
//     })
//   }
//   const upload = await fetch(CLOUDINARY_UPLOAD_URL, data).then(res =>
//     res.json()
//   )
//   return upload.secure_url
// }

// export const GET_USER = gql`
//   query getUser($userId: ID) {
//     getUser(userId: $userId) {
//       _id
//       firstname
//       lastname
//       avatar
//       coverPhoto
//       email
//       gender
//       phoneNumber
//       birthday
//       expert {
//         jobTitle
//         areasOfExpertise
//         yearsExperience
//         isVerify
//       }
//     }
//   }
// `
// export const UPDATE_USER = gql`
//   mutation updateUser($userId: ID, $editUser: EditUser) {
//     updateUser(userId: $userId, editUser: $editUser)
//   }
// `
// export const UPDATE_USER_INFO = gql`
//   mutation updateUserInfo($userId: ID, $userInfo: UserInfo) {
//     updateUserInfo(userId: $userId, userInfo: $userInfo)
//   }
// `
// export const CHECK_FOLLOW = gql`
//   query checkFollow($id: FollowerInput) {
//     checkFollow(id: $id)
//   }
// `
// export const CREATE_FOLLOWER = gql`
//   mutation createFollower($id: FollowerInput) {
//     createFollower(id: $id)
//   }
// `
// export const DELETE_FOLLOWER = gql`
//   mutation deleteFollower($id: FollowerInput) {
//     deleteFollower(id: $id)
//   }
// `
export * from './graphql'
export * from './upload'
export * from './error'
export * from './table'
export * from './toxicWord'
