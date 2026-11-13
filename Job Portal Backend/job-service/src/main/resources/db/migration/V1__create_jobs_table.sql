
CREATE TABLE jobs (

                      id BIGINT NOT NULL AUTO_INCREMENT,

                      title VARCHAR(150) NOT NULL,

                      description TEXT NOT NULL,

                      company_name VARCHAR(150) NOT NULL,

                      location VARCHAR(150) NOT NULL,

                      employment_type VARCHAR(30) NOT NULL,

                      work_mode VARCHAR(30) NOT NULL,

                      experience_min INT NOT NULL,

                      experience_max INT NOT NULL,

                      salary_min DECIMAL(12,2),

                      salary_max DECIMAL(12,2),

                      skills TEXT,

                      status VARCHAR(30) NOT NULL DEFAULT 'OPEN',

                      PRIMARY KEY (id)

);
