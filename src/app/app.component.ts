import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  param = { value: 'Typescript' };
  constructor(public translate: TranslateService) {
    translate.addLangs(['English', 'French', 'Hindi']);
    translate.setDefaultLang('English');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match('/English/HindiFrench/') ? browserLang : 'English');
  }
}

