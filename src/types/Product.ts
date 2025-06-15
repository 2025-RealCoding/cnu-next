export interface ProductItem {
  title: string; // 상품명
  link: string; // 상품 상세 페이지 링크
  image: string; // 상품 이미지 URL
  lprice: string; // 최저가 (문자열로 제공됨)
  hprice: string; // 최고가
  mallName: string; // 쇼핑몰 이름
  productId: string; // 상품 ID
  productType: string; // 상품 타입 (1: 일반상품, 2: 스마트스토어 등)
  brand: string; // 브랜드명
  maker: string; // 제조사
  category1: string; // 1차 카테고리
  category2: string; // 2차 카테고리
  category3: string; // 3차 카테고리
  category4: string; // 4차 카테고리
}
