export class UserInfo {
  constructor(profileName, profileStatus) {
    this.profileName = profileName;
    this.profileStatus = profileStatus;
  }

  getUserInfo() {
    const userInfo = {
      name: this.profileName.textContent,
      status: this.profileStatus.textContent,
    };
    return userInfo;
  }

  setUserInfo(userInfo) {
    this.profileName.textContent = userInfo.name;
    this.profileStatus.textContent = userInfo.status;
  }
}
