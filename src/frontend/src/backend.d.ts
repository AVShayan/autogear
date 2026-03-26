import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Order {
    id: bigint;
    total: bigint;
    timestamp: bigint;
    items: Array<OrderItem>;
}
export interface Product {
    id: bigint;
    name: string;
    description: string;
    stock: bigint;
    imageUrl: string;
    category: string;
    price: bigint;
}
export interface OrderItem {
    name: string;
    productId: bigint;
    quantity: bigint;
    price: bigint;
}
export interface backendInterface {
    addProduct(name: string, description: string, price: bigint, category: string, stock: bigint, imageUrl: string): Promise<Product>;
    deleteProduct(id: bigint): Promise<boolean>;
    getOrders(): Promise<Array<Order>>;
    getProduct(id: bigint): Promise<Product | null>;
    getProducts(): Promise<Array<Product>>;
    initializeStore(): Promise<void>;
    placeOrder(items: Array<OrderItem>, total: bigint): Promise<Order>;
    updateProduct(id: bigint, name: string, description: string, price: bigint, category: string, stock: bigint, imageUrl: string): Promise<Product | null>;
}
