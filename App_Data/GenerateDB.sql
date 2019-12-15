USE [AccuweatherDB]
GO
/****** Object:  Table [dbo].[tbl_Favories]    Script Date: 12/15/2019 18:57:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[tbl_Favories]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[tbl_Favories](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[LocationKey] [int] NOT NULL,
	[LocalizedName] [varchar](50) NOT NULL,
 CONSTRAINT [PK_tbl_Favories] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[tbl_Favories] ON
INSERT [dbo].[tbl_Favories] ([Id], [LocationKey], [LocalizedName]) VALUES (1, 215854, N'Tel Aviv')
SET IDENTITY_INSERT [dbo].[tbl_Favories] OFF
/****** Object:  Table [dbo].[tbl_CurrentWeather]    Script Date: 12/15/2019 18:57:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[tbl_CurrentWeather]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[tbl_CurrentWeather](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[LocationKey] [int] NOT NULL,
	[CelsiusTemperature] [float] NOT NULL,
 CONSTRAINT [PK_tbl_CurrentWeather] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
SET IDENTITY_INSERT [dbo].[tbl_CurrentWeather] ON
INSERT [dbo].[tbl_CurrentWeather] ([Id], [LocationKey], [CelsiusTemperature]) VALUES (1, 215854, 16.3)
SET IDENTITY_INSERT [dbo].[tbl_CurrentWeather] OFF
