import { UserData } from '../types/models';

export default abstract class UserDataHandler {
  static setUserData(data: UserData): void {
    throw new Error(`Method ${this.name} with data: ${data} should be implemented!`);
  }

  static getName(email: string): string {
    throw new Error(`Method ${this.name} with data: ${email} should be implemented!`);
  }

  static hasSuchUser(email: string): boolean {
    throw new Error(`Method ${this.name} with data: ${email} should be implemented!`);
  }

  static verifyLogin(email: string, password: string): boolean {
    throw new Error(`Method ${this.name} with data: ${email}, ${password}  should be implemented!`);
  }

  static setCurrentUser(email: string): void {
    throw new Error(`Method ${this.name} with data: ${email} should be implemented!`);
  }

  static getCurrentUser(): { email: string } {
    throw new Error(`Method ${this.name}`);
  }

  static setHistory(email: string, query: string): void {
    throw new Error(`Method ${this.name} with data: ${email}, ${query}  should be implemented!`);
  }

  static getLastQuery(email:string): string {
    throw new Error(`Method ${this.name} with data: ${email} should be implemented!`);
  }

  static addToFavorites(email: string, recipeId: string): void {
    throw new Error(`Method ${this.name} with data: ${email}, ${recipeId}  should be implemented!`);
  }

  static deleteFromFavorites(email: string, recipeId: string): void {
    throw new Error(`Method ${this.name} with data: ${email}, ${recipeId}  should be implemented!`);
  }

  static getFavorites(email: string): string[] {
    throw new Error(`Method ${this.name} with data: ${email} should be implemented!`);
  }

  static getHistory(email: string): string[] {
    throw new Error(`Method ${this.name} with data: ${email} should be implemented!`);
  }

  static removeFromHistory(email: string, query: string): void {
    throw new Error(`Method ${this.name} with data: ${email}, ${query}  should be implemented!`);
  }
}
