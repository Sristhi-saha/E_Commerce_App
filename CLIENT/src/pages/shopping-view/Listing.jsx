import React from 'react'
import  ProductFilter from '../../components/shopping-view/filter'

const Listing = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-4 p-4 md:p-8">
       < ProductFilter />
        <div className="bg-background rounded-lg p-4 shadow-sm">
          <div className="p-4 bodrer-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-extrabold">
                All Products
              </h2>
              <div className="flex items-center space-x-2">
                <label htmlFor="sort" className="text-sm font-medium">
                  Sort by:
                </label>
                <select
                  id="sort"
                  name="sort"
                  className="border border-gray-300 rounded-md p-1 text-sm"
                > 
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="newest">Newest Arrivals</option>
                </select>
          </div>
        </div>
    </div>
    </div>
  )
}

export default Listing