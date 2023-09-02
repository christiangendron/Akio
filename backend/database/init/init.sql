-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : mariadb2
-- Généré le : mer. 14 sep. 2022 à 16:24
-- Version du serveur : 10.9.2-MariaDB-1:10.9.2+maria~ubu2204
-- Version de PHP : 8.0.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `akiodb`
--

-- --------------------------------------------------------

--
-- Structure de la table `post`
--

CREATE TABLE `post` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `title` VARCHAR(256) NOT NULL,
  `description` VARCHAR(256) NOT NULL,
  `upvotes` float(11) NOT NULL,
  `downvotes` float(11) NOT NULL,
  `media_url` VARCHAR(256) NOT NULL,
  `sub_id` float(11) NOT NULL,
  `user_id` float(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `username` VARCHAR(256) NOT NULL,
  `role` VARCHAR(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `user` (`id`, `username`, `role`) VALUES
('1', 'steve', 'admin'),
('2', 'bob', 'user');

--
-- Structure de la table `sub`
--

CREATE TABLE `sub` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `sub` VARCHAR(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `sub` (`id`, `sub`) VALUES
('1', 'canada'),
('2', 'dogs'),
('3', 'story');

COMMIT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;