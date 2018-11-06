import Bike from '../components/bike/Bike.vue'
import newBike from '../components/bike/newBike.vue'
import bikedetails from '../components/bike/bikedetails.vue'
import evaluate from '../components/bike/evaluate.vue'
import addevaluate from '../components/bike/addevaluate.vue'
import shoppingcart from '../components/bike/shopppingcart'
import confirm from '../components/bike/confirm'
import submit from '../components/bike/submit'
import order from '../components/bike/order'
export default [
  {path:'/bike',component:Bike,
    children:[
      {path:'',component:newBike},
      {path:'bikedetails/:cNo',component:bikedetails},
      {path:'bikedetails/evaluate',component:evaluate},
      {path:'bikedetails/addevaluate',component:addevaluate},
    ]
  },
  {path:'/shoppingcart',component:shoppingcart,},
  {path:'/confirm',component:confirm,},
  {path:'/submit',component:submit,},
  {path:'/order',component:order,},
]
