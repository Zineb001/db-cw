create table tmp_genre(movie_id int, genre varchar(255));
drop function process_cast;
CREATE OR REPLACE FUNCTION public.process_genres(
	)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
    rv RECORD;
	counter int = 1;
	temp_array varchar[];
BEGIN
    FOR rv IN SELECT movie_id,genres FROM mldb_movies LOOP
		temp_array := STRING_TO_ARRAY(rv.genres, '|');
		WHILE counter <= array_length(temp_array, 1) LOOP

			insert into tmp_genre(movie_id, genre) values (rv.movie_id,temp_array[counter]);
			counter := counter + 1;
		END LOOP;
		counter :=  1;
    END LOOP;
END 
$BODY$;

ALTER FUNCTION public.process_genres()
    OWNER TO postgres;
	
truncate tmp_genre;
select process_genres();

select distinct genre from tmp_genre;