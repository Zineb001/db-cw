drop table MOVIE_DIRECTOR;
drop table MOVIE_ACTOR;
drop table MOVIE_GENRE;
drop table PERSONALITY_MOVIE;
drop table DIRECTOR;
drop table POSTER;
drop table TAGS;
drop table RATING;
drop table MOVIE;
drop table ACTOR;
drop table PERSONALITY;
drop table DOMINANT_TRAITS;

CREATE TABLE MOVIE (
  ID INT,
  TITLE VARCHAR(255),
  PRIMARY KEY (ID)
);

CREATE TABLE ACTOR (
  ID INT,
  name VARCHAR(255),
  PRIMARY KEY (ID)
);

CREATE TABLE DIRECTOR (
  ID INT,
  NAME VARCHAR(255),
  PRIMARY KEY (ID)
);

CREATE TABLE PERSONALITY (
  USER_ID VARCHAR(255),
  OPENNESS FLOAT,
  AGREEABLENESS FLOAT,
  EMOTIONAL_STABILITY FLOAT,
  CONSCIENTIOUSNESS FLOAT,
  EXTRAVERSION FLOAT,
  PRIMARY KEY (USER_ID)
);

CREATE TABLE POSTER (
  MOVIE_ID INT,
  PATH varchar(255),
  CONSTRAINT FK_POSTER_MOVIE_ID
    FOREIGN KEY (MOVIE_ID)
      REFERENCES MOVIE(ID)
);

CREATE TABLE TAGS (
  ID INT,
  MOVIE_ID INT,
  USER_ID INT,
  TAG VARCHAR(255),
  PRIMARY KEY (ID),
  CONSTRAINT FK_TAGS_MOVIE_ID
    FOREIGN KEY (MOVIE_ID)
      REFERENCES MOVIE(ID)
);

CREATE TABLE RATING (
  ID INT,
  MOVIE_ID INT,
  USER_ID INT,
  RATING FLOAT,
  PRIMARY KEY (ID),
  CONSTRAINT FK_RATING_MOVIE_ID
    FOREIGN KEY (MOVIE_ID)
      REFERENCES MOVIE(ID)
);

CREATE TABLE MOVIE_ACTOR (
  MOVIE_ID INT,
  ACTOR_ID INT,
  CONSTRAINT FK_MOVIE_ACTOR_MOVIE_ID
    FOREIGN KEY (MOVIE_ID)
      REFERENCES MOVIE(ID),
  CONSTRAINT FK_MOVIE_ACTOR_ACTOR_ID
    FOREIGN KEY (ACTOR_ID)
      REFERENCES ACTOR(ID)
);

CREATE TABLE MOVIE_DIRECTOR (
  MOVIE_ID INT,
  DIRECTOR_ID INT,
  CONSTRAINT FK_MOVIE_DIRECTOR_DIRECTOR_ID
    FOREIGN KEY (DIRECTOR_ID)
      REFERENCES DIRECTOR(ID),
  CONSTRAINT FK_MOVIE_DIRECTOR_MOVIE_ID
    FOREIGN KEY (MOVIE_ID)
      REFERENCES MOVIE(ID)
);

CREATE TABLE MOVIE_GENRE (
  MOVIE_ID INT,
  GENRE VARCHAR(255),
  CONSTRAINT FK_MOVIE_GENRE_MOVIE_ID
    FOREIGN KEY (MOVIE_ID)
      REFERENCES MOVIE(ID)
);

CREATE TABLE PERSONALITY_MOVIE (
  USER_ID VARCHAR(255),
  MOVIE_ID INT,
  RATING FLOAT,
  CONSTRAINT FK_PERSONALITY_MOVIE_USER_ID
    FOREIGN KEY (USER_ID)
      REFERENCES PERSONALITY(USER_ID),
  CONSTRAINT FK_PERSONALITY_MOVIE_MOVIE_ID
    FOREIGN KEY (MOVIE_ID)
      REFERENCES MOVIE(ID)
);

CREATE TABLE DOMINANT_TRAITS (
  ID SERIAL PRIMARY KEY,
  USER_ID VARCHAR(255),
  PERSONALITY_TRAIT VARCHAR(255)
);


-- add columns, and sequences
alter table movie add column release_year int;
alter table movie add column content text;
CREATE SEQUENCE s_tags;
CREATE SEQUENCE s_ratings;


-- load data from datasets 
-- movie
insert into movie(id, title, release_year)
select 
movie_id,
title,
case when title like '%)' 
then substring(title,length(title)-4,4)::int 
else 0
end ry
from mldb_movies
;

--update movie set content = (select overview from tmdb_movies tm where tm.id = movie.id )
--where exists (select ' ' from tmdb_movies tm where tm.id = movie.id);

UPDATE movie 
SET content = (
    SELECT tm.overview 
    FROM tmdb_movies tm 
    JOIN mldb_links ml ON tm.id = ml.tmdbid 
    WHERE ml.movie_id = movie.id
)
WHERE EXISTS (
    SELECT 1
    FROM tmdb_movies tm 
    JOIN mldb_links ml ON tm.id = ml.tmdbid 
    WHERE ml.movie_id = movie.id
);

--check
select * from movie where id = 18;

-- director
insert into DIRECTOR(id,name)
select distinct id,name from tmp_crew
where job = 'Director';

insert into MOVIE_DIRECTOR(movie_id, director_id)
select ml.movie_id, tc.id 
from tmp_crew tc
JOIN mldb_links ml ON tc.movie_id = ml.tmdbid 
JOIN movie m ON ml.movie_id = m.id
WHERE tc.job = 'Director'
;

--check
select * from mldb_movies where movie_id = 6250;
select * from mldb_links where movie_id = 6250;
select * from tmp_crew where job = 'Director' and movie_id = 6171;
select * from movie_director where movie_id = 6250;

-- actor
insert into actor(id,name)
select distinct id,name from tmp_cast;

insert into MOVIE_ACTOR(movie_id, actor_id)
select ml.movie_id,tc.id 
from tmp_cast tc
JOIN mldb_links ml ON tc.movie_id = ml.tmdbid
JOIN movie m ON ml.movie_id = m.id
group by 1,2
;

--check with same ids as movie_director
select * from tmp_cast where movie_id = 6171;
select * from movie_actor where movie_id = 6250;

-- poster
insert into POSTER(movie_id, path)
select ml.movie_id, p.poster 
FROM IMDB_POSTERS P 
JOIN mldb_links ml ON p.imdbid = ml.imdbId 
JOIN movie m ON ml.movie_id = m.id
;

--check
select * from poster;
select * from movie where id= 53519;

-- tags
insert into tags (id, movie_id, user_id, tag)
select 
nextval('s_tags') id,
movie_id,
user_id, 
tag
from mldb_tags;

-- rating
insert into RATING (id, movie_id, user_id, RATING)
select 
nextval('s_ratings') id,
movie_id,
user_id, 
RATING
from mldb_ratings;

-- genre
insert into movie_genre(movie_id, genre)
select movie_id,genre from tmp_genre;

-- check
select m.* , mg.genre
from movie m
join movie_genre mg on mg.movie_id = m.id;

-- personality 
insert into personality(user_id, openness, agreeableness, emotional_stability, conscientiousness, extraversion)
select 
userid,
openness,
agreeableness,
emotional_stability,
conscientiousness,
extraversion
from tmp_personality
;

INSERT INTO PERSONALITY_MOVIE(user_id, movie_id, rating)
SELECT pr.userid, pr.movie_id, pr.rating
FROM mldb_personality_ratings pr
WHERE EXISTS (
    SELECT 1
    FROM movie m
    WHERE m.id = pr.movie_id
);

select * from VIEW_MOVIE;

INSERT INTO DOMINANT_TRAITS(user_id, personality_trait)
WITH array_table AS (
  SELECT
    user_id,
    ARRAY[
      CASE WHEN openness = greatest_value THEN 'openness' ELSE NULL END,
      CASE WHEN agreeableness = greatest_value THEN 'agreeableness' ELSE NULL END,
      CASE WHEN emotional_stability = greatest_value THEN 'emotional_stability' ELSE NULL END,
      CASE WHEN conscientiousness = greatest_value THEN 'conscientiousness' ELSE NULL END,
      CASE WHEN extraversion = greatest_value THEN 'extraversion' ELSE NULL END
    ] AS personality_traits
  FROM (
    SELECT
      user_id,
      openness,
      agreeableness,
      emotional_stability,
      conscientiousness,
      extraversion,
      GREATEST(openness, agreeableness, emotional_stability, conscientiousness, extraversion) AS greatest_value
    FROM personality
  ) sub
)
SELECT
  at.user_id,
  ut.trait
FROM array_table at
CROSS JOIN LATERAL unnest(at.personality_traits) AS ut(trait)
WHERE ut.trait IS NOT NULL;

--check 

select * from dominant_traits;
select * from personality;
select * from personality_movie where user_id = '0066fac81b62656f032c085d96e378f4';

SELECT avg(pm.rating)
FROM personality_movie pm
JOIN dominant_traits dt ON pm.user_id = dt.user_id
WHERE dt.personality_trait = 'openness'
AND pm.movie_id = 1;

-- indexes 
create unique index idx_movie0 on movie(id);
create index idx_movie_genre0 on MOVIE_GENRE(movie_id);
create unique index idx_director0 on director(id);
create index idx_movie_director0 on movie_director(movie_id);
create index idx_movie_director1 on movie_director(director_id);
create unique index idx_actor0 on actor(id);
create index idx_movie_actor0 on movie_actor(movie_id);
create index idx_movie_actor1 on movie_actor(actor_id);
create index idx_rating0 on rating(movie_id);
create index idx_tags0 on tags(movie_id);
create index idx_tmdb_movies0 on tmdb_movies(id);
CREATE INDEX idx_personality_movie_user_id0 ON personality_movie(user_id);
CREATE INDEX idx_personality_movie_movie_id0 ON personality_movie(movie_id);
CREATE INDEX idx_dominant_traits_user_id0 ON dominant_traits(user_id);



-- views
drop view if exists VIEW_MOVIE;
CREATE view VIEW_MOVIE 
(
	id,
	title,
	genre,
	directors,
	actors,
	content,
	releaseDate,
	averageRating,
	sdRating,
	ratingCount,
	tags,
	poster
) as 
select 
	m.id,
	m.title,
	ARRAY(select genre from MOVIE_GENRE mg where mg.movie_id = m.id) genre,
	ARRAY(select d.name from MOVIE_DIRECTOR md,DIRECTOR d where md.movie_id = m.id and d.id = md.director_id) directors,
	ARRAY(select ac.name from MOVIE_ACTOR mac,actor ac where mac.movie_id = m.id and ac.id = mac.actor_id) actors,
	m.content,
	m.release_year,
	(select avg(RATING) from rating r where r.movie_id = m.id)::decimal(5,2) averageRating,
	(select STDDEV(RATING) from rating r where r.movie_id = m.id)::decimal(5,2) sdRating,
	(select count(*) from rating r where r.movie_id = m.id) ratingCount,
	ARRAY(select tag from tags where tags.movie_id = m.id) tags,
	(select p.path from poster p where p.movie_id = m.id LIMIT 1) poster
from movie m
where exists (select ' ' from tmdb_movies tm
			  JOIN mldb_links ml ON tm.id = ml.tmdbid
			  WHERE ml.movie_id = m.id);
			  

drop view if exists VIEW_DIRECTOR;
CREATE VIEW VIEW_DIRECTOR (
	id,
	name,
	movieIDs
)as 
select 
	id,
	name,
	ARRAY(select movie_id from movie_director md where md.director_id = d.id) movieIDs
from director d;

drop view if exists VIEW_ACTOR;
CREATE VIEW VIEW_ACTOR (
	id,
	name,
	movieIDs
)as 
select 
	id,
	name,
	ARRAY(select movie_id from movie_actor mac where mac.actor_id = d.id) movieIDs
from actor d;

drop view if exists VIEW_GENRE;
CREATE VIEW  VIEW_GENRE (
	name,
	averageRating,
	sdRating,
	reviewsCount,
	releasesCount
) as 
select 
	mg.genre,
	avg(r.RATING)::decimal(5,2) averageRating,
	STDDEV(r.RATING)::decimal(5,2) sdRating,
	count(*) reviewsCount,
	count(distinct r.movie_id) releasesCount
from movie_genre mg
join rating r on r.movie_id = mg.movie_id
group by mg.genre
;


drop view if exists VIEW_USER_RATING;
CREATE view VIEW_USER_RATING (
	id,
	averageRating
) as 
select 
	r.user_id,
	avg(r.RATING)::decimal(5,2) averageRating
from rating r
group by r.user_id;

drop view if exists VIEW_MOVIE_RATING;
CREATE view VIEW_MOVIE_RATING (
	id,
	movie_id,
	user_id,
	rating
) as 
select
	id,
	movie_id,
	user_id,
	rating
from rating;

drop view if exists VIEW_PERSONALITY_MOVIE;
create view VIEW_PERSONALITY_MOVIE(
  movie_id,
  movie_title,
  avg_openness, 
  avg_agreeableness,
  avg_emotional_stability,
  avg_conscientiousness,
  avg_extraversion
) AS
SELECT
  m.id AS movie_id,
  m.title,
  AVG(CASE 
        WHEN dt.personality_trait = 'openness' THEN pm.rating 
        ELSE NULL 
      END):: decimal (5, 2) AS avg_openness,
  AVG(CASE 
        WHEN dt.personality_trait = 'agreeableness' THEN pm.rating 
        ELSE NULL 
      END):: decimal (5, 2) AS avg_agreeableness,
  AVG(CASE 
        WHEN dt.personality_trait = 'emotional_stability' THEN pm.rating 
        ELSE NULL 
      END):: decimal (5, 2) AS avg_emotional_stability,
  AVG(CASE 
        WHEN dt.personality_trait = 'conscientiousness' THEN pm.rating 
        ELSE NULL 
      END):: decimal (5, 2) AS avg_conscientiousness,
  AVG(CASE 
        WHEN dt.personality_trait = 'extraversion' THEN pm.rating 
        ELSE NULL 
      END):: decimal (5, 2) AS avg_extraversion
FROM movie m
LEFT JOIN personality_movie pm ON pm.movie_id = m.id
LEFT JOIN dominant_traits dt ON pm.user_id = dt.user_id
GROUP BY m.id, m.title;

drop view if exists VIEW_PERSONALITY_GENRE;
create view VIEW_PERSONALITY_GENRE(
  genre,
  avg_openness, 
  avg_agreeableness,
  avg_emotional_stability,
  avg_conscientiousness,
  avg_extraversion
) AS
SELECT
  mg.genre,
  AVG(CASE 
        WHEN dt.personality_trait = 'openness' THEN pm.rating 
        ELSE NULL 
      END):: decimal (5, 2) AS avg_openness,
  AVG(CASE 
        WHEN dt.personality_trait = 'agreeableness' THEN pm.rating 
        ELSE NULL 
      END):: decimal (5, 2) AS avg_agreeableness,
  AVG(CASE 
        WHEN dt.personality_trait = 'emotional_stability' THEN pm.rating 
        ELSE NULL 
      END):: decimal (5, 2) AS avg_emotional_stability,
  AVG(CASE 
        WHEN dt.personality_trait = 'conscientiousness' THEN pm.rating 
        ELSE NULL 
      END):: decimal (5, 2) AS avg_conscientiousness,
  AVG(CASE 
        WHEN dt.personality_trait = 'extraversion' THEN pm.rating 
        ELSE NULL 
      END):: decimal (5, 2) AS avg_extraversion
FROM 
  movie_genre mg
JOIN 
  personality_movie pm ON pm.movie_id = mg.movie_id
JOIN 
  movie m ON mg.movie_id = m.id
LEFT JOIN 
  dominant_traits dt ON pm.user_id = dt.user_id
GROUP BY mg.genre;


-- tests
select * from VIEW_PERSONALITY_MOVIE where movie_id = 948;

SELECT avg(pm.rating)
FROM personality_movie pm
JOIN dominant_traits dt ON pm.user_id = dt.user_id
WHERE dt.personality_trait = 'extraversion'
AND pm.movie_id = 948;

--select * from VIEW_MOVIE where 'Comedy' = ANY (genre) ;
select * from VIEW_MOVIE where id = 1;
select * from mldb_links;
select title from movie where id = 53519;
select * from imdb_posters where imdbid = '114709'; 