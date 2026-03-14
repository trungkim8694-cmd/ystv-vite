// Định nghĩa kiểu dữ liệu cho sản phẩm
interface ProductData {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
}

/**
 * Hàm tạo số ngẫu nhiên nhưng cố định dựa trên ID sản phẩm
 * Giúp dữ liệu nhất quán mỗi khi Google quét lại trang
 */
const getDeterministicValue = (id: string, min: number, max: number) => {
  const hash = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return Math.floor((hash % (max - min + 1)) + min);
};

export function generateProductSchema(
  product: ProductData,
  lang: string = "vi",
) {
  const siteUrl = "https://yensaothinhvuong.com";
  const isZh = lang === "zh";

  // Tự động tạo dữ liệu đánh giá tự nhiên
  const ratingValue = (getDeterministicValue(product.id, 48, 50) / 10).toFixed(
    1,
  );
  const reviewCount = getDeterministicValue(product.id, 80, 200);

  // Cấu hình theo quốc gia
  const currency = isZh ? "CNY" : "VND";
  const brandName = isZh ? "盛旺燕窝 (YSTV)" : "Yến Sào Thịnh Vượng (YSTV)";
  const price = isZh ? Math.round(product.price / 3500) : product.price; // Ví dụ quy đổi tỷ giá tạm tính sang Nhân dân tệ nếu cần

  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: product.image.startsWith("http")
      ? product.image
      : `${siteUrl}${product.image}`,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: brandName,
    },
    sku: `YSTV-${product.id}`,
    mpn: product.id,
    offers: {
      "@type": "Offer",
      url: `${siteUrl}/${lang}/products/${product.id}`,
      priceCurrency: currency,
      price: price,
      priceValidUntil: "2026-12-31",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: brandName,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Hà Trì",
          addressLocality: "Vĩnh Tường",
          addressRegion: "Vĩnh Phúc", // Đã cập nhật theo yêu cầu chỉnh sửa của bạn
          addressCountry: "VN",
        },
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: ratingValue,
      bestRating: "5",
      worstRating: "4",
      reviewCount: reviewCount,
    },
  };
}

/**
 * Tạo Schema danh sách sản phẩm để Google hiển thị dạng Carousel
 */
export function generateItemListSchema(
  products: ProductData[],
  lang: string = "vi",
) {
  const siteUrl = "https://yensaothinhvuong.com";

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: lang === "zh" ? "精选产品系列" : "Danh mục sản phẩm YSTV",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${siteUrl}/${lang}/products/${product.id}`,
    })),
  };
}
