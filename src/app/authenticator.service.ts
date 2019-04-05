import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorService {
  private accessKey = 'acessToken';

  // กำหนดค่า access token ไว้ในความจำ browser
  setAuthenticated(accessToken: string): void {
    localStorage.setItem(this.accessKey, accessToken);
  }

  // ดึงค่า access token ในความจำ browser ออกมา
  getAuthenticated(): string {
    return localStorage.getItem(this.accessKey)
  }

  // ล่าค่า access token ที่อยู่ในความจำ browser
  clearAuthenticated(): void {
    localStorage.removeItem(this.accessKey);
  }

}
