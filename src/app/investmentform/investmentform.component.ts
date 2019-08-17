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
  submitted: boolean;

  compoundingPeriods: CompoundingPeriods[] = [
    {periods: 24, viewValue: 'Bi-Weekly'},
    {periods: 12, viewValue: 'Monthly'},
    {periods: 6, viewValue: 'Bi-Monthly'},
    {periods: 2, viewValue: 'Semi-Annual'},
    {periods: 1, viewValue: 'Annual'}
  ];

  constructor(private formBuilder: FormBuilder) {
    this.loanTableOutput = [];
    this.inputForm = this.formBuilder.group({
      principal: ['1000', Validators.required],
      interestRate: ['6', Validators.required],
      termYears: ['8', Validators.required],
      monthlyPayment: ['700', Validators.required],
      periods: ['Monthly', Validators.required]
    });
    this.submitted = false;
   }

  ngOnInit() {
    this.inputForm = this.formBuilder.group({
      principal: ['1000', Validators.required],
      interestRate: ['6', Validators.required],
      termYears: ['3', Validators.required],
      monthlyPayment: ['400', Validators.required],
      periods: ['Monthly', Validators.required]
    });
  }

  Submit() {
    this.submitted = true;

    if (this.inputForm) {
      const principle = this.inputForm.get('principal');
      const p = principle ? parseFloat(principle.value) : 0;

      const interestRate = this.inputForm.get('interestRate');
      const ir = interestRate ? parseFloat(interestRate.value) : 0;

      const termYears = this.inputForm.get('termYears');
      const ty = termYears ? parseFloat(termYears.value) : 0;

      const monthlyPayment = this.inputForm.get('monthlyPayment');
      const mp = monthlyPayment ? parseFloat(monthlyPayment.value) : 0;

      const compoundingPeriods = this.inputForm.get('periods');
      const cp = compoundingPeriods ? parseFloat(compoundingPeriods.value) : 12;

      console.log('Compound Periods:', cp);
      console.log('Principle:', p);
      console.log('InterestRate:', ir);
      console.log('termYears:', ty);
      console.log('monthlyPayment:', mp);

      this.loanTableOutput = this.createLoanTable(p, (ir / 100), ty, mp, cp);

      console.table(this.loanTableOutput);
    }
  }

  createLoanTable(principal: number, interestRate: number, termYears: number, monthlyPayment: number, periods: number): TableEntry[] {
    // term in years * periods
    const compoundingPeriods = termYears * periods;
    const table: TableEntry[] = [];
    const monthlyInterestRate = interestRate / periods;
    // calculate compound interest
    let accrued = this.calculateCompound(principal, monthlyInterestRate, periods);
    this.pushEntry(principal, monthlyPayment, accrued, table);
    // add monthly payment only at correct time

    for (let i = 1; i < compoundingPeriods; i++) {
      const lastRow = table[table.length - 1];
      const startingBalance = lastRow.endingBalance;
      accrued = this.calculateCompound(startingBalance, monthlyInterestRate, periods);
      accrued = accrued + monthlyPayment * (12 / periods);
      this.pushEntry(startingBalance, monthlyPayment, accrued, table);
    }

    return table;
  }

  // returns Accrued amount:
  // P*(1 + r/n)^nt
  // p = principal, r = interest rate, t = time in years, n = compounding periods per year
  calculateCompound(p: number, r: number, n: number) {
    // return p * Math.pow(1 + r / n, n * t);
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
