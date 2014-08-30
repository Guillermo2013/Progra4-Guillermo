SET IDENTITY_INSERT [dbo].[CuentaDeUsuario] ON
INSERT INTO [dbo].[CuentaDeUsuario] ([Id], [Email], [Name], [Password], [IsArchived]) VALUES (1, N'test@test.com', N'Test Name', N'password', 0)
INSERT INTO [dbo].[CuentaDeUsuario] ([Id], [Email], [Name], [Password], [IsArchived]) VALUES (2, N'test2@test.com', N'Test2 Name', N'ENZM8R+SjZX1KNF/gSTUAg==', 0)
SET IDENTITY_INSERT [dbo].[CuentaDeUsuario] OFF
