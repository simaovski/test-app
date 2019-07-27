import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material';

@Component({
  selector: 'app-home-form',
  templateUrl: './home-form.component.html',
  styleUrls: ['./home-form.component.css']
})
export class HomeFormComponent implements OnInit {
  @ViewChild('stepper', null) private stepper: MatStepper;


  selectFormGroup: FormGroup;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  public terms: Array<string> = new Array<string>();
  public baseString: string = '';
  public isSecondary: boolean = false;

  constructor(
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.selectFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  public updateTerms(terms: Array<string>): void {
    this.terms = terms;
  }

  public updateBaseString(baseString: string): void {
    this.baseString = baseString;
  }

  public updateIsSecondary(isSecondary: boolean): void {
    this.isSecondary = isSecondary;
  }

  public goStepperIndex(index: number): void {
    this.stepper.selectedIndex = index;
  }
}