-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 13 Agu 2021 pada 09.50
-- Versi server: 10.4.8-MariaDB
-- Versi PHP: 7.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `coffeeshop`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `categoryName` varchar(50) NOT NULL,
  `createAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `category`
--

INSERT INTO `category` (`id`, `categoryName`, `createAt`, `updatedAt`) VALUES
(1, 'favorite product', '2021-06-08 10:43:00', NULL),
(2, 'coffee', '2021-05-26 07:29:38', NULL),
(3, 'non coffee', '2021-05-27 13:16:19', NULL),
(4, 'food', '2021-05-26 07:30:11', NULL),
(5, 'add on', '2021-05-27 13:16:37', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `item`
--

DROP TABLE IF EXISTS `item`;
CREATE TABLE `item` (
  `id` int(30) NOT NULL,
  `productName` varchar(255) DEFAULT NULL,
  `price` int(50) DEFAULT NULL,
  `deliveryCondition` varchar(50) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `picture` longtext DEFAULT NULL,
  `createAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `item`
--

INSERT INTO `item` (`id`, `productName`, `price`, `deliveryCondition`, `description`, `stock`, `picture`, `createAt`, `updatedAt`) VALUES
(1, 'cold brew', 12000, 'saturday to friday 10pm to 12am', 'Cold Brew Coffee is a smooth, cold beverage prepared by brewing freshly ground coffee in cold water. In the Cold Brew process, time makes up for heat.', 17, '/upload/1624264092742.jpg', '2021-05-26 10:48:55', '2021-06-21 08:28:12'),
(2, 'affogato', 18000, ' monday to sunday 10pm to 12am', 'Espresso poured on a vanilla ice cream. Served in a cappuccino cup.\r\n', 15, '/upload/1624264107890.jpg', '2021-05-26 07:31:06', '2021-06-21 08:28:27'),
(3, 'irish coffee', 24000, 'saturday to friday 7pm to  9am', 'Classic coffee coctail where Irish whiskey is mixed with filter coffee and topped with thin layer of gently whipped cream.\r\n', 10, '/upload/1624264120870.jpg', '2021-05-27 15:37:10', '2021-06-21 08:28:40'),
(4, 'caffe latte', 10000, 'sunday to friday 08pm to 10am', 'A tall, mild \'milk coffee\' (about 150-300 ml). An espresso with steamed milk and only a little milk foam poured over it. Serve in a latte glass or a coffee cup. Flavoured syrup can be added. \r\n', 15, '/upload/1624264136175.jpg', '2021-05-30 10:50:46', '2021-06-21 08:28:56'),
(5, 'caffe mocha', 19000, 'saturday 7pm to friday 9am', 'A caffè latte with chocolate and whipped cream, made by pouring about 2 cl of chocolate sauce into the glass, followed by an espresso shot and steamed milk. \r\n', 11, '/upload/1624264144281.jpg', '2021-05-31 13:58:49', '2021-06-21 08:29:04'),
(6, 'espresso', 23000, 'saturday 7pm to friday 9am', 'A short, strong drink (about 30 ml) served in an espresso cup.\r\n', 29, '/upload/1624264156862.jpg', '2021-05-31 14:03:05', '2021-06-21 08:29:16'),
(7, 'Oolong tea', 25000, ' monday to sunday 10pm to 12am', 'Oolong is a semi-oxidized tea that can vary depending on the leaf style, level of oxidation, color, and the roasting degree.\r\n', 12, '/upload/1624264169862.jpg', '2021-05-31 14:03:05', '2021-06-21 08:29:29'),
(8, 'Maghrebi mint tea', 26000, 'saturday 7pm to friday 9am', 'Maghrebi mint tea is the most common term used to denote the generously sweetened combination of green tea and fresh spearmint.', 23, '/upload/1624264182684.jpg', '2021-05-31 14:03:05', '2021-06-21 08:29:42'),
(9, 'cachaca', 19000, 'sunday to friday 08pm to 10am', 'Cachaça is a popular Brazilian drink that is distilled from freshly pressed and fermented sugar cane juice', 21, '/upload/1624264196560.jpg', '2021-05-31 14:03:05', '2021-06-21 08:29:56'),
(10, 'Potato Skins', 35000, ' monday to sunday 10pm to 12am', 'Crispy, carby, ooey-gooey, salty. Potato skins fulfill every demand we have for the perfect snack', 13, '/upload/1624264209831.jpg', '2021-05-31 14:03:05', '2021-06-21 08:30:09'),
(11, 'Rib-Eye Steak', 40000, 'saturday 7pm to friday 9am', 'One of America\'s best-loved chain restaurants earned that position with its premium cuts of meat cooked to perfection.', 21, '/upload/1624264234248.jpg', '2021-05-31 14:03:05', '2021-06-21 08:30:34'),
(13, 'Carrabba\'s Italian Grill', 55000, ' monday to sunday 10pm to 12am', 'What gets you here is a wood-fired grill that infuses all of its meat dishes with smoky goodness. That flavor is part of what makes Chicken Bryan Carrabba\'s customer favorite.', 21, '/upload/1624264250121.jpg', '2021-05-31 14:03:05', '2021-06-21 08:30:50'),
(15, 'Chicken Tender Platter', 55000, ' monday to sunday 10pm to 12am', 'These juicy boneless tenders come crispy and are available in classic, buffalo, or \"honey hot\" sauces, and they\'re paired with fries.', 55, '/upload/1624264267106.jpeg', '2021-05-31 14:03:05', '2021-06-21 08:31:07'),
(107, 'Mineral Water', 10000, 'saturday to friday 10pm to 12am', 'Mineral water originally from high mountain', 20, '/upload/1624263871796.jpg', '2021-06-21 04:51:08', '2021-06-21 08:24:31');

-- --------------------------------------------------------

--
-- Struktur dari tabel `item_transaction`
--

DROP TABLE IF EXISTS `item_transaction`;
CREATE TABLE `item_transaction` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `price` int(11) NOT NULL,
  `variants` varchar(50) DEFAULT NULL,
  `amount` int(11) NOT NULL,
  `id_item` int(11) NOT NULL,
  `id_transaction` int(11) NOT NULL,
  `createAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `item_transaction`
--

INSERT INTO `item_transaction` (`id`, `name`, `price`, `variants`, `amount`, `id_item`, `id_transaction`, `createAt`, `updatedAt`) VALUES
(1, 'affogato', 18000, NULL, 1, 2, 1, '2021-06-26 08:56:13', NULL),
(7, 'espresso', 23000, NULL, 1, 6, 3, '2021-06-26 09:00:13', NULL),
(8, 'Oolong tea', 25000, NULL, 1, 7, 3, '2021-06-26 09:00:14', NULL),
(9, 'Chicken Tender Platter', 55000, NULL, 1, 15, 3, '2021-06-26 09:00:14', NULL),
(11, 'affogato', 18000, NULL, 1, 2, 5, '2021-06-28 04:06:40', NULL),
(12, 'cold brew', 12000, NULL, 1, 1, 6, '2021-07-13 15:17:34', NULL),
(13, 'affogato', 18000, NULL, 1, 2, 6, '2021-07-13 15:17:34', NULL),
(14, 'cold brew', 12000, NULL, 1, 1, 7, '2021-07-13 15:19:21', NULL),
(15, 'affogato', 18000, NULL, 1, 2, 7, '2021-07-13 15:19:21', NULL),
(16, 'affogato', 18000, NULL, 2, 2, 8, '2021-07-13 15:24:52', NULL),
(17, 'affogato', 18000, NULL, 2, 2, 9, '2021-07-13 16:36:04', NULL),
(18, 'affogato', 18000, NULL, 2, 2, 10, '2021-07-14 02:50:52', NULL),
(19, 'Maghrebi mint tea', 26000, NULL, 3, 8, 11, '2021-07-14 04:10:03', NULL),
(20, 'Rib-Eye Steak', 40000, NULL, 2, 11, 11, '2021-07-14 04:10:03', NULL),
(21, 'affogato', 18000, NULL, 1, 2, 12, '2021-07-14 04:25:17', NULL),
(22, 'affogato', 18000, NULL, 1, 2, 13, '2021-07-14 09:55:31', NULL),
(23, 'affogato', 18000, NULL, 1, 2, 14, '2021-07-14 09:56:33', NULL),
(24, 'affogato', 18000, NULL, 1, 2, 15, '2021-07-14 09:56:38', NULL),
(25, 'affogato', 18000, NULL, 1, 2, 16, '2021-07-14 09:57:19', NULL),
(26, 'affogato', 18000, NULL, 1, 2, 17, '2021-07-14 09:57:50', NULL),
(27, 'affogato', 18000, NULL, 1, 2, 18, '2021-07-14 09:58:33', NULL),
(28, 'affogato', 18000, NULL, 1, 2, 19, '2021-07-14 09:58:44', NULL),
(29, 'affogato', 18000, NULL, 1, 2, 20, '2021-07-14 10:01:22', NULL),
(30, 'affogato', 18000, NULL, 1, 2, 21, '2021-07-14 10:01:25', NULL),
(31, 'affogato', 18000, NULL, 1, 2, 22, '2021-07-14 10:01:28', NULL),
(32, 'Maghrebi mint tea', 26000, NULL, 1, 8, 23, '2021-07-14 10:01:56', NULL),
(33, 'affogato', 18000, NULL, 1, 2, 24, '2021-07-14 10:05:26', NULL),
(34, 'Maghrebi mint tea', 26000, NULL, 1, 8, 24, '2021-07-14 10:05:26', NULL),
(35, 'affogato', 18000, NULL, 1, 2, 25, '2021-07-14 10:06:17', NULL),
(36, 'Maghrebi mint tea', 26000, NULL, 1, 8, 25, '2021-07-14 10:06:17', NULL),
(37, 'cold brew', 12000, NULL, 1, 1, 26, '2021-07-14 10:12:30', NULL),
(38, 'affogato', 18000, NULL, 1, 2, 27, '2021-07-14 10:13:42', NULL),
(39, 'affogato', 18000, NULL, 1, 2, 28, '2021-07-14 10:16:46', NULL),
(40, 'affogato', 18000, NULL, 1, 2, 29, '2021-07-14 10:23:29', NULL),
(41, 'affogato', 18000, NULL, 1, 2, 30, '2021-07-14 10:24:00', NULL),
(42, 'affogato', 18000, NULL, 1, 2, 31, '2021-07-22 06:21:50', NULL),
(43, 'cold brew', 12000, NULL, 1, 1, 32, '2021-07-24 13:59:29', NULL),
(44, 'cold brew', 12000, NULL, 1, 1, 33, '2021-07-27 07:29:06', NULL),
(45, 'Oolong tea', 25000, NULL, 1, 7, 33, '2021-07-27 07:29:06', NULL),
(46, 'Maghrebi mint tea', 26000, NULL, 1, 8, 33, '2021-07-27 07:29:06', NULL),
(47, 'Oolong tea', 25000, NULL, 1, 7, 34, '2021-07-27 07:30:15', NULL),
(48, 'espresso', 23000, NULL, 1, 6, 35, '2021-07-27 07:31:55', NULL),
(49, 'caffe mocha', 19000, NULL, 1, 5, 36, '2021-07-27 07:32:45', NULL),
(50, 'cold brew', 12000, NULL, 4, 1, 37, '2021-07-29 15:33:05', NULL),
(51, 'cold brew', 12000, NULL, 1, 1, 38, '2021-08-03 10:58:36', NULL),
(52, 'cold brew', 12000, NULL, 2, 1, 39, '2021-08-03 10:59:34', NULL),
(53, 'affogato', 18000, NULL, 1, 2, 40, '2021-08-03 10:59:51', NULL),
(54, 'Rib-Eye Steak', 40000, NULL, 5, 11, 40, '2021-08-03 10:59:51', NULL),
(55, 'caffe mocha', 19000, NULL, 1, 5, 41, '2021-08-03 11:02:49', NULL),
(56, 'Maghrebi mint tea', 26000, NULL, 1, 8, 41, '2021-08-03 11:02:49', NULL),
(57, 'cachaca', 19000, NULL, 1, 9, 41, '2021-08-03 11:02:49', NULL),
(58, 'Rib-Eye Steak', 40000, NULL, 1, 11, 41, '2021-08-03 11:02:49', NULL),
(59, 'Mineral Water', 10000, NULL, 1, 107, 41, '2021-08-03 11:02:49', NULL),
(60, 'Rib-Eye Steak', 40000, NULL, 1, 11, 42, '2021-08-03 11:03:17', NULL),
(61, 'Oolong tea', 25000, NULL, 1, 7, 43, '2021-08-03 11:03:35', NULL),
(62, 'Rib-Eye Steak', 40000, NULL, 1, 11, 43, '2021-08-03 11:03:35', NULL),
(63, 'Oolong tea', 25000, NULL, 1, 7, 44, '2021-08-03 11:04:44', NULL),
(64, 'caffe mocha', 19000, NULL, 3, 5, 45, '2021-08-03 13:07:45', NULL),
(65, 'caffe mocha', 19000, NULL, 3, 5, 46, '2021-08-03 13:14:30', NULL),
(66, 'cold brew', 12000, NULL, 3, 1, 47, '2021-08-04 02:45:28', NULL),
(67, 'cold brew', 12000, NULL, 3, 1, 48, '2021-08-04 02:46:22', NULL),
(68, 'affogato', 18000, NULL, 1, 2, 48, '2021-08-04 02:46:22', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `product_category`
--

DROP TABLE IF EXISTS `product_category`;
CREATE TABLE `product_category` (
  `id` int(11) NOT NULL,
  `id_product` int(11) DEFAULT NULL,
  `id_category` int(11) DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `product_category`
--

INSERT INTO `product_category` (`id`, `id_product`, `id_category`, `createAt`, `updatedAt`) VALUES
(3, 1, 1, '2021-06-08 10:47:56', NULL),
(4, 1, 2, '2021-06-08 10:47:56', NULL),
(5, 2, 1, '2021-06-08 11:19:01', NULL),
(6, 2, 2, '2021-06-08 11:19:01', NULL),
(7, 3, 2, '2021-06-08 11:27:53', NULL),
(8, 4, 2, '2021-06-08 11:27:53', NULL),
(9, 5, 1, '2021-06-08 11:28:16', NULL),
(10, 5, 2, '2021-06-08 11:28:16', NULL),
(11, 6, 2, '2021-06-08 11:28:32', NULL),
(12, 7, 3, '2021-06-08 11:28:32', NULL),
(13, 8, 3, '2021-06-08 11:30:32', NULL),
(14, 9, 3, '2021-06-08 11:30:32', NULL),
(15, 9, 1, '2021-06-08 11:30:47', NULL),
(16, 10, 4, '2021-06-08 11:30:47', NULL),
(17, 11, 4, '2021-06-08 11:31:01', NULL),
(20, 13, 4, '2021-06-08 11:31:21', NULL),
(21, 13, 1, '2021-06-08 11:31:34', NULL),
(22, 15, 4, '2021-06-08 11:31:34', NULL),
(89, 107, 5, '2021-06-21 04:51:08', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `product_variants`
--

DROP TABLE IF EXISTS `product_variants`;
CREATE TABLE `product_variants` (
  `id` int(11) NOT NULL,
  `id_product` int(11) DEFAULT NULL,
  `id_variants` int(11) DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `product_variants`
--

INSERT INTO `product_variants` (`id`, `id_product`, `id_variants`, `createAt`, `updatedAt`) VALUES
(3, 1, 1, '2021-06-08 10:48:57', NULL),
(4, 1, 2, '2021-06-08 10:48:57', NULL),
(5, 1, 3, '2021-06-08 10:48:57', NULL),
(6, 2, 1, '2021-06-08 10:48:57', NULL),
(7, 2, 2, '2021-06-08 10:48:57', NULL),
(8, 2, 3, '2021-06-08 10:48:57', NULL),
(9, 3, 1, '2021-06-08 11:32:42', NULL),
(13, 3, 2, '2021-06-08 11:33:15', NULL),
(14, 3, 3, '2021-06-08 11:33:15', NULL),
(15, 4, 1, '2021-06-08 11:34:30', NULL),
(16, 4, 2, '2021-06-08 11:34:30', NULL),
(17, 4, 3, '2021-06-08 11:34:30', NULL),
(18, 5, 1, '2021-06-08 11:35:08', NULL),
(19, 5, 2, '2021-06-08 11:35:08', NULL),
(20, 5, 3, '2021-06-08 11:35:08', NULL),
(21, 6, 1, '2021-06-08 11:35:08', NULL),
(22, 6, 2, '2021-06-08 11:35:08', NULL),
(23, 6, 3, '2021-06-08 11:35:08', NULL),
(24, 7, 1, '2021-06-08 11:35:08', NULL),
(25, 7, 2, '2021-06-08 11:35:08', NULL),
(26, 7, 3, '2021-06-08 11:35:08', NULL),
(27, 8, 1, '2021-06-08 11:35:08', NULL),
(28, 8, 2, '2021-06-08 11:35:08', NULL),
(29, 8, 3, '2021-06-08 11:35:08', NULL),
(30, 9, 1, '2021-06-08 11:35:08', NULL),
(31, 9, 2, '2021-06-08 11:35:08', NULL),
(32, 9, 3, '2021-06-08 11:35:08', NULL),
(33, 10, 1, '2021-06-08 11:35:08', NULL),
(34, 10, 2, '2021-06-08 11:35:08', NULL),
(35, 10, 3, '2021-06-08 11:35:08', NULL),
(36, 11, 4, '2021-06-08 11:35:08', NULL),
(37, 11, 5, '2021-06-08 11:35:08', NULL),
(38, 11, 6, '2021-06-08 11:35:08', NULL),
(39, 12, 4, '2021-06-08 11:35:08', NULL),
(40, 12, 5, '2021-06-08 11:35:08', NULL),
(41, 12, 6, '2021-06-08 11:35:08', NULL),
(42, 13, 4, '2021-06-08 11:35:08', NULL),
(43, 13, 5, '2021-06-08 11:35:08', NULL),
(44, 13, 6, '2021-06-08 11:35:08', NULL),
(45, 15, 4, '2021-06-08 11:35:08', NULL),
(46, 15, 5, '2021-06-08 11:35:08', NULL),
(47, 15, 6, '2021-06-08 11:35:08', NULL),
(150, 104, 1, '2021-06-16 02:48:44', NULL),
(151, 104, 2, '2021-06-16 02:48:44', NULL),
(152, 104, 3, '2021-06-16 02:48:45', NULL),
(153, 105, 1, '2021-06-16 02:49:05', NULL),
(154, 105, 2, '2021-06-16 02:49:05', NULL),
(155, 105, 3, '2021-06-16 02:49:05', NULL),
(156, 106, 1, '2021-06-16 04:20:38', NULL),
(157, 106, 2, '2021-06-16 04:20:38', NULL),
(158, 106, 3, '2021-06-16 04:20:38', NULL),
(159, 107, 1, '2021-06-21 04:51:08', NULL),
(160, 107, 2, '2021-06-21 04:51:08', NULL),
(161, 107, 3, '2021-06-21 04:51:08', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `transaction`
--

DROP TABLE IF EXISTS `transaction`;
CREATE TABLE `transaction` (
  `id` int(11) NOT NULL,
  `code` varchar(80) NOT NULL,
  `total` int(10) NOT NULL,
  `tax` int(10) NOT NULL,
  `shipping_cost` int(11) DEFAULT NULL,
  `shipping_address` text DEFAULT NULL,
  `payment_method` varchar(50) NOT NULL,
  `id_user` int(11) NOT NULL,
  `createAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `transaction`
--

INSERT INTO `transaction` (`id`, `code`, `total`, `tax`, `shipping_cost`, `shipping_address`, `payment_method`, `id_user`, `createAt`, `updatedAt`) VALUES
(45, 'CS/382021/1', 57000, 5700, 10000, 'jl mawar no 9', 'Cash on delivery', 36, '2021-08-03 13:07:45', NULL),
(46, 'CS/382021/1', 57000, 5700, 10000, 'jl mawar no 9', 'Card', 36, '2021-08-03 13:14:30', NULL),
(47, 'CS/482021/1', 36000, 3600, 10000, 'jl mawar no 9', 'Cash on delivery', 36, '2021-08-04 02:45:28', NULL),
(48, 'CS/482021/1', 54000, 5400, 10000, 'jl mawar no 9', 'Bank account', 36, '2021-08-04 02:46:22', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `role` varchar(80) NOT NULL DEFAULT '''General''',
  `userName` varchar(255) DEFAULT NULL,
  `firstName` varchar(80) DEFAULT NULL,
  `lastName` varchar(80) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phoneNumber` varchar(50) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `createAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id`, `role`, `userName`, `firstName`, `lastName`, `email`, `password`, `phoneNumber`, `picture`, `address`, `createAt`, `updatedAt`) VALUES
(36, 'Admin', 'admin', 'admin', 'admin', 'admin@gmail.com', '$2b$10$pf4xWA0SsXfVUFh.pSsE3us682cH2tGGQnRR4nvWbBReZkzis9MMu', '089636597045', '/upload/image-1628045016318.jpg', 'jl mawar no 9', '2021-07-23 10:30:42', '2021-08-04 02:43:36');

-- --------------------------------------------------------

--
-- Struktur dari tabel `variants`
--

DROP TABLE IF EXISTS `variants`;
CREATE TABLE `variants` (
  `id` int(11) NOT NULL,
  `variantsName` varchar(30) NOT NULL,
  `code` varchar(50) DEFAULT NULL,
  `aditional_price` int(20) DEFAULT NULL,
  `createAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `variants`
--

INSERT INTO `variants` (`id`, `variantsName`, `code`, `aditional_price`, `createAt`, `updatedAt`) VALUES
(1, 'reguler', 'R', 0, '2021-06-09 12:08:40', NULL),
(2, 'large', 'L', 2000, '2021-06-09 12:08:40', NULL),
(3, 'extra large', 'XL', 5000, '2021-06-09 12:08:40', NULL),
(4, 'non spicy', 'NS', 0, '2021-06-10 17:26:48', NULL),
(5, 'spicy', 'S', 3000, '2021-06-10 17:27:41', NULL),
(6, 'extra spicy', 'ES', 5000, '2021-06-10 17:27:49', NULL);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `item_transaction`
--
ALTER TABLE `item_transaction`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `product_category`
--
ALTER TABLE `product_category`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `product_variants`
--
ALTER TABLE `product_variants`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `variants`
--
ALTER TABLE `variants`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT untuk tabel `item`
--
ALTER TABLE `item`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;

--
-- AUTO_INCREMENT untuk tabel `item_transaction`
--
ALTER TABLE `item_transaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT untuk tabel `product_category`
--
ALTER TABLE `product_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- AUTO_INCREMENT untuk tabel `product_variants`
--
ALTER TABLE `product_variants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=162;

--
-- AUTO_INCREMENT untuk tabel `transaction`
--
ALTER TABLE `transaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT untuk tabel `variants`
--
ALTER TABLE `variants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
