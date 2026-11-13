CREATE TABLE applications (

                              id BIGINT NOT NULL AUTO_INCREMENT,

                              job_id BIGINT NOT NULL,

                              applicant_id BIGINT NOT NULL,

                              cover_letter TEXT,

                              resume_url VARCHAR(500),

                              status VARCHAR(30) NOT NULL DEFAULT 'PENDING',

                              applied_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

                              PRIMARY KEY (id)

);