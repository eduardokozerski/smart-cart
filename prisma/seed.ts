import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: "Sports Shoes",
        price: 600,
        image: "https://res.cloudinary.com/dmrtvpofb/image/upload/v1739322012/shoes_gjjvet.jpg",
        description: "Comfortable sneakers for sports activities."
      },
      {
        name: "Casual Black T-shirt",
        price: 80,
        image: "https://res.cloudinary.com/dmrtvpofb/image/upload/v1739322011/t-shirt_fgoqm0.jpg",
        description: "High quality cotton casual black t-shirt."
      },
      {
        name: "Watch",
        price: 400,
        image: "https://res.cloudinary.com/dmrtvpofb/image/upload/v1739322013/watch_e5w9f6.png",
        description: "Modern swiss luxury watch."
      },
      {
        name: "Sunglasses",
        price: 250,
        image: "https://res.cloudinary.com/dmrtvpofb/image/upload/v1739322011/sunglasses_cw8nri.jpg",
        description: "Stylish and functional sunglasses."
      },
      {
        name: "Wireless Earbuds",
        price: 300,
        image: "https://res.cloudinary.com/dmrtvpofb/image/upload/v1739322010/earbuds_vow9hb.jpg",
        description: "High quality waterproof wireless earbuds."
      },
      {
        name: "Backpack",
        price: 150,
        image: "https://res.cloudinary.com/dmrtvpofb/image/upload/v1739322010/bag_ldg6ye.jpg",
        description: "Durable backpack for everyday use."
      }
    ]
  });

  console.log("Products added to the bank!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
});