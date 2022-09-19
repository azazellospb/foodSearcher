/* eslint-disable class-methods-use-this */
import { UserData } from '../types/models';
import UserDataHandler from './UserDataHandler';

export default class UserDataHandlerToLS extends UserDataHandler {
  static setUserData(data: UserData): void {
    localStorage.setItem(`foodSearcher-${data.email}`, JSON.stringify(data));
  }

  static getName(email: string): string {
    if (localStorage.getItem(`foodSearcher-${email}`)) {
      const userData: UserData = JSON.parse(localStorage.getItem(`foodSearcher-${email}`) || '');
      return userData.name;
    } throw new Error('Can not find user name');
  }

  static hasSuchUser(email: string): boolean {
    return !!localStorage.getItem(`foodSearcher-${email}`);
  }

  static verifyLogin(email: string, password: string): boolean {
    if (localStorage.getItem(`foodSearcher-${email}`)) {
      const userData: UserData = JSON.parse(localStorage.getItem(`foodSearcher-${email}`) || '');
      return userData.password === password;
    } return false;
  }

  static setCurrentUser(email: string): void {
    const name = this.getName(email);
    localStorage.setItem('currentUser', JSON.stringify({ name, email }));
  }

  static setHistory(email: string, query: string): void {
    const userData: UserData = JSON.parse(localStorage.getItem(`foodSearcher-${email}`) as string);
    if (!userData.history) userData.history = [];
    if (userData.history[userData.history.length - 1] !== query) userData.history.push(query);
    localStorage.setItem(`foodSearcher-${email}`, JSON.stringify(userData));
  }

  static getLastQuery(email:string): string {
    const userData: UserData = JSON.parse(localStorage.getItem(`foodSearcher-${email}`) as string);
    if (!userData.history) return '';
    return userData.history[userData.history.length - 1];
  }

  static addToFavorites(email: string, recipeId: string): void {
    const userData: UserData = JSON.parse(localStorage.getItem(`foodSearcher-${email}`) as string);
    if (userData.favorites) {
      userData.favorites.push(recipeId);
    } else {
      userData.favorites = [];
      userData.favorites.push(recipeId);
    }
    localStorage.setItem(`foodSearcher-${email}`, JSON.stringify(userData));
  }

  static getFavorites(email: string): string[] {
    const userData: UserData = JSON.parse(localStorage.getItem(`foodSearcher-${email}`) as string);
    return userData.favorites;
  }

  static deleteFromFavorites(email: string, recipeId: string): void {
    const userData: UserData = JSON.parse(localStorage.getItem(`foodSearcher-${email}`) as string);
    if (userData.favorites) {
      userData.favorites = userData.favorites.filter((recipe) => recipe !== recipeId);
    }
    localStorage.setItem(`foodSearcher-${email}`, JSON.stringify(userData));
  }

  static getCurrentUser() {
    if (localStorage.getItem('currentUser')) {
      return JSON.parse(localStorage.getItem('currentUser') || '');
    } return '';
  }
}
