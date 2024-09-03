-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 03, 2024 at 04:54 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `infopercept_crud`
--

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `pid` varchar(30) NOT NULL,
  `p_name` varchar(100) DEFAULT NULL,
  `p_description` varchar(100) DEFAULT NULL,
  `p_price` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`pid`, `p_name`, `p_description`, `p_price`) VALUES
('1234', 'Laptop', 'This is Delll Laptop', '40000'),
('21', 'Iphone', 'This is Apple Phone', '5000000'),
('23', 'edwq', 'asdsa', '432'),
('234', 'rew', 'rfewtgredsds', '3432'),
('2343', 'sadas', 'asdas', '432423');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `uid` varchar(20) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(150) DEFAULT NULL,
  `phoneNumber` varchar(12) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`uid`, `name`, `email`, `password`, `phoneNumber`) VALUES
('120', 'manish kumar', 'manish@gmail.com', '$2b$10$i8IW.UTr/DBRH5XF5fBaJuB1/gmEPhbUqCABu/r1YjEe8kLwvDw9K', '8207809054'),
('120', 'Arvind Kumar', 'arvind@gmail.com', '$2b$10$4NJ3diI.H.edleCVVT0oZ./nXnEKJViiSFyvfgTsg9aSpSFx/bRJe', '8707809054'),
('120', 'Nitis Kumar', 'nitis@gmail.com', '$2b$10$V4S/Y3bustNJmIoAdBqSHO8QQHxy/i2T6tuP.IM85eH11S83OBEaa', '8707809054'),
('120', 'Nitis Kumar', 'nitisqw@gmail.com', '$2b$10$JKL.Uo4gtqJdPMmR/RpLMOWfhzeNGxJ7Lv4Z0dekjKAShvJdkmnoO', '8707809054'),
('120', 'Nitis Kumar', 'nitisqwsaas@gmail.com', '$2b$10$kWVRcsyrHB/j8OJthfowZurIxboB9H6zS6J.8ri8DpZqyvVppIgVG', '8707809054'),
('221', 'sadas', 'mk820780ads@gmail.com', '$2b$10$prsvYykDJ1niZesO3jwbseP0RaD7Wi.1ezBvmwvQABSa4KSaf1adK', '03432114342'),
('221', 'sadas', 'mk820780adssdasd@gmail.com', '$2b$10$Y59DibVtXA6V5dJ71IEu6Oglb6PD42wZwZjW.RqlFNV0RGEWXQkVO', '03432114342'),
('221', 'sadas', 'mk820780adssdasdxsa@gmail.com', '$2b$10$DigTPr7eVdHHENVN0hjiwOd/21YYq32.x87Dsw4aECTKTFqyWSlra', '03432114342'),
('', '', '', '$2b$10$gtNbccG1CS6VBQDaj3Mur.yfkD2Z2baMtHB0q10cNXIAFjCQ9jceG', ''),
('1223', 'sad', 'asdsa@gmail.com', '$2b$10$hBQQ4xhGJAjPKRixEY1CYeB8xCIwn2rxmrWpbDps8bGCyO7keVH.q', '2322'),
('32343', 'sadas', 'das@gmail.com', '$2b$10$mZQRWN7hlmZpZEhHaK0dbuZQmgjSj2knLkFF5wGzum7knY.HrPMQC', '3434'),
('12343', 'sadas', 'sadsadas@gmail.com', '$2b$10$XFU6sKxwZTMdWojJeVCfCuyFroEU3.g0ZkjKrylASRTNaZ70lB50y', '23423432'),
('32131', 'ewqe', 'wqeewq@gmail.com', '$2b$10$IE9A/t66meNK7vU3Mv8rPOGrfBypzbSd6wZbIQWxGY2MvaI2cEs3.', '23424'),
('21323', 'eqweqw', 'asasdas@gmail.com', '$2b$10$3Z/qhkvXZfyN0T94RKNww.TfjL2IvKvtGYHfTMkHOt/224ZYgHVWm', '4234343'),
('43543', 'sdas', 'sdsa@gmail.com', '$2b$10$nnfRisu881/c0brtkic7zOhSNQjQYA94y6hLV4ucxqGZVxXlOKbXG', '3432432'),
('43543', 'sdas', 'sdsa12@gmail.com', '$2b$10$rDM2NOqf/OjmtJIRSZ93qe2.8FKRtNvK447tq6Hz1bmTK2ADAw9.2', '3432432'),
('43543', 'sdas', 'sdsa12zXZXz@gmail.com', '$2b$10$nPsjMj3p6JP7CoAUSPPKnOkPmyJZACH7.rmSXjL2fbXG/GpEhag6y', '3432432'),
('3423', 'sdsf', 'cdsfds@gmail.com', '$2b$10$jziVLb.1d1RjGK5bQXz6yeA1MrxbsubWu4oJsSigjhBteyVvH1Ccy', '3243534');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`pid`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD UNIQUE KEY `email` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
