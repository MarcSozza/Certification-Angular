import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { CompanyService } from '../shared/services/utils/company.service';
import { LocalStorageService } from '../shared/services/utils/local-storage.service';

@Component({
  selector: 'exo-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  public formStock: FormGroup;
  public subscription: Subscription;
  public isLoading: Observable<boolean>;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly localStorageService: LocalStorageService,
    private readonly companyService: CompanyService
  ) {}

  ngOnInit() {
    this.initForm();
    this.isLoading = this.companyService.loading$;
  }

  public initForm(): void {
    this.formStock = this.formBuilder.group({
      stock: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(5)],
      ],
    });
  }

  public get isInvalid(): boolean {
    return this.formStock.invalid;
  }

  public get stock(): string {
    return this.formStock.value.stock;
  }

  public submit(): void {
    this.localStorageService.setStock(this.stock);
    this.companyService.getCompany(this.stock);
  }
}
