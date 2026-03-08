CREATE TABLE `scraps` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`path` text NOT NULL,
	`text` text NOT NULL,
	`mp3` text NOT NULL,
	`hash` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `scraps_path_unique` ON `scraps` (`path`);