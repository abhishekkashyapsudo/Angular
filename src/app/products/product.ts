export class Product {
    static fakePRoduct() {
        let product:Product = new Product();
        product.id = "L1000";
        product.name = "HP 15 15.6-inch HD Laptop"
        product.quantity = 5;
        return product;
    } 
    static fakePRoduct1() {
        let product:Product = new Product();
        product.id = "L1001";
        product.name = "HP 15 15.6-inch HD Laptop"
        product.quantity = 5;

        return product;
    }    

    public name: string;
    public id: string;
    public image: string;
    public price: number;
    public description: string[];
    public tags: string[];
    public category: string;
    public quantity: number;
    public brand: string;
    public replacement: string;
    public rating: number;

    constructor(){

    }

}
