export class UserInfo {
  constructor(profileName, profileAbout, profileAvatar) {
    this._profileName = profileName;
    this._profileAbout = profileAbout;
    this._profileAvatar = profileAvatar;
    this._userId;
    this._userInfo = {};
  }

  getUserInfo() {
    this._userInfo = {
      name: this._profileName.textContent,
      about: this._profileAbout.textContent,
      avatar: this._profileAvatar.src,
      id: this._userId,
    };
    return this._userInfo;
  }

  setUserInfo(userInfo) {
    this._profileName.textContent = userInfo.name;
    this._profileAbout.textContent = userInfo.about;
    this._profileAvatar.src = userInfo.avatar;
    this._userId = userInfo.id;
  }
}
