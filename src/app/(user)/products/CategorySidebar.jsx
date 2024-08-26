import ProductFilter from "./ProductFilter";
import ProductSort from "./ProductSort";


export default function CategorySidebar({categories}) {
  return (
    <div className="col-span-1">
        <ProductFilter categories={categories} />
        <ProductSort />
    </div>
  )
}
