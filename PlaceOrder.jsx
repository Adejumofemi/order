import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { useKorapay } from "react-korapay";
import { Loader } from 'lucide-react'
import { Resend } from "resend"
import { v4 as uuidv4 } from 'uuid';

const resend = new Resend("re_SHVc68o8_BQTEZDSSRFYegk2zmoD9Dwtt");

const PlaceOrder = () => {
    

    const [method, setMethod] = useState('stripe');
    const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount,  products } = useContext(ShopContext);

    const { delivery_fee, setDeliveryFee } = useContext(ShopContext); 
    var responseflutter
    let handleFlutterPayment = () => {}
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    })
    
    
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setFormData(data => ({ ...data, [name]: value } ))

        if (name === "state" && (value === "Abuja" || value === "ABUJA" || value === "FCT" || value === "Fct" || value === "abuja" || value === "fct")) {
            setIsOpen(true);
            setDeliveryFee(3000); // Set delivery fee for Abuja
          } else {
            setIsOpen(false);
            setDeliveryFee(0); // Set delivery fee for other states  
          }
        
    }
     
    

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        try {
            setLoading(true)
            let orderItems = []

            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(product => product._id === items))
                        if (itemInfo) {
                            itemInfo.size = item
                            itemInfo.quantity = cartItems[items][item]
                            orderItems.push(itemInfo)
                        }
                    }
                }
            }

            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee,
                payment: true
            }

            console.log(orderItems)
            console.log(orderData)
            
            const testId = uuidv4();

            const PASSWORD = `
            

<body class="body pc-font-alt" style="width: 100% !important; min-height: 100% !important; margin: 0 !important; padding: 0 !important; line-height: 1.5; color: #2D3A41; mso-line-height-rule: exactly; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; font-variant-ligatures: normal; text-rendering: optimizeLegibility; -moz-osx-font-smoothing: grayscale; background-color: #ffffff;" bgcolor="#ffffff">
 <table class="pc-project-body" style="table-layout: fixed; min-width: 600px; background-color: #ffffff;" bgcolor="#ffffff" width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
  <tr>
   <td align="center" valign="top">
    <table class="pc-project-container" align="center" width="600" style="width: 600px; max-width: 600px;" border="0" cellpadding="0" cellspacing="0" role="presentation">
     <tr>
      <td style="padding: 20px 0px 20px 0px;" align="left" valign="top">
       <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="width: 100%;">
        <tr>
         <td valign="top">
          <!-- BEGIN MODULE: Hero -->
          <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
           <tr>
            <td class="pc-w620-spacing-0-0-0-0" style="padding: 0px 0px 0px 0px;">
             <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
              <tr>
               <td valign="top" class="pc-w620-padding-24-0-0-0" style="padding: 0px 0px 0px 0px; border-radius: 0px; background-color: #ffffff;" bgcolor="#ffffff">
                <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                 <tr>
                  <td class="pc-w620-spacing-0-0-24-0" style="padding: 0px 0px 24px 0px;">
                   <table class="pc-width-fill pc-w620-gridCollapsed-1" width="100%" height="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                    <tr class="pc-grid-tr-first pc-grid-tr-last">
                     <td class="pc-grid-td-first pc-grid-td-last pc-w620-itemsSpacings-0-20" align="left" valign="top" style="width: 50%; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;">
                      <table style="border-collapse: separate; border-spacing: 0; width: 100%; height: 100%;" width="100%" height="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                       <tr>
                        <td class="pc-w620-halign-center pc-w620-valign-middle" align="left" valign="middle">
                         <table class="pc-w620-halign-center" align="left" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                          <tr>
                           <td class="pc-w620-halign-center" align="left" valign="top">
                            <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                             <tr>
                              <td class="pc-w620-halign-center" align="left" valign="top" style="padding: 0px 0px 0px 0px;">
                               <img src="${assets.korapay_icon}" class="pc-w620-width-136 pc-w620-height-auto pc-w620-align-center" width="134" height="26" alt="" style="display: block; outline: 0; line-height: 100%; -ms-interpolation-mode: bicubic; object-fit: contain; width: 134px; height: auto; max-width: 100%; border: 0;" />
                              </td>
                             </tr>
                            </table>
                           </td>
                          </tr>
                         </table>
                        </td>
                       </tr>
                      </table>
                     </td>
                    </tr>
                   </table>
                  </td>
                 </tr>
                </table>
                <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                 <tr>
                  <td>
                   <table class="pc-width-fill pc-w620-gridCollapsed-0" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                    <tr class="pc-grid-tr-first pc-grid-tr-last">
                     <td class="pc-grid-td-first pc-grid-td-last" align="center" valign="top" style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;">
                      <table style="border-collapse: separate; border-spacing: 0; width: 100%;" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                       <tr>
                        <td class="pc-w620-padding-40-24-40-24" align="center" valign="bottom" style="padding: 44px 44px 44px 44px; background-color: #ecf1fb; border-radius: 10px 10px 10px 10px;">
                         <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                          <tr>
                           <td align="center" valign="top">
                            <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                             <tr>
                              <td align="center" valign="top" style="padding: 0px 0px 32px 0px;">
                               <img src="https://cloudfilesdm.com/postcards/image-1719380710757.png" width="150" height="162" alt="" style="display: block; outline: 0; line-height: 100%; -ms-interpolation-mode: bicubic; width: 150px; height: auto; max-width: 100%; border: 0;" />
                              </td>
                             </tr>
                            </table>
                           </td>
                          </tr>
                          <tr>
                           <td align="center" valign="top">
                            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation">
                             <tr>
                              <td valign="top" style="padding: 0px 0px 20px 0px;">
                               <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0;">
                                <tr>
                                 <td valign="top" align="center">
                                  <div class="pc-font-alt pc-w620-fontSize-32px pc-w620-lineHeight-32" style="line-height: 100%; letter-spacing: -0.03em; font-family: 'Poppins', Arial, Helvetica, sans-serif; font-size: 40px; font-weight: 600; font-variant-ligatures: normal; color: #001942; text-align: center; text-align-last: center;">
                                   <div><span>Thanks for the Order</span>
                                   </div>
                                  </div>
                                 </td>
                                </tr>
                               </table>
                              </td>
                             </tr>
                            </table>
                           </td>
                          </tr>
                          <tr>
                           <td align="center" valign="top">
                            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation">
                             <tr>
                              <td valign="top" style="padding: 0px 0px 20px 0px;">
                               <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0;">
                                <tr>
                                 <td valign="top" align="center">
                                  <div class="pc-font-alt pc-w620-fontSize-14px pc-w620-lineHeight-140pc" style="line-height: 140%; letter-spacing: 0px; font-family: 'Poppins', Arial, Helvetica, sans-serif; font-size: 14px; font-weight: normal; font-variant-ligatures: normal; color: #001942; text-align: center; text-align-last: center;">
                                   <div><span style="letter-spacing: 0px;">Great news! Your order is all set to hit the road. We&#39;re packing it up with care and it&#39;ll be on its way to you in no time. </span>
                                   </div>
                                  </div>
                                 </td>
                                </tr>
                               </table>
                              </td>
                             </tr>
                            </table>
                           </td>
                          </tr>
                          <tr>
                           <td align="center" valign="top">
                            <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                             <tr>
                              <th valign="top" align="center" style="text-align: center; font-weight: normal; line-height: 1;">
                               <a style="display: inline-block; box-sizing: border-box; border-radius: 500px 500px 500px 500px; background-color: #000; padding: 14px 28px 14px 28px; font-family: 'Poppins', Arial, Helvetica, sans-serif; font-weight: 500; font-size: 17px; line-height: 24px; color: #ffffff; vertical-align: top; text-align: center; text-align-last: center; text-decoration: none; -webkit-text-size-adjust: none;" href="https://postcards.email/" target="_blank"><span style="display: block;"><span>Track Order</span></span></a>
                               <!--<![endif]-->
                              </th>
                             </tr>
                            </table>
                           </td>
                          </tr>
                         </table>
                        </td>
                       </tr>
                      </table>
                     </td>
                    </tr>
                   </table>
                  </td>
                 </tr>
                </table>
               </td>
              </tr>
             </table>
            </td>
           </tr>
          </table>
          <!-- END MODULE: Hero -->
         </td>
        </tr>
        <tr>
         <td valign="top">
          <!-- BEGIN MODULE: Delivery Status -->
          <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
           <tr>
            <td class="pc-w620-spacing-0-0-0-0" style="padding: 0px 0px 0px 0px;">
             <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
              <tr>
               <td valign="top" class="pc-w620-padding-30-0-30-0" style="padding: 44px 0px 44px 0px; border-radius: 0px; background-color: #ffffff;" bgcolor="#ffffff">
                <table class="pc-w620-width-fill" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                 <tr>
                  <td class="pc-w620-spacing-0-0-0-0" style="padding: 0px 0px 0px 0px;">
                   <table class="pc-width-fill pc-w620-gridCollapsed-0 pc-w620-width-fill" width="100%" height="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                    <tr class="pc-grid-tr-first pc-grid-tr-last">
                     <td class="pc-grid-td-first pc-w620-itemsSpacings-0-30" align="center" valign="middle" style="width: 20%; padding-top: 0px; padding-right: 15px; padding-bottom: 0px; padding-left: 0px;">
                      <table style="border-collapse: separate; border-spacing: 0; width: 100%; height: 100%;" width="100%" height="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                       <tr>
                        <td align="center" valign="bottom">
                         <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                          <tr>
                           <td align="center" valign="top">
                            <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                             <tr>
                              <td align="center" valign="top" style="padding: 0px 0px 12px 0px;">
                               <img src="https://cloudfilesdm.com/postcards/5b305647c0f5e5a664d2cca777f34bf4.png" class="pc-w620-width-38 pc-w620-height-auto" width="38" height="38" alt="" style="display: block; outline: 0; line-height: 100%; -ms-interpolation-mode: bicubic; object-fit: contain; width: 38px; height: auto; max-width: 100%; border: 0;" />
                              </td>
                             </tr>
                            </table>
                           </td>
                          </tr>
                          <tr>
                           <td align="center" valign="top">
                            <table class="pc-w620-width-auto" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation">
                             <tr>
                              <td valign="top" style="padding: 0px 0px 6px 0px;">
                               <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0;">
                                <tr>
                                 <td valign="top" align="center">
                                  <div class="pc-font-alt pc-w620-fontSize-14px" style="line-height: 133%; letter-spacing: -0.2px; font-family: 'Poppins', Arial, Helvetica, sans-serif; font-size: 14px; font-weight: normal; font-variant-ligatures: normal; color: #0067ff; text-align: center; text-align-last: center;">
                                   <div><span>Confirmed</span>
                                   </div>
                                  </div>
                                 </td>
                                </tr>
                               </table>
                              </td>
                             </tr>
                            </table>
                           </td>
                          </tr>
                         </table>
                        </td>
                       </tr>
                      </table>
                     </td>
                     <td class="pc-w620-itemsSpacings-0-30" align="center" valign="middle" style="width: 20%; padding-top: 0px; padding-right: 15px; padding-bottom: 0px; padding-left: 15px;">
                      <table style="border-collapse: separate; border-spacing: 0;" border="0" cellpadding="0" cellspacing="0" role="presentation">
                       <tr>
                        <td align="center" valign="middle">
                         <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                          <tr>
                           <td align="center" valign="top">
                            <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                             <tr>
                              <td class="pc-w620-spacing-0-0-34-0" valign="top" style="padding: 0px 0px 32px 0px;">
                               <table class="pc-w620-width-60" width="87" border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin: auto;">
                                <tr>
                                 <td height="1" valign="top" style="line-height: 1px; font-size: 1px; border-bottom: 2px dashed #0167ff;">&nbsp;</td>
                                </tr>
                               </table>
                              </td>
                             </tr>
                            </table>
                           </td>
                          </tr>
                         </table>
                        </td>
                       </tr>
                      </table>
                     </td>
                     <td class="pc-w620-itemsSpacings-0-30" align="center" valign="middle" style="width: 20%; padding-top: 0px; padding-right: 15px; padding-bottom: 0px; padding-left: 15px;">
                      <table style="border-collapse: separate; border-spacing: 0; width: 100%; height: 100%;" width="100%" height="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                       <tr>
                        <td class="pc-w620-padding-0-6-0-6" align="center" valign="bottom">
                         <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                          <tr>
                           <td align="center" valign="top">
                            <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                             <tr>
                              <td align="center" valign="top" style="padding: 0px 0px 12px 0px;">
                               <img src="https://cloudfilesdm.com/postcards/99e51c88245905d275cf11b1e90194ab.png" class="pc-w620-width-38 pc-w620-height-auto" width="38" height="38" alt="" style="display: block; outline: 0; line-height: 100%; -ms-interpolation-mode: bicubic; object-fit: contain; width: 38px; height: auto; max-width: 100%; border: 0;" />
                              </td>
                             </tr>
                            </table>
                           </td>
                          </tr>
                          <tr>
                           <td align="center" valign="top">
                            <table class="pc-w620-width-auto" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation">
                             <tr>
                              <td valign="top" style="padding: 0px 0px 6px 0px;">
                               <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0;">
                                <tr>
                                 <td valign="top" align="center">
                                  <div class="pc-font-alt pc-w620-fontSize-14px" style="line-height: 133%; letter-spacing: -0.2px; font-family: 'Poppins', Arial, Helvetica, sans-serif; font-size: 14px; font-weight: normal; font-variant-ligatures: normal; color: #53627a; text-align: center; text-align-last: center;">
                                   <div><span>Shipping</span>
                                   </div>
                                  </div>
                                 </td>
                                </tr>
                               </table>
                              </td>
                             </tr>
                            </table>
                           </td>
                          </tr>
                         </table>
                        </td>
                       </tr>
                      </table>
                     </td>
                     <td class="pc-w620-itemsSpacings-0-30" align="center" valign="middle" style="width: 20%; padding-top: 0px; padding-right: 15px; padding-bottom: 0px; padding-left: 15px;">
                      <table style="border-collapse: separate; border-spacing: 0;" border="0" cellpadding="0" cellspacing="0" role="presentation">
                       <tr>
                        <td align="center" valign="middle">
                         <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                          <tr>
                           <td align="center" valign="top">
                            <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                             <tr>
                              <td class="pc-w620-spacing-0-0-34-0" valign="top" style="padding: 0px 0px 32px 0px;">
                               <table class="pc-w620-width-60" width="87" border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin: auto;">
                                <tr>
                                 <td height="1" valign="top" style="line-height: 1px; font-size: 1px; border-bottom: 2px dashed #D9D9D9;">&nbsp;</td>
                                </tr>
                               </table>
                              </td>
                             </tr>
                            </table>
                           </td>
                          </tr>
                         </table>
                        </td>
                       </tr>
                      </table>
                     </td>
                     <td class="pc-grid-td-last pc-w620-itemsSpacings-0-30" align="center" valign="middle" style="width: 20%; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 15px;">
                      <table style="border-collapse: separate; border-spacing: 0; width: 100%; height: 100%;" width="100%" height="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                       <tr>
                        <td align="center" valign="bottom">
                         <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                          <tr>
                           <td align="center" valign="top">
                            <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                             <tr>
                              <td align="center" valign="top" style="padding: 0px 0px 12px 0px;">
                               <img src="https://cloudfilesdm.com/postcards/7af250fce78f428f47ab75eeda734977.png" class="pc-w620-width-38 pc-w620-height-auto" width="38" height="38" alt="" style="display: block; outline: 0; line-height: 100%; -ms-interpolation-mode: bicubic; object-fit: contain; width: 38px; height: auto; max-width: 100%; border: 0;" />
                              </td>
                             </tr>
                            </table>
                           </td>
                          </tr>
                          <tr>
                           <td align="center" valign="top">
                            <table class="pc-w620-width-auto" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation">
                             <tr>
                              <td valign="top" style="padding: 0px 0px 6px 0px;">
                               <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0;">
                                <tr>
                                 <td valign="top" align="center">
                                  <div class="pc-font-alt pc-w620-fontSize-14px" style="line-height: 133%; letter-spacing: -0.2px; font-family: 'Poppins', Arial, Helvetica, sans-serif; font-size: 14px; font-weight: normal; font-variant-ligatures: normal; color: #53627a; text-align: center; text-align-last: center;">
                                   <div><span>Delivered</span>
                                   </div>
                                  </div>
                                 </td>
                                </tr>
                               </table>
                              </td>
                             </tr>
                            </table>
                           </td>
                          </tr>
                         </table>
                        </td>
                       </tr>
                      </table>
                     </td>
                    </tr>
                   </table>
                  </td>
                 </tr>
                </table>
               </td>
              </tr>
             </table>
            </td>
           </tr>
          </table>
          <!-- END MODULE: Delivery Status -->
         </td>
        </tr>
        <tr>
         <td valign="top">
          <!-- BEGIN MODULE: Order Summary -->
          <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
           <tr>
            <td class="pc-w620-spacing-0-0-0-0" style="padding: 0px 0px 0px 0px;">
             <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
              <tr>
               <td valign="top" class="pc-w620-radius-10-10-10-10 pc-w620-padding-32-24-32-24" style="padding: 40px 24px 40px 24px; border-radius: 20px 20px 20px 20px; background-color: #ecf1fb;" bgcolor="#ecf1fb">
                <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                 <tr>
                  <td class="pc-w620-spacing-0-0-0-0" align="center" valign="top" style="padding: 0px 0px 8px 0px;">
                   <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                    <tr>
                     <td valign="top" class="pc-w620-padding-0-0-0-0" align="center">
                      <div class="pc-font-alt pc-w620-fontSize-24px pc-w620-lineHeight-40" style="line-height: 100%; letter-spacing: -0.03em; font-family: 'Poppins', Arial, Helvetica, sans-serif; font-size: 24px; font-weight: 600; font-variant-ligatures: normal; color: #001942; text-align: center; text-align-last: center;">
                       <div><span>Your item in this order </span>
                       </div>
                      </div>
                     </td>
                    </tr>
                   </table>
                  </td>
                 </tr>
                </table>
                <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                 <tr>
                  <td class="pc-w620-spacing-0-0-20-0" align="center" valign="top" style="padding: 0px 0px 30px 0px;">
                   <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                    <tr>
                     <td valign="top" class="pc-w620-padding-0-0-0-0" align="center">
                      <div class="pc-font-alt pc-w620-fontSize-16px pc-w620-lineHeight-28" style="line-height: 140%; letter-spacing: 0px; font-family: 'Poppins', Arial, Helvetica, sans-serif; font-size: 14px; font-weight: normal; font-variant-ligatures: normal; color: #001942; text-align: center; text-align-last: center;">
                       <div><span style="letter-spacing: 0px;">Order number: #${orderItems[0]._id}</span>
                       </div>
                      </div>
                     </td>
                    </tr>
                   </table>
                  </td>
                 </tr>
                </table>

                ${orderItems.map(item => `
                    <!-------The begining of Show Items ---->
                
                <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                 <tr>
                  <td style="padding: 0px 0px 4px 0px; ">
                   <table class="pc-w620-tableCollapsed-0" border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" bgcolor="#FFFFFF" style="border-collapse: separate; border-spacing: 0; width: 100%; background-color:#FFFFFF; border-radius: 10px 10px 10px 10px;">
                    <tbody>
                     <tr>

                        <!----Begin of First Section -->
                      <td align="left" valign="top" style="padding: 16px 0px 8px 16px;">
                       <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                        <tr>
                         <td>
                          <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                           <tr>
                            <td valign="top">
                             <table class="" border="0" cellpadding="0" cellspacing="0" role="presentation">
                              <tr>
                               <th valign="top" style="font-weight: normal; text-align: left;">
                                <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                 <tr>
                                  <td class="pc-w620-spacing-0-16-20-0" valign="top" style="padding: 0px 20px 0px 0px;">
                                   <img src="${item.image}" class="pc-w620-width-64 pc-w620-height-64 pc-w620-width-64-min" width="100" height="104" alt="${item.name}" style="display: block; outline: 0; line-height: 100%; -ms-interpolation-mode: bicubic; width: 100px; height: 104px; border: 0;" />
                                  </td>
                                 </tr>
                                </table>
                               </th>
                               <th valign="top" style="font-weight: normal; text-align: left;">
                                <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                 <tr>
                                  <td>
                                   <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                    <tr>
                                     <td valign="top">
                                      <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                       <tr>
                                        <th align="left" valign="top" style="font-weight: normal; text-align: left; padding: 0px 0px 4px 0px;">
                                         <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                                          <tr>
                                           <td valign="top" align="left" style="padding: 9px 0px 0px 0px;">
                                            <div class="pc-font-alt pc-w620-fontSize-16 pc-w620-lineHeight-26" style="line-height: 140%; letter-spacing: -0.03em; font-family: 'Poppins', Arial, Helvetica, sans-serif; font-size: 16px; font-weight: 600; font-variant-ligatures: normal; color: #001942; text-align: left; text-align-last: left;">
                                             <div><span>${item.name}</span>
                                             </div>
                                            </div>
                                           </td>
                                          </tr>
                                         </table>
                                        </th>
                                       </tr>
                                       <tr>
                                        <th align="left" valign="top" style="font-weight: normal; text-align: left;">
                                         <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                                          <tr>
                                           <td valign="top" align="left">
                                            <div class="pc-font-alt" style="line-height: 140%; letter-spacing: -0.03em; font-family: 'Poppins', Arial, Helvetica, sans-serif; font-size: 14px; font-weight: normal; font-variant-ligatures: normal; color: #53627a; text-align: left; text-align-last: left;">
                                             <div><span>Size: ${item.size}</span>
                                             </div>
                                            </div>
                                           </td>
                                          </tr>
                                         </table>
                                        </th>
                                       </tr>
                                       <tr>
                                        <th align="left" valign="top" style="font-weight: normal; text-align: left;">
                                         <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                                          <tr>
                                           <td valign="top" align="left">
                                            <div class="pc-font-alt" style="line-height: 140%; letter-spacing: -0.03em; font-family: 'Poppins', Arial, Helvetica, sans-serif; font-size: 14px; font-weight: normal; font-variant-ligatures: normal; color: #53627a; text-align: left; text-align-last: left;">
                                             <div><span>Quantity: ${item.quantity}</span>
                                             </div>
                                            </div>
                                           </td>
                                          </tr>
                                         </table>
                                        </th>
                                       </tr>
                                      </table>
                                     </td>
                                    </tr>
                                   </table>
                                  </td>
                                 </tr>
                                </table>
                               </th>
                              </tr>
                             </table>
                            </td>
                           </tr>
                          </table>
                         </td>
                        </tr>
                       </table>
                      </td>
                      <td class="pc-w620-padding-28-32-24-16" align="right" valign="top" style="padding: 24px 16px 24px 16px;">
                       <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                        <tr>
                         <td valign="top" align="right">
                          <div class="pc-font-alt pc-w620-fontSize-16 pc-w620-lineHeight-20" style="line-height: 140%; letter-spacing: -0.03em; font-family: 'Poppins', Arial, Helvetica, sans-serif; font-size: 16px; font-weight: normal; font-variant-ligatures: normal; color: #001942; text-align: right; text-align-last: right;">
                           <div><span style="color: #001942;">NGN ${item.price}</span>
                           </div>
                          </div>
                         </td>
                        </tr>
                       </table>
                      </td>

                      <!---End of first section --->

                      </tr>
                     <tr>
                      

                     
                     </tr>
                    </tbody>
                   </table>
                  </td>
                 </tr>
                </table>

                <!-----The end of Show Items  -->
                `).join('')}
                
                
                      
                     

                <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                 <tr>
                  <td style="padding: 0px 0px 4px 0px; ">
                   <table class="pc-w620-tableCollapsed-0" border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" bgcolor="#ffffff" style="border-collapse: separate; border-spacing: 0; width: 100%; background-color:#ffffff; border-radius: 10px 10px 10px 10px;">
                    <tbody>
                     <tr>
                      <td align="left" valign="middle" style="padding: 16px 0px 16px 16px;">
                       <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                        <tr>
                         <td align="left" valign="top" style="padding: 0px 0px 0px 0px;">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                           <tr>
                            <td valign="top" align="left" style="padding: 0px 0px 0px 0px;">
                             <div class="pc-font-alt pc-w620-fontSize-16 pc-w620-lineHeight-26" style="line-height: 140%; letter-spacing: -0.03em; font-family: 'Poppins', Arial, Helvetica, sans-serif; font-size: 16px; font-weight: normal; font-variant-ligatures: normal; color: #001942; text-align: left; text-align-last: left;">
                              <div><span>Subtotal</span>
                              </div>
                             </div>
                            </td>
                           </tr>
                          </table>
                         </td>
                        </tr>
                       </table>
                      </td>
                      <td align="right" valign="middle" style="padding: 16px 16px 16px 16px;">
                       <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                        <tr>
                         <td valign="top" align="right">
                          <div class="pc-font-alt pc-w620-fontSize-16 pc-w620-lineHeight-20" style="line-height: 140%; letter-spacing: -0.03em; font-family: 'Poppins', Arial, Helvetica, sans-serif; font-size: 16px; font-weight: normal; font-variant-ligatures: normal; color: #001942; text-align: right; text-align-last: right;">
                           <div><span>NGN ${getCartAmount()}</span>
                           </div>
                          </div>
                         </td>
                        </tr>
                       </table>
                      </td>
                     </tr>
                     <tr>
                      <td align="left" valign="middle" style="padding: 16px 0px 16px 16px;">
                       <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                        <tr>
                         <td align="left" valign="top" style="padding: 0px 0px 0px 0px;">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                           <tr>
                            <td valign="top" align="left" style="padding: 0px 0px 0px 0px;">
                             <div class="pc-font-alt pc-w620-fontSize-16 pc-w620-lineHeight-26" style="line-height: 140%; letter-spacing: -0.03em; font-family: 'Poppins', Arial, Helvetica, sans-serif; font-size: 16px; font-weight: normal; font-variant-ligatures: normal; color: #001942; text-align: left; text-align-last: left;">
                              <div><span>Standard Delivery</span>
                              </div>
                             </div>
                            </td>
                           </tr>
                          </table>
                         </td>
                        </tr>
                       </table>
                      </td>
                      <td align="right" valign="middle" style="padding: 16px 16px 16px 16px;">
                       <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                        <tr>
                         <td valign="top" align="right">
                          <div class="pc-font-alt pc-w620-fontSize-16 pc-w620-lineHeight-20" style="line-height: 140%; letter-spacing: -0.03em; font-family: 'Poppins', Arial, Helvetica, sans-serif; font-size: 16px; font-weight: normal; font-variant-ligatures: normal; color: #001942; text-align: right; text-align-last: right;">
                           <div><span>NGN ${delivery_fee}</span>
                           </div>
                          </div>
                         </td>
                        </tr>
                       </table>
                      </td>
                     </tr>
                    </tbody>
                   </table>
                  </td>
                 </tr>
                </table>
                <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                 <tr>
                  <td style="padding: 0px 0px 32px 0px; ">
                   <table class="pc-w620-tableCollapsed-0" border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" bgcolor="#ffffff" style="border-collapse: separate; border-spacing: 0; width: 100%; background-color:#ffffff; border-radius: 10px 10px 10px 10px;">
                    <tbody>
                     <tr>
                      <td bgcolor="transparent" width="377" valign="middle" style="background-color: transparent;">
                       <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                        <tr>
                         <td style="padding: 16px 0px 16px 16px;" align="left">
                          <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                           <tr>
                            <td align="left" valign="top" style="padding: 0px 0px 0px 0px;">
                             <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                              <tr>
                               <td valign="top" align="left" style="padding: 0px 0px 0px 0px;">
                                <div class="pc-font-alt pc-w620-fontSize-16 pc-w620-lineHeight-26" style="line-height: 140%; letter-spacing: -0.03em; font-family: 'Poppins', Arial, Helvetica, sans-serif; font-size: 16px; font-weight: 600; font-variant-ligatures: normal; color: #001942; text-align: left; text-align-last: left;">
                                 <div><span>Total</span>
                                 </div>
                                </div>
                               </td>
                              </tr>
                             </table>
                            </td>
                           </tr>
                          </table>
                         </td>
                        </tr>
                       </table>
                      </td>
                      <td align="right" valign="middle" style="padding: 16px 16px 16px 16px;">
                       <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                        <tr>
                         <td valign="top" align="right">
                          <div class="pc-font-alt pc-w620-fontSize-16 pc-w620-lineHeight-20" style="line-height: 140%; letter-spacing: -0.03em; font-family: 'Poppins', Arial, Helvetica, sans-serif; font-size: 16px; font-weight: 600; font-variant-ligatures: normal; color: #001942; text-align: right; text-align-last: right;">
                           <div><span>NGN ${orderData.amount}</span>
                           </div>
                          </div>
                         </td>
                        </tr>
                       </table>
                      </td>
                     </tr>
                    </tbody>
                   </table>
                  </td>
                 </tr>
                </table>
                <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                 <tr>
                  <td style="padding: 0px 0px 0px 0px;">
                   <table class="pc-width-fill pc-w620-gridCollapsed-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                    <tr class="pc-grid-tr-first pc-grid-tr-last">
                     <td class="pc-grid-td-first pc-w620-itemsSpacings-0-30" align="left" valign="top" style="width: 50%; padding-top: 0px; padding-right: 20px; padding-bottom: 0px; padding-left: 0px;">
                      <table style="border-collapse: separate; border-spacing: 0; width: 100%;" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                       <tr>
                        <td align="left" valign="top">
                         <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                          <tr>
                           <td align="left" valign="top">
                            <table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation">
                             <tr>
                              <td class="pc-w620-spacing-0-0-14-0" valign="top" style="padding: 0px 0px 14px 0px;">
                               <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0;">
                                <tr>
                                 <td valign="top" class="pc-w620-padding-0-0-0-0" align="left">
                                  <div class="pc-font-alt" style="line-height: 140%; letter-spacing: -0.2px; font-family: 'Poppins', Arial, Helvetica, sans-serif; font-size: 16px; font-weight: 600; font-variant-ligatures: normal; color: #001942; text-align: left; text-align-last: left;">
                                   <div><span>Shipping Address</span>
                                   </div>
                                  </div>
                                 </td>
                                </tr>
                               </table>
                              </td>
                             </tr>
                            </table>
                           </td>
                          </tr>
                          <tr>
                           <td align="left" valign="top">
                            <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                             <tr>
                              <td class="pc-w620-spacing-0-0-14-0" valign="top" style="padding: 0px 0px 14px 0px;">
                               <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin-right: auto;">
                                <tr>
                                 <!--[if gte mso 9]>
                    <td height="1" valign="top" style="line-height: 1px; font-size: 1px; border-bottom: 1px solid #cecece;">&nbsp;</td>
                <![endif]-->
                                 <!--[if !gte mso 9]><!-- -->
                                 <td height="1" valign="top" style="line-height: 1px; font-size: 1px; border-bottom: 1px solid #cecece;">&nbsp;</td>
                                 <!--<![endif]-->
                                </tr>
                               </table>
                              </td>
                             </tr>
                            </table>
                           </td>
                          </tr>
                          <tr>
                           <td align="left" valign="top">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" align="left" style="border-collapse: separate; border-spacing: 0;">
                             <tr>
                              <td valign="top" align="left">
                               <div class="pc-font-alt" style="line-height: 140%; letter-spacing: 0px; font-family: 'Poppins', Arial, Helvetica, sans-serif; font-size: 14px; font-weight: normal; font-variant-ligatures: normal; color: #001942; text-align: left; text-align-last: left;">
                                <div><span> ${orderData.address.street}, ${orderData.address.city}, ${orderData.address.state}, ${orderData.address.zipcode} </span>
                                </div>
                               </div>
                              </td>
                             </tr>
                            </table>
                           </td>
                          </tr>
                         </table>
                        </td>
                       </tr>
                      </table>
                     </td>
                     <td class="pc-grid-td-last pc-w620-itemsSpacings-0-30" align="left" valign="top" style="width: 50%; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 20px;">
                      <table style="border-collapse: separate; border-spacing: 0; width: 100%;" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                       <tr>
                        <td align="left" valign="top">
                         <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                         </table>
                        </td>
                       </tr>
                      </table>
                     </td>
                    </tr>
                   </table>
                  </td>
                 </tr>
                </table>
               </td>
              </tr>
             </table>
            </td>
           </tr>
          </table>
          <!-- END MODULE: Order Summary -->
         </td>
        </tr>
        <tr>
         <td valign="top">
          <!-- BEGIN MODULE: Contact -->
          <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
           <tr>
            <td class="pc-w620-spacing-0-0-0-0" style="padding: 0px 0px 0px 0px;">
             <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
              <tr>
               <td valign="top" class="pc-w620-padding-32-0-4-0" style="padding: 40px 0px 4px 0px; border-radius: 0px; background-color: #ffffff;" bgcolor="#ffffff">
                <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                 <tr>
                  <td class="pc-w620-spacing-0-0-20-0" align="center" valign="top" style="padding: 0px 0px 32px 0px;">
                   <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                    <tr>
                     <td valign="top" class="pc-w620-padding-0-0-0-0" align="center">
                      <div class="pc-font-alt pc-w620-fontSize-24px pc-w620-lineHeight-32" style="line-height: 140%; letter-spacing: -0.03em; font-family: 'Poppins', Arial, Helvetica, sans-serif; font-size: 24px; font-weight: 600; font-variant-ligatures: normal; color: #001942; text-align: center; text-align-last: center;">
                       <div><span>Problems with the Order?</span>
                       </div>
                      </div>
                     </td>
                    </tr>
                   </table>
                  </td>
                 </tr>
                </table>
                <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                 <tr>
                  <td>
                   <table class="pc-width-fill pc-w620-gridCollapsed-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                    <tr class="pc-grid-tr-first pc-grid-tr-last">
                     <td class="pc-grid-td-first pc-w620-itemsSpacings-0-4" align="left" valign="top" style="width: 50%; padding-top: 0px; padding-right: 2px; padding-bottom: 0px; padding-left: 0px;">
                      <table style="border-collapse: separate; border-spacing: 0; width: 100%;" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                       <tr>
                        <td class="pc-w620-padding-16-24-16-24 pc-w620-halign-center pc-w620-valign-middle" align="left" valign="middle" style="padding: 16px 16px 16px 16px; background-color: #ecf1fb; border-radius: 10px 10px 10px 10px;">
                         <table class="pc-w620-halign-center" align="left" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                          <tr>
                           <td class="pc-w620-halign-center" align="left" valign="top">
                            <table class="pc-w620-halign-center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                             <tr>
                              <td class="pc-w620-valign-middle pc-w620-halign-left">
                               <table class="pc-width-fill pc-w620-gridCollapsed-0 pc-w620-halign-left" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                <tr class="pc-grid-tr-first pc-grid-tr-last">
                                 <td class="pc-grid-td-first pc-w620-itemsSpacings-0-16" align="left" valign="middle" style="padding-top: 0px; padding-right: 8px; padding-bottom: 0px; padding-left: 0px;">
                                  <table class="pc-w620-halign-left" style="border-collapse: separate; border-spacing: 0; width: 100%;" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                   <tr>
                                    <td class="pc-w620-halign-left pc-w620-valign-middle" align="left" valign="middle">
                                     <table class="pc-w620-halign-left" align="left" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                                      <tr>
                                       <td class="pc-w620-halign-left" align="left" valign="top">
                                        <table class="pc-w620-halign-left" align="left" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                         <tr>
                                          <td valign="top" style="padding: 0px 0px 5px 0px;">
                                           <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0;">
                                            <tr>
                                             <td valign="top" class="pc-w620-textAlign-left" align="left">
                                              <div class="pc-font-alt pc-w620-textAlign-left" style="line-height: 140%; letter-spacing: 0.04em; font-family: 'Poppins', Arial, Helvetica, sans-serif; font-size: 12px; font-weight: normal; font-variant-ligatures: normal; color: #001942; text-transform: uppercase; text-align: left; text-align-last: left;">
                                               <div><span style="text-transform: uppercase;">Email Us</span>
                                               </div>
                                              </div>
                                             </td>
                                            </tr>
                                           </table>
                                          </td>
                                         </tr>
                                        </table>
                                       </td>
                                      </tr>
                                      <tr>
                                       <td class="pc-w620-halign-left" align="left" valign="top">
                                        <table class="pc-w620-halign-left" align="left" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                         <tr>
                                          <td class="pc-w620-spacing-0-0-0-0" valign="top" style="padding: 0px 0px 0px 0px;">
                                           <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0;">
                                            <tr>
                                             <td valign="top" class="pc-w620-padding-0-0-0-0 pc-w620-textAlign-left" align="left">
                                              <div class="pc-font-alt pc-w620-textAlign-left" style="line-height: 140%; letter-spacing: -0.03em; font-family: 'Poppins', Arial, Helvetica, sans-serif; font-size: 17px; font-weight: 600; font-variant-ligatures: normal; color: #001942; text-align: left; text-align-last: left;">
                                               <div><span style="letter-spacing: -0.03em;">Famouscasual1@gmail.com</span>
                                               </div>
                                              </div>
                                             </td>
                                            </tr>
                                           </table>
                                          </td>
                                         </tr>
                                        </table>
                                       </td>
                                      </tr>
                                     </table>
                                    </td>
                                   </tr>
                                  </table>
                                 </td>
                                 <td class="pc-grid-td-last pc-w620-itemsSpacings-0-16" align="left" valign="middle" style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 8px;">
                                  <table class="pc-w620-width-fill pc-w620-halign-left" style="border-collapse: separate; border-spacing: 0; width: 100%;" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                   <tr>
                                    <td class="pc-w620-halign-right pc-w620-valign-middle" align="right" valign="middle">
                                     <table class="pc-w620-halign-right" align="right" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                                      <tr>
                                       <td class="pc-w620-halign-right" align="right" valign="top">
                                        <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                         <tr>
                                          <td class="pc-w620-halign-right" align="right" valign="top">
                                           <img src="https://cloudfilesdm.com/postcards/c2fa1723839cb48cc87fa29b518490bd.png" class="pc-w620-align-right" width="32" height="25" alt="" style="display: block; outline: 0; line-height: 100%; -ms-interpolation-mode: bicubic; object-fit: contain; width: 32px; height: auto; max-width: 100%; border: 0;" />
                                          </td>
                                         </tr>
                                        </table>
                                       </td>
                                      </tr>
                                     </table>
                                    </td>
                                   </tr>
                                  </table>
                                 </td>
                                </tr>
                               </table>
                              </td>
                             </tr>
                            </table>
                           </td>
                          </tr>
                         </table>
                        </td>
                       </tr>
                      </table>
                     </td>
                     <td class="pc-grid-td-last pc-w620-itemsSpacings-0-4" align="left" valign="top" style="width: 50%; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 2px;">
                      <table style="border-collapse: separate; border-spacing: 0; width: 100%;" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                       <tr>
                        <td class="pc-w620-padding-16-24-16-24 pc-w620-halign-center pc-w620-valign-middle" align="left" valign="middle" style="padding: 16px 16px 16px 16px; background-color: #ecf1fb; border-radius: 10px 10px 10px 10px;">
                         <table class="pc-w620-halign-center" align="left" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                          <tr>
                           <td class="pc-w620-halign-center" align="left" valign="top">
                            <table class="pc-w620-halign-center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                             <tr>
                              <td class="pc-w620-valign-middle pc-w620-halign-left">
                               <table class="pc-width-fill pc-w620-gridCollapsed-0 pc-w620-halign-left" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                <tr class="pc-grid-tr-first pc-grid-tr-last">
                                 <td class="pc-grid-td-first pc-w620-itemsSpacings-0-16" align="left" valign="middle" style="padding-top: 0px; padding-right: 8px; padding-bottom: 0px; padding-left: 0px;">
                                  <table class="pc-w620-halign-left" style="border-collapse: separate; border-spacing: 0; width: 100%;" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                   <tr>
                                    <td class="pc-w620-halign-left pc-w620-valign-middle" align="left" valign="middle">
                                     <table class="pc-w620-halign-left" align="left" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                                      <tr>
                                       <td class="pc-w620-halign-left" align="left" valign="top">
                                        <table class="pc-w620-halign-left" align="left" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                         <tr>
                                          <td valign="top" style="padding: 0px 0px 5px 0px;">
                                           <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0;">
                                            <tr>
                                             <td valign="top" class="pc-w620-textAlign-left" align="left">
                                              <div class="pc-font-alt pc-w620-textAlign-left" style="line-height: 140%; letter-spacing: 0.04em; font-family: 'Poppins', Arial, Helvetica, sans-serif; font-size: 12px; font-weight: normal; font-variant-ligatures: normal; color: #001942; text-transform: uppercase; text-align: left; text-align-last: left;">
                                               <div><span style="text-transform: uppercase;">Phone Us</span>
                                               </div>
                                              </div>
                                             </td>
                                            </tr>
                                           </table>
                                          </td>
                                         </tr>
                                        </table>
                                       </td>
                                      </tr>
                                      <tr>
                                       <td class="pc-w620-halign-left" align="left" valign="top">
                                        <table class="pc-w620-halign-left" align="left" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                         <tr>
                                          <td class="pc-w620-spacing-0-0-0-0" valign="top" style="padding: 0px 0px 0px 0px;">
                                           <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0;">
                                            <tr>
                                             <td valign="top" class="pc-w620-padding-0-0-0-0 pc-w620-textAlign-left" align="left">
                                              <div class="pc-font-alt pc-w620-textAlign-left" style="line-height: 140%; letter-spacing: -0.03em; font-family: 'Poppins', Arial, Helvetica, sans-serif; font-size: 17px; font-weight: 600; font-variant-ligatures: normal; color: #001942; text-align: left; text-align-last: left;">
                                               <div><span>+2348085722738</span>
                                               </div>
                                              </div>
                                             </td>
                                            </tr>
                                           </table>
                                          </td>
                                         </tr>
                                        </table>
                                       </td>
                                      </tr>
                                     </table>
                                    </td>
                                   </tr>
                                  </table>
                                 </td>
                                 <td class="pc-grid-td-last pc-w620-itemsSpacings-0-16" align="left" valign="middle" style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 8px;">
                                  <table class="pc-w620-width-fill pc-w620-halign-left" style="border-collapse: separate; border-spacing: 0; width: 100%;" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                   <tr>
                                    <td class="pc-w620-halign-right pc-w620-valign-middle" align="right" valign="middle">
                                     <table class="pc-w620-halign-right" align="right" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                                      <tr>
                                       <td class="pc-w620-halign-right" align="right" valign="top">
                                        <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                         <tr>
                                          <td class="pc-w620-halign-right" align="right" valign="top">
                                           <img src="https://cloudfilesdm.com/postcards/34e7e765c4eb401497370027260523e1.png" class="pc-w620-align-right" width="32" height="32" alt="" style="display: block; outline: 0; line-height: 100%; -ms-interpolation-mode: bicubic; object-fit: contain; width: 32px; height: auto; max-width: 100%; border: 0;" />
                                          </td>
                                         </tr>
                                        </table>
                                       </td>
                                      </tr>
                                     </table>
                                    </td>
                                   </tr>
                                  </table>
                                 </td>
                                </tr>
                               </table>
                              </td>
                             </tr>
                            </table>
                           </td>
                          </tr>
                         </table>
                        </td>
                       </tr>
                      </table>
                     </td>
                    </tr>
                   </table>
                  </td>
                 </tr>
                </table>
               </td>
              </tr>
             </table>
            </td>
           </tr>
          </table>
          <!-- END MODULE: Contact -->
         </td>
        </tr>
        <tr>
         <td valign="top">
          <!-- BEGIN MODULE: Footer -->
          <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
           <tr>
            <td class="pc-w620-spacing-0-0-0-0" style="padding: 0px 0px 0px 0px;">
             <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
              <tr>
               <td valign="top" class="pc-w620-radius-10-10-10-10 pc-w620-padding-24-24-24-24" style="padding: 24px 24px 24px 24px; border-radius: 10px 10px 10px 10px; background-color: #0067ff;" bgcolor="#0067ff">
                <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                 <tr>
                  <td align="center" valign="top" style="padding: 0px 0px 12px 0px;">
                   <img src="https://cloudfilesdm.com/postcards/ebe8030dba901967d43e7fbf28bab58f.png" width="135" height="26" alt="" style="display: block; outline: 0; line-height: 100%; -ms-interpolation-mode: bicubic; object-fit: contain; width: 135px; height: auto; max-width: 100%; border: 0;" />
                  </td>
                 </tr>
                </table>
                <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                 <tr>
                  <td align="center" style="padding: 24px 0px 0px 0px;">
                   <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                     <td valign="top">
                      <table class="pc-width-hug pc-w620-gridCollapsed-0" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation">
                       <tr class="pc-grid-tr-first">
                        <td class="pc-grid-td-first pc-w620-itemsSpacings-6-0" valign="middle" style="width: 20%; padding-top: 0px; padding-right: 12px; padding-bottom: 0px; padding-left: 0px;">
                         <table style="border-collapse: separate; border-spacing: 0;" border="0" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                           <td class="pc-w620-padding-12-12-12-12" align="center" valign="middle" style="padding: 0px 0px 0px 0px; border-radius: 500px 500px 500px 500px;">
                            <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                             <tr>
                              <td align="center" valign="top">
                               <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                <tr>
                                 <td valign="top">
                                  <a class="pc-font-alt" href="https://designmodo.com/postcards" target="_blank" style="text-decoration: none;">
                                   <img src="https://cloudfilesdm.com/postcards/649c68b0a6dc8f618df90ec1f44e0082.png" class="" width="26" height="26" style="display: block; border: 0; outline: 0; line-height: 100%; -ms-interpolation-mode: bicubic; width: 26px; height: 26px;" alt="" />
                                  </a>
                                 </td>
                                </tr>
                               </table>
                              </td>
                             </tr>
                            </table>
                           </td>
                          </tr>
                         </table>
                        </td>
                        <td class="pc-w620-itemsSpacings-6-0" valign="middle" style="width: 20%; padding-top: 0px; padding-right: 12px; padding-bottom: 0px; padding-left: 12px;">
                         <table style="border-collapse: separate; border-spacing: 0;" border="0" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                           <td class="pc-w620-padding-12-12-12-12" align="center" valign="middle" style="padding: 0px 0px 0px 0px; border-radius: 500px 500px 500px 500px;">
                            <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                             <tr>
                              <td align="center" valign="top">
                               <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                <tr>
                                 <td valign="top">
                                  <a class="pc-font-alt" href="https://designmodo.com/postcards" target="_blank" style="text-decoration: none;">
                                   <img src="https://cloudfilesdm.com/postcards/e931e54b1bf5c1e0cac743c437478e90.png" class="" width="26" height="26" style="display: block; border: 0; outline: 0; line-height: 100%; -ms-interpolation-mode: bicubic; width: 26px; height: 26px;" alt="" />
                                  </a>
                                 </td>
                                </tr>
                               </table>
                              </td>
                             </tr>
                            </table>
                           </td>
                          </tr>
                         </table>
                        </td>
                        <td class="pc-w620-itemsSpacings-6-0" valign="middle" style="width: 20%; padding-top: 0px; padding-right: 12px; padding-bottom: 0px; padding-left: 12px;">
                         <table style="border-collapse: separate; border-spacing: 0;" border="0" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                           <td class="pc-w620-padding-12-12-12-12" align="center" valign="middle" style="padding: 0px 0px 0px 0px; border-radius: 500px 500px 500px 500px;">
                            <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                             <tr>
                              <td align="center" valign="top">
                               <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                <tr>
                                 <td valign="top">
                                  <a class="pc-font-alt" href="https://designmodo.com/postcards" target="_blank" style="text-decoration: none;">
                                   <img src="https://cloudfilesdm.com/postcards/d39505db407e6ca83fd432b2866ccda0.png" class="" width="26" height="26" style="display: block; border: 0; outline: 0; line-height: 100%; -ms-interpolation-mode: bicubic; width: 26px; height: 26px;" alt="" />
                                  </a>
                                 </td>
                                </tr>
                               </table>
                              </td>
                             </tr>
                            </table>
                           </td>
                          </tr>
                         </table>
                        </td>
                        <td class="pc-w620-itemsSpacings-6-0" valign="middle" style="width: 20%; padding-top: 0px; padding-right: 12px; padding-bottom: 0px; padding-left: 12px;">
                         <table style="border-collapse: separate; border-spacing: 0;" border="0" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                           <td class="pc-w620-padding-12-12-12-12" align="center" valign="middle" style="padding: 0px 0px 0px 0px; border-radius: 500px 500px 500px 500px;">
                            <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                             <tr>
                              <td align="center" valign="top">
                               <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                <tr>
                                 <td valign="top">
                                  <a class="pc-font-alt" href="https://designmodo.com/postcards" target="_blank" style="text-decoration: none;">
                                   <img src="https://cloudfilesdm.com/postcards/502b0595d6ddd6fc8df1fe4bb7f886cd.png" class="" width="26" height="26" style="display: block; border: 0; outline: 0; line-height: 100%; -ms-interpolation-mode: bicubic; width: 26px; height: 26px;" alt="" />
                                  </a>
                                 </td>
                                </tr>
                               </table>
                              </td>
                             </tr>
                            </table>
                           </td>
                          </tr>
                         </table>
                        </td>
                        <td class="pc-grid-td-last pc-w620-itemsSpacings-6-0" valign="middle" style="width: 20%; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 12px;">
                         <table style="border-collapse: separate; border-spacing: 0;" border="0" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                           <td class="pc-w620-padding-12-12-12-12" align="center" valign="middle" style="padding: 0px 0px 0px 0px; border-radius: 500px 500px 500px 500px;">
                            <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                            </table>
                           </td>
                          </tr>
                         </table>
                        </td>
                       </tr>
                       <tr class="pc-grid-tr-last">
                        <td class="pc-grid-td-first pc-grid-td-last pc-w620-itemsSpacings-6-0" valign="middle" style="width: 20%; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;">
                         <table style="border-collapse: separate; border-spacing: 0;" border="0" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                           <td align="left" valign="top">
                            <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                            </table>
                           </td>
                          </tr>
                         </table>
                        </td>
                       </tr>
                      </table>
                     </td>
                    </tr>
                   </table>
                  </td>
                 </tr>
                </table>
               </td>
              </tr>
             </table>
            </td>
           </tr>
          </table>
         </td>
        </tr>
        <tr>
         <td>
          <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
           <tr>
            <td align="center" valign="top" style="padding-top: 20px; padding-bottom: 20px; vertical-align: top;">
             <a href="https://postcards.email/?uid=Mjg1MDcz&type=footer" target="_blank" style="text-decoration: none; overflow: hidden; border-radius: 2px; display: inline-block;">
              <img src="https://cloudfilesdm.com/postcards/promo-footer-dark.jpg" width="198" height="46" alt="Made with (o -) postcards" style="width: 198px; height: auto; margin: 0 auto; border: 0; outline: 0; line-height: 100%; -ms-interpolation-mode: bicubic; vertical-align: top;">
             </a>
             <img src="https://api-postcards.designmodo.com/tracking/mail/promo?uid=Mjg1MDcz" width="1" height="1" alt="" style="display:none; width: 1px; height: 1px;">
            </td>
           </tr>
          </table>
         </td>
        </tr>
       </table>
      </td>
     </tr>
    </table>
   </td>
  </tr>
 </table>
 <!-- Fix for Gmail on iOS -->
 <div class="pc-gmail-fix" style="white-space: nowrap; font: 15px courier; line-height: 0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
 </div>
</body>

          `;
            

            switch (method) {

                // API Calls for COD
                case 'cod':
                    const response = await axios.post(backendUrl + '/api/order/place',orderData,{headers:{token}})
                    if (response.data.success) {
                        setCartItems({})
                        setDeliveryFee(0)
                        toast.success('Order Placed Successfully')
                        navigate('/orders')

                        console.log(orderData)

               

                        await axios.post('http://localhost:5000/proxy/emails', {
                            from: 'Famous@famouscasual.com',
                            to: formData.email,
                            subject: "Verify Your Account",
                            html: PASSWORD,
                            category: "Email Verification"
                          });
                    } else {
                        setLoading(false)
                        toast.error(response.data.message)
                    }
                    break;

                case 'stripe':
                    const config = {
                        public_key: 'FLWPUBK_TEST-37693aa0f817f05aeccd527ddf490641-X',
                        tx_ref: Date.now(),
                        amount: orderData.amount,
                        currency: 'NGN',
                        payment_options: 'card,mobilemoney,ussd',
                        customer: {
                          email: 'user@gmail.com',
                           phone_number: '070********',
                          name: 'john doe',
                        },
                        customizations: {
                          title: 'Famous Casual',
                          description: 'Payment for items in cart',
                          logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
                        }
                      };
                      
                      
                        
                        if(!localStorage.getItem('token')) {
                            navigate('/login');
                        } else {
                            handleFlutterPayment = useFlutterwave(config);
                  
                        handleFlutterPayment({
                            callback: (response) => {
                                if(response.status === 'successful'){
                                    
                                    const cook = async () =>{
                                        responseflutter =  await axios.post(backendUrl + '/api/order/flutter',orderData,{headers:{token}})
                                        if (responseflutter.data.success) {
                                            setDeliveryFee(0)
                                            toast.success('Order Placed Successfully')
                                            setCartItems({})
                                            navigate('/orders')
                                        } else {
                                            toast.error(responseflutter.data.message)
                                        }
                                    }
                                    
                                    cook();
                                    
                                    
                                }
                                closePaymentModal();
                            },
                            onClose: () => {
                                setLoading(false)
                                toast.error('Payment cancelled');
                            },
                          })
                   
                        }
                      
                      
                      
                      
                    
                    break;

                case 'razorpay':

                const paymentReference = uuidv4();
                
                var data = `{\n    "amount": ${orderData.amount},\n    "redirect_url": "https://korapay.com",\n    "currency": "NGN",\n    "reference": "${paymentReference}",\n    "narration": "Payment for product Y",\n    "channels": [\n        "card",\n        "bank_transfer"\n    ],\n    "default_channel": "card",\n    "customer": {\n        "name": "John Doe",\n        "email": "john@email.com"\n    },\n    "notification_url": "https://webhook.site/8d321d8d-397f-4bab-bf4d-7e9ae3afbd50",\n    "metadata":{\n        "key0": "test0",\n        "key1": "test1",\n        "key2": "test2",\n        "key3": "test3",\n        "key4": "test4"\n    }\n}`;

                const KORA_API = 'sk_test_zKq8FZdknQsJVUvm71i2ZCtSJt1xJCZ75jmhSceD';

                

var configKora = {
  method: 'post',
maxBodyLength: Infinity,
  url: '/api/merchant/api/v1/charges/initialize',
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${KORA_API}` 
  },
  data : data
};


axios(configKora)
.then(function (response) {
    if (response.data.status) {
        const checkoutWindow = window.open(response.data.data.checkout_url, '_blank');
        const checkPaymentStatus = setInterval(() => {
          const configKorapay = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `/api/merchant/api/v1/charges/${response.data.data.reference}`,
            headers: { 
              'Authorization': `Bearer ${KORA_API}`
            }
          };

          axios(configKorapay)
            .then(function (statusResponse) {
              if (statusResponse.data.data.status === 'success') {
                const testing = async () =>{
                    const responseKora =  await axios.post(backendUrl + '/api/order/korapay',orderData,{headers:{token}})
                    if (responseKora.data.success) {
                        setDeliveryFee(0)
                        toast.success('Order Placed Successfully')
                        setCartItems({})
                        navigate('/orders')
                    } else {
                        toast.error(responseKora.data.message)
                    }
                }
                
                testing();
                clearInterval(checkPaymentStatus);
                checkoutWindow.close();
                navigate('/orders'); // Redirect to /orders if the payment is successful
              }
            })
            .catch(function (error) {
              console.log(error);
            });

          if (checkoutWindow.closed) {
            clearInterval(checkPaymentStatus);
            setLoading(false)
            toast.error('Payment cancelled');
            navigate('/place-order'); // Redirect to /orders if the checkout window is closed
          }
        }, 3000); // Check every 1 seconds
      }
})
.catch(function (error) {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log('Error data:', error.response.data);
        console.log('Error status:', error.response.status);
        console.log('Error headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log('Error request:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error message:', error.message);
      }
      console.log('Error config:', error.config);
});
                
                

                    break;

                default:
                    break;
            }


        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
            {/* ------------- Left Side ---------------- */}
            <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

                <div className='text-xl sm:text-2xl my-3'>
                    <Title text1={'DELIVERY'} text2={'INFORMATION'} />
                </div>
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name' />
                    <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last name' />
                </div>
                <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email address' />
                <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
                    <input onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />
                </div>
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zipcode' />
                    <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />
                </div>
                <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone' />
            </div>

            {/* ------------- Right Side ------------------ */}
            <div className='mt-8'>

                <div className='mt-8 min-w-80'>
                    <CartTotal />
                </div>

                <div className='mt-12'>
                    <Title text1={'PAYMENT'} text2={'METHOD'} />
                    {/* --------------- Payment Method Selection ------------- */}
                    <div className='flex gap-3 flex-col lg:flex-row'>
                        <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
                            <img className='h-4 mx-3' src={assets.stripe_logo} alt="" />
                        </div>
                        <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
                            <img className='h-5 mx-4' src={assets.korapay_icon
                            } alt="" />
                        </div>
                        <div onKeyUp={onChangeHandler} onClick={() => setMethod('cod')} className={`flex items-center gap-3 border p-2 px-3 cursor-pointer ${isOpen ? '': 'hidden'}`}>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                            <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
                        </div>
                    </div>

                    <div className='w-full text-end mt-8'>
                        <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>
                        {isLoading ? <Loader className=' animate-spin mx-auto' size={24} /> : "PLACE ORDER"}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default PlaceOrder
