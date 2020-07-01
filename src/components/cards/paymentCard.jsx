import React from 'react';

const PaymentCard = props => {
    let total = 0;
    
    const totalWishlist = () => {
        props.wishlists.map(wishlist => total += wishlist.payment);
        return total;
    }
    totalWishlist();
  
    return ( 
        <React.Fragment>
            <div className="PaymentCard">
   
            <div className="PaymentCard--c">
                <h3 className="PaymentCard__head">Total</h3>
                <div className=" PaymentCard__text PaymentCard__text--l">{total}$</div>
                <hr className="PaymentCard__hr"></hr>
                <div className=" PaymentCard--c PaymentCard__info">
                    <div className="PaymentCard__img PaymentCard__img--visa"></div>
                    <p className="PaymentCard__text-m"> Pay {total} EGP By using Commercial International Bank - CIB</p>
                </div>
                <div className="PaymentCard--c PaymentCard__info">
                     <div className="PaymentCard__img PaymentCard__img--visa"></div>
                    <p className="PaymentCard__text-m">Pay {total} EGP  By using Commercial International Bank - CIB</p>
                </div>
                <hr className="PaymentCard__hr"></hr>
                         
            </div>
            </div>
        </React.Fragment>
     );
}
 
export default PaymentCard;