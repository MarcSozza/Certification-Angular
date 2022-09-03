import { Injectable } from '@angular/core';
import { Company } from '../../interfaces/app/company';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  private _companies: Company[] = this.getCompanies();
  constructor() {}

  public get companies(): Company[] {
    return this._companies;
  }

  public getStock(): string {
    return localStorage.getItem('stock');
  }

  public setStock(stock: string): void {
    localStorage.setItem('stock', stock);
  }

  public setCompany(company: Company): void {
    const companies = this.getCompanies();
    companies.push(company);
    this._companies = [...companies];
    localStorage.setItem('companies', JSON.stringify(companies));
  }

  public removeCompany(pos: number): void {
    this._companies = this.companies.filter((value, index) => index !== pos);
    localStorage.setItem('companies', JSON.stringify(this._companies));
  }

  private getCompanies(): Company[] {
    return JSON.parse(localStorage.getItem('companies')) || [];
  }
}
