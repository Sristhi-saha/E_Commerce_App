import {filters }from '../../config/index.js'
function ProductFilter({}){
    return(
        <div className="bg-background rounded-lg ">
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">
                    Filters
                </h3>
             </div> 
             <div className="p-4 space-y-4">
                {
                    Object.keys(filters.ProductFilter).map((filterKey)=>{
                        const filter = filters.ProductFilter[filterKey];
                        return(
                            <div key={filterKey} className="space-y-2">
                                <h4 className="font-medium">{filter.label}</h4>
                                <div className="space-y-2">
                                    {filter.options.map((option) => (
                                        <div key={option.value} className="flex items-center">
                                            <input
                                                type={filter.type}
                                                id={`${filter.key}-${option.value}`}
                                                name={filter.key}
                                                value={option.value}
                                                className="mr-2"
                                            />
                                            <label htmlFor={`${filter.key}-${option.value}`}>
                                                {option.label}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    })
                }
             </div>  
        </div>
    )
}

export default ProductFilter;