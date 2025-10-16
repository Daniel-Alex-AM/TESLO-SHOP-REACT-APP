import type { User } from "./user.interface";

export interface Product {
    id: string;
    title: string;
    price: number;
    description: string;
    slug: string;
    stock: number;
    sizes: Size[];
    gender: Gender;
    tags: string[];
    images: string[];
    user: User;
}

// export enum Size {
//     L = "L",
//     M = "M",
//     S = "S",
//     Xl = "XL",
//     Xs = "XS",
//     Xxl = "XXL",
// }

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

// export enum Gender {
//     Men = "men",
//     Unisex = "unisex",
//     Women = "women",
// }

export type Gender = 'kid' | 'men' | 'women' | 'unisex';