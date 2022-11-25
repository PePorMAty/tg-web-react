import React, { useState } from 'react'
import './ProductList.css'
import { ProductItem } from './../ProductItem/ProductItem';
import { useTelegram } from '../../hooks/useTelegram';

const products = [
  {id:1, title: 'Джинсы', price: '5000', description: 'Синего цвета, прямые'},
  {id:2, title: 'Куртка', price: '12000', description: 'Зеленого цвета, теплая'},
  {id:3, title: 'Джинсы 2', price: '5000', description: 'Синего цвета, узкие'},
  {id:4, title: 'Куртка 8', price: '7000', description: 'Синего цвета, короткая'},
  {id:5, title: 'Джинсы 3', price: '8000', description: 'Черного цвета, прямые'},
  {id:6, title: 'Куртка 7', price: '3000', description: 'Белого цвета, летняя'},
  {id:7, title: 'Джинсы 4', price: '4500', description: 'Черного цвета, узкие'},
  {id:8, title: 'Куртка 5', price: '5000', description: 'Черного цвета, теплая'}
]

const getTotalPrice = (items = []) => {
  return items.reduce((acc, item) => {
    return acc += item.price
  }, 0)
}

export const ProductList = () => {
  const [addedItems, setAddedItems] = useState([])
  const {tg} = useTelegram()
  const onAdd = (product) => {
    const alreadyAdded = addedItems.find(item => item.id === product.id)
    let newItems = []

    if(alreadyAdded){
      newItems = addedItems.filter(item => item.id !== product.id)
    } else {
      newItems = [...addedItems, product]
    }

    setAddedItems(newItems)

    if(newItems.length === 0){
      tg.MainButton.hide()
    } else {
      tg.MainButton.show()
      tg.MainButton.setParams({
        text: `Купить ${getTotalPrice(newItems)}`
      })
    }
  }

  return (
    <div className='list'>
      {products.map(item => (
        <ProductItem
          product={item}
          onAdd={onAdd}
          className={'item'}
        />
      ))}
    </div>
  )
}
