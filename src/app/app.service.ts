import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Burger } from './app.component'

interface Response {
  success: number
  message: string
}

interface OrderData {
  order: string | null
  name: string | null
  phone: string | null
}

@Injectable({
  providedIn: 'root'
})

export class AppService {
  constructor (private http: HttpClient) {}

  getData () {
    return this.http.get<Burger[]>('https://testologia.site/burgers-data?extra=black')
  }

  sendOrder (orderData: Partial<OrderData>) {
    return this.http.post<Response>(
      'https://testologia.site/burgers-order',
      orderData
    )
  }
}
