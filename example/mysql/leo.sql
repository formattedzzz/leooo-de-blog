alter `account` . `baoer-user` add column `balance` double(10, 0) unsiged not null default 0.00 afetr `phone`

CREATE TABLE varchar_test ( `id` int primary key auto_increment, `name` varchar(128) character

SET utf8mb4 default '' )

SELECT  c.id 
       ,c.user_id AS user_id 
       ,c.root_id 
       ,c.reply_id 
       ,u.name 
       ,c.content 
       ,c.create_at
FROM `baoer-comment` c
JOIN `baoer-user` u
WHERE c.user_id = u.id;

BEGIN;
	UPDATE `baoer-user` SET balance=1.5 WHERE id=1;
	UPDATE `baoer-user` SET balance=2.5 WHERE id=2;
COMMIT;
