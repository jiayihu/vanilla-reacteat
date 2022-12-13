const faker = require('faker');
const fs = require('fs');

function createMenuItem() {
  return {
    id: faker.random.uuid(),
    name: faker.commerce.productName(),
    weight: faker.random.number(1000),
    type: faker.random.arrayElement(['food', 'drink']),
    kcal: faker.random.number(1000),
    price: faker.random.number({ min: 0, max: 100, precision: 0.01 }),
  };
}

function createRestaurant() {
  const categories = ['burgers', 'salad', 'pizza', 'pasta', 'kebab', 'sushi', 'chinese'];
  const menuLength = faker.random.number({ min: 5, max: 15 });

  return {
    id: faker.random.uuid(),
    name: faker.company.companyName(),
    cover: 'https://source.unsplash.com/collection/9632103/960x540',
    address: faker.address.streetAddress(true),
    categories: faker.helpers
      .shuffle([...categories])
      .slice(0, faker.random.number({ min: 1, max: 3 })),
    reviews: {
      average: faker.random.number({ min: 1, max: 5, precision: 0.1 }),
      count: faker.random.number({ min: 1, max: 500 }),
    },
    menu: {
      items: new Array(menuLength).fill(null).map(() => createMenuItem()),
    },
    deliveryCharge: faker.random.number({ min: 0.5, max: 5, precision: 0.1 }),
  };
}

function createOrder(restaurants) {
  const restaurant = faker.random.arrayElement(restaurants);

  return {
    id: faker.random.uuid(),
    date: faker.date.past(),
    restaurantId: restaurant.id,
    deliveryCharge: restaurant.deliveryCharge,
    address: faker.address.streetAddress(true),
    items: faker.helpers.shuffle([...restaurant.menu.items]).slice(0, 3),
  };
}

const restaurants = new Array(30).fill(null).map(() => createRestaurant());
const popular = faker.helpers.shuffle([...restaurants]).slice(0, 5);
const orders = new Array(5).fill(null).map(() => createOrder(restaurants));

const db = {
  restaurants,
  popular,
  orders,
};

fs.writeFile(__dirname + '/db.json', JSON.stringify(db, null, 2), 'utf-8', () => {
  console.log('db.json saved');
});
