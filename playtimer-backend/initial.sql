CREATE TABLE "user"
(
    "id"                serial       NOT NULL,
    "login"             varchar(20)  NOT NULL UNIQUE,
    "password"          varchar(64)  NOT NULL,
    "registration_date" DATE         NOT NULL,
    "profile_pic"       varchar(255) DEFAULT 'https://www.seekpng.com/png/full/514-5147412_default-avatar-icon.png',
    "email"             varchar(255) NOT NULL UNIQUE,
    CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
      OIDS = FALSE
      );


CREATE TABLE "friend"
(
    "id"             serial  NOT NULL,
    "first_user_id"  integer NOT NULL,
    "second_user_id" integer NOT NULL,
    CONSTRAINT "friend_pk" PRIMARY KEY ("id")
) WITH (
      OIDS = FALSE
      );


CREATE TABLE "game"
(
    "id"        serial      NOT NULL,
    "api_ident" varchar (255)    NOT NULL UNIQUE,
    CONSTRAINT "game_pk" PRIMARY KEY ("id")
) WITH (
      OIDS = FALSE
      );



CREATE TABLE "time_log"
(
    "id"      serial  NOT NULL,
    "user_id" integer NOT NULL,
    "game_id" integer NOT NULL,
    "hours"   float4 NOT NULL,
    "date"    DATE    NOT NULL,
    CONSTRAINT "time_log_pk" PRIMARY KEY ("id")
) WITH (
      OIDS = FALSE
      );



CREATE TABLE "achievement"
(
    "id"          serial      NOT NULL,
    "name"     varchar(255),
    "description" varchar(64) NOT NULL,
    "condition"   varchar(64) NOT NULL,
    CONSTRAINT "achievement_pk" PRIMARY KEY ("id")
) WITH (
      OIDS = FALSE
      );



CREATE TABLE "user_achievement"
(
    "id"             serial  NOT NULL,
    "user_id"        integer NOT NULL,
    "achievement_id" integer NOT NULL,
    CONSTRAINT "user_achievement_pk" PRIMARY KEY ("id")
) WITH (
      OIDS = FALSE
      );



CREATE TABLE "comment"
(
    "id"      serial       NOT NULL,
    "user_id" integer      NOT NULL,
    "game_id" integer      NOT NULL,
    "text"    varchar(120) NOT NULL,
    "rating"  integer,
    CONSTRAINT "comment_pk" PRIMARY KEY ("id")
) WITH (
      OIDS = FALSE
      );


ALTER TABLE "friend"
    ADD CONSTRAINT "user_friend_fk0" FOREIGN KEY ("first_user_id") REFERENCES "user" ("id");
ALTER TABLE "friend"
    ADD CONSTRAINT "user_friend_fk1" FOREIGN KEY ("second_user_id") REFERENCES "user" ("id");

ALTER TABLE "time_log"
    ADD CONSTRAINT "time_log_fk0" FOREIGN KEY ("user_id") REFERENCES "user" ("id");
ALTER TABLE "time_log"
    ADD CONSTRAINT "time_log_fk1" FOREIGN KEY ("game_id") REFERENCES "game" ("id");

ALTER TABLE "user_achievement"
    ADD CONSTRAINT "user_achievement_fk0" FOREIGN KEY ("user_id") REFERENCES "user" ("id");
ALTER TABLE "user_achievement"
    ADD CONSTRAINT "user_achievement_fk1" FOREIGN KEY ("achievement_id") REFERENCES "achievement" ("id");

ALTER TABLE "comment"
    ADD CONSTRAINT "comment_fk0" FOREIGN KEY ("user_id") REFERENCES "user" ("id");
ALTER TABLE "comment"
    ADD CONSTRAINT "comment_fk1" FOREIGN KEY ("game_id") REFERENCES "game" ("id");
