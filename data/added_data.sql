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

CREATE TABLE user_data
(
    name        varchar(40) NULL,
    base        varchar(40) NULL,
    target      varchar(40) NULL,
    airport3    varchar(40) NULL,
    airport4    varchar(40) NULL,
    airport5    varchar(40) NULL,
    airport6    varchar(40) NULL,
    airport7    varchar(40) NULL,
    airport8    varchar(40) NULL,
    airport9    varchar(40) NULL,
    airport10   varchar(40) NULL,
    airport11   varchar(40) NULL,
    airport12   varchar(40) NULL,
    airport13   varchar(40) NULL,
    airport14   varchar(40) NULL,
    airport15   varchar(40) NULL,
    airport16   varchar(40) NULL,
    airport17   varchar(40) NULL,
    airport18   varchar(40) NULL,
    airport19   varchar(40) NULL,
    airport20   varchar(40) NULL,
    airport21   varchar(40) NULL,
    airport22   varchar(40) NULL,
    airport23   varchar(40) NULL,
    airport24   varchar(40) NULL,
    airport25   varchar(40) NULL,
    airport26   varchar(40) NULL,
    airport27   varchar(40) NULL,
    airport28   varchar(40) NULL,
    airport29   varchar(40) NULL,
    airport30   varchar(40) NULL,
    airport31   varchar(40) NULL,
    airport32   varchar(40) NULL,
    airport33   varchar(40) NULL,
    airport34   varchar(40) NULL,
    airport35   varchar(40) NULL,
    airport36   varchar(40) NULL,
    airport37   varchar(40) NULL,
    airport38   varchar(40) NULL,
    airport39   varchar(40) NULL,
    airport40   varchar(40) NULL,
    primary key (name)
)
    DEFAULT CHARSET = latin1;