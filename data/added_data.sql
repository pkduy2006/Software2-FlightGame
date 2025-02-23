CREATE TABLE types
(
    id            int AUTO_INCREMENT,
    garrison      int NULL,
    storage       int NULL,
    total         int NULL,
    PRIMARY KEY (id)
)
    DEFAULT CHARSET = latin1;

INSERT INTO types(garrison, storage, total)
VALUES (0, 0, 5),
       (1200, 550, 3),
       (1600, 740, 3),
       (2100, 1000, 3),
       (2700, 1300, 3),
       (3500, 1700, 3),
       (800, 0, 2),
       (900, 0, 2),
       (1000, 0, 2),
       (1300, 0, 2),
       (1600, 0, 2),
       (0, 500, 2),
       (0, 600, 2),
       (0, 700, 2),
       (0, 800, 2),
       (0, 900, 2);