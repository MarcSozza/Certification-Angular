import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocalStorageService } from '../shared/services/utils/local-storage.service';
import { CompanyService } from '../shared/services/utils/company.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Company } from '../shared/interfaces/app/company';
import { FinnHubService } from '../shared/services/api/finn-hub.service';
import { SentimentService } from '../shared/services/utils/sentiment.service';

@Component({
  selector: 'exo-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public companies: Company[];
  public isLoading: Observable<boolean>;
  public subscription: Subscription;

  constructor(
    private readonly companyService: CompanyService,
    private readonly localStorage: LocalStorageService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.companies = this.localStorage.companies;
    this.subscription = this.companyService.company.subscribe((data) =>
      this.reinitCompanies(data)
    );
    this.isLoading = this.companyService.loading$;
  }

  public deleteCompany(pos: number): void {
    this.localStorage.removeCompany(pos);
    this.companies = this.localStorage.companies;
  }

  public redirection(code: string): void {
    this.router.navigate(['sentiment', code]);
  }

  public reinitCompanies(company: Company) {
    this.localStorage.setCompany(company);
    this.companies = this.localStorage.companies;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
