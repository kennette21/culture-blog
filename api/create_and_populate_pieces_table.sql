CREATE TABLE IF NOT EXISTS `pieces` (
  `id` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `content` varchar(200) NULL,
  `link` varchar(200) NOT NULL,
  `why` varchar(250) NULL,
  `category` varchar(200) NOT NULL,
  `tags` varchar(200) NULL,
  `who` varchar(200) NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE `pieces` ADD PRIMARY KEY (`id`);
ALTER TABLE `pieces` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

INSERT INTO `pieces` (`id`, `title`, `content`, `link`, `why`, `category`, `who`) VALUES
(1, 'Stevie G Slammin', 'steven gerrards cracken against olympiocos to send them into champs knockout 04-05 season', 'www.youtube.com/something/', 'because stevie G is a legend', 'watch', 'root'),
(2, 'Monster Mix', 'Vedat slamming the place into madness', 'www.soundcloud.com/vedats_profile', 'because vedat is next level dj', 'listen', 'root'),
(3, 'Beatiful architecture', 'Budapest has crazy architecture all over and people should appricieate', 'www.googledrive.com/my_bp_pics', 'because BP is jaw drapping', 'look', 'root');