import { Button } from "radix-ui/toolbar";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardFooter } from "../ui/card";

function ShoppingProductTile({productItem}){
    return(
        <Card className="w-full max-w-sm mx-auto">
            <div>
                <div className="relative">
                    <img
                    src={productItem?.image}
                    alt={productItem?.title}
                    className="w-full h-[300px] object-cover rounded-t-lg"
                     />
                     {
                        productItem?.salePrice >0? <Badge className="absolute top-2 right-2 bg-red-500 text-white hover:bg-red-700"/>
                        :null
                     }
                </div>
                <CardContent className="p-4">
                    <h3 className="text-lg font-bold">{productItem?.title}</h3>
                    <p className="text-gray-600">${productItem?.price.toFixed(2)}</p>
                    <span>{productItem?.description}</span>
                    {productItem?.salePrice > 0 && (
                        <p className="text-red-500 font-bold">${productItem?.salePrice.toFixed(2)}</p>
                    )}
                </CardContent>
                <CardFooter>
                    <Button className="w-full bg-blue-500 text-white hover:bg-blue-700">
                        Add to Cart
                    </Button>
                </CardFooter>
            </div>
        </Card>
    )
}