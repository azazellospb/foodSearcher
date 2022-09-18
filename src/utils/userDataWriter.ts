/* eslint-disable class-methods-use-this */
import { UserData } from '../types/models';
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

  setHistory(email: string, query: string): void {
    const userData: UserData = JSON.parse(localStorage.getItem(`foodSearcher-${email}`) as string);
    if (!userData.history) userData.history = [];
    if (userData.history[userData.history.length - 1] !== query) userData.history.push(query);
    localStorage.setItem(`foodSearcher-${email}`, JSON.stringify(userData));
  }

  getLastQuery(email:string): string {
    const userData: UserData = JSON.parse(localStorage.getItem(`foodSearcher-${email}`) as string);
    if (!userData.history) return '';
    return userData.history[userData.history.length - 1];
  }

  addToFavorites(email: string, recipeId: string): void {
    const userData: UserData = JSON.parse(localStorage.getItem(`foodSearcher-${email}`) as string);
    if (userData.favorites) {
      userData.favorites.push(recipeId);
    } else {
      userData.favorites = [];
      userData.favorites.push(recipeId);
    }
    localStorage.setItem(`foodSearcher-${email}`, JSON.stringify(userData));
  }

  getFavorites(email: string): string[] {
    const userData: UserData = JSON.parse(localStorage.getItem(`foodSearcher-${email}`) as string);
    return userData.favorites;
  }

  deleteFromFavorites(email: string, recipeId: string): void {
    const userData: UserData = JSON.parse(localStorage.getItem(`foodSearcher-${email}`) as string);
    if (userData.favorites) {
      userData.favorites = userData.favorites.filter((recipe) => recipe !== recipeId);
    }
    localStorage.setItem(`foodSearcher-${email}`, JSON.stringify(userData));
  }

  getCurrentUser() {
    if (localStorage.getItem('currentUser')) {
      return JSON.parse(localStorage.getItem('currentUser') || '');
    } return '';
  }
}
