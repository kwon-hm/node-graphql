CREATE TABLE `ojt`.`corp` (
  `no` int(11) NOT NULL AUTO_INCREMENT,
  `corpId` varchar(45) NOT NULL,
  `corpName` varchar(45) NOT NULL,
  `companyRegNo` varchar(45) NOT NULL,
  `createdDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `modifiedDate` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`no`),
  UNIQUE KEY `UC_CorpId` (`corpId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8

CREATE UNIQUE INDEX UQ_Corp_1
    ON ojt.corp(corpId);

insert into ojt.Corp (`corpId`,`corpName`,`companyRegNo`) values ('a001', 'infofla', '111222');
insert into ojt.Corp (`corpId`,`corpName`,`companyRegNo`) values ('a002', 'google', '222333');



CREATE TABLE `ojt`.`user` (
  `no` int(11) NOT NULL AUTO_INCREMENT,
  `company` varchar(45) DEFAULT NULL,
  `userId` varchar(45) NOT NULL,
  `corpId` varchar(45) NOT NULL,
  `userPW` varchar(45) NOT NULL,
  `userName` varchar(45) DEFAULT NULL,
  `UserEmail` varchar(45) DEFAULT NULL,
  `userMobile` varchar(45) DEFAULT NULL,
  `userLevel` varchar(45) DEFAULT NULL,
  `createdDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `modifiedDate` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`no`),
  UNIQUE KEY `UC_UserId` (`userId`),
  KEY `FK_User_CorpId_Corp_CorpId` (`corpId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8

CREATE UNIQUE INDEX UQ_User_1
    ON ojt.user(userId);

ALTER TABLE ojt.user
    ADD CONSTRAINT FK_User_CorpId_Corp_CorpId FOREIGN KEY (corpId)
        REFERENCES ojt.corp (corpId) ON DELETE RESTRICT ON UPDATE RESTRICT;

insert into ojt.User (`company`,`userId`,`corpId`,`userPW`,`userName`,`userEmail`,`userMobile`) values ('infofla','admin','a001','123','Admin','a@a.com','010');



CREATE TABLE `ojt`.`post` (
  `no` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(45) NOT NULL,
  `title` varchar(45) DEFAULT NULL,
  `contents` varchar(45) DEFAULT NULL,
  `files` varchar(45) DEFAULT NULL,
  `writer` varchar(45) DEFAULT NULL,
  `counter` varchar(45) DEFAULT NULL,
  `category` varchar(45) DEFAULT NULL,
  `createdDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `modifiedDate` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`no`),
  KEY `FK_Post_UserId_User_UserId` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=10003 DEFAULT CHARSET=utf8

ALTER TABLE ojt.post
    ADD CONSTRAINT FK_Post_UserId_User_UserId FOREIGN KEY (userId)
        REFERENCES ojt.user (userId) ON DELETE RESTRICT ON UPDATE RESTRICT;


CREATE TABLE `ojt`.`coment` (
  `no` int(11) NOT NULL AUTO_INCREMENT,
  `postId` int(11) NOT NULL,
  `coment` varchar(45) NOT NULL,
  `userId` varchar(45) NOT NULL,
  `writer` varchar(45) NOT NULL,
  `modifiedDate` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`no`),
  KEY `FK_Coment_PostId_Post_No` (`postId`),
  CONSTRAINT `FK_Coment_PostId_Post_No` FOREIGN KEY (`postId`) REFERENCES `post` (`no`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8

ALTER TABLE ojt.coment
    ADD CONSTRAINT FK_Coment_PostId_Post_No FOREIGN KEY (postId)
        REFERENCES ojt.post (no) ON DELETE RESTRICT ON UPDATE RESTRICT;