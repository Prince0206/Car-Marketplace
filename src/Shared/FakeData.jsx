import { faker } from "@faker-js/faker";

function createRandomeCarList() {
  return {
    name: faker.vehicle.vehicle(),
    fuelType: faker.vehicle.fuel(),
    model: faker.vehicle.model(),
    type: faker.vehicle.type(),
    image: "https://kolesa-uploads.ru/-/5650a833-1533-48df-855b-ef0b1622e5ad/audi-q7-rest-front2-mini.jpg",
    miles: 1000,
    gearType: "Automatic",
    price: faker.finance.amount({ min: 4000, max: 20000 }),
  };
}

const carList = faker.helpers.multiple(createRandomeCarList, {
  count: 7,
});

export default{
    carList
}
