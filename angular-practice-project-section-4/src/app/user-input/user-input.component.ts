import { Component, EventEmitter, Output, signal, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { type InvestmentInput } from '../investment-input.model';
import { InvestmentService } from '../investment.service';
@Component({
  selector: 'app-user-input',
  standalone: false,
  // imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css',
})
export class UserInputComponent {
  // @Output() calculate = new EventEmitter<InvestmentInput>();
  calculate = output<InvestmentInput>();
  enteredInitialInvestment = signal('0');
  enteredAnnualInvestment = signal('0');
  enteredExpectedReturn = signal('5');
  enteredDuration = signal('10');
  constructor(private investmentService: InvestmentService) {
    
  }

  onSubmit() {
    // this.calculate.emit({
      // initialInvestment: +this.enteredInitialInvestment(),
      // duration: +this.enteredDuration(),
      // expectedReturn: +this.enteredExpectedReturn(),
      // annualInvestment: +this.enteredAnnualInvestment(),
       this.investmentService.onCalculateInvestmentResults({
        initialInvestment: +this.enteredInitialInvestment(),
        duration: +this.enteredDuration(),
        expectedReturn: +this.enteredExpectedReturn(),
        annualInvestment: +this.enteredAnnualInvestment(),
       })
    };

    
    // this.enteredInitialInvestment.set('0');
    // this.enteredAnnualInvestment.set('0');
    // this.enteredExpectedReturn.set('5');
    // this.enteredDuration.set('10');
  }
