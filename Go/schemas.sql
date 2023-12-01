
		CREATE TABLE IF NOT EXISTS user (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			login TEXT
		);

		CREATE TABLE IF NOT EXISTS "transaction" (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			type TEXT,
			amount INTEGER,
			objectId INTEGER,
			userId INTEGER,
			createdAt TEXT,
			path TEXT
		);

		CREATE TABLE IF NOT EXISTS progress (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			userId INTEGER,
			objectId INTEGER,
			grade INTEGER,
			createdAt TEXT,
			updatedAt TEXT,
			path TEXT
		);

		CREATE TABLE IF NOT EXISTS result (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			objectId INTEGER,
			userId INTEGER,
			grade INTEGER,
			type TEXT,
			createdAt TEXT,
			updatedAt TEXT,
			path TEXT
		);

		CREATE TABLE IF NOT EXISTS "object"(
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT,
			type TEXT,
			attrs TEXT
		);
