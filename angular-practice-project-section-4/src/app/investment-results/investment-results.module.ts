import { NgModule } from '@angular/core';
import { InvestmentResultsComponent } from './investment-results.component';
import { CurrencyPipe } from '@angular/common';

@NgModule({
  declarations: [InvestmentResultsComponent],
  imports: [CurrencyPipe],
  exports: [InvestmentResultsComponent],
})
export class InvestmentResultsModule {}
