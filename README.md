# ExTpWebDynamicCpi2AyaBouzommita
examen tp web dynamique aya bouzommita cpi2
# Crud Post

Foobar is a Python library for dealing with word pluralization.

## Installation

clone the repo.
```bash
git clone https://github.com/AyaBouzommita/ExTpWebDynamicCpi2AyaBouzommita.git
```
install with node.
```bash
npm install
```

## database Usage

```sql
-- Create the blogs database if it doesn't exist
CREATE DATABASE IF NOT EXISTS blogs;

-- Use the blogs database
USE blogs;

-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    id_u INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL
);

-- Create the postes table
CREATE TABLE IF NOT EXISTS postes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    descp TEXT,
    image VARCHAR(255),
    id_u INT,
    category VARCHAR(255),
    FOREIGN KEY (id_u) REFERENCES users(id_u)
);

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
aya bouzommita
