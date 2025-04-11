import { FormBuilder, Validators } from "@angular/forms";
import { Component, HostListener } from "@angular/core";
import { AppService } from "./app.service";

export interface Burger {
  image: string;
  title: string;
  text: string;
  price: number;
  basePrice: number;
  grams: number;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})

export class AppComponent {
  orderImageStyle!: { transform: string };
  mainImageStyle!: { transform: string };
  currency: string = "$";
  burgers: Burger[] = [];
  loaderShowed = true;
  loader = true;

  form = this.fb.group({
    order: ["", Validators.required],
    name: ["", Validators.required],
    phone: ["", Validators.required],
  });

  constructor(private fb: FormBuilder, private appService: AppService) {}

  @HostListener("document:mousemove", ["$event"])
  onMouseMove(e: MouseEvent) {
    this.orderImageStyle = {
      transform: `translate(-${(e.clientX * 0.3) / 8}px,-${
        (e.clientY * 0.3) / 8
      }px`,
    };

    this.mainImageStyle = {
      transform: `translate(-${(e.clientX * 0.3) / 8}px,-${
        (e.clientY * 0.3) / 8
      }px`,
    };
  }

  ngOnInit() {
    setTimeout(() => (this.loaderShowed = false), 3000);

    setTimeout(() => (this.loader = false), 4000);

    this.appService.getData().subscribe({
      next: (data) => (this.burgers = data),
      error: (error) => console.error(error),
    });
  }

  scrollTo(target: HTMLElement, burger?: Burger) {
    target.scrollIntoView({ behavior: "smooth" });

    if (burger) {
      this.form.patchValue({
        order: `${burger.title} (${burger.price} ${this.currency})`,
      });
    }
  }

  orderAction() {
    if (this.form.valid) {
      this.appService.sendOrder(this.form.value).subscribe({
        next: (response) => {
          alert(response.message);
          this.form.reset();
        },

        error: (response) => alert(response.error.message),
      });
    }
  }

  changeCurrency() {
    let newCurrency: string;
    let coefficient: number;

    switch (this.currency) {
      case "$":
        newCurrency = "₴";
        coefficient = 36.9;
        break;
      case "₴":
        newCurrency = "zł";
        coefficient = 4.08;
        break;
      case "zł":
        newCurrency = "¥";
        coefficient = 7.13;
        break;
      case "¥":
        newCurrency = "€";
        coefficient = 0.91;
        break;
      default:
        newCurrency = "$";
        coefficient = 1;
    }

    this.currency = newCurrency;

    this.burgers.forEach(
      (burger: Burger) =>
        (burger.price = parseFloat((burger.basePrice * coefficient).toFixed(2)))
    );
  }
}
