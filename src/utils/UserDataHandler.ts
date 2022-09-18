import { UserData } from '../types/models';

export default abstract class UserDataHandler {
  abstract setUserData(data: UserData): void;
  abstract getName(email: string): string;
  // abstract setOnlineStatus(email: string): void;
  // abstract setOfflineStatus(email: string): void;
  // abstract getStatus(email: string): string;
  abstract hasSuchUser(email:string): boolean;
  abstract verifyLogin(email: string, password: string): boolean;
  abstract setCurrentUser(email: string): void;
  abstract getCurrentUser(): { email: string, name: string };
  abstract setHistory(email: string, query: string): void;
  abstract getLastQuery(email: string): string;
}
