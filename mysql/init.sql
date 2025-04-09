CREATE DATABASE IF NOT EXISTS crud_db;

USE crud_db;

CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  celular VARCHAR(40) NOT NULL
);

INSERT INTO usuarios (nombre, celular) VALUES
('Yoskar jose', '3223719421'),
('diego arango', '3225920531');
