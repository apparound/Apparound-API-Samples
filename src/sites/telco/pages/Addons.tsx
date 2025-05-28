import React from 'react'
import { Card } from '@/components/ui/card'
import ProductIcon from '@/sites/telco/components/ProductIcon'

interface AddonsProps {
   addons: any[]
}

const Addons: React.FC<AddonsProps> = ({ addons }) => {
   return (
      <div className="max-w-2xl mx-auto my-10">
         <h2 className="text-2xl font-bold text-center text-primary mb-8">Dettaglio offerta</h2>
         {addons.length === 0 ? (
            <Card className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
               <div className="text-gray-500 text-center">Nessun dettaglio disponibile</div>
            </Card>
         ) : (
            <div className="space-y-8">
               {addons.map((cluster: any) => (
                  <Card key={cluster.id} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                     <div className="font-bold text-lg text-gray-800 mb-3 flex items-center">{cluster.label}</div>
                     <div>
                        {cluster.products && cluster.products.length > 0 ? (
                           cluster.products.map((product: any, pidx: number) => (
                              <React.Fragment key={product.guid}>
                                 <div className="flex items-center justify-between py-2 px-1">
                                    <div className="flex items-center gap-3">
                                       {ProductIcon.get(product.label.toLowerCase()) ||
                                          (product.icon && product.icon !== '' ? (
                                             <img src={product.icon} alt="" className="w-10 h-10" />
                                          ) : (
                                             <span className="w-8 h-8 inline-block" />
                                          ))}
                                       <div>
                                          <div className="font-light text-gray-900">{product.label}</div>
                                       </div>
                                    </div>
                                    <div className="text-right min-w-[80px] font-semibold text-gray-700">
                                       {product.price && product.price > 0
                                          ? product.price.toLocaleString('it-IT', {
                                               style: 'currency',
                                               currency: 'EUR',
                                            })
                                          : 'Incluso'}
                                    </div>
                                 </div>
                                 {pidx < cluster.products.length - 1 && <hr className="my-2 border-gray-200" />}
                              </React.Fragment>
                           ))
                        ) : (
                           <div className="text-gray-400 italic">Nessun prodotto</div>
                        )}
                     </div>
                  </Card>
               ))}
            </div>
         )}
      </div>
   )
}

export default Addons
