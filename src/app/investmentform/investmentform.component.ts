import { CompoundingPeriods } from './../models/CompoundingPeriods.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TableEntry } from '../models/TableEntry.model';

@Component({
  selector: 'app-investmentform',
  templateUrl: './investmentform.component.html',
  styleUrls: ['./investmentform.component.scss']
})
export class InvestmentformComponent implements OnInit {

  loanTableOutput: TableEntry[];
  inputForm: FormGroup;
  submitted = false;
  n: number;

  compoundingPeriods: CompoundingPeriods[] = [
    {periods: 24, viewValue: "Bi-Weekly"},
    {periods: 12, viewValue: "Monthly"},
    {periods: 6, viewValue: "Bi-Monthly"},
    {periods: 2, viewValue: "Semi-Annual"},
    {periods: 1, viewValue: "Annual"}
  ];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.inputForm = this.formBuilder.group({
      principal: ['100000', Validators.required],
      interestRate: ['6', Validators.required],
      termYears: ['8', Validators.required],
      monthlyPayment: ['700', Validators.required],
      periods: ["Monthly", Validators.required]
    });
  }

  Submit() {
    this.submitted = true;

    const p = parseFloat(this.inputForm.get('principal').value);
    const ir = parseFloat(this.inputForm.get('interestRate').value);
    const ty = parseFloat(this.inputForm.get('termYears').value);
    const mp = parseFloat(this.inputForm.get('monthlyPayment').value);
    const cp = parseFloat(this.inputForm.get('periods').value);

    console.log("Compound Periods:", cp);

    this.loanTableOutput = this.createLoanTable(p, (ir / 100), ty, mp, cp);

    console.table(this.loanTableOutput);
  }

  createLoanTable(principal: number, interestRate: number, termYears: number, monthlyPayment: number, periods: number): TableEntry[] {
    //term in years * periods
    const compoundingPeriods = termYears * periods;
    const table: TableEntry[] = [];
    const monthlyInterestRate = interestRate / periods;
    //calculate compound interest
    let accrued = this.calculateCompound(principal, monthlyInterestRate, periods);
    this.pushEntry(principal, monthlyPayment, accrued, table);
    //add monthly payment only at correct time

    for (let i = 1; i < compoundingPeriods; i++) {
      const lastRow = table[table.length - 1];
      const startingBalance = lastRow.endingBalance;
      accrued = this.calculateCompound(startingBalance, monthlyInterestRate, periods);
      accrued = accrued + monthlyPayment * (12 / periods);
      this.pushEntry(startingBalance, monthlyPayment, accrued, table);
    }

    return table;
  }

  //returns Accrued amount:
  //P*(1 + r/n)^nt
  //p = principal, r = interest rate, t = time in years, n = compounding periods per year
  calculateCompound(p: number, r: number, n: number) {
    //return p * Math.pow(1 + r / n, n * t);
    return p * (1 + r / n);
  }

  pushEntry(starting: number, monthlyPayment: number, ending: number, table: TableEntry[]) {
    table.push({
      startingBalance: starting,
      periodicPayment: monthlyPayment,
      endingBalance: ending
    });
  }

}
