drop table if exists mldb_movies;
create table mldb_movies
(
	movie_id int,
	title varchar(255),
	genres varchar(255)
);
create unique index idx_mldb_movies0 on mldb_movies(movie_id);

drop table if exists mldb_ratings;
create table mldb_ratings
(
	user_id int,
	movie_id int,
	rating decimal(3,2),
	timestamp bigint
);
create unique index idx_mldb_ratings0 on mldb_ratings(user_id,movie_id);

drop table if exists mldb_tags;
create table mldb_tags
(
	user_id int,
	movie_id int,
	tag varchar(255),
	timestamp bigint
);
create index idx_mldb_tags0 on mldb_tags(user_id,movie_id);

drop table if exists mldb_links cascade;
create table mldb_links
(
	movie_id int,
	imdbId int,
	tmdbId int
);
create unique index idx_mldb_links0 on mldb_links(movie_id);

drop table if exists tmdb_movies;
create table tmdb_movies 
(
	budget int,
	genres varchar(255),
	homepage varchar(255),
	id int,
	keywords text,
	original_language varchar(20),
	original_title varchar(255),
	overview text,
	popularity float,
	production_companies text,
	production_countries text,
	release_date varchar(255),
	revenue bigint,
	runtime numeric,
	spoken_languages text,
	status varchar(255),
	tagline varchar(255),
	title varchar(255),
	vote_average decimal(5,2),
	vote_count int
);

-- check 
SELECT count(*)*100/4803 p FROM mldb_movies m0, mldb_links l, tmdb_movies md
where m0.movie_id = l.movie_id and md.id = l.tmdbid;
--check2
SELECT 
    mlb.movie_id,
    mlb.title AS mldb_title,
    tmb.original_title AS tmdb_title
FROM 
    mldb_movies mlb
JOIN 
    mldb_links mlink ON mlb.movie_id = mlink.movie_id
JOIN 
    tmdb_movies tmb ON mlink.tmdbid = tmb.id

--end checks


drop table if exists tmdb_credits;
create table tmdb_credits
(
	movie_id int,
	title varchar(255),
	cast_ json,
	crew json
);

drop table if exists imdb_posters;
create table imdb_posters
(
	imdbid int,
	imdb_link varchar(255),
	title varchar(255),
	imdb_score float,
	genres varchar(255),
	poster text
);
 
drop table if exists mldb_personality;
create table mldb_personality
(
	userid varchar(255),
	openness float,
	agreeableness float,
	emotional_stability float,
	conscientiousness float,
	extraversion float,
	assigned_metric varchar(255),
	assigned_condition varchar(255),
	movie_1 int,
	predicted_rating_1 float,
	movie_2 int,
	predicted_rating_2 float,
	movie_3 int,
	predicted_rating_3 float,
	movie_4 int,
	predicted_rating_4 float,
	movie_5 int,
	predicted_rating_5 float,
	movie_6 int,
	predicted_rating_6 float,
	movie_7 int,
	predicted_rating_7 float,
	movie_8 int,
	predicted_rating_8 float,
	movie_9 int,
	predicted_rating_9 float,
	movie_10 int,
	predicted_rating_10 float,
	movie_11 int,
	predicted_rating_11 float,
	movie_12 int,
	predicted_rating_12 float,
	is_personalized int,
	enjoy_watching int
);


drop table if exists mldb_personality_ratings;
create table mldb_personality_ratings
(
	userid varchar(255),
	movie_id int,
	rating float,
	tstamp varchar(255)
);

select * from mldb_personality_ratings;


-- psql tool
-- \COPY mldb_movies FROM '/Users/zineb/Downloads/ml-latest-small/movies.csv' DELIMITER ',' CSV HEADER;
-- \COPY mldb_ratings FROM '/Users/zineb/Downloads/ml-latest-small/ratings.csv' DELIMITER ',' CSV HEADER;
-- \COPY mldb_tags FROM '/Users/zineb/Downloads/ml-latest-small/tags.csv' DELIMITER ',' CSV HEADER;
-- \COPY mldb_links FROM '/Users/zineb/Downloads/ml-latest-small/links.csv' DELIMITER ',' CSV HEADER;
-- \COPY tmdb_movies FROM '/Users/zineb/Downloads/tmdb/tmdb_5000_movies.csv' DELIMITER ',' CSV HEADER;
-- \COPY tmdb_credits FROM '/Users/zineb/Downloads/tmdb/tmdb_5000_credits.csv' DELIMITER ',' CSV HEADER;
-- \COPY imdb_posters FROM '/Users/zineb/Downloads/MovieGenre_cleaned.csv' DELIMITER ',' CSV HEADER;
-- \COPY mldb_personality FROM '/Users/zineb/Downloads/personality-isf2018/personality-data.csv' DELIMITER ',' CSV HEADER;
-- \COPY mldb_personality_ratings FROM '/Users/zineb/Downloads/personality-isf2018/ratings.csv' DELIMITER ',' CSV HEADER;


update tmdb_credits set cast_ = replace(cast_::text,'"order"','"order_"')::json;

drop table if exists tmp_cast;
create table tmp_cast
(
	movie_id integer,
	cast_id integer,
	character text,
	credit_id varchar(255),
	gender integer,
	id integer,
	name varchar(255),
	order_ integer
);

INSERT INTO tmp_cast (movie_id,cast_id,character,credit_id,gender,id,name,order_)
SELECT o.movie_id, p.cast_id,p.character,p.credit_id,p.gender,p.id,p.name,p.order_
FROM tmdb_credits o
CROSS JOIN LATERAL json_populate_recordset(NULL::tmp_cast, o.cast_) AS p;

select crew from tmdb_credits

drop table if exists tmp_crew;
create table tmp_crew 
(
	movie_id int,
	credit_id varchar(255),
	department varchar(255),
	gender int,
	id int,
	job varchar(255),
	name varchar(255)
);


INSERT INTO tmp_crew (movie_id,credit_id,department,gender,id,job,name)
SELECT o.movie_id, p.credit_id,p.department,p.gender,p.id,p.job,p.name
FROM tmdb_credits o
CROSS JOIN LATERAL json_populate_recordset(NULL::tmp_crew, o.crew) AS p;

drop table if exists tmp_personality;
CREATE TABLE tmp_personality AS
SELECT DISTINCT ON (userid) *
FROM mldb_personality;


select * from tmp_crew
where job = 'Director'
and id = 53068
;

select * from tmdb_movies;
select * from mldb_movies;

select * from mldb_tags;

select * from imdb_posters;

--ALTER TABLE movie_genre
--ADD CONSTRAINT check_genre
--CHECK (genre IN ("IMAX","Crime","Animation","Documentary","Romance","Mystery","Children","Musical","Film-Noir","Fantasy","Horror","Drama","Action","(no genres listed)","Thriller","Western","Sci-Fi","Comedy","Adventure","War"));