PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_scraps` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`filename` text NOT NULL,
	`markdown` text NOT NULL,
	`mp3` text NOT NULL,
	`hash` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_scraps`("id", "filename", "markdown", "mp3", "hash", "created_at", "updated_at") SELECT "id", "path", "text", "mp3", "hash", "created_at", "updated_at" FROM `scraps`;--> statement-breakpoint
DROP TABLE `scraps`;--> statement-breakpoint
ALTER TABLE `__new_scraps` RENAME TO `scraps`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `scraps_filename_unique` ON `scraps` (`filename`);--> statement-breakpoint
CREATE UNIQUE INDEX `scraps_hash_unique` ON `scraps` (`hash`);