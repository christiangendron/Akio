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
-- Structure de la table `community`
--

CREATE TABLE `community` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(256) NOT NULL,
  `description` VARCHAR(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `community` (`id`, `name`, `description`) VALUES
('1', 'canada', 'Welcome to Canada, the ultimate online gathering place for all things Canadian! Join us to discuss Canadian news, culture, breathtaking landscapes, and connect with fellow Canucks.'),
('2', 'dogs', 'Join the woof-tastic world of r/Dogs! A pawsome space for dog lovers to share adorable pics, training tips, and heartwarming stories.'),
('3', 'story', 'Welcome to Story, the official subreddit for all things story related! Share your stories, read others, and connect with fellow storytellers.');

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
-- Structure de la table `post`
--

CREATE TABLE `post` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `title` VARCHAR(256) NOT NULL,
  `text_content` TEXT NOT NULL,
  `votes` int(11) NOT NULL,
  `media_url` VARCHAR(512) NULL,
  `community_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  FOREIGN KEY (`community_id`) REFERENCES `community` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `post` (`id`, `title`, `text_content`, `votes`, `media_url`, `community_id`, `user_id`) VALUES
('1', 'Lorem ipsum dolor sit amet', 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum', 1, NULL, 1, 1),
('2', 'Consectetur adipiscing elit', 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi', 1, NULL, 1, 1);

--
-- Structure de la table `comment`
--

CREATE TABLE `comment` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `text_content` VARCHAR(256) NOT NULL,
  `votes` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `comment` (`id`, `text_content`, `votes`, `user_id`, `post_id`) VALUES
('1', 'Sed do eiusmod tempor incididunt', 1, 1, 1),
('2', 'Consectetur adipiscing elit', 1, 2, 1),
('3', 'in voluptate velit esse cillum', 1, 1, 2);

COMMIT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;