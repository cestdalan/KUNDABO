CREATE TABLE `pushSubscriptions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`endpointHash` varchar(64) NOT NULL,
	`endpoint` text NOT NULL,
	`p256dh` varchar(255) NOT NULL,
	`auth` varchar(255) NOT NULL,
	`userAgent` varchar(512),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `pushSubscriptions_id` PRIMARY KEY(`id`),
	CONSTRAINT `pushSubscriptions_endpointHash_unique` UNIQUE(`endpointHash`)
);
