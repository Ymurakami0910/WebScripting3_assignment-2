-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- ホスト: localhost:8889
-- 生成日時: 2025 年 4 月 15 日 02:00
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
-- テーブルの構造 `authors`
--

CREATE TABLE `authors` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `bio` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- テーブルのデータのダンプ `authors`
--

INSERT INTO `authors` (`id`, `name`, `bio`) VALUES
(1, 'Osamu Dazai', 'Bio of Osamu Dazai'),
(2, 'Yasunari Kawabata', 'Bio of Yasunari Kawabata'),
(3, 'Yukio Mishima', 'Bio of Yukio Mishima'),
(4, 'Natsume Soseki', 'Bio of Natsume Soseki'),
(5, 'Haruki Murakami', 'Bio of Haruki Murakami');

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
  `genre` varchar(255) DEFAULT NULL,
  `user_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- テーブルのデータのダンプ `books`
--

INSERT INTO `books` (`id`, `title`, `author_id`, `description`, `image_name`, `genre`, `user_id`) VALUES
(2, 'Snow Country', 2, 'I have read this book ', 'Snow-country.jpg', 'literature', NULL),
(3, 'The Temple of the Golden Pavilion', 3, 'SAD!!!!!', 'The-temple.jpg', 'literature', NULL),
(4, 'I Am a Cat', 4, NULL, 'Iam-a-cat.jpg', NULL, NULL),
(17, 'Hi', 4, 'HI　Im Yuri', '1744681036218.png', NULL, 1);

-- --------------------------------------------------------

--
-- テーブルの構造 `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- テーブルのデータのダンプ `users`
--

INSERT INTO `users` (`id`, `email`, `password`) VALUES
(1, 'loey1127yun@gmail.com', '$2b$10$wKUSkqFyFW.FFxyQVyCrnOp/pec/OiUoxgUYDjQeZToc5vpjfu2mK'),
(2, 'ymurakami3@my.bcit.ca', '$2b$10$SM9cGcSTHRaqgUMhqnHL/Ogg0F44.B39XdgufwxysMSuhcGVbDMPC'),
(3, 'h@hello.com', '$2b$10$0INrtTzSdT3Q7.fBMM/HduEXHmkDAaWyoNky9EBaaihZ7iHiM.wau');

--
-- ダンプしたテーブルのインデックス
--

--
-- テーブルのインデックス `authors`
--
ALTER TABLE `authors`
  ADD PRIMARY KEY (`id`);

--
-- テーブルのインデックス `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`),
  ADD KEY `author_id` (`author_id`),
  ADD KEY `fk_books_user` (`user_id`);

--
-- テーブルのインデックス `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- ダンプしたテーブルの AUTO_INCREMENT
--

--
-- テーブルの AUTO_INCREMENT `authors`
--
ALTER TABLE `authors`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- テーブルの AUTO_INCREMENT `books`
--
ALTER TABLE `books`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- テーブルの AUTO_INCREMENT `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- ダンプしたテーブルの制約
--

--
-- テーブルの制約 `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `books_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `authors` (`id`),
  ADD CONSTRAINT `fk_books_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
