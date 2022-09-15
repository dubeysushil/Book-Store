import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { HelperService } from '../../services/helper.service';
const emailRegex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { mustMatchValidator } from '../../../core/directives/must-match.directive';

@Component({
  selector: 'payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  registerForm: FormGroup;
   
  constructor(  private router: Router,  private helperService: HelperService  ) { }
  handler:any = null;
  route
  ngOnInit() {
    this.loadStripe()
  }
  @Input() amount
 
  pay(amount: any) {    
    console.log(this.router)
    this.route = this.router
    this.helperService.cartStatus.next('updateStatus');
    // alert('Payment Success!!');
    console.log(window)
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51HxRkiCumzEESdU2Z1FzfCVAJyiVHyHifo0GeCMAyzHPFme6v6ahYeYbQPpD9BvXbAacO2yFQ8ETlKjo4pkHSHSh00qKzqUVK9',
      locale: 'auto',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log(token)
        console.log(this.route)
        alert('Payment Received!!!');
       
        // helperService.paymentDone.next(true)
        document.getElementById('history').click()
     
        // this.router.navigate([`/user/purchaseHistory`]);
      }
    });
    
 
    //this.router.navigate([`/user/purchaseHistory`]);
    handler.open({
      name: 'Demo Site',
      description: '2 widgets',
      amount: amount * 100
    });
 
  }
  onSubmitAddress(): void {
    console.log(this.registerForm.value)
    sessionStorage.setItem('address',JSON.stringify(this.registerForm.value))
   
  }
 
  loadStripe() {
     
    if(!window.document.getElementById('stripe-script')) {
      // alert('Payment Success!!');
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51Ksr96KH9Rr7sWpvdITEllnQV5UCCaebG2IXIcb2VAY62XZfgUxhaMrz33OOk4A7FvWpr1JChw6g8X5JsCwB3lwK00im6pQLst',
          locale: 'auto',
          token: function (token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log(token)
            alert('Payment Success!!');
          }
        });
      }
       
      window.document.body.appendChild(s);
    }
  }
}