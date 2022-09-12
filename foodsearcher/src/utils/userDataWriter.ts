/* eslint-disable class-methods-use-this */
import UserData from '../types/models';
import UserDataHandler from './UserDataHandler';

export default class UserDataHandlerToLS extends UserDataHandler {
  setUserData(data: UserData): void {
    localStorage.setItem(`foodSearcher-${data.email}`, JSON.stringify(data));
  }

  getName(email: string): string {
    if (localStorage.getItem(`foodSearcher-${email}`)) {
      const userData: UserData = JSON.parse(localStorage.getItem(`foodSearcher-${email}`) || '');
      return userData.name;
    } throw new Error('Can not find user name');
  }

  // setOnlineStatus(email: string): void {
  //   if (localStorage.getItem(`foodSearcher-${email}`)) {
  //     const userData: UserData = JSON.parse(localStorage.getItem(`foodSearcher-${email}`) || '');
  //     userData.status = 'online';
  //     localStorage.setItem(`foodSearcher-${email}`, JSON.stringify(userData));
  //   } throw new Error('Can not set status');
  // }

  // setOfflineStatus(email: string): void {
  //   if (localStorage.getItem(`foodSearcher-${email}`)) {
  //     const userData: UserData = JSON.parse(localStorage.getItem(`foodSearcher-${email}`) || '');
  //     userData.status = 'offline';
  //     localStorage.setItem(`foodSearcher-${email}`, JSON.stringify(userData));
  //   } throw new Error('Can not set status');
  // }

  // getStatus(email: string): string {
  //   if (localStorage.getItem(`foodSearcher-${email}`)) {
  //     const userData: UserData = JSON.parse(localStorage.getItem(`foodSearcher-${email}`) || '');
  //     return userData.status as string;
  //   } throw new Error('Can not get status');
  // }

  hasSuchUser(email: string): boolean {
    return !!localStorage.getItem(`foodSearcher-${email}`);
  }

  verifyLogin(email: string, password: string) {
    if (localStorage.getItem(`foodSearcher-${email}`)) {
      const userData: UserData = JSON.parse(localStorage.getItem(`foodSearcher-${email}`) || '');
      return userData.password === password;
    } return false;
  }

  setCurrentUser(email: string): void {
    const name = this.getName(email);
    localStorage.setItem('currentUser', JSON.stringify({ name, email }));
  }

  getCurrentUser() {
    if (localStorage.getItem('currentUser')) {
      return JSON.parse(localStorage.getItem('currentUser') || '');
    } return '';
  }
}
