create database acelerator;

create table if not exists types(
  id serial not null primary key,
  title varchar(150) not null,
);

create table if not exists modules(
  id serial not null primary key,
  title varchar(150) not null,
);

create table if not exists acelerators(
  id serial not null primary key,
  title varchar(50) not null,
  descri varchar(60) not null,
  git_url VARCHAR(500),
  types_id integer not null,
  modules_id integer not null,
  foreign key(types_id) references types(id),
  foreign key(module) references modules(id)
);