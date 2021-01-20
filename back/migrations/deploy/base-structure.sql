-- Deploy globeTrotter:base-structure to pg

BEGIN;

CREATE TABLE "travel" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "departure_date" TIMESTAMP,
    "return_date" TIMESTAMP
    CHECK (return_date > departure_date)
);

CREATE TABLE "task" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "deadline" TIMESTAMP,
    "status" BOOLEAN default false,
    "travel_id" INT NOT NULL references travel(id)
);

CREATE TABLE "traveler" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "role" TEXT default 'traveler',
    "gender" TEXT,
    "dob" DATE,
    "address" TEXT default 'unknown',
    "zipcode" TEXT,
    "city" TEXT,
    "phone" TEXT,
    "email" TEXT NOT NULL UNIQUE,
    "email_check" BOOLEAN default false,
    "password" TEXT NOT NULL,
    "passport_number" TEXT,
    "expiration_date" DATE,
    CHECK (phone  ~ '^(0|\+33|\+59[0-6])[1-9]([-. ]?[0-9]{2}){4}$')
    -- CHECK (email  ~ '^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$')
    -- Here we are checking the format of the phone number with a regex
);

ALTER TABLE "travel"
ADD "owner" INT NOT NULL REFERENCES traveler(id);

CREATE TABLE "activity" (
    "id" INT GENERATED ALWAYS AS IDENTITY  PRIMARY KEY,
    "name" TEXT NOT NULL,
    "topic" TEXT,
    "place" TEXT,
    "coordinate" POINT,
    "duration" INTERVAL,
    "description" TEXT,
    "date" TIMESTAMP,
    "unit_price" NUMERIC DEFAULT 0,
    "quantity" INT NOT NULL,
    "selected" BOOLEAN DEFAULT false,
    "travel_id" INT NOT NULL references travel(id),
    CHECK (unit_price >= 0)
);

CREATE TABLE "transport" (
    "id" INT GENERATED ALWAYS AS IDENTITY  PRIMARY KEY,
    "type" TEXT NOT NULL,
    "company" TEXT,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "departure_date" TIMESTAMP NOT NULL,
    "arrival_date" TIMESTAMP ,
    -- CONSTRAINT arrival > departure date
    "reservation_ref" TEXT,
    "unit_price" NUMERIC default 0,
    "quantity" INT NOT NULL,
    "memo" TEXT,
    "selected" BOOLEAN DEFAULT false,
    "travel_id" INT NOT NULL references travel(id),
    CHECK (arrival_date > departure_date),
    CHECK (unit_price >= 0)

);

CREATE TABLE "accommodation" (
    "id" INT GENERATED ALWAYS AS IDENTITY  PRIMARY KEY,
    "name" TEXT,
    "address" TEXT,
    "city" TEXT NOT NULL,
    "coordinate" POINT,
    "information" TEXT,
    "availability" INT,
    "arrival_date" TIMESTAMP,
    "departure_date" TIMESTAMP,
    "unit_price" NUMERIC default 0,
    "quantity" INT,
    "selected" BOOLEAN DEFAULT false,
    "travel_id" INT NOT NULL references travel(id),
    CHECK (unit_price >= 0),
    CHECK (departure_date > arrival_date)
);

CREATE TABLE "travel_has_traveler" (
    "travel_id" INT NOT NULL references travel(id) ON DELETE CASCADE,
    "traveler_id" INT NOT NULL references traveler(id) ON DELETE CASCADE,
    PRIMARY KEY ("travel_id","traveler_id")
);


COMMIT;