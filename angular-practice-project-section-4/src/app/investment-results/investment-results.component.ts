import { Component, inject, input, Input, computed } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-investment-results',
  standalone: false,
  // imports: [CurrencyPipe],
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css',
})
export class InvestmentResultsComponent {
  // private investmentService = inject(InvestmentService);
  constructor(private investmentService: InvestmentService) {}
  // get results() {
  //   //getter to expose the results to template
  //   return this.investmentService.resultData;
  // }
  results = this.investmentService.resultData.asReadonly();
  // @Input() results?: {
  // year: number;
  // interest: number;
  // valueEndOfYear: number;
  // annualInvestment: number;
  // totalInterest: number;
  // totalAmountInvested: number;
  // }[];
  // results = input<
  //   {
  //     year: number;
  //     interest: number;
  //     valueEndOfYear: number;
  //     annualInvestment: number;
  //     totalInterest: number;
  //     totalAmountInvested: number;
  //   }[]
  // >();
}
