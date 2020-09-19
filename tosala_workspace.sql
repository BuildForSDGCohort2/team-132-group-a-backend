-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Ven 29 Août 2020 à 11:29
-- Version du serveur :  5.6.21
-- Version de PHP :  5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `tosala_workspace`
--

-- --------------------------------------------------------

--
-- Structure de la table `article`
--

CREATE TABLE IF NOT EXISTS `article` (
`id` bigint(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `community_id` bigint(11) NOT NULL,
  `content` text NOT NULL,
  `written_by` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `date_creation` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8;

--
-- Contenu de la table `article`
--

INSERT INTO `article` (`id`, `title`, `community_id`, `content`, `written_by`, `type`, `date_creation`) VALUES
(1, '', 1, 'Hi, this is first article we created!!!', '1', 'text', '2017-12-21 10:52:26'),
(2, '', 1, 'Hi, this is second article!!', '1', 'text', '2017-12-21 10:55:51'),
(3, '', 1, 'Hi, this is third article', '1', 'text', '2017-12-21 10:58:44'),
(4, '', 1, 'Hi, this is fourth article!!!', '1', 'text', '2017-12-21 11:00:55'),
(5, '', 1, 'Hi, this is fifth article!!!!', '1', 'text', '2017-12-21 11:02:25'),
(6, '', 1, 'Simple man!!!', '1', 'text', '2017-12-21 12:49:13'),
(7, '', 1, 'Ok', '1', 'text', '2017-12-21 12:49:42'),
(8, '', 1, 'Lover boy!!!!', '1', 'text', '2017-12-21 12:50:26'),
(9, '', 1, 'Worked!!!!', '1', 'text', '2017-12-21 12:51:05'),
(10, '', 1, 'Tout va bien!!!', '1', 'text', '2017-12-21 13:57:05'),
(11, '', 1, 'Everything!!', '1', 'text', '2017-12-21 13:58:43'),
(12, '', 1, 'Bonjour à tous ! je crois que vous allez ? je vous souhaite bonne fête de nouvel an. Mes amis je vous aime tant !!!!', '1', 'text', '2017-12-21 14:01:06'),
(13, '', 1, 'Bonjour à tous ! je crois que vous allez ? je vous souhaite bonne fête de nouvel an. Mes amis je vous aime tant !!!! version 2', '1', 'text', '2017-12-21 14:04:01'),
(14, '', 1, 'Bonjour à tous ! je crois que vous allez ? je vous souhaite bonne fête de nouvel an. Mes amis je vous aime tant !!!! version 3', '1', 'text', '2017-12-21 14:04:42'),
(15, '', 1, 'Bonjour à tous ! je crois que vous allez ? je vous souhaite bonne fête de nouvel an. Mes amis je vous aime tant !!!! version finale', '1', 'text', '2017-12-21 14:05:03'),
(16, '', 1, 'Bonjour à tous ! je crois que vous allez ? je vous souhaite bonne fête de nouvel an. Mes amis je vous aime tant !!!! version finale prime', '1', 'text', '2017-12-21 14:07:45'),
(17, '', 1, 'ioteghirghroghequogheoehg eghe gpehgeop heo eao eogjaeoejhpoejhoie phto eoejophehoeeo heohepoej hote hoieth jetohjtoi h etoiht ohth othjetioh tohtohithiojhiomhjmhflhfhngohrtohntrhiotr hzorjhrthojrtoihjrhiotrj tiohjtoip ht htohjt oht hott hoithj rtohtruh o ttoi tot hhe oi hjeoijet', '1', 'text', '2017-12-21 14:09:47'),
(18, '', 1, 'ioteghirghroghequogheoehg eghe gpehgeop heo eao eogjaeoejhpoejhoie phto eoejophehoeeo heohepoej hote hoieth jetohjtoi h etoiht ohth othjetioh tohtohithiojhiomhjmhflhfhngohrtohntrhiotr hzorjhrthojrtoihjrhiotrj tiohjtoip ht htohjt oht hott hoithj rtohtruh o ttoi tot hhe oi hjeoijet zkfhzuifhriughtughughefg', '1', 'text', '2017-12-21 14:10:04'),
(19, '', 1, 'ioteghirghroghequogheoehg eghe gpehgeop heo eao eogjaeoejhpoejhoie phto eoejophehoeeo heohepoej hote hoieth jetohjtoi h etoiht ohth othjetioh tohtohithiojhiomhjmhflhfhngohrtohntrhiotr hzorjhrthojrtoihjrhiotrj tiohjtoip ht htohjt oht hott hoithj rtohtruh o ttoi tot hhe oi hjeoijet zkfhzuifhriughtughughefgyngngngnfs rhthtsrh', '1', 'text', '2017-12-21 14:10:18'),
(20, '', 1, 'ioteghirghroghequogheoehg eghe gpehgeop heo eao eogjaeoejhpoejhoie phto eoejophehoeeo heohepoej hote hoieth jetohjtoi h etoiht ohth othjetioh tohtohithiojhiomhjmhflhfhngohrtohntrhiotr hzorjhrthojrtoihjrhiotrj tiohjtoip ht htohjt oht hott hoithj rtohtruh o ttoi tot hhe oi hjeoijet zkfhzuifhriughtughughefgyngngngnfs rhthtsrhgrrgergefv ergavgrgrg', '1', 'text', '2017-12-21 14:10:33'),
(21, 'First title', 1, 'Salut à tous je crois tout va bien maintenant !!!! Je vous souhaite les meilleurs le gars vous êtes les meilleurs !!!!!', '1', 'text', '2017-12-21 14:25:30'),
(22, 'First title', 1, 'Salut à tous je crois tout va bien maintenant !!!! Je vous souhaite les meilleurs le gars vous êtes les meilleurs !!!!! Peto!!!', '1', 'text', '2017-12-21 14:25:55'),
(23, 'Deuxieme title', 1, 'Salut à tous je crois tout va bien maintenant !!!! Je vous souhaite les meilleurs le gars vous êtes les meilleurs !!!!! Peto!!!', '1', 'text', '2017-12-21 14:26:25'),
(24, 'Troisième titre', 1, 'Cependant tous est devenu normal', '1', 'text', '2017-12-21 15:45:31'),
(25, 'Quatrième titre', 1, 'Trop simple', '1', 'text', '2017-12-21 15:47:00'),
(26, 'Bionic hand', 1, 'We are happy to announce that we are working on good project', '2', 'text', '2017-12-21 19:34:27'),
(27, 'Simpler', 8, 'Salut à tous !!!!', '2', 'text', '2017-12-24 13:42:40'),
(28, 'hhbb', 1, 'sggbsrfqfq', '1', 'image', '2017-12-26 22:06:15'),
(29, 'dbdfvc', 1, 'bfwbwfvwv', '1', 'image', '2017-12-26 22:09:39'),
(30, 'ggyuuiruru', 1, 'r-uèuèuu-u(u(--yr', '1', 'image', '2017-12-26 22:10:39'),
(31, 'hummm', 1, 'hummm', '1', 'image', '2017-12-26 22:12:21'),
(32, 'We are more than a team', 1, 'We are a family!', '1', 'image', '2017-12-26 23:02:42'),
(33, 'Stone Safety', 1, 'This one is now our partner!!', '1', 'image', '2017-12-26 23:06:04'),
(34, 'Good', 1, 'be simple', '1', 'image', '2017-12-26 23:06:59'),
(35, 'The brand is', 1, 'What people forget!!', '1', 'text', '2017-12-26 23:10:43'),
(36, 'Les deux', 1, 'Ils sont beaux !!', '1', 'image', '2017-12-27 06:32:29'),
(37, 'humm', 1, 'biso', '1', 'image', '2017-12-27 06:36:03'),
(38, 'hbi', 1, 'thanks', '1', 'image', '2017-12-27 09:58:16'),
(39, 'hbi', 1, 'peto', '1', 'text', '2017-12-27 10:08:05'),
(40, 'simple', 1, 'this is', '1', 'text', '2017-12-27 16:39:06'),
(41, 'ffgg', 1, 'gyjujj', '1', 'image', '2017-12-27 16:41:53'),
(42, 'I want it', 1, 'Listen to me', '1', 'text', '2017-12-27 17:54:09'),
(43, 'ok', 1, 'hhbi', '1', 'text', '2017-12-27 17:54:47'),
(44, 'llmp', 1, 'cours', '1', 'text', '2017-12-27 17:56:07'),
(45, 'Diskenda', 1, 'Tout va bien', '1', 'text', '2017-12-27 18:01:05'),
(46, 'Esimbi', 1, 'Dans le bon !!!', '1', 'text', '2017-12-27 18:05:05'),
(47, 'Fin cop', 1, 'Esimbi tembe esili !!!', '1', 'text', '2017-12-27 18:08:41'),
(48, 'We love Jesus', 2, 'New song is coming We''ll worship our God because is great!', '1', 'image', '2018-01-21 15:19:47'),
(49, 'ole !!', 1, 'La vie est belle !!', '1', 'image', '2018-05-30 15:34:36'),
(50, 'New Album!', 2, 'We annonce it!!', '1', 'image', '2018-06-16 00:16:10'),
(51, 'moi encore !', 1, 'we work on ti!!', '2', 'image', '2018-06-16 17:32:24'),
(52, 'no problem', 1, 'well', '2', 'image', '2018-06-16 17:39:19'),
(53, 'Twitter', 1, 'Social Network', '2', 'image', '2018-06-16 17:43:52'),
(54, 'LinkedIn', 1, 'Linked!!', '2', 'image', '2018-06-16 17:51:58'),
(55, 'YouTube', 1, 'Video !!!', '2', 'image', '2018-06-16 18:01:15'),
(56, 'Insta', 3, 'Picture is fine!', '2', 'image', '2018-06-17 13:47:17'),
(57, 'My best', 2, 'Please wait!', '2', 'image', '2018-06-17 13:49:39'),
(58, 'I.K. Services', 2, 'Cleanin'' services', '2', 'image', '2018-06-17 13:52:55'),
(59, 'The Brans is coming', 1, 'Stay Tuned!', '1', 'text', '2018-06-17 14:37:34'),
(60, 'Dans le bon !', 1, '123456789 !', '1', 'text', '2018-06-17 14:42:26'),
(61, 'Mec !', 1, '77445858569', '1', 'text', '2018-06-17 14:56:17'),
(62, 'Peto !', 1, '2252414142536', '1', 'text', '2018-06-17 14:57:21'),
(63, 'sded', 2, 'rtrfcvvcv', '2', 'text', '2018-06-17 15:00:22'),
(64, 'world', 1, 'azertyuiop', '2', 'image', '2018-06-17 15:04:39'),
(65, 'Diskenda', 1, 'Being here!', '1', 'image', '2018-07-20 14:43:18'),
(66, 'Other thing', 1, '123456', '1', 'image', '2018-07-20 14:43:40'),
(67, 'Belle image', 1, 'C''est si belle comme image !', '1', 'image', '2019-02-14 10:04:58'),
(68, 'Made something new', 1, 'You know me?', '1', 'image', '2019-07-19 13:01:37');

-- --------------------------------------------------------

--
-- Structure de la table `category`
--

CREATE TABLE IF NOT EXISTS `category` (
`id` bigint(15) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `date_added` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Contenu de la table `category`
--

INSERT INTO `category` (`id`, `name`, `description`, `date_added`) VALUES
(1, 'Programmation', 'Domaine de programmation des application informatique', '2017-09-06 10:47:08');

-- --------------------------------------------------------

--
-- Structure de la table `commentaire`
--

CREATE TABLE IF NOT EXISTS `commentaire` (
`id` bigint(11) NOT NULL,
  `sender_id` bigint(11) NOT NULL,
  `content` text NOT NULL,
  `article_id` bigint(11) NOT NULL,
  `date_added` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

--
-- Contenu de la table `commentaire`
--

INSERT INTO `commentaire` (`id`, `sender_id`, `content`, `article_id`, `date_added`) VALUES
(1, 1, 'C''est très bien ndeko', 26, '2017-12-25 19:35:00'),
(2, 1, 'peto', 47, '2017-12-31 10:11:00'),
(3, 2, 'dans le bon', 47, '2017-12-31 11:25:00'),
(4, 3, 'esimbi penza', 47, '2017-12-31 11:24:00'),
(5, 1, 'Evandi dans le peto', 0, '2018-01-02 13:27:12'),
(6, 1, 'We we !!', 0, '2018-01-03 10:06:01'),
(7, 1, 'bien', 0, '2018-01-03 10:10:27'),
(8, 1, 'humm ok', 0, '2018-01-03 10:11:51'),
(9, 1, 'peto', 46, '2018-01-03 10:12:45'),
(10, 1, 'Esali !!!', 46, '2018-01-03 10:14:35'),
(11, 1, 'Dans le bon mon frère !!', 45, '2018-01-21 14:59:01'),
(12, 1, 'Vraiment !!', 49, '2018-05-30 20:54:11'),
(13, 1, 'Bien bien', 49, '2018-05-30 20:54:43'),
(14, 1, 'tembe esili penza yaya !!', 47, '2018-06-15 23:59:22'),
(15, 1, 'Yes of course!', 68, '2019-07-19 13:11:05');

-- --------------------------------------------------------

--
-- Structure de la table `community`
--

CREATE TABLE IF NOT EXISTS `community` (
`id` bigint(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `canonical_name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `creator_id` bigint(11) NOT NULL,
  `vote` bigint(11) NOT NULL,
  `followers` bigint(11) NOT NULL,
  `nbr_comments` bigint(11) NOT NULL,
  `enabled` tinyint(1) NOT NULL,
  `hashtag_ids` varchar(255) NOT NULL,
  `creation_date` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

--
-- Contenu de la table `community`
--

INSERT INTO `community` (`id`, `name`, `canonical_name`, `description`, `creator_id`, `vote`, `followers`, `nbr_comments`, `enabled`, `hashtag_ids`, `creation_date`) VALUES
(1, 'Tosala', 'tosala', 'We love you!', 1, 5000, 7883201, 0, 1, '8,16,17,18,19', '2017-10-31 07:18:37'),
(2, 'The Money Boys', 'the-money-boys', 'We love music', 1, 6253, 2, 0, 1, '20,13,21,12', '2017-10-31 08:04:18'),
(3, 'Netic monde', 'netic-monde', 'Technology', 1, 3412, 11445523, 0, 1, '22', '2017-10-31 08:05:00'),
(4, 'Lover boy', 'lover-boy', 'jjuk', 1, 4422, 0, 0, 1, '16', '2017-10-31 19:49:50'),
(5, 'ok', 'ok', 'ghu', 1, 0, 0, 0, 1, '8,17,1,19,18', '2017-10-31 19:58:19'),
(6, 'bbhn', 'bbhn', 'ffdd', 1, 0, 0, 0, 1, '13', '2017-10-31 20:02:27'),
(7, 'Maurico firends', 'maurico-firends', 'nn', 1, 0, 0, 0, 1, '7,17', '2017-10-31 20:08:35'),
(8, 'Les amis de Guelord Mubenga', 'les-amis-de-guelord-mubenga', 'Une communauté qui relie tous les amis', 2, 0, 1, 0, 1, '23,24', '2017-12-20 20:50:17'),
(9, 'hbi', 'hbi', 'simple', 1, 0, 0, 0, 1, '22', '2018-01-10 14:27:11'),
(10, 'Stone Safety', 'stone-safety', 'Computer services', 2, 0, 1, 0, 1, '25,26,27', '2018-06-18 11:06:10'),
(11, 'Kevin Malonda Fans', 'kevine-malonda-fans', 'Kevin Official Community', 2, 0, 1, 0, 1, '28,29', '2018-06-18 11:22:14'),
(12, 'One Familly', 'one-familly', 'Familly', 2, 0, 1, 0, 1, '7', '2018-06-18 11:28:57'),
(13, 'Make Me Laugh', 'make-me-laugh', 'We come to this community to make people laugh so that they forget stress of day', 1, 0, 1, 0, 1, '30,31,32', '2019-07-18 09:04:45'),
(14, 'National Geographic', 'national-geographic', 'Une communauté simple et impulsif à comprendre', 1, 0, 1, 0, 1, '33,34,35', '2019-07-18 09:10:18');

-- --------------------------------------------------------

--
-- Structure de la table `following`
--

CREATE TABLE IF NOT EXISTS `following` (
`id` bigint(11) NOT NULL,
  `id_follower` bigint(11) NOT NULL,
  `id_community` bigint(11) NOT NULL,
  `enabled` tinyint(1) NOT NULL,
  `date_following` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;

--
-- Contenu de la table `following`
--

INSERT INTO `following` (`id`, `id_follower`, `id_community`, `enabled`, `date_following`) VALUES
(21, 1, 1, 1, '2017-10-30 10:48:33'),
(22, 2, 8, 0, '2017-12-24 13:45:53'),
(26, 2, 3, 0, '2018-06-17 13:46:00'),
(27, 2, 2, 1, '2018-06-17 13:48:04'),
(28, 2, 10, 1, '2018-06-18 11:06:10'),
(29, 2, 11, 1, '2018-06-18 11:22:14'),
(30, 2, 12, 1, '2018-06-18 11:28:57'),
(31, 1, 2, 0, '2019-02-13 13:24:46'),
(32, 1, 13, 1, '2019-07-18 09:04:46'),
(33, 1, 0, 1, '2019-07-18 09:10:18'),
(34, 1, 0, 1, '2019-07-18 09:12:18'),
(35, 1, 15, 0, '2019-07-18 12:29:31'),
(36, 1, 14, 0, '2019-07-19 12:59:21');

-- --------------------------------------------------------

--
-- Structure de la table `groupe`
--

CREATE TABLE IF NOT EXISTS `groupe` (
`id` bigint(15) NOT NULL,
  `numero` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `date_creation` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

--
-- Contenu de la table `groupe`
--

INSERT INTO `groupe` (`id`, `numero`, `name`, `date_creation`) VALUES
(2, '559767746', 'My new workspace', '2017-05-01 20:24:49'),
(3, '1070965430', 'Tosala Inc.', '2017-05-01 21:10:40'),
(5, '525602269', 'Hum Hum', '2017-05-30 16:27:04'),
(6, '178260947', 'The Brand establish', '2017-12-24 13:30:33'),
(7, '269338981', 'GitHub Tosala WorkSpace', '2019-02-12 12:55:49'),
(8, '1096537321', 'Worker 2.0', '2019-02-13 13:08:15');

-- --------------------------------------------------------

--
-- Structure de la table `hashtag`
--

CREATE TABLE IF NOT EXISTS `hashtag` (
`id` bigint(11) NOT NULL,
  `hashtag` varchar(255) NOT NULL,
  `date_added` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;

--
-- Contenu de la table `hashtag`
--

INSERT INTO `hashtag` (`id`, `hashtag`, `date_added`) VALUES
(1, 'soleil', '2017-10-30 19:43:03'),
(2, 'lune', '2017-10-30 19:43:03'),
(3, 'etoile', '2017-10-30 19:43:03'),
(4, 'etre', '2017-10-30 19:43:03'),
(5, '123', '2017-10-30 19:44:42'),
(6, '142', '2017-10-30 19:44:42'),
(7, 'simple', '2017-10-30 19:44:42'),
(8, 'js', '2017-10-30 19:47:58'),
(9, 'llo', '2017-10-30 19:47:58'),
(10, 'keba kuna', '2017-10-30 19:47:58'),
(11, 'oza kosala jeu', '2017-10-30 19:47:58'),
(12, 'r&b', '2017-10-30 19:56:56'),
(13, 'hip-hop', '2017-10-30 19:56:56'),
(14, 'java', '2017-10-30 20:10:27'),
(15, 'vb', '2017-10-30 20:10:27'),
(16, 'javascript', '2017-10-31 07:18:34'),
(17, 'php', '2017-10-31 07:18:34'),
(18, 'work', '2017-10-31 07:18:34'),
(19, 'electronic', '2017-10-31 07:18:34'),
(20, 'music', '2017-10-31 08:04:15'),
(21, 'rap', '2017-10-31 08:04:15'),
(22, 'technology', '2017-10-31 08:04:57'),
(23, 'guelord', '2017-12-20 20:50:14'),
(24, 'mubenga', '2017-12-20 20:50:14'),
(25, 'computer', '2018-06-18 11:06:07'),
(26, 'programming', '2018-06-18 11:06:07'),
(27, 'developpement', '2018-06-18 11:06:07'),
(28, 'football', '2018-06-18 11:22:11'),
(29, 'kevin malonda', '2018-06-18 11:22:11'),
(30, 'stress', '2019-07-18 09:04:42'),
(31, 'people', '2019-07-18 09:04:42'),
(32, 'best', '2019-07-18 09:04:42'),
(33, 'nat-geo', '2019-07-18 09:10:15'),
(34, 'culture', '2019-07-18 09:10:15'),
(35, 'sauvage', '2019-07-18 09:10:15');

-- --------------------------------------------------------

--
-- Structure de la table `invitation`
--

CREATE TABLE IF NOT EXISTS `invitation` (
`id` bigint(11) NOT NULL,
  `sender_id` bigint(11) NOT NULL,
  `receiver_id` bigint(11) NOT NULL,
  `group_id` bigint(11) NOT NULL,
  `status` enum('sent','received','rejected','canceled','agreed') NOT NULL,
  `day_delay` int(1) NOT NULL,
  `date_sent` datetime NOT NULL,
  `date_received` datetime DEFAULT NULL,
  `date_canceled` datetime DEFAULT NULL,
  `date_agreed` datetime DEFAULT NULL,
  `date_rejected` datetime DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

--
-- Contenu de la table `invitation`
--

INSERT INTO `invitation` (`id`, `sender_id`, `receiver_id`, `group_id`, `status`, `day_delay`, `date_sent`, `date_received`, `date_canceled`, `date_agreed`, `date_rejected`) VALUES
(1, 1, 2, 1, 'agreed', 3, '2017-05-02 13:34:31', '2017-05-02 14:23:47', NULL, '2017-05-02 16:17:20', '2017-05-02 13:33:43'),
(2, 1, 2, 1, 'agreed', 3, '2017-05-02 14:48:19', '2017-05-02 15:06:57', NULL, '2017-05-02 15:07:00', '2017-05-02 14:45:55'),
(3, 2, 3, 3, 'agreed', 3, '2017-05-08 09:52:43', '2017-05-08 09:53:16', NULL, '2017-05-08 09:53:23', NULL),
(4, 2, 3, 2, 'agreed', 3, '2017-05-08 12:53:02', '2017-05-31 18:04:52', NULL, '2017-05-31 18:04:57', NULL),
(5, 1, 5, 1, 'agreed', 3, '2017-05-30 15:23:55', '2017-05-30 11:22:35', NULL, '2017-05-30 16:17:38', '2017-05-30 11:23:29'),
(6, 1, 5, 4, 'agreed', 3, '2017-05-30 16:20:12', NULL, NULL, '2017-05-30 16:20:35', NULL),
(7, 5, 5, 5, 'rejected', 3, '2017-05-30 16:27:04', '2017-05-30 16:33:53', NULL, NULL, '2017-05-30 16:33:54'),
(8, 5, 1, 5, 'agreed', 3, '2017-05-30 16:33:06', '2017-05-30 16:37:22', NULL, '2017-05-30 16:57:18', NULL),
(9, 1, 5, 4, 'agreed', 3, '2017-06-09 12:58:15', '2017-06-09 13:01:00', NULL, '2017-06-09 13:01:25', NULL),
(10, 1, 5, 4, 'received', 3, '2017-06-09 13:04:28', '2017-06-09 13:08:37', NULL, '2017-06-09 13:04:38', NULL),
(11, 5, 3, 5, 'agreed', 3, '2017-07-14 20:01:00', '2017-07-14 20:02:17', NULL, '2017-07-14 20:02:20', NULL),
(12, 2, 1, 2, 'agreed', 3, '2017-09-16 10:10:00', '2017-09-16 10:10:16', NULL, '2017-09-16 10:10:22', NULL),
(13, 2, 7, 2, 'sent', 3, '2017-10-23 17:45:34', NULL, NULL, NULL, NULL),
(14, 1, 2, 6, 'sent', 3, '2017-12-24 13:30:33', NULL, NULL, NULL, NULL),
(15, 1, 2, 7, 'sent', 3, '2018-06-17 23:19:35', NULL, NULL, NULL, NULL),
(16, 1, 2, 7, 'sent', 3, '2019-02-12 12:55:49', NULL, NULL, NULL, NULL),
(17, 2, 1, 8, 'sent', 3, '2019-02-13 13:08:15', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `likes`
--

CREATE TABLE IF NOT EXISTS `likes` (
`id` bigint(11) NOT NULL,
  `sender_id` bigint(11) NOT NULL,
  `article_id` bigint(11) NOT NULL,
  `date_liked` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;

--
-- Contenu de la table `likes`
--

INSERT INTO `likes` (`id`, `sender_id`, `article_id`, `date_liked`) VALUES
(1, 1, 26, '2017-12-25 18:44:00'),
(2, 1, 25, '2017-12-25 21:48:05'),
(5, 1, 23, '2017-12-25 22:07:53'),
(13, 2, 23, '2017-12-25 22:19:36'),
(14, 2, 26, '2017-12-25 22:20:38'),
(15, 2, 20, '2017-12-25 22:20:55'),
(16, 1, 31, '2017-12-26 22:46:56'),
(17, 1, 32, '2017-12-27 06:25:39'),
(18, 2, 37, '2017-12-27 06:38:06'),
(19, 2, 36, '2017-12-27 06:38:14'),
(20, 2, 35, '2017-12-27 06:38:19'),
(21, 2, 34, '2017-12-27 06:38:21'),
(22, 2, 33, '2017-12-27 06:38:30'),
(24, 1, 41, '2017-12-29 12:22:05'),
(25, 1, 37, '2017-12-29 12:22:11'),
(26, 1, 47, '2018-01-02 00:02:11'),
(27, 1, 46, '2018-01-02 00:04:40'),
(28, 1, 27, '2018-01-10 14:23:44'),
(29, 1, 45, '2018-01-21 14:58:41'),
(30, 1, 49, '2018-05-30 19:34:04'),
(31, 1, 50, '2018-06-16 07:53:21'),
(32, 2, 60, '2018-06-17 14:42:38'),
(33, 2, 61, '2018-06-17 14:56:25'),
(36, 1, 64, '2018-06-17 15:04:46'),
(37, 1, 61, '2018-06-18 22:45:41'),
(38, 2, 58, '2018-06-18 22:50:03'),
(39, 1, 65, '2019-02-13 13:26:24'),
(40, 1, 66, '2019-02-13 13:26:32'),
(41, 1, 68, '2019-07-19 13:04:33');

-- --------------------------------------------------------

--
-- Structure de la table `login`
--

CREATE TABLE IF NOT EXISTS `login` (
`id` bigint(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `hash` varchar(255) NOT NULL,
  `last_login` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Contenu de la table `login`
--

INSERT INTO `login` (`id`, `email`, `password`, `hash`, `last_login`) VALUES
(1, 'henock.bongi@to-sala.com', '$2a$10$8gF7Qaa5uCtpkwSz8nyHMOwPyusxbyvxYrv1n0DHjYmgBuVj.oz4O', '$2a$10$8gF7Qaa5uCtpkwSz8nyHMO', '2017-04-10 16:10:03'),
(2, 'guelord.mubenga@to-sala.com', '$2a$10$U2jhkXgCE4su9WetHPQApefSOjdgMLlOl1dOAa/Re6rYY8TeEzQwC', '$2a$10$U2jhkXgCE4su9WetHPQApe', '2017-04-28 11:20:38'),
(3, 'math.kabanga@to-sala.com', '$2a$10$C4C5/opwUPRNdFgZww31Fu2ZxXTRn5m31QxlQOm8sIF85sfstdAZ2', '$2a$10$C4C5/opwUPRNdFgZww31Fu', '2017-05-08 09:39:23'),
(4, 'jonathan.bongi@gmail.com', '$2a$10$5NyBvYXjLMobz/ArKvCvfuVLO/zFk23oh/sCq9jnMGhIe/LdO1.6G', '$2a$10$5NyBvYXjLMobz/ArKvCvfu', '2017-05-28 19:29:38'),
(5, 'henock.mubenga@to-sala.com', '$2a$10$4ZVIn.CH8R1rmAOMdjK8N.3PbzQmsfl9fvg0sfJOCPLG60sdmUGTG', '$2a$10$4ZVIn.CH8R1rmAOMdjK8N.', '2017-05-28 19:46:17'),
(6, 'mpro@pro.cd', '$2a$10$fIO0o/62MLIuzu96ymwUUe2rVo/npdXR77uJ4wnrV2jvtLRAcPQx2', '$2a$10$fIO0o/62MLIuzu96ymwUUe', '2017-10-23 17:34:44'),
(7, 'mpro@kin.cd', '$2a$10$Vx.gzs40KaAAXETi3Nf3gOkwYVAiAjM5Yu4EkFEdPpHPuwaLqGiQK', '$2a$10$Vx.gzs40KaAAXETi3Nf3gO', '2017-10-23 17:39:52');

-- --------------------------------------------------------

--
-- Structure de la table `member`
--

CREATE TABLE IF NOT EXISTS `member` (
`id` bigint(11) NOT NULL,
  `num_group` varchar(255) NOT NULL,
  `user_id` bigint(11) NOT NULL,
  `is_admin` tinyint(1) NOT NULL,
  `is_creator` tinyint(1) NOT NULL,
  `date_added` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

--
-- Contenu de la table `member`
--

INSERT INTO `member` (`id`, `num_group`, `user_id`, `is_admin`, `is_creator`, `date_added`) VALUES
(2, '559767746', 2, 1, 1, '2017-05-01 20:24:49'),
(3, '1070965430', 2, 1, 1, '2017-05-01 21:10:40'),
(4, '1070965430', 1, 0, 0, '2017-05-02 11:56:11'),
(6, '1070965430', 3, 0, 0, '2017-05-08 09:53:23'),
(12, '559767746', 3, 0, 0, '2017-05-31 18:04:57'),
(15, '525602269', 3, 1, 1, '2017-07-14 20:02:20'),
(16, '559767746', 1, 1, 1, '2017-09-16 10:10:22'),
(19, '559767746', 7, 0, 0, '2017-10-23 18:12:59'),
(20, '178260947', 1, 1, 1, '2017-12-24 13:30:33'),
(21, '178260947', 2, 0, 0, '2017-12-24 13:33:40'),
(22, '269338981', 1, 1, 1, '2019-02-12 12:55:49'),
(23, '1096537321', 2, 1, 1, '2019-02-13 13:08:15'),
(24, '269338981', 2, 0, 0, '2019-02-13 13:14:33');

-- --------------------------------------------------------

--
-- Structure de la table `notification`
--

CREATE TABLE IF NOT EXISTS `notification` (
`id` bigint(11) NOT NULL,
  `id_from` bigint(11) NOT NULL,
  `id_to` bigint(11) NOT NULL,
  `tag` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `date_sent` datetime DEFAULT NULL,
  `date_received` datetime DEFAULT NULL,
  `date_read` datetime DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

--
-- Contenu de la table `notification`
--

INSERT INTO `notification` (`id`, `id_from`, `id_to`, `tag`, `status`, `date_sent`, `date_received`, `date_read`) VALUES
(1, 2, 1, 'is_new_member', 'read', '2017-05-30 11:54:00', '2017-05-30 12:00:00', '2019-02-13 12:52:19'),
(2, 5, 1, 'is_new_member', 'read', '2017-05-30 16:17:38', '2017-05-30 16:39:31', '2017-05-30 16:39:44'),
(3, 5, 1, 'is_new_member', 'read', '2017-05-30 16:20:36', '2017-05-30 16:39:58', '2017-06-01 18:01:19'),
(4, 1, 5, 'is_new_member', 'read', '2017-05-30 16:33:39', '2017-05-30 16:40:16', '2017-07-14 20:03:03'),
(5, 3, 2, 'is_new_member', 'read', '2017-05-31 18:04:57', '2017-09-16 10:10:55', '2017-09-16 10:10:57'),
(6, 5, 1, 'is_new_member', 'read', '2017-06-09 13:01:26', '2017-06-09 13:02:53', '2019-02-13 12:51:48'),
(7, 5, 1, 'is_new_member', 'read', '2017-06-09 13:04:38', '2017-06-09 13:04:49', '2018-05-14 18:46:32'),
(8, 3, 5, 'is_new_member', 'read', '2017-07-14 20:02:20', '2017-07-14 20:03:04', '2017-07-14 20:03:11'),
(9, 1, 2, 'is_new_member', 'read', '2017-09-16 10:10:22', '2017-09-16 10:10:41', '2017-09-16 10:10:54'),
(10, 7, 2, 'is_new_member', 'read', '2017-10-23 17:46:11', '2017-10-23 18:11:31', '2017-10-23 18:11:34'),
(11, 7, 2, 'is_new_member', 'read', '2017-10-23 17:56:56', '2017-10-23 18:11:35', '2017-10-23 18:11:37'),
(12, 7, 2, 'is_new_member', 'read', '2017-10-23 18:12:59', '2017-12-24 13:33:22', '2017-12-24 13:33:24'),
(13, 2, 1, 'is_new_member', 'read', '2017-12-24 13:33:41', '2017-12-25 22:22:59', '2019-02-13 13:13:53'),
(14, 2, 1, 'is_new_member', 'read', '2019-02-13 13:14:33', '2019-02-13 13:14:52', '2019-02-14 09:57:27');

-- --------------------------------------------------------

--
-- Structure de la table `number_normalization`
--

CREATE TABLE IF NOT EXISTS `number_normalization` (
`id` bigint(11) NOT NULL,
  `number` bigint(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `project`
--

CREATE TABLE IF NOT EXISTS `project` (
`id` bigint(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` enum('groupe','individual') NOT NULL,
  `category` bigint(11) NOT NULL,
  `group_id` bigint(11) NOT NULL,
  `description` text NOT NULL,
  `range_project` varchar(255) NOT NULL,
  `user_id` bigint(11) NOT NULL,
  `date_creation` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

--
-- Contenu de la table `project`
--

INSERT INTO `project` (`id`, `name`, `type`, `category`, `group_id`, `description`, `range_project`, `user_id`, `date_creation`) VALUES
(6, 'Tosala Group is working', 'groupe', 1, 1070965430, 'This project means', 'public', 2, '2017-09-15 14:25:24'),
(7, 'Make it better', 'groupe', 1, 1070965430, 'This project is about making things so simple', 'public', 1, '2017-10-01 21:46:43'),
(8, 'Winner game', 'individual', 1, 0, 'This game will allow to  users to get money', 'private', 1, '2017-10-02 07:03:16'),
(9, 'Premier projet', 'groupe', 1, 559767746, 'Un autre test', 'private', 1, '2017-10-23 18:35:00'),
(10, 'la seconde après', 'individual', 1, 0, '100%', 'private', 7, '2017-10-23 18:36:38'),
(11, 'Stone Messenger', 'individual', 1, 0, 'Simple messenger and road traffic notifier', 'private', 1, '2017-10-25 10:32:45'),
(12, 'Cory Chords', 'groupe', 1, 559767746, 'Diskenda', 'private', 1, '2017-10-25 10:40:59'),
(13, 'Benvenidos', 'groupe', 1, 1070965430, 'Bonjour', 'public', 1, '2017-10-25 10:41:35'),
(14, 'Mr. Le Président', 'groupe', 1, 269338981, 'Un jeu dont la base est liée aux événements à Kinshasa', 'private', 1, '2019-02-13 13:17:06');

-- --------------------------------------------------------

--
-- Structure de la table `skills`
--

CREATE TABLE IF NOT EXISTS `skills` (
`id` bigint(15) NOT NULL,
  `domain` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
`id` bigint(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `date_birth` varchar(255) NOT NULL,
  `place_birth` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `user_skills` bigint(15) NOT NULL,
  `date_creation` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Contenu de la table `user`
--

INSERT INTO `user` (`id`, `first_name`, `last_name`, `email`, `date_birth`, `place_birth`, `country`, `user_skills`, `date_creation`) VALUES
(1, 'Bongi', 'Henock', 'henock.bongi@to-sala.com', '26/09/1993', 'Kinshasa', 'Congo DR', 0, '2017-04-10 16:10:03'),
(2, 'Mubenga', 'Guelord', 'guelord.mubenga@to-sala.com', '26/03/1992', 'Kinshasa', 'Irland', 0, '2017-04-28 11:20:38'),
(3, 'Math', 'Kabanga', 'math.kabanga@to-sala.com', '01/02/1989', 'Kinshasa', 'DR Congo', 0, '2017-05-08 09:39:23'),
(4, 'Bongi', 'Jonathan', 'jonathan.bongi@gmail.com', '13/05/1965', 'Kinshasa', 'Tunisia', 0, '2017-05-28 19:29:38'),
(5, 'Mubenga', 'Henock', 'henock.mubenga@to-sala.com', '15/03/1994', 'Kinshasa', 'Congo DR', 0, '2017-05-28 19:46:17'),
(6, 'mpro', 'kilo', 'mpro@pro.cd', '02/02/1991', 'paradis', 'Rwanda', 0, '2017-10-23 17:34:44'),
(7, 'pokora', 'maat', 'mpro@kin.cd', '02/021974', 'paradis', 'ciel', 0, '2017-10-23 17:39:52');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `article`
--
ALTER TABLE `article`
 ADD PRIMARY KEY (`id`);

--
-- Index pour la table `category`
--
ALTER TABLE `category`
 ADD PRIMARY KEY (`id`);

--
-- Index pour la table `commentaire`
--
ALTER TABLE `commentaire`
 ADD PRIMARY KEY (`id`);

--
-- Index pour la table `community`
--
ALTER TABLE `community`
 ADD PRIMARY KEY (`id`);

--
-- Index pour la table `following`
--
ALTER TABLE `following`
 ADD PRIMARY KEY (`id`);

--
-- Index pour la table `groupe`
--
ALTER TABLE `groupe`
 ADD PRIMARY KEY (`id`);

--
-- Index pour la table `hashtag`
--
ALTER TABLE `hashtag`
 ADD PRIMARY KEY (`id`);

--
-- Index pour la table `invitation`
--
ALTER TABLE `invitation`
 ADD PRIMARY KEY (`id`);

--
-- Index pour la table `likes`
--
ALTER TABLE `likes`
 ADD PRIMARY KEY (`id`);

--
-- Index pour la table `login`
--
ALTER TABLE `login`
 ADD PRIMARY KEY (`id`);

--
-- Index pour la table `member`
--
ALTER TABLE `member`
 ADD PRIMARY KEY (`id`);

--
-- Index pour la table `notification`
--
ALTER TABLE `notification`
 ADD PRIMARY KEY (`id`);

--
-- Index pour la table `number_normalization`
--
ALTER TABLE `number_normalization`
 ADD PRIMARY KEY (`id`);

--
-- Index pour la table `project`
--
ALTER TABLE `project`
 ADD PRIMARY KEY (`id`);

--
-- Index pour la table `skills`
--
ALTER TABLE `skills`
 ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `article`
--
ALTER TABLE `article`
MODIFY `id` bigint(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=69;
--
-- AUTO_INCREMENT pour la table `category`
--
ALTER TABLE `category`
MODIFY `id` bigint(15) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT pour la table `commentaire`
--
ALTER TABLE `commentaire`
MODIFY `id` bigint(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT pour la table `community`
--
ALTER TABLE `community`
MODIFY `id` bigint(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT pour la table `following`
--
ALTER TABLE `following`
MODIFY `id` bigint(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=37;
--
-- AUTO_INCREMENT pour la table `groupe`
--
ALTER TABLE `groupe`
MODIFY `id` bigint(15) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT pour la table `hashtag`
--
ALTER TABLE `hashtag`
MODIFY `id` bigint(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=36;
--
-- AUTO_INCREMENT pour la table `invitation`
--
ALTER TABLE `invitation`
MODIFY `id` bigint(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT pour la table `likes`
--
ALTER TABLE `likes`
MODIFY `id` bigint(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=42;
--
-- AUTO_INCREMENT pour la table `login`
--
ALTER TABLE `login`
MODIFY `id` bigint(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT pour la table `member`
--
ALTER TABLE `member`
MODIFY `id` bigint(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT pour la table `notification`
--
ALTER TABLE `notification`
MODIFY `id` bigint(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT pour la table `number_normalization`
--
ALTER TABLE `number_normalization`
MODIFY `id` bigint(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `project`
--
ALTER TABLE `project`
MODIFY `id` bigint(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT pour la table `skills`
--
ALTER TABLE `skills`
MODIFY `id` bigint(15) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
MODIFY `id` bigint(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
