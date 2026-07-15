import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./FlashSale.module.css";

import Dolo650 from "../assets/FlashSale/Debo650.jpg";
import Crocin from "../assets/FlashSale/crocin.jpg";
import Revital from "../assets/FlashSale/revital.jpg";
import Limcee from "../assets/FlashSale/limcee.jpg";
import Glucometer from "../assets/FlashSale/glucometer.jpg";
import BPMonitor from "../assets/FlashSale/bpMonitor.jpg";
import N95Mask from "../assets/FlashSale/n95mask.jpg";
import Sanitizer from "../assets/FlashSale/sanitizer.jpg";


const flashSaleProducts = [

{
 id:8,
 title:"Dolo 650",
 image:Dolo650,
 originalPrice:120,
 discountedPrice:95
},

{
 id:9,
 title:"Pain Relief",
 image:Crocin,
 originalPrice:350,
 discountedPrice:275
},

{
 id:10,
 title:"Revital for Men/Women",
 image:Revital,
 originalPrice:2499,
 discountedPrice:1999
},

{
 id:11,
 title:"Vitamin C Chewable",
 image:Limcee,
 originalPrice:250,
 discountedPrice:180
},

{
 id:12,
 title:"Glucometer Kit",
 image:Glucometer,
 originalPrice:1899,
 discountedPrice:1499
},

{
 id:13,
 title:"BP Monitor",
 image:BPMonitor,
 originalPrice:2999,
 discountedPrice:2499
},

{
 id:3,
 title:"Sanitizer",
 image:Sanitizer,
 originalPrice:450,
 discountedPrice:349
},

{
 id:14,
 title:"N95 Mask",
 image:N95Mask,
 originalPrice:399,
 discountedPrice:299
}

];





const FlashSale = () => {


const [timeLeft,setTimeLeft]=useState({

hours:"24",
minutes:"00",
seconds:"00"

});



const [addedItems,setAddedItems]=useState({});





useEffect(()=>{


const target =
Date.now()+24*60*60*1000;



const timer=setInterval(()=>{


const difference =
target-Date.now();



if(difference<=0){


clearInterval(timer);


setTimeLeft({

hours:"00",
minutes:"00",
seconds:"00"

});


return;

}



setTimeLeft({

hours:String(
Math.floor(
difference/(1000*60*60)
)
).padStart(2,"0"),


minutes:String(
Math.floor(
(difference/(1000*60))%60
)
).padStart(2,"0"),


seconds:String(
Math.floor(
(difference/1000)%60
)
).padStart(2,"0")

});


},1000);



return()=>clearInterval(timer);


},[]);






// ADD TO CART FUNCTION

const handleAddToCart=(product)=>{


const cart =
JSON.parse(
localStorage.getItem("cart")
) || [];





const existingProduct =
cart.find(
item=>item.id===product.id
);





let updatedCart;





if(existingProduct){


updatedCart = cart.map(item=>

item.id===product.id

?

{

...item,

quantity:
(item.quantity || 1)+1

}

:

item

);



}

else{


updatedCart=[

...cart,

{

id:product.id,

name:product.title,

image:product.image,

price:product.discountedPrice,

quantity:1

}

];


}





localStorage.setItem(

"cart",

JSON.stringify(updatedCart)

);





// Update Navbar Count

window.dispatchEvent(

new Event("cartUpdated")

);





setAddedItems(prev=>({

...prev,

[product.id]:true

}));





setTimeout(()=>{


setAddedItems(prev=>({

...prev,

[product.id]:false

}));


},2000);



};






return(

<section className={styles.flashSale}>




<div className={styles.header}>


<div className={styles.titleSection}>


<h2>
🔥 Flash Sale
</h2>


<p>
Limited Time Deals
</p>


</div>





<div className={styles.timer}>


<div className={styles.timeBox}>
<span>{timeLeft.hours}</span>
<small>Hours</small>
</div>


<div className={styles.timeBox}>
<span>{timeLeft.minutes}</span>
<small>Minutes</small>
</div>


<div className={styles.timeBox}>
<span>{timeLeft.seconds}</span>
<small>Seconds</small>
</div>


</div>


</div>







<div className={styles.productGrid}>


{

flashSaleProducts.map(product=>(



<div

key={product.id}

className={styles.productCard}

>




<div className={styles.imageWrapper}>


<img

src={product.image}

alt={product.title}

className={styles.productImage}

/>


</div>






<div className={styles.cardContent}>


<h3>

{product.title}

</h3>






<div className={styles.priceSection}>


<span className={styles.originalPrice}>

₹{product.originalPrice}

</span>



<span className={styles.discountedPrice}>

₹{product.discountedPrice}

</span>



</div>







<div className={styles.buttonGroup}>


<Link

to={`/product/${product.id}`}

className={styles.viewBtn}

>

View Details

</Link>







<button

className={

addedItems[product.id]

?

styles.added

:

styles.cartBtn

}



onClick={()=>handleAddToCart(product)}

>


{

addedItems[product.id]

?

"✓ Added"

:

"Add to Cart"

}


</button>



</div>




</div>



</div>



))


}



</div>





</section>


);


};


export default FlashSale;