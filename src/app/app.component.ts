import { FormBuilder, Validators } from '@angular/forms'
import { Component } from '@angular/core'
import { AppService } from './app.service'

export interface Burger {
  image: string
  title: string
  text: string
  price: number
  basePrice: number
  grams: number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  currency: string = '$'
  burgers: Burger[] = []

  form = this.fb.group({
    order: ['', Validators.required],
    name: ['', Validators.required],
    phone: ['', Validators.required]
  })

  constructor (private fb: FormBuilder, private appService: AppService) {}

  ngOnInit () {
    this.appService.getData().subscribe(data => (this.burgers = data))
  }

  scrollTo (target: HTMLElement, burger?: Burger) {
    target.scrollIntoView({ behavior: 'smooth' })

    if (burger) {
      this.form.patchValue({
        order: `${burger.title} (${burger.price} ${this.currency})`
      })
    }
  }

  orderAction () {
    if (this.form.valid) {
      this.appService.sendOrder(this.form.value).subscribe({
        next: response => {
          alert(response.message)
          this.form.reset()
        },
        error: response => alert(response.error.message)
      })
    }
  }

  changeCurrency () {
    let newCurrency: string
    let coefficient: number

    switch (this.currency) {
      case '$':
        newCurrency = '₴'
        coefficient = 36.9
        break
      case '₴':
        newCurrency = 'zł'
        coefficient = 4.08
        break
      case 'zł':
        newCurrency = '¥'
        coefficient = 7.13
        break
      case '¥':
        newCurrency = '€'
        coefficient = 0.91
        break
      default:
        newCurrency = '$'
        coefficient = 1
    }

    this.currency = newCurrency

    this.burgers.forEach(
      (burger: Burger) =>
        (burger.price = parseFloat((burger.basePrice * coefficient).toFixed(2)))
    )
  }
}
