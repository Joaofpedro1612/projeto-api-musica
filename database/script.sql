create database db_controle_musicas_ba;

use db_controle_musicas_ba;

create table tbl_musica(
id int primary key auto_increment,
nome varchar(80) NOT NULL,
link varchar(200) NOT NULL,
duracao time NOT NULL,
data_lancamento DATE NOT NULL,
foto_capa varchar(200),
letra text
);

show tables;
desc tbl_musica;

create table tbl_genero(
id int primary key auto_increment,
nome varchar(80) NOT NULL
);

create table tbl_cadastro_usuario( 
id int primary key auto_increment,
nome varchar(80) NOT NULL,
idade int NOT NULL,    
data_nascimento date NOT NULL,
email varchar(50) NOT NULL,
senha varchar(30) NOT NULL
);

select * from tbl_cadastro_usuario;


create table tbl_cadastro_artista( 
id int primary key auto_increment,
nome varchar(80) NOT NULL,
nome_artistico varchar(60) NOT NULL,
idade int NOT NULL,    
data_nascimento date NOT NULL,
email varchar(50) NOT NULL,
senha varchar(30) NOT NULL
);

create table tbl_cadastro_playlist( 
id int primary key auto_increment,
nome varchar(80) NOT NULL,
musicas varchar(300) NOT NULL,
data_criação date  NOT NULL
);  