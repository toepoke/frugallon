
IF (EXISTS (SELECT * 
                 FROM INFORMATION_SCHEMA.TABLES 
                 WHERE TABLE_SCHEMA = 'dbo' 
                 AND  TABLE_NAME = 'CarsUK'))
begin
drop table dbo.CarsUK
end
go

IF (EXISTS (SELECT * 
                 FROM INFORMATION_SCHEMA.TABLES 
                 WHERE TABLE_SCHEMA = 'dbo' 
                 AND  TABLE_NAME = 'CarsUS'))
begin
drop table dbo.CarsUS
end
go


-- Identity is (1,1) - my thinking is we'll detect any new entries then merge the two, ordering by the make
-- and the Id will follow

CREATE TABLE [dbo].[CarsUK](
	-- note the increment of 10 to leave gaps for more cars without affect existing ones
	[id] [int] IDENTITY(1,1) NOT NULL,
	[make] [varchar](222) NOT NULL,
	[model] [varchar](222) NOT NULL,
	[type] varchar(22) NOT NULL,		-- car, bike, lorry, etc
 CONSTRAINT [PK_CarsUK] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
go

CREATE TABLE [dbo].[CarsUS](
	-- note the increment of 10 to leave gaps for more cars without affect existing ones
	[id] [int] IDENTITY(1,1) NOT NULL,
	[make] [varchar](222) NOT NULL,
	[model] [varchar](222) NOT NULL,
	[type] varchar(22) NOT NULL,		-- car, bike, lorry, etc
 CONSTRAINT [PK_carsUS] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
go


Print 'run insert script'

IF EXISTS (SELECT *
           FROM   sys.objects
           WHERE  object_id = OBJECT_ID(N'[dbo].[fn_title_case]')
                  AND type IN ( N'FN', N'IF', N'TF', N'FS', N'FT' ))
  DROP FUNCTION [dbo].fn_title_case

GO 

CREATE FUNCTION dbo.fn_title_case
(
  @str AS varchar(100)
)
RETURNS varchar(100)
AS
BEGIN

  DECLARE
    @ret_str AS varchar(100),
    @pos AS int,
    @len AS int

  SELECT
    @ret_str = ' ' + LOWER(@str),
    @pos = 1,
    @len = LEN(@str) + 1

  WHILE @pos > 0 AND @pos < @len
  BEGIN
    SET @ret_str = STUFF(@ret_str,
                         @pos + 1,
                         1,
                         UPPER(SUBSTRING(@ret_str,@pos + 1, 1)))
    SET @pos = CHARINDEX(' ', @ret_str, @pos + 1)
  END

  RETURN RIGHT(@ret_str, @len - 1)

END
go
