CREATE TABLE Users (
    UserId int NOT NULL AUTO_INCREMENT,
    Username VARCHAR(255) NOT NULL, 
    Email VARCHAR(255) NOT NULL, 
    Password VARCHAR(255) NOT NULL,
    IsAdmin BOOLEAN NOT NULL,
    PRIMARY KEY (UserId)
);

CREATE TABLE Comments (
    CommentId int NOT NULL AUTO_INCREMENT,
    ProductId int NOT NULL,
    Comment text NULL,
    CommentDate DATETIME NOT NULL,
    PRIMARY KEY (CommentId)
);

CREATE TABLE Products (
    ProductId int NOT NULL AUTO_INCREMENT,
    ProductName varchar(255) NOT NULL,
    Cost decimal(10,2) NOT NULL,
    IsActive bit NOT NULL,
    SmallImageUrl varchar(255) NOT NULL,
    LargeImageUrl varchar(255) NOT NULL,    
    PRIMARY KEY (ProductId)
);

CREATE TABLE TextContent (
    WelcomeMessage text NOT NULL
);

CREATE TABLE ContactMessages (
    ContactMessageId int NOT NULL AUTO_INCREMENT,
    Message text NOT NULL,
    MessageDate DATETIME NOT NULL,
    PRIMARY KEY (ContactMessageId)
);


INSERT INTO Users (Username, Email, Password, IsAdmin) VALUES ( 'admin', 'admin@hackthecat.com', 'pass', true);
INSERT INTO Users (Username, Email, Password, IsAdmin) VALUES ( 'user', 'user@hackthecat.com', 'pass', false);

INSERT INTO Products (ProductName, Cost, IsActive, SmallImageUrl, LargeImageUrl) VALUES ('Bike 1', 100, 1,  'bike01.png', 'bike01.png');
INSERT INTO Products (ProductName, Cost, IsActive, SmallImageUrl, LargeImageUrl) VALUES ('Bike 2', 200, 1, 'bike02.png', 'bike02.png');
INSERT INTO Products (ProductName, Cost, IsActive, SmallImageUrl, LargeImageUrl) VALUES ('Super Future Bike 3', 200, 0, 'bike03.png', 'bike03.png');

INSERT INTO TextContent (WelcomeMessage) VALUES ('p Welcome to the HackTheCat!');