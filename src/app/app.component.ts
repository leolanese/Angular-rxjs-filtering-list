import { Component } from "@angular/core";
import { map, startWith } from "rxjs/operators";
import { combineLatest, Observable, of } from "rxjs";
import { FormControl } from "@angular/forms";
import { State, states } from "./state";
import { Country, countries } from "./countries";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  countries$: Observable<Country[]>;

  filteredCountry$: Observable<Country[]>;
  filter: FormControl;
  filter$: Observable<string>;

  constructor() {
    this.countries$ = of(countries);

    this.filter = new FormControl("");
    this.filter$ = this.filter.valueChanges.pipe(startWith(""));

    this.filteredCountry$ = combineLatest(this.countries$, this.filter$).pipe(
      map(([countries, filterString]) =>
        countries.filter(country =>
          country.name.toLowerCase().includes(filterString)
        )
      )
    );
  }
}
