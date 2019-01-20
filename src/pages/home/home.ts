import { CompanyProvider } from './../../providers/comany';
import { IndicatorProvider } from './../../providers/indicator';
import { Component, OnInit } from '@angular/core';


@Component({ 
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomePage implements OnInit {  
  public companies;

  constructor(
    private companyProvider: CompanyProvider
  ) {
    this.companyProvider.getCompanies().subscribe(companies => {
      this.companies = companies;
/*       for(let company of companies) {
        this.companyProvider.addCompany(company).subscribe(result => {
        });
      } */
    })
  }
  
  ngOnInit() {
    
  }

}
