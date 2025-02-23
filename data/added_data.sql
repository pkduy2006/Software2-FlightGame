--
-- Create the monument table
--
CREATE TABLE monument
(
    id                 int AUTO_INCREMENT,
    martyr_name        varchar(40) NULL,
    location           varchar(40) NULL,
    total_enemy_killed int NULL,
    distance_travelled int NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (location) REFERENCES airport (ident)
)
    DEFAULT CHARSET = latin1;

--
--Dumping data for table 'monument'
--
INSERT INTO monument(martyr_name, location, total_enemy_killed, distance_travelled)
VALUES  ('Linh', 'VVNB', 4000, 13420),
        ('An', 'ESSA', 5000, 12500),
        ('Tuyet', 'VVNB', 6000, 11400),
        ('Thw', 'YMML', 7000, 13980);

--
-- Create the type of fighter table
--
CREATE TABLE fighter_type
(
    fighter_level int NULL,
    fuel_consumption_per_km double NULL,
    fuel_consumption_per_rocket double NULL,
    rocket_damage double NULL,
    PRIMARY KEY (fighter_level)
)
    DEFAULT CHARSET = latin1;

--
-- Dumping data for table 'fighter_type'
--
INSERT INTO fighter_type(fighter_level, fuel_consumption_per_km, fuel_consumption_per_rocket, rocket_damage)
VALUES  (1, 0.440, 70, 200),
        (2, 0.425, 60, 300),
        (3, 0.410, 50, 400),
        (4, 0.385, 40, 500),
        (5, 0.336, 30, 600);

--
--Create the type (different from 3 types: small, medium, large airport and heliport) of airport table
--
CREATE TABLE airport_type
(
    id            int AUTO_INCREMENT,
    another_type  int NULL,
    type_level int NULL,
    garrison      int NULL,
    storage       int NULL,
    number  int NULL,
    PRIMARY KEY (id)
)
    DEFAULT CHARSET = latin1;

--
-- Dumping data for table 'airport_type'
--
INSERT INTO airport_type(another_type, type_level, garrison, storage, number)
VALUES (1, 1, 0, 0, 15),
       (2, 1, 1200, 550, 11),
       (2, 2,1600, 740, 11),
       (2, 3,2100, 1000, 11),
       (2, 4, 2700, 1300, 11),
       (2, 5, 3500, 1700, 11),
       (3, 1, 800, 0, 3),
       (3, 2, 900, 0, 3),
       (3, 3, 1000, 0, 3),
       (3, 4, 1300, 0, 3),
       (3, 5, 1600, 0, 3),
       (4, 1, 0, 500, 3),
       (4, 2, 0, 600, 3),
       (4, 3, 0, 700, 3),
       (4, 4, 0, 800, 3),
       (4, 5, 0, 900, 3);
