import gql from 'graphql-tag'

export const GET_USER = gql`
  query getUser($userId: ID) {
    getUser(userId: $userId) {
      _id
      firstname
      lastname
      avatar
      coverPhoto
      email
      gender
      phoneNumber
      birthday
      expert {
        jobTitle
        areasOfExpertise
        yearsExperience
        isVerify
      }
    }
  }
`
export const UPDATE_USER = gql`
  mutation updateUser($userId: ID, $editUser: EditUser) {
    updateUser(userId: $userId, editUser: $editUser)
  }
`
export const UPDATE_USER_INFO = gql`
  mutation updateUserInfo($userId: ID, $userInfo: UserInfo) {
    updateUserInfo(userId: $userId, userInfo: $userInfo)
  }
`
export const CREATE_CHAT = gql`
  mutation createChat($members: [String]) {
    createChat(members: $members) {
      _id
      members
      isBlock
    }
  }
`
export const GET_CHAT_BY_MEMBERS = gql`
  query getChatByMembers($members: [String]) {
    getChatByMembers(members: $members) {
      _id
      members
      isBlock
    }
  }
`
export const GET_CHAT_BY_USER = gql`
  query getChatByUser($userId: String) {
    getChatByUser(userId: $userId) {
      _id
      members
      isBlock
    }
  }
`
export const CHECK_FOLLOW = gql`
  query checkFollow($id: FollowerInput) {
    checkFollow(id: $id)
  }
`
export const CREATE_FOLLOWER = gql`
  mutation createFollower($id: FollowerInput) {
    createFollower(id: $id)
  }
`
export const DELETE_FOLLOWER = gql`
  mutation deleteFollower($id: FollowerInput) {
    deleteFollower(id: $id)
  }
`
