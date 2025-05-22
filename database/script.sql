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

create table tbl_playlist(
id int primary key auto_increment,
nome varchar(45) NOT NULL,
data_criacao date NOT NULL
);

INSERT INTO tbl_playlist (nome, data_criacao) VALUES 
('Playlist Rock Clássico', '2023-05-01');