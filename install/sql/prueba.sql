CREATE TABLE ascents (
  id int(11) NOT NULL AUTO_INCREMENT,
  type varchar(255) DEFAULT NULL,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4


LOCK TABLES ascents WRITE
INSERT INTO ascents VALUES (1,'Puntos','2022-04-12 19:43:03','2022-04-12 19:43:03')
UNLOCK TABLES


DROP TABLE IF EXISTS avatars

CREATE TABLE avatars (
  id int(11) NOT NULL AUTO_INCREMENT,
  image varchar(255) DEFAULT NULL,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4

LOCK TABLES avatars WRITE

INSERT INTO avatars VALUES (1,'default.png','2022-04-12 19:43:03','2022-04-12 19:43:03')

UNLOCK TABLES



DROP TABLE IF EXISTS awardstatistics

CREATE TABLE awardstatistics (
  id int(11) NOT NULL AUTO_INCREMENT,
  bestPlayer int(11) DEFAULT NULL,
  bestScorer int(11) DEFAULT NULL,
  bestGoalAssist int(11) DEFAULT NULL,
  bestGoalKeeper int(11) DEFAULT NULL,
  tournamentId int(11) DEFAULT NULL,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  PRIMARY KEY (id),
  KEY bestPlayer (bestPlayer),
  KEY bestScorer (bestScorer),
  CONSTRAINT awardstatistics_ibfk_1 FOREIGN KEY (bestPlayer) REFERENCES users (id),
  CONSTRAINT awardstatistics_ibfk_2 FOREIGN KEY (bestScorer) REFERENCES users (id)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4


LOCK TABLES awardstatistics WRITE

INSERT INTO awardstatistics VALUES (1,2,1,1,NULL,NULL,'2022-04-16 03:33:49','2022-04-16 03:33:49')

UNLOCK TABLES



DROP TABLE IF EXISTS controlteamcups

CREATE TABLE controlteamcups (
  id int(11) NOT NULL AUTO_INCREMENT,
  team varchar(255) DEFAULT NULL,
  cupId int(11) DEFAULT NULL,
  eliminated int(11) DEFAULT NULL,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4


LOCK TABLES controlteamcups WRITE

UNLOCK TABLES



DROP TABLE IF EXISTS cups

CREATE TABLE cups (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) DEFAULT NULL,
  initialFaseId int(11) DEFAULT NULL,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4

LOCK TABLES cups WRITE

UNLOCK TABLES



DROP TABLE IF EXISTS declines

CREATE TABLE declines (
  id int(11) NOT NULL AUTO_INCREMENT,
  type varchar(255) DEFAULT NULL,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4

LOCK TABLES declines WRITE

INSERT INTO declines VALUES (1,'Puntos','2022-04-12 19:43:03','2022-04-12 19:43:03')

UNLOCK TABLES



DROP TABLE IF EXISTS divisioncontrols

CREATE TABLE divisioncontrols (
  id int(11) NOT NULL AUTO_INCREMENT,
  tournamentDivisions int(11) DEFAULT NULL,
  divisionsCreated int(11) DEFAULT NULL,
  tournamentId int(11) DEFAULT NULL,
  tournamentCompleted int(11) DEFAULT NULL,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  PRIMARY KEY (id),
  KEY tournamentId (tournamentId),
  CONSTRAINT divisioncontrols_ibfk_1 FOREIGN KEY (tournamentId) REFERENCES tournaments (id)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4




LOCK TABLES divisioncontrols WRITE

INSERT INTO divisioncontrols VALUES (3,4,4,3,1,'2022-04-12 20:11:02','2022-04-15 01:32:24'),(4,2,2,4,1,'2022-04-13 19:50:08','2022-04-15 01:31:32')

UNLOCK TABLES



DROP TABLE IF EXISTS divisions

CREATE TABLE divisions (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) DEFAULT NULL,
  tournamentId int(11) DEFAULT NULL,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  PRIMARY KEY (id),
  KEY tournamentId (tournamentId),
  CONSTRAINT divisions_ibfk_1 FOREIGN KEY (tournamentId) REFERENCES tournaments (id)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4

LOCK TABLES divisions WRITE

INSERT INTO divisions VALUES (6,'div 4',3,'2022-04-12 20:12:23','2022-04-15 02:00:47'),(7,'Nueva division',4,'2022-04-13 19:51:15','2022-04-13 19:51:15'),(8,'otra div',4,'2022-04-13 19:51:21','2022-04-13 19:51:21'),(11,'Nuevo torneo div',4,'2022-04-15 01:31:32','2022-04-15 01:31:32'),(12,'div 1',3,'2022-04-15 01:31:42','2022-04-15 01:31:42'),(13,'div 4',3,'2022-04-15 01:32:12','2022-04-15 01:32:12'),(14,'1111',3,'2022-04-15 01:32:24','2022-04-15 01:32:24')

UNLOCK TABLES



DROP TABLE IF EXISTS fasecups

CREATE TABLE fasecups (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) DEFAULT NULL,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4


LOCK TABLES fasecups WRITE

UNLOCK TABLES



DROP TABLE IF EXISTS goals

CREATE TABLE goals (
  id int(11) NOT NULL AUTO_INCREMENT,
  userId int(11) DEFAULT NULL,
  rivalTeamId int(11) DEFAULT NULL,
  goalsCount int(11) DEFAULT NULL,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  PRIMARY KEY (id),
  KEY userId (userId),
  KEY rivalTeamId (rivalTeamId),
  CONSTRAINT goals_ibfk_1 FOREIGN KEY (userId) REFERENCES users (id),
  CONSTRAINT goals_ibfk_2 FOREIGN KEY (rivalTeamId) REFERENCES teams (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4


LOCK TABLES goals WRITE

UNLOCK TABLES



DROP TABLE IF EXISTS matchweeks

CREATE TABLE matchweeks (
  id int(11) NOT NULL AUTO_INCREMENT,
  localTeamId int(11) DEFAULT NULL,
  visitedTeamId int(11) DEFAULT NULL,
  tournamentId int(11) DEFAULT NULL,
  divisionId int(11) DEFAULT NULL,
  date datetime DEFAULT NULL,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  PRIMARY KEY (id),
  KEY localTeamId (localTeamId),
  KEY visitedTeamId (visitedTeamId),
  KEY tournamentId (tournamentId),
  KEY divisionId (divisionId),
  CONSTRAINT matchweeks_ibfk_1 FOREIGN KEY (localTeamId) REFERENCES teams (id),
  CONSTRAINT matchweeks_ibfk_2 FOREIGN KEY (visitedTeamId) REFERENCES teams (id),
  CONSTRAINT matchweeks_ibfk_3 FOREIGN KEY (tournamentId) REFERENCES tournaments (id),
  CONSTRAINT matchweeks_ibfk_4 FOREIGN KEY (divisionId) REFERENCES divisions (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4


LOCK TABLES matchweeks WRITE

UNLOCK TABLES


DROP TABLE IF EXISTS news

CREATE TABLE news (
  id int(11) NOT NULL AUTO_INCREMENT,
  title varchar(255) DEFAULT NULL,
  body text DEFAULT NULL,
  authorId int(11) DEFAULT NULL,
  image varchar(255) DEFAULT NULL,
  date datetime DEFAULT NULL,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  PRIMARY KEY (id),
  KEY authorId (authorId),
  CONSTRAINT news_ibfk_1 FOREIGN KEY (authorId) REFERENCES users (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4

LOCK TABLES news WRITE

UNLOCK TABLES


DROP TABLE IF EXISTS players

CREATE TABLE players (
  id int(11) NOT NULL AUTO_INCREMENT,
  goals int(11) DEFAULT NULL,
  suspensionId int(11) DEFAULT NULL,
  teamId int(11) DEFAULT NULL,
  userId int(11) DEFAULT NULL,
  teamConfirm int(11) DEFAULT NULL,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  PRIMARY KEY (id),
  KEY suspensionId (suspensionId),
  KEY teamId (teamId),
  KEY userId (userId),
  CONSTRAINT players_ibfk_1 FOREIGN KEY (suspensionId) REFERENCES suspensions (id),
  CONSTRAINT players_ibfk_2 FOREIGN KEY (teamId) REFERENCES teams (id),
  CONSTRAINT players_ibfk_3 FOREIGN KEY (userId) REFERENCES users (id)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4


LOCK TABLES players WRITE

INSERT INTO players VALUES (1,10,NULL,1,1,NULL,'2022-04-12 19:43:03','2022-04-12 19:43:03'),(2,10,NULL,1,2,NULL,'2022-04-12 19:43:03','2022-04-12 19:43:03')

UNLOCK TABLES

DROP TABLE IF EXISTS reports

CREATE TABLE reports (
  id int(11) NOT NULL AUTO_INCREMENT,
  userId int(11) DEFAULT NULL,
  msg varchar(255) DEFAULT NULL,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  PRIMARY KEY (id),
  KEY userId (userId),
  CONSTRAINT reports_ibfk_1 FOREIGN KEY (userId) REFERENCES users (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4


LOCK TABLES reports WRITE

UNLOCK TABLES


DROP TABLE IF EXISTS rols

CREATE TABLE rols (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) DEFAULT NULL,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4


LOCK TABLES rols WRITE

INSERT INTO rols VALUES (1,'Admin','2022-04-12 19:43:03','2022-04-12 19:43:03'),(2,'Player','2022-04-12 19:43:03','2022-04-12 19:43:03'),(3,'Referee','2022-04-12 19:43:03','2022-04-12 19:43:03')

UNLOCK TABLES

DROP TABLE IF EXISTS sequelizemeta

CREATE TABLE sequelizemeta (
  name varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (name),
  UNIQUE KEY name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci


LOCK TABLES sequelizemeta WRITE

INSERT INTO sequelizemeta VALUES ('20220318184801-create-avatar.js'),('20220318184807-create-rol.js'),('20220318184814-create-user.js'),('20220318184825-create-ascent.js'),('20220318184832-create-decline.js'),('20220318184839-create-type-tournament.js'),('20220318184848-create-tournament.js'),('20220318184912-create-division.js'),('20220318184918-create-team.js'),('20220318184924-create-goal.js'),('20220318184931-create-matchweek.js'),('20220318184938-create-suspension.js'),('20220318185005-create-player.js'),('20220318185022-create-statistic.js'),('20220318185029-create-report.js'),('20220318185037-create-news.js'),('20220411024318-create-division-control.js'),('20220416010718-create-fase-cup.js'),('20220416010724-create-cup.js'),('20220416010730-create-control-team-cup.js'),('20220416010740-create-award-statistics.js')

UNLOCK TABLES


DROP TABLE IF EXISTS statistics

CREATE TABLE statistics (
  id int(11) NOT NULL AUTO_INCREMENT,
  teamId int(11) DEFAULT NULL,
  played int(11) DEFAULT NULL,
  win int(11) DEFAULT NULL,
  drawn int(11) DEFAULT NULL,
  lost int(11) DEFAULT NULL,
  gf int(11) DEFAULT NULL,
  ga int(11) DEFAULT NULL,
  gd int(11) DEFAULT NULL,
  pts int(11) DEFAULT NULL,
  tournamentId int(11) DEFAULT NULL,
  divisionId int(11) DEFAULT NULL,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  PRIMARY KEY (id),
  KEY teamId (teamId),
  KEY tournamentId (tournamentId),
  KEY divisionId (divisionId),
  CONSTRAINT statistics_ibfk_1 FOREIGN KEY (teamId) REFERENCES teams (id),
  CONSTRAINT statistics_ibfk_2 FOREIGN KEY (tournamentId) REFERENCES tournaments (id),
  CONSTRAINT statistics_ibfk_3 FOREIGN KEY (divisionId) REFERENCES divisions (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4


LOCK TABLES statistics WRITE

UNLOCK TABLES


DROP TABLE IF EXISTS suspensions

CREATE TABLE suspensions (
  id int(11) NOT NULL AUTO_INCREMENT,
  userId int(11) DEFAULT NULL,
  matchTime datetime DEFAULT NULL,
  matchId int(11) DEFAULT NULL,
  description varchar(255) DEFAULT NULL,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  PRIMARY KEY (id),
  KEY userId (userId),
  KEY matchId (matchId),
  CONSTRAINT suspensions_ibfk_1 FOREIGN KEY (userId) REFERENCES users (id),
  CONSTRAINT suspensions_ibfk_2 FOREIGN KEY (matchId) REFERENCES matchweeks (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4

LOCK TABLES suspensions WRITE

UNLOCK TABLES

DROP TABLE IF EXISTS teams

CREATE TABLE teams (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) DEFAULT NULL,
  avatarId int(11) DEFAULT NULL,
  captainId int(11) DEFAULT NULL,
  tournamentId int(11) DEFAULT NULL,
  divisionId int(11) DEFAULT NULL,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  PRIMARY KEY (id),
  KEY avatarId (avatarId),
  KEY captainId (captainId),
  KEY tournamentId (tournamentId),
  KEY divisionId (divisionId),
  CONSTRAINT teams_ibfk_1 FOREIGN KEY (avatarId) REFERENCES avatars (id),
  CONSTRAINT teams_ibfk_2 FOREIGN KEY (captainId) REFERENCES users (id),
  CONSTRAINT teams_ibfk_3 FOREIGN KEY (tournamentId) REFERENCES tournaments (id),
  CONSTRAINT teams_ibfk_4 FOREIGN KEY (divisionId) REFERENCES divisions (id)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4

LOCK TABLES teams WRITE

INSERT INTO teams VALUES (1,'Team odet',1,1,NULL,NULL,'2022-04-12 19:43:03','2022-04-12 19:43:03'),(2,'Team rival',1,1,NULL,NULL,'2022-04-12 19:43:03','2022-04-12 19:43:03')

UNLOCK TABLES


DROP TABLE IF EXISTS tournaments

CREATE TABLE tournaments (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) DEFAULT NULL,
  divisions int(11) DEFAULT NULL,
  ascentId int(11) DEFAULT NULL,
  declineId int(11) DEFAULT NULL,
  startDate date DEFAULT NULL,
  endDate date DEFAULT NULL,
  typeId int(11) DEFAULT NULL,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  PRIMARY KEY (id),
  KEY ascentId (ascentId),
  KEY declineId (declineId),
  KEY typeId (typeId),
  CONSTRAINT tournaments_ibfk_1 FOREIGN KEY (ascentId) REFERENCES ascents (id),
  CONSTRAINT tournaments_ibfk_2 FOREIGN KEY (declineId) REFERENCES declines (id),
  CONSTRAINT tournaments_ibfk_3 FOREIGN KEY (typeId) REFERENCES typetournaments (id)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4

LOCK TABLES tournaments WRITE

INSERT INTO tournaments VALUES (3,'torneo prueba3',4,1,1,'2018-11-20','2022-09-09',1,'2022-04-12 20:11:02','2022-04-12 20:37:10'),(4,'Nuevo torneo',2,1,1,'2022-04-13','2023-01-08',1,'2022-04-13 19:50:08','2022-04-13 19:50:08')

UNLOCK TABLES


DROP TABLE IF EXISTS typetournaments

CREATE TABLE typetournaments (
  id int(11) NOT NULL AUTO_INCREMENT,
  type varchar(255) DEFAULT NULL,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4


LOCK TABLES typetournaments WRITE

INSERT INTO typetournaments VALUES (1,'Liga','2022-04-12 19:43:03','2022-04-12 19:43:03'),(2,'Copa','2022-04-12 19:43:03','2022-04-12 19:43:03')

UNLOCK TABLES

DROP TABLE IF EXISTS users

CREATE TABLE users (
  id int(11) NOT NULL AUTO_INCREMENT,
  user varchar(255) DEFAULT NULL,
  firstName varchar(255) DEFAULT NULL,
  lastName varchar(255) DEFAULT NULL,
  email varchar(255) DEFAULT NULL,
  pass varchar(255) DEFAULT NULL,
  avatarId int(11) DEFAULT NULL,
  rolId int(11) DEFAULT NULL,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  PRIMARY KEY (id),
  KEY avatarId (avatarId),
  KEY rolId (rolId),
  CONSTRAINT users_ibfk_1 FOREIGN KEY (avatarId) REFERENCES avatars (id),
  CONSTRAINT users_ibfk_2 FOREIGN KEY (rolId) REFERENCES rols (id)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4

LOCK TABLES users WRITE

INSERT INTO users VALUES (1,'admin','Admin','Odet','admin@odet.com','$2a$10$0Xhs.ir9MpmkZoYYj92rs.oWRi2crKnqJDKvMdzIYYWxi.KMB74mK',1,1,'2022-04-12 19:43:03','2022-04-12 19:43:03'),(2,'player','Player','Odet','player@odet.com','$2a$10$0Xhs.ir9MpmkZoYYj92rs.oWRi2crKnqJDKvMdzIYYWxi.KMB74mK',1,2,'2022-04-12 19:43:03','2022-04-12 19:43:03'),(3,'referee','Referee','Odet','referee@odet.com','$2a$10$0Xhs.ir9MpmkZoYYj92rs.oWRi2crKnqJDKvMdzIYYWxi.KMB74mK',1,3,'2022-04-12 19:43:03','2022-04-12 19:43:03')
UNLOCK TABLES`