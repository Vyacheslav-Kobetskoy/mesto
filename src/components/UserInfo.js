export class UserInfo {
  constructor(profileName, profileAbout, profileAvatar) {
    this._profileName = profileName;
    this._profileAbout = profileAbout;
    this._profileAvatar = profileAvatar;
    this._userInfo = {};
  }

  getUserInfo() {
    return this._userInfo;
  }

  setUserInfo(userInfo) {
    this._userInfo = {
      name: userInfo.name,
      about: userInfo.about,
      avatar: userInfo.avatar,
      id: userInfo.id,
    };

    this._profileName.textContent = userInfo.name;
    this._profileAbout.textContent = userInfo.about;
    this._profileAvatar.src = userInfo.avatar;
  }
}
