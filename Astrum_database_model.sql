CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" varchar NOT NULL,
  "lastname" varchar NOT NULL,
  "email" varchar NOT NULL,
  "password" varchar NOT NULL,
  "image" varchar,
  "isActive" boolean DEFAULT true
);

CREATE TABLE "wallets" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "userId" int,
  "value" decimal
);

CREATE TABLE "transactions" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "userId" int NOT NULL,
  "walletId" int UNIQUE,
  "destinaton" int UNIQUE,
  "value" decimal NOT NULL
);

CREATE TABLE "userShares" (
  "userId" int PRIMARY KEY,
  "walletId" int,
  "shareName" varchar NOT NULL,
  "amount" int NOT NULL,
  "buyedBy" decimal NOT NULL,
  "totalValue" decimal NOT NULL
);

CREATE TABLE "shareTrades" (
  "id" SERIAL PRIMARY KEY,
  "walletId" int,
  "shareName" varchar NOT NULL,
  "buyedBy" decimal NOT NULL,
  "selledBy" decimal,
  "amount" int NOT NULL,
  "totalValue" decimal
);

ALTER TABLE "users" ADD FOREIGN KEY ("id") REFERENCES "wallets" ("userId");

ALTER TABLE "users" ADD FOREIGN KEY ("id") REFERENCES "transactions" ("userId");

ALTER TABLE "wallets" ADD FOREIGN KEY ("id") REFERENCES "transactions" ("walletId");

ALTER TABLE "wallets" ADD FOREIGN KEY ("id") REFERENCES "transactions" ("destinaton");

ALTER TABLE "users" ADD FOREIGN KEY ("id") REFERENCES "userShares" ("userId");

ALTER TABLE "wallets" ADD FOREIGN KEY ("id") REFERENCES "userShares" ("walletId");

ALTER TABLE "wallets" ADD FOREIGN KEY ("id") REFERENCES "shareTrades" ("walletId");
