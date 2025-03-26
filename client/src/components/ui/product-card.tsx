import { Link } from "wouter";
import { Product } from "@shared/schema";
// Import the necessary attached assets
import almondOatImage from "@assets/Almond Oat Lifestyle.png";
import chocochipBrownieImage from "@assets/Chocochip Brownie.png";
import kodoMilletImage from "@assets/Kodo Millet.png";
import honeyOatsImage from "@assets/Honey Oats.png";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const productTags = (product: Product) => {
    const tags = [];
    
    if (product.name.includes("Almond")) {
      tags.push("No Maida");
      tags.push("Pure Desi Ghee");
      tags.push("Zero Trans Fat");
    } else if (product.name.includes("Chocochip")) {
      tags.push("No Preservatives");
      tags.push("Pure Desi Ghee");
      tags.push("Zero Trans Fat");
    } else if (product.name.includes("Kodo")) {
      tags.push("Wheat-Free");
      tags.push("High Protein");
      tags.push("No Refined Sugar");
    } else if (product.name.includes("Honey")) {
      tags.push("Natural Sweetness");
      tags.push("Pure Desi Ghee");
      tags.push("Zero Trans Fat");
    }
    
    return tags;
  };

  // Helper function to get the correct image based on product name
  const getProductImage = (product: Product) => {
    if (product.name.includes("Almond")) {
      return almondOatImage;
    } else if (product.name.includes("Chocochip")) {
      return chocochipBrownieImage;
    } else if (product.name.includes("Kodo")) {
      return kodoMilletImage;
    } else if (product.name.includes("Honey")) {
      return honeyOatsImage;
    }
    // Fallback to first image if no match
    return almondOatImage;
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow hover:scale-[1.02] duration-300">
      <Link href={`/product/${product.slug}`}>
        <img 
          src={getProductImage(product)} 
          alt={product.name} 
          className="w-full h-60 object-cover" 
          width="500" 
          height="300"
        />
      </Link>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-['Playfair_Display'] text-lg font-semibold text-[#8B5A2B] hover:underline">
              {product.name}
            </h3>
          </Link>
          {product.badge && (
            <span className={`
              text-sm px-2 py-1 rounded
              ${product.badge === 'Bestseller' ? 'bg-[#9BBC91] text-white' : ''}
              ${product.badge === 'New' ? 'bg-[#F2C94C] text-[#6D4522]' : ''}
              ${product.badge === 'Gluten-Free' ? 'bg-[#9BBC91] text-white' : ''}
            `}>
              {product.badge}
            </span>
          )}
        </div>
        <p className="mt-2 text-sm text-[#4A3520] opacity-80 line-clamp-2">
          {product.shortDescription}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {productTags(product).map((tag, index) => (
            <span key={index} className="bg-[#F9F5EB] text-xs px-2 py-1 rounded-full text-[#6D4522]">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
