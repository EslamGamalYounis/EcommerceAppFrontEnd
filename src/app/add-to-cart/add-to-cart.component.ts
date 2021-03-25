
import { Component, Inject, OnInit } from '@angular/core';
import { MessengerService } from 'src/app/services/messenger.service'
import { CartToOrderService } from '../services/cart-to-order.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {
  date:Date
  order;
  cartItems = [
  ];
  cartTotal = 0;
  titles=[]

  cashed=false

  constructor(private msg: MessengerService,private payment:CartToOrderService) { }
  ngOnInit()
   {
     if(!this.msg.cashed)
     {
      this.cartItems=this.msg.getItems()
      // this.quantity=this.msg.getQuantity()
     }
     this.cartItems.forEach(item => this.cartTotal += item.price)//calculate total price
  //get each item qty
    // this.msg.getMessage().toPromise().then((product:Product)=>{
    //   this.addProductToCart(product)
  // })

  console.log(this.cartItems);


  }
  getProductTitles()
  {
this.cartItems.forEach(
  item=>{this.titles.push(item.title)}
)
  }
  // getQty(id){
  //   var qt=1

  //     this.msg.carts.forEach(dublicate=>{
  //       if(id===dublicate.productId)
  //       {
  //        qt+=1
  //         this.msg.carts.splice(dublicate.productId,1);
  //       }

  //     })

  //   return qt
  // }
  getDate(){
    this.date=new Date();

  return this.date.toString();
  }
  cashOut()
  {
    this.getProductTitles()
      this.order={username:localStorage.getItem("username"),date:this.getDate(),totalPrice:this.cartTotal,titles:this.titles,status:"pending"};
      this.payment.makeOrder(this.order).subscribe(res=>{
        console.log(res);
      },(err)=> console.log(err)
      )
      //make order and send it to service
      this.msg.cashed=true
      this.cashed=true
      console.log(this.order)
  }
  success(){
    console.log("successfull")
  }
  deleteItem(id){                           //deleting elements from cart
   // console.log(id)
    for(let i = 0; i < this.cartItems.length; ++i){
      // if(this.cartItems.length===1)
      // this.cartItems.splice(i,1)
        if (this.cartItems[i].productId === id) {
            {
              this.cartItems.splice(i,1);
              this.cartTotal=0;
              this.cartItems.forEach(item => this.cartTotal += item.price)
              break;
            }

        }
    }
}
}
//   addProductToCart(product: Product) {

//     let productExist =false;

// // for (let i in this.cartItems)
// // {
// //   if (this.cartItems[i].productId === product.productId)
// //   {
// //    this.cartItems[i].price += 1000;
// //    productExist=true
// //    break;
// //   }
// // }

// if(!productExist)
// {
//   this.cartItems.push(product)
// }








//   //   if(this.cartItems.length===0){
//   //     this.cartItems.push(
//   //       {
//   //         productId:product.productId,
//   //         price:product.price,
//   //         title:product.title
//   //       })
//   //   }
//   //   else{
//   //     for (let i in this.cartItems) {
//   //       if (this.cartItems[i].productId === product.productId) {
//   //         this.cartItems[i].price += 1000;
//   //       }
//   //       else {
//   //         this.cartItems.push(
//   //           {
//   //             productId:product.productId,
//   //             price:product.price,
//   //             title:product.title
//   //           })
//   //           }
//   //     }
//   //   }

//   //   console.log(this.cartItems);
//    this.cartTotal=0
// //calculating total price
//    }



