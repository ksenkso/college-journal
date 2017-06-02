-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1
-- Время создания: Сен 24 2016 г., 00:41
-- Версия сервера: 10.1.10-MariaDB
-- Версия PHP: 5.6.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `hours`
--

-- --------------------------------------------------------

--
-- Структура таблицы `hours`
--

CREATE TABLE `hours` (
  `id` int(11) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `student_id` int(11) NOT NULL,
  `hours` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `hours`
--

INSERT INTO `hours` (`id`, `date`, `student_id`, `hours`) VALUES
(26, '2016-09-24 00:00:00', 30, 0),
(27, '2016-09-24 00:00:00', 31, 0),
(28, '2016-09-24 00:00:00', 32, 0),
(29, '2016-09-24 00:00:00', 33, 0),
(30, '2016-09-24 00:00:00', 34, 0),
(31, '2016-09-24 00:00:00', 35, 0),
(32, '2016-09-24 00:00:00', 36, 0),
(33, '2016-09-24 00:00:00', 37, 0),
(34, '2016-09-24 00:00:00', 38, 0),
(35, '2016-09-24 00:00:00', 7, 1),
(36, '2016-09-24 00:00:00', 8, 4),
(37, '2016-09-24 00:00:00', 9, 0),
(38, '2016-09-24 00:00:00', 10, 2),
(39, '2016-09-24 00:00:00', 11, 0),
(40, '2016-09-24 00:00:00', 12, 2),
(41, '2016-09-24 00:00:00', 13, 3),
(42, '2016-09-24 00:00:00', 14, 0),
(43, '2016-09-24 00:00:00', 15, 2),
(44, '2016-09-24 00:00:00', 16, 0),
(45, '2016-09-24 00:00:00', 17, 0),
(46, '2016-09-24 00:00:00', 18, 0),
(47, '2016-09-24 00:00:00', 19, 0),
(48, '2016-09-24 00:00:00', 20, 0),
(49, '2016-09-24 00:00:00', 21, 0),
(50, '2016-09-24 00:00:00', 22, 0),
(51, '2016-09-24 00:00:00', 23, 0),
(52, '2016-09-24 00:00:00', 24, 0),
(53, '2016-09-24 00:00:00', 25, 0),
(54, '2016-09-24 00:00:00', 26, 0),
(55, '2016-09-24 00:00:00', 27, 0),
(56, '2016-09-24 00:00:00', 28, 0),
(57, '2016-09-24 00:00:00', 29, 0),
(58, '2016-09-24 00:00:00', 30, 0),
(59, '2016-09-24 00:00:00', 31, 0),
(60, '2016-09-24 00:00:00', 32, 0),
(61, '2016-09-24 00:00:00', 33, 0),
(62, '2016-09-24 00:00:00', 34, 0),
(63, '2016-09-24 00:00:00', 35, 0),
(64, '2016-09-24 00:00:00', 36, 0),
(65, '2016-09-24 00:00:00', 37, 0),
(66, '2016-09-24 00:00:00', 38, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `students`
--

CREATE TABLE `students` (
  `student_id` int(11) NOT NULL,
  `first_name` varchar(80) NOT NULL,
  `last_name` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `students`
--

INSERT INTO `students` (`student_id`, `first_name`, `last_name`) VALUES
(7, 'Константин', 'Арефьев'),
(8, 'Константин', 'Арефьев'),
(9, 'Константин', 'Арефьев'),
(10, 'Константин', 'Арефьев'),
(11, 'Константин', 'Арефьев'),
(12, 'Константин', 'Арефьев'),
(13, 'Константин', 'Арефьев'),
(14, 'Константин', 'Арефьев'),
(15, 'Константин', 'Арефьев'),
(16, 'Константин', 'Арефьев'),
(17, 'Константин', 'Арефьев'),
(18, 'Константин', 'Арефьев'),
(19, 'Константин', 'Арефьев'),
(20, 'Константин', 'Арефьев'),
(21, 'Константин', 'Арефьев'),
(22, 'Константин', 'Арефьев'),
(23, 'Константин', 'Арефьев'),
(24, 'Константин', 'Арефьев'),
(25, 'Константин', 'Арефьев'),
(26, 'Константин', 'Арефьев'),
(27, 'Константин', 'Арефьев'),
(28, 'Константин', 'Арефьев'),
(29, 'Константин', 'Арефьев'),
(30, 'Константин', 'Арефьев'),
(31, 'Константин', 'Арефьев'),
(32, 'Константин', 'Арефьев'),
(33, 'Константин', 'Арефьев'),
(34, 'Константин', 'Арефьев'),
(35, 'Константин', 'Арефьев'),
(36, 'Константин', 'Арефьев'),
(37, 'Константин', 'Арефьев'),
(38, 'Константин', 'Арефьев');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `hours`
--
ALTER TABLE `hours`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`);

--
-- Индексы таблицы `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`student_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `hours`
--
ALTER TABLE `hours`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;
--
-- AUTO_INCREMENT для таблицы `students`
--
ALTER TABLE `students`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;
--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `hours`
--
ALTER TABLE `hours`
  ADD CONSTRAINT `hours_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
