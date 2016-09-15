-- Based on UK gov data at https://www.gov.uk/government/statistical-data-sets/all-vehicles-veh01
-- See veh0124
-- Includes data from 1900-2015
--
-- This comes in an excel spreadsheet, to import:
--   1) Right click on the database name
--   2) Select Tasks->Import Data
--   3) Follow the wizard to insert the new table
--   4) Run this script to insert from "dbo.VehicleSources$"
--   

delete from dbo.CarsUK
go

dbcc checkident('dbo.CarsUK', reseed, 0)
go

insert into dbo.CarsUK (make, model, [type])
select 
	dbo.fn_title_case(cars.Make) Make, 
	dbo.fn_title_case(cars.Model) Model, 
	Cars.[Type]
from 
	(
		select distinct Make, Model, [Type]
		from 
		(
			select Make, model, [Type] from (
				select CAR_MAKE Make, CAR_MODEL Model, 'CAR' [Type]
				from dbo.VehicleSources$
				where CAR_MAKE is not null 
					and CAR_MODEL is not null
			) c
			union 
			select Make, model, [Type] from (
				select BIKE_MAKE Make, BIKE_MODEL Model, 'BIKE' [Type]
				from dbo.VehicleSources$
				where BIKE_MAKE is not null 
					and BIKE_MODEL is not null
			) c
			union
			select Make, model, [Type] from (
				select LGV_MAKE Make, LGV_MODEL Model, 'LORRY' [Type]
				from dbo.VehicleSources$
				where LGV_MAKE is not null 
					and LGV_MODEL is not null
			) c
			union 
			select Make, model, [Type] from (
				select HGV_MAKE Make, HGV_MODEL Model, 'LORRY' [Type]
				from dbo.VehicleSources$
				where HGV_MAKE is not null 
					and HGV_MODEL is not null
			) c
		) collated
	) cars
where
	cars.Make not like '%MISSING%' and cars.Model not like '%UNKNOWN%'
	and cars.Model not like '%MISSING%' and cars.Model not like '%MISSING%'
	and cars.Model not like '%NOT IN USE%' and cars.Model not like '%NOT IN USE%'
order by
	cars.Make, cars.Model, cars.[Type]
		
select * from dbo.CarsUK
go 
