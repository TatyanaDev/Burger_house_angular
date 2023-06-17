import { FormBuilder, Validators } from '@angular/forms'
import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  currency: string = '$'

  form = this.fb.group({
    order: ['', Validators.required],
    name: ['', Validators.required],
    phone: ['', Validators.required]
  })

  burgers = [
    {
      image: 'burger-cheddar&bacon.png',
      title: 'Бургер чеддер & бекон',
      description:
        'Котлета из говядины криспи, булочка, томат, сыр Чеддер, грудинка, лук красный, салат айсбер, майонез, кетчуп, сырный соус',
      price: 8.0,
      basePrice: 8.0,
      weight: 360
    },
    {
      image: 'bbq-with-bacon-and-chicken.png',
      title: 'BBQ с беконом и курицей',
      description:
        'Булочка бриошь с кунжутом, куриная котлета, сыр чеддер, томат, огурец маринованный, лук маринованный, салат Ромен, бекон, соус BBQ',
      price: 7.0,
      basePrice: 7.0,
      weight: 390
    },
    {
      image: 'double-beef-burger.png',
      title: 'Дабл биф бургер',
      description:
        'Две говяжьи котлеты, сыр чеддер, салат романо, маринованные огурцы, свежий томат, бекон, красный лук, соус бургер, горчица',
      price: 10.0,
      basePrice: 10.0,
      weight: 420
    },
    {
      image: 'bavarian-burger.png',
      title: 'Баварский бургер',
      description:
        'Булочка для бургера, говяжья котлета, красный лук, сыр, охотничья колбаска, соус барбекю, соус сырный, салат айсберг',
      price: 7.0,
      basePrice: 7.0,
      weight: 220
    },
    {
      image: 'bacon-cheeseburger.png',
      title: 'Бекон чизбургер',
      description:
        'Булочка для бургера, говяжья котлета, грудинка, помидор, огурец маринованный, сыр, сырный соус, кетчуп, зелень',
      price: 8.0,
      basePrice: 8.0,
      weight: 220
    },
    {
      image: 'indiana-burger.png',
      title: 'Индиана бургер',
      description:
        'Булочка для бургера, котлета куриная, грудинка, яйцо, огурец маринованный, криспи лук, кетчуп, соус сырный, горчица, зелень',
      price: 9.0,
      basePrice: 9.0,
      weight: 320
    },
    {
      image: 'veggie-burger.png',
      title: 'Вегги бургер',
      description:
        'Булочка для бургера, вегетарианская котлета, красный лук, сыр, свежий томат, соус барбекю, соус сырный, салат айсберг',
      price: 8.0,
      basePrice: 8.0,
      weight: 280
    },
    {
      image: 'weepy-joe.png',
      title: 'Плаксивый Джо',
      description:
        'Булочка для бургера, говяжья котлета, грудинка, помидор, огурец маринованный, красный лук, сыр, перец халапеньо, кетчуп, зелень',
      price: 7.0,
      basePrice: 7.0,
      weight: 380
    },
    {
      image: 'double-cheeseburger.png',
      title: 'Двойной чиз бургер',
      description:
        'Булочка для бургера, две говяжьи котлеты, двойной сыр чеддар, огурец маринованный, криспи лук, кетчуп, соус сырный, горчица, зелень',
      price: 11.0,
      basePrice: 11.0,
      weight: 400
    },
    {
      image: 'freshburger.png',
      title: 'Фрешбургер',
      description:
        'Булочка для бургера, говяжья котлета, бекон, сыр чеддар, яйцо, салями, соус барбекю, соус сырный, салат айсберг, свежий томат',
      price: 9.0,
      basePrice: 9.0,
      weight: 300
    },
    {
      image: 'zucchini-burger.png',
      title: 'Цуккини бургер',
      description:
        'Булочка для бургера, вегетарианская котлета из нута, цуккини на гриле, помидор, огурец маринованный, сыр, горчичный соус, кетчуп, зелень',
      price: 8.0,
      basePrice: 8.0,
      weight: 320
    },
    {
      image: 'double-cheddar-burger.png',
      title: 'Двойной бургер чеддер',
      description:
        'Булочка для бургера, котлета говяжья, грудинка, красный лук, огурец маринованный, томат, кетчуп, двойной сыр чеддар, горчица, зелень',
      price: 9.0,
      basePrice: 9.0,
      weight: 360
    }
  ]

  constructor (private fb: FormBuilder) {}

  scrollTo (target: HTMLElement, burger?: any) {
    target.scrollIntoView({ behavior: 'smooth' })

    if (burger) {
      this.form.patchValue({
        order: burger.title + ' (' + burger.price + ' ' + this.currency + ')'
      })
    }
  }

  orderAction () {
    if (this.form.valid) {
      alert('Спасибо за заказ! Мы скоро свяжемся с вами!')
      this.form.reset()
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
      (burger: any) =>
        (burger.price = (burger.basePrice * coefficient).toFixed(2))
    )
  }
}
