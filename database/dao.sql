CREATE TABLE "MOVIE" (
  "id" INT,
  "title" VARCHAR(50),
  "genre" TEXT[], 
  "directors" TEXT[],
  "actors" TEXT[],
  "content" VARCHAR(255),
  "releaseDate" INT,
  "averageRating" FLOAT,
  "sdRating" FLOAT,
  "ratingCount" INT,
  "tags" TEXT[],
  "poster" VARCHAR(225)
);

CREATE TABLE "DIRECTOR" (
  "id" INT,
  "name" VARCHAR(50),
  "movieIDs" INT[] 
);

CREATE TABLE "GENRE" (
  "name" VARCHAR(50),
  "averageRating" FLOAT,
  "sdRating" FLOAT,
  "reviewsCount" INT,
  "releasesCount" INT
);

CREATE TABLE "ACTOR" (
  "id" INT,
  "name" VARCHAR(50),
  "movieIDs" INT[]
);

CREATE TABLE "PERSONALITYTRAIT" (
  "trait" VARCHAR(50),
  "avgRatingsPerGenre" FLOAT[], 
  "avgRatingsPerMovie" FLOAT[],
);

CREATE TABLE "USER" (
  "id" VARCHAR(50),
  "averageRating" FLOAT
);

CREATE TABLE "RATING" (
  "id" INT,
  "movieID" INT,
  "userID" INT,
  "RATING" FLOAT
);