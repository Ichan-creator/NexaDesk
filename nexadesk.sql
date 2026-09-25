CREATE DATABASE IF NOT EXISTS nexadesk
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE nexadesk;

ALTER TABLE users
ADD COLUMN last_seen TIMESTAMP NULL DEFAULT NULL;

ALTER TABLE users
ADD COLUMN username VARCHAR(50) NOT NULL UNIQUE
AFTER full_name;

ALTER TABLE notifications
ADD COLUMN is_read TINYINT(1) NOT NULL DEFAULT 0;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,

    full_name VARCHAR(120) NOT NULL,

    username VARCHAR(50) NOT NULL UNIQUE,

    email VARCHAR(150) NOT NULL UNIQUE,

    password_hash VARCHAR(255) NOT NULL,

    department VARCHAR(80) NOT NULL,

    role ENUM('user', 'admin')
        NOT NULL DEFAULT 'user',

    status ENUM('active', 'inactive')
        NOT NULL DEFAULT 'active',

    created_at TIMESTAMP
        DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,

    ticket_number VARCHAR(30) UNIQUE,

    user_id INT NOT NULL,

    subject VARCHAR(180) NOT NULL,

    category VARCHAR(80) NOT NULL,

    priority ENUM(
        'Low',
        'Medium',
        'High',
        'Urgent'
    ) NOT NULL DEFAULT 'Medium',

    status ENUM(
        'Open',
        'In Progress',
        'Resolved',
        'Closed'
    ) NOT NULL DEFAULT 'Open',

    description TEXT NOT NULL,

    created_at TIMESTAMP
        DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_ticket_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ticket_updates (
    id INT AUTO_INCREMENT PRIMARY KEY,

    ticket_id INT NOT NULL,

    user_id INT NOT NULL,

    action VARCHAR(60) NOT NULL,

    note TEXT,

    created_at TIMESTAMP
        DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_update_ticket
        FOREIGN KEY (ticket_id)
        REFERENCES tickets(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_update_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,

    title VARCHAR(150) NOT NULL,

    message TEXT NOT NULL,

    type VARCHAR(40)
        DEFAULT 'system',

    is_read TINYINT(1)
        DEFAULT 0,

    created_at TIMESTAMP
        DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_notification_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS knowledge_articles (
    id INT AUTO_INCREMENT PRIMARY KEY,

    title VARCHAR(180) NOT NULL,

    category VARCHAR(80) NOT NULL,

    content TEXT NOT NULL,

    views INT DEFAULT 0,

    published TINYINT(1)
        DEFAULT 1,

    created_at TIMESTAMP
        DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO knowledge_articles
(title, category, content)
VALUES
(
    'How to reset your Windows password',
    'Account',
    'Contact the IT Service Desk and complete the required identity verification before a password reset.'
),
(
    'Basic Wi-Fi troubleshooting',
    'Network',
    'Restart Wi-Fi, verify airplane mode is disabled, reconnect to the approved network, and restart the device if necessary.'
),
(
    'Printer troubleshooting checklist',
    'Hardware',
    'Check power, paper, toner, cable or network connection, default printer selection, and clear stuck print jobs.'
),
(
    'How to report a phishing email',
    'Security',
    'Do not open unknown links or attachments. Report the message using your organization''s approved security reporting process.'
),
(
    'VPN connection troubleshooting',
    'Network',
    'Confirm internet access, verify VPN credentials, restart the VPN client, and contact the Service Desk if the issue continues.'
);

INSERT INTO users
(
    full_name,
    username,
    email,
    password_hash,
    department,
    role,
    status
)
VALUES
(
    'NexaDesk Administrator',
    'admin',
    'admin@nexadesk.com',
    '$2b$10$1jnlBa0ub3CDM75wJRt0m.QuJIqNV7/nkk5uEvcVylQru.1XJN1Iq',
    'Information Technology',
    'admin',
    'active'
);

SHOW TABLES;

SELECT
    id,
    full_name,
    username,
    email,
    department,
    role,
    status,
    created_at
FROM users;

SELECT
    id,
    user_id,
    title,
    message,
    type,
    is_read,
    created_at
FROM notifications
ORDER BY created_at DESC;

SELECT
    id,
    username,
    role,
    status,
    online_status,
    last_active
FROM users
WHERE role = 'admin';

SELECT * FROM tickets;

SELECT * FROM ticket_updates;

SELECT * FROM notifications;

SELECT * FROM knowledge_articles;