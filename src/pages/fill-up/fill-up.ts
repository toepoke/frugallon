import { Component } from '@angular/core';

import { MenuController } from 'ionic-angular';

@Component({
  selector: 'page-fill-up',
  templateUrl: "fill-up.html"
})
export class FillUpPage {

  constructor(
    protected menu: MenuController
  ) {
  }

}

