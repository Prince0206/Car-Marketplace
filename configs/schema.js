import { integer, json, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const CarListing = pgTable("carListing", {
  id: serial("id").primaryKey(),
  listingTitle: varchar("listingTitle").notNull(),
  tagline: varchar("tagline"),
  originalPrice: varchar("originalPrice"),
  sellingPrice: varchar("sellingPrice"),
  category: varchar("category").notNull(),
  condition: varchar("condition").notNull(),
  transmission: varchar("transmission"),
  make: varchar("make").notNull(),
  model: varchar("model").notNull(),
  year: varchar("year").notNull(),
  driveType: varchar("driveType").notNull(),
  engineSize: varchar("engineSize"),
  fueltype: varchar("fueltype").notNull(),
  cylinder: varchar("cylinder"),
  mileage: varchar("mileage").notNull(),
  Door: varchar("Door").notNull(),
  VIN: varchar("VIN"),
  color: varchar("color").notNull(),
  offerType: varchar("offerType"),
  ListingDescription: varchar("ListingDescription").notNull(),
  features: json("features"),
  createdBy: varchar("createdBy"),
  userName: varchar("userName").notNull().default("PrinceWireko"),
  userImageUrl: varchar("userImageUrl").default(
    "https://my-portfolio-five-liard-53.vercel.app/images/Prince.JPG"
  ),
  postedOn: varchar("postedOn"),
});

export const CarImages = pgTable("carImages", {
  id: serial("id").primaryKey(),
  imageUrl: varchar("imageUrl").notNull(),
  carListingId: integer("carListingId")
    .notNull()
    .references(() => CarListing.id),
});
