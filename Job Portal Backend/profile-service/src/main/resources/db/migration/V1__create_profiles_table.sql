
CREATE TABLE profiles (

                          id BIGINT NOT NULL AUTO_INCREMENT,

                          user_id BIGINT NOT NULL UNIQUE,

                          full_name VARCHAR(100) NOT NULL,

                          phone VARCHAR(15),

                          location VARCHAR(150),

                          bio TEXT,

                          skills TEXT,

                          experience_years INT DEFAULT 0,

                          resume_url VARCHAR(500),

                          created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

                          updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
                              ON UPDATE CURRENT_TIMESTAMP,

                          PRIMARY KEY (id)

);
