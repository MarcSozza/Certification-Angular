import { Component, VERSION } from '@angular/core';
import { FinnHubService } from './shared/services/api/finn-hub.service';
import { CompanyService } from './shared/services/utils/company.service';
import { LocalStorageService } from './shared/services/utils/local-storage.service';
import { SentimentService } from './shared/services/utils/sentiment.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    FinnHubService,
    CompanyService,
    LocalStorageService,
    SentimentService,
  ],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
}
