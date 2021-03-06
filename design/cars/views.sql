--
-- Run this to generate code for priming the manufacturer database.
-- ... you need to create the table structure and data in a database first (see other .sql files in this folder) 
 
select distinct a.Make, a.CSV, a.[Type], 'db.push( CarMaker.create("' + a.[Type] + '", "' + a.Make + '", "' + a.CSV + '") );'
from 
(
	SELECT t.[Type], t.Make, 
		STUFF
		(
			(
				SELECT distinct ',' + c.Model 
				FROM dbo.CarsUK c 
				WHERE c.Make = t.Make 
				AND c.[Type] = 'CAR'
				FOR XML PATH('')
			)
		,1,1,''
		) AS CSV
	FROM dbo.CarsUK AS t
	WHERE t.[Type] = 'CAR'
	GROUP BY t.Make, t.[Type]

	UNION
	
	SELECT t.[Type], t.Make, 
		STUFF
		(
			(
				SELECT distinct ',' + c.Model 
				FROM dbo.CarsUK c 
				WHERE c.Make = t.Make 
				AND c.[Type] = 'BIKE'
				FOR XML PATH('')
			)
		,1,1,''
		) AS CSV
	FROM dbo.CarsUK AS t
	WHERE t.[Type] = 'BIKE'
	GROUP BY t.Make, t.[Type]
		
	UNION 
	
	SELECT t.[Type], t.Make, 
		STUFF
		(
			(
				SELECT distinct ',' + c.Model 
				FROM dbo.CarsUK c 
				WHERE c.Make = t.Make 
				AND c.[Type] = 'LORRY'
				FOR XML PATH('')
			)
		,1,1,''
		) AS CSV
	FROM dbo.CarsUK AS t
	WHERE t.[Type] = 'LORRY'
	GROUP BY t.Make, t.[Type]
	
	
) a 
order by a.Make


