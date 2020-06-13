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
export const GET_POSTS = gql`
  query posts {
    posts {
      _id
      title
      thumbnail
      isActive
      content
      community {
        _id
        name
        avatar
      }
      createdBy {
        _id
        firstname
        lastname
        avatar
      }
      createdAt
      updatedAt
      deletedBy {
        _id
        firstname
        lastname
        avatar
      }
      updatedBy {
        _id
        firstname
        lastname
        avatar
      }
      deletedAt
    }
  }
`
export const CHECK_IS_SAVED = gql`
  query checkIsSaved($id: SavedPostInput) {
    checkIsSaved(id: $id)
  }
`
export const CREATE_AND_DELETE_SAVEDPOST = gql`
  mutation createAndDeleteSavedPost($id: SavedPostInput, $post: PostInput) {
    createAndDeleteSavedPost(id: $id, post: $post)
  }
`
export const GET_SAVEDPOST_BY_USER = gql`
  query getSavedPostByUser($userId: String) {
    getSavedPostByUser(userId: $userId) {
      _id {
        userId
        postId
      }
      post {
        _id
        title
        content
        thumbnail
        community {
          _id
          name
          avatar
        }
        isActive
        createdAt
      }
    }
  }
`
