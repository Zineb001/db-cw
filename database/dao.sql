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
  "poster" VARCHAR(255)
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

CREATE TABLE "USER" (
  "id" VARCHAR(50),
  "averageRating" FLOAT
);

CREATE TABLE "PERSONALITY_MOVIE"(
  "movie_id" VARCHAR(50),
  "movie_title" VARCHAR(50),
  "avg_openness" FLOAT,
  "avg_agreeableness" FLOAT,
  "avg_emotional_stability" FLOAT,
  "avg_conscientiousness" FLOAT,
  "avg_extraversion" FLOAT,
);

CREATE TABLE "PERSONALITY_GENRE"(
  "genre" VARCHAR(50),
  "avg_openness" FLOAT,
  "avg_agreeableness" FLOAT,
  "avg_emotional_stability" FLOAT,
  "avg_conscientiousness" FLOAT,
  "avg_extraversion" FLOAT,
);

CREATE TABLE "RATING" (
  "id" INT,
  "movieID" INT,
  "userID" INT,
  "rating" FLOAT
);