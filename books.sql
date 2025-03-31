-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- ホスト: localhost:8889
-- 生成日時: 2025 年 3 月 31 日 11:32
-- サーバのバージョン： 8.0.40
-- PHP のバージョン: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- データベース: `books`
--

-- --------------------------------------------------------

--
-- テーブルの構造 `books`
--

CREATE TABLE `books` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `author_id` int DEFAULT NULL,
  `description` text,
  `image_name` varchar(255) DEFAULT NULL,
  `genre` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- テーブルのデータのダンプ `books`
--

INSERT INTO `books` (`id`, `title`, `author_id`, `description`, `image_name`, `genre`) VALUES
(2, 'Snow Country', 2, NULL, 'Snow-country.jpg', 'literature'),
(3, 'The Temple of the Golden Pavilion', 3, 'This is my fav', 'The-temple.jpg', 'literature'),
(4, 'I Am a Cat', 4, NULL, 'Iam-a-cat.jpg', NULL),
(7, 'No Longer Human', 1, 'A novel by Osamu Dazai about a man’s psychological struggles and existential crisis.', 'No-longer-human.jpg', 'Fiction');

--
-- ダンプしたテーブルのインデックス
--

--
-- テーブルのインデックス `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`),
  ADD KEY `author_id` (`author_id`);

--
-- ダンプしたテーブルの AUTO_INCREMENT
--

--
-- テーブルの AUTO_INCREMENT `books`
--
ALTER TABLE `books`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- ダンプしたテーブルの制約
--

--
-- テーブルの制約 `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `books_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `authors` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
