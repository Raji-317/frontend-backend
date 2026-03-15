create table user(
    id varchar(20) primary key,
    username varchar(20) unique,
    email varchar(50) unique not null,
    password varchar(50) not null
)
USE sql_connection;

-- see what the column actually is now
SHOW CREATE TABLE `user`;
DESCRIBE `user`;

-- make it wide enough for a UUID (36 characters)
ALTER TABLE `user`
  MODIFY `id` VARCHAR(36) NOT NULL;
  ALTER TABLE `user`
  MODIFY `username` VARCHAR(200) UNIQUE;
   ALTER TABLE `user`
  MODIFY `email` VARCHAR(200) UNIQUE NOT NULL;
   ALTER TABLE `user`
    MODIFY `password` VARCHAR(200) NOT NULL;
  
