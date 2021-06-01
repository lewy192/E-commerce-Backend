-- DROP DATABASE
DROP DATABASE IF EXISTS ecommerce_db;

-- CREATE DATABASE
CREATE DATABASE ecommerce_db;

create table categorys(
    id int primary key auto_increment not null,
    category_name varchar(100) not null
);

create table products(
    id int primary key auto_increment not null,
    product_name varchar(202) not null,
    price decimal(10,2) not null,
    stock int not null default = 10,
    category_id int,
    foreign key (category_id) references categorys(id)
);

create table tags(
    id int primary key auto_increment not null,
    tag_name varchar(102)
)

create table product_tag(
    id int primary key auto_increment not null,
    product_id int,
    tag_id int,
    foreign key (product_id) references products(id),
    foreign key (tag_id) references tags(id)
)


