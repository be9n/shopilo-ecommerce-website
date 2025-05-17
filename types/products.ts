export type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
  discountPrice?: number;
};

export type SliderProduct = Product & {
  withHoverEffect: boolean;
  hoverImage?: string;
};
