CREATE TABLE `Users` (
  `ID_USER` int PRIMARY KEY AUTO_INCREMENT,
  `NAME` varchar(255),
  `FIRSTNAME` varchar(255)
);

CREATE TABLE `A_Category` (
  `ID_Category` int PRIMARY KEY AUTO_INCREMENT,
  `NAME` varchar(255)
);

CREATE TABLE `Allergene` (
  `ID_ALLERGENE` int PRIMARY KEY AUTO_INCREMENT,
  `NAME` varchar(255),
  `ID_Category` int
);

CREATE TABLE `Ingredient` (
  `ID_INGREDIENT` int PRIMARY KEY AUTO_INCREMENT,
  `NAME` varchar(255),
  `UNIT` varchar(255),
  `UNIT_PRICE` int,
  `ID_Category` int
);

CREATE TABLE `I_Category` (
  `ID_Category` int PRIMARY KEY AUTO_INCREMENT,
  `NAME` varchar(255)
);

CREATE TABLE `Ingredient_Allergene` (
  `ID_INGREDIENT` int,
  `ID_ALLERGENE` int,
  PRIMARY KEY (`ID_INGREDIENT`, `ID_ALLERGENE`)
);

CREATE TABLE `Step` (
  `ID_STEP` int PRIMARY KEY AUTO_INCREMENT,
  `NAME` varchar(255),
  `DESCIPTION` varchar(255),
  `DURATION` int
);

CREATE TABLE `Step_Ingredient` (
  `ID_STEP` int,
  `ID_INGREDIENT` int,
  `QUANTITY` int,
  PRIMARY KEY (`ID_STEP`, `ID_INGREDIENT`)
);

CREATE TABLE `Recipe` (
  `ID_RECIPE` int PRIMARY KEY AUTO_INCREMENT,
  `NAME` varchar(255),
  `NB_COUVERT` int,
  `COUT_ASSAISONNEMENT` int,
  `ID_USER` int,
  `ID_Category` int
);

CREATE TABLE `R_Category` (
  `ID_Category` int PRIMARY KEY AUTO_INCREMENT,
  `NAME` varchar(255)
);

CREATE TABLE `Recipe_Step` (
  `ID_RECIPE` int,
  `ID_STEP` int,
  `POSITION` int,
  PRIMARY KEY (`ID_RECIPE`, `ID_STEP`, `POSITION`)
);

CREATE TABLE `Recipe_Recipe` (
  `ID_RECIPE` int,
  `ID_STEP` int,
  `POSITION` int,
  PRIMARY KEY (`ID_RECIPE`, `ID_STEP`, `POSITION`)
);

ALTER TABLE `Allergene` ADD FOREIGN KEY (`ID_Category`) REFERENCES `A_Category` (`ID_Category`);

ALTER TABLE `Ingredient_Allergene` ADD FOREIGN KEY (`ID_ALLERGENE`) REFERENCES `Allergene` (`ID_ALLERGENE`);

ALTER TABLE `Ingredient_Allergene` ADD FOREIGN KEY (`ID_INGREDIENT`) REFERENCES `Ingredient` (`ID_INGREDIENT`);

ALTER TABLE `Step_Ingredient` ADD FOREIGN KEY (`ID_INGREDIENT`) REFERENCES `Ingredient` (`ID_INGREDIENT`);

ALTER TABLE `Step_Ingredient` ADD FOREIGN KEY (`ID_STEP`) REFERENCES `Step` (`ID_STEP`);

ALTER TABLE `Recipe_Step` ADD FOREIGN KEY (`ID_STEP`) REFERENCES `Step` (`ID_STEP`);

ALTER TABLE `Recipe_Step` ADD FOREIGN KEY (`ID_RECIPE`) REFERENCES `Recipe` (`ID_RECIPE`);

ALTER TABLE `Recipe_Recipe` ADD FOREIGN KEY (`ID_RECIPE`) REFERENCES `Recipe` (`ID_RECIPE`);

ALTER TABLE `Ingredient` ADD FOREIGN KEY (`ID_Category`) REFERENCES `I_Category` (`ID_Category`);

ALTER TABLE `Recipe` ADD FOREIGN KEY (`ID_Category`) REFERENCES `R_Category` (`ID_Category`);

ALTER TABLE `Recipe_Recipe` ADD FOREIGN KEY (`ID_STEP`) REFERENCES `Recipe` (`ID_RECIPE`);

ALTER TABLE `Recipe` ADD FOREIGN KEY (`ID_USER`) REFERENCES `Users` (`ID_USER`);

ALTER TABLE `Ingredient` ADD FOREIGN KEY (`ID_ALLERGENE`) REFERENCES `Allergene` (`ID_ALLERGENE`);

