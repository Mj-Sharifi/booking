export type locationData = {
  id: number;
  attributes: {
    city: string;
    country: string;
    createdAt: string;
    publishedAt: string;
    updatedAt: string;
  };
};
export type imageData = {
  id: number;
  attributes: {
    alternativeText: null;
    caption: null;
    createdAt: string;
    ext: string;
    formats: null;
    hash: string;
    height: 512;
    mime: string;
    name: string;
    previewUrl: null;
    provider: string;
    provider_metadata: null;
    size: number;
    updatedAt: string;
    url: string;
    width: number;
  };
};
export type tourData = {
  id: number;
  attributes: {
    categories: { data: tourCategoryData[] };
    isPopular: boolean;
    place: string;
    price: number;
    publishedAt: string;
    rating: number;
    title: string;
    updatedAt: string;
    createdAt: string;
    duration: string;
    images: { data: imageData[] };
    imagePrimary: { data: imageData };
  };
};
export type tourCategoryData = {
  id: number;
  attributes: {
    createdAt: string;
    image: { data: { id: number; attributes: imageData } };
    publishedAt: string;
    title: string;
    tours: { data: tourData[] };
    updatedAt: string;
  };
};
export type testimonyData = {
  id: number;
  attributes: {
    name: string;
    place: string;
    publishedAt: string;
    skill: string;
    updatedAt: string;
    createdAt: string;
    description: string;
    image: { data: imageData };
  };
};
export type blogCategoryDate = {
  id: number;
  attributes: {
    createdAt: string;
    publishedAt: string;
    title: string;
    updatedAt: string;
  };
};
