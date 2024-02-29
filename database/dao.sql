CREATE TABLE "MOVIE" (
  "id" INT,
  "title" VARCHAR(50),
  "genre" TEXT[], 
  "actors" TEXT[],
  "content" VARCHAR(255),
  "releaseDATE" INT,
  "averageRating" FLOAT,
  "sdRating" FLOAT,
  "ratingCount" INT,
  "tags" TEXT[],
  "poster" BYTEA
);