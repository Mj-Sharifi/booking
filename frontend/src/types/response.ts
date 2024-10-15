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
export type imageAttributes = {
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
}
type imageData = {
  id: number;
  attributes: imageAttributes
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
    duration: number;
    free_cancelation:boolean
    images: { data: imageData[] };
    imagePrimary: { data: imageData };
  };
};
export type tourCategoryData = {
  id: number;
  attributes: {
    createdAt: string;
    image: { data: imageData };
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
export type blogCategoryData = {
  id: number;
  attributes: {
    createdAt: string;
    publishedAt: string;
    title: string;
    updatedAt: string;
  };
};
export type blogData = {
  id: number;
  attributes: {
    blog_categories: { data: blogCategoryData[] };
    createdAt: string;
    image: { data: imageData };
    publishedAt: string;
    release_date: string;
    title: string;
    updatedAt: string;
  };
};

export type registerResponce = {
  "jwt": string,
  "user": {
    "id": number,
    "username": string,
    "email": string,
    "provider": string,
    "confirmed": boolean,
    "blocked": boolean,
    "createdAt": string,
    "updatedAt": string
  }
}
export type userInfo = {
  jwt: string;
  user: {
    id:number
    blocked:boolean
    confirmed:boolean
    username: string;
    firstname: string;
    lastname: string;
    address: string;
    city: string
    country: string
    phone: string
    email: string
    birthday: string
    gender: boolean
    about: string
    avatar: imageAttributes & {id:number}
    provider: string
    createdAt:string
    updatedAt: string
  }
}