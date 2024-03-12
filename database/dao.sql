CREATE TABLE "VIEW_MOVIE" (
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

CREATE TABLE "VIEW_DIRECTOR" (
  "id" INT,
  "name" VARCHAR(50),
  "movieids" INT[] 
);

CREATE TABLE "VIEW_GENRE" (
  "name" VARCHAR(50),
  "averagerating" FLOAT,
  "sdrating" FLOAT,
  "reviewscount" INT,
  "releasesCount" INT
);

CREATE TABLE "VIEW_ACTOR" (
  "id" INT,
  "name" VARCHAR(50),
  "movieIDs" INT[]
);

CREATE TABLE "VIEW_USER_RATING" (
  "id" VARCHAR(50),
  "averageRating" FLOAT
);

CREATE TABLE "VIEW_PERSONALITY_MOVIE"(
  "movie_id" VARCHAR(50),
  "movie_title" VARCHAR(50),
  "avg_openness" FLOAT,
  "avg_agreeableness" FLOAT,
  "avg_emotional_stability" FLOAT,
  "avg_conscientiousness" FLOAT,
  "avg_extraversion" FLOAT,
);

CREATE TABLE "VIEW_PERSONALITY_GENRE"(
  "genre" VARCHAR(50),
  "avg_openness" FLOAT,
  "avg_agreeableness" FLOAT,
  "avg_emotional_stability" FLOAT,
  "avg_conscientiousness" FLOAT,
  "avg_extraversion" FLOAT,
);

CREATE TABLE "VIEW_MOVIE_RATING" (
  "id" INT,
  "movie_id" INT,
  "user_id" VARCHAR(50),
  "rating" FLOAT
);