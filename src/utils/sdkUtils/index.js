/* eslint-disable no-undef */
const SdkUtils = {
  importSdk(src, onload = () => {}) {
    const sdkScriptTag = document.createElement('script')
    sdkScriptTag.src = src
    sdkScriptTag.defer = true
    sdkScriptTag.async = true
    document.head.appendChild(sdkScriptTag)
    sdkScriptTag.onload = onload
  },
  initFacebookSdk() {
    this.importSdk('https://connect.facebook.net/en_US/sdk.js', () => {
      FB.init({
        appId: '2569214810002562',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v7.0'
      })
    })
  },
  initGooglePlatform() {
    this.importSdk('https://apis.google.com/js/platform.js', () => {
      gapi.load('auth2', () => {
        gapi.auth2
          .init({
            client_id:
              '817522585821-m2s87dbeatldlecao9pavqtm98a87tse.apps.googleusercontent.com'
          })
          .then(
            () => {},
            err => err
          )
      })
    })
  },
  async loginFB() {
    return new Promise((resolve, reject) => {
      FB.getLoginStatus(response => {
        if (response.status !== 'connected') {
          FB.login(
            res => {
              if (res.status === 'connected') {
                resolve(res.authResponse)
              }
            },
            {
              scope: 'email,user_birthday,user_gender,user_link'
            }
          )
        }
      })
    })
  },
  async logoutFB() {
    FB.logout()
  },
  async loginGoogle() {
    const GoogleAuth = gapi.auth2.getAuthInstance()
    if (!GoogleAuth.isSignedIn.get()) {
      await GoogleAuth.signIn()
    }
    return GoogleAuth.currentUser.get().getAuthResponse().id_token
  },
  async logoutGoogle() {
    const auth2 = gapi.auth2.getAuthInstance()
    auth2.signOut()
  }
}
export default SdkUtils
