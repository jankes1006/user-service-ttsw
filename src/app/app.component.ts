import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  static trans: TranslateService;

  constructor(public translate: TranslateService){
    translate.addLangs(['pl','en']);
    translate.setDefaultLang('pl');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/pl|en/) ? browserLang: 'pl');
    AppComponent.trans=translate;
  }

  get trans(){
    return AppComponent.trans;
  }
  
}
