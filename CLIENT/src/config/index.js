

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