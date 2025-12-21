    CREATE DATABASE wellOfSecrets;

    CREATE TABLE secrets(
        secret_id SERIAL PRIMARY KEY,
        text TEXT NOT NULL
    );