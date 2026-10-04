

export const registerFormControls = [
    {
        name:"username",
        label:"User Name",
        type:"text",
        placeholder:"Enter your user name",
        required:true,
        componentType:"input"
    },
    {
        name:"email",
        label:"Email",
        type:"email",
        placeholder:"Enter your email",
        // required:true,
        componentType:"input"
    },
    {
        name:"password",
        label:"Password",
        type:"password",
        placeholder:"Enter your password",
        // required:true,
        componentType:"input"
    }
]

export const LoginFromControls = [
   {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
]


export const addProductsFromElements = [
    {
      "label": "Product Name",
      "name": "title",
      "componentType": "input",
      "type": "text",
      "placeholder": "Enter product name"
    },
    {
      "label": "Price",
      "name": "price",
      "componentType": "input",
      "type": "number",
      "placeholder": "0.00"
    },
    {
      "label": "Sale Price",
      "name": "salePrice",
      "componentType": "input",
      "type": "number",
      "placeholder": "0.00 (optional)"
    },
    {
      "label": "Category",
      "name": "category",
      "componentType": "select",
      "type": "select",
      "placeholder": "Select a category",
      "options": [
        { "value": "electronics", "label": "Electronics" },
        { "value": "clothing", "label": "Clothing" },
        { "value": "food", "label": "Food & Beverage" },
        { "value": "home", "label": "Home & Garden" },
        { "value": "sports", "label": "Sports & Outdoors" }
      ]
    },
    {
      "label": "Stock Quantity",
      "name": "totalStock",
      "componentType": "input",
      "type": "number",
      "placeholder": "Enter stock quantity"
    },
    {
      "label": "Description",
      "name": "description",
      "componentType": "textarea",
      "type": "textarea",
      "placeholder": "Enter product description"
    },
    {
      "label": "Brand",
      "name": "brand",
      "componentType": "input",
      "type": "text",
      "placeholder": "Enter brand name"
    },    
]

export const menuItemShoppingView = [
  {
    id:"home",
    label:"Home",
    path:"/shop/home"
  },
  {
    id:"women",
    label:"women",
    path:"/shop/listing"
  },
  {
    id:"footware",
    label:"women",
    path:"/shop/listing"
  },
  {
    id:"accessories",
    label:"women",
    path:"/shop/listing"
  },
  {
    id:"kids",
    label:"kids",
    path:"/shop/listing"
  },
  {
    id:"men",
    label:"men",
    path:"/shop/listing"
  },
  {
    
  }
]


// filters.js
export const filters = {
  ProductFilter: {
    category: {
      key: "category",
      label: "Category",
      type: "checkbox",
      options: [
        { label: "Electronics", value: "electronics" },
        { label: "Fashion", value: "fashion" },
        { label: "Home & Kitchen", value: "home-kitchen" },
        { label: "Beauty", value: "beauty" },
        { label: "Sports", value: "sports" },
        { label: "Books", value: "books" },
      ],
    },
    brand: {
      key: "brand",
      label: "Brand",
      type: "checkbox",
      options: [
        { label: "Apple", value: "apple" },
        { label: "Samsung", value: "samsung" },
        { label: "Nike", value: "nike" },
        { label: "Adidas", value: "adidas" },
        { label: "Sony", value: "sony" },
      ],
    },
    price: {
      key: "price",
      label: "Price",
      type: "radio",
      options: [
        { label: "Under ₹500", value: "0-500" },
        { label: "₹500 - ₹1,000", value: "500-1000" },
        { label: "₹1,000 - ₹5,000", value: "1000-5000" },
        { label: "₹5,000 - ₹20,000", value: "5000-20000" },
        { label: "Above ₹20,000", value: "20000-" },
      ],
    },
    rating: {
      key: "rating",
      label: "Customer Rating",
      type: "radio",
      options: [
        { label: "4★ & above", value: "4" },
        { label: "3★ & above", value: "3" },
        { label: "2★ & above", value: "2" },
        { label: "1★ & above", value: "1" },
      ],
    },
    discount: {
      key: "discount",
      label: "Discount",
      type: "radio",
      options: [
        { label: "10% or more", value: "10" },
        { label: "25% or more", value: "25" },
        { label: "50% or more", value: "50" },
        { label: "70% or more", value: "70" },
      ],
    },
    color: {
      key: "color",
      label: "Color",
      type: "checkbox",
      options: [
        { label: "Black", value: "black" },
        { label: "White", value: "white" },
        { label: "Red", value: "red" },
        { label: "Blue", value: "blue" },
        { label: "Green", value: "green" },
        { label: "Yellow", value: "yellow" },
      ],
    },
    size: {
      key: "size",
      label: "Size",
      type: "checkbox",
      options: [
        { label: "XS", value: "xs" },
        { label: "S", value: "s" },
        { label: "M", value: "m" },
        { label: "L", value: "l" },
        { label: "XL", value: "xl" },
        { label: "XXL", value: "xxl" },
      ],
    },
    availability: {
      key: "availability",
      label: "Availability",
      type: "checkbox",
      options: [{ label: "In Stock Only", value: "inStock" }],
    },
    delivery: {
      key: "delivery",
      label: "Delivery",
      type: "checkbox",
      options: [
        { label: "Free Delivery", value: "free" },
        { label: "Express Delivery", value: "express" },
        { label: "Cash on Delivery", value: "cod" },
      ],
    },
  },
};
