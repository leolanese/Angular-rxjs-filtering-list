import { Component } from "@angular/core";
import { map, startWith } from "rxjs/operators";
import { combineLatest, Observable, of } from "rxjs";
import { FormControl } from "@angular/forms";
import { debounceTime, distinctUntilChanged }  from "rxjs/operators";
import { Country, countries } from "./countries";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  countries$: Observable<Country[]>;

  // Data describing 
  filteredCountry$: Observable<Country[]>;
  
  filter: FormControl;
  filter$: Observable<string>;

  constructor() {
    this.countries$ = of(countries);

    this.filter = new FormControl("");
    this.filter$ = this.filter.valueChanges.pipe(startWith(""));

    this.filteredCountry$ = combineLatest(this.countries$, this.filter$).pipe(
      debounceTime(500),
      map(([countries, filterString]) =>
        countries.filter(country =>
          country.name.toLowerCase().includes(filterString)
        )
      )
    );
  }
}
