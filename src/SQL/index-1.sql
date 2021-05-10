alter `account` . `baoer-user`
add column `balance` double(10, 0) unsiged not null default 0.00 afetr `phone`

create table varchar_test (
  `id` int primary key auto_increment,
  `name` varchar(128) character set utf8mb4 default ''
)