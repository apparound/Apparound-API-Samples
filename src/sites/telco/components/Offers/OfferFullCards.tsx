import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import React from 'react'

const OfferFullCards = ({ products, navigate }) => (
  <div className="grid md:grid-cols-3 gap-8 mb-12">
    {products.map((product, idx) => (
      <Card key={product.guid || idx} className="relative overflow-hidden">
        <div className="p-6">
          <h3 className="text-xl font-bold text-primary mb-6">{product.productName || product.label}</h3>
          <ul className="space-y-4 mb-8">
            {product.features && product.features.length > 0 ? (
              product.features.map((feature, i) => (
                <li className="flex items-center" key={i}>
                  <Check className="text-green-500 mr-2" />
                  <span>{feature}</span>
                </li>
              ))
            ) : (
              <li className="flex items-center">
                <Check className="text-green-500 mr-2" />
                <span>Fibra ultraveloce</span>
              </li>
            )}
          </ul>
          <div className="text-center mb-6">
            <div className="text-sm text-gray-600">A partire da</div>
            <div className="text-3xl font-bold text-primary">
              {product.price ? `${product.price} €` : '--'}{' '}
              <span className="text-sm font-normal">al mese</span>
            </div>
          </div>
          <Button
            className="w-full bg-purple-600 hover:bg-purple-700"
            onClick={() =>
              navigate('/configure-offer', { state: { offer: product.productName || product.label } })
            }
          >
            SCOPRI E ATTIVA
          </Button>
        </div>
      </Card>
    ))}
  </div>
)

export default OfferFullCards
