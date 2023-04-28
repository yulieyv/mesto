export default class UserInfo {
  constructor({ name, job, avatar }) {
    this._name = document.querySelector(name);
    this._job = document.querySelector(job);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent,
    };
  }

  setUserInfo({ name, about, avatar }) {
    this._name.textContent = name;
    this._job.textContent = about;
    this._avatar.src = avatar;
  }

  changeUserInfo({ name, about }) {
    this._name.textContent = name;
    this._job.textContent = about;
  }

  setUserAvatar({ newAvatar }) {
    this._avatar.src = newAvatar;
  }
}
