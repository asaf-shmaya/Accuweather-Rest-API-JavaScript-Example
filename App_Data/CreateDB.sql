USE [master]
GO
/****** Object:  Database [AccuweatherDB]    Script Date: 12/15/2019 20:02:04 ******/
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'AccuweatherDB')
BEGIN
CREATE DATABASE [AccuweatherDB] ON  PRIMARY 
( NAME = N'AccuweatherDB', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL10_50.SQLEXPRESS\MSSQL\DATA\AccuweatherDB.mdf' , SIZE = 2048KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'AccuweatherDB_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL10_50.SQLEXPRESS\MSSQL\DATA\AccuweatherDB_log.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
END
GO
ALTER DATABASE [AccuweatherDB] SET COMPATIBILITY_LEVEL = 100
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [AccuweatherDB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [AccuweatherDB] SET ANSI_NULL_DEFAULT OFF
GO
ALTER DATABASE [AccuweatherDB] SET ANSI_NULLS OFF
GO
ALTER DATABASE [AccuweatherDB] SET ANSI_PADDING OFF
GO
ALTER DATABASE [AccuweatherDB] SET ANSI_WARNINGS OFF
GO
ALTER DATABASE [AccuweatherDB] SET ARITHABORT OFF
GO
ALTER DATABASE [AccuweatherDB] SET AUTO_CLOSE OFF
GO
ALTER DATABASE [AccuweatherDB] SET AUTO_CREATE_STATISTICS ON
GO
ALTER DATABASE [AccuweatherDB] SET AUTO_SHRINK OFF
GO
ALTER DATABASE [AccuweatherDB] SET AUTO_UPDATE_STATISTICS ON
GO
ALTER DATABASE [AccuweatherDB] SET CURSOR_CLOSE_ON_COMMIT OFF
GO
ALTER DATABASE [AccuweatherDB] SET CURSOR_DEFAULT  GLOBAL
GO
ALTER DATABASE [AccuweatherDB] SET CONCAT_NULL_YIELDS_NULL OFF
GO
ALTER DATABASE [AccuweatherDB] SET NUMERIC_ROUNDABORT OFF
GO
ALTER DATABASE [AccuweatherDB] SET QUOTED_IDENTIFIER OFF
GO
ALTER DATABASE [AccuweatherDB] SET RECURSIVE_TRIGGERS OFF
GO
ALTER DATABASE [AccuweatherDB] SET  DISABLE_BROKER
GO
ALTER DATABASE [AccuweatherDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF
GO
ALTER DATABASE [AccuweatherDB] SET DATE_CORRELATION_OPTIMIZATION OFF
GO
ALTER DATABASE [AccuweatherDB] SET TRUSTWORTHY OFF
GO
ALTER DATABASE [AccuweatherDB] SET ALLOW_SNAPSHOT_ISOLATION OFF
GO
ALTER DATABASE [AccuweatherDB] SET PARAMETERIZATION SIMPLE
GO
ALTER DATABASE [AccuweatherDB] SET READ_COMMITTED_SNAPSHOT OFF
GO
ALTER DATABASE [AccuweatherDB] SET HONOR_BROKER_PRIORITY OFF
GO
ALTER DATABASE [AccuweatherDB] SET  READ_WRITE
GO
ALTER DATABASE [AccuweatherDB] SET RECOVERY SIMPLE
GO
ALTER DATABASE [AccuweatherDB] SET  MULTI_USER
GO
ALTER DATABASE [AccuweatherDB] SET PAGE_VERIFY CHECKSUM
GO
ALTER DATABASE [AccuweatherDB] SET DB_CHAINING OFF
GO
USE [AccuweatherDB]
GO
/****** Object:  Table [dbo].[tbl_Favories]    Script Date: 12/15/2019 20:02:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[tbl_Favories]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[tbl_Favories](
	[LocationKey] [int] NOT NULL,
	[LocalizedName] [varchar](50) NOT NULL,
 CONSTRAINT [PK_tbl_Favories_1] PRIMARY KEY CLUSTERED 
(
	[LocationKey] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
SET ANSI_PADDING OFF
GO
INSERT [dbo].[tbl_Favories] ([LocationKey], [LocalizedName]) VALUES (215854, N'Tel Aviv')
/****** Object:  Table [dbo].[tbl_CurrentWeather]    Script Date: 12/15/2019 20:02:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[tbl_CurrentWeather]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[tbl_CurrentWeather](
	[LocationKey] [int] NOT NULL,
	[CelsiusTemperature] [float] NOT NULL,
 CONSTRAINT [PK_tbl_CurrentWeather] PRIMARY KEY CLUSTERED 
(
	[LocationKey] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
INSERT [dbo].[tbl_CurrentWeather] ([LocationKey], [CelsiusTemperature]) VALUES (215854, 16.3)
/****** Object:  ForeignKey [FK_tbl_Favories_tbl_Favories]    Script Date: 12/15/2019 20:02:14 ******/
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_tbl_Favories_tbl_Favories]') AND parent_object_id = OBJECT_ID(N'[dbo].[tbl_Favories]'))
ALTER TABLE [dbo].[tbl_Favories]  WITH CHECK ADD  CONSTRAINT [FK_tbl_Favories_tbl_Favories] FOREIGN KEY([LocationKey])
REFERENCES [dbo].[tbl_Favories] ([LocationKey])
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_tbl_Favories_tbl_Favories]') AND parent_object_id = OBJECT_ID(N'[dbo].[tbl_Favories]'))
ALTER TABLE [dbo].[tbl_Favories] CHECK CONSTRAINT [FK_tbl_Favories_tbl_Favories]
GO
/****** Object:  ForeignKey [FK_tbl_CurrentWeather_tbl_Favories]    Script Date: 12/15/2019 20:02:14 ******/
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_tbl_CurrentWeather_tbl_Favories]') AND parent_object_id = OBJECT_ID(N'[dbo].[tbl_CurrentWeather]'))
ALTER TABLE [dbo].[tbl_CurrentWeather]  WITH CHECK ADD  CONSTRAINT [FK_tbl_CurrentWeather_tbl_Favories] FOREIGN KEY([LocationKey])
REFERENCES [dbo].[tbl_Favories] ([LocationKey])
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_tbl_CurrentWeather_tbl_Favories]') AND parent_object_id = OBJECT_ID(N'[dbo].[tbl_CurrentWeather]'))
ALTER TABLE [dbo].[tbl_CurrentWeather] CHECK CONSTRAINT [FK_tbl_CurrentWeather_tbl_Favories]
GO
