import { Component, OnInit, IterableDiffers, SimpleChanges, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { HomeFormComponent } from '../home-form/home-form.component';

@Component({
  selector: 'app-home-form-config',
  templateUrl: './home-form-config.component.html',
  styleUrls: ['./home-form-config.component.css']
})
export class HomeFormConfigComponent implements OnInit {
  baseString: string = '';
  operators: Array<string> = new Array<string>();

  private differ: IterableDiffers;

  constructor(
    private _snackBar: MatSnackBar,
    public _form: HomeFormComponent, 
    private _differs: IterableDiffers
  ) { this.differ = _differs; }

  ngDoCheck() {
    const changes = this.differ.find(this._form.generalTerms);
    if (changes) {
      this.getStringFormatted();
      this._form.updateBaseString(this.baseString);
    }
  }

  ngOnInit() {
  }

  public isLastTerm(index: number): boolean {
    return (index + 1) !== this._form.generalTerms.length;
  }

  public updateOperator(index: number, operator: string): void {
    this.operators[index] = operator;
  }

  public getStringFormatted(): void {
    this.baseString = '(';
    for (let i = 0; i < this._form.generalTerms.length; i++) {
      let term = this._form.generalTerms[i];
      this.baseString += `${this.getTerm(term)}${this.getOperator(i)}`;
    }
    this.baseString += ')';
  }

  private getOperator(index: number): string {
    if (!this.isLastTerm(index))
      return ``;
    if (this.operators[index] === undefined || this.operators[index] === 'OR')
      return ` OR `;
    return `) AND (`;
  }

  private getTerm(term: string): string {
    if (term.indexOf(' ') > -1 || term.indexOf('-') > -1)
      return `"${term}"`;
    return term;
  }

  public copy(): void {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (this.baseString));
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
    this.showMessage();
  }

  private showMessage(): void {
    this._snackBar.open('The base string was copied', 'Ok!', {
      duration: 2000,
    }); 
  }
}
