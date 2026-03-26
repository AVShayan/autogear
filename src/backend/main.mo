import Array "mo:core/Array";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Runtime "mo:core/Runtime";

actor {
  type Product = {
    id : Nat;
    name : Text;
    description : Text;
    price : Nat;
    category : Text;
    stock : Nat;
    imageUrl : Text;
  };

  type OrderItem = {
    productId : Nat;
    name : Text;
    price : Nat;
    quantity : Nat;
  };

  type Order = {
    id : Nat;
    items : [OrderItem];
    total : Nat;
    timestamp : Int;
  };

  module Product {
    public func compare(product1 : Product, product2 : Product) : Order.Order {
      Nat.compare(product1.id, product2.id);
    };
  };

  module OrderModule {
    public func compare(order1 : Order, order2 : Order) : Order.Order {
      Int.compare(order2.timestamp, order1.timestamp);
    };
  };

  let products = Map.empty<Nat, Product>();
  let orders = Map.empty<Nat, Order>();
  var nextProductId = 1;
  var nextOrderId = 1;

  let sampleProducts : [Product] = [
    {
      id = 0;
      name = "Car Cover";
      description = "Waterproof car cover for all weather protection.";
      price = 1500;
      category = "Exterior";
      stock = 50;
      imageUrl = "https://example.com/car-cover.jpg";
    },
    {
      id = 0;
      name = "Seat Covers";
      description = "Premium leather seat covers for comfort and style.";
      price = 3500;
      category = "Interior";
      stock = 30;
      imageUrl = "https://example.com/seat-covers.jpg";
    },
    {
      id = 0;
      name = "Steering Wheel Cover";
      description = "Anti-slip, soft steering wheel cover.";
      price = 400;
      category = "Interior";
      stock = 100;
      imageUrl = "https://example.com/steering-wheel-cover.jpg";
    },
    {
      id = 0;
      name = "Floor Mats";
      description = "Durable rubber floor mats for all seasons.";
      price = 1200;
      category = "Interior";
      stock = 70;
      imageUrl = "https://example.com/floor-mats.jpg";
    },
    {
      id = 0;
      name = "Car Freshener";
      description = "Long-lasting car air freshener.";
      price = 150;
      category = "Accessories";
      stock = 200;
      imageUrl = "https://example.com/car-freshener.jpg";
    },
    {
      id = 0;
      name = "Dash Cam";
      description = "HD dash camera with night vision.";
      price = 5000;
      category = "Electronics";
      stock = 20;
      imageUrl = "https://example.com/dash-cam.jpg";
    },
    {
      id = 0;
      name = "Phone Mount";
      description = "Universal phone mount for dashboard.";
      price = 350;
      category = "Accessories";
      stock = 80;
      imageUrl = "https://example.com/phone-mount.jpg";
    },
    {
      id = 0;
      name = "Tire Inflator";
      description = "Portable electric tire inflator.";
      price = 2500;
      category = "Tools";
      stock = 40;
      imageUrl = "https://example.com/tire-inflator.jpg";
    },
  ];

  func initializeProduct(product : Product, id : Nat) : Product {
    {
      id;
      name = product.name;
      description = product.description;
      price = product.price;
      category = product.category;
      stock = product.stock;
      imageUrl = product.imageUrl;
    };
  };

  public shared ({ caller }) func initializeStore() : async () {
    for (product in sampleProducts.values()) {
      let newProduct = initializeProduct(product, nextProductId);
      products.add(nextProductId, newProduct);
      nextProductId += 1;
    };
  };

  public query ({ caller }) func getProducts() : async [Product] {
    products.values().toArray().sort();
  };

  public query ({ caller }) func getProduct(id : Nat) : async ?Product {
    products.get(id);
  };

  public shared ({ caller }) func addProduct(name : Text, description : Text, price : Nat, category : Text, stock : Nat, imageUrl : Text) : async Product {
    let id = nextProductId;
    let newProduct = {
      id;
      name;
      description;
      price;
      category;
      stock;
      imageUrl;
    };
    products.add(id, newProduct);
    nextProductId += 1;
    newProduct;
  };

  public shared ({ caller }) func updateProduct(id : Nat, name : Text, description : Text, price : Nat, category : Text, stock : Nat, imageUrl : Text) : async ?Product {
    if (not products.containsKey(id)) { return null };
    let updatedProduct = {
      id;
      name;
      description;
      price;
      category;
      stock;
      imageUrl;
    };
    products.add(id, updatedProduct);
    ?updatedProduct;
  };

  public shared ({ caller }) func deleteProduct(id : Nat) : async Bool {
    if (not products.containsKey(id)) { Runtime.trap("Product not found") };
    products.remove(id);
    true;
  };

  public shared ({ caller }) func placeOrder(items : [OrderItem], total : Nat) : async Order {
    let order : Order = {
      id = nextOrderId;
      items;
      total;
      timestamp = Time.now();
    };
    orders.add(nextOrderId, order);
    nextOrderId += 1;
    order;
  };

  public query ({ caller }) func getOrders() : async [Order] {
    orders.values().toArray().sort();
  };
};
