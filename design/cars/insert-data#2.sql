--
-- From https://github.com/n8barr/automotive-model-year-data
-- Includes updates for 2014 and 2015
--

delete from dbo.CarsUS
go

dbcc checkident('dbo.CarsUS', reseed, 10000/*Avoid PK clash with UK that starts at 1*/)
go
 
insert into dbo.CarsUS (make, model, [type])
select distinct a.make, a.model, 'CAR' from 
(
select 
1909 yr, 'Ford' make, 'Model T' model union all select
1926, 'Chrysler', 'Imperial' union all select
1948, 'Citroen', '2CV' union all select
1950, 'Hillman', 'Minx Magnificent' union all select
1953, 'Chevrolet', 'Corvette' union all select
1954, 'Chevrolet', 'Corvette' union all select
1954, 'Cadillac', 'Fleetwood' union all select
1955, 'Chevrolet', 'Corvette' union all select
1955, 'Ford', 'Thunderbird' union all select
1956, 'Chevrolet', 'Corvette' union all select
1957, 'Chevrolet', 'Corvette' union all select
1957, 'BMW', '600' union all select
1958, 'Chevrolet', 'Corvette' union all select
1958, 'BMW', '600' union all select
1958, 'Ford', 'Thunderbird' union all select
1959, 'Austin', 'Mini' union all select
1959, 'Chevrolet', 'Corvette' union all select
1959, 'BMW', '600' union all select
1960, 'Chevrolet', 'Corvair' union all select
1960, 'Chevrolet', 'Corvette' union all select
1960, 'Fillmore', 'Fillmore' union all select
1960, 'Fairthorpe', 'Rockette' union all select
1961, 'Austin', 'Mini Cooper' union all select
1961, 'Studebaker', 'Avanti' union all select
1961, 'Pontiac', 'Tempest' union all select
1961, 'Chevrolet', 'Corvette' union all select
1962, 'Pontiac', 'Grand Prix' union all select
1962, 'Chevrolet', 'Corvette' union all select
1962, 'Studebaker', 'Avanti' union all select
1962, 'Buick', 'Special' union all select
1963, 'Austin', 'Mini' union all select
1963, 'Austin', 'Mini Cooper S' union all select
1963, 'Rambler', 'Classic' union all select
1963, 'Ford', 'E-Series' union all select
1963, 'Studebaker', 'Avanti' union all select
1963, 'Pontiac', 'Grand Prix' union all select
1963, 'Chevrolet', 'Corvair 500' union all select
1963, 'Chevrolet', 'Corvette' union all select
1964, 'Chevrolet', 'Corvette' union all select
1964, 'Ford', 'Mustang' union all select
1964, 'Ford', 'Galaxie' union all select
1964, 'Pontiac', 'GTO' union all select
1964, 'Pontiac', 'LeMans' union all select
1964, 'Pontiac', 'Bonneville' union all select
1964, 'Pontiac', 'Grand Prix' union all select
1964, 'Plymouth', 'Fury' union all select
1964, 'Studebaker', 'Avanti' union all select
1964, 'Austin', 'Mini Cooper' union all select
1965, 'Ford', 'Fairlane' union all select
1965, 'Ford', 'Mustang' union all select
1965, 'Ford', 'Thunderbird' union all select
1965, 'Pontiac', 'GTO' union all select
1965, 'Pontiac', 'Grand Prix' union all select
1965, 'Pontiac', 'LeMans' union all select
1965, 'Pontiac', 'Bonneville' union all select
1965, 'Pontiac', 'Tempest' union all select
1965, 'Volkswagen', 'Beetle' union all select
1965, 'Chevrolet', 'Corvette' union all select
1966, 'Ford', 'Galaxie' union all select
1966, 'Ford', 'Mustang' union all select
1966, 'Ford', 'Falcon' union all select
1966, 'Ford', 'Fairlane' union all select
1966, 'Jensen', 'Interceptor' union all select
1966, 'Pontiac', 'Bonneville' union all select
1966, 'Pontiac', 'Grand Prix' union all select
1966, 'Pontiac', 'GTO' union all select
1966, 'Pontiac', 'LeMans' union all select
1966, 'Pontiac', 'Tempest' union all select
1966, 'Chevrolet', 'Corvette' union all select
1966, 'Oldsmobile', 'Toronado' union all select
1967, 'Volkswagen', 'Beetle' union all select
1967, 'Pontiac', 'Tempest' union all select
1967, 'Pontiac', 'Firebird' union all select
1967, 'Pontiac', 'Grand Prix' union all select
1967, 'Pontiac', 'GTO' union all select
1967, 'Pontiac', 'LeMans' union all select
1967, 'Pontiac', 'Bonneville' union all select
1967, 'Chevrolet', 'Camaro' union all select
1967, 'Chevrolet', 'Bel Air' union all select
1967, 'Chevrolet', 'Corvette' union all select
1967, 'Ford', 'Country' union all select
1967, 'Ford', 'Falcon' union all select
1967, 'Ford', 'Mustang' union all select
1967, 'Ford', 'Thunderbird' union all select
1967, 'Ford', 'Fairlane' union all select
1967, 'Mercury', 'Cougar' union all select
1967, 'Jensen', 'Interceptor' union all select
1968, 'Pontiac', 'Firebird' union all select
1968, 'Pontiac', 'Lemans' union all select
1968, 'Pontiac', 'GTO' union all select
1968, 'Pontiac', 'Bonneville' union all select
1968, 'Pontiac', 'Grand Prix' union all select
1968, 'Shelby', 'GT500' union all select
1968, 'Dodge', 'Charger' union all select
1968, 'Mercury', 'Cougar' union all select
1968, 'Ford', 'Mustang' union all select
1968, 'Chevrolet', 'Camaro' union all select
1968, 'Chevrolet', 'Corvette' union all select
1969, 'Pontiac', 'Firebird' union all select
1969, 'Pontiac', 'Grand Prix' union all select
1969, 'Pontiac', 'GTO' union all select
1969, 'Mercury', 'Cougar' union all select
1969, 'Chevrolet', 'Camaro' union all select
1969, 'Chevrolet', 'Corvette' union all select
1969, 'Dodge', 'Charger' union all select
1969, 'Shelby', 'GT350' union all select
1969, 'Ford', 'Mustang' union all select
1969, 'Plymouth', 'Roadrunner' union all select
1970, 'Chevrolet', 'Camaro' union all select
1970, 'Chevrolet', 'Corvette' union all select
1970, 'Pontiac', 'GTO' union all select
1970, 'Pontiac', 'Grand Prix' union all select
1970, 'Mercury', 'Cougar' union all select
1970, 'Ford', 'Mustang' union all select
1970, 'Ford', 'Torino' union all select
1970, 'Porsche', '914' union all select
1970, 'Dodge', 'Charger' union all select
1971, 'Ford', 'Mustang' union all select
1971, 'Chevrolet', 'Vega' union all select
1971, 'Chevrolet', 'Camaro' union all select
1971, 'Pontiac', 'GTO' union all select
1971, 'Pontiac', 'Grand Prix' union all select
1972, 'Chevrolet', 'Corvette' union all select
1972, 'Chevrolet', 'Camaro' union all select
1972, 'Citroen', 'SM' union all select
1972, 'Pontiac', 'GTO' union all select
1972, 'Pontiac', 'Grand Prix' union all select
1972, 'Ford', 'Thunderbird' union all select
1972, 'Ford', 'Mustang' union all select
1973, 'Pontiac', 'Grand Prix' union all select
1973, 'Pontiac', 'GTO' union all select
1973, 'Ford', 'Mustang' union all select
1973, 'Chevrolet', 'Camaro' union all select
1973, 'Chevrolet', 'Monte Carlo' union all select
1973, 'Chevrolet', 'Corvette' union all select
1974, 'Chevrolet', 'Camaro' union all select
1974, 'Ford', 'Mustang' union all select
1974, 'Citroen', 'CX' union all select
1974, 'Pontiac', 'GTO' union all select
1974, 'Pontiac', 'Grand Prix' union all select
1975, 'Chevrolet', 'Camaro' union all select
1975, 'Chevrolet', 'Corvette' union all select
1975, 'Chevrolet', 'Monza' union all select
1975, 'Pontiac', 'Grand Prix' union all select
1976, 'Volkswagen', 'Golf' union all select
1976, 'Pontiac', 'Grand Prix' union all select
1976, 'Chevrolet', 'Camaro' union all select
1976, 'Toyota', 'Celica' union all select
1976, 'Plymouth', 'Volare' union all select
1976, 'Dodge', 'Aspen' union all select
1977, 'Chevrolet', 'Camaro' union all select
1977, 'Chevrolet', 'Caprice' union all select
1977, 'Mercedes-Benz', 'W123' union all select
1977, 'MG', 'MGB' union all select
1977, 'Pontiac', 'Grand Prix' union all select
1977, 'Ford', 'Thunderbird' union all select
1978, 'Chevrolet', 'Corvette' union all select
1978, 'Chevrolet', 'Camaro' union all select
1978, 'Toyota', 'Celica' union all select
1978, 'Plymouth', 'Horizon' union all select
1978, 'Dodge', 'Omni' union all select
1978, 'Pontiac', 'Grand Prix' union all select
1979, 'Nissan', '280ZX' union all select
1979, 'Chevrolet', 'LUV' union all select
1979, 'Chevrolet', 'Camaro' union all select
1979, 'Ford', 'Mustang' union all select
1979, 'Buick', 'Riviera' union all select
1979, 'Pontiac', 'Grand Prix' union all select
1980, 'Ford', 'Mustang' union all select
1980, 'Ford', 'Thunderbird' union all select
1980, 'Chevrolet', 'Citation' union all select
1980, 'Chevrolet', 'Camaro' union all select
1980, 'Honda', 'Civic' union all select
1980, 'Pontiac', 'Grand Prix' union all select
1981, 'Plymouth', 'Reliant' union all select
1981, 'Dodge', 'Aries' union all select
1981, 'Chevrolet', 'Camaro' union all select
1981, 'Pontiac', 'Grand Prix' union all select
1981, 'Mercedes-Benz', 'W126' union all select
1982, 'Pontiac', 'Grand Prix' union all select
1982, 'Chevrolet', 'Camaro' union all select
1982, 'Toyota', 'Celica' union all select
1983, 'Ford', 'Thunderbird' union all select
1983, 'Ford', 'Mustang' union all select
1983, 'Mercedes-Benz', 'W126' union all select
1983, 'Pontiac', '6000' union all select
1983, 'Pontiac', 'Sunbird' union all select
1983, 'Pontiac', 'Grand Prix' union all select
1983, 'Toyota', 'Celica' union all select
1983, 'Chevrolet', 'Caprice' union all select
1983, 'Honda', 'Accord' union all select
1983, 'Renault', 'Alliance' union all select
1983, 'Mazda', '626' union all select
1983, 'Mazda', 'RX-7' union all select
1983, 'Volkswagen', 'Golf' union all select
1983, 'Porsche', '944' union all select
1984, 'Pontiac', '1000' union all select
1984, 'Pontiac', '6000' union all select
1984, 'Pontiac', 'Sunbird' union all select
1984, 'Pontiac', 'Bonneville' union all select
1984, 'Pontiac', 'Firebird' union all select
1984, 'Pontiac', 'Parisienne' union all select
1984, 'Pontiac', 'Grand Prix' union all select
1984, 'Pontiac', 'Fiero' union all select
1984, 'Pontiac', 'Firefly' union all select
1984, 'Ford', 'Bronco II' union all select
1984, 'Ford', 'Laser' union all select
1984, 'Ford', 'Thunderbird' union all select
1984, 'Ford', 'EXP' union all select
1984, 'Ford', 'Ranger' union all select
1984, 'Ford', 'Escort' union all select
1984, 'Ford', 'Tempo' union all select
1984, 'Ford', 'LTD' union all select
1984, 'Ford', 'F250' union all select
1984, 'Ford', 'F150' union all select
1984, 'Ford', 'E250' union all select
1984, 'Ford', 'LTD Crown Victoria' union all select
1984, 'Ford', 'Bronco' union all select
1984, 'Ford', 'E150' union all select
1984, 'Ford', 'Mustang' union all select
1984, 'Mitsubishi', 'Space' union all select
1984, 'Mitsubishi', 'Galant' union all select
1984, 'Mitsubishi', 'Mirage' union all select
1984, 'Mitsubishi', 'Starion' union all select
1984, 'Mitsubishi', 'Pajero' union all select
1984, 'Mitsubishi', 'Cordia' union all select
1984, 'Mitsubishi', 'Tredia' union all select
1984, 'Subaru', 'Brat' union all select
1984, 'Mercedes-Benz', 'S-Class' union all select
1984, 'Mercedes-Benz', 'E-Class' union all select
1984, 'Mercedes-Benz', 'W201' union all select
1984, 'Mercedes-Benz', 'SL-Class' union all select
1984, 'Mercury', 'Topaz' union all select
1984, 'Mercury', 'Grand Marquis' union all select
1984, 'Mercury', 'Lynx' union all select
1984, 'Mercury', 'Capri' union all select
1984, 'Mercury', 'Cougar' union all select
1984, 'Mercury', 'Marquis' union all select
1984, 'Lotus', 'Esprit Turbo' union all select
1984, 'Volkswagen', 'Jetta' union all select
1984, 'Volkswagen', 'Golf' union all select
1984, 'Volkswagen', 'Vanagon' union all select
1984, 'Volkswagen', 'Scirocco' union all select
1984, 'Volkswagen', 'Quantum' union all select
1984, 'Buick', 'Electra' union all select
1984, 'Buick', 'Century' union all select
1984, 'Buick', 'Skyhawk' union all select
1984, 'Lincoln', 'Town Car' union all select
1984, 'Lincoln', 'Continental' union all select
1984, 'Lincoln', 'Mark VII' union all select
1984, 'Maserati', 'Quattroporte' union all select
1984, 'Maserati', 'Biturbo' union all select
1984, 'Saab', '900' union all select
1984, 'Audi', '5000S' union all select
1984, 'Honda', 'Accord' union all select
1984, 'Honda', 'CR-X' union all select
1984, 'Honda', 'Prelude' union all select
1984, 'Porsche', '944' union all select
1984, 'Dodge', 'Daytona' union all select
1984, 'Suzuki', 'SJ 410' union all select
1984, 'Mazda', '626' union all select
1984, 'Mazda', 'GLC' union all select
1984, 'Mazda', 'RX-7' union all select
1984, 'Toyota', 'Celica' union all select
1984, 'Chevrolet', 'Corvette' union all select
1985, 'Buick', 'Somerset' union all select
1985, 'Buick', 'Electra' union all select
1985, 'Buick', 'Century' union all select
1985, 'Buick', 'LeSabre' union all select
1985, 'Buick', 'Riviera' union all select
1985, 'Buick', 'Skyhawk' union all select
1985, 'Buick', 'Regal' union all select
1985, 'Buick', 'Skylark' union all select
1985, 'Ford', 'E-Series' union all select
1985, 'Ford', 'Bronco II' union all select
1985, 'Ford', 'Bronco' union all select
1985, 'Ford', 'Tempo' union all select
1985, 'Ford', 'F-Series' union all select
1985, 'Ford', 'Laser' union all select
1985, 'Ford', 'LTD Crown Victoria' union all select
1985, 'Ford', 'Ranger' union all select
1985, 'Ford', 'Mustang' union all select
1985, 'Ford', 'LTD' union all select
1985, 'Ford', 'Escort' union all select
1985, 'Ford', 'EXP' union all select
1985, 'Ford', 'Thunderbird' union all select
1985, 'Mitsubishi', 'Starion' union all select
1985, 'Mitsubishi', 'Mirage' union all select
1985, 'Mitsubishi', 'Truck' union all select
1985, 'Mitsubishi', 'Chariot' union all select
1985, 'Mitsubishi', 'Tredia' union all select
1985, 'Mitsubishi', 'Cordia' union all select
1985, 'Mitsubishi', 'Pajero' union all select
1985, 'Volkswagen', 'Jetta' union all select
1985, 'Volkswagen', 'GTI' union all select
1985, 'Volkswagen', 'Cabriolet' union all select
1985, 'Volkswagen', 'Golf' union all select
1985, 'Volkswagen', 'Passat' union all select
1985, 'Volkswagen', 'Scirocco' union all select
1985, 'Volkswagen', 'Type 2' union all select
1985, 'Mercedes-Benz', 'W201' union all select
1985, 'Mercedes-Benz', 'S-Class' union all select
1985, 'Mercedes-Benz', 'E-Class' union all select
1985, 'Mercedes-Benz', 'SL-Class' union all select
1985, 'Chevrolet', 'Camaro' union all select
1985, 'Chevrolet', 'Corvette' union all select
1985, 'Saab', '900' union all select
1985, 'Audi', '4000s' union all select
1985, 'Audi', 'Quattro' union all select
1985, 'Audi', '5000S' union all select
1985, 'Audi', 'Coupe GT' union all select
1985, 'Lamborghini', 'Countach' union all select
1985, 'Mercury', 'Topaz' union all select
1985, 'Mercury', 'Marquis' union all select
1985, 'Mercury', 'Grand Marquis' union all select
1985, 'Mercury', 'Lynx' union all select
1985, 'Mercury', 'Cougar' union all select
1985, 'Mercury', 'Capri' union all select
1985, 'Mazda', '626' union all select
1985, 'Mazda', 'RX-7' union all select
1985, 'Mazda', 'Familia' union all select
1985, 'Mazda', 'B2000' union all select
1985, 'Pontiac', '1000' union all select
1985, 'Pontiac', '6000' union all select
1985, 'Pontiac', 'Bonneville' union all select
1985, 'Pontiac', 'Parisienne' union all select
1985, 'Pontiac', 'Sunbird' union all select
1985, 'Pontiac', 'Fiero' union all select
1985, 'Pontiac', 'Grand Am' union all select
1985, 'Pontiac', 'Firebird' union all select
1985, 'Pontiac', 'Grand Prix' union all select
1985, 'Pontiac', 'Firefly' union all select
1985, 'Subaru', 'XT' union all select
1985, 'Subaru', 'BRAT' union all select
1985, 'Subaru', 'Leone' union all select
1985, 'Merkur', 'XR4Ti' union all select
1985, 'Mitsubishi', 'Galant' union all select
1985, 'Honda', 'CR-X' union all select
1985, 'Honda', 'Civic' union all select
1985, 'Honda', 'Accord' union all select
1985, 'Honda', 'Prelude' union all select
1985, 'Maserati', 'Biturbo' union all select
1985, 'Maserati', 'Quattroporte' union all select
1985, 'Lincoln', 'Town Car' union all select
1985, 'Lincoln', 'Continental' union all select
1985, 'Lincoln', 'Continental Mark VII' union all select
1985, 'Plymouth', 'Voyager' union all select
1985, 'Porsche', '911' union all select
1985, 'Porsche', '928' union all select
1985, 'Porsche', '944' union all select
1985, 'Suzuki', 'Cultus' union all select
1985, 'Suzuki', 'SJ' union all select
1985, 'Toyota', 'MR2' union all select
1985, 'Lotus', 'Esprit' union all select
1985, 'Dodge', 'Caravan' union all select
1986, 'Maserati', 'Biturbo' union all select
1986, 'Maserati', 'Quattroporte' union all select
1986, 'Subaru', 'XT' union all select
1986, 'Subaru', 'Leone' union all select
1986, 'Subaru', 'BRAT' union all select
1986, 'Chevrolet', 'Corvette' union all select
1986, 'Ford', 'Thunderbird' union all select
1986, 'Ford', 'F-Series' union all select
1986, 'Ford', 'Bronco II' union all select
1986, 'Ford', 'Ranger' union all select
1986, 'Ford', 'E-Series' union all select
1986, 'Ford', 'Taurus' union all select
1986, 'Ford', 'Tempo' union all select
1986, 'Ford', 'EXP' union all select
1986, 'Ford', 'LTD Crown Victoria' union all select
1986, 'Ford', 'Escort' union all select
1986, 'Ford', 'Laser' union all select
1986, 'Ford', 'Aerostar' union all select
1986, 'Ford', 'LTD' union all select
1986, 'Ford', 'Mustang' union all select
1986, 'Ford', 'Courier' union all select
1986, 'Ford', 'Bronco' union all select
1986, 'Mitsubishi', 'Galant' union all select
1986, 'Mitsubishi', 'Truck' union all select
1986, 'Mitsubishi', 'Mighty Max' union all select
1986, 'Mitsubishi', 'Precis' union all select
1986, 'Mitsubishi', 'Mirage' union all select
1986, 'Mitsubishi', 'Pajero' union all select
1986, 'Mitsubishi', 'Cordia' union all select
1986, 'Mitsubishi', 'Chariot' union all select
1986, 'Mitsubishi', 'Tredia' union all select
1986, 'Mitsubishi', 'Starion' union all select
1986, 'Pontiac', '1000' union all select
1986, 'Pontiac', '6000' union all select
1986, 'Pontiac', 'Fiero' union all select
1986, 'Pontiac', 'Firebird' union all select
1986, 'Pontiac', 'Safari' union all select
1986, 'Pontiac', 'Sunbird' union all select
1986, 'Pontiac', 'Parisienne' union all select
1986, 'Pontiac', 'Grand Prix' union all select
1986, 'Pontiac', 'Grand Am' union all select
1986, 'Pontiac', 'Firefly' union all select
1986, 'Pontiac', 'Gemini' union all select
1986, 'Pontiac', 'Firebird Trans Am' union all select
1986, 'Pontiac', 'Bonneville' union all select
1986, 'Porsche', '911' union all select
1986, 'Porsche', '928' union all select
1986, 'Porsche', '944' union all select
1986, 'Audi', 'Coupe GT' union all select
1986, 'Audi', '5000S' union all select
1986, 'Audi', '4000s' union all select
1986, 'Audi', '5000CS Quattro' union all select
1986, 'Audi', '4000s Quattro' union all select
1986, 'Audi', '4000CS Quattro' union all select
1986, 'Mercedes-Benz', 'S-Class' union all select
1986, 'Mercedes-Benz', 'E-Class' union all select
1986, 'Mercedes-Benz', 'W201' union all select
1986, 'Mercedes-Benz', 'SL-Class' union all select
1986, 'Mercury', 'Topaz' union all select
1986, 'Mercury', 'Capri' union all select
1986, 'Mercury', 'Grand Marquis' union all select
1986, 'Mercury', 'Lynx' union all select
1986, 'Mercury', 'Marquis' union all select
1986, 'Mercury', 'Cougar' union all select
1986, 'Mercury', 'Sable' union all select
1986, 'Volkswagen', 'GTI' union all select
1986, 'Volkswagen', 'Type 2' union all select
1986, 'Volkswagen', 'Passat' union all select
1986, 'Volkswagen', 'Scirocco' union all select
1986, 'Volkswagen', 'Golf' union all select
1986, 'Volkswagen', 'Jetta' union all select
1986, 'Volkswagen', 'Cabriolet' union all select
1986, 'Mazda', '626' union all select
1986, 'Mazda', 'Familia' union all select
1986, 'Mazda', 'B-Series' union all select
1986, 'Mazda', 'RX-7' union all select
1986, 'Buick', 'Riviera' union all select
1986, 'Buick', 'LeSabre' union all select
1986, 'Buick', 'Regal' union all select
1986, 'Buick', 'Skylark' union all select
1986, 'Buick', 'Skyhawk' union all select
1986, 'Buick', 'Century' union all select
1986, 'Buick', 'Electra' union all select
1986, 'Buick', 'Somerset' union all select
1986, 'Lincoln', 'Continental' union all select
1986, 'Lincoln', 'Town Car' union all select
1986, 'Lincoln', 'Continental Mark VII' union all select
1986, 'Toyota', 'MR2' union all select
1986, 'Honda', 'Prelude' union all select
1986, 'Honda', 'Accord' union all select
1986, 'Suzuki', 'SJ 410' union all select
1986, 'Suzuki', 'SJ' union all select
1986, 'Saab', '900' union all select
1986, 'Saab', '9000' union all select
1986, 'Lotus', 'Esprit' union all select
1986, 'Land Rover', 'Range Rover' union all select
1986, 'Lamborghini', 'Countach' union all select
1987, 'Honda', 'Accord' union all select
1987, 'Mercedes-Benz', 'E-Class' union all select
1987, 'Mercedes-Benz', 'S-Class' union all select
1987, 'Mercedes-Benz', 'W201' union all select
1987, 'Mercedes-Benz', 'SL-Class' union all select
1987, 'Ford', 'Mustang' union all select
1987, 'Ford', 'Courier' union all select
1987, 'Ford', 'Laser' union all select
1987, 'Ford', 'Escort' union all select
1987, 'Ford', 'Tempo' union all select
1987, 'Ford', 'Aerostar' union all select
1987, 'Ford', 'Thunderbird' union all select
1987, 'Ford', 'E-Series' union all select
1987, 'Ford', 'F-Series' union all select
1987, 'Ford', 'Bronco II' union all select
1987, 'Ford', 'Taurus' union all select
1987, 'Ford', 'LTD Crown Victoria' union all select
1987, 'Ford', 'Bronco' union all select
1987, 'Ford', 'Ranger' union all select
1987, 'Ford', 'EXP' union all select
1987, 'Audi', '4000' union all select
1987, 'Audi', '5000CS' union all select
1987, 'Audi', '4000CS Quattro' union all select
1987, 'Audi', '5000S' union all select
1987, 'Audi', 'Coupe GT' union all select
1987, 'Mazda', '626' union all select
1987, 'Mazda', '929' union all select
1987, 'Mazda', 'Familia' union all select
1987, 'Mazda', 'RX-7' union all select
1987, 'Mazda', 'B-Series' union all select
1987, 'Mazda', 'B2600' union all select
1987, 'Lamborghini', 'Countach' union all select
1987, 'Volkswagen', 'Cabriolet' union all select
1987, 'Volkswagen', 'Scirocco' union all select
1987, 'Volkswagen', 'Fox' union all select
1987, 'Volkswagen', 'Jetta' union all select
1987, 'Volkswagen', 'Type 2' union all select
1987, 'Volkswagen', 'Golf' union all select
1987, 'Volkswagen', 'Passat' union all select
1987, 'Volkswagen', 'GTI' union all select
1987, 'Suzuki', 'Swift' union all select
1987, 'Suzuki', 'SJ' union all select
1987, 'Subaru', 'Leone' union all select
1987, 'Subaru', 'XT' union all select
1987, 'Subaru', 'BRAT' union all select
1987, 'Subaru', 'Justy' union all select
1987, 'Buick', 'Electra' union all select
1987, 'Buick', 'Regal' union all select
1987, 'Buick', 'Skyhawk' union all select
1987, 'Buick', 'Century' union all select
1987, 'Buick', 'LeSabre' union all select
1987, 'Buick', 'Somerset' union all select
1987, 'Buick', 'Skylark' union all select
1987, 'Buick', 'Riviera' union all select
1987, 'Porsche', '911' union all select
1987, 'Porsche', '928' union all select
1987, 'Porsche', '944' union all select
1987, 'Porsche', '924 S' union all select
1987, 'Pontiac', '6000' union all select
1987, 'Pontiac', 'Grand Am' union all select
1987, 'Pontiac', 'Chevette' union all select
1987, 'Pontiac', 'Gemini' union all select
1987, 'Pontiac', 'Fiero' union all select
1987, 'Pontiac', 'Sunbird' union all select
1987, 'Pontiac', 'Bonneville' union all select
1987, 'Pontiac', 'Safari' union all select
1987, 'Pontiac', 'Grand Prix' union all select
1987, 'Pontiac', 'Firebird' union all select
1987, 'Pontiac', 'Firefly' union all select
1987, 'Mitsubishi', 'Truck' union all select
1987, 'Mitsubishi', 'Starion' union all select
1987, 'Mitsubishi', 'Excel' union all select
1987, 'Mitsubishi', 'L300' union all select
1987, 'Mitsubishi', 'Cordia' union all select
1987, 'Mitsubishi', 'Mirage' union all select
1987, 'Mitsubishi', 'Chariot' union all select
1987, 'Mitsubishi', 'Galant' union all select
1987, 'Mitsubishi', 'Pajero' union all select
1987, 'Mitsubishi', 'Tredia' union all select
1987, 'Mercury', 'Lynx' union all select
1987, 'Mercury', 'Topaz' union all select
1987, 'Mercury', 'Grand Marquis' union all select
1987, 'Mercury', 'Sable' union all select
1987, 'Mercury', 'Cougar' union all select
1987, 'Maserati', 'Biturbo' union all select
1987, 'Lincoln', 'Continental' union all select
1987, 'Lincoln', 'Continental Mark VII' union all select
1987, 'Lincoln', 'Town Car' union all select
1987, 'Saab', '900' union all select
1987, 'Saab', '9000' union all select
1987, 'Chevrolet', 'Corvette' union all select
1987, 'Land Rover', 'Range Rover' union all select
1987, 'Toyota', 'MR2' union all select
1987, 'Lotus', 'Esprit' union all select
1987, 'Acura', 'Legend' union all select
1988, 'Acura', 'Integra' union all select
1988, 'Acura', 'Legend' union all select
1988, 'Porsche', '911' union all select
1988, 'Porsche', '924' union all select
1988, 'Porsche', '928' union all select
1988, 'Porsche', '944' union all select
1988, 'Pontiac', '6000' union all select
1988, 'Pontiac', 'Firebird' union all select
1988, 'Pontiac', 'Bonneville' union all select
1988, 'Pontiac', 'Sunbird' union all select
1988, 'Pontiac', 'Gemini' union all select
1988, 'Pontiac', 'Grand Am' union all select
1988, 'Pontiac', 'Grand Prix' union all select
1988, 'Pontiac', 'Fiero' union all select
1988, 'Pontiac', 'Safari' union all select
1988, 'Pontiac', 'Firefly' union all select
1988, 'Pontiac', 'LeMans' union all select
1988, 'Pontiac', 'Turbo Firefly' union all select
1988, 'Volkswagen', 'Passat' union all select
1988, 'Volkswagen', 'GTI' union all select
1988, 'Volkswagen', 'Jetta' union all select
1988, 'Volkswagen', 'Fox' union all select
1988, 'Volkswagen', 'Type 2' union all select
1988, 'Volkswagen', 'Golf' union all select
1988, 'Volkswagen', 'Scirocco' union all select
1988, 'Volkswagen', 'Cabriolet' union all select
1988, 'Mercury', 'Sable' union all select
1988, 'Mercury', 'Topaz' union all select
1988, 'Mercury', 'Grand Marquis' union all select
1988, 'Mercury', 'Cougar' union all select
1988, 'Mercury', 'Tracer' union all select
1988, 'Buick', 'Electra' union all select
1988, 'Buick', 'Skyhawk' union all select
1988, 'Buick', 'Century' union all select
1988, 'Buick', 'Riviera' union all select
1988, 'Buick', 'Regal' union all select
1988, 'Buick', 'Skylark' union all select
1988, 'Buick', 'Reatta' union all select
1988, 'Buick', 'LeSabre' union all select
1988, 'Subaru', 'Leone' union all select
1988, 'Subaru', 'XT' union all select
1988, 'Subaru', 'Justy' union all select
1988, 'Honda', 'CR-X' union all select
1988, 'Honda', 'Civic' union all select
1988, 'Honda', 'Accord' union all select
1988, 'Ford', 'Thunderbird' union all select
1988, 'Ford', 'Aerostar' union all select
1988, 'Ford', 'Escort' union all select
1988, 'Ford', 'Mustang' union all select
1988, 'Ford', 'Taurus' union all select
1988, 'Ford', 'Bronco II' union all select
1988, 'Ford', 'Laser' union all select
1988, 'Ford', 'Tempo' union all select
1988, 'Ford', 'E-Series' union all select
1988, 'Ford', 'LTD Crown Victoria' union all select
1988, 'Ford', 'F-Series' union all select
1988, 'Ford', 'Ranger' union all select
1988, 'Ford', 'Festiva' union all select
1988, 'Ford', 'Bronco' union all select
1988, 'Ford', 'Courier' union all select
1988, 'Ford', 'EXP' union all select
1988, 'Mitsubishi', 'L300' union all select
1988, 'Mitsubishi', 'Tredia' union all select
1988, 'Mitsubishi', 'Galant' union all select
1988, 'Mitsubishi', 'Mirage' union all select
1988, 'Mitsubishi', 'Truck' union all select
1988, 'Mitsubishi', 'Pajero' union all select
1988, 'Mitsubishi', 'Excel' union all select
1988, 'Mitsubishi', 'Starion' union all select
1988, 'Mitsubishi', 'Chariot' union all select
1988, 'Mitsubishi', 'Cordia' union all select
1988, 'Mazda', '626' union all select
1988, 'Mazda', '929' union all select
1988, 'Mazda', 'Familia' union all select
1988, 'Mazda', 'B-Series' union all select
1988, 'Mazda', 'RX-7' union all select
1988, 'Mazda', 'MX-6' union all select
1988, 'Mercedes-Benz', 'E-Class' union all select
1988, 'Mercedes-Benz', 'S-Class' union all select
1988, 'Mercedes-Benz', 'W201' union all select
1988, 'Mercedes-Benz', 'SL-Class' union all select
1988, 'Suzuki', 'Swift' union all select
1988, 'Suzuki', 'SJ' union all select
1988, 'Audi', '90' union all select
1988, 'Audi', '5000S' union all select
1988, 'Audi', '5000CS' union all select
1988, 'Audi', '80/90' union all select
1988, 'Lamborghini', 'Countach' union all select
1988, 'Lincoln', 'Town Car' union all select
1988, 'Lincoln', 'Continental' union all select
1988, 'Lincoln', 'Continental Mark VII' union all select
1988, 'Lotus', 'Esprit' union all select
1988, 'Chevrolet', 'Corvette' union all select
1988, 'Saab', '900' union all select
1988, 'Saab', '9000' union all select
1988, 'Land Rover', 'Range Rover' union all select
1989, 'Buick', 'Electra' union all select
1989, 'Buick', 'Skyhawk' union all select
1989, 'Buick', 'Century' union all select
1989, 'Buick', 'Regal' union all select
1989, 'Buick', 'Skylark' union all select
1989, 'Buick', 'Reatta' union all select
1989, 'Buick', 'Riviera' union all select
1989, 'Buick', 'Estate' union all select
1989, 'Buick', 'LeSabre' union all select
1989, 'Ford', 'E-Series' union all select
1989, 'Ford', 'F-Series' union all select
1989, 'Ford', 'Taurus' union all select
1989, 'Ford', 'Mustang' union all select
1989, 'Ford', 'Laser' union all select
1989, 'Ford', 'Probe' union all select
1989, 'Ford', 'Escort' union all select
1989, 'Ford', 'Tempo' union all select
1989, 'Ford', 'Aerostar' union all select
1989, 'Ford', 'Festiva' union all select
1989, 'Ford', 'Courier' union all select
1989, 'Ford', 'Bronco II' union all select
1989, 'Ford', 'LTD Crown Victoria' union all select
1989, 'Ford', 'Bronco' union all select
1989, 'Ford', 'Ranger' union all select
1989, 'Ford', 'Thunderbird' union all select
1989, 'Saab', '900' union all select
1989, 'Saab', '9000' union all select
1989, 'Pontiac', '6000' union all select
1989, 'Pontiac', 'Grand Prix' union all select
1989, 'Pontiac', 'Safari' union all select
1989, 'Pontiac', 'Firefly' union all select
1989, 'Pontiac', 'Gemini' union all select
1989, 'Pontiac', 'Sunbird' union all select
1989, 'Pontiac', 'Grand Am' union all select
1989, 'Pontiac', 'LeMans' union all select
1989, 'Pontiac', 'Firebird' union all select
1989, 'Pontiac', 'Bonneville' union all select
1989, 'Mazda', '626' union all select
1989, 'Mazda', '929' union all select
1989, 'Mazda', 'Familia' union all select
1989, 'Mazda', 'B-Series' union all select
1989, 'Mazda', 'B2600' union all select
1989, 'Mazda', 'RX-7' union all select
1989, 'Mazda', 'MPV' union all select
1989, 'Mazda', 'MX-6' union all select
1989, 'Porsche', '911' union all select
1989, 'Porsche', '928' union all select
1989, 'Porsche', '944' union all select
1989, 'Mitsubishi', 'Truck' union all select
1989, 'Mitsubishi', 'Mirage' union all select
1989, 'Mitsubishi', 'Excel' union all select
1989, 'Mitsubishi', 'Chariot' union all select
1989, 'Mitsubishi', 'Galant' union all select
1989, 'Mitsubishi', 'Pajero' union all select
1989, 'Mitsubishi', 'Starion' union all select
1989, 'Mitsubishi', 'L300' union all select
1989, 'Mitsubishi', 'Sigma' union all select
1989, 'Mitsubishi', 'Eclipse' union all select
1989, 'Chevrolet', 'Corvette' union all select
1989, 'Lincoln', 'Continental Mark VII' union all select
1989, 'Lincoln', 'Town Car' union all select
1989, 'Lincoln', 'Continental' union all select
1989, 'Mercury', 'Sable' union all select
1989, 'Mercury', 'Cougar' union all select
1989, 'Mercury', 'Grand Marquis' union all select
1989, 'Mercury', 'Topaz' union all select
1989, 'Mercury', 'Tracer' union all select
1989, 'Volkswagen', 'Jetta' union all select
1989, 'Volkswagen', 'Fox' union all select
1989, 'Volkswagen', 'GTI' union all select
1989, 'Volkswagen', 'Cabriolet' union all select
1989, 'Volkswagen', 'Type 2' union all select
1989, 'Volkswagen', 'Golf' union all select
1989, 'Subaru', 'Leone' union all select
1989, 'Subaru', 'Legacy' union all select
1989, 'Subaru', 'Justy' union all select
1989, 'Subaru', 'XT' union all select
1989, 'Suzuki', 'SJ' union all select
1989, 'Suzuki', 'Sidekick' union all select
1989, 'Suzuki', 'Swift' union all select
1989, 'Lexus', 'LS' union all select
1989, 'Lexus', 'ES' union all select
1989, 'Mercedes-Benz', 'S-Class' union all select
1989, 'Mercedes-Benz', 'E-Class' union all select
1989, 'Mercedes-Benz', 'W201' union all select
1989, 'Mercedes-Benz', 'SL-Class' union all select
1989, 'Maserati', '228' union all select
1989, 'Maserati', '430' union all select
1989, 'Maserati', 'Spyder' union all select
1989, 'Maserati', 'Karif' union all select
1989, 'Audi', '80' union all select
1989, 'Audi', '90' union all select
1989, 'Audi', '100' union all select
1989, 'Audi', '200' union all select
1989, 'Toyota', 'Truck Xtracab SR5' union all select
1989, 'Land Rover', 'Range Rover' union all select
1989, 'Lotus', 'Esprit' union all select
1989, 'Citroen', 'CX' union all select
1989, 'Acura', 'Legend' union all select
1989, 'Honda', 'Civic' union all select
1989, 'Honda', 'Accord' union all select
1989, 'BMW', '6 Series' union all select
1989, 'Lamborghini', 'Countach' union all select
1989, 'Dodge', 'Colt' union all select
1989, 'Plymouth', 'Laser' union all select
1990, 'Ford', 'Taurus' union all select
1990, 'Ford', 'F-Series' union all select
1990, 'Ford', 'Mustang' union all select
1990, 'Ford', 'Thunderbird' union all select
1990, 'Ford', 'Tempo' union all select
1990, 'Ford', 'Aerostar' union all select
1990, 'Ford', 'Escort' union all select
1990, 'Ford', 'Ranger' union all select
1990, 'Ford', 'E-Series' union all select
1990, 'Ford', 'Probe' union all select
1990, 'Ford', 'LTD Crown Victoria' union all select
1990, 'Ford', 'Bronco II' union all select
1990, 'Ford', 'Bronco' union all select
1990, 'Ford', 'Festiva' union all select
1990, 'Mercedes-Benz', 'S-Class' union all select
1990, 'Mercedes-Benz', 'E-Class' union all select
1990, 'Mercedes-Benz', 'SL-Class' union all select
1990, 'Mercedes-Benz', 'W201' union all select
1990, 'Porsche', '911' union all select
1990, 'Porsche', '928' union all select
1990, 'Porsche', '944' union all select
1990, 'Buick', 'LeSabre' union all select
1990, 'Buick', 'Regal' union all select
1990, 'Buick', 'Century' union all select
1990, 'Buick', 'Riviera' union all select
1990, 'Buick', 'Skylark' union all select
1990, 'Buick', 'Coachbuilder' union all select
1990, 'Buick', 'Estate' union all select
1990, 'Buick', 'Electra' union all select
1990, 'Buick', 'Reatta' union all select
1990, 'Suzuki', 'Sidekick' union all select
1990, 'Suzuki', 'Swift' union all select
1990, 'Suzuki', 'SJ' union all select
1990, 'Mercury', 'Sable' union all select
1990, 'Mercury', 'Topaz' union all select
1990, 'Mercury', 'Grand Marquis' union all select
1990, 'Mercury', 'Cougar' union all select
1990, 'Subaru', 'Legacy' union all select
1990, 'Subaru', 'Justy' union all select
1990, 'Subaru', 'Loyale' union all select
1990, 'Subaru', 'XT' union all select
1990, 'Mazda', '626' union all select
1990, 'Mazda', '929' union all select
1990, 'Mazda', 'B-Series' union all select
1990, 'Mazda', 'MX-6' union all select
1990, 'Mazda', 'Familia' union all select
1990, 'Mazda', 'MX-5' union all select
1990, 'Mazda', 'MPV' union all select
1990, 'Mazda', 'RX-7' union all select
1990, 'Maserati', '228' union all select
1990, 'Maserati', '430' union all select
1990, 'Maserati', 'Karif' union all select
1990, 'Maserati', 'Spyder' union all select
1990, 'Pontiac', '6000' union all select
1990, 'Pontiac', 'Trans Sport' union all select
1990, 'Pontiac', 'Sunbird' union all select
1990, 'Pontiac', 'LeMans' union all select
1990, 'Pontiac', 'Firefly' union all select
1990, 'Pontiac', 'Grand Am' union all select
1990, 'Pontiac', 'Firebird' union all select
1990, 'Pontiac', 'Turbo Firefly' union all select
1990, 'Pontiac', 'Grand Prix' union all select
1990, 'Pontiac', 'Grand Prix Turbo' union all select
1990, 'Pontiac', 'Bonneville' union all select
1990, 'Audi', '80' union all select
1990, 'Audi', '90' union all select
1990, 'Audi', '100' union all select
1990, 'Audi', '200' union all select
1990, 'Audi', 'V8' union all select
1990, 'Audi', 'Coupe Quattro' union all select
1990, 'Lotus', 'Elan' union all select
1990, 'Lotus', 'Esprit' union all select
1990, 'Volkswagen', 'Passat' union all select
1990, 'Volkswagen', 'Fox' union all select
1990, 'Volkswagen', 'Type 2' union all select
1990, 'Volkswagen', 'Cabriolet' union all select
1990, 'Volkswagen', 'GTI' union all select
1990, 'Volkswagen', 'Jetta' union all select
1990, 'Volkswagen', 'Corrado' union all select
1990, 'Volkswagen', 'Golf' union all select
1990, 'Mitsubishi', 'Truck' union all select
1990, 'Mitsubishi', 'Mirage' union all select
1990, 'Mitsubishi', 'L300' union all select
1990, 'Mitsubishi', 'Galant' union all select
1990, 'Mitsubishi', 'Precis' union all select
1990, 'Mitsubishi', 'Pajero' union all select
1990, 'Mitsubishi', 'Eclipse' union all select
1990, 'Mitsubishi', 'GTO' union all select
1990, 'Mitsubishi', 'Sigma' union all select
1990, 'Mitsubishi', 'Chariot' union all select
1990, 'Acura', 'Legend' union all select
1990, 'Nissan', 'Maxima' union all select
1990, 'Nissan', 'Datsun/Nissan Z-car' union all select
1990, 'Saab', '900' union all select
1990, 'Saab', '9000' union all select
1990, 'Plymouth', 'Laser' union all select
1990, 'Lincoln', 'Continental' union all select
1990, 'Lincoln', 'Continental Mark VII' union all select
1990, 'Lincoln', 'Town Car' union all select
1990, 'Honda', 'Civic' union all select
1990, 'Honda', 'Accord' union all select
1990, 'Lamborghini', 'Diablo' union all select
1990, 'Lamborghini', 'Countach' union all select
1990, 'Lexus', 'LS' union all select
1990, 'Lexus', 'ES' union all select
1990, 'Eagle', 'Talon' union all select
1990, 'Land Rover', 'Range Rover' union all select
1991, 'Pontiac', '6000' union all select
1991, 'Pontiac', 'LeMans' union all select
1991, 'Pontiac', 'Firebird' union all select
1991, 'Pontiac', 'Grand Am' union all select
1991, 'Pontiac', 'Grand Prix' union all select
1991, 'Pontiac', 'Firefly' union all select
1991, 'Pontiac', 'Trans Sport' union all select
1991, 'Pontiac', 'Sunbird' union all select
1991, 'Pontiac', 'Bonneville' union all select
1991, 'Porsche', '911' union all select
1991, 'Porsche', '928' union all select
1991, 'Porsche', '944' union all select
1991, 'Ford', 'Mustang' union all select
1991, 'Ford', 'Festiva' union all select
1991, 'Ford', 'E-Series' union all select
1991, 'Ford', 'F-Series' union all select
1991, 'Ford', 'Tempo' union all select
1991, 'Ford', 'Bronco' union all select
1991, 'Ford', 'Escort' union all select
1991, 'Ford', 'Aerostar' union all select
1991, 'Ford', 'LTD Crown Victoria' union all select
1991, 'Ford', 'Thunderbird' union all select
1991, 'Ford', 'Ranger' union all select
1991, 'Ford', 'Taurus' union all select
1991, 'Ford', 'Explorer' union all select
1991, 'Ford', 'Probe' union all select
1991, 'Audi', '80' union all select
1991, 'Audi', '90' union all select
1991, 'Audi', '100' union all select
1991, 'Audi', '200' union all select
1991, 'Audi', 'Coupe Quattro' union all select
1991, 'Audi', 'V8' union all select
1991, 'Subaru', 'Loyale' union all select
1991, 'Subaru', 'Justy' union all select
1991, 'Subaru', 'Legacy' union all select
1991, 'Subaru', 'XT' union all select
1991, 'Mercury', 'Topaz' union all select
1991, 'Mercury', 'Grand Marquis' union all select
1991, 'Mercury', 'Tracer' union all select
1991, 'Mercury', 'Sable' union all select
1991, 'Mercury', 'Capri' union all select
1991, 'Mercury', 'Cougar' union all select
1991, 'Buick', 'Reatta' union all select
1991, 'Buick', 'Coachbuilder' union all select
1991, 'Buick', 'Riviera' union all select
1991, 'Buick', 'Century' union all select
1991, 'Buick', 'LeSabre' union all select
1991, 'Buick', 'Park Avenue' union all select
1991, 'Buick', 'Skylark' union all select
1991, 'Buick', 'Roadmaster' union all select
1991, 'Buick', 'Regal' union all select
1991, 'Mercedes-Benz', 'S-Class' union all select
1991, 'Mercedes-Benz', 'E-Class' union all select
1991, 'Mercedes-Benz', 'W201' union all select
1991, 'Mercedes-Benz', 'SL-Class' union all select
1991, 'Lexus', 'LS' union all select
1991, 'Lexus', 'ES' union all select
1991, 'Mazda', '626' union all select
1991, 'Mazda', '929' union all select
1991, 'Mazda', 'MX-5' union all select
1991, 'Mazda', 'Familia' union all select
1991, 'Mazda', 'Navajo' union all select
1991, 'Mazda', 'RX-7' union all select
1991, 'Mazda', 'MPV' union all select
1991, 'Mazda', 'B-Series' union all select
1991, 'Suzuki', 'Swift' union all select
1991, 'Suzuki', 'SJ' union all select
1991, 'Suzuki', 'Sidekick' union all select
1991, 'Lotus', 'Esprit' union all select
1991, 'Lotus', 'Elan' union all select
1991, 'Lincoln', 'Town Car' union all select
1991, 'Lincoln', 'Continental' union all select
1991, 'Lincoln', 'Continental Mark VII' union all select
1991, 'Volkswagen', 'Type 2' union all select
1991, 'Volkswagen', 'Passat' union all select
1991, 'Volkswagen', 'Golf' union all select
1991, 'Volkswagen', 'Corrado' union all select
1991, 'Volkswagen', 'Jetta' union all select
1991, 'Volkswagen', 'Cabriolet' union all select
1991, 'Volkswagen', 'Fox' union all select
1991, 'Volkswagen', 'GTI' union all select
1991, 'Honda', 'Civic' union all select
1991, 'Honda', 'Accord' union all select
1991, 'Lamborghini', 'Diablo' union all select
1991, 'Saab', '900' union all select
1991, 'Saab', '9000' union all select
1991, 'Chevrolet', 'Caprice' union all select
1991, 'Maserati', '430' union all select
1991, 'Maserati', 'Spyder' union all select
1991, 'Mitsubishi', 'Chariot' union all select
1991, 'Mitsubishi', 'Truck' union all select
1991, 'Mitsubishi', 'GTO' union all select
1991, 'Mitsubishi', 'Pajero' union all select
1991, 'Mitsubishi', 'Galant' union all select
1991, 'Mitsubishi', 'Eclipse' union all select
1991, 'Mitsubishi', 'Mirage' union all select
1991, 'Nissan', '300ZX' union all select
1991, 'Nissan', 'Sentra' union all select
1991, 'Eagle', 'Talon' union all select
1991, 'Mazda', 'MX-6' union all select
1991, 'Plymouth', 'Laser' union all select
1991, 'Land Rover', 'Range Rover' union all select
1991, 'Land Rover', 'Sterling' union all select
1991, 'Toyota', 'Previa' union all select
1992, 'Saab', '900' union all select
1992, 'Saab', '9000' union all select
1992, 'Volkswagen', 'Corrado' union all select
1992, 'Volkswagen', 'Jetta' union all select
1992, 'Volkswagen', 'GTI' union all select
1992, 'Volkswagen', 'Fox' union all select
1992, 'Volkswagen', 'Golf' union all select
1992, 'Volkswagen', 'Cabriolet' union all select
1992, 'Volkswagen', 'Eurovan' union all select
1992, 'Volkswagen', 'Passat' union all select
1992, 'Volkswagen', 'riolet' union all select
1992, 'Ford', 'Crown Victoria' union all select
1992, 'Ford', 'Festiva' union all select
1992, 'Ford', 'Ranger' union all select
1992, 'Ford', 'Aerostar' union all select
1992, 'Ford', 'F-Series' union all select
1992, 'Ford', 'E-Series' union all select
1992, 'Ford', 'Taurus' union all select
1992, 'Ford', 'Tempo' union all select
1992, 'Ford', 'Thunderbird' union all select
1992, 'Ford', 'Escort' union all select
1992, 'Ford', 'Probe' union all select
1992, 'Ford', 'Bronco' union all select
1992, 'Ford', 'Explorer' union all select
1992, 'Ford', 'Mustang' union all select
1992, 'Ford', 'Club Wagon' union all select
1992, 'Ford', 'Econoline E150' union all select
1992, 'Ford', 'Econoline E250' union all select
1992, 'Ford', 'Econoline E350' union all select
1992, 'Ford', 'F150' union all select
1992, 'Ford', 'F250' union all select
1992, 'Ford', 'F350' union all select
1992, 'Suzuki', 'Swift' union all select
1992, 'Suzuki', 'Sidekick' union all select
1992, 'Suzuki', 'SJ' union all select
1992, 'Suzuki', 'Samurai' union all select
1992, 'Mercedes-Benz', 'E-Class' union all select
1992, 'Mercedes-Benz', 'S-Class' union all select
1992, 'Mercedes-Benz', 'SL-Class' union all select
1992, 'Mercedes-Benz', 'W201' union all select
1992, 'Mercedes-Benz', '190E' union all select
1992, 'Mercedes-Benz', '300CE' union all select
1992, 'Mercedes-Benz', '300D' union all select
1992, 'Mercedes-Benz', '300E' union all select
1992, 'Mercedes-Benz', '300SD' union all select
1992, 'Mercedes-Benz', '300SE' union all select
1992, 'Mercedes-Benz', '300SL' union all select
1992, 'Mercedes-Benz', '300TE' union all select
1992, 'Mercedes-Benz', '400E' union all select
1992, 'Mercedes-Benz', '400SE' union all select
1992, 'Mercedes-Benz', '500E' union all select
1992, 'Mercedes-Benz', '500SEL' union all select
1992, 'Mercedes-Benz', '500SL' union all select
1992, 'Mercedes-Benz', '600SEL' union all select
1992, 'Subaru', 'Legacy' union all select
1992, 'Subaru', 'Loyale' union all select
1992, 'Subaru', 'Alcyone SVX' union all select
1992, 'Subaru', 'Justy' union all select
1992, 'Subaru', 'SVX' union all select
1992, 'Mitsubishi', 'Diamante' union all select
1992, 'Mitsubishi', 'Galant' union all select
1992, 'Mitsubishi', 'RVR' union all select
1992, 'Mitsubishi', 'GTO' union all select
1992, 'Mitsubishi', 'Chariot' union all select
1992, 'Mitsubishi', 'Eclipse' union all select
1992, 'Mitsubishi', 'Pajero' union all select
1992, 'Mitsubishi', 'Mirage' union all select
1992, 'Mitsubishi', 'Truck' union all select
1992, 'Mitsubishi', '3000GT' union all select
1992, 'Mitsubishi', 'Expo' union all select
1992, 'Mitsubishi', 'Mighty Max Macro' union all select
1992, 'Mitsubishi', 'Mighty Max' union all select
1992, 'Mitsubishi', 'Montero' union all select
1992, 'Mitsubishi', 'Precis' union all select
1992, 'Mazda', '323' union all select
1992, 'Mazda', '626' union all select
1992, 'Mazda', '929' union all select
1992, 'Mazda', 'MPV' union all select
1992, 'Mazda', 'MX-6' union all select
1992, 'Mazda', 'Protege' union all select
1992, 'Mazda', 'MX-5' union all select
1992, 'Mazda', 'B-Series' union all select
1992, 'Mazda', 'Familia' union all select
1992, 'Mazda', 'Navajo' union all select
1992, 'Mazda', 'MX-3' union all select
1992, 'Mazda', 'RX-7' union all select
1992, 'Mazda', 'B-Series Plus' union all select
1992, 'Mazda', 'Miata MX-5' union all select
1992, 'Mercury', 'Tracer' union all select
1992, 'Mercury', 'Sable' union all select
1992, 'Mercury', 'Grand Marquis' union all select
1992, 'Mercury', 'Topaz' union all select
1992, 'Mercury', 'Cougar' union all select
1992, 'Mercury', 'Capri' union all select
1992, 'Audi', '80' union all select
1992, 'Audi', '100' union all select
1992, 'Audi', 'V8' union all select
1992, 'Audi', 'S4' union all select
1992, 'Audi', 'Quattro' union all select
1992, 'Buick', 'LeSabre' union all select
1992, 'Buick', 'Riviera' union all select
1992, 'Buick', 'Regal' union all select
1992, 'Buick', 'Skylark' union all select
1992, 'Buick', 'Century' union all select
1992, 'Buick', 'Roadmaster' union all select
1992, 'Buick', 'Park Avenue' union all select
1992, 'Buick', 'Coachbuilder' union all select
1992, 'BMW', '3 Series' union all select
1992, 'BMW', '5 Series' union all select
1992, 'BMW', '7 Series' union all select
1992, 'BMW', '8 Series' union all select
1992, 'BMW', 'M5' union all select
1992, 'Pontiac', 'Firebird' union all select
1992, 'Pontiac', 'Sunbird' union all select
1992, 'Pontiac', 'Grand Prix' union all select
1992, 'Pontiac', 'Grand Am' union all select
1992, 'Pontiac', 'LeMans' union all select
1992, 'Pontiac', 'Firebird Formula' union all select
1992, 'Pontiac', 'Firefly' union all select
1992, 'Pontiac', 'Bonneville' union all select
1992, 'Pontiac', 'Trans Sport' union all select
1992, 'Land Rover', 'Range Rover' union all select
1992, 'Land Rover', 'Defender' union all select
1992, 'Lexus', 'LS' union all select
1992, 'Lexus', 'SC' union all select
1992, 'Lexus', 'ES' union all select
1992, 'Dodge', 'Viper' union all select
1992, 'Dodge', 'Caravan' union all select
1992, 'Dodge', 'Colt' union all select
1992, 'Dodge', 'D150 Club' union all select
1992, 'Dodge', 'D150' union all select
1992, 'Dodge', 'D250 Club' union all select
1992, 'Dodge', 'D250' union all select
1992, 'Dodge', 'D350 Club' union all select
1992, 'Dodge', 'D350' union all select
1992, 'Dodge', 'Dakota Club' union all select
1992, 'Dodge', 'Dakota' union all select
1992, 'Dodge', 'Daytona' union all select
1992, 'Dodge', 'Dynasty' union all select
1992, 'Dodge', 'Grand Caravan' union all select
1992, 'Dodge', 'Monaco' union all select
1992, 'Dodge', 'Ram 50' union all select
1992, 'Dodge', 'Ram Van B150' union all select
1992, 'Dodge', 'Ram Van B250' union all select
1992, 'Dodge', 'Ram Van B350' union all select
1992, 'Dodge', 'Ram Wagon B150' union all select
1992, 'Dodge', 'Ram Wagon B250' union all select
1992, 'Dodge', 'Ram Wagon B350' union all select
1992, 'Dodge', 'Ramcharger' union all select
1992, 'Dodge', 'Shadow' union all select
1992, 'Dodge', 'Spirit' union all select
1992, 'Dodge', 'Stealth' union all select
1992, 'Lincoln', 'Town Car' union all select
1992, 'Lincoln', 'Continental Mark VII' union all select
1992, 'Lincoln', 'Continental' union all select
1992, 'Lincoln', 'Mark VII' union all select
1992, 'Lotus', 'Elan' union all select
1992, 'Lotus', 'Esprit' union all select
1992, 'Lamborghini', 'Diablo' union all select
1992, 'Porsche', '911' union all select
1992, 'Porsche', '968' union all select
1992, 'Cadillac', 'Seville' union all select
1992, 'Cadillac', 'Allante' union all select
1992, 'Cadillac', 'Brougham' union all select
1992, 'Cadillac', 'DeVille' union all select
1992, 'Cadillac', 'Eldorado' union all select
1992, 'Cadillac', 'Fleetwood' union all select
1992, 'Toyota', 'Camry' union all select
1992, 'Toyota', '4Runner' union all select
1992, 'Toyota', 'Celica' union all select
1992, 'Toyota', 'Corolla' union all select
1992, 'Toyota', 'Cressida' union all select
1992, 'Toyota', 'Land Cruiser' union all select
1992, 'Toyota', 'MR2' union all select
1992, 'Toyota', 'Paseo' union all select
1992, 'Toyota', 'Previa' union all select
1992, 'Toyota', 'Supra' union all select
1992, 'Toyota', 'Tercel' union all select
1992, 'Toyota', 'Xtra' union all select
1992, 'Nissan', '300ZX' union all select
1992, 'Nissan', 'Sentra' union all select
1992, 'Nissan', '240SX' union all select
1992, 'Nissan', 'Maxima' union all select
1992, 'Nissan', 'NX' union all select
1992, 'Nissan', 'Pathfinder' union all select
1992, 'Nissan', 'Stanza' union all select
1992, 'Plymouth', 'Laser' union all select
1992, 'Plymouth', 'Acclaim' union all select
1992, 'Plymouth', 'Colt' union all select
1992, 'Plymouth', 'Colt Vista' union all select
1992, 'Plymouth', 'Grand Voyager' union all select
1992, 'Plymouth', 'Sundance' union all select
1992, 'Plymouth', 'Voyager' union all select
1992, 'Honda', 'Prelude' union all select
1992, 'Honda', 'Accord' union all select
1992, 'Honda', 'Civic' union all select
1992, 'Eagle', 'Talon' union all select
1992, 'Eagle', 'Premier' union all select
1992, 'Eagle', 'Summit' union all select
1992, 'Acura', 'Integra' union all select
1992, 'Acura', 'Legend' union all select
1992, 'Acura', 'NSX' union all select
1992, 'Acura', 'Vigor' union all select
1992, 'Alfa Romeo', '164' union all select
1992, 'Alfa Romeo', 'Spider' union all select
1992, 'Chevrolet', '1500' union all select
1992, 'Chevrolet', '2500' union all select
1992, 'Chevrolet', '3500' union all select
1992, 'Chevrolet', 'APV' union all select
1992, 'Chevrolet', 'Astro' union all select
1992, 'Chevrolet', 'Beretta' union all select
1992, 'Chevrolet', 'Blazer' union all select
1992, 'Chevrolet', 'Camaro' union all select
1992, 'Chevrolet', 'Caprice' union all select
1992, 'Chevrolet', 'Cavalier' union all select
1992, 'Chevrolet', 'Corsica' union all select
1992, 'Chevrolet', 'Corvette' union all select
1992, 'Chevrolet', 'G-Series G10' union all select
1992, 'Chevrolet', 'G-Series G20' union all select
1992, 'Chevrolet', 'G-Series G30' union all select
1992, 'Chevrolet', 'Lumina' union all select
1992, 'Chevrolet', 'Lumina APV' union all select
1992, 'Chevrolet', 'S10 Blazer' union all select
1992, 'Chevrolet', 'S10' union all select
1992, 'Chevrolet', 'Sportvan G10' union all select
1992, 'Chevrolet', 'Sportvan G20' union all select
1992, 'Chevrolet', 'Sportvan G30' union all select
1992, 'Chevrolet', 'Suburban 1500' union all select
1992, 'Chevrolet', 'Suburban 2500' union all select
1992, 'Chrysler', 'Fifth Ave' union all select
1992, 'Chrysler', 'Imperial' union all select
1992, 'Chrysler', 'LeBaron' union all select
1992, 'Chrysler', 'New Yorker' union all select
1992, 'Chrysler', 'Town & Country' union all select
1992, 'Daihatsu', 'Charade' union all select
1992, 'Daihatsu', 'Rocky' union all select
1992, 'Geo', 'Metro' union all select
1992, 'Geo', 'Prizm' union all select
1992, 'Geo', 'Storm' union all select
1992, 'Geo', 'Tracker' union all select
1992, 'GMC', '1500' union all select
1992, 'GMC', '2500' union all select
1992, 'GMC', '3500' union all select
1992, 'GMC', '1500 Club Coupe' union all select
1992, 'GMC', '2500 Club Coupe' union all select
1992, 'GMC', '3500 Club Coupe' union all select
1992, 'GMC', 'Jimmy' union all select
1992, 'GMC', 'Rally Wagon 1500' union all select
1992, 'GMC', 'Rally Wagon 2500' union all select
1992, 'GMC', 'Rally Wagon 3500' union all select
1992, 'GMC', 'Safari' union all select
1992, 'GMC', 'Sonoma Club' union all select
1992, 'GMC', 'Sonoma' union all select
1992, 'GMC', 'Suburban 1500' union all select
1992, 'GMC', 'Suburban 2500' union all select
1992, 'GMC', 'Vandura 1500' union all select
1992, 'GMC', 'Vandura 2500' union all select
1992, 'GMC', 'Vandura 3500' union all select
1992, 'GMC', 'Yukon' union all select
1992, 'Hyundai', 'Elantra' union all select
1992, 'Hyundai', 'Excel' union all select
1992, 'Hyundai', 'Scoupe' union all select
1992, 'Hyundai', 'Sonata' union all select
1992, 'Infiniti', 'G' union all select
1992, 'Infiniti', 'M' union all select
1992, 'Infiniti', 'Q' union all select
1992, 'Isuzu', 'Amigo' union all select
1992, 'Isuzu', 'Impulse' union all select
1992, 'Isuzu', 'Rodeo' union all select
1992, 'Isuzu', 'Space' union all select
1992, 'Isuzu', 'Stylus' union all select
1992, 'Isuzu', 'Trooper' union all select
1992, 'Jaguar', 'XJ Series' union all select
1992, 'Jeep', 'Cherokee' union all select
1992, 'Jeep', 'Comanche' union all select
1992, 'Jeep', 'Wrangler' union all select
1992, 'Oldsmobile', '88' union all select
1992, 'Oldsmobile', '98' union all select
1992, 'Oldsmobile', 'Achieva' union all select
1992, 'Oldsmobile', 'Bravada' union all select
1992, 'Oldsmobile', 'Ciera' union all select
1992, 'Oldsmobile', 'Custom Cruiser' union all select
1992, 'Oldsmobile', 'Cutlass Supreme' union all select
1992, 'Oldsmobile', 'Silhouette' union all select
1992, 'Oldsmobile', 'Toronado' union all select
1992, 'Saturn', 'S-Series' union all select
1992, 'Volvo', '240' union all select
1992, 'Volvo', '740' union all select
1992, 'Volvo', '940' union all select
1992, 'Volvo', '960' union all select
1993, 'Subaru', 'Loyale' union all select
1993, 'Subaru', 'Alcyone SVX' union all select
1993, 'Subaru', 'Legacy' union all select
1993, 'Subaru', 'Justy' union all select
1993, 'Subaru', 'Impreza' union all select
1993, 'Subaru', 'SVX' union all select
1993, 'Suzuki', 'Sidekick' union all select
1993, 'Suzuki', 'Swift' union all select
1993, 'Suzuki', 'SJ' union all select
1993, 'Suzuki', 'Samurai' union all select
1993, 'Pontiac', 'Grand Prix' union all select
1993, 'Pontiac', 'Firebird' union all select
1993, 'Pontiac', 'Sunbird' union all select
1993, 'Pontiac', 'Grand Am' union all select
1993, 'Pontiac', 'LeMans' union all select
1993, 'Pontiac', 'Bonneville' union all select
1993, 'Pontiac', 'Trans Sport' union all select
1993, 'Mitsubishi', 'GTO' union all select
1993, 'Mitsubishi', 'Truck' union all select
1993, 'Mitsubishi', 'Galant' union all select
1993, 'Mitsubishi', 'RVR' union all select
1993, 'Mitsubishi', 'Diamante' union all select
1993, 'Mitsubishi', 'Chariot' union all select
1993, 'Mitsubishi', 'Mirage' union all select
1993, 'Mitsubishi', 'Eclipse' union all select
1993, 'Mitsubishi', 'Pajero' union all select
1993, 'Mitsubishi', '3000GT' union all select
1993, 'Mitsubishi', 'Expo' union all select
1993, 'Mitsubishi', 'Mighty Max Macro' union all select
1993, 'Mitsubishi', 'Mighty Max' union all select
1993, 'Mitsubishi', 'Montero' union all select
1993, 'Mitsubishi', 'Precis' union all select
1993, 'Ford', 'Tempo' union all select
1993, 'Ford', 'Taurus' union all select
1993, 'Ford', 'Aerostar' union all select
1993, 'Ford', 'Festiva' union all select
1993, 'Ford', 'Ranger' union all select
1993, 'Ford', 'E-Series' union all select
1993, 'Ford', 'Escort' union all select
1993, 'Ford', 'Mustang' union all select
1993, 'Ford', 'Explorer' union all select
1993, 'Ford', 'F-Series' union all select
1993, 'Ford', 'Bronco' union all select
1993, 'Ford', 'Thunderbird' union all select
1993, 'Ford', 'Probe' union all select
1993, 'Ford', 'LTD Crown Victoria' union all select
1993, 'Ford', 'Club Wagon' union all select
1993, 'Ford', 'Crown Victoria' union all select
1993, 'Ford', 'Econoline E150' union all select
1993, 'Ford', 'Econoline E250' union all select
1993, 'Ford', 'Econoline E350' union all select
1993, 'Ford', 'F150' union all select
1993, 'Ford', 'F250' union all select
1993, 'Ford', 'F350' union all select
1993, 'Mazda', '323' union all select
1993, 'Mazda', '626' union all select
1993, 'Mazda', '929' union all select
1993, 'Mazda', 'RX-7' union all select
1993, 'Mazda', 'B-Series' union all select
1993, 'Mazda', 'Navajo' union all select
1993, 'Mazda', 'MX-3' union all select
1993, 'Mazda', 'MX-6' union all select
1993, 'Mazda', 'Protege' union all select
1993, 'Mazda', 'MPV' union all select
1993, 'Mazda', 'MX-5' union all select
1993, 'Mazda', 'B-Series Plus' union all select
1993, 'Mazda', 'Miata MX-5' union all select
1993, 'Mercury', 'Sable' union all select
1993, 'Mercury', 'Capri' union all select
1993, 'Mercury', 'Villager' union all select
1993, 'Mercury', 'Cougar' union all select
1993, 'Mercury', 'Tracer' union all select
1993, 'Mercury', 'Topaz' union all select
1993, 'Mercury', 'Grand Marquis' union all select
1993, 'Buick', 'Park Avenue' union all select
1993, 'Buick', 'Skylark' union all select
1993, 'Buick', 'Roadmaster' union all select
1993, 'Buick', 'Century' union all select
1993, 'Buick', 'Coachbuilder' union all select
1993, 'Buick', 'Riviera' union all select
1993, 'Buick', 'Regal' union all select
1993, 'Buick', 'LeSabre' union all select
1993, 'Mercedes-Benz', 'W201' union all select
1993, 'Mercedes-Benz', 'S-Class' union all select
1993, 'Mercedes-Benz', 'C-Class' union all select
1993, 'Mercedes-Benz', 'SL-Class' union all select
1993, 'Mercedes-Benz', 'E-Class' union all select
1993, 'Mercedes-Benz', '190E' union all select
1993, 'Mercedes-Benz', '300CE' union all select
1993, 'Mercedes-Benz', '300D' union all select
1993, 'Mercedes-Benz', '300E' union all select
1993, 'Mercedes-Benz', '300SD' union all select
1993, 'Mercedes-Benz', '300SE' union all select
1993, 'Mercedes-Benz', '300SL' union all select
1993, 'Mercedes-Benz', '300TE' union all select
1993, 'Mercedes-Benz', '400E' union all select
1993, 'Mercedes-Benz', '400SEL' union all select
1993, 'Mercedes-Benz', '500E' union all select
1993, 'Mercedes-Benz', '500SEC' union all select
1993, 'Mercedes-Benz', '500SEL' union all select
1993, 'Mercedes-Benz', '500SL' union all select
1993, 'Mercedes-Benz', '600SEC' union all select
1993, 'Mercedes-Benz', '600SEL' union all select
1993, 'Mercedes-Benz', '600SL' union all select
1993, 'Porsche', '911' union all select
1993, 'Porsche', '928' union all select
1993, 'Porsche', '968' union all select
1993, 'Audi', '90' union all select
1993, 'Audi', '100' union all select
1993, 'Audi', 'S4' union all select
1993, 'Audi', 'Quattro' union all select
1993, 'Dodge', 'Viper RT/10' union all select
1993, 'Dodge', 'Intrepid' union all select
1993, 'Dodge', 'Caravan' union all select
1993, 'Dodge', 'Colt' union all select
1993, 'Dodge', 'D150 Club' union all select
1993, 'Dodge', 'D150' union all select
1993, 'Dodge', 'D250 Club' union all select
1993, 'Dodge', 'D250' union all select
1993, 'Dodge', 'D350 Club' union all select
1993, 'Dodge', 'D350' union all select
1993, 'Dodge', 'Dakota Club' union all select
1993, 'Dodge', 'Dakota' union all select
1993, 'Dodge', 'Daytona' union all select
1993, 'Dodge', 'Dynasty' union all select
1993, 'Dodge', 'Grand Caravan' union all select
1993, 'Dodge', 'Ram 50' union all select
1993, 'Dodge', 'Ram Van B150' union all select
1993, 'Dodge', 'Ram Van B250' union all select
1993, 'Dodge', 'Ram Van B350' union all select
1993, 'Dodge', 'Ram Wagon B150' union all select
1993, 'Dodge', 'Ram Wagon B250' union all select
1993, 'Dodge', 'Ram Wagon B350' union all select
1993, 'Dodge', 'Ramcharger' union all select
1993, 'Dodge', 'Shadow' union all select
1993, 'Dodge', 'Spirit' union all select
1993, 'Dodge', 'Stealth' union all select
1993, 'Dodge', 'Viper' union all select
1993, 'Lotus', 'Esprit' union all select
1993, 'Lotus', 'Elan' union all select
1993, 'Lamborghini', 'Diablo' union all select
1993, 'Saab', '900' union all select
1993, 'Saab', '9000' union all select
1993, 'Volkswagen', 'Fox' union all select
1993, 'Volkswagen', 'Passat' union all select
1993, 'Volkswagen', 'GTI' union all select
1993, 'Volkswagen', 'Golf' union all select
1993, 'Volkswagen', 'Corrado' union all select
1993, 'Volkswagen', 'Cabriolet' union all select
1993, 'Volkswagen', 'Eurovan' union all select
1993, 'Volkswagen', 'Jetta' union all select
1993, 'Volkswagen', 'riolet' union all select
1993, 'Volkswagen', 'Golf III' union all select
1993, 'Volkswagen', 'Jetta III' union all select
1993, 'BMW', '3 Series' union all select
1993, 'BMW', '5 Series' union all select
1993, 'BMW', '7 Series' union all select
1993, 'BMW', '8 Series' union all select
1993, 'BMW', 'M5' union all select
1993, 'Land Rover', 'Defender' union all select
1993, 'Land Rover', 'Range Rover Classic' union all select
1993, 'Land Rover', 'Defender 110' union all select
1993, 'Land Rover', 'Range Rover' union all select
1993, 'Nissan', 'Sentra' union all select
1993, 'Nissan', '300ZX' union all select
1993, 'Nissan', '240SX' union all select
1993, 'Nissan', 'Altima' union all select
1993, 'Nissan', 'Maxima' union all select
1993, 'Nissan', 'NX' union all select
1993, 'Nissan', 'Pathfinder' union all select
1993, 'Nissan', 'Quest' union all select
1993, 'Lincoln', 'Town Car' union all select
1993, 'Lincoln', 'Continental' union all select
1993, 'Lincoln', 'Mark VIII' union all select
1993, 'Lexus', 'SC' union all select
1993, 'Lexus', 'GS' union all select
1993, 'Lexus', 'LS' union all select
1993, 'Lexus', 'ES' union all select
1993, 'Chrysler', 'Concorde' union all select
1993, 'Chrysler', 'Fifth Ave' union all select
1993, 'Chrysler', 'Imperial' union all select
1993, 'Chrysler', 'LeBaron' union all select
1993, 'Chrysler', 'New Yorker' union all select
1993, 'Chrysler', 'Town & Country' union all select
1993, 'Honda', 'Prelude' union all select
1993, 'Honda', 'Accord' union all select
1993, 'Honda', 'Civic' union all select
1993, 'Honda', 'del Sol' union all select
1993, 'Toyota', 'Camry' union all select
1993, 'Toyota', '4Runner' union all select
1993, 'Toyota', 'Celica' union all select
1993, 'Toyota', 'Corolla' union all select
1993, 'Toyota', 'Land Cruiser' union all select
1993, 'Toyota', 'MR2' union all select
1993, 'Toyota', 'Paseo' union all select
1993, 'Toyota', 'Previa' union all select
1993, 'Toyota', 'Supra' union all select
1993, 'Toyota', 'T100' union all select
1993, 'Toyota', 'Tercel' union all select
1993, 'Toyota', 'Xtra' union all select
1993, 'Jeep', 'Grand Cherokee' union all select
1993, 'Jeep', 'Cherokee' union all select
1993, 'Jeep', 'Wrangler' union all select
1993, 'Acura', 'Integra' union all select
1993, 'Acura', 'Legend' union all select
1993, 'Acura', 'NSX' union all select
1993, 'Acura', 'Vigor' union all select
1993, 'Alfa Romeo', '164' union all select
1993, 'Alfa Romeo', 'Spider' union all select
1993, 'Cadillac', 'Allante' union all select
1993, 'Cadillac', 'DeVille' union all select
1993, 'Cadillac', 'Eldorado' union all select
1993, 'Cadillac', 'Fleetwood' union all select
1993, 'Cadillac', 'Seville' union all select
1993, 'Cadillac', 'Sixty Special' union all select
1993, 'Chevrolet', '1500' union all select
1993, 'Chevrolet', '2500' union all select
1993, 'Chevrolet', '3500' union all select
1993, 'Chevrolet', 'APV' union all select
1993, 'Chevrolet', 'Astro' union all select
1993, 'Chevrolet', 'Beretta' union all select
1993, 'Chevrolet', 'Blazer' union all select
1993, 'Chevrolet', 'Camaro' union all select
1993, 'Chevrolet', 'Caprice Classic' union all select
1993, 'Chevrolet', 'Cavalier' union all select
1993, 'Chevrolet', 'Corsica' union all select
1993, 'Chevrolet', 'Corvette' union all select
1993, 'Chevrolet', 'G-Series G10' union all select
1993, 'Chevrolet', 'G-Series G20' union all select
1993, 'Chevrolet', 'G-Series G30' union all select
1993, 'Chevrolet', 'Lumina' union all select
1993, 'Chevrolet', 'Lumina APV' union all select
1993, 'Chevrolet', 'S10 Blazer' union all select
1993, 'Chevrolet', 'S10' union all select
1993, 'Chevrolet', 'Sportvan G10' union all select
1993, 'Chevrolet', 'Sportvan G20' union all select
1993, 'Chevrolet', 'Sportvan G30' union all select
1993, 'Chevrolet', 'Suburban 1500' union all select
1993, 'Chevrolet', 'Suburban 2500' union all select
1993, 'Eagle', 'Summit' union all select
1993, 'Eagle', 'Talon' union all select
1993, 'Eagle', 'Vision' union all select
1993, 'Geo', 'Metro' union all select
1993, 'Geo', 'Prizm' union all select
1993, 'Geo', 'Storm' union all select
1993, 'Geo', 'Tracker' union all select
1993, 'GMC', '1500' union all select
1993, 'GMC', '2500' union all select
1993, 'GMC', '3500' union all select
1993, 'GMC', '1500 Club Coupe' union all select
1993, 'GMC', '2500 Club Coupe' union all select
1993, 'GMC', '3500 Club Coupe' union all select
1993, 'GMC', 'Jimmy' union all select
1993, 'GMC', 'Rally Wagon 1500' union all select
1993, 'GMC', 'Rally Wagon 2500' union all select
1993, 'GMC', 'Rally Wagon 3500' union all select
1993, 'GMC', 'Safari' union all select
1993, 'GMC', 'Sonoma Club Coupe' union all select
1993, 'GMC', 'Sonoma' union all select
1993, 'GMC', 'Suburban 1500' union all select
1993, 'GMC', 'Suburban 2500' union all select
1993, 'GMC', 'Vandura 1500' union all select
1993, 'GMC', 'Vandura 2500' union all select
1993, 'GMC', 'Vandura 3500' union all select
1993, 'GMC', 'Yukon' union all select
1993, 'HUMMER', 'H1' union all select
1993, 'Hyundai', 'Elantra' union all select
1993, 'Hyundai', 'Excel' union all select
1993, 'Hyundai', 'Scoupe' union all select
1993, 'Hyundai', 'Sonata' union all select
1993, 'Infiniti', 'G' union all select
1993, 'Infiniti', 'J' union all select
1993, 'Infiniti', 'Q' union all select
1993, 'Isuzu', 'Amigo' union all select
1993, 'Isuzu', 'Rodeo' union all select
1993, 'Isuzu', 'Space' union all select
1993, 'Isuzu', 'Stylus' union all select
1993, 'Isuzu', 'Trooper' union all select
1993, 'Jaguar', 'XJ Series' union all select
1993, 'Oldsmobile', '88' union all select
1993, 'Oldsmobile', '98' union all select
1993, 'Oldsmobile', 'Achieva' union all select
1993, 'Oldsmobile', 'Bravada' union all select
1993, 'Oldsmobile', 'Ciera' union all select
1993, 'Oldsmobile', 'Cutlass Cruiser' union all select
1993, 'Oldsmobile', 'Cutlass Supreme' union all select
1993, 'Oldsmobile', 'Silhouette' union all select
1993, 'Plymouth', 'Acclaim' union all select
1993, 'Plymouth', 'Colt' union all select
1993, 'Plymouth', 'Colt Vista' union all select
1993, 'Plymouth', 'Grand Voyager' union all select
1993, 'Plymouth', 'Laser' union all select
1993, 'Plymouth', 'Sundance' union all select
1993, 'Plymouth', 'Voyager' union all select
1993, 'Saturn', 'S-Series' union all select
1993, 'Volvo', '240' union all select
1993, 'Volvo', '850' union all select
1993, 'Volvo', '940' union all select
1993, 'Volvo', '960' union all select
1994, 'Ford', 'Taurus' union all select
1994, 'Ford', 'Aerostar' union all select
1994, 'Ford', 'Escort' union all select
1994, 'Ford', 'Mustang' union all select
1994, 'Ford', 'E-Series' union all select
1994, 'Ford', 'Probe' union all select
1994, 'Ford', 'Thunderbird' union all select
1994, 'Ford', 'Tempo' union all select
1994, 'Ford', 'F-Series' union all select
1994, 'Ford', 'Explorer' union all select
1994, 'Ford', 'Lightning' union all select
1994, 'Ford', 'Aspire' union all select
1994, 'Ford', 'Ranger' union all select
1994, 'Ford', 'Bronco' union all select
1994, 'Ford', 'Crown Victoria' union all select
1994, 'Ford', 'Club Wagon' union all select
1994, 'Ford', 'Econoline E150' union all select
1994, 'Ford', 'Econoline E250' union all select
1994, 'Ford', 'Econoline E350' union all select
1994, 'Ford', 'F150' union all select
1994, 'Ford', 'F250' union all select
1994, 'Ford', 'F350' union all select
1994, 'Mercedes-Benz', 'C-Class' union all select
1994, 'Mercedes-Benz', 'SL-Class' union all select
1994, 'Mercedes-Benz', 'E-Class' union all select
1994, 'Mercedes-Benz', 'S-Class' union all select
1994, 'Kia', 'Sephia' union all select
1994, 'Buick', 'Roadmaster' union all select
1994, 'Buick', 'Park Avenue' union all select
1994, 'Buick', 'Century' union all select
1994, 'Buick', 'LeSabre' union all select
1994, 'Buick', 'Skylark' union all select
1994, 'Buick', 'Regal' union all select
1994, 'Buick', 'Coachbuilder' union all select
1994, 'Mercury', 'Sable' union all select
1994, 'Mercury', 'Topaz' union all select
1994, 'Mercury', 'Capri' union all select
1994, 'Mercury', 'Villager' union all select
1994, 'Mercury', 'Tracer' union all select
1994, 'Mercury', 'Cougar' union all select
1994, 'Mercury', 'Grand Marquis' union all select
1994, 'Mitsubishi', 'Eclipse' union all select
1994, 'Mitsubishi', 'Mirage' union all select
1994, 'Mitsubishi', 'Diamante' union all select
1994, 'Mitsubishi', 'Galant' union all select
1994, 'Mitsubishi', 'Truck' union all select
1994, 'Mitsubishi', 'Chariot' union all select
1994, 'Mitsubishi', 'RVR' union all select
1994, 'Mitsubishi', 'GTO' union all select
1994, 'Mitsubishi', 'Pajero' union all select
1994, 'Mitsubishi', '3000GT' union all select
1994, 'Mitsubishi', 'Expo' union all select
1994, 'Mitsubishi', 'Mighty Max Macro' union all select
1994, 'Mitsubishi', 'Mighty Max' union all select
1994, 'Mitsubishi', 'Montero' union all select
1994, 'Mitsubishi', 'Precis' union all select
1994, 'Eagle', 'Vision' union all select
1994, 'Eagle', 'Summit' union all select
1994, 'Eagle', 'Talon' union all select
1994, 'Volkswagen', 'Passat' union all select
1994, 'Volkswagen', 'Jetta' union all select
1994, 'Volkswagen', 'Golf' union all select
1994, 'Volkswagen', 'Corrado' union all select
1994, 'Volkswagen', 'Eurovan' union all select
1994, 'Volkswagen', 'Golf III' union all select
1994, 'Volkswagen', 'Jetta III' union all select
1994, 'Lexus', 'SC' union all select
1994, 'Lexus', 'LS' union all select
1994, 'Lexus', 'GS' union all select
1994, 'Lexus', 'ES' union all select
1994, 'Dodge', 'Intrepid' union all select
1994, 'Dodge', 'Ram' union all select
1994, 'Dodge', 'Viper RT/10' union all select
1994, 'Dodge', 'Caravan' union all select
1994, 'Dodge', 'Colt' union all select
1994, 'Dodge', 'Dakota Club' union all select
1994, 'Dodge', 'Dakota' union all select
1994, 'Dodge', 'Grand Caravan' union all select
1994, 'Dodge', 'Ram 1500' union all select
1994, 'Dodge', 'Ram 2500' union all select
1994, 'Dodge', 'Ram 3500' union all select
1994, 'Dodge', 'Ram Van B150' union all select
1994, 'Dodge', 'Ram Van B250' union all select
1994, 'Dodge', 'Ram Van B350' union all select
1994, 'Dodge', 'Ram Wagon B150' union all select
1994, 'Dodge', 'Ram Wagon B250' union all select
1994, 'Dodge', 'Ram Wagon B350' union all select
1994, 'Dodge', 'Shadow' union all select
1994, 'Dodge', 'Spirit' union all select
1994, 'Dodge', 'Stealth' union all select
1994, 'Dodge', 'Viper' union all select
1994, 'Chevrolet', '1500' union all select
1994, 'Chevrolet', '2500' union all select
1994, 'Chevrolet', '3500' union all select
1994, 'Chevrolet', 'Impala SS' union all select
1994, 'Chevrolet', 'Caprice' union all select
1994, 'Chevrolet', 'Astro' union all select
1994, 'Chevrolet', 'Beretta' union all select
1994, 'Chevrolet', 'Blazer' union all select
1994, 'Chevrolet', 'Camaro' union all select
1994, 'Chevrolet', 'Caprice Classic' union all select
1994, 'Chevrolet', 'Cavalier' union all select
1994, 'Chevrolet', 'Corsica' union all select
1994, 'Chevrolet', 'Corvette' union all select
1994, 'Chevrolet', 'G-Series G10' union all select
1994, 'Chevrolet', 'G-Series G20' union all select
1994, 'Chevrolet', 'G-Series G30' union all select
1994, 'Chevrolet', 'Impala' union all select
1994, 'Chevrolet', 'Lumina' union all select
1994, 'Chevrolet', 'S10 Blazer' union all select
1994, 'Chevrolet', 'S10' union all select
1994, 'Chevrolet', 'Sportvan G20' union all select
1994, 'Chevrolet', 'Sportvan G30' union all select
1994, 'Chevrolet', 'Suburban 1500' union all select
1994, 'Chevrolet', 'Suburban 2500' union all select
1994, 'Lincoln', 'Mark VIII' union all select
1994, 'Lincoln', 'Town Car' union all select
1994, 'Lincoln', 'Continental' union all select
1994, 'Audi', '90' union all select
1994, 'Audi', '100' union all select
1994, 'Audi', 'V8' union all select
1994, 'Audi', 'Cabriolet' union all select
1994, 'Audi', 'S4' union all select
1994, 'Audi', 'riolet' union all select
1994, 'Audi', 'Quattro' union all select
1994, 'Saab', '900' union all select
1994, 'Saab', '9000' union all select
1994, 'Mazda', '323' union all select
1994, 'Mazda', '626' union all select
1994, 'Mazda', '929' union all select
1994, 'Mazda', 'B-Series' union all select
1994, 'Mazda', 'MPV' union all select
1994, 'Mazda', 'MX-3' union all select
1994, 'Mazda', 'Protege' union all select
1994, 'Mazda', 'Navajo' union all select
1994, 'Mazda', 'RX-7' union all select
1994, 'Mazda', 'MX-5' union all select
1994, 'Mazda', 'MX-6' union all select
1994, 'Mazda', 'B-Series Plus' union all select
1994, 'Mazda', 'Miata MX-5' union all select
1994, 'Subaru', 'Justy' union all select
1994, 'Subaru', 'Legacy' union all select
1994, 'Subaru', 'Alcyone SVX' union all select
1994, 'Subaru', 'Loyale' union all select
1994, 'Subaru', 'Impreza' union all select
1994, 'Subaru', 'SVX' union all select
1994, 'Land Rover', 'Discovery' union all select
1994, 'Land Rover', 'Range Rover' union all select
1994, 'Land Rover', 'Defender' union all select
1994, 'Land Rover', 'Defender 90' union all select
1994, 'Nissan', '300ZX' union all select
1994, 'Nissan', 'Sentra' union all select
1994, 'Nissan', '240SX' union all select
1994, 'Nissan', 'Altima' union all select
1994, 'Nissan', 'Maxima' union all select
1994, 'Nissan', 'Pathfinder' union all select
1994, 'Nissan', 'Quest' union all select
1994, 'Honda', 'Prelude' union all select
1994, 'Honda', 'Accord' union all select
1994, 'Honda', 'Civic' union all select
1994, 'Honda', 'del Sol' union all select
1994, 'Honda', 'Passport' union all select
1994, 'Pontiac', 'Firebird' union all select
1994, 'Pontiac', 'Grand Prix' union all select
1994, 'Pontiac', 'Bonneville' union all select
1994, 'Pontiac', 'Trans Sport' union all select
1994, 'Pontiac', 'Sunbird' union all select
1994, 'Pontiac', 'Grand Am' union all select
1994, 'Pontiac', 'Firefly' union all select
1994, 'Lamborghini', 'Diablo' union all select
1994, 'Suzuki', 'Swift' union all select
1994, 'Suzuki', 'Sidekick' union all select
1994, 'Suzuki', 'SJ' union all select
1994, 'Suzuki', 'Samurai' union all select
1994, 'Lotus', 'Esprit' union all select
1994, 'Lotus', 'Elan' union all select
1994, 'Porsche', '911' union all select
1994, 'Porsche', '928' union all select
1994, 'Porsche', '968' union all select
1994, 'Acura', 'Integra' union all select
1994, 'Acura', 'Legend' union all select
1994, 'Acura', 'NSX' union all select
1994, 'Acura', 'Vigor' union all select
1994, 'BMW', '3 Series' union all select
1994, 'BMW', '5 Series' union all select
1994, 'BMW', '7 Series' union all select
1994, 'BMW', '8 Series' union all select
1994, 'Chrysler', 'Concorde' union all select
1994, 'Chrysler', 'LeBaron' union all select
1994, 'Chrysler', 'LHS' union all select
1994, 'Chrysler', 'New Yorker' union all select
1994, 'Chrysler', 'Town & Country' union all select
1994, 'Alfa Romeo', '164' union all select
1994, 'Alfa Romeo', 'Spider' union all select
1994, 'Cadillac', 'DeVille' union all select
1994, 'Cadillac', 'Eldorado' union all select
1994, 'Cadillac', 'Fleetwood' union all select
1994, 'Cadillac', 'Seville' union all select
1994, 'Geo', 'Metro' union all select
1994, 'Geo', 'Prizm' union all select
1994, 'Geo', 'Tracker' union all select
1994, 'GMC', '1500' union all select
1994, 'GMC', '2500' union all select
1994, 'GMC', '3500' union all select
1994, 'GMC', '1500 Club Coupe' union all select
1994, 'GMC', '2500 Club Coupe' union all select
1994, 'GMC', '3500 Club Coupe' union all select
1994, 'GMC', 'Jimmy' union all select
1994, 'GMC', 'Rally Wagon 2500' union all select
1994, 'GMC', 'Rally Wagon 3500' union all select
1994, 'GMC', 'Safari' union all select
1994, 'GMC', 'Sonoma Club Coupe' union all select
1994, 'GMC', 'Sonoma' union all select
1994, 'GMC', 'Suburban 1500' union all select
1994, 'GMC', 'Suburban 2500' union all select
1994, 'GMC', 'Vandura 1500' union all select
1994, 'GMC', 'Vandura 2500' union all select
1994, 'GMC', 'Vandura 3500' union all select
1994, 'GMC', 'Yukon' union all select
1994, 'HUMMER', 'H1' union all select
1994, 'Hyundai', 'Elantra' union all select
1994, 'Hyundai', 'Excel' union all select
1994, 'Hyundai', 'Scoupe' union all select
1994, 'Hyundai', 'Sonata' union all select
1994, 'Infiniti', 'G' union all select
1994, 'Infiniti', 'J' union all select
1994, 'Infiniti', 'Q' union all select
1994, 'Isuzu', 'Amigo' union all select
1994, 'Isuzu', 'Rodeo' union all select
1994, 'Isuzu', 'Space' union all select
1994, 'Isuzu', 'Trooper' union all select
1994, 'Jaguar', 'XJ Series' union all select
1994, 'Jeep', 'Cherokee' union all select
1994, 'Jeep', 'Grand Cherokee' union all select
1994, 'Jeep', 'Wrangler' union all select
1994, 'Oldsmobile', '88' union all select
1994, 'Oldsmobile', '98' union all select
1994, 'Oldsmobile', 'Achieva' union all select
1994, 'Oldsmobile', 'Bravada' union all select
1994, 'Oldsmobile', 'Ciera' union all select
1994, 'Oldsmobile', 'Cutlass Cruiser' union all select
1994, 'Oldsmobile', 'Cutlass Supreme' union all select
1994, 'Oldsmobile', 'Silhouette' union all select
1994, 'Plymouth', 'Acclaim' union all select
1994, 'Plymouth', 'Colt' union all select
1994, 'Plymouth', 'Colt Vista' union all select
1994, 'Plymouth', 'Grand Voyager' union all select
1994, 'Plymouth', 'Laser' union all select
1994, 'Plymouth', 'Sundance' union all select
1994, 'Plymouth', 'Voyager' union all select
1994, 'Saturn', 'S-Series' union all select
1994, 'Toyota', '4Runner' union all select
1994, 'Toyota', 'Camry' union all select
1994, 'Toyota', 'Celica' union all select
1994, 'Toyota', 'Corolla' union all select
1994, 'Toyota', 'Land Cruiser' union all select
1994, 'Toyota', 'MR2' union all select
1994, 'Toyota', 'Paseo' union all select
1994, 'Toyota', 'Previa' union all select
1994, 'Toyota', 'Supra' union all select
1994, 'Toyota', 'T100' union all select
1994, 'Toyota', 'Tercel' union all select
1994, 'Toyota', 'Xtra' union all select
1994, 'Volvo', '850' union all select
1994, 'Volvo', '940' union all select
1994, 'Volvo', '960' union all select
1995, 'Kia', 'Sephia' union all select
1995, 'Kia', 'Sportage' union all select
1995, 'Pontiac', 'Firebird' union all select
1995, 'Pontiac', 'Sunfire' union all select
1995, 'Pontiac', 'Firefly' union all select
1995, 'Pontiac', 'Grand Am' union all select
1995, 'Pontiac', 'Grand Prix' union all select
1995, 'Pontiac', 'Trans Sport' union all select
1995, 'Pontiac', 'Bonneville' union all select
1995, 'Ford', 'F-Series' union all select
1995, 'Ford', 'Windstar' union all select
1995, 'Ford', 'Contour' union all select
1995, 'Ford', 'Escort' union all select
1995, 'Ford', 'Aerostar' union all select
1995, 'Ford', 'Crown Victoria' union all select
1995, 'Ford', 'E-Series' union all select
1995, 'Ford', 'Bronco' union all select
1995, 'Ford', 'Ranger' union all select
1995, 'Ford', 'Explorer' union all select
1995, 'Ford', 'Probe' union all select
1995, 'Ford', 'Mustang' union all select
1995, 'Ford', 'Thunderbird' union all select
1995, 'Ford', 'Taurus' union all select
1995, 'Ford', 'Aspire' union all select
1995, 'Ford', 'Club Wagon' union all select
1995, 'Ford', 'Econoline E150' union all select
1995, 'Ford', 'Econoline E250' union all select
1995, 'Ford', 'Econoline E350' union all select
1995, 'Ford', 'F150' union all select
1995, 'Ford', 'F250' union all select
1995, 'Ford', 'F350' union all select
1995, 'Mercedes-Benz', 'S-Class' union all select
1995, 'Mercedes-Benz', 'SL-Class' union all select
1995, 'Mercedes-Benz', 'C-Class' union all select
1995, 'Mercedes-Benz', 'E-Class' union all select
1995, 'Porsche', '911' union all select
1995, 'Porsche', '928' union all select
1995, 'Porsche', '968' union all select
1995, 'Volkswagen', 'Passat' union all select
1995, 'Volkswagen', 'Eurovan' union all select
1995, 'Volkswagen', 'Cabriolet' union all select
1995, 'Volkswagen', 'Jetta' union all select
1995, 'Volkswagen', 'GTI' union all select
1995, 'Volkswagen', 'Golf' union all select
1995, 'Volkswagen', 'rio' union all select
1995, 'Volkswagen', 'Golf III' union all select
1995, 'Volkswagen', 'Jetta III' union all select
1995, 'Subaru', 'Legacy' union all select
1995, 'Subaru', 'Impreza' union all select
1995, 'Subaru', 'Alcyone SVX' union all select
1995, 'Subaru', 'SVX' union all select
1995, 'Mercury', 'Sable' union all select
1995, 'Mercury', 'Villager' union all select
1995, 'Mercury', 'Cougar' union all select
1995, 'Mercury', 'Tracer' union all select
1995, 'Mercury', 'Mystique' union all select
1995, 'Mercury', 'Grand Marquis' union all select
1995, 'Lincoln', 'Town Car' union all select
1995, 'Lincoln', 'Mark VIII' union all select
1995, 'Lincoln', 'Continental' union all select
1995, 'Suzuki', 'SJ' union all select
1995, 'Suzuki', 'Swift' union all select
1995, 'Suzuki', 'Sidekick' union all select
1995, 'Suzuki', 'Esteem' union all select
1995, 'Suzuki', 'Samurai' union all select
1995, 'Buick', 'Century' union all select
1995, 'Buick', 'Skylark' union all select
1995, 'Buick', 'Park Avenue' union all select
1995, 'Buick', 'Roadmaster' union all select
1995, 'Buick', 'Regal' union all select
1995, 'Buick', 'LeSabre' union all select
1995, 'Buick', 'Coachbuilder' union all select
1995, 'Buick', 'Riviera' union all select
1995, 'Mazda', '323' union all select
1995, 'Mazda', '626' union all select
1995, 'Mazda', '929' union all select
1995, 'Mazda', 'RX-7' union all select
1995, 'Mazda', 'Millenia' union all select
1995, 'Mazda', 'B-Series' union all select
1995, 'Mazda', 'MPV' union all select
1995, 'Mazda', 'MX-3' union all select
1995, 'Mazda', 'MX-5' union all select
1995, 'Mazda', 'Protege' union all select
1995, 'Mazda', 'MX-6' union all select
1995, 'Mazda', 'B-Series Plus' union all select
1995, 'Mazda', 'Miata MX-5' union all select
1995, 'Mitsubishi', 'Galant' union all select
1995, 'Mitsubishi', 'Mirage' union all select
1995, 'Mitsubishi', 'RVR' union all select
1995, 'Mitsubishi', 'Truck' union all select
1995, 'Mitsubishi', 'Eclipse' union all select
1995, 'Mitsubishi', 'Pajero' union all select
1995, 'Mitsubishi', 'GTO' union all select
1995, 'Mitsubishi', 'Chariot' union all select
1995, 'Mitsubishi', 'Diamante' union all select
1995, 'Mitsubishi', '3000GT' union all select
1995, 'Mitsubishi', 'Expo' union all select
1995, 'Mitsubishi', 'Mighty Max' union all select
1995, 'Mitsubishi', 'Montero' union all select
1995, 'Audi', '90' union all select
1995, 'Audi', 'S6' union all select
1995, 'Audi', 'Cabriolet' union all select
1995, 'Audi', 'A6' union all select
1995, 'Audi', 'riolet' union all select
1995, 'Acura', 'Integra' union all select
1995, 'Acura', 'Legend' union all select
1995, 'Acura', 'NSX' union all select
1995, 'Acura', 'TL' union all select
1995, 'Lexus', 'SC' union all select
1995, 'Lexus', 'LS' union all select
1995, 'Lexus', 'GS' union all select
1995, 'Lexus', 'ES' union all select
1995, 'BMW', '3 Series' union all select
1995, 'BMW', '5 Series' union all select
1995, 'BMW', '7 Series' union all select
1995, 'BMW', '8 Series' union all select
1995, 'BMW', 'M3' union all select
1995, 'Land Rover', 'Defender' union all select
1995, 'Land Rover', 'Range Rover' union all select
1995, 'Land Rover', 'Discovery' union all select
1995, 'Land Rover', 'Defender 90' union all select
1995, 'Dodge', 'Viper RT/10' union all select
1995, 'Dodge', 'Avenger' union all select
1995, 'Dodge', 'Caravan' union all select
1995, 'Dodge', 'Dakota Club' union all select
1995, 'Dodge', 'Dakota' union all select
1995, 'Dodge', 'Grand Caravan' union all select
1995, 'Dodge', 'Intrepid' union all select
1995, 'Dodge', 'Neon' union all select
1995, 'Dodge', 'Ram 1500 Club' union all select
1995, 'Dodge', 'Ram 1500' union all select
1995, 'Dodge', 'Ram 2500 Club' union all select
1995, 'Dodge', 'Ram 2500' union all select
1995, 'Dodge', 'Ram 3500 Club' union all select
1995, 'Dodge', 'Ram 3500' union all select
1995, 'Dodge', 'Ram Van 1500' union all select
1995, 'Dodge', 'Ram Van 2500' union all select
1995, 'Dodge', 'Ram Van 3500' union all select
1995, 'Dodge', 'Spirit' union all select
1995, 'Dodge', 'Stealth' union all select
1995, 'Dodge', 'Stratus' union all select
1995, 'Dodge', 'Viper' union all select
1995, 'Saab', '900' union all select
1995, 'Saab', '9000' union all select
1995, 'Nissan', '300ZX' union all select
1995, 'Nissan', 'Maxima' union all select
1995, 'Nissan', '200SX' union all select
1995, 'Nissan', '240SX' union all select
1995, 'Nissan', 'Altima' union all select
1995, 'Nissan', 'Pathfinder' union all select
1995, 'Nissan', 'Quest' union all select
1995, 'Nissan', 'Sentra' union all select
1995, 'Chevrolet', '1500' union all select
1995, 'Chevrolet', '2500' union all select
1995, 'Chevrolet', '3500' union all select
1995, 'Chevrolet', 'K5 Blazer' union all select
1995, 'Chevrolet', 'Impala SS' union all select
1995, 'Chevrolet', 'Caprice' union all select
1995, 'Chevrolet', 'Astro' union all select
1995, 'Chevrolet', 'Beretta' union all select
1995, 'Chevrolet', 'Blazer' union all select
1995, 'Chevrolet', 'Camaro' union all select
1995, 'Chevrolet', 'Caprice Classic' union all select
1995, 'Chevrolet', 'Cavalier' union all select
1995, 'Chevrolet', 'Corsica' union all select
1995, 'Chevrolet', 'Corvette' union all select
1995, 'Chevrolet', 'G-Series G10' union all select
1995, 'Chevrolet', 'G-Series G20' union all select
1995, 'Chevrolet', 'G-Series G30' union all select
1995, 'Chevrolet', 'Impala' union all select
1995, 'Chevrolet', 'Lumina' union all select
1995, 'Chevrolet', 'Monte Carlo' union all select
1995, 'Chevrolet', 'S10' union all select
1995, 'Chevrolet', 'Sportvan G20' union all select
1995, 'Chevrolet', 'Sportvan G30' union all select
1995, 'Chevrolet', 'Suburban 1500' union all select
1995, 'Chevrolet', 'Suburban 2500' union all select
1995, 'Chevrolet', 'Tahoe' union all select
1995, 'Honda', 'Prelude' union all select
1995, 'Honda', 'Accord' union all select
1995, 'Honda', 'Civic' union all select
1995, 'Honda', 'del Sol' union all select
1995, 'Honda', 'Odyssey' union all select
1995, 'Honda', 'Passport' union all select
1995, 'Chrysler', 'Cirrus' union all select
1995, 'Chrysler', 'Concorde' union all select
1995, 'Chrysler', 'LeBaron' union all select
1995, 'Chrysler', 'LHS' union all select
1995, 'Chrysler', 'New Yorker' union all select
1995, 'Chrysler', 'Sebring' union all select
1995, 'Chrysler', 'Town & Country' union all select
1995, 'Jeep', 'Grand Cherokee' union all select
1995, 'Jeep', 'Cherokee' union all select
1995, 'Jeep', 'Wrangler' union all select
1995, 'Lamborghini', 'Diablo' union all select
1995, 'Holden', 'VS Commodore' union all select
1995, 'Lotus', 'Esprit' union all select
1995, 'Alfa Romeo', '164' union all select
1995, 'Cadillac', 'DeVille' union all select
1995, 'Cadillac', 'Eldorado' union all select
1995, 'Cadillac', 'Fleetwood' union all select
1995, 'Cadillac', 'Seville' union all select
1995, 'Eagle', 'Summit' union all select
1995, 'Eagle', 'Talon' union all select
1995, 'Eagle', 'Vision' union all select
1995, 'Geo', 'Metro' union all select
1995, 'Geo', 'Prizm' union all select
1995, 'Geo', 'Tracker' union all select
1995, 'GMC', '1500' union all select
1995, 'GMC', '2500' union all select
1995, 'GMC', '3500' union all select
1995, 'GMC', '1500 Club Coupe' union all select
1995, 'GMC', '2500 Club Coupe' union all select
1995, 'GMC', '3500 Club Coupe' union all select
1995, 'GMC', 'Jimmy' union all select
1995, 'GMC', 'Rally Wagon G2500' union all select
1995, 'GMC', 'Rally Wagon G3500' union all select
1995, 'GMC', 'Safari' union all select
1995, 'GMC', 'Sonoma Club Coupe' union all select
1995, 'GMC', 'Sonoma' union all select
1995, 'GMC', 'Suburban 1500' union all select
1995, 'GMC', 'Suburban 2500' union all select
1995, 'GMC', 'Vandura G1500' union all select
1995, 'GMC', 'Vandura G2500' union all select
1995, 'GMC', 'Vandura G3500' union all select
1995, 'GMC', 'Yukon' union all select
1995, 'HUMMER', 'H1' union all select
1995, 'Hyundai', 'Accent' union all select
1995, 'Hyundai', 'Elantra' union all select
1995, 'Hyundai', 'Scoupe' union all select
1995, 'Hyundai', 'Sonata' union all select
1995, 'Infiniti', 'G' union all select
1995, 'Infiniti', 'J' union all select
1995, 'Infiniti', 'Q' union all select
1995, 'Isuzu', 'Rodeo' union all select
1995, 'Isuzu', 'Trooper' union all select
1995, 'Jaguar', 'XJ Series' union all select
1995, 'Oldsmobile', '88' union all select
1995, 'Oldsmobile', '98' union all select
1995, 'Oldsmobile', 'Achieva' union all select
1995, 'Oldsmobile', 'Aurora' union all select
1995, 'Oldsmobile', 'Ciera' union all select
1995, 'Oldsmobile', 'Cutlass Supreme' union all select
1995, 'Oldsmobile', 'Silhouette' union all select
1995, 'Plymouth', 'Acclaim' union all select
1995, 'Plymouth', 'Grand Voyager' union all select
1995, 'Plymouth', 'Neon' union all select
1995, 'Plymouth', 'Voyager' union all select
1995, 'Saturn', 'S-Series' union all select
1995, 'Toyota', '4Runner' union all select
1995, 'Toyota', 'Avalon' union all select
1995, 'Toyota', 'Camry' union all select
1995, 'Toyota', 'Celica' union all select
1995, 'Toyota', 'Corolla' union all select
1995, 'Toyota', 'Land Cruiser' union all select
1995, 'Toyota', 'MR2' union all select
1995, 'Toyota', 'Paseo' union all select
1995, 'Toyota', 'Previa' union all select
1995, 'Toyota', 'Supra' union all select
1995, 'Toyota', 'T100' union all select
1995, 'Toyota', 'T100 Xtra' union all select
1995, 'Toyota', 'Tacoma' union all select
1995, 'Toyota', 'Tacoma Xtra' union all select
1995, 'Toyota', 'Tercel' union all select
1995, 'Toyota', 'Xtra' union all select
1995, 'Volvo', '850' union all select
1995, 'Volvo', '940' union all select
1995, 'Volvo', '960' union all select
1996, 'Dodge', 'Caravan' union all select
1996, 'Dodge', 'Stratus' union all select
1996, 'Dodge', 'Avenger' union all select
1996, 'Dodge', 'Dakota Club' union all select
1996, 'Dodge', 'Dakota' union all select
1996, 'Dodge', 'Grand Caravan' union all select
1996, 'Dodge', 'Intrepid' union all select
1996, 'Dodge', 'Neon' union all select
1996, 'Dodge', 'Ram 1500 Club' union all select
1996, 'Dodge', 'Ram 1500' union all select
1996, 'Dodge', 'Ram 2500 Club' union all select
1996, 'Dodge', 'Ram 2500' union all select
1996, 'Dodge', 'Ram 3500 Club' union all select
1996, 'Dodge', 'Ram 3500' union all select
1996, 'Dodge', 'Ram Van 1500' union all select
1996, 'Dodge', 'Ram Van 2500' union all select
1996, 'Dodge', 'Ram Van 3500' union all select
1996, 'Dodge', 'Stealth' union all select
1996, 'Dodge', 'Viper' union all select
1996, 'Ford', 'Ranger' union all select
1996, 'Ford', 'Bronco' union all select
1996, 'Ford', 'Mustang' union all select
1996, 'Ford', 'Contour' union all select
1996, 'Ford', 'Windstar' union all select
1996, 'Ford', 'Crown Victoria' union all select
1996, 'Ford', 'Probe' union all select
1996, 'Ford', 'Escort' union all select
1996, 'Ford', 'Taurus' union all select
1996, 'Ford', 'E-Series' union all select
1996, 'Ford', 'Explorer' union all select
1996, 'Ford', 'Thunderbird' union all select
1996, 'Ford', 'Aerostar' union all select
1996, 'Ford', 'F-Series' union all select
1996, 'Ford', 'Aspire' union all select
1996, 'Ford', 'Club Wagon' union all select
1996, 'Ford', 'Econoline E150' union all select
1996, 'Ford', 'Econoline E250' union all select
1996, 'Ford', 'Econoline E350' union all select
1996, 'Ford', 'F150' union all select
1996, 'Ford', 'F250' union all select
1996, 'Ford', 'F350' union all select
1996, 'Mercedes-Benz', 'S-Class' union all select
1996, 'Mercedes-Benz', 'SL-Class' union all select
1996, 'Mercedes-Benz', 'E-Class' union all select
1996, 'Mercedes-Benz', 'C-Class' union all select
1996, 'Lincoln', 'Town Car' union all select
1996, 'Lincoln', 'Continental' union all select
1996, 'Lincoln', 'Mark VIII' union all select
1996, 'Mercury', 'Sable' union all select
1996, 'Mercury', 'Mystique' union all select
1996, 'Mercury', 'Grand Marquis' union all select
1996, 'Mercury', 'Tracer' union all select
1996, 'Mercury', 'Villager' union all select
1996, 'Mercury', 'Cougar' union all select
1996, 'Buick', 'Century' union all select
1996, 'Buick', 'Roadmaster' union all select
1996, 'Buick', 'Regal' union all select
1996, 'Buick', 'Hearse' union all select
1996, 'Buick', 'Park Avenue' union all select
1996, 'Buick', 'Riviera' union all select
1996, 'Buick', 'Skylark' union all select
1996, 'Buick', 'LeSabre' union all select
1996, 'Audi', 'A6' union all select
1996, 'Audi', 'Cabriolet' union all select
1996, 'Audi', 'A4' union all select
1996, 'Audi', 'riolet' union all select
1996, 'Mazda', '626' union all select
1996, 'Mazda', 'MX-6' union all select
1996, 'Mazda', 'Protege' union all select
1996, 'Mazda', 'MX-5' union all select
1996, 'Mazda', 'B-Series' union all select
1996, 'Mazda', 'MX-3' union all select
1996, 'Mazda', 'MPV' union all select
1996, 'Mazda', 'Millenia' union all select
1996, 'Mazda', 'B-Series Plus' union all select
1996, 'Mazda', 'Miata MX-5' union all select
1996, 'Volkswagen', 'Cabriolet' union all select
1996, 'Volkswagen', 'Passat' union all select
1996, 'Volkswagen', 'Golf' union all select
1996, 'Volkswagen', 'Jetta' union all select
1996, 'Volkswagen', 'GTI' union all select
1996, 'Volkswagen', 'rio' union all select
1996, 'Mitsubishi', 'Galant' union all select
1996, 'Mitsubishi', 'Chariot' union all select
1996, 'Mitsubishi', 'Pajero' union all select
1996, 'Mitsubishi', 'Mirage' union all select
1996, 'Mitsubishi', 'Truck' union all select
1996, 'Mitsubishi', 'Eclipse' union all select
1996, 'Mitsubishi', 'GTO' union all select
1996, 'Mitsubishi', 'Diamante' union all select
1996, 'Mitsubishi', 'Expo LRV' union all select
1996, 'Mitsubishi', '3000GT' union all select
1996, 'Mitsubishi', 'Mighty Max' union all select
1996, 'Mitsubishi', 'Montero' union all select
1996, 'Pontiac', 'Grand Prix' union all select
1996, 'Pontiac', 'Firebird' union all select
1996, 'Pontiac', 'Trans Sport' union all select
1996, 'Pontiac', 'Sunfire' union all select
1996, 'Pontiac', 'Grand Am' union all select
1996, 'Pontiac', 'Bonneville' union all select
1996, 'Suzuki', 'X-90' union all select
1996, 'Suzuki', 'Esteem' union all select
1996, 'Suzuki', 'Sidekick' union all select
1996, 'Suzuki', 'Swift' union all select
1996, 'Saab', '900' union all select
1996, 'Saab', '9000' union all select
1996, 'Holden', 'VS Commodore' union all select
1996, 'Porsche', '911' union all select
1996, 'Plymouth', 'Voyager' union all select
1996, 'Plymouth', 'Breeze' union all select
1996, 'Plymouth', 'Grand Voyager' union all select
1996, 'Plymouth', 'Neon' union all select
1996, 'Chevrolet', '1500' union all select
1996, 'Chevrolet', '2500' union all select
1996, 'Chevrolet', '3500' union all select
1996, 'Chevrolet', 'Tahoe' union all select
1996, 'Chevrolet', 'Astro' union all select
1996, 'Chevrolet', 'Impala' union all select
1996, 'Chevrolet', 'Beretta' union all select
1996, 'Chevrolet', 'Caprice' union all select
1996, 'Chevrolet', 'Blazer' union all select
1996, 'Chevrolet', 'Camaro' union all select
1996, 'Chevrolet', 'Caprice Classic' union all select
1996, 'Chevrolet', 'Cavalier' union all select
1996, 'Chevrolet', 'Corsica' union all select
1996, 'Chevrolet', 'Corvette' union all select
1996, 'Chevrolet', 'Express 1500' union all select
1996, 'Chevrolet', 'Express 2500' union all select
1996, 'Chevrolet', 'Express 3500' union all select
1996, 'Chevrolet', 'G-Series 1500' union all select
1996, 'Chevrolet', 'G-Series 2500' union all select
1996, 'Chevrolet', 'G-Series G30' union all select
1996, 'Chevrolet', 'Lumina' union all select
1996, 'Chevrolet', 'Monte Carlo' union all select
1996, 'Chevrolet', 'S10' union all select
1996, 'Chevrolet', 'Sportvan G30' union all select
1996, 'Chevrolet', 'Suburban 1500' union all select
1996, 'Chevrolet', 'Suburban 2500' union all select
1996, 'Land Rover', 'Discovery' union all select
1996, 'Land Rover', 'Range Rover' union all select
1996, 'Nissan', '300ZX' union all select
1996, 'Nissan', '200SX' union all select
1996, 'Nissan', '240SX' union all select
1996, 'Nissan', 'Altima' union all select
1996, 'Nissan', 'Maxima' union all select
1996, 'Nissan', 'Pathfinder' union all select
1996, 'Nissan', 'Quest' union all select
1996, 'Nissan', 'Sentra' union all select
1996, 'Jeep', 'Grand Cherokee' union all select
1996, 'Jeep', 'Cherokee' union all select
1996, 'Kia', 'Sportage' union all select
1996, 'Kia', 'Sephia' union all select
1996, 'Lexus', 'GS' union all select
1996, 'Lexus', 'SC' union all select
1996, 'Lexus', 'LX' union all select
1996, 'Lexus', 'ES' union all select
1996, 'Lexus', 'LS' union all select
1996, 'Subaru', 'Impreza' union all select
1996, 'Subaru', 'Alcyone SVX' union all select
1996, 'Subaru', 'Legacy' union all select
1996, 'Subaru', 'SVX' union all select
1996, 'Honda', 'Passport' union all select
1996, 'Honda', 'Odyssey' union all select
1996, 'Honda', 'Prelude' union all select
1996, 'Honda', 'Accord' union all select
1996, 'Honda', 'Civic' union all select
1996, 'Honda', 'del Sol' union all select
1996, 'Chrysler', 'Town & Country' union all select
1996, 'Chrysler', 'Cirrus' union all select
1996, 'Chrysler', 'Concorde' union all select
1996, 'Chrysler', 'LHS' union all select
1996, 'Chrysler', 'New Yorker' union all select
1996, 'Chrysler', 'Sebring' union all select
1996, 'Lotus', 'Esprit' union all select
1996, 'BMW', '3 Series' union all select
1996, 'BMW', '7 Series' union all select
1996, 'BMW', '8 Series' union all select
1996, 'BMW', 'M3' union all select
1996, 'BMW', 'Z3' union all select
1996, 'Lamborghini', 'Diablo' union all select
1996, 'Acura', 'Integra' union all select
1996, 'Acura', 'NSX' union all select
1996, 'Acura', 'RL' union all select
1996, 'Acura', 'SLX' union all select
1996, 'Acura', 'TL' union all select
1996, 'Cadillac', 'DeVille' union all select
1996, 'Cadillac', 'Eldorado' union all select
1996, 'Cadillac', 'Fleetwood' union all select
1996, 'Cadillac', 'Seville' union all select
1996, 'Eagle', 'Summit' union all select
1996, 'Eagle', 'Talon' union all select
1996, 'Eagle', 'Vision' union all select
1996, 'Geo', 'Metro' union all select
1996, 'Geo', 'Prizm' union all select
1996, 'Geo', 'Tracker' union all select
1996, 'GMC', '1500' union all select
1996, 'GMC', '2500' union all select
1996, 'GMC', '3500' union all select
1996, 'GMC', '1500 Club Coupe' union all select
1996, 'GMC', '2500 Club Coupe' union all select
1996, 'GMC', '3500 Club Coupe' union all select
1996, 'GMC', 'Jimmy' union all select
1996, 'GMC', 'Rally Wagon G3500' union all select
1996, 'GMC', 'Safari' union all select
1996, 'GMC', 'Savana 1500' union all select
1996, 'GMC', 'Savana 2500' union all select
1996, 'GMC', 'Savana 3500' union all select
1996, 'GMC', 'Sonoma Club Coupe' union all select
1996, 'GMC', 'Sonoma' union all select
1996, 'GMC', 'Suburban 1500' union all select
1996, 'GMC', 'Suburban 2500' union all select
1996, 'GMC', 'Vandura G3500' union all select
1996, 'GMC', 'Yukon' union all select
1996, 'HUMMER', 'H1' union all select
1996, 'Hyundai', 'Accent' union all select
1996, 'Hyundai', 'Elantra' union all select
1996, 'Hyundai', 'Sonata' union all select
1996, 'Infiniti', 'G' union all select
1996, 'Infiniti', 'I' union all select
1996, 'Infiniti', 'J' union all select
1996, 'Infiniti', 'Q' union all select
1996, 'Isuzu', 'Hombre' union all select
1996, 'Isuzu', 'Oasis' union all select
1996, 'Isuzu', 'Rodeo' union all select
1996, 'Isuzu', 'Trooper' union all select
1996, 'Jaguar', 'XJ Series' union all select
1996, 'Oldsmobile', '88' union all select
1996, 'Oldsmobile', '98' union all select
1996, 'Oldsmobile', 'Achieva' union all select
1996, 'Oldsmobile', 'Aurora' union all select
1996, 'Oldsmobile', 'Bravada' union all select
1996, 'Oldsmobile', 'Ciera' union all select
1996, 'Oldsmobile', 'Cutlass Supreme' union all select
1996, 'Oldsmobile', 'Silhouette' union all select
1996, 'Saturn', 'S-Series' union all select
1996, 'Toyota', '4Runner' union all select
1996, 'Toyota', 'Avalon' union all select
1996, 'Toyota', 'Camry' union all select
1996, 'Toyota', 'Celica' union all select
1996, 'Toyota', 'Corolla' union all select
1996, 'Toyota', 'Land Cruiser' union all select
1996, 'Toyota', 'Paseo' union all select
1996, 'Toyota', 'Previa' union all select
1996, 'Toyota', 'RAV4' union all select
1996, 'Toyota', 'Supra' union all select
1996, 'Toyota', 'T100' union all select
1996, 'Toyota', 'T100 Xtra' union all select
1996, 'Toyota', 'Tacoma' union all select
1996, 'Toyota', 'Tacoma Xtra' union all select
1996, 'Toyota', 'Tercel' union all select
1996, 'Volvo', '850' union all select
1996, 'Volvo', '960' union all select
1997, 'Pontiac', 'Grand Am' union all select
1997, 'Pontiac', 'Sunfire' union all select
1997, 'Pontiac', 'Firebird' union all select
1997, 'Pontiac', 'Bonneville' union all select
1997, 'Pontiac', 'Trans Sport' union all select
1997, 'Pontiac', 'Grand Prix' union all select
1997, 'Subaru', 'Legacy' union all select
1997, 'Subaru', 'Alcyone SVX' union all select
1997, 'Subaru', 'Impreza' union all select
1997, 'Subaru', 'SVX' union all select
1997, 'Suzuki', 'Sidekick' union all select
1997, 'Suzuki', 'X-90' union all select
1997, 'Suzuki', 'Swift' union all select
1997, 'Suzuki', 'Esteem' union all select
1997, 'Lexus', 'LS' union all select
1997, 'Lexus', 'GS' union all select
1997, 'Lexus', 'LX' union all select
1997, 'Lexus', 'SC' union all select
1997, 'Lexus', 'ES' union all select
1997, 'Kia', 'Sephia' union all select
1997, 'Kia', 'Sportage' union all select
1997, 'Kia', 'Mentor' union all select
1997, 'Mazda', '626' union all select
1997, 'Mazda', 'B-Series' union all select
1997, 'Mazda', 'MX-5' union all select
1997, 'Mazda', 'MPV' union all select
1997, 'Mazda', 'Protege' union all select
1997, 'Mazda', 'MX-6' union all select
1997, 'Mazda', 'Millenia' union all select
1997, 'Mazda', 'B-Series Plus' union all select
1997, 'Mazda', 'Miata MX-5' union all select
1997, 'BMW', '3 Series' union all select
1997, 'BMW', '5 Series' union all select
1997, 'BMW', '7 Series' union all select
1997, 'BMW', '8 Series' union all select
1997, 'BMW', 'M3' union all select
1997, 'BMW', 'Z3' union all select
1997, 'Mercury', 'Mountaineer' union all select
1997, 'Mercury', 'Sable' union all select
1997, 'Mercury', 'Cougar' union all select
1997, 'Mercury', 'Villager' union all select
1997, 'Mercury', 'Mystique' union all select
1997, 'Mercury', 'Tracer' union all select
1997, 'Mercury', 'Grand Marquis' union all select
1997, 'Lamborghini', 'Diablo' union all select
1997, 'Honda', 'Accord' union all select
1997, 'Honda', 'Civic' union all select
1997, 'Honda', 'Prelude' union all select
1997, 'Honda', 'CR-V' union all select
1997, 'Honda', 'Odyssey' union all select
1997, 'Honda', 'Passport' union all select
1997, 'Honda', 'Del Sol' union all select
1997, 'Audi', 'A6' union all select
1997, 'Audi', 'A4' union all select
1997, 'Audi', 'Cabriolet' union all select
1997, 'Audi', 'A8' union all select
1997, 'Audi', 'riolet' union all select
1997, 'Mitsubishi', 'Mirage' union all select
1997, 'Mitsubishi', 'Diamante' union all select
1997, 'Mitsubishi', 'GTO' union all select
1997, 'Mitsubishi', 'Pajero' union all select
1997, 'Mitsubishi', 'Eclipse' union all select
1997, 'Mitsubishi', 'Challenger' union all select
1997, 'Mitsubishi', 'Galant' union all select
1997, 'Mitsubishi', '3000GT' union all select
1997, 'Mitsubishi', 'Montero' union all select
1997, 'Mitsubishi', 'Montero Sport' union all select
1997, 'Porsche', '911' union all select
1997, 'Porsche', 'Boxster' union all select
1997, 'Mercedes-Benz', 'S-Class' union all select
1997, 'Mercedes-Benz', 'C-Class' union all select
1997, 'Mercedes-Benz', 'E-Class' union all select
1997, 'Mercedes-Benz', 'SL-Class' union all select
1997, 'Mercedes-Benz', 'SLK-Class' union all select
1997, 'Land Rover', 'Range Rover' union all select
1997, 'Land Rover', 'Defender' union all select
1997, 'Land Rover', 'Discovery' union all select
1997, 'Land Rover', 'Defender 90' union all select
1997, 'Chrysler', 'Town & Country' union all select
1997, 'Chrysler', 'Cirrus' union all select
1997, 'Chrysler', 'Concorde' union all select
1997, 'Chrysler', 'LHS' union all select
1997, 'Chrysler', 'Sebring' union all select
1997, 'Ford', 'F-Series' union all select
1997, 'Ford', 'Aerostar' union all select
1997, 'Ford', 'Aspire' union all select
1997, 'Ford', 'Club Wagon' union all select
1997, 'Ford', 'Contour' union all select
1997, 'Ford', 'Crown Victoria' union all select
1997, 'Ford', 'Econoline E150' union all select
1997, 'Ford', 'Econoline E250' union all select
1997, 'Ford', 'Econoline E350' union all select
1997, 'Ford', 'Escort' union all select
1997, 'Ford', 'Expedition' union all select
1997, 'Ford', 'Explorer' union all select
1997, 'Ford', 'F150' union all select
1997, 'Ford', 'F250' union all select
1997, 'Ford', 'F350' union all select
1997, 'Ford', 'Mustang' union all select
1997, 'Ford', 'Probe' union all select
1997, 'Ford', 'Ranger' union all select
1997, 'Ford', 'Taurus' union all select
1997, 'Ford', 'Thunderbird' union all select
1997, 'Ford', 'Windstar' union all select
1997, 'Saab', '900' union all select
1997, 'Saab', '9000' union all select
1997, 'Volkswagen', 'Jetta' union all select
1997, 'Volkswagen', 'Golf' union all select
1997, 'Volkswagen', 'Cabriolet' union all select
1997, 'Volkswagen', 'Eurovan' union all select
1997, 'Volkswagen', 'GTI' union all select
1997, 'Volkswagen', 'Passat' union all select
1997, 'Volkswagen', 'rio' union all select
1997, 'Lincoln', 'Continental' union all select
1997, 'Lincoln', 'Mark VIII' union all select
1997, 'Lincoln', 'Town Car' union all select
1997, 'Chevrolet', '1500' union all select
1997, 'Chevrolet', '2500' union all select
1997, 'Chevrolet', '3500' union all select
1997, 'Chevrolet', 'Malibu' union all select
1997, 'Chevrolet', 'Astro' union all select
1997, 'Chevrolet', 'Blazer' union all select
1997, 'Chevrolet', 'Camaro' union all select
1997, 'Chevrolet', 'Cavalier' union all select
1997, 'Chevrolet', 'Corvette' union all select
1997, 'Chevrolet', 'Express 1500' union all select
1997, 'Chevrolet', 'Express 2500' union all select
1997, 'Chevrolet', 'Express 3500' union all select
1997, 'Chevrolet', 'G-Series 1500' union all select
1997, 'Chevrolet', 'G-Series 2500' union all select
1997, 'Chevrolet', 'G-Series 3500' union all select
1997, 'Chevrolet', 'Lumina' union all select
1997, 'Chevrolet', 'Monte Carlo' union all select
1997, 'Chevrolet', 'S10' union all select
1997, 'Chevrolet', 'Suburban 1500' union all select
1997, 'Chevrolet', 'Suburban 2500' union all select
1997, 'Chevrolet', 'Tahoe' union all select
1997, 'Chevrolet', 'Venture' union all select
1997, 'Plymouth', 'Breeze' union all select
1997, 'Plymouth', 'Voyager' union all select
1997, 'Plymouth', 'Grand Voyager' union all select
1997, 'Plymouth', 'Neon' union all select
1997, 'Plymouth', 'Prowler' union all select
1997, 'Buick', 'LeSabre' union all select
1997, 'Buick', 'Park Avenue' union all select
1997, 'Buick', 'Riviera' union all select
1997, 'Buick', 'Century' union all select
1997, 'Buick', 'Skylark' union all select
1997, 'Buick', 'Regal' union all select
1997, 'Holden', 'VS Commodore' union all select
1997, 'Dodge', 'Stratus' union all select
1997, 'Dodge', 'Avenger' union all select
1997, 'Dodge', 'Caravan' union all select
1997, 'Dodge', 'Dakota Club' union all select
1997, 'Dodge', 'Dakota' union all select
1997, 'Dodge', 'Grand Caravan' union all select
1997, 'Dodge', 'Intrepid' union all select
1997, 'Dodge', 'Neon' union all select
1997, 'Dodge', 'Ram 1500 Club' union all select
1997, 'Dodge', 'Ram 1500' union all select
1997, 'Dodge', 'Ram 2500 Club' union all select
1997, 'Dodge', 'Ram 2500' union all select
1997, 'Dodge', 'Ram 3500 Club' union all select
1997, 'Dodge', 'Ram 3500' union all select
1997, 'Dodge', 'Ram Van 1500' union all select
1997, 'Dodge', 'Ram Van 2500' union all select
1997, 'Dodge', 'Ram Van 3500' union all select
1997, 'Dodge', 'Viper' union all select
1997, 'Toyota', 'Camry' union all select
1997, 'Toyota', '4Runner' union all select
1997, 'Toyota', 'Avalon' union all select
1997, 'Toyota', 'Celica' union all select
1997, 'Toyota', 'Corolla' union all select
1997, 'Toyota', 'Land Cruiser' union all select
1997, 'Toyota', 'Paseo' union all select
1997, 'Toyota', 'Previa' union all select
1997, 'Toyota', 'RAV4' union all select
1997, 'Toyota', 'Supra' union all select
1997, 'Toyota', 'T100' union all select
1997, 'Toyota', 'T100 Xtra' union all select
1997, 'Toyota', 'Tacoma' union all select
1997, 'Toyota', 'Tacoma Xtra' union all select
1997, 'Toyota', 'Tercel' union all select
1997, 'Lotus', 'Esprit' union all select
1997, 'Acura', 'Integra' union all select
1997, 'Acura', 'CL' union all select
1997, 'Acura', 'NSX' union all select
1997, 'Acura', 'RL' union all select
1997, 'Acura', 'SLX' union all select
1997, 'Acura', 'TL' union all select
1997, 'Cadillac', 'Catera' union all select
1997, 'Cadillac', 'DeVille' union all select
1997, 'Cadillac', 'Eldorado' union all select
1997, 'Cadillac', 'Seville' union all select
1997, 'Eagle', 'Talon' union all select
1997, 'Eagle', 'Vision' union all select
1997, 'Geo', 'Metro' union all select
1997, 'Geo', 'Prizm' union all select
1997, 'Geo', 'Tracker' union all select
1997, 'GMC', '1500' union all select
1997, 'GMC', '2500' union all select
1997, 'GMC', '3500' union all select
1997, 'GMC', '1500 Club Coupe' union all select
1997, 'GMC', '2500 Club Coupe' union all select
1997, 'GMC', '3500 Club Coupe' union all select
1997, 'GMC', 'Jimmy' union all select
1997, 'GMC', 'Safari' union all select
1997, 'GMC', 'Savana 1500' union all select
1997, 'GMC', 'Savana 2500' union all select
1997, 'GMC', 'Savana 3500' union all select
1997, 'GMC', 'Sonoma Club Coupe' union all select
1997, 'GMC', 'Sonoma' union all select
1997, 'GMC', 'Suburban 1500' union all select
1997, 'GMC', 'Suburban 2500' union all select
1997, 'GMC', 'Yukon' union all select
1997, 'HUMMER', 'H1' union all select
1997, 'Hyundai', 'Accent' union all select
1997, 'Hyundai', 'Elantra' union all select
1997, 'Hyundai', 'Sonata' union all select
1997, 'Hyundai', 'Tiburon' union all select
1997, 'Infiniti', 'I' union all select
1997, 'Infiniti', 'J' union all select
1997, 'Infiniti', 'Q' union all select
1997, 'Infiniti', 'QX' union all select
1997, 'Isuzu', 'Hombre' union all select
1997, 'Isuzu', 'Hombre Space' union all select
1997, 'Isuzu', 'Oasis' union all select
1997, 'Isuzu', 'Rodeo' union all select
1997, 'Isuzu', 'Trooper' union all select
1997, 'Jaguar', 'XJ Series' union all select
1997, 'Jaguar', 'XK Series' union all select
1997, 'Jeep', 'Cherokee' union all select
1997, 'Jeep', 'Grand Cherokee' union all select
1997, 'Jeep', 'Wrangler' union all select
1997, 'Nissan', '200SX' union all select
1997, 'Nissan', '240SX' union all select
1997, 'Nissan', 'Altima' union all select
1997, 'Nissan', 'Maxima' union all select
1997, 'Nissan', 'Pathfinder' union all select
1997, 'Nissan', 'Quest' union all select
1997, 'Nissan', 'Sentra' union all select
1997, 'Oldsmobile', '88' union all select
1997, 'Oldsmobile', 'Achieva' union all select
1997, 'Oldsmobile', 'Aurora' union all select
1997, 'Oldsmobile', 'Bravada' union all select
1997, 'Oldsmobile', 'Cutlass' union all select
1997, 'Oldsmobile', 'Cutlass Supreme' union all select
1997, 'Oldsmobile', 'LSS' union all select
1997, 'Oldsmobile', 'Regency' union all select
1997, 'Oldsmobile', 'Silhouette' union all select
1997, 'Saturn', 'S-Series' union all select
1997, 'Volvo', '850' union all select
1997, 'Volvo', '960' union all select
1997, 'Volvo', 'S90' union all select
1997, 'Volvo', 'V90' union all select
1998, 'Chevrolet', '1500' union all select
1998, 'Chevrolet', '2500' union all select
1998, 'Chevrolet', '3500' union all select
1998, 'Chevrolet', 'Corvette' union all select
1998, 'Chevrolet', 'Astro' union all select
1998, 'Chevrolet', 'Blazer' union all select
1998, 'Chevrolet', 'Camaro' union all select
1998, 'Chevrolet', 'Cavalier' union all select
1998, 'Chevrolet', 'Express 1500' union all select
1998, 'Chevrolet', 'Express 2500' union all select
1998, 'Chevrolet', 'Express 3500' union all select
1998, 'Chevrolet', 'G-Series 1500' union all select
1998, 'Chevrolet', 'G-Series 2500' union all select
1998, 'Chevrolet', 'G-Series 3500' union all select
1998, 'Chevrolet', 'Lumina' union all select
1998, 'Chevrolet', 'Malibu' union all select
1998, 'Chevrolet', 'Metro' union all select
1998, 'Chevrolet', 'Monte Carlo' union all select
1998, 'Chevrolet', 'Prizm' union all select
1998, 'Chevrolet', 'S10' union all select
1998, 'Chevrolet', 'Suburban 1500' union all select
1998, 'Chevrolet', 'Suburban 2500' union all select
1998, 'Chevrolet', 'Tahoe' union all select
1998, 'Chevrolet', 'Tracker' union all select
1998, 'Chevrolet', 'Venture' union all select
1998, 'Porsche', '911' union all select
1998, 'Porsche', 'Boxster' union all select
1998, 'Honda', 'CR-V' union all select
1998, 'Honda', 'Civic' union all select
1998, 'Honda', 'Accord' union all select
1998, 'Honda', 'Odyssey' union all select
1998, 'Honda', 'Passport' union all select
1998, 'Honda', 'Prelude' union all select
1998, 'Subaru', 'Forester' union all select
1998, 'Subaru', 'Legacy' union all select
1998, 'Subaru', 'Impreza' union all select
1998, 'Mazda', '626' union all select
1998, 'Mazda', 'B-Series' union all select
1998, 'Mazda', 'Millenia' union all select
1998, 'Mazda', 'MPV' union all select
1998, 'Mazda', 'Protege' union all select
1998, 'Mazda', 'MX-5' union all select
1998, 'Mazda', 'B-Series Plus' union all select
1998, 'Mitsubishi', 'Mirage' union all select
1998, 'Mitsubishi', 'Galant' union all select
1998, 'Mitsubishi', 'Challenger' union all select
1998, 'Mitsubishi', 'Diamante' union all select
1998, 'Mitsubishi', 'Pajero' union all select
1998, 'Mitsubishi', 'Eclipse' union all select
1998, 'Mitsubishi', 'GTO' union all select
1998, 'Mitsubishi', '3000GT' union all select
1998, 'Mitsubishi', 'Montero' union all select
1998, 'Mitsubishi', 'Montero Sport' union all select
1998, 'Lexus', 'ES' union all select
1998, 'Lexus', 'GS' union all select
1998, 'Lexus', 'SC' union all select
1998, 'Lexus', 'LX' union all select
1998, 'Lexus', 'LS' union all select
1998, 'BMW', '3 Series' union all select
1998, 'BMW', '5 Series' union all select
1998, 'BMW', '7 Series' union all select
1998, 'BMW', 'M3' union all select
1998, 'BMW', 'Z3' union all select
1998, 'Volkswagen', 'Golf' union all select
1998, 'Volkswagen', 'Passat' union all select
1998, 'Volkswagen', 'GTI' union all select
1998, 'Volkswagen', 'Jetta' union all select
1998, 'Volkswagen', 'Cabriolet' union all select
1998, 'Volkswagen', 'New Beetle' union all select
1998, 'Volkswagen', 'rio' union all select
1998, 'Lincoln', 'Town Car' union all select
1998, 'Lincoln', 'Navigator' union all select
1998, 'Lincoln', 'Mark VIII' union all select
1998, 'Lincoln', 'Continental' union all select
1998, 'Suzuki', 'X-90' union all select
1998, 'Suzuki', 'Esteem' union all select
1998, 'Suzuki', 'Sidekick' union all select
1998, 'Suzuki', 'Swift' union all select
1998, 'Mercedes-Benz', 'M-Class' union all select
1998, 'Mercedes-Benz', 'S-Class' union all select
1998, 'Mercedes-Benz', 'CL-Class' union all select
1998, 'Mercedes-Benz', 'C-Class' union all select
1998, 'Mercedes-Benz', 'E-Class' union all select
1998, 'Mercedes-Benz', 'SL-Class' union all select
1998, 'Mercedes-Benz', 'SLK-Class' union all select
1998, 'Mercedes-Benz', 'CLK-Class' union all select
1998, 'Mercury', 'Villager' union all select
1998, 'Mercury', 'Grand Marquis' union all select
1998, 'Mercury', 'Tracer' union all select
1998, 'Mercury', 'Mountaineer' union all select
1998, 'Mercury', 'Sable' union all select
1998, 'Mercury', 'Mystique' union all select
1998, 'Saab', '900' union all select
1998, 'Saab', '9000' union all select
1998, 'Buick', 'Skylark' union all select
1998, 'Buick', 'Regal' union all select
1998, 'Buick', 'Park Avenue' union all select
1998, 'Buick', 'Century' union all select
1998, 'Buick', 'Riviera' union all select
1998, 'Buick', 'LeSabre' union all select
1998, 'Pontiac', 'Grand Am' union all select
1998, 'Pontiac', 'Grand Prix' union all select
1998, 'Pontiac', 'Firebird' union all select
1998, 'Pontiac', 'Sunfire' union all select
1998, 'Pontiac', 'Trans Sport' union all select
1998, 'Pontiac', 'Bonneville' union all select
1998, 'Lamborghini', 'Diablo' union all select
1998, 'Audi', 'A4' union all select
1998, 'Audi', 'Cabriolet' union all select
1998, 'Audi', 'A6' union all select
1998, 'Audi', 'A8' union all select
1998, 'Audi', 'riolet' union all select
1998, 'Kia', 'Sephia' union all select
1998, 'Kia', 'Sportage' union all select
1998, 'Lotus', 'Esprit' union all select
1998, 'Land Rover', 'Discovery' union all select
1998, 'Land Rover', 'Range Rover' union all select
1998, 'Dodge', 'Intrepid' union all select
1998, 'Dodge', 'Avenger' union all select
1998, 'Dodge', 'Caravan' union all select
1998, 'Dodge', 'Dakota Club' union all select
1998, 'Dodge', 'Dakota' union all select
1998, 'Dodge', 'Durango' union all select
1998, 'Dodge', 'Grand Caravan' union all select
1998, 'Dodge', 'Neon' union all select
1998, 'Dodge', 'Ram 1500 Club' union all select
1998, 'Dodge', 'Ram 1500' union all select
1998, 'Dodge', 'Ram 2500 Club' union all select
1998, 'Dodge', 'Ram 2500' union all select
1998, 'Dodge', 'Ram 3500' union all select
1998, 'Dodge', 'Ram Van 1500' union all select
1998, 'Dodge', 'Ram Van 2500' union all select
1998, 'Dodge', 'Ram Van 3500' union all select
1998, 'Dodge', 'Stratus' union all select
1998, 'Dodge', 'Viper' union all select
1998, 'Acura', 'CL' union all select
1998, 'Acura', 'Integra' union all select
1998, 'Acura', 'NSX' union all select
1998, 'Acura', 'RL' union all select
1998, 'Acura', 'SLX' union all select
1998, 'Acura', 'TL' union all select
1998, 'Cadillac', 'Catera' union all select
1998, 'Cadillac', 'DeVille' union all select
1998, 'Cadillac', 'Eldorado' union all select
1998, 'Cadillac', 'Seville' union all select
1998, 'Chrysler', 'Cirrus' union all select
1998, 'Chrysler', 'Concorde' union all select
1998, 'Chrysler', 'Sebring' union all select
1998, 'Chrysler', 'Town & Country' union all select
1998, 'Eagle', 'Talon' union all select
1998, 'Ford', 'Club Wagon' union all select
1998, 'Ford', 'Contour' union all select
1998, 'Ford', 'Crown Victoria' union all select
1998, 'Ford', 'Econoline E150' union all select
1998, 'Ford', 'Econoline E250' union all select
1998, 'Ford', 'Econoline E350' union all select
1998, 'Ford', 'Escort' union all select
1998, 'Ford', 'Expedition' union all select
1998, 'Ford', 'Explorer' union all select
1998, 'Ford', 'F150' union all select
1998, 'Ford', 'F250' union all select
1998, 'Ford', 'Mustang' union all select
1998, 'Ford', 'Ranger' union all select
1998, 'Ford', 'Taurus' union all select
1998, 'Ford', 'Windstar' union all select
1998, 'GMC', '1500' union all select
1998, 'GMC', '2500' union all select
1998, 'GMC', '3500' union all select
1998, 'GMC', '1500 Club Coupe' union all select
1998, 'GMC', '2500 Club Coupe' union all select
1998, 'GMC', '3500 Club Coupe' union all select
1998, 'GMC', 'Envoy' union all select
1998, 'GMC', 'Jimmy' union all select
1998, 'GMC', 'Safari' union all select
1998, 'GMC', 'Savana 1500' union all select
1998, 'GMC', 'Savana 2500' union all select
1998, 'GMC', 'Savana 3500' union all select
1998, 'GMC', 'Sonoma Club Coupe' union all select
1998, 'GMC', 'Sonoma' union all select
1998, 'GMC', 'Suburban 1500' union all select
1998, 'GMC', 'Suburban 2500' union all select
1998, 'GMC', 'Yukon' union all select
1998, 'HUMMER', 'H1' union all select
1998, 'Hyundai', 'Accent' union all select
1998, 'Hyundai', 'Elantra' union all select
1998, 'Hyundai', 'Sonata' union all select
1998, 'Hyundai', 'Tiburon' union all select
1998, 'Infiniti', 'I' union all select
1998, 'Infiniti', 'Q' union all select
1998, 'Infiniti', 'QX' union all select
1998, 'Isuzu', 'Amigo' union all select
1998, 'Isuzu', 'Hombre' union all select
1998, 'Isuzu', 'Hombre Space' union all select
1998, 'Isuzu', 'Oasis' union all select
1998, 'Isuzu', 'Rodeo' union all select
1998, 'Isuzu', 'Trooper' union all select
1998, 'Jaguar', 'XJ Series' union all select
1998, 'Jaguar', 'XK Series' union all select
1998, 'Jeep', 'Cherokee' union all select
1998, 'Jeep', 'Grand Cherokee' union all select
1998, 'Jeep', 'Wrangler' union all select
1998, 'Nissan', '200SX' union all select
1998, 'Nissan', '240SX' union all select
1998, 'Nissan', 'Altima' union all select
1998, 'Nissan', 'Frontier' union all select
1998, 'Nissan', 'Maxima' union all select
1998, 'Nissan', 'Pathfinder' union all select
1998, 'Nissan', 'Quest' union all select
1998, 'Nissan', 'Sentra' union all select
1998, 'Oldsmobile', '88' union all select
1998, 'Oldsmobile', 'Achieva' union all select
1998, 'Oldsmobile', 'Aurora' union all select
1998, 'Oldsmobile', 'Bravada' union all select
1998, 'Oldsmobile', 'Cutlass' union all select
1998, 'Oldsmobile', 'Intrigue' union all select
1998, 'Oldsmobile', 'LSS' union all select
1998, 'Oldsmobile', 'Regency' union all select
1998, 'Oldsmobile', 'Silhouette' union all select
1998, 'Plymouth', 'Breeze' union all select
1998, 'Plymouth', 'Grand Voyager' union all select
1998, 'Plymouth', 'Neon' union all select
1998, 'Plymouth', 'Voyager' union all select
1998, 'Saturn', 'S-Series' union all select
1998, 'Toyota', '4Runner' union all select
1998, 'Toyota', 'Avalon' union all select
1998, 'Toyota', 'Camry' union all select
1998, 'Toyota', 'Celica' union all select
1998, 'Toyota', 'Corolla' union all select
1998, 'Toyota', 'Land Cruiser' union all select
1998, 'Toyota', 'RAV4' union all select
1998, 'Toyota', 'Sienna' union all select
1998, 'Toyota', 'Supra' union all select
1998, 'Toyota', 'T100' union all select
1998, 'Toyota', 'T100 Xtra' union all select
1998, 'Toyota', 'Tacoma' union all select
1998, 'Toyota', 'Tacoma Xtra' union all select
1998, 'Toyota', 'Tercel' union all select
1998, 'Volvo', 'C70' union all select
1998, 'Volvo', 'S70' union all select
1998, 'Volvo', 'S90' union all select
1998, 'Volvo', 'V70' union all select
1998, 'Volvo', 'V90' union all select
1999, 'Chevrolet', '1500' union all select
1999, 'Chevrolet', '2500' union all select
1999, 'Chevrolet', '3500' union all select
1999, 'Chevrolet', 'Corvette' union all select
1999, 'Chevrolet', 'Astro' union all select
1999, 'Chevrolet', 'Silverado' union all select
1999, 'Chevrolet', 'Blazer' union all select
1999, 'Chevrolet', 'Camaro' union all select
1999, 'Chevrolet', 'Cavalier' union all select
1999, 'Chevrolet', 'Express 1500' union all select
1999, 'Chevrolet', 'Express 2500' union all select
1999, 'Chevrolet', 'Express 3500' union all select
1999, 'Chevrolet', 'Lumina' union all select
1999, 'Chevrolet', 'Malibu' union all select
1999, 'Chevrolet', 'Metro' union all select
1999, 'Chevrolet', 'Monte Carlo' union all select
1999, 'Chevrolet', 'Prizm' union all select
1999, 'Chevrolet', 'S10' union all select
1999, 'Chevrolet', 'Silverado 1500' union all select
1999, 'Chevrolet', 'Silverado 2500' union all select
1999, 'Chevrolet', 'Suburban 1500' union all select
1999, 'Chevrolet', 'Suburban 2500' union all select
1999, 'Chevrolet', 'Tahoe' union all select
1999, 'Chevrolet', 'Tracker' union all select
1999, 'Chevrolet', 'Venture' union all select
1999, 'Volkswagen', 'New Beetle' union all select
1999, 'Volkswagen', 'Golf' union all select
1999, 'Volkswagen', 'Passat' union all select
1999, 'Volkswagen', 'Cabriolet' union all select
1999, 'Volkswagen', 'Eurovan' union all select
1999, 'Volkswagen', 'Jetta' union all select
1999, 'Volkswagen', 'GTI' union all select
1999, 'Volkswagen', 'rio' union all select
1999, 'Honda', 'CR-V' union all select
1999, 'Honda', 'Passport' union all select
1999, 'Honda', 'Accord' union all select
1999, 'Honda', 'Civic' union all select
1999, 'Honda', 'Prelude' union all select
1999, 'Honda', 'Odyssey' union all select
1999, 'Mitsubishi', 'Mirage' union all select
1999, 'Mitsubishi', 'Eclipse' union all select
1999, 'Mitsubishi', 'Challenger' union all select
1999, 'Mitsubishi', 'Pajero' union all select
1999, 'Mitsubishi', 'Galant' union all select
1999, 'Mitsubishi', 'GTO' union all select
1999, 'Mitsubishi', 'Diamante' union all select
1999, 'Mitsubishi', '3000GT' union all select
1999, 'Mitsubishi', 'Montero' union all select
1999, 'Mitsubishi', 'Montero Sport' union all select
1999, 'Subaru', 'Legacy' union all select
1999, 'Subaru', 'Impreza' union all select
1999, 'Subaru', 'Forester' union all select
1999, 'Porsche', '911' union all select
1999, 'Porsche', 'Boxster' union all select
1999, 'Pontiac', 'Sunfire' union all select
1999, 'Pontiac', 'Grand Prix' union all select
1999, 'Pontiac', 'Firebird' union all select
1999, 'Pontiac', 'Trans Sport' union all select
1999, 'Pontiac', 'Grand Am' union all select
1999, 'Pontiac', 'Firebird Formula' union all select
1999, 'Pontiac', 'Bonneville' union all select
1999, 'Pontiac', 'Montana' union all select
1999, 'Mercedes-Benz', 'CLK-Class' union all select
1999, 'Mercedes-Benz', 'M-Class' union all select
1999, 'Mercedes-Benz', 'E-Class' union all select
1999, 'Mercedes-Benz', 'C-Class' union all select
1999, 'Mercedes-Benz', 'CL-Class' union all select
1999, 'Mercedes-Benz', 'SL-Class' union all select
1999, 'Mercedes-Benz', 'S-Class' union all select
1999, 'Mercedes-Benz', 'SLK-Class' union all select
1999, 'Suzuki', 'Vitara' union all select
1999, 'Suzuki', 'Esteem' union all select
1999, 'Suzuki', 'Grand Vitara' union all select
1999, 'Suzuki', 'Swift' union all select
1999, 'Lamborghini', 'Diablo' union all select
1999, 'Land Rover', 'Range Rover' union all select
1999, 'Land Rover', 'Discovery' union all select
1999, 'Land Rover', 'Discovery Series II' union all select
1999, 'Lincoln', 'Town Car' union all select
1999, 'Lincoln', 'Continental' union all select
1999, 'Lincoln', 'Navigator' union all select
1999, 'Saab', '900' union all select
1999, 'Saab', '9000' union all select
1999, 'Saab', '9-3' union all select
1999, 'Saab', '9-5' union all select
1999, 'Dodge', 'Charger' union all select
1999, 'Dodge', 'Intrepid' union all select
1999, 'Dodge', 'Avenger' union all select
1999, 'Dodge', 'Caravan' union all select
1999, 'Dodge', 'Dakota Club' union all select
1999, 'Dodge', 'Dakota' union all select
1999, 'Dodge', 'Durango' union all select
1999, 'Dodge', 'Grand Caravan' union all select
1999, 'Dodge', 'Neon' union all select
1999, 'Dodge', 'Ram 1500 Club' union all select
1999, 'Dodge', 'Ram 1500' union all select
1999, 'Dodge', 'Ram 2500 Club' union all select
1999, 'Dodge', 'Ram 2500' union all select
1999, 'Dodge', 'Ram 3500' union all select
1999, 'Dodge', 'Ram Van 1500' union all select
1999, 'Dodge', 'Ram Van 2500' union all select
1999, 'Dodge', 'Ram Van 3500' union all select
1999, 'Dodge', 'Stratus' union all select
1999, 'Dodge', 'Viper' union all select
1999, 'Audi', 'A4' union all select
1999, 'Audi', 'A8' union all select
1999, 'Audi', 'A6' union all select
1999, 'BMW', '3 Series' union all select
1999, 'BMW', '5 Series' union all select
1999, 'BMW', '7 Series' union all select
1999, 'BMW', 'Z3' union all select
1999, 'BMW', 'M3' union all select
1999, 'Lexus', 'LS' union all select
1999, 'Lexus', 'SC' union all select
1999, 'Lexus', 'ES' union all select
1999, 'Lexus', 'RX' union all select
1999, 'Lexus', 'GS' union all select
1999, 'Lexus', 'LX' union all select
1999, 'Mercury', 'Mystique' union all select
1999, 'Mercury', 'Sable' union all select
1999, 'Mercury', 'Mountaineer' union all select
1999, 'Mercury', 'Tracer' union all select
1999, 'Mercury', 'Villager' union all select
1999, 'Mercury', 'Grand Marquis' union all select
1999, 'Mercury', 'Cougar' union all select
1999, 'Mazda', '626' union all select
1999, 'Mazda', 'MX-5' union all select
1999, 'Mazda', 'B-Series' union all select
1999, 'Mazda', 'Protege' union all select
1999, 'Mazda', 'Millenia' union all select
1999, 'Mazda', 'B-Series Plus' union all select
1999, 'Mazda', 'Miata MX-5' union all select
1999, 'Buick', 'LeSabre' union all select
1999, 'Buick', 'Riviera' union all select
1999, 'Buick', 'Century' union all select
1999, 'Buick', 'Regal' union all select
1999, 'Buick', 'Park Avenue' union all select
1999, 'GMC', '2500' union all select
1999, 'GMC', '3500' union all select
1999, 'GMC', 'EV1' union all select
1999, 'GMC', '1500 Club Coupe' union all select
1999, 'GMC', 'Envoy' union all select
1999, 'GMC', 'Jimmy' union all select
1999, 'GMC', 'Safari' union all select
1999, 'GMC', 'Savana 1500' union all select
1999, 'GMC', 'Savana 2500' union all select
1999, 'GMC', 'Savana 3500' union all select
1999, 'GMC', 'Sierra 1500' union all select
1999, 'GMC', 'Sierra 2500' union all select
1999, 'GMC', 'Sonoma' union all select
1999, 'GMC', 'Suburban 1500' union all select
1999, 'GMC', 'Suburban 2500' union all select
1999, 'GMC', 'Yukon' union all select
1999, 'Kia', 'Sportage' union all select
1999, 'Kia', 'Sephia' union all select
1999, 'Jeep', 'Grand Cherokee' union all select
1999, 'Jeep', 'Cherokee' union all select
1999, 'Jeep', 'Wrangler' union all select
1999, 'Chrysler', '300M' union all select
1999, 'Lotus', 'Esprit' union all select
1999, 'Corbin', 'Sparrow' union all select
1999, 'Acura', 'CL' union all select
1999, 'Acura', 'Integra' union all select
1999, 'Acura', 'NSX' union all select
1999, 'Acura', 'RL' union all select
1999, 'Acura', 'SLX' union all select
1999, 'Acura', 'TL' union all select
1999, 'Cadillac', 'Catera' union all select
1999, 'Cadillac', 'DeVille' union all select
1999, 'Cadillac', 'Eldorado' union all select
1999, 'Cadillac', 'Escalade' union all select
1999, 'Cadillac', 'Seville' union all select
1999, 'Chrysler', '300' union all select
1999, 'Chrysler', 'Cirrus' union all select
1999, 'Chrysler', 'Concorde' union all select
1999, 'Chrysler', 'LHS' union all select
1999, 'Chrysler', 'Sebring' union all select
1999, 'Chrysler', 'Town & Country' union all select
1999, 'Daewoo', 'Lanos' union all select
1999, 'Daewoo', 'Leganza' union all select
1999, 'Daewoo', 'Nubira' union all select
1999, 'Ford', 'Contour' union all select
1999, 'Ford', 'Crown Victoria' union all select
1999, 'Ford', 'Econoline E150' union all select
1999, 'Ford', 'Econoline E250' union all select
1999, 'Ford', 'Econoline E350' union all select
1999, 'Ford', 'Escort' union all select
1999, 'Ford', 'Expedition' union all select
1999, 'Ford', 'Explorer' union all select
1999, 'Ford', 'F150' union all select
1999, 'Ford', 'F250' union all select
1999, 'Ford', 'F350' union all select
1999, 'Ford', 'Mustang' union all select
1999, 'Ford', 'Ranger' union all select
1999, 'Ford', 'Taurus' union all select
1999, 'Ford', 'Windstar' union all select
1999, 'HUMMER', 'H1' union all select
1999, 'Hyundai', 'Accent' union all select
1999, 'Hyundai', 'Elantra' union all select
1999, 'Hyundai', 'Sonata' union all select
1999, 'Hyundai', 'Tiburon' union all select
1999, 'Infiniti', 'G' union all select
1999, 'Infiniti', 'I' union all select
1999, 'Infiniti', 'Q' union all select
1999, 'Infiniti', 'QX' union all select
1999, 'Isuzu', 'Amigo' union all select
1999, 'Isuzu', 'Hombre' union all select
1999, 'Isuzu', 'Hombre Space' union all select
1999, 'Isuzu', 'Oasis' union all select
1999, 'Isuzu', 'Rodeo' union all select
1999, 'Isuzu', 'Trooper' union all select
1999, 'Isuzu', 'VehiCROSS' union all select
1999, 'Jaguar', 'XJ Series' union all select
1999, 'Jaguar', 'XK Series' union all select
1999, 'Nissan', 'Altima' union all select
1999, 'Nissan', 'Frontier' union all select
1999, 'Nissan', 'Maxima' union all select
1999, 'Nissan', 'Pathfinder' union all select
1999, 'Nissan', 'Quest' union all select
1999, 'Nissan', 'Sentra' union all select
1999, 'Oldsmobile', '88' union all select
1999, 'Oldsmobile', 'Alero' union all select
1999, 'Oldsmobile', 'Aurora' union all select
1999, 'Oldsmobile', 'Bravada' union all select
1999, 'Oldsmobile', 'Cutlass' union all select
1999, 'Oldsmobile', 'Intrigue' union all select
1999, 'Oldsmobile', 'LSS' union all select
1999, 'Oldsmobile', 'Silhouette' union all select
1999, 'Plymouth', 'Breeze' union all select
1999, 'Plymouth', 'Grand Voyager' union all select
1999, 'Plymouth', 'Neon' union all select
1999, 'Plymouth', 'Prowler' union all select
1999, 'Plymouth', 'Voyager' union all select
1999, 'Saturn', 'S-Series' union all select
1999, 'Toyota', '4Runner' union all select
1999, 'Toyota', 'Avalon' union all select
1999, 'Toyota', 'Camry' union all select
1999, 'Toyota', 'Celica' union all select
1999, 'Toyota', 'Corolla' union all select
1999, 'Toyota', 'Land Cruiser' union all select
1999, 'Toyota', 'RAV4' union all select
1999, 'Toyota', 'Sienna' union all select
1999, 'Toyota', 'Solara' union all select
1999, 'Toyota', 'Tacoma' union all select
1999, 'Toyota', 'Tacoma Xtra' union all select
1999, 'Volvo', 'C70' union all select
1999, 'Volvo', 'S70' union all select
1999, 'Volvo', 'S80' union all select
1999, 'Volvo', 'V70' union all select
2000, 'Subaru', 'Forester' union all select
2000, 'Subaru', 'Impreza' union all select
2000, 'Subaru', 'Legacy' union all select
2000, 'Subaru', 'Outback' union all select
2000, 'Honda', 'Insight' union all select
2000, 'Honda', 'Civic' union all select
2000, 'Honda', 'CR-V' union all select
2000, 'Honda', 'Odyssey' union all select
2000, 'Honda', 'Passport' union all select
2000, 'Honda', 'Accord' union all select
2000, 'Honda', 'Prelude' union all select
2000, 'Honda', 'S2000' union all select
2000, 'Porsche', '911' union all select
2000, 'Porsche', 'Boxster' union all select
2000, 'Saab', '9-3' union all select
2000, 'Saab', '9-5' union all select
2000, 'Mazda', '626' union all select
2000, 'Mazda', 'MPV' union all select
2000, 'Mazda', 'B-Series' union all select
2000, 'Mazda', 'Protege' union all select
2000, 'Mazda', 'MX-5' union all select
2000, 'Mazda', 'Millenia' union all select
2000, 'Mazda', 'B-Series Plus' union all select
2000, 'Mazda', 'Miata MX-5' union all select
2000, 'Mercedes-Benz', 'C-Class' union all select
2000, 'Mercedes-Benz', 'SL-Class' union all select
2000, 'Mercedes-Benz', 'CLK-Class' union all select
2000, 'Mercedes-Benz', 'E-Class' union all select
2000, 'Mercedes-Benz', 'M-Class' union all select
2000, 'Mercedes-Benz', 'S-Class' union all select
2000, 'Mercedes-Benz', 'SLK-Class' union all select
2000, 'Mercedes-Benz', 'CL-Class' union all select
2000, 'Suzuki', 'Esteem' union all select
2000, 'Suzuki', 'Vitara' union all select
2000, 'Suzuki', 'Swift' union all select
2000, 'Suzuki', 'Grand Vitara' union all select
2000, 'BMW', '3 Series' union all select
2000, 'BMW', '5 Series' union all select
2000, 'BMW', '7 Series' union all select
2000, 'BMW', 'X5' union all select
2000, 'BMW', 'M' union all select
2000, 'BMW', 'M5' union all select
2000, 'BMW', 'Z3' union all select
2000, 'BMW', 'Z8' union all select
2000, 'Mercury', 'Sable' union all select
2000, 'Mercury', 'Mountaineer' union all select
2000, 'Mercury', 'Villager' union all select
2000, 'Mercury', 'Grand Marquis' union all select
2000, 'Mercury', 'Cougar' union all select
2000, 'Mercury', 'Mystique' union all select
2000, 'Volkswagen', 'Golf' union all select
2000, 'Volkswagen', 'Jetta' union all select
2000, 'Volkswagen', 'Eurovan' union all select
2000, 'Volkswagen', 'Passat' union all select
2000, 'Volkswagen', 'GTI' union all select
2000, 'Volkswagen', 'New Beetle' union all select
2000, 'Volkswagen', 'Cabriolet' union all select
2000, 'Volkswagen', 'rio' union all select
2000, 'Lamborghini', 'Diablo' union all select
2000, 'Kia', 'Sportage' union all select
2000, 'Kia', 'Sephia' union all select
2000, 'Kia', 'Spectra' union all select
2000, 'Lotus', 'Esprit' union all select
2000, 'Mitsubishi', 'Challenger' union all select
2000, 'Mitsubishi', 'Mirage' union all select
2000, 'Mitsubishi', 'Eclipse' union all select
2000, 'Mitsubishi', 'Pajero' union all select
2000, 'Mitsubishi', 'Diamante' union all select
2000, 'Mitsubishi', 'Galant' union all select
2000, 'Mitsubishi', 'Montero' union all select
2000, 'Mitsubishi', 'Montero Sport' union all select
2000, 'Lexus', 'RX' union all select
2000, 'Lexus', 'LS' union all select
2000, 'Lexus', 'LX' union all select
2000, 'Lexus', 'GS' union all select
2000, 'Lexus', 'ES' union all select
2000, 'Lexus', 'SC' union all select
2000, 'Buick', 'Park Avenue' union all select
2000, 'Buick', 'LeSabre' union all select
2000, 'Buick', 'Regal' union all select
2000, 'Buick', 'Century' union all select
2000, 'Lincoln', 'Continental' union all select
2000, 'Lincoln', 'LS' union all select
2000, 'Lincoln', 'Navigator' union all select
2000, 'Lincoln', 'Town Car' union all select
2000, 'Pontiac', 'Grand Prix' union all select
2000, 'Pontiac', 'Sunfire' union all select
2000, 'Pontiac', 'Firebird' union all select
2000, 'Pontiac', 'Montana' union all select
2000, 'Pontiac', 'Grand Am' union all select
2000, 'Pontiac', 'Bonneville' union all select
2000, 'Ford', 'Th!nk' union all select
2000, 'Ford', 'Contour' union all select
2000, 'Ford', 'Explorer Sport Trac' union all select
2000, 'Ford', 'Escape' union all select
2000, 'Ford', 'Crown Victoria' union all select
2000, 'Ford', 'Econoline E150' union all select
2000, 'Ford', 'Econoline E250' union all select
2000, 'Ford', 'Econoline E350' union all select
2000, 'Ford', 'Escort' union all select
2000, 'Ford', 'Excursion' union all select
2000, 'Ford', 'Expedition' union all select
2000, 'Ford', 'Explorer' union all select
2000, 'Ford', 'Explorer Sport' union all select
2000, 'Ford', 'F150' union all select
2000, 'Ford', 'F250' union all select
2000, 'Ford', 'F350' union all select
2000, 'Ford', 'Focus' union all select
2000, 'Ford', 'Mustang' union all select
2000, 'Ford', 'Ranger' union all select
2000, 'Ford', 'Taurus' union all select
2000, 'Ford', 'Windstar' union all select
2000, 'Audi', 'TT' union all select
2000, 'Audi', 'A4' union all select
2000, 'Audi', 'A6' union all select
2000, 'Audi', 'S4' union all select
2000, 'Audi', 'A8' union all select
2000, 'Toyota', 'Tundra' union all select
2000, 'Toyota', 'Ipsum' union all select
2000, 'Toyota', '4Runner' union all select
2000, 'Toyota', 'Avalon' union all select
2000, 'Toyota', 'Camry' union all select
2000, 'Toyota', 'Celica' union all select
2000, 'Toyota', 'Corolla' union all select
2000, 'Toyota', 'Echo' union all select
2000, 'Toyota', 'Land Cruiser' union all select
2000, 'Toyota', 'MR2' union all select
2000, 'Toyota', 'RAV4' union all select
2000, 'Toyota', 'Sienna' union all select
2000, 'Toyota', 'Solara' union all select
2000, 'Toyota', 'Tacoma' union all select
2000, 'Toyota', 'Tacoma Xtra' union all select
2000, 'Nissan', 'Xterra' union all select
2000, 'Nissan', 'Altima' union all select
2000, 'Nissan', 'Frontier' union all select
2000, 'Nissan', 'Maxima' union all select
2000, 'Nissan', 'Pathfinder' union all select
2000, 'Nissan', 'Quest' union all select
2000, 'Nissan', 'Sentra' union all select
2000, 'Chrysler', '300M' union all select
2000, 'Chrysler', 'Cirrus' union all select
2000, 'Chrysler', 'Concorde' union all select
2000, 'Chrysler', 'Grand Voyager' union all select
2000, 'Chrysler', 'LHS' union all select
2000, 'Chrysler', 'Sebring' union all select
2000, 'Chrysler', 'Town & Country' union all select
2000, 'Chrysler', 'Voyager' union all select
2000, 'Land Rover', 'Range Rover' union all select
2000, 'Land Rover', 'Discovery' union all select
2000, 'Land Rover', 'Discovery Series II' union all select
2000, 'Acura', 'Integra' union all select
2000, 'Acura', 'NSX' union all select
2000, 'Acura', 'RL' union all select
2000, 'Acura', 'TL' union all select
2000, 'Cadillac', 'Catera' union all select
2000, 'Cadillac', 'DeVille' union all select
2000, 'Cadillac', 'Eldorado' union all select
2000, 'Cadillac', 'Escalade' union all select
2000, 'Cadillac', 'Seville' union all select
2000, 'Chevrolet', '2500' union all select
2000, 'Chevrolet', '3500' union all select
2000, 'Chevrolet', 'Astro' union all select
2000, 'Chevrolet', 'Blazer' union all select
2000, 'Chevrolet', 'Camaro' union all select
2000, 'Chevrolet', 'Cavalier' union all select
2000, 'Chevrolet', 'Corvette' union all select
2000, 'Chevrolet', 'Express 1500' union all select
2000, 'Chevrolet', 'Express 2500' union all select
2000, 'Chevrolet', 'Express 3500' union all select
2000, 'Chevrolet', 'Impala' union all select
2000, 'Chevrolet', 'Lumina' union all select
2000, 'Chevrolet', 'Malibu' union all select
2000, 'Chevrolet', 'Metro' union all select
2000, 'Chevrolet', 'Monte Carlo' union all select
2000, 'Chevrolet', 'Prizm' union all select
2000, 'Chevrolet', 'S10' union all select
2000, 'Chevrolet', 'Silverado 1500' union all select
2000, 'Chevrolet', 'Silverado 2500' union all select
2000, 'Chevrolet', 'Suburban 1500' union all select
2000, 'Chevrolet', 'Suburban 2500' union all select
2000, 'Chevrolet', 'Tahoe' union all select
2000, 'Chevrolet', 'Tracker' union all select
2000, 'Chevrolet', 'Venture' union all select
2000, 'Daewoo', 'Lanos' union all select
2000, 'Daewoo', 'Leganza' union all select
2000, 'Daewoo', 'Nubira' union all select
2000, 'Dodge', 'Avenger' union all select
2000, 'Dodge', 'Caravan' union all select
2000, 'Dodge', 'Dakota Club' union all select
2000, 'Dodge', 'Dakota' union all select
2000, 'Dodge', 'Durango' union all select
2000, 'Dodge', 'Grand Caravan' union all select
2000, 'Dodge', 'Intrepid' union all select
2000, 'Dodge', 'Neon' union all select
2000, 'Dodge', 'Ram 1500 Club' union all select
2000, 'Dodge', 'Ram 1500' union all select
2000, 'Dodge', 'Ram 2500' union all select
2000, 'Dodge', 'Ram 3500' union all select
2000, 'Dodge', 'Ram Van 1500' union all select
2000, 'Dodge', 'Ram Van 2500' union all select
2000, 'Dodge', 'Ram Van 3500' union all select
2000, 'Dodge', 'Stratus' union all select
2000, 'Dodge', 'Viper' union all select
2000, 'GMC', 'Envoy' union all select
2000, 'GMC', 'Jimmy' union all select
2000, 'GMC', 'Safari' union all select
2000, 'GMC', 'Savana 1500' union all select
2000, 'GMC', 'Savana 2500' union all select
2000, 'GMC', 'Savana 3500' union all select
2000, 'GMC', 'Sierra 2500' union all select
2000, 'GMC', 'Sierra 3500' union all select
2000, 'GMC', 'Sierra 1500' union all select
2000, 'GMC', 'Sonoma' union all select
2000, 'GMC', 'Yukon' union all select
2000, 'GMC', 'Yukon Denali' union all select
2000, 'GMC', 'Yukon XL 1500' union all select
2000, 'GMC', 'Yukon XL 2500' union all select
2000, 'HUMMER', 'H1' union all select
2000, 'Hyundai', 'Accent' union all select
2000, 'Hyundai', 'Elantra' union all select
2000, 'Hyundai', 'Sonata' union all select
2000, 'Hyundai', 'Tiburon' union all select
2000, 'Infiniti', 'G' union all select
2000, 'Infiniti', 'I' union all select
2000, 'Infiniti', 'Q' union all select
2000, 'Infiniti', 'QX' union all select
2000, 'Isuzu', 'Amigo' union all select
2000, 'Isuzu', 'Hombre' union all select
2000, 'Isuzu', 'Hombre Space' union all select
2000, 'Isuzu', 'Rodeo' union all select
2000, 'Isuzu', 'Trooper' union all select
2000, 'Isuzu', 'VehiCROSS' union all select
2000, 'Jaguar', 'S-Type' union all select
2000, 'Jaguar', 'XJ Series' union all select
2000, 'Jaguar', 'XK Series' union all select
2000, 'Jeep', 'Cherokee' union all select
2000, 'Jeep', 'Grand Cherokee' union all select
2000, 'Jeep', 'Wrangler' union all select
2000, 'Oldsmobile', 'Alero' union all select
2000, 'Oldsmobile', 'Bravada' union all select
2000, 'Oldsmobile', 'Intrigue' union all select
2000, 'Oldsmobile', 'Silhouette' union all select
2000, 'Plymouth', 'Breeze' union all select
2000, 'Plymouth', 'Grand Voyager' union all select
2000, 'Plymouth', 'Neon' union all select
2000, 'Plymouth', 'Prowler' union all select
2000, 'Plymouth', 'Voyager' union all select
2000, 'Saturn', 'L-Series' union all select
2000, 'Saturn', 'S-Series' union all select
2000, 'Volvo', 'C70' union all select
2000, 'Volvo', 'S40' union all select
2000, 'Volvo', 'S70' union all select
2000, 'Volvo', 'S80' union all select
2000, 'Volvo', 'V40' union all select
2000, 'Volvo', 'V70' union all select
2001, 'Volkswagen', 'Passat' union all select
2001, 'Volkswagen', 'Jetta' union all select
2001, 'Volkswagen', 'Eurovan' union all select
2001, 'Volkswagen', 'Golf' union all select
2001, 'Volkswagen', 'Cabriolet' union all select
2001, 'Volkswagen', 'New Beetle' union all select
2001, 'Volkswagen', 'GTI' union all select
2001, 'Volkswagen', 'rio' union all select
2001, 'Ford', 'Explorer' union all select
2001, 'Ford', 'F-Series' union all select
2001, 'Ford', 'E-Series' union all select
2001, 'Ford', 'Windstar' union all select
2001, 'Ford', 'Escape' union all select
2001, 'Ford', 'Taurus' union all select
2001, 'Ford', 'Ranger' union all select
2001, 'Ford', 'Focus' union all select
2001, 'Ford', 'Escort' union all select
2001, 'Ford', 'Expedition' union all select
2001, 'Ford', 'Mustang' union all select
2001, 'Ford', 'Explorer Sport Trac' union all select
2001, 'Ford', 'TH!NK' union all select
2001, 'Ford', 'Fiesta' union all select
2001, 'Ford', 'Crown Victoria' union all select
2001, 'Ford', 'Econoline E150' union all select
2001, 'Ford', 'Econoline E250' union all select
2001, 'Ford', 'Econoline E350' union all select
2001, 'Ford', 'Excursion' union all select
2001, 'Ford', 'Explorer Sport' union all select
2001, 'Ford', 'F150' union all select
2001, 'Ford', 'F250' union all select
2001, 'Ford', 'F350' union all select
2001, 'Ford', 'ZX2' union all select
2001, 'Lamborghini', 'Diablo' union all select
2001, 'Suzuki', 'Vitara' union all select
2001, 'Suzuki', 'Esteem' union all select
2001, 'Suzuki', 'Swift' union all select
2001, 'Suzuki', 'Grand Vitara' union all select
2001, 'Suzuki', 'XL-7' union all select
2001, 'Mazda', '626' union all select
2001, 'Mazda', 'B2500' union all select
2001, 'Mazda', 'B-Series' union all select
2001, 'Mazda', 'Tribute' union all select
2001, 'Mazda', 'MX-5' union all select
2001, 'Mazda', 'Millenia' union all select
2001, 'Mazda', 'MPV' union all select
2001, 'Mazda', 'Protege' union all select
2001, 'Mazda', 'B-Series Plus' union all select
2001, 'Mazda', 'Miata MX-5' union all select
2001, 'Audi', 'S8' union all select
2001, 'Audi', 'A6' union all select
2001, 'Audi', 'S4' union all select
2001, 'Audi', 'TT' union all select
2001, 'Audi', 'Allroad' union all select
2001, 'Audi', 'A8' union all select
2001, 'Audi', 'A4' union all select
2001, 'Porsche', '911' union all select
2001, 'Porsche', 'Boxster' union all select
2001, 'Saab', '9-3' union all select
2001, 'Saab', '9-5' union all select
2001, 'Pontiac', 'Montana' union all select
2001, 'Pontiac', 'Sunfire' union all select
2001, 'Pontiac', 'Aztek' union all select
2001, 'Pontiac', 'Grand Am' union all select
2001, 'Pontiac', 'Bonneville' union all select
2001, 'Pontiac', 'Firebird' union all select
2001, 'Pontiac', 'Grand Prix' union all select
2001, 'Subaru', 'Impreza' union all select
2001, 'Subaru', 'Outback' union all select
2001, 'Subaru', 'Legacy' union all select
2001, 'Subaru', 'Forester' union all select
2001, 'Mercedes-Benz', 'CLK-Class' union all select
2001, 'Mercedes-Benz', 'E-Class' union all select
2001, 'Mercedes-Benz', 'M-Class' union all select
2001, 'Mercedes-Benz', 'C-Class' union all select
2001, 'Mercedes-Benz', 'SL-Class' union all select
2001, 'Mercedes-Benz', 'CL-Class' union all select
2001, 'Mercedes-Benz', 'S-Class' union all select
2001, 'Mercedes-Benz', 'SLK-Class' union all select
2001, 'Mitsubishi', 'Mirage' union all select
2001, 'Mitsubishi', 'Galant' union all select
2001, 'Mitsubishi', 'Eclipse' union all select
2001, 'Mitsubishi', 'Challenger' union all select
2001, 'Mitsubishi', 'Lancer' union all select
2001, 'Mitsubishi', 'Diamante' union all select
2001, 'Mitsubishi', 'Pajero' union all select
2001, 'Mitsubishi', 'Montero' union all select
2001, 'Mitsubishi', 'Montero Sport' union all select
2001, 'Lincoln', 'Navigator' union all select
2001, 'Lincoln', 'Continental' union all select
2001, 'Lincoln', 'LS' union all select
2001, 'Lincoln', 'Town Car' union all select
2001, 'Lexus', 'LX' union all select
2001, 'Lexus', 'RX' union all select
2001, 'Lexus', 'LS' union all select
2001, 'Lexus', 'ES' union all select
2001, 'Lexus', 'IS' union all select
2001, 'Lexus', 'GS' union all select
2001, 'Land Rover', 'Discovery' union all select
2001, 'Land Rover', 'Range Rover' union all select
2001, 'Land Rover', 'Freelander' union all select
2001, 'Land Rover', 'Discovery Series II' union all select
2001, 'BMW', '3 Series' union all select
2001, 'BMW', '5 Series' union all select
2001, 'BMW', '7 Series' union all select
2001, 'BMW', '525' union all select
2001, 'BMW', '530' union all select
2001, 'BMW', 'X5' union all select
2001, 'BMW', 'M' union all select
2001, 'BMW', 'M3' union all select
2001, 'BMW', 'M5' union all select
2001, 'BMW', 'Z3' union all select
2001, 'BMW', 'Z8' union all select
2001, 'Mercury', 'Sable' union all select
2001, 'Mercury', 'Mountaineer' union all select
2001, 'Mercury', 'Grand Marquis' union all select
2001, 'Mercury', 'Cougar' union all select
2001, 'Mercury', 'Villager' union all select
2001, 'Toyota', 'Highlander' union all select
2001, 'Toyota', '4Runner' union all select
2001, 'Toyota', 'Avalon' union all select
2001, 'Toyota', 'Camry' union all select
2001, 'Toyota', 'Celica' union all select
2001, 'Toyota', 'Corolla' union all select
2001, 'Toyota', 'Echo' union all select
2001, 'Toyota', 'Land Cruiser' union all select
2001, 'Toyota', 'MR2' union all select
2001, 'Toyota', 'Prius' union all select
2001, 'Toyota', 'RAV4' union all select
2001, 'Toyota', 'Sequoia' union all select
2001, 'Toyota', 'Sienna' union all select
2001, 'Toyota', 'Solara' union all select
2001, 'Toyota', 'Tacoma' union all select
2001, 'Toyota', 'Tacoma Xtra' union all select
2001, 'Toyota', 'Tundra' union all select
2001, 'Honda', 'Passport' union all select
2001, 'Honda', 'Accord' union all select
2001, 'Honda', 'CR-V' union all select
2001, 'Honda', 'Prelude' union all select
2001, 'Honda', 'Odyssey' union all select
2001, 'Honda', 'Insight' union all select
2001, 'Honda', 'Civic' union all select
2001, 'Honda', 'S2000' union all select
2001, 'Kia', 'Sephia' union all select
2001, 'Kia', 'Sportage' union all select
2001, 'Kia', 'Rio' union all select
2001, 'Kia', 'Optima' union all select
2001, 'Kia', 'Spectra' union all select
2001, 'Chevrolet', 'Silverado' union all select
2001, 'Chevrolet', 'Astro' union all select
2001, 'Chevrolet', 'Blazer' union all select
2001, 'Chevrolet', 'Camaro' union all select
2001, 'Chevrolet', 'Cavalier' union all select
2001, 'Chevrolet', 'Corvette' union all select
2001, 'Chevrolet', 'Express 1500' union all select
2001, 'Chevrolet', 'Express 2500' union all select
2001, 'Chevrolet', 'Express 3500' union all select
2001, 'Chevrolet', 'Impala' union all select
2001, 'Chevrolet', 'Lumina' union all select
2001, 'Chevrolet', 'Malibu' union all select
2001, 'Chevrolet', 'Metro' union all select
2001, 'Chevrolet', 'Monte Carlo' union all select
2001, 'Chevrolet', 'Prizm' union all select
2001, 'Chevrolet', 'S10' union all select
2001, 'Chevrolet', 'Silverado 1500' union all select
2001, 'Chevrolet', 'Silverado 2500' union all select
2001, 'Chevrolet', 'Silverado 3500' union all select
2001, 'Chevrolet', 'Suburban 1500' union all select
2001, 'Chevrolet', 'Suburban 2500' union all select
2001, 'Chevrolet', 'Tahoe' union all select
2001, 'Chevrolet', 'Tracker' union all select
2001, 'Chevrolet', 'Venture' union all select
2001, 'Acura', 'MDX' union all select
2001, 'Acura', 'CL' union all select
2001, 'Acura', 'Integra' union all select
2001, 'Acura', 'NSX' union all select
2001, 'Acura', 'RL' union all select
2001, 'Acura', 'TL' union all select
2001, 'Chrysler', 'PT Cruiser' union all select
2001, 'Chrysler', '300M' union all select
2001, 'Chrysler', 'Concorde' union all select
2001, 'Chrysler', 'LHS' union all select
2001, 'Chrysler', 'Prowler' union all select
2001, 'Chrysler', 'Sebring' union all select
2001, 'Chrysler', 'Town & Country' union all select
2001, 'Chrysler', 'Voyager' union all select
2001, 'Lotus', 'Esprit' union all select
2001, 'Buick', 'Park Avenue' union all select
2001, 'Buick', 'Century' union all select
2001, 'Buick', 'Regal' union all select
2001, 'Buick', 'LeSabre' union all select
2001, 'Cadillac', 'Catera' union all select
2001, 'Cadillac', 'DeVille' union all select
2001, 'Cadillac', 'Eldorado' union all select
2001, 'Cadillac', 'Seville' union all select
2001, 'Daewoo', 'Lanos' union all select
2001, 'Daewoo', 'Leganza' union all select
2001, 'Daewoo', 'Nubira' union all select
2001, 'Dodge', 'Caravan' union all select
2001, 'Dodge', 'Dakota Club' union all select
2001, 'Dodge', 'Dakota' union all select
2001, 'Dodge', 'Durango' union all select
2001, 'Dodge', 'Grand Caravan' union all select
2001, 'Dodge', 'Intrepid' union all select
2001, 'Dodge', 'Neon' union all select
2001, 'Dodge', 'Ram 1500 Club' union all select
2001, 'Dodge', 'Ram 1500' union all select
2001, 'Dodge', 'Ram 2500' union all select
2001, 'Dodge', 'Ram 3500' union all select
2001, 'Dodge', 'Ram Van 1500' union all select
2001, 'Dodge', 'Ram Van 2500' union all select
2001, 'Dodge', 'Ram Van 3500' union all select
2001, 'Dodge', 'Stratus' union all select
2001, 'Dodge', 'Viper' union all select
2001, 'GMC', 'Jimmy' union all select
2001, 'GMC', 'Safari' union all select
2001, 'GMC', 'Savana 1500' union all select
2001, 'GMC', 'Savana 2500' union all select
2001, 'GMC', 'Savana 3500' union all select
2001, 'GMC', 'Sierra 1500' union all select
2001, 'GMC', 'Sierra 2500' union all select
2001, 'GMC', 'Sierra 3500' union all select
2001, 'GMC', 'Sonoma' union all select
2001, 'GMC', 'Yukon' union all select
2001, 'GMC', 'Yukon XL 1500' union all select
2001, 'GMC', 'Yukon XL 2500' union all select
2001, 'HUMMER', 'H1' union all select
2001, 'Hyundai', 'Accent' union all select
2001, 'Hyundai', 'Elantra' union all select
2001, 'Hyundai', 'Santa Fe' union all select
2001, 'Hyundai', 'Sonata' union all select
2001, 'Hyundai', 'Tiburon' union all select
2001, 'Hyundai', 'XG300' union all select
2001, 'Infiniti', 'G' union all select
2001, 'Infiniti', 'I' union all select
2001, 'Infiniti', 'Q' union all select
2001, 'Infiniti', 'QX' union all select
2001, 'Isuzu', 'Rodeo' union all select
2001, 'Isuzu', 'Rodeo Sport' union all select
2001, 'Isuzu', 'Trooper' union all select
2001, 'Isuzu', 'VehiCROSS' union all select
2001, 'Jaguar', 'S-Type' union all select
2001, 'Jaguar', 'XJ Series' union all select
2001, 'Jaguar', 'XK Series' union all select
2001, 'Jeep', 'Cherokee' union all select
2001, 'Jeep', 'Grand Cherokee' union all select
2001, 'Jeep', 'Wrangler' union all select
2001, 'Nissan', 'Altima' union all select
2001, 'Nissan', 'Frontier' union all select
2001, 'Nissan', 'Maxima' union all select
2001, 'Nissan', 'Pathfinder' union all select
2001, 'Nissan', 'Quest' union all select
2001, 'Nissan', 'Sentra' union all select
2001, 'Nissan', 'Xterra' union all select
2001, 'Oldsmobile', 'Alero' union all select
2001, 'Oldsmobile', 'Aurora' union all select
2001, 'Oldsmobile', 'Bravada' union all select
2001, 'Oldsmobile', 'Intrigue' union all select
2001, 'Oldsmobile', 'Silhouette' union all select
2001, 'Plymouth', 'Neon' union all select
2001, 'Saturn', 'L-Series' union all select
2001, 'Saturn', 'S-Series' union all select
2001, 'Volvo', 'C70' union all select
2001, 'Volvo', 'S40' union all select
2001, 'Volvo', 'S60' union all select
2001, 'Volvo', 'S80' union all select
2001, 'Volvo', 'V40' union all select
2001, 'Volvo', 'V70' union all select
2002, 'Suzuki', 'Esteem' union all select
2002, 'Suzuki', 'Vitara' union all select
2002, 'Suzuki', 'Aerio' union all select
2002, 'Suzuki', 'Grand Vitara' union all select
2002, 'Suzuki', 'XL-7' union all select
2002, 'Mercedes-Benz', 'CLK-Class' union all select
2002, 'Mercedes-Benz', 'S-Class' union all select
2002, 'Mercedes-Benz', 'C-Class' union all select
2002, 'Mercedes-Benz', 'SL-Class' union all select
2002, 'Mercedes-Benz', 'E-Class' union all select
2002, 'Mercedes-Benz', 'SLK-Class' union all select
2002, 'Mercedes-Benz', 'CL-Class' union all select
2002, 'Mercedes-Benz', 'G-Class' union all select
2002, 'Mercedes-Benz', 'M-Class' union all select
2002, 'Subaru', 'Outback' union all select
2002, 'Subaru', 'Legacy' union all select
2002, 'Subaru', 'Impreza' union all select
2002, 'Subaru', 'Outback Sport' union all select
2002, 'Subaru', 'Forester' union all select
2002, 'Honda', 'Insight' union all select
2002, 'Honda', 'Passport' union all select
2002, 'Honda', 'CR-V' union all select
2002, 'Honda', 'Civic' union all select
2002, 'Honda', 'Accord' union all select
2002, 'Honda', 'S2000' union all select
2002, 'Honda', 'Pilot' union all select
2002, 'Honda', 'Odyssey' union all select
2002, 'Mazda', '626' union all select
2002, 'Mazda', 'B-Series' union all select
2002, 'Mazda', 'Tribute' union all select
2002, 'Mazda', 'Protege' union all select
2002, 'Mazda', 'Millenia' union all select
2002, 'Mazda', 'MPV' union all select
2002, 'Mazda', 'MX-5' union all select
2002, 'Mazda', 'B-Series Plus' union all select
2002, 'Mazda', 'Miata MX-5' union all select
2002, 'Mazda', 'Protege5' union all select
2002, 'Land Rover', 'Range Rover' union all select
2002, 'Land Rover', 'Discovery' union all select
2002, 'Land Rover', 'Freelander' union all select
2002, 'Land Rover', 'Discovery Series II' union all select
2002, 'Mitsubishi', 'Challenger' union all select
2002, 'Mitsubishi', 'Lancer Evolution' union all select
2002, 'Mitsubishi', 'Lancer' union all select
2002, 'Mitsubishi', 'Eclipse' union all select
2002, 'Mitsubishi', 'Mirage' union all select
2002, 'Mitsubishi', 'Galant' union all select
2002, 'Mitsubishi', 'Diamante' union all select
2002, 'Mitsubishi', 'Pajero' union all select
2002, 'Mitsubishi', 'Montero' union all select
2002, 'Mitsubishi', 'Montero Sport' union all select
2002, 'Ford', 'Explorer Sport Trac' union all select
2002, 'Ford', 'E-Series' union all select
2002, 'Ford', 'Mustang' union all select
2002, 'Ford', 'Crown Victoria' union all select
2002, 'Ford', 'Escort' union all select
2002, 'Ford', 'Explorer' union all select
2002, 'Ford', 'Ranger' union all select
2002, 'Ford', 'Escape' union all select
2002, 'Ford', 'Expedition' union all select
2002, 'Ford', 'Focus' union all select
2002, 'Ford', 'Thunderbird' union all select
2002, 'Ford', 'F-Series' union all select
2002, 'Ford', 'Windstar' union all select
2002, 'Ford', 'Taurus' union all select
2002, 'Ford', 'Th!nk' union all select
2002, 'Ford', 'Econoline E150' union all select
2002, 'Ford', 'Econoline E250' union all select
2002, 'Ford', 'Econoline E350' union all select
2002, 'Ford', 'Excursion' union all select
2002, 'Ford', 'Explorer Sport' union all select
2002, 'Ford', 'F150' union all select
2002, 'Ford', 'F250' union all select
2002, 'Ford', 'F350' union all select
2002, 'Ford', 'ZX2' union all select
2002, 'Mercury', 'Mountaineer' union all select
2002, 'Mercury', 'Sable' union all select
2002, 'Mercury', 'Villager' union all select
2002, 'Mercury', 'Cougar' union all select
2002, 'Mercury', 'Grand Marquis' union all select
2002, 'Lamborghini', 'Murcielago' union all select
2002, 'Pontiac', 'Sunfire' union all select
2002, 'Pontiac', 'Bonneville' union all select
2002, 'Pontiac', 'Grand Prix' union all select
2002, 'Pontiac', 'Firebird' union all select
2002, 'Pontiac', 'Grand Am' union all select
2002, 'Pontiac', 'Aztek' union all select
2002, 'Pontiac', 'Montana' union all select
2002, 'Volkswagen', 'New Beetle' union all select
2002, 'Volkswagen', 'Jetta' union all select
2002, 'Volkswagen', 'Golf' union all select
2002, 'Volkswagen', 'Eurovan' union all select
2002, 'Volkswagen', 'Passat' union all select
2002, 'Volkswagen', 'GTI' union all select
2002, 'Volkswagen', 'Cabriolet' union all select
2002, 'Volkswagen', 'rio' union all select
2002, 'Buick', 'Rendezvous' union all select
2002, 'Buick', 'LeSabre' union all select
2002, 'Buick', 'Regal' union all select
2002, 'Buick', 'Park Avenue' union all select
2002, 'Buick', 'Century' union all select
2002, 'Audi', 'TT' union all select
2002, 'Audi', 'A6' union all select
2002, 'Audi', 'A8' union all select
2002, 'Audi', 'S4' union all select
2002, 'Audi', 'A4' union all select
2002, 'Audi', 'S8' union all select
2002, 'Audi', 'Allroad' union all select
2002, 'Audi', 'S6' union all select
2002, 'Saab', '9-3' union all select
2002, 'Saab', '9-5' union all select
2002, 'BMW', '3 Series' union all select
2002, 'BMW', '5 Series' union all select
2002, 'BMW', '7 Series' union all select
2002, 'BMW', '525' union all select
2002, 'BMW', '530' union all select
2002, 'BMW', '745' union all select
2002, 'BMW', 'M3' union all select
2002, 'BMW', 'X5' union all select
2002, 'BMW', 'M' union all select
2002, 'BMW', 'M5' union all select
2002, 'BMW', 'Z3' union all select
2002, 'BMW', 'Z8' union all select
2002, 'Maserati', 'Spyder' union all select
2002, 'Lincoln', 'Continental' union all select
2002, 'Lincoln', 'Blackwood' union all select
2002, 'Lincoln', 'Navigator' union all select
2002, 'Lincoln', 'Town Car' union all select
2002, 'Lincoln', 'LS' union all select
2002, 'Kia', 'Spectra' union all select
2002, 'Kia', 'Sedona' union all select
2002, 'Kia', 'Optima' union all select
2002, 'Kia', 'Sportage' union all select
2002, 'Kia', 'Rio' union all select
2002, 'Porsche', '911' union all select
2002, 'Porsche', 'Boxster' union all select
2002, 'Lexus', 'LX' union all select
2002, 'Lexus', 'SC' union all select
2002, 'Lexus', 'ES' union all select
2002, 'Lexus', 'RX' union all select
2002, 'Lexus', 'GS' union all select
2002, 'Lexus', 'LS' union all select
2002, 'Lexus', 'IS' union all select
2002, 'GMC', 'Envoy' union all select
2002, 'GMC', 'Envoy XL' union all select
2002, 'GMC', 'Safari' union all select
2002, 'GMC', 'Savana 1500' union all select
2002, 'GMC', 'Savana 2500' union all select
2002, 'GMC', 'Savana 3500' union all select
2002, 'GMC', 'Sierra 1500' union all select
2002, 'GMC', 'Sierra 2500' union all select
2002, 'GMC', 'Sierra 3500' union all select
2002, 'GMC', 'Sonoma' union all select
2002, 'GMC', 'Yukon' union all select
2002, 'GMC', 'Yukon XL 1500' union all select
2002, 'GMC', 'Yukon XL 2500' union all select
2002, 'Chevrolet', 'Avalanche' union all select
2002, 'Chevrolet', 'Silverado' union all select
2002, 'Chevrolet', 'Trailblazer' union all select
2002, 'Chevrolet', 'Corvette' union all select
2002, 'Chevrolet', 'Astro' union all select
2002, 'Chevrolet', 'Avalanche 1500' union all select
2002, 'Chevrolet', 'Avalanche 2500' union all select
2002, 'Chevrolet', 'Blazer' union all select
2002, 'Chevrolet', 'Camaro' union all select
2002, 'Chevrolet', 'Cavalier' union all select
2002, 'Chevrolet', 'Express 1500' union all select
2002, 'Chevrolet', 'Express 2500' union all select
2002, 'Chevrolet', 'Express 3500' union all select
2002, 'Chevrolet', 'Impala' union all select
2002, 'Chevrolet', 'Malibu' union all select
2002, 'Chevrolet', 'Monte Carlo' union all select
2002, 'Chevrolet', 'Prizm' union all select
2002, 'Chevrolet', 'S10' union all select
2002, 'Chevrolet', 'Silverado 1500' union all select
2002, 'Chevrolet', 'Silverado 2500' union all select
2002, 'Chevrolet', 'Silverado 3500' union all select
2002, 'Chevrolet', 'Suburban 1500' union all select
2002, 'Chevrolet', 'Suburban 2500' union all select
2002, 'Chevrolet', 'Tahoe' union all select
2002, 'Chevrolet', 'Tracker' union all select
2002, 'Chevrolet', 'Venture' union all select
2002, 'Nissan', 'Altima' union all select
2002, 'Nissan', 'Xterra' union all select
2002, 'Nissan', 'Frontier' union all select
2002, 'Nissan', 'Maxima' union all select
2002, 'Nissan', 'Pathfinder' union all select
2002, 'Nissan', 'Quest' union all select
2002, 'Nissan', 'Sentra' union all select
2002, 'MINI', 'MINI' union all select
2002, 'MINI', 'Cooper' union all select
2002, 'Acura', 'RSX' union all select
2002, 'Acura', 'CL' union all select
2002, 'Acura', 'MDX' union all select
2002, 'Acura', 'NSX' union all select
2002, 'Acura', 'RL' union all select
2002, 'Acura', 'TL' union all select
2002, 'Lotus', 'Esprit' union all select
2002, 'Cadillac', 'DeVille' union all select
2002, 'Cadillac', 'Eldorado' union all select
2002, 'Cadillac', 'Escalade' union all select
2002, 'Cadillac', 'Escalade EXT' union all select
2002, 'Cadillac', 'Seville' union all select
2002, 'Chrysler', '300M' union all select
2002, 'Chrysler', 'Concorde' union all select
2002, 'Chrysler', 'Prowler' union all select
2002, 'Chrysler', 'PT Cruiser' union all select
2002, 'Chrysler', 'Sebring' union all select
2002, 'Chrysler', 'Town & Country' union all select
2002, 'Chrysler', 'Voyager' union all select
2002, 'Daewoo', 'Lanos' union all select
2002, 'Daewoo', 'Leganza' union all select
2002, 'Daewoo', 'Nubira' union all select
2002, 'Dodge', 'Caravan' union all select
2002, 'Dodge', 'Dakota Club' union all select
2002, 'Dodge', 'Dakota' union all select
2002, 'Dodge', 'Durango' union all select
2002, 'Dodge', 'Grand Caravan' union all select
2002, 'Dodge', 'Intrepid' union all select
2002, 'Dodge', 'Neon' union all select
2002, 'Dodge', 'Ram 1500' union all select
2002, 'Dodge', 'Ram 2500' union all select
2002, 'Dodge', 'Ram 3500' union all select
2002, 'Dodge', 'Ram Van 1500' union all select
2002, 'Dodge', 'Ram Van 2500' union all select
2002, 'Dodge', 'Ram Van 3500' union all select
2002, 'Dodge', 'Stratus' union all select
2002, 'Dodge', 'Viper' union all select
2002, 'HUMMER', 'H1' union all select
2002, 'Hyundai', 'Accent' union all select
2002, 'Hyundai', 'Elantra' union all select
2002, 'Hyundai', 'Santa Fe' union all select
2002, 'Hyundai', 'Sonata' union all select
2002, 'Hyundai', 'XG350' union all select
2002, 'Infiniti', 'G' union all select
2002, 'Infiniti', 'I' union all select
2002, 'Infiniti', 'Q' union all select
2002, 'Infiniti', 'QX' union all select
2002, 'Isuzu', 'Axiom' union all select
2002, 'Isuzu', 'Rodeo' union all select
2002, 'Isuzu', 'Rodeo Sport' union all select
2002, 'Isuzu', 'Trooper' union all select
2002, 'Jaguar', 'S-Type' union all select
2002, 'Jaguar', 'XJ Series' union all select
2002, 'Jaguar', 'XK Series' union all select
2002, 'Jaguar', 'X-Type' union all select
2002, 'Jeep', 'Grand Cherokee' union all select
2002, 'Jeep', 'Liberty' union all select
2002, 'Jeep', 'Wrangler' union all select
2002, 'Oldsmobile', 'Alero' union all select
2002, 'Oldsmobile', 'Aurora' union all select
2002, 'Oldsmobile', 'Bravada' union all select
2002, 'Oldsmobile', 'Intrigue' union all select
2002, 'Oldsmobile', 'Silhouette' union all select
2002, 'Saturn', 'L-Series' union all select
2002, 'Saturn', 'S-Series' union all select
2002, 'Saturn', 'VUE' union all select
2002, 'Toyota', '4Runner' union all select
2002, 'Toyota', 'Avalon' union all select
2002, 'Toyota', 'Camry' union all select
2002, 'Toyota', 'Celica' union all select
2002, 'Toyota', 'Corolla' union all select
2002, 'Toyota', 'Echo' union all select
2002, 'Toyota', 'Highlander' union all select
2002, 'Toyota', 'Land Cruiser' union all select
2002, 'Toyota', 'MR2' union all select
2002, 'Toyota', 'Prius' union all select
2002, 'Toyota', 'RAV4' union all select
2002, 'Toyota', 'Sequoia' union all select
2002, 'Toyota', 'Sienna' union all select
2002, 'Toyota', 'Solara' union all select
2002, 'Toyota', 'Tacoma' union all select
2002, 'Toyota', 'Tacoma Xtra' union all select
2002, 'Toyota', 'Tundra' union all select
2002, 'Volvo', 'C70' union all select
2002, 'Volvo', 'S40' union all select
2002, 'Volvo', 'S60' union all select
2002, 'Volvo', 'S80' union all select
2002, 'Volvo', 'V40' union all select
2002, 'Volvo', 'V70' union all select
2003, 'Mercury', 'Marauder' union all select
2003, 'Mercury', 'Mountaineer' union all select
2003, 'Mercury', 'Sable' union all select
2003, 'Mercury', 'Grand Marquis' union all select
2003, 'BMW', '3 Series' union all select
2003, 'BMW', '5 Series' union all select
2003, 'BMW', '7 Series' union all select
2003, 'BMW', '525' union all select
2003, 'BMW', '530' union all select
2003, 'BMW', '745' union all select
2003, 'BMW', '760' union all select
2003, 'BMW', 'Z4' union all select
2003, 'BMW', 'X5' union all select
2003, 'BMW', 'M3' union all select
2003, 'BMW', 'M5' union all select
2003, 'BMW', 'Z8' union all select
2003, 'Ford', 'Thunderbird' union all select
2003, 'Ford', 'Explorer Sport Trac' union all select
2003, 'Ford', 'Escape' union all select
2003, 'Ford', 'E-Series' union all select
2003, 'Ford', 'Windstar' union all select
2003, 'Ford', 'Taurus' union all select
2003, 'Ford', 'Expedition' union all select
2003, 'Ford', 'F-Series' union all select
2003, 'Ford', 'Escort ZX2' union all select
2003, 'Ford', 'Mustang' union all select
2003, 'Ford', 'Explorer' union all select
2003, 'Ford', 'Focus' union all select
2003, 'Ford', 'Crown Victoria' union all select
2003, 'Ford', 'Freestar' union all select
2003, 'Ford', 'Ranger' union all select
2003, 'Ford', 'E150' union all select
2003, 'Ford', 'E250' union all select
2003, 'Ford', 'E350' union all select
2003, 'Ford', 'Excursion' union all select
2003, 'Ford', 'Explorer Sport' union all select
2003, 'Ford', 'F150' union all select
2003, 'Ford', 'F250' union all select
2003, 'Ford', 'F350' union all select
2003, 'Ford', 'ZX2' union all select
2003, 'Suzuki', 'Grand Vitara' union all select
2003, 'Suzuki', 'Aerio' union all select
2003, 'Suzuki', 'Vitara' union all select
2003, 'Suzuki', 'XL-7' union all select
2003, 'Lexus', 'LX' union all select
2003, 'Lexus', 'ES' union all select
2003, 'Lexus', 'LS' union all select
2003, 'Lexus', 'IS' union all select
2003, 'Lexus', 'RX' union all select
2003, 'Lexus', 'GX' union all select
2003, 'Lexus', 'GS' union all select
2003, 'Lexus', 'SC' union all select
2003, 'Honda', 'Accord' union all select
2003, 'Honda', 'Civic' union all select
2003, 'Honda', 'Element' union all select
2003, 'Honda', 'Civic Si' union all select
2003, 'Honda', 'CR-V' union all select
2003, 'Honda', 'Pilot' union all select
2003, 'Honda', 'Civic GX' union all select
2003, 'Honda', 'Odyssey' union all select
2003, 'Honda', 'S2000' union all select
2003, 'Honda', 'Insight' union all select
2003, 'Mercedes-Benz', 'CLK-Class' union all select
2003, 'Mercedes-Benz', 'E-Class' union all select
2003, 'Mercedes-Benz', 'C-Class' union all select
2003, 'Mercedes-Benz', 'S-Class' union all select
2003, 'Mercedes-Benz', 'M-Class' union all select
2003, 'Mercedes-Benz', 'SL-Class' union all select
2003, 'Mercedes-Benz', 'CL-Class' union all select
2003, 'Mercedes-Benz', 'SLK-Class' union all select
2003, 'Mercedes-Benz', 'G-Class' union all select
2003, 'Porsche', '911' union all select
2003, 'Porsche', 'Cayenne' union all select
2003, 'Porsche', 'Boxster' union all select
2003, 'Mitsubishi', 'Pajero' union all select
2003, 'Mitsubishi', 'Outlander' union all select
2003, 'Mitsubishi', 'Galant' union all select
2003, 'Mitsubishi', 'Diamante' union all select
2003, 'Mitsubishi', 'Lancer' union all select
2003, 'Mitsubishi', 'Lancer Evolution' union all select
2003, 'Mitsubishi', 'Challenger' union all select
2003, 'Mitsubishi', 'Eclipse' union all select
2003, 'Mitsubishi', 'Montero' union all select
2003, 'Mitsubishi', 'Montero Sport' union all select
2003, 'Subaru', 'Legacy' union all select
2003, 'Subaru', 'Impreza' union all select
2003, 'Subaru', 'Forester' union all select
2003, 'Subaru', 'Outback' union all select
2003, 'Subaru', 'Baja' union all select
2003, 'Pontiac', 'Grand Am' union all select
2003, 'Pontiac', 'Aztek' union all select
2003, 'Pontiac', 'Sunfire' union all select
2003, 'Pontiac', 'Vibe' union all select
2003, 'Pontiac', 'Montana' union all select
2003, 'Pontiac', 'Bonneville' union all select
2003, 'Pontiac', 'Grand Prix' union all select
2003, 'Audi', 'A6' union all select
2003, 'Audi', 'A4' union all select
2003, 'Audi', 'S6' union all select
2003, 'Audi', 'TT' union all select
2003, 'Audi', 'RS6' union all select
2003, 'Audi', 'S8' union all select
2003, 'Audi', 'A8' union all select
2003, 'Audi', 'Allroad' union all select
2003, 'Audi', 'RS 6' union all select
2003, 'Mazda', 'B-Series' union all select
2003, 'Mazda', 'MPV' union all select
2003, 'Mazda', 'Tribute' union all select
2003, 'Mazda', 'Mazda6' union all select
2003, 'Mazda', 'MX-5' union all select
2003, 'Mazda', 'Protege' union all select
2003, 'Mazda', 'B-Series Plus' union all select
2003, 'Mazda', 'Miata MX-5' union all select
2003, 'Mazda', 'Protege5' union all select
2003, 'Volkswagen', 'Passat' union all select
2003, 'Volkswagen', 'Touareg' union all select
2003, 'Volkswagen', 'Jetta' union all select
2003, 'Volkswagen', 'Golf' union all select
2003, 'Volkswagen', 'New Beetle' union all select
2003, 'Volkswagen', 'Eurovan' union all select
2003, 'Volkswagen', 'GTI' union all select
2003, 'Kia', 'Sorento' union all select
2003, 'Kia', 'Optima' union all select
2003, 'Kia', 'Sedona' union all select
2003, 'Kia', 'Spectra' union all select
2003, 'Kia', 'Rio' union all select
2003, 'Maserati', 'Spyder' union all select
2003, 'Buick', 'LeSabre' union all select
2003, 'Buick', 'Regal' union all select
2003, 'Buick', 'Park Avenue' union all select
2003, 'Buick', 'Century' union all select
2003, 'Buick', 'Rendezvous' union all select
2003, 'Lamborghini', 'Gallardo' union all select
2003, 'Lamborghini', 'Murcielago' union all select
2003, 'Lincoln', 'Navigator' union all select
2003, 'Lincoln', 'Town Car' union all select
2003, 'Lincoln', 'Aviator' union all select
2003, 'Lincoln', 'Blackwood' union all select
2003, 'Lincoln', 'LS' union all select
2003, 'Maybach', '57' union all select
2003, 'Maybach', '62' union all select
2003, 'Land Rover', 'Discovery' union all select
2003, 'Land Rover', 'Freelander' union all select
2003, 'Land Rover', 'Range Rover' union all select
2003, 'MINI', 'Cooper' union all select
2003, 'Volvo', 'XC90' union all select
2003, 'Volvo', 'C70' union all select
2003, 'Volvo', 'S40' union all select
2003, 'Volvo', 'S60' union all select
2003, 'Volvo', 'S80' union all select
2003, 'Volvo', 'V40' union all select
2003, 'Volvo', 'V70' union all select
2003, 'Volvo', 'XC70' union all select
2003, 'Lotus', 'Esprit' union all select
2003, 'Chevrolet', 'Corvette' union all select
2003, 'Chevrolet', 'Silverado' union all select
2003, 'Chevrolet', 'Astro' union all select
2003, 'Chevrolet', 'Avalanche 1500' union all select
2003, 'Chevrolet', 'Avalanche 2500' union all select
2003, 'Chevrolet', 'Blazer' union all select
2003, 'Chevrolet', 'Cavalier' union all select
2003, 'Chevrolet', 'Express 1500' union all select
2003, 'Chevrolet', 'Express 2500' union all select
2003, 'Chevrolet', 'Express 3500' union all select
2003, 'Chevrolet', 'Impala' union all select
2003, 'Chevrolet', 'Malibu' union all select
2003, 'Chevrolet', 'Monte Carlo' union all select
2003, 'Chevrolet', 'S10' union all select
2003, 'Chevrolet', 'Silverado 1500' union all select
2003, 'Chevrolet', 'Silverado 2500' union all select
2003, 'Chevrolet', 'Silverado 3500' union all select
2003, 'Chevrolet', 'SSR' union all select
2003, 'Chevrolet', 'Suburban 1500' union all select
2003, 'Chevrolet', 'Suburban 2500' union all select
2003, 'Chevrolet', 'Tahoe' union all select
2003, 'Chevrolet', 'Tracker' union all select
2003, 'Chevrolet', 'TrailBlazer' union all select
2003, 'Chevrolet', 'Venture' union all select
2003, 'Dodge', 'Ram' union all select
2003, 'Dodge', 'Caravan' union all select
2003, 'Dodge', 'Dakota Club' union all select
2003, 'Dodge', 'Dakota' union all select
2003, 'Dodge', 'Durango' union all select
2003, 'Dodge', 'Grand Caravan' union all select
2003, 'Dodge', 'Intrepid' union all select
2003, 'Dodge', 'Neon' union all select
2003, 'Dodge', 'Ram 1500' union all select
2003, 'Dodge', 'Ram 2500' union all select
2003, 'Dodge', 'Ram 3500' union all select
2003, 'Dodge', 'Ram Van 1500' union all select
2003, 'Dodge', 'Ram Van 2500' union all select
2003, 'Dodge', 'Ram Van 3500' union all select
2003, 'Dodge', 'Stratus' union all select
2003, 'Dodge', 'Viper' union all select
2003, 'Infiniti', 'G35' union all select
2003, 'Infiniti', 'FX' union all select
2003, 'Infiniti', 'G' union all select
2003, 'Infiniti', 'I' union all select
2003, 'Infiniti', 'M' union all select
2003, 'Infiniti', 'Q' union all select
2003, 'Infiniti', 'QX' union all select
2003, 'Saab', '9-3' union all select
2003, 'Saab', '9-5' union all select
2003, 'Nissan', '350Z' union all select
2003, 'Nissan', 'Altima' union all select
2003, 'Nissan', 'Frontier' union all select
2003, 'Nissan', 'Maxima' union all select
2003, 'Nissan', 'Murano' union all select
2003, 'Nissan', 'Pathfinder' union all select
2003, 'Nissan', 'Sentra' union all select
2003, 'Nissan', 'Xterra' union all select
2003, 'Acura', 'RSX' union all select
2003, 'Acura', 'CL' union all select
2003, 'Acura', 'MDX' union all select
2003, 'Acura', 'NSX' union all select
2003, 'Acura', 'RL' union all select
2003, 'Acura', 'TL' union all select
2003, 'Cadillac', 'CTS' union all select
2003, 'Cadillac', 'DeVille' union all select
2003, 'Cadillac', 'Escalade' union all select
2003, 'Cadillac', 'Escalade ESV' union all select
2003, 'Cadillac', 'Escalade EXT' union all select
2003, 'Cadillac', 'Seville' union all select
2003, 'Chrysler', '300M' union all select
2003, 'Chrysler', 'Concorde' union all select
2003, 'Chrysler', 'PT Cruiser' union all select
2003, 'Chrysler', 'Sebring' union all select
2003, 'Chrysler', 'Town & Country' union all select
2003, 'Chrysler', 'Voyager' union all select
2003, 'GMC', 'Envoy' union all select
2003, 'GMC', 'Envoy XL' union all select
2003, 'GMC', 'Safari' union all select
2003, 'GMC', 'Savana 1500' union all select
2003, 'GMC', 'Savana 2500' union all select
2003, 'GMC', 'Savana 3500' union all select
2003, 'GMC', 'Sierra 1500' union all select
2003, 'GMC', 'Sierra 2500' union all select
2003, 'GMC', 'Sierra 3500' union all select
2003, 'GMC', 'Sonoma' union all select
2003, 'GMC', 'Yukon' union all select
2003, 'GMC', 'Yukon XL 1500' union all select
2003, 'GMC', 'Yukon XL 2500' union all select
2003, 'HUMMER', 'H1' union all select
2003, 'HUMMER', 'H2' union all select
2003, 'Hyundai', 'Accent' union all select
2003, 'Hyundai', 'Elantra' union all select
2003, 'Hyundai', 'Santa Fe' union all select
2003, 'Hyundai', 'Sonata' union all select
2003, 'Hyundai', 'Tiburon' union all select
2003, 'Hyundai', 'XG350' union all select
2003, 'Isuzu', 'Ascender' union all select
2003, 'Isuzu', 'Axiom' union all select
2003, 'Isuzu', 'Rodeo' union all select
2003, 'Isuzu', 'Rodeo Sport' union all select
2003, 'Jaguar', 'S-Type' union all select
2003, 'Jaguar', 'XJ Series' union all select
2003, 'Jaguar', 'XK Series' union all select
2003, 'Jaguar', 'X-Type' union all select
2003, 'Jeep', 'Grand Cherokee' union all select
2003, 'Jeep', 'Liberty' union all select
2003, 'Jeep', 'Wrangler' union all select
2003, 'Oldsmobile', 'Alero' union all select
2003, 'Oldsmobile', 'Aurora' union all select
2003, 'Oldsmobile', 'Bravada' union all select
2003, 'Oldsmobile', 'Silhouette' union all select
2003, 'Saturn', 'Ion' union all select
2003, 'Saturn', 'L-Series' union all select
2003, 'Saturn', 'VUE' union all select
2003, 'Toyota', '4Runner' union all select
2003, 'Toyota', 'Avalon' union all select
2003, 'Toyota', 'Camry' union all select
2003, 'Toyota', 'Celica' union all select
2003, 'Toyota', 'Corolla' union all select
2003, 'Toyota', 'Echo' union all select
2003, 'Toyota', 'Highlander' union all select
2003, 'Toyota', 'Land Cruiser' union all select
2003, 'Toyota', 'Matrix' union all select
2003, 'Toyota', 'MR2' union all select
2003, 'Toyota', 'Prius' union all select
2003, 'Toyota', 'RAV4' union all select
2003, 'Toyota', 'Sequoia' union all select
2003, 'Toyota', 'Sienna' union all select
2003, 'Toyota', 'Solara' union all select
2003, 'Toyota', 'Tacoma' union all select
2003, 'Toyota', 'Tacoma Xtra' union all select
2003, 'Toyota', 'Tundra' union all select
2004, 'Mitsubishi', 'Outlander' union all select
2004, 'Mitsubishi', 'Lancer Evolution' union all select
2004, 'Mitsubishi', 'Pajero' union all select
2004, 'Mitsubishi', 'Diamante' union all select
2004, 'Mitsubishi', 'Challenger' union all select
2004, 'Mitsubishi', 'Lancer' union all select
2004, 'Mitsubishi', 'Eclipse' union all select
2004, 'Mitsubishi', 'Galant' union all select
2004, 'Mitsubishi', 'Endeavor' union all select
2004, 'Mitsubishi', 'Montero' union all select
2004, 'Mitsubishi', 'Montero Sport' union all select
2004, 'Lotus', 'Exige' union all select
2004, 'Lotus', 'Elise' union all select
2004, 'Lotus', 'Esprit' union all select
2004, 'Ford', 'F-Series' union all select
2004, 'Ford', 'Escort' union all select
2004, 'Ford', 'Escape' union all select
2004, 'Ford', 'Freestar' union all select
2004, 'Ford', 'Thunderbird' union all select
2004, 'Ford', 'Explorer' union all select
2004, 'Ford', 'Ranger' union all select
2004, 'Ford', 'E-Series' union all select
2004, 'Ford', 'Explorer Sport Trac' union all select
2004, 'Ford', 'Taurus' union all select
2004, 'Ford', 'Windstar' union all select
2004, 'Ford', 'Expedition' union all select
2004, 'Ford', 'Mustang' union all select
2004, 'Ford', 'Focus' union all select
2004, 'Ford', 'Crown Victoria' union all select
2004, 'Ford', 'E150' union all select
2004, 'Ford', 'E250' union all select
2004, 'Ford', 'E350' union all select
2004, 'Ford', 'Excursion' union all select
2004, 'Ford', 'F150' union all select
2004, 'Ford', 'F250' union all select
2004, 'Ford', 'F350' union all select
2004, 'Porsche', '911' union all select
2004, 'Porsche', 'Cayenne' union all select
2004, 'Porsche', 'Boxster' union all select
2004, 'Porsche', 'Carrera GT' union all select
2004, 'Audi', 'A4' union all select
2004, 'Audi', 'A8' union all select
2004, 'Audi', 'S4' union all select
2004, 'Audi', 'Allroad' union all select
2004, 'Audi', 'TT' union all select
2004, 'Audi', 'A6' union all select
2004, 'Lexus', 'ES' union all select
2004, 'Lexus', 'SC' union all select
2004, 'Lexus', 'GX' union all select
2004, 'Lexus', 'RX' union all select
2004, 'Lexus', 'LX' union all select
2004, 'Lexus', 'LS' union all select
2004, 'Lexus', 'GS' union all select
2004, 'Lexus', 'IS' union all select
2004, 'Mazda', 'B-Series' union all select
2004, 'Mazda', 'Mazda6' union all select
2004, 'Mazda', 'Tribute' union all select
2004, 'Mazda', 'Mazda3' union all select
2004, 'Mazda', 'RX-8' union all select
2004, 'Mazda', 'MX-5' union all select
2004, 'Mazda', 'MPV' union all select
2004, 'Mazda', 'B-Series Plus' union all select
2004, 'Mazda', 'Miata MX-5' union all select
2004, 'Mercedes-Benz', 'C-Class' union all select
2004, 'Mercedes-Benz', 'E-Class' union all select
2004, 'Mercedes-Benz', 'SLK-Class' union all select
2004, 'Mercedes-Benz', 'CLK-Class' union all select
2004, 'Mercedes-Benz', 'S-Class' union all select
2004, 'Mercedes-Benz', 'G-Class' union all select
2004, 'Mercedes-Benz', 'CL-Class' union all select
2004, 'Mercedes-Benz', 'SL-Class' union all select
2004, 'Mercedes-Benz', 'M-Class' union all select
2004, 'Kia', 'Sorento' union all select
2004, 'Kia', 'Optima' union all select
2004, 'Kia', 'Sedona' union all select
2004, 'Kia', 'Amanti' union all select
2004, 'Kia', 'Rio' union all select
2004, 'Kia', 'Spectra' union all select
2004, 'MINI', 'Cooper' union all select
2004, 'BMW', '3 Series' union all select
2004, 'BMW', '5 Series' union all select
2004, 'BMW', '6 Series' union all select
2004, 'BMW', '7 Series' union all select
2004, 'BMW', '325' union all select
2004, 'BMW', '525' union all select
2004, 'BMW', '530' union all select
2004, 'BMW', '545' union all select
2004, 'BMW', '645' union all select
2004, 'BMW', '745' union all select
2004, 'BMW', '760' union all select
2004, 'BMW', 'X3' union all select
2004, 'BMW', 'X5' union all select
2004, 'BMW', 'Z4' union all select
2004, 'BMW', 'M3' union all select
2004, 'Buick', 'Park Avenue' union all select
2004, 'Buick', 'Rainier' union all select
2004, 'Buick', 'Century' union all select
2004, 'Buick', 'Rendezvous' union all select
2004, 'Buick', 'Regal' union all select
2004, 'Buick', 'LeSabre' union all select
2004, 'Holden', 'Monaro' union all select
2004, 'Mercury', 'Mountaineer' union all select
2004, 'Mercury', 'Marauder' union all select
2004, 'Mercury', 'Grand Marquis' union all select
2004, 'Mercury', 'Sable' union all select
2004, 'Mercury', 'Monterey' union all select
2004, 'Maserati', 'Spyder' union all select
2004, 'Spyker', 'C8 Spyder' union all select
2004, 'Spyker', 'C8 Spyder Wide Body' union all select
2004, 'Spyker', 'C8 Laviolette' union all select
2004, 'Pontiac', 'Sunfire' union all select
2004, 'Pontiac', 'Vibe' union all select
2004, 'Pontiac', 'Grand Am' union all select
2004, 'Pontiac', 'Montana' union all select
2004, 'Pontiac', 'GTO' union all select
2004, 'Pontiac', 'Bonneville' union all select
2004, 'Pontiac', 'Aztek' union all select
2004, 'Pontiac', 'Grand Prix' union all select
2004, 'Suzuki', 'Daewoo Lacetti' union all select
2004, 'Suzuki', 'Vitara' union all select
2004, 'Suzuki', 'Daewoo Magnus' union all select
2004, 'Suzuki', 'Grand Vitara' union all select
2004, 'Suzuki', 'Aerio' union all select
2004, 'Suzuki', 'Swift' union all select
2004, 'Suzuki', 'Forenza' union all select
2004, 'Suzuki', 'Verona' union all select
2004, 'Suzuki', 'XL-7' union all select
2004, 'Honda', 'Element' union all select
2004, 'Honda', 'Accord' union all select
2004, 'Honda', 'Civic' union all select
2004, 'Honda', 'CR-V' union all select
2004, 'Honda', 'S2000' union all select
2004, 'Honda', 'Pilot' union all select
2004, 'Honda', 'Insight' union all select
2004, 'Honda', 'Odyssey' union all select
2004, 'Subaru', 'Baja' union all select
2004, 'Subaru', 'Forester' union all select
2004, 'Subaru', 'Outback' union all select
2004, 'Subaru', 'Legacy' union all select
2004, 'Subaru', 'Impreza' union all select
2004, 'Infiniti', 'G35' union all select
2004, 'Infiniti', 'FX' union all select
2004, 'Infiniti', 'G' union all select
2004, 'Infiniti', 'I' union all select
2004, 'Infiniti', 'M' union all select
2004, 'Infiniti', 'Q' union all select
2004, 'Infiniti', 'QX' union all select
2004, 'Lincoln', 'Aviator' union all select
2004, 'Lincoln', 'Navigator' union all select
2004, 'Lincoln', 'Town Car' union all select
2004, 'Lincoln', 'LS' union all select
2004, 'Volkswagen', 'GTI' union all select
2004, 'Volkswagen', 'R32' union all select
2004, 'Volkswagen', 'Golf' union all select
2004, 'Volkswagen', 'New Beetle' union all select
2004, 'Volkswagen', 'Touareg' union all select
2004, 'Volkswagen', 'Passat' union all select
2004, 'Volkswagen', 'Jetta' union all select
2004, 'Volkswagen', 'Phaeton' union all select
2004, 'Chevrolet', 'Corvette' union all select
2004, 'Chevrolet', 'Monte Carlo' union all select
2004, 'Chevrolet', 'Astro' union all select
2004, 'Chevrolet', 'Avalanche 1500' union all select
2004, 'Chevrolet', 'Avalanche 2500' union all select
2004, 'Chevrolet', 'Aveo' union all select
2004, 'Chevrolet', 'Blazer' union all select
2004, 'Chevrolet', 'Cavalier' union all select
2004, 'Chevrolet', 'Classic' union all select
2004, 'Chevrolet', 'Colorado' union all select
2004, 'Chevrolet', 'Express 1500' union all select
2004, 'Chevrolet', 'Express 2500' union all select
2004, 'Chevrolet', 'Express 3500' union all select
2004, 'Chevrolet', 'Impala' union all select
2004, 'Chevrolet', 'Malibu' union all select
2004, 'Chevrolet', 'S10' union all select
2004, 'Chevrolet', 'Silverado 1500' union all select
2004, 'Chevrolet', 'Silverado 2500' union all select
2004, 'Chevrolet', 'Silverado 3500' union all select
2004, 'Chevrolet', 'SSR' union all select
2004, 'Chevrolet', 'Suburban 1500' union all select
2004, 'Chevrolet', 'Suburban 2500' union all select
2004, 'Chevrolet', 'Tahoe' union all select
2004, 'Chevrolet', 'Tracker' union all select
2004, 'Chevrolet', 'TrailBlazer' union all select
2004, 'Chevrolet', 'Venture' union all select
2004, 'Scion', 'xA' union all select
2004, 'Scion', 'xB' union all select
2004, 'Toyota', 'Sienna' union all select
2004, 'Toyota', 'Prius' union all select
2004, 'Toyota', '4Runner' union all select
2004, 'Toyota', 'Avalon' union all select
2004, 'Toyota', 'Camry' union all select
2004, 'Toyota', 'Celica' union all select
2004, 'Toyota', 'Corolla' union all select
2004, 'Toyota', 'Echo' union all select
2004, 'Toyota', 'Highlander' union all select
2004, 'Toyota', 'Land Cruiser' union all select
2004, 'Toyota', 'Matrix' union all select
2004, 'Toyota', 'MR2' union all select
2004, 'Toyota', 'RAV4' union all select
2004, 'Toyota', 'Sequoia' union all select
2004, 'Toyota', 'Solara' union all select
2004, 'Toyota', 'Tacoma' union all select
2004, 'Toyota', 'Tacoma Xtra' union all select
2004, 'Toyota', 'Tundra' union all select
2004, 'Cadillac', 'SRX' union all select
2004, 'Cadillac', 'CTS' union all select
2004, 'Cadillac', 'DeVille' union all select
2004, 'Cadillac', 'Escalade' union all select
2004, 'Cadillac', 'Escalade ESV' union all select
2004, 'Cadillac', 'Escalade EXT' union all select
2004, 'Cadillac', 'Seville' union all select
2004, 'Cadillac', 'XLR' union all select
2004, 'Lamborghini', 'Gallardo' union all select
2004, 'Lamborghini', 'Murcielago' union all select
2004, 'Land Rover', 'Range Rover' union all select
2004, 'Land Rover', 'Freelander' union all select
2004, 'Land Rover', 'Discovery' union all select
2004, 'Saab', '9-3' union all select
2004, 'Saab', '9-5' union all select
2004, 'Nissan', 'Titan' union all select
2004, 'Nissan', '350Z' union all select
2004, 'Nissan', 'Altima' union all select
2004, 'Nissan', 'Frontier' union all select
2004, 'Nissan', 'Maxima' union all select
2004, 'Nissan', 'Murano' union all select
2004, 'Nissan', 'Pathfinder' union all select
2004, 'Nissan', 'Pathfinder Armada' union all select
2004, 'Nissan', 'Quest' union all select
2004, 'Nissan', 'Sentra' union all select
2004, 'Nissan', 'Xterra' union all select
2004, 'Maybach', '57' union all select
2004, 'Maybach', '62' union all select
2004, 'Acura', 'TSX' union all select
2004, 'Acura', 'MDX' union all select
2004, 'Acura', 'NSX' union all select
2004, 'Acura', 'RL' union all select
2004, 'Acura', 'RSX' union all select
2004, 'Acura', 'TL' union all select
2004, 'Corbin', 'Sparrow' union all select
2004, 'Chrysler', '300M' union all select
2004, 'Chrysler', 'Concorde' union all select
2004, 'Chrysler', 'Crossfire' union all select
2004, 'Chrysler', 'Pacifica' union all select
2004, 'Chrysler', 'PT Cruiser' union all select
2004, 'Chrysler', 'Sebring' union all select
2004, 'Chrysler', 'Town & Country' union all select
2004, 'Dodge', 'Caravan' union all select
2004, 'Dodge', 'Dakota Club' union all select
2004, 'Dodge', 'Dakota' union all select
2004, 'Dodge', 'Durango' union all select
2004, 'Dodge', 'Grand Caravan' union all select
2004, 'Dodge', 'Intrepid' union all select
2004, 'Dodge', 'Neon' union all select
2004, 'Dodge', 'Ram 1500' union all select
2004, 'Dodge', 'Ram 2500' union all select
2004, 'Dodge', 'Ram 3500' union all select
2004, 'Dodge', 'Stratus' union all select
2004, 'Dodge', 'Viper' union all select
2004, 'GMC', 'Canyon' union all select
2004, 'GMC', 'Envoy' union all select
2004, 'GMC', 'Envoy XL' union all select
2004, 'GMC', 'Envoy XUV' union all select
2004, 'GMC', 'Safari' union all select
2004, 'GMC', 'Savana 1500' union all select
2004, 'GMC', 'Savana 2500' union all select
2004, 'GMC', 'Savana 3500' union all select
2004, 'GMC', 'Sierra 1500' union all select
2004, 'GMC', 'Sierra 2500' union all select
2004, 'GMC', 'Sierra 3500' union all select
2004, 'GMC', 'Sonoma' union all select
2004, 'GMC', 'Yukon' union all select
2004, 'GMC', 'Yukon XL 1500' union all select
2004, 'GMC', 'Yukon XL 2500' union all select
2004, 'HUMMER', 'H1' union all select
2004, 'HUMMER', 'H2' union all select
2004, 'Hyundai', 'Accent' union all select
2004, 'Hyundai', 'Elantra' union all select
2004, 'Hyundai', 'Santa Fe' union all select
2004, 'Hyundai', 'Sonata' union all select
2004, 'Hyundai', 'Tiburon' union all select
2004, 'Hyundai', 'XG350' union all select
2004, 'Isuzu', 'Ascender' union all select
2004, 'Isuzu', 'Axiom' union all select
2004, 'Isuzu', 'Rodeo' union all select
2004, 'Jaguar', 'S-Type' union all select
2004, 'Jaguar', 'XJ Series' union all select
2004, 'Jaguar', 'XK Series' union all select
2004, 'Jaguar', 'X-Type' union all select
2004, 'Jeep', 'Grand Cherokee' union all select
2004, 'Jeep', 'Liberty' union all select
2004, 'Jeep', 'Wrangler' union all select
2004, 'Oldsmobile', 'Alero' union all select
2004, 'Oldsmobile', 'Bravada' union all select
2004, 'Oldsmobile', 'Silhouette' union all select
2004, 'Saturn', 'Ion' union all select
2004, 'Saturn', 'L-Series' union all select
2004, 'Saturn', 'VUE' union all select
2004, 'Volvo', 'C70' union all select
2004, 'Volvo', 'S40' union all select
2004, 'Volvo', 'S60' union all select
2004, 'Volvo', 'S80' union all select
2004, 'Volvo', 'V40' union all select
2004, 'Volvo', 'V70' union all select
2004, 'Volvo', 'XC70' union all select
2004, 'Volvo', 'XC90' union all select
2005, 'Scion', 'xB' union all select
2005, 'Scion', 'tC' union all select
2005, 'Scion', 'xA' union all select
2005, 'Volkswagen', 'Phaeton' union all select
2005, 'Volkswagen', 'Passat' union all select
2005, 'Volkswagen', 'Touareg' union all select
2005, 'Volkswagen', 'GTI' union all select
2005, 'Volkswagen', 'Jetta' union all select
2005, 'Volkswagen', 'New Beetle' union all select
2005, 'Volkswagen', 'Golf' union all select
2005, 'Acura', 'TSX' union all select
2005, 'Acura', 'RL' union all select
2005, 'Acura', 'MDX' union all select
2005, 'Acura', 'NSX' union all select
2005, 'Acura', 'RSX' union all select
2005, 'Acura', 'TL' union all select
2005, 'Pontiac', 'Aztek' union all select
2005, 'Pontiac', 'Grand Am' union all select
2005, 'Pontiac', 'Montana' union all select
2005, 'Pontiac', 'Vibe' union all select
2005, 'Pontiac', 'Sunfire' union all select
2005, 'Pontiac', 'G6' union all select
2005, 'Pontiac', 'Bonneville' union all select
2005, 'Pontiac', 'Daewoo Kalos' union all select
2005, 'Pontiac', 'Monterey' union all select
2005, 'Pontiac', 'GTO' union all select
2005, 'Pontiac', 'Grand Prix' union all select
2005, 'Pontiac', 'Montana SV6' union all select
2005, 'Ford', 'GT' union all select
2005, 'Ford', 'F-Series' union all select
2005, 'Ford', 'E-Series' union all select
2005, 'Ford', 'Thunderbird' union all select
2005, 'Ford', 'Escape' union all select
2005, 'Ford', 'Focus' union all select
2005, 'Ford', 'Freestar' union all select
2005, 'Ford', 'Crown Victoria' union all select
2005, 'Ford', 'Freestyle' union all select
2005, 'Ford', 'Ranger' union all select
2005, 'Ford', 'Taurus' union all select
2005, 'Ford', 'Explorer' union all select
2005, 'Ford', 'Five Hundred' union all select
2005, 'Ford', 'Explorer Sport Trac' union all select
2005, 'Ford', 'Mustang' union all select
2005, 'Ford', 'Expedition' union all select
2005, 'Ford', 'E150' union all select
2005, 'Ford', 'E250' union all select
2005, 'Ford', 'E350' union all select
2005, 'Ford', 'Excursion' union all select
2005, 'Ford', 'F150' union all select
2005, 'Ford', 'F250' union all select
2005, 'Ford', 'F350' union all select
2005, 'Buick', 'LaCrosse' union all select
2005, 'Buick', 'Terraza' union all select
2005, 'Buick', 'Rainier' union all select
2005, 'Buick', 'Park Avenue' union all select
2005, 'Buick', 'Rendezvous' union all select
2005, 'Buick', 'LeSabre' union all select
2005, 'Buick', 'Century' union all select
2005, 'Porsche', '911' union all select
2005, 'Porsche', 'Cayenne' union all select
2005, 'Porsche', 'Boxster' union all select
2005, 'Porsche', 'Carrera GT' union all select
2005, 'Suzuki', 'Aerio' union all select
2005, 'Suzuki', 'Grand Vitara' union all select
2005, 'Suzuki', 'Daewoo Magnus' union all select
2005, 'Suzuki', 'Swift' union all select
2005, 'Suzuki', 'Daewoo Lacetti' union all select
2005, 'Suzuki', 'Reno' union all select
2005, 'Suzuki', 'Forenza' union all select
2005, 'Suzuki', 'Verona' union all select
2005, 'Suzuki', 'XL-7' union all select
2005, 'Mercedes-Benz', 'CLK-Class' union all select
2005, 'Mercedes-Benz', 'E-Class' union all select
2005, 'Mercedes-Benz', 'CL-Class' union all select
2005, 'Mercedes-Benz', 'C-Class' union all select
2005, 'Mercedes-Benz', 'SLK-Class' union all select
2005, 'Mercedes-Benz', 'M-Class' union all select
2005, 'Mercedes-Benz', 'S-Class' union all select
2005, 'Mercedes-Benz', 'SLR McLaren' union all select
2005, 'Mercedes-Benz', 'G-Class' union all select
2005, 'Mercedes-Benz', 'SL-Class' union all select
2005, 'BMW', '3 Series' union all select
2005, 'BMW', '5 Series' union all select
2005, 'BMW', '6 Series' union all select
2005, 'BMW', '7 Series' union all select
2005, 'BMW', '325' union all select
2005, 'BMW', '330' union all select
2005, 'BMW', '525' union all select
2005, 'BMW', '530' union all select
2005, 'BMW', '545' union all select
2005, 'BMW', '645' union all select
2005, 'BMW', '745' union all select
2005, 'BMW', '760' union all select
2005, 'BMW', 'Z4' union all select
2005, 'BMW', 'M3' union all select
2005, 'BMW', 'X3' union all select
2005, 'BMW', 'X5' union all select
2005, 'Mitsubishi', 'Endeavor' union all select
2005, 'Mitsubishi', 'Diamante' union all select
2005, 'Mitsubishi', 'Lancer' union all select
2005, 'Mitsubishi', 'Pajero' union all select
2005, 'Mitsubishi', 'Outlander' union all select
2005, 'Mitsubishi', 'Lancer Evolution' union all select
2005, 'Mitsubishi', 'Eclipse' union all select
2005, 'Mitsubishi', 'Galant' union all select
2005, 'Mitsubishi', 'Montero' union all select
2005, 'Honda', 'Civic' union all select
2005, 'Honda', 'Accord' union all select
2005, 'Honda', 'S2000' union all select
2005, 'Honda', 'CR-V' union all select
2005, 'Honda', 'Insight' union all select
2005, 'Honda', 'Element' union all select
2005, 'Honda', 'Pilot' union all select
2005, 'Honda', 'Odyssey' union all select
2005, 'Honda', 'Civic Si' union all select
2005, 'Audi', 'TT' union all select
2005, 'Audi', 'A4' union all select
2005, 'Audi', 'S4' union all select
2005, 'Audi', 'A8' union all select
2005, 'Audi', 'Allroad' union all select
2005, 'Audi', 'A6' union all select
2005, 'Mazda', 'MX-5' union all select
2005, 'Mazda', 'Mazda3' union all select
2005, 'Mazda', 'B-Series' union all select
2005, 'Mazda', 'Mazda6' union all select
2005, 'Mazda', 'Tribute' union all select
2005, 'Mazda', 'RX-8' union all select
2005, 'Mazda', 'MPV' union all select
2005, 'Mazda', 'Miata MX-5' union all select
2005, 'Cadillac', 'SRX' union all select
2005, 'Cadillac', 'CTS' union all select
2005, 'Cadillac', 'DeVille' union all select
2005, 'Cadillac', 'Escalade' union all select
2005, 'Cadillac', 'Escalade ESV' union all select
2005, 'Cadillac', 'Escalade EXT' union all select
2005, 'Cadillac', 'STS' union all select
2005, 'Cadillac', 'XLR' union all select
2005, 'Maserati', 'Spyder' union all select
2005, 'Maserati', 'Gran Sport' union all select
2005, 'Maserati', 'Quattroporte' union all select
2005, 'Maserati', 'Coupe' union all select
2005, 'Maserati', 'GranSport' union all select
2005, 'Lexus', 'RX' union all select
2005, 'Lexus', 'GS' union all select
2005, 'Lexus', 'IS' union all select
2005, 'Lexus', 'LX' union all select
2005, 'Lexus', 'GX' union all select
2005, 'Lexus', 'LS' union all select
2005, 'Lexus', 'ES' union all select
2005, 'Lexus', 'SC' union all select
2005, 'Chrysler', '300' union all select
2005, 'Chrysler', '300C' union all select
2005, 'Chrysler', 'Crossfire' union all select
2005, 'Chrysler', 'Pacifica' union all select
2005, 'Chrysler', 'PT Cruiser' union all select
2005, 'Chrysler', 'Sebring' union all select
2005, 'Chrysler', 'Town & Country' union all select
2005, 'Mercury', 'Sable' union all select
2005, 'Mercury', 'Mountaineer' union all select
2005, 'Mercury', 'Montego' union all select
2005, 'Mercury', 'Grand Marquis' union all select
2005, 'Mercury', 'Mariner' union all select
2005, 'Mercury', 'Monterey' union all select
2005, 'Lincoln', 'Aviator' union all select
2005, 'Lincoln', 'Town Car' union all select
2005, 'Lincoln', 'Navigator' union all select
2005, 'Lincoln', 'LS' union all select
2005, 'Chevrolet', 'Corvette' union all select
2005, 'Chevrolet', 'Monte Carlo' union all select
2005, 'Chevrolet', 'Astro' union all select
2005, 'Chevrolet', 'Avalanche 1500' union all select
2005, 'Chevrolet', 'Avalanche 2500' union all select
2005, 'Chevrolet', 'Aveo' union all select
2005, 'Chevrolet', 'Blazer' union all select
2005, 'Chevrolet', 'Cavalier' union all select
2005, 'Chevrolet', 'Classic' union all select
2005, 'Chevrolet', 'Cobalt' union all select
2005, 'Chevrolet', 'Colorado' union all select
2005, 'Chevrolet', 'Equinox' union all select
2005, 'Chevrolet', 'Express 1500' union all select
2005, 'Chevrolet', 'Express 2500' union all select
2005, 'Chevrolet', 'Express 3500' union all select
2005, 'Chevrolet', 'Impala' union all select
2005, 'Chevrolet', 'Malibu' union all select
2005, 'Chevrolet', 'Silverado 1500' union all select
2005, 'Chevrolet', 'Silverado 2500' union all select
2005, 'Chevrolet', 'Silverado 3500' union all select
2005, 'Chevrolet', 'SSR' union all select
2005, 'Chevrolet', 'Suburban 1500' union all select
2005, 'Chevrolet', 'Suburban 2500' union all select
2005, 'Chevrolet', 'Tahoe' union all select
2005, 'Chevrolet', 'TrailBlazer' union all select
2005, 'Chevrolet', 'Uplander' union all select
2005, 'Chevrolet', 'Venture' union all select
2005, 'Subaru', 'Outback' union all select
2005, 'Subaru', 'Baja' union all select
2005, 'Subaru', 'Legacy' union all select
2005, 'Subaru', 'Impreza' union all select
2005, 'Subaru', 'Forester' union all select
2005, 'Land Rover', 'Discovery' union all select
2005, 'Land Rover', 'Freelander' union all select
2005, 'Land Rover', 'Range Rover' union all select
2005, 'Land Rover', 'LR3' union all select
2005, 'Spyker Cars', 'C8' union all select
2005, 'Kia', 'Sedona' union all select
2005, 'Kia', 'Spectra' union all select
2005, 'Kia', 'Sportage' union all select
2005, 'Kia', 'Amanti' union all select
2005, 'Kia', 'Optima' union all select
2005, 'Kia', 'Sorento' union all select
2005, 'Kia', 'Rio' union all select
2005, 'Lamborghini', 'Murcielago' union all select
2005, 'Lamborghini', 'Gallardo' union all select
2005, 'Maybach', '57' union all select
2005, 'Maybach', '62' union all select
2005, 'Maybach', '57S' union all select
2005, 'MINI', 'Cooper' union all select
2005, 'Saab', '9-7X' union all select
2005, 'Saab', '9-5' union all select
2005, 'Saab', '9-3' union all select
2005, 'Saab', '9-2X' union all select
2005, 'Dodge', 'Magnum' union all select
2005, 'Dodge', 'Caravan' union all select
2005, 'Dodge', 'Dakota Club' union all select
2005, 'Dodge', 'Dakota' union all select
2005, 'Dodge', 'Durango' union all select
2005, 'Dodge', 'Grand Caravan' union all select
2005, 'Dodge', 'Neon' union all select
2005, 'Dodge', 'Ram 1500' union all select
2005, 'Dodge', 'Ram 2500' union all select
2005, 'Dodge', 'Ram 3500' union all select
2005, 'Dodge', 'Stratus' union all select
2005, 'Dodge', 'Viper' union all select
2005, 'Toyota', 'Tacoma' union all select
2005, 'Toyota', '4Runner' union all select
2005, 'Toyota', 'Avalon' union all select
2005, 'Toyota', 'Camry' union all select
2005, 'Toyota', 'Celica' union all select
2005, 'Toyota', 'Corolla' union all select
2005, 'Toyota', 'Echo' union all select
2005, 'Toyota', 'Highlander' union all select
2005, 'Toyota', 'Land Cruiser' union all select
2005, 'Toyota', 'Matrix' union all select
2005, 'Toyota', 'MR2' union all select
2005, 'Toyota', 'Prius' union all select
2005, 'Toyota', 'RAV4' union all select
2005, 'Toyota', 'Sequoia' union all select
2005, 'Toyota', 'Sienna' union all select
2005, 'Toyota', 'Solara' union all select
2005, 'Toyota', 'Tundra' union all select
2005, 'Aston Martin', 'DB9' union all select
2005, 'Aston Martin', 'Vanquish S' union all select
2005, 'Bentley', 'Arnage' union all select
2005, 'Bentley', 'Continental' union all select
2005, 'GMC', 'Canyon' union all select
2005, 'GMC', 'Envoy' union all select
2005, 'GMC', 'Envoy XL' union all select
2005, 'GMC', 'Envoy XUV' union all select
2005, 'GMC', 'Safari' union all select
2005, 'GMC', 'Savana 1500' union all select
2005, 'GMC', 'Savana 2500' union all select
2005, 'GMC', 'Savana 3500' union all select
2005, 'GMC', 'Sierra 1500' union all select
2005, 'GMC', 'Sierra 2500' union all select
2005, 'GMC', 'Sierra 3500' union all select
2005, 'GMC', 'Yukon' union all select
2005, 'GMC', 'Yukon XL 1500' union all select
2005, 'GMC', 'Yukon XL 2500' union all select
2005, 'HUMMER', 'H2' union all select
2005, 'Hyundai', 'Accent' union all select
2005, 'Hyundai', 'Elantra' union all select
2005, 'Hyundai', 'Santa Fe' union all select
2005, 'Hyundai', 'Sonata' union all select
2005, 'Hyundai', 'Tiburon' union all select
2005, 'Hyundai', 'Tucson' union all select
2005, 'Hyundai', 'XG350' union all select
2005, 'Infiniti', 'FX' union all select
2005, 'Infiniti', 'G' union all select
2005, 'Infiniti', 'Q' union all select
2005, 'Infiniti', 'QX' union all select
2005, 'Isuzu', 'Ascender' union all select
2005, 'Jaguar', 'S-Type' union all select
2005, 'Jaguar', 'XJ Series' union all select
2005, 'Jaguar', 'XK Series' union all select
2005, 'Jaguar', 'X-Type' union all select
2005, 'Jeep', 'Grand Cherokee' union all select
2005, 'Jeep', 'Liberty' union all select
2005, 'Jeep', 'Wrangler' union all select
2005, 'Lotus', 'Elise' union all select
2005, 'Lotus', 'Exige' union all select
2005, 'Nissan', '350Z' union all select
2005, 'Nissan', 'Altima' union all select
2005, 'Nissan', 'Armada' union all select
2005, 'Nissan', 'Frontier' union all select
2005, 'Nissan', 'Maxima' union all select
2005, 'Nissan', 'Murano' union all select
2005, 'Nissan', 'Pathfinder' union all select
2005, 'Nissan', 'Quest' union all select
2005, 'Nissan', 'Sentra' union all select
2005, 'Nissan', 'Titan' union all select
2005, 'Nissan', 'Xterra' union all select
2005, 'Panoz', 'Esperante' union all select
2005, 'Rolls-Royce', 'Phantom' union all select
2005, 'Saturn', 'Ion' union all select
2005, 'Saturn', 'L-Series' union all select
2005, 'Saturn', 'Relay' union all select
2005, 'Saturn', 'VUE' union all select
2005, 'Volvo', 'S40' union all select
2005, 'Volvo', 'S60' union all select
2005, 'Volvo', 'S80' union all select
2005, 'Volvo', 'V50' union all select
2005, 'Volvo', 'V70' union all select
2005, 'Volvo', 'XC70' union all select
2005, 'Volvo', 'XC90' union all select
2006, 'GMC', 'Sierra Denali' union all select
2006, 'GMC', 'Yukon Denali' union all select
2006, 'GMC', 'Sierra 3500HD' union all select
2006, 'GMC', 'Sierra 1500' union all select
2006, 'GMC', 'Sierra 2500HD' union all select
2006, 'GMC', 'Yukon XL' union all select
2006, 'GMC', 'Envoy' union all select
2006, 'GMC', 'Canyon' union all select
2006, 'GMC', 'Savana Cargo Van' union all select
2006, 'GMC', 'Sierra Hybrid' union all select
2006, 'GMC', 'Yukon' union all select
2006, 'GMC', 'Savana' union all select
2006, 'GMC', 'Envoy XL' union all select
2006, 'GMC', 'Savana 1500' union all select
2006, 'GMC', 'Savana 2500' union all select
2006, 'GMC', 'Savana 3500' union all select
2006, 'GMC', 'Sierra 2500' union all select
2006, 'GMC', 'Sierra 3500' union all select
2006, 'GMC', 'Yukon XL 1500' union all select
2006, 'GMC', 'Yukon XL 2500' union all select
2006, 'Mazda', 'B-Series' union all select
2006, 'Mazda', 'Tribute' union all select
2006, 'Mazda', 'Mazda6' union all select
2006, 'Mazda', 'Mazda6 5-Door' union all select
2006, 'Mazda', 'Mazda5' union all select
2006, 'Mazda', 'RX-8' union all select
2006, 'Mazda', 'Mazda6 Sport' union all select
2006, 'Mazda', 'MPV' union all select
2006, 'Mazda', 'Mazda3' union all select
2006, 'Mazda', 'Mazdaspeed6' union all select
2006, 'Mazda', 'MX-5' union all select
2006, 'Mazda', 'Miata MX-5' union all select
2006, 'Bentley', 'Arnage' union all select
2006, 'Bentley', 'Azure' union all select
2006, 'Bentley', 'Continental GT' union all select
2006, 'Bentley', 'Continental Flying Spur' union all select
2006, 'Bentley', 'Continental' union all select
2006, 'BMW', '3 Series' union all select
2006, 'BMW', '5 Series' union all select
2006, 'BMW', '6 Series' union all select
2006, 'BMW', '7 Series' union all select
2006, 'BMW', '325' union all select
2006, 'BMW', '330' union all select
2006, 'BMW', '525' union all select
2006, 'BMW', '530' union all select
2006, 'BMW', '550' union all select
2006, 'BMW', '650' union all select
2006, 'BMW', '750' union all select
2006, 'BMW', '760' union all select
2006, 'BMW', 'M3' union all select
2006, 'BMW', 'M5' union all select
2006, 'BMW', 'M6' union all select
2006, 'BMW', 'X3' union all select
2006, 'BMW', 'X5' union all select
2006, 'BMW', 'Z4' union all select
2006, 'BMW', 'M Roadster' union all select
2006, 'BMW', 'Z4 M' union all select
2006, 'Mercedes-Benz', 'SL-Class' union all select
2006, 'Mercedes-Benz', 'C-Class' union all select
2006, 'Mercedes-Benz', 'CLS-Class' union all select
2006, 'Mercedes-Benz', 'E-Class' union all select
2006, 'Mercedes-Benz', 'CL-Class' union all select
2006, 'Mercedes-Benz', 'SLK-Class' union all select
2006, 'Mercedes-Benz', 'S-Class' union all select
2006, 'Mercedes-Benz', 'M-Class' union all select
2006, 'Mercedes-Benz', 'G55 AMG' union all select
2006, 'Mercedes-Benz', 'G-Class' union all select
2006, 'Mercedes-Benz', 'CLK-Class' union all select
2006, 'Mercedes-Benz', 'SL65 AMG' union all select
2006, 'Mercedes-Benz', 'SLR McLaren' union all select
2006, 'Mercedes-Benz', 'R-Class' union all select
2006, 'Hyundai', 'Tucson' union all select
2006, 'Hyundai', 'Azera' union all select
2006, 'Hyundai', 'Elantra' union all select
2006, 'Hyundai', 'Sonata' union all select
2006, 'Hyundai', 'Accent' union all select
2006, 'Hyundai', 'Santa Fe' union all select
2006, 'Hyundai', 'Tiburon' union all select
2006, 'Cadillac', 'XLR' union all select
2006, 'Cadillac', 'STS' union all select
2006, 'Cadillac', 'SRX' union all select
2006, 'Cadillac', 'DTS' union all select
2006, 'Cadillac', 'XLR-V' union all select
2006, 'Cadillac', 'Escalade EXT' union all select
2006, 'Cadillac', 'Escalade' union all select
2006, 'Cadillac', 'CTS-V' union all select
2006, 'Cadillac', 'CTS' union all select
2006, 'Cadillac', 'STS-V' union all select
2006, 'Cadillac', 'Escalade ESV' union all select
2006, 'Jeep', 'Liberty' union all select
2006, 'Jeep', 'Wrangler' union all select
2006, 'Jeep', 'Grand Cherokee' union all select
2006, 'Jeep', 'Commander' union all select
2006, 'Honda', 'Civic' union all select
2006, 'Honda', 'Pilot' union all select
2006, 'Honda', 'Element' union all select
2006, 'Honda', 'Ridgeline' union all select
2006, 'Honda', 'S2000' union all select
2006, 'Honda', 'Odyssey' union all select
2006, 'Honda', 'CR-V' union all select
2006, 'Honda', 'Accord' union all select
2006, 'Honda', 'Insight' union all select
2006, 'Honda', 'Civic Si' union all select
2006, 'Suzuki', 'XL7' union all select
2006, 'Suzuki', 'Daewoo Magnus' union all select
2006, 'Suzuki', 'Aerio' union all select
2006, 'Suzuki', 'Grand Vitara' union all select
2006, 'Suzuki', 'Daewoo Lacetti' union all select
2006, 'Suzuki', 'Reno' union all select
2006, 'Suzuki', 'Swift' union all select
2006, 'Suzuki', 'Forenza' union all select
2006, 'Suzuki', 'Verona' union all select
2006, 'Suzuki', 'XL-7' union all select
2006, 'Buick', 'Rendezvous' union all select
2006, 'Buick', 'Lucerne' union all select
2006, 'Buick', 'Rainier' union all select
2006, 'Buick', 'LaCrosse' union all select
2006, 'Buick', 'Terraza' union all select
2006, 'Volkswagen', 'Touareg' union all select
2006, 'Volkswagen', 'New Beetle' union all select
2006, 'Volkswagen', 'Rabbit' union all select
2006, 'Volkswagen', 'Golf' union all select
2006, 'Volkswagen', 'Phaeton' union all select
2006, 'Volkswagen', 'Passat' union all select
2006, 'Volkswagen', 'GTI' union all select
2006, 'Volkswagen', 'Jetta' union all select
2006, 'Kia', 'Sorento' union all select
2006, 'Kia', 'Optima' union all select
2006, 'Kia', 'Spectra' union all select
2006, 'Kia', 'Sportage' union all select
2006, 'Kia', 'Rio' union all select
2006, 'Kia', 'Spectra5' union all select
2006, 'Kia', 'Amanti' union all select
2006, 'Kia', 'Sedona' union all select
2006, 'Pontiac', 'Montana' union all select
2006, 'Pontiac', 'G6' union all select
2006, 'Pontiac', 'Vibe' union all select
2006, 'Pontiac', 'Grand Prix' union all select
2006, 'Pontiac', 'Torrent' union all select
2006, 'Pontiac', 'Solstice' union all select
2006, 'Pontiac', 'Daewoo Kalos' union all select
2006, 'Pontiac', 'GTO' union all select
2006, 'Pontiac', 'Montana SV6' union all select
2006, 'Mitsubishi', 'Galant' union all select
2006, 'Mitsubishi', 'Lancer' union all select
2006, 'Mitsubishi', 'Outlander' union all select
2006, 'Mitsubishi', 'Pajero' union all select
2006, 'Mitsubishi', 'Eclipse' union all select
2006, 'Mitsubishi', 'Raider' union all select
2006, 'Mitsubishi', 'Endeavor' union all select
2006, 'Mitsubishi', 'Lancer Evolution' union all select
2006, 'Mitsubishi', 'Montero' union all select
2006, 'Jaguar', 'XK' union all select
2006, 'Jaguar', 'X-Type' union all select
2006, 'Jaguar', 'XJ' union all select
2006, 'Jaguar', 'S-Type' union all select
2006, 'Toyota', 'Sequoia' union all select
2006, 'Toyota', 'Corolla' union all select
2006, 'Toyota', 'RAV4' union all select
2006, 'Toyota', 'Land Cruiser' union all select
2006, 'Toyota', '4Runner' union all select
2006, 'Toyota', 'Tundra' union all select
2006, 'Toyota', 'Tacoma' union all select
2006, 'Toyota', 'Prius' union all select
2006, 'Toyota', 'Avalon' union all select
2006, 'Toyota', 'Yaris' union all select
2006, 'Toyota', 'Camry' union all select
2006, 'Toyota', 'Matrix' union all select
2006, 'Toyota', 'Camry Solara' union all select
2006, 'Toyota', 'Sienna' union all select
2006, 'Toyota', 'Highlander' union all select
2006, 'Toyota', 'Solara' union all select
2006, 'Subaru', 'Outback' union all select
2006, 'Subaru', 'Legacy' union all select
2006, 'Subaru', 'Impreza' union all select
2006, 'Subaru', 'Tribeca' union all select
2006, 'Subaru', 'Baja' union all select
2006, 'Subaru', 'Forester' union all select
2006, 'Subaru', 'B9 Tribeca' union all select
2006, 'Chevrolet', 'Impala' union all select
2006, 'Chevrolet', 'Suburban' union all select
2006, 'Chevrolet', 'Monte Carlo' union all select
2006, 'Chevrolet', 'Silverado 3500HD' union all select
2006, 'Chevrolet', 'Equinox' union all select
2006, 'Chevrolet', 'HHR Panel' union all select
2006, 'Chevrolet', 'Uplander' union all select
2006, 'Chevrolet', 'Malibu Maxx' union all select
2006, 'Chevrolet', 'Corvette' union all select
2006, 'Chevrolet', 'Cobalt' union all select
2006, 'Chevrolet', 'Malibu' union all select
2006, 'Chevrolet', 'HHR' union all select
2006, 'Chevrolet', 'Trailblazer' union all select
2006, 'Chevrolet', 'Colorado' union all select
2006, 'Chevrolet', 'Silverado Hybrid' union all select
2006, 'Chevrolet', 'Aveo' union all select
2006, 'Chevrolet', 'Silverado 2500' union all select
2006, 'Chevrolet', 'Silverado' union all select
2006, 'Chevrolet', 'Tahoe' union all select
2006, 'Chevrolet', 'Express' union all select
2006, 'Chevrolet', 'Avalanche' union all select
2006, 'Chevrolet', 'Avalanche 1500' union all select
2006, 'Chevrolet', 'Avalanche 2500' union all select
2006, 'Chevrolet', 'Express 1500' union all select
2006, 'Chevrolet', 'Express 2500' union all select
2006, 'Chevrolet', 'Express 3500' union all select
2006, 'Chevrolet', 'Silverado 1500' union all select
2006, 'Chevrolet', 'Silverado 3500' union all select
2006, 'Chevrolet', 'SSR' union all select
2006, 'Chevrolet', 'Suburban 1500' union all select
2006, 'Chevrolet', 'Suburban 2500' union all select
2006, 'Ford', 'Expedition' union all select
2006, 'Ford', 'Freestyle' union all select
2006, 'Ford', 'F-250 Super Duty' union all select
2006, 'Ford', 'Escape' union all select
2006, 'Ford', 'F-350 Super Duty' union all select
2006, 'Ford', 'F-Series' union all select
2006, 'Ford', 'E-350 Super Duty' union all select
2006, 'Ford', 'Thunderbird' union all select
2006, 'Ford', 'E-Series' union all select
2006, 'Ford', 'Explorer' union all select
2006, 'Ford', 'Freestar' union all select
2006, 'Ford', 'Five Hundred' union all select
2006, 'Ford', 'Mustang' union all select
2006, 'Ford', 'Focus' union all select
2006, 'Ford', 'E250' union all select
2006, 'Ford', 'Taurus' union all select
2006, 'Ford', 'E-350 Super Duty Van' union all select
2006, 'Ford', 'GT' union all select
2006, 'Ford', 'Ranger' union all select
2006, 'Ford', 'Crown Victoria' union all select
2006, 'Ford', 'Fusion' union all select
2006, 'Ford', 'Explorer Sport Trac' union all select
2006, 'Ford', 'E150' union all select
2006, 'Ford', 'E350' union all select
2006, 'Ford', 'F150' union all select
2006, 'Ford', 'F250' union all select
2006, 'Ford', 'F350' union all select
2006, 'Audi', 'A3' union all select
2006, 'Audi', 'S4' union all select
2006, 'Audi', 'TT' union all select
2006, 'Audi', 'A4' union all select
2006, 'Audi', 'A6' union all select
2006, 'Audi', 'S8' union all select
2006, 'Audi', 'A8' union all select
2006, 'Infiniti', 'FX' union all select
2006, 'Infiniti', 'G35' union all select
2006, 'Infiniti', 'M' union all select
2006, 'Infiniti', 'G' union all select
2006, 'Infiniti', 'Q' union all select
2006, 'Infiniti', 'QX' union all select
2006, 'Land Rover', 'Range Rover Sport' union all select
2006, 'Land Rover', 'Discovery' union all select
2006, 'Land Rover', 'Range Rover' union all select
2006, 'Land Rover', 'LR3' union all select
2006, 'Lexus', 'GS' union all select
2006, 'Lexus', 'RX' union all select
2006, 'Lexus', 'IS' union all select
2006, 'Lexus', 'RX Hybrid' union all select
2006, 'Lexus', 'ES' union all select
2006, 'Lexus', 'SC' union all select
2006, 'Lexus', 'GX' union all select
2006, 'Lexus', 'LX' union all select
2006, 'Lexus', 'LS' union all select
2006, 'Volvo', 'V50' union all select
2006, 'Volvo', 'XC90' union all select
2006, 'Volvo', 'XC70' union all select
2006, 'Volvo', 'S40' union all select
2006, 'Volvo', 'C70' union all select
2006, 'Volvo', 'V70' union all select
2006, 'Volvo', 'S80' union all select
2006, 'Volvo', 'S60' union all select
2006, 'Porsche', '911' union all select
2006, 'Porsche', 'Cayenne' union all select
2006, 'Porsche', 'Cayman' union all select
2006, 'Porsche', 'Boxster' union all select
2006, 'Mercury', 'Mountaineer' union all select
2006, 'Mercury', 'Mariner' union all select
2006, 'Mercury', 'Grand Marquis' union all select
2006, 'Mercury', 'Monterey' union all select
2006, 'Mercury', 'Montego' union all select
2006, 'Mercury', 'Milan' union all select
2006, 'Hummer', 'H2 SUT' union all select
2006, 'Hummer', 'H2 SUV' union all select
2006, 'Hummer', 'H3' union all select
2006, 'HUMMER', 'H1' union all select
2006, 'HUMMER', 'H2' union all select
2006, 'Nissan', 'Quest' union all select
2006, 'Nissan', 'Maxima' union all select
2006, 'Nissan', 'Frontier' union all select
2006, 'Nissan', '350Z' union all select
2006, 'Nissan', 'Xterra' union all select
2006, 'Nissan', 'Murano' union all select
2006, 'Nissan', 'Sentra' union all select
2006, 'Nissan', '350Z Roadster' union all select
2006, 'Nissan', 'Titan' union all select
2006, 'Nissan', 'Altima' union all select
2006, 'Nissan', 'Armada' union all select
2006, 'Nissan', 'Pathfinder' union all select
2006, 'Chrysler', '300' union all select
2006, 'Chrysler', 'PT Cruiser' union all select
2006, 'Chrysler', 'Town & Country' union all select
2006, 'Chrysler', 'Pacifica' union all select
2006, 'Chrysler', 'Sebring' union all select
2006, 'Chrysler', 'Crossfire Roadster' union all select
2006, 'Chrysler', 'Crossfire' union all select
2006, 'Lincoln', 'Town Car' union all select
2006, 'Lincoln', 'Zephyr' union all select
2006, 'Lincoln', 'Navigator' union all select
2006, 'Lincoln', 'Mark LT' union all select
2006, 'Lincoln', 'LS' union all select
2006, 'Scion', 'xA' union all select
2006, 'Scion', 'xB' union all select
2006, 'Scion', 'tC' union all select
2006, 'Dodge', 'Ram 3500' union all select
2006, 'Dodge', 'Sprinter' union all select
2006, 'Dodge', 'Viper' union all select
2006, 'Dodge', 'Charger' union all select
2006, 'Dodge', 'Dakota' union all select
2006, 'Dodge', 'Magnum' union all select
2006, 'Dodge', 'Durango' union all select
2006, 'Dodge', 'Caravan' union all select
2006, 'Dodge', 'Ram 2500' union all select
2006, 'Dodge', 'Ram 1500' union all select
2006, 'Dodge', 'Dakota Club' union all select
2006, 'Dodge', 'Grand Caravan' union all select
2006, 'Dodge', 'Stratus' union all select
2006, 'Acura', 'MDX' union all select
2006, 'Acura', 'TL' union all select
2006, 'Acura', 'RL' union all select
2006, 'Acura', 'TSX' union all select
2006, 'Acura', 'RSX' union all select
2006, 'Maybach', '57' union all select
2006, 'Maybach', '62' union all select
2006, 'Aston Martin', 'DB9 Volante' union all select
2006, 'Aston Martin', 'V8 Vantage' union all select
2006, 'Aston Martin', 'DB9' union all select
2006, 'Aston Martin', 'Vanquish S' union all select
2006, 'Aston Martin', 'Vantage' union all select
2006, 'Lamborghini', 'Gallardo' union all select
2006, 'Lamborghini', 'Murcielago' union all select
2006, 'Spyker', 'C8 Double 12 S' union all select
2006, 'Saab', '9-2X' union all select
2006, 'Saab', '9-5' union all select
2006, 'Saab', '9-3' union all select
2006, 'Saab', '9-7X' union all select
2006, 'Ferrari', 'F430' union all select
2006, 'Ferrari', '612 Scaglietti' union all select
2006, 'Ferrari', 'F430 Spider' union all select
2006, 'Maserati', 'Quattroporte' union all select
2006, 'Maserati', 'Gran Sport' union all select
2006, 'Maserati', 'Coupe' union all select
2006, 'Maserati', 'GranSport' union all select
2006, 'Spyker Cars', 'C8' union all select
2006, 'MINI', 'Cooper' union all select
2006, 'Morgan', 'Aero 8' union all select
2006, 'Peugeot', '207' union all select
2006, 'Panoz', 'Esperante' union all select
2006, 'Isuzu', 'i-Series' union all select
2006, 'Isuzu', 'Ascender' union all select
2006, 'Isuzu', 'i-280' union all select
2006, 'Isuzu', 'i-350' union all select
2006, 'Rolls-Royce', 'Phantom' union all select
2006, 'Saturn', 'Vue' union all select
2006, 'Saturn', 'Ion' union all select
2006, 'Saturn', 'Relay' union all select
2006, 'Lotus', 'Elise' union all select
2006, 'Lotus', 'Exige' union all select
2007, 'Chevrolet', 'Corvette' union all select
2007, 'Chevrolet', 'Colorado' union all select
2007, 'Chevrolet', 'Equinox' union all select
2007, 'Chevrolet', 'Silverado' union all select
2007, 'Chevrolet', 'Uplander' union all select
2007, 'Chevrolet', 'Cobalt SS' union all select
2007, 'Chevrolet', 'Avalanche' union all select
2007, 'Chevrolet', 'Cobalt' union all select
2007, 'Chevrolet', 'Tahoe' union all select
2007, 'Chevrolet', 'Suburban' union all select
2007, 'Chevrolet', 'HHR' union all select
2007, 'Chevrolet', 'Malibu' union all select
2007, 'Chevrolet', 'Monte Carlo' union all select
2007, 'Chevrolet', 'Aveo' union all select
2007, 'Chevrolet', 'Trailblazer' union all select
2007, 'Chevrolet', 'Express' union all select
2007, 'Chevrolet', 'Impala' union all select
2007, 'Chevrolet', 'Express 1500' union all select
2007, 'Chevrolet', 'Express 2500' union all select
2007, 'Chevrolet', 'Express 3500' union all select
2007, 'Chevrolet', 'Silverado 1500' union all select
2007, 'Chevrolet', 'Silverado 2500' union all select
2007, 'Chevrolet', 'Silverado 3500' union all select
2007, 'Chevrolet', 'Suburban 1500' union all select
2007, 'Chevrolet', 'Suburban 2500' union all select
2007, 'Volkswagen', 'GTI' union all select
2007, 'Volkswagen', 'Touareg' union all select
2007, 'Volkswagen', 'Rabbit' union all select
2007, 'Volkswagen', 'Jetta' union all select
2007, 'Volkswagen', 'New Beetle' union all select
2007, 'Volkswagen', 'Eos' union all select
2007, 'Volkswagen', 'Passat' union all select
2007, 'Ford', 'Focus' union all select
2007, 'Ford', 'Escape' union all select
2007, 'Ford', 'Crown Victoria' union all select
2007, 'Ford', 'Fusion' union all select
2007, 'Ford', 'Mustang' union all select
2007, 'Ford', 'F-Series Super Duty' union all select
2007, 'Ford', 'Freestar' union all select
2007, 'Ford', 'E-Series' union all select
2007, 'Ford', 'Taurus' union all select
2007, 'Ford', 'Explorer Sport Trac' union all select
2007, 'Ford', 'GT500' union all select
2007, 'Ford', 'F-Series' union all select
2007, 'Ford', 'Freestyle' union all select
2007, 'Ford', 'Five Hundred' union all select
2007, 'Ford', 'Ranger' union all select
2007, 'Ford', 'Explorer' union all select
2007, 'Ford', 'Edge' union all select
2007, 'Ford', 'Expedition' union all select
2007, 'Ford', 'E150' union all select
2007, 'Ford', 'E250' union all select
2007, 'Ford', 'E350' union all select
2007, 'Ford', 'Expedition EL' union all select
2007, 'Ford', 'F150' union all select
2007, 'Ford', 'F250' union all select
2007, 'Ford', 'F350' union all select
2007, 'Mercedes-Benz', 'C-Class' union all select
2007, 'Mercedes-Benz', 'G-Class' union all select
2007, 'Mercedes-Benz', 'M-Class' union all select
2007, 'Mercedes-Benz', 'R-Class' union all select
2007, 'Mercedes-Benz', 'CL-Class' union all select
2007, 'Mercedes-Benz', 'E-Class' union all select
2007, 'Mercedes-Benz', 'SLK-Class' union all select
2007, 'Mercedes-Benz', 'SL-Class' union all select
2007, 'Mercedes-Benz', 'CLK-Class' union all select
2007, 'Mercedes-Benz', 'GL-Class' union all select
2007, 'Mercedes-Benz', 'CLS-Class' union all select
2007, 'Mercedes-Benz', 'SLR McLaren' union all select
2007, 'Mercedes-Benz', 'S-Class' union all select
2007, 'BMW', '3 Series' union all select
2007, 'BMW', '5 Series' union all select
2007, 'BMW', '6 Series' union all select
2007, 'BMW', '7 Series' union all select
2007, 'BMW', '530' union all select
2007, 'BMW', 'M6' union all select
2007, 'BMW', 'M Roadster' union all select
2007, 'BMW', 'M5' union all select
2007, 'BMW', 'X3' union all select
2007, 'BMW', 'X5' union all select
2007, 'BMW', 'Alpina B7' union all select
2007, 'BMW', 'Z4 M' union all select
2007, 'Dodge', 'Ram' union all select
2007, 'Dodge', 'Charger' union all select
2007, 'Dodge', 'Magnum' union all select
2007, 'Dodge', 'Dakota' union all select
2007, 'Dodge', 'Caravan' union all select
2007, 'Dodge', 'Nitro' union all select
2007, 'Dodge', 'Caliber' union all select
2007, 'Dodge', 'Durango' union all select
2007, 'Dodge', 'Dakota Club' union all select
2007, 'Dodge', 'Grand Caravan' union all select
2007, 'Dodge', 'Ram 1500' union all select
2007, 'Dodge', 'Ram 2500' union all select
2007, 'Dodge', 'Ram 3500' union all select
2007, 'Lexus', 'IS' union all select
2007, 'Lexus', 'SC' union all select
2007, 'Lexus', 'LX' union all select
2007, 'Lexus', 'RX' union all select
2007, 'Lexus', 'RX Hybrid' union all select
2007, 'Lexus', 'GX' union all select
2007, 'Lexus', 'GS' union all select
2007, 'Lexus', 'LS' union all select
2007, 'Lexus', 'ES' union all select
2007, 'Kia', 'Sedona' union all select
2007, 'Kia', 'Spectra' union all select
2007, 'Kia', 'Optima' union all select
2007, 'Kia', 'Sportage' union all select
2007, 'Kia', 'Carens' union all select
2007, 'Kia', 'Rio' union all select
2007, 'Kia', 'Sorento' union all select
2007, 'Kia', 'Amanti' union all select
2007, 'Kia', 'Rondo' union all select
2007, 'Toyota', 'Matrix' union all select
2007, 'Toyota', 'Avalon' union all select
2007, 'Toyota', 'Camry Solara' union all select
2007, 'Toyota', 'Yaris' union all select
2007, 'Toyota', 'Highlander Hybrid' union all select
2007, 'Toyota', 'Tundra' union all select
2007, 'Toyota', 'Camry Hybrid' union all select
2007, 'Toyota', 'Sequoia' union all select
2007, 'Toyota', 'Highlander' union all select
2007, 'Toyota', 'Tacoma' union all select
2007, 'Toyota', 'Prius' union all select
2007, 'Toyota', 'Corolla' union all select
2007, 'Toyota', 'Land Cruiser' union all select
2007, 'Toyota', 'FJ Cruiser' union all select
2007, 'Toyota', 'Sienna' union all select
2007, 'Toyota', '4Runner' union all select
2007, 'Toyota', 'Camry' union all select
2007, 'Toyota', 'RAV4' union all select
2007, 'Toyota', 'Solara' union all select
2007, 'Toyota', 'TundraMax' union all select
2007, 'Mazda', 'B-Series' union all select
2007, 'Mazda', 'Mazdaspeed6' union all select
2007, 'Mazda', 'Mazda6' union all select
2007, 'Mazda', 'Mazda3' union all select
2007, 'Mazda', 'RX-8' union all select
2007, 'Mazda', 'CX-7' union all select
2007, 'Mazda', 'MX-5' union all select
2007, 'Mazda', 'Mazdaspeed 3' union all select
2007, 'Mazda', 'Mazda5' union all select
2007, 'Mazda', 'CX-9' union all select
2007, 'Mazda', 'Miata MX-5' union all select
2007, 'Audi', 'Q7' union all select
2007, 'Audi', 'A3' union all select
2007, 'Audi', 'A4' union all select
2007, 'Audi', 'A8' union all select
2007, 'Audi', 'A6' union all select
2007, 'Audi', 'RS4' union all select
2007, 'Audi', 'S4' union all select
2007, 'Audi', 'S8' union all select
2007, 'Audi', 'S6' union all select
2007, 'Audi', 'RS 4' union all select
2007, 'Jaguar', 'XK' union all select
2007, 'Jaguar', 'X-Type' union all select
2007, 'Jaguar', 'S-Type' union all select
2007, 'Jaguar', 'XJ' union all select
2007, 'Jeep', 'Compass' union all select
2007, 'Jeep', 'Liberty' union all select
2007, 'Jeep', 'Patriot' union all select
2007, 'Jeep', 'Wrangler' union all select
2007, 'Jeep', 'Commander' union all select
2007, 'Jeep', 'Grand Cherokee' union all select
2007, 'Buick', 'LaCrosse' union all select
2007, 'Buick', 'Rendezvous' union all select
2007, 'Buick', 'Terraza' union all select
2007, 'Buick', 'Rainier' union all select
2007, 'Buick', 'Lucerne' union all select
2007, 'Aston Martin', 'V8 Vantage' union all select
2007, 'Aston Martin', 'DB9' union all select
2007, 'Aston Martin', 'Vantage' union all select
2007, 'Isuzu', 'i-Series' union all select
2007, 'Isuzu', 'Ascender' union all select
2007, 'Isuzu', 'i-290' union all select
2007, 'Isuzu', 'i-370' union all select
2007, 'Hyundai', 'Veracruz' union all select
2007, 'Hyundai', 'Accent' union all select
2007, 'Hyundai', 'Entourage' union all select
2007, 'Hyundai', 'Azera' union all select
2007, 'Hyundai', 'Sonata' union all select
2007, 'Hyundai', 'Tiburon' union all select
2007, 'Hyundai', 'Elantra' union all select
2007, 'Hyundai', 'Santa Fe' union all select
2007, 'Hyundai', 'Tucson' union all select
2007, 'Foose', 'Hemisfear' union all select
2007, 'Infiniti', 'G35' union all select
2007, 'Infiniti', 'FX' union all select
2007, 'Infiniti', 'QX56' union all select
2007, 'Infiniti', 'M' union all select
2007, 'Infiniti', 'G' union all select
2007, 'Infiniti', 'QX' union all select
2007, 'Panoz', 'Esperante' union all select
2007, 'Mercury', 'Montego' union all select
2007, 'Mercury', 'Mariner' union all select
2007, 'Mercury', 'Monterey' union all select
2007, 'Mercury', 'Milan' union all select
2007, 'Mercury', 'Grand Marquis' union all select
2007, 'Mercury', 'Mountaineer' union all select
2007, 'Honda', 'Pilot' union all select
2007, 'Honda', 'Ridgeline' union all select
2007, 'Honda', 'Civic' union all select
2007, 'Honda', 'Odyssey' union all select
2007, 'Honda', 'S2000' union all select
2007, 'Honda', 'Fit' union all select
2007, 'Honda', 'Accord' union all select
2007, 'Honda', 'CR-V' union all select
2007, 'Honda', 'Element' union all select
2007, 'Saab', '9-7X' union all select
2007, 'Saab', '9-3' union all select
2007, 'Saab', '9-5' union all select
2007, 'Nissan', 'Murano' union all select
2007, 'Nissan', 'Armada' union all select
2007, 'Nissan', 'Versa' union all select
2007, 'Nissan', 'Titan' union all select
2007, 'Nissan', '350Z' union all select
2007, 'Nissan', 'Frontier' union all select
2007, 'Nissan', 'Altima' union all select
2007, 'Nissan', 'Xterra' union all select
2007, 'Nissan', 'Maxima' union all select
2007, 'Nissan', 'Sentra' union all select
2007, 'Nissan', 'Quest' union all select
2007, 'Nissan', 'Pathfinder' union all select
2007, 'GMC', 'Savana' union all select
2007, 'GMC', 'Acadia' union all select
2007, 'GMC', 'Envoy' union all select
2007, 'GMC', 'Sierra' union all select
2007, 'GMC', 'Yukon' union all select
2007, 'GMC', 'Canyon' union all select
2007, 'GMC', 'Savana 1500' union all select
2007, 'GMC', 'Savana 2500' union all select
2007, 'GMC', 'Savana 3500' union all select
2007, 'GMC', 'Sierra 1500' union all select
2007, 'GMC', 'Sierra 2500' union all select
2007, 'GMC', 'Sierra 3500' union all select
2007, 'GMC', 'Yukon XL 1500' union all select
2007, 'GMC', 'Yukon XL 2500' union all select
2007, 'Maybach', '57' union all select
2007, 'Maybach', '62' union all select
2007, 'Spyker Cars', 'C8' union all select
2007, 'Scion', 'tC' union all select
2007, 'Hummer', 'H3' union all select
2007, 'Hummer', 'H2' union all select
2007, 'Suzuki', 'Daewoo Lacetti' union all select
2007, 'Suzuki', 'XL-7' union all select
2007, 'Suzuki', 'Reno' union all select
2007, 'Suzuki', 'SX4' union all select
2007, 'Suzuki', 'Aerio' union all select
2007, 'Suzuki', 'Grand Vitara' union all select
2007, 'Suzuki', 'Forenza' union all select
2007, 'Suzuki', 'XL7' union all select
2007, 'Ferrari', 'F430' union all select
2007, 'Ferrari', '599 GTB Fiorano' union all select
2007, 'Ferrari', '612 Scaglietti' union all select
2007, 'Subaru', 'Legacy' union all select
2007, 'Subaru', 'Impreza' union all select
2007, 'Subaru', 'Outback' union all select
2007, 'Subaru', 'Forester' union all select
2007, 'Subaru', 'Tribeca' union all select
2007, 'Subaru', 'B9 Tribeca' union all select
2007, 'Lincoln', 'MKX' union all select
2007, 'Lincoln', 'Mark LT' union all select
2007, 'Lincoln', 'Navigator' union all select
2007, 'Lincoln', 'MKZ' union all select
2007, 'Lincoln', 'Town Car' union all select
2007, 'Lincoln', 'Navigator L' union all select
2007, 'Saturn', 'Outlook' union all select
2007, 'Saturn', 'VUE' union all select
2007, 'Saturn', 'Aura' union all select
2007, 'Saturn', 'Sky' union all select
2007, 'Saturn', 'Ion' union all select
2007, 'Saturn', 'Relay' union all select
2007, 'Pontiac', 'G6' union all select
2007, 'Pontiac', 'Grand Prix' union all select
2007, 'Pontiac', 'Solstice' union all select
2007, 'Pontiac', 'Vibe' union all select
2007, 'Pontiac', 'G5' union all select
2007, 'Pontiac', 'Torrent' union all select
2007, 'Cadillac', 'CTS' union all select
2007, 'Cadillac', 'XLR-V' union all select
2007, 'Cadillac', 'SRX' union all select
2007, 'Cadillac', 'Escalade' union all select
2007, 'Cadillac', 'XLR' union all select
2007, 'Cadillac', 'CTS-V' union all select
2007, 'Cadillac', 'STS' union all select
2007, 'Cadillac', 'DTS' union all select
2007, 'Cadillac', 'Escalade ESV' union all select
2007, 'Cadillac', 'Escalade EXT' union all select
2007, 'Mitsubishi', 'Eclipse' union all select
2007, 'Mitsubishi', 'Lancer' union all select
2007, 'Mitsubishi', 'Raider' union all select
2007, 'Mitsubishi', 'Galant' union all select
2007, 'Mitsubishi', 'Endeavor' union all select
2007, 'Mitsubishi', 'Outlander' union all select
2007, 'Volvo', 'V70' union all select
2007, 'Volvo', 'S40' union all select
2007, 'Volvo', 'S60' union all select
2007, 'Volvo', 'S80' union all select
2007, 'Volvo', 'XC70' union all select
2007, 'Volvo', 'C70' union all select
2007, 'Volvo', 'V50' union all select
2007, 'Volvo', 'XC90' union all select
2007, 'Peugeot', '207' union all select
2007, 'Porsche', '911' union all select
2007, 'Porsche', 'Boxster' union all select
2007, 'Porsche', 'Cayman' union all select
2007, 'Bentley', 'Continental GT' union all select
2007, 'Bentley', 'Azure' union all select
2007, 'Bentley', 'Continental GTC' union all select
2007, 'Bentley', 'Continental Flying Spur' union all select
2007, 'Bentley', 'Arnage' union all select
2007, 'Bentley', 'Continental' union all select
2007, 'Acura', 'RDX' union all select
2007, 'Acura', 'RL' union all select
2007, 'Acura', 'MDX' union all select
2007, 'Acura', 'TL' union all select
2007, 'Acura', 'TSX' union all select
2007, 'Lamborghini', 'Gallardo' union all select
2007, 'Lamborghini', 'Murcielago' union all select
2007, 'MINI', 'Cooper' union all select
2007, 'Land Rover', 'Range Rover Sport' union all select
2007, 'Land Rover', 'Range Rover' union all select
2007, 'Land Rover', 'Discovery' union all select
2007, 'Land Rover', 'LR3' union all select
2007, 'Chrysler', '300' union all select
2007, 'Chrysler', 'Town & Country' union all select
2007, 'Chrysler', 'Sebring' union all select
2007, 'Chrysler', 'Aspen' union all select
2007, 'Chrysler', 'Crossfire' union all select
2007, 'Chrysler', 'Pacifica' union all select
2007, 'Chrysler', 'PT Cruiser' union all select
2007, 'Maserati', 'Quattroporte' union all select
2007, 'Morgan', 'Aero 8' union all select
2007, 'Rolls-Royce', 'Phantom' union all select
2007, 'Lotus', 'Elise' union all select
2007, 'Lotus', 'Exige' union all select
2008, 'Lincoln', 'Navigator' union all select
2008, 'Lincoln', 'MKX' union all select
2008, 'Lincoln', 'Town Car' union all select
2008, 'Lincoln', 'Mark LT' union all select
2008, 'Lincoln', 'MKZ' union all select
2008, 'Lincoln', 'Navigator L' union all select
2008, 'Volvo', 'S80' union all select
2008, 'Volvo', 'XC70' union all select
2008, 'Volvo', 'C70' union all select
2008, 'Volvo', 'V50' union all select
2008, 'Volvo', 'C30' union all select
2008, 'Volvo', 'XC90' union all select
2008, 'Volvo', 'S60' union all select
2008, 'Volvo', 'S40' union all select
2008, 'Volvo', 'V70' union all select
2008, 'Mercedes-Benz', 'SL-Class' union all select
2008, 'Mercedes-Benz', 'CLS-Class' union all select
2008, 'Mercedes-Benz', 'E-Class' union all select
2008, 'Mercedes-Benz', 'C-Class' union all select
2008, 'Mercedes-Benz', 'CLK-Class' union all select
2008, 'Mercedes-Benz', 'M-Class' union all select
2008, 'Mercedes-Benz', 'G-Class' union all select
2008, 'Mercedes-Benz', 'S-Class' union all select
2008, 'Mercedes-Benz', 'CL-Class' union all select
2008, 'Mercedes-Benz', 'SLR McLaren' union all select
2008, 'Mercedes-Benz', 'SLK-Class' union all select
2008, 'Mercedes-Benz', 'R-Class' union all select
2008, 'Mercedes-Benz', 'GL-Class' union all select
2008, 'Rolls-Royce', 'Phantom' union all select
2008, 'Mazda', 'MX-5' union all select
2008, 'Mazda', 'Tribute' union all select
2008, 'Mazda', 'B-Series' union all select
2008, 'Mazda', 'CX-7' union all select
2008, 'Mazda', 'Mazdaspeed 3' union all select
2008, 'Mazda', 'Mazda3' union all select
2008, 'Mazda', 'Mazda5' union all select
2008, 'Mazda', 'Mazda6' union all select
2008, 'Mazda', 'RX-8' union all select
2008, 'Mazda', 'CX-9' union all select
2008, 'Mazda', 'Miata MX-5' union all select
2008, 'BMW', '1 Series' union all select
2008, 'BMW', '3 Series' union all select
2008, 'BMW', '5 Series' union all select
2008, 'BMW', '6 Series' union all select
2008, 'BMW', '7 Series' union all select
2008, 'BMW', 'M3' union all select
2008, 'BMW', 'M Roadster' union all select
2008, 'BMW', 'M5' union all select
2008, 'BMW', 'M6' union all select
2008, 'BMW', 'X5' union all select
2008, 'BMW', 'Z4' union all select
2008, 'BMW', 'X3' union all select
2008, 'BMW', 'X6' union all select
2008, 'BMW', 'Alpina B7' union all select
2008, 'BMW', 'Z4 M' union all select
2008, 'Audi', 'RS4' union all select
2008, 'Audi', 'S4' union all select
2008, 'Audi', 'A4' union all select
2008, 'Audi', 'S8' union all select
2008, 'Audi', 'Q7' union all select
2008, 'Audi', 'TT' union all select
2008, 'Audi', 'S5' union all select
2008, 'Audi', 'A8' union all select
2008, 'Audi', 'R8' union all select
2008, 'Audi', 'A5' union all select
2008, 'Audi', 'A6' union all select
2008, 'Audi', 'S6' union all select
2008, 'Audi', 'A3' union all select
2008, 'Audi', 'RS 4' union all select
2008, 'Ford', 'Taurus X' union all select
2008, 'Ford', 'Fusion' union all select
2008, 'Ford', 'GT500' union all select
2008, 'Ford', 'Edge' union all select
2008, 'Ford', 'Taurus' union all select
2008, 'Ford', 'Mustang' union all select
2008, 'Ford', 'Escape' union all select
2008, 'Ford', 'Focus' union all select
2008, 'Ford', 'F-Series' union all select
2008, 'Ford', 'Crown Victoria' union all select
2008, 'Ford', 'Explorer' union all select
2008, 'Ford', 'Ranger' union all select
2008, 'Ford', 'F-Series Super Duty' union all select
2008, 'Ford', 'E-Series' union all select
2008, 'Ford', 'Expedition' union all select
2008, 'Ford', 'Explorer Sport Trac' union all select
2008, 'Ford', 'E150' union all select
2008, 'Ford', 'E250' union all select
2008, 'Ford', 'E350' union all select
2008, 'Ford', 'Expedition EL' union all select
2008, 'Ford', 'F150' union all select
2008, 'Ford', 'F250' union all select
2008, 'Ford', 'F350' union all select
2008, 'Ford', 'F450' union all select
2008, 'Porsche', '911' union all select
2008, 'Porsche', 'Boxster' union all select
2008, 'Porsche', 'Cayman' union all select
2008, 'Porsche', 'Cayenne' union all select
2008, 'Saab', '9-3' union all select
2008, 'Saab', '9-5' union all select
2008, 'Saab', '9-7X' union all select
2008, 'GMC', 'Canyon' union all select
2008, 'GMC', 'Sierra' union all select
2008, 'GMC', 'Savana' union all select
2008, 'GMC', 'Acadia' union all select
2008, 'GMC', 'Yukon' union all select
2008, 'GMC', 'Envoy' union all select
2008, 'GMC', 'Savana 1500' union all select
2008, 'GMC', 'Savana 2500' union all select
2008, 'GMC', 'Savana 3500' union all select
2008, 'GMC', 'Sierra 1500' union all select
2008, 'GMC', 'Sierra 2500' union all select
2008, 'GMC', 'Sierra 3500' union all select
2008, 'GMC', 'Yukon XL 1500' union all select
2008, 'GMC', 'Yukon XL 2500' union all select
2008, 'Mitsubishi', 'Galant' union all select
2008, 'Mitsubishi', 'Endeavor' union all select
2008, 'Mitsubishi', 'Outlander' union all select
2008, 'Mitsubishi', 'Eclipse' union all select
2008, 'Mitsubishi', 'Lancer Evolution' union all select
2008, 'Mitsubishi', 'Lancer' union all select
2008, 'Mitsubishi', 'Raider' union all select
2008, 'Hyundai', 'Tucson' union all select
2008, 'Hyundai', 'Accent' union all select
2008, 'Hyundai', 'Elantra' union all select
2008, 'Hyundai', 'Santa Fe' union all select
2008, 'Hyundai', 'Azera' union all select
2008, 'Hyundai', 'Tiburon' union all select
2008, 'Hyundai', 'Entourage' union all select
2008, 'Hyundai', 'Veracruz' union all select
2008, 'Hyundai', 'Sonata' union all select
2008, 'Toyota', 'Prius' union all select
2008, 'Toyota', 'Highlander' union all select
2008, 'Toyota', 'Sequoia' union all select
2008, 'Toyota', 'Corolla' union all select
2008, 'Toyota', 'Yaris' union all select
2008, 'Toyota', 'Camry Solara' union all select
2008, 'Toyota', 'Camry' union all select
2008, 'Toyota', 'Land Cruiser' union all select
2008, 'Toyota', 'Sienna' union all select
2008, 'Toyota', 'RAV4' union all select
2008, 'Toyota', 'Camry Hybrid' union all select
2008, 'Toyota', 'Tundra' union all select
2008, 'Toyota', '4Runner' union all select
2008, 'Toyota', 'Matrix' union all select
2008, 'Toyota', 'Tacoma' union all select
2008, 'Toyota', 'FJ Cruiser' union all select
2008, 'Toyota', 'Avalon' union all select
2008, 'Toyota', 'Solara' union all select
2008, 'Toyota', 'TundraMax' union all select
2008, 'Suzuki', 'XL-7' union all select
2008, 'Suzuki', 'Daewoo Lacetti' union all select
2008, 'Suzuki', 'SX4' union all select
2008, 'Suzuki', 'Reno' union all select
2008, 'Suzuki', 'Grand Vitara' union all select
2008, 'Suzuki', 'Forenza' union all select
2008, 'Suzuki', 'XL7' union all select
2008, 'Jeep', 'Liberty' union all select
2008, 'Jeep', 'Commander' union all select
2008, 'Jeep', 'Patriot' union all select
2008, 'Jeep', 'Grand Cherokee' union all select
2008, 'Jeep', 'Compass' union all select
2008, 'Jeep', 'Wrangler' union all select
2008, 'Bentley', 'Continental GTC' union all select
2008, 'Bentley', 'Arnage' union all select
2008, 'Bentley', 'Continental Flying Spur' union all select
2008, 'Bentley', 'Continental GT' union all select
2008, 'Bentley', 'Azure' union all select
2008, 'Bentley', 'Continental' union all select
2008, 'Volkswagen', 'Rabbit' union all select
2008, 'Volkswagen', 'New Beetle' union all select
2008, 'Volkswagen', 'Jetta' union all select
2008, 'Volkswagen', 'GLI' union all select
2008, 'Volkswagen', 'GTI' union all select
2008, 'Volkswagen', 'Passat' union all select
2008, 'Volkswagen', 'Touareg' union all select
2008, 'Volkswagen', 'Eos' union all select
2008, 'Volkswagen', 'R32' union all select
2008, 'Volkswagen', 'Touareg 2' union all select
2008, 'Cadillac', 'STS-V' union all select
2008, 'Cadillac', 'Escalade' union all select
2008, 'Cadillac', 'CTS' union all select
2008, 'Cadillac', 'XLR' union all select
2008, 'Cadillac', 'DTS' union all select
2008, 'Cadillac', 'SRX' union all select
2008, 'Cadillac', 'STS' union all select
2008, 'Cadillac', 'XLR-V' union all select
2008, 'Cadillac', 'Escalade ESV' union all select
2008, 'Cadillac', 'Escalade EXT' union all select
2008, 'Land Rover', 'Freelander' union all select
2008, 'Land Rover', 'Discovery' union all select
2008, 'Land Rover', 'Range Rover' union all select
2008, 'Land Rover', 'Range Rover Sport' union all select
2008, 'Land Rover', 'LR2' union all select
2008, 'Land Rover', 'LR3' union all select
2008, 'Lexus', 'ES' union all select
2008, 'Lexus', 'SC' union all select
2008, 'Lexus', 'GS' union all select
2008, 'Lexus', 'IS-F' union all select
2008, 'Lexus', 'LX' union all select
2008, 'Lexus', 'LS' union all select
2008, 'Lexus', 'GX' union all select
2008, 'Lexus', 'RX' union all select
2008, 'Lexus', 'IS' union all select
2008, 'Lexus', 'RX Hybrid' union all select
2008, 'Lexus', 'IS F' union all select
2008, 'Lamborghini', 'Reventen' union all select
2008, 'Lamborghini', 'Murcielago' union all select
2008, 'Lamborghini', 'Gallardo' union all select
2008, 'Lamborghini', 'Murcielago LP640' union all select
2008, 'Subaru', 'Impreza' union all select
2008, 'Subaru', 'Forester' union all select
2008, 'Subaru', 'Legacy' union all select
2008, 'Subaru', 'Outback' union all select
2008, 'Subaru', 'Tribeca' union all select
2008, 'Nissan', 'Versa' union all select
2008, 'Nissan', 'Maxima' union all select
2008, 'Nissan', 'Rogue' union all select
2008, 'Nissan', 'Altima' union all select
2008, 'Nissan', 'Sentra' union all select
2008, 'Nissan', 'Titan' union all select
2008, 'Nissan', 'Pathfinder' union all select
2008, 'Nissan', 'Armada' union all select
2008, 'Nissan', 'Frontier' union all select
2008, 'Nissan', '350Z' union all select
2008, 'Nissan', 'Quest' union all select
2008, 'Nissan', 'Xterra' union all select
2008, 'Honda', 'Odyssey' union all select
2008, 'Honda', 'CR-V' union all select
2008, 'Honda', 'Fit' union all select
2008, 'Honda', 'Civic' union all select
2008, 'Honda', 'Element' union all select
2008, 'Honda', 'Accord' union all select
2008, 'Honda', 'Pilot' union all select
2008, 'Honda', 'Ridgeline' union all select
2008, 'Honda', 'S2000' union all select
2008, 'Chrysler', '300' union all select
2008, 'Chrysler', 'Sebring' union all select
2008, 'Chrysler', 'Town & Country' union all select
2008, 'Chrysler', 'Crossfire' union all select
2008, 'Chrysler', 'Aspen' union all select
2008, 'Chrysler', 'Pacifica' union all select
2008, 'Chrysler', 'PT Cruiser' union all select
2008, 'Infiniti', 'QX56' union all select
2008, 'Infiniti', 'G35' union all select
2008, 'Infiniti', 'G37' union all select
2008, 'Infiniti', 'M' union all select
2008, 'Infiniti', 'EX' union all select
2008, 'Infiniti', 'FX' union all select
2008, 'Infiniti', 'G' union all select
2008, 'Infiniti', 'QX' union all select
2008, 'Chevrolet', 'HHR' union all select
2008, 'Chevrolet', 'Colorado' union all select
2008, 'Chevrolet', 'Trailblazer' union all select
2008, 'Chevrolet', 'Corvette' union all select
2008, 'Chevrolet', 'Cobalt SS' union all select
2008, 'Chevrolet', 'Cobalt' union all select
2008, 'Chevrolet', 'Tahoe' union all select
2008, 'Chevrolet', 'Malibu' union all select
2008, 'Chevrolet', 'Avalanche' union all select
2008, 'Chevrolet', 'Silverado' union all select
2008, 'Chevrolet', 'Impala' union all select
2008, 'Chevrolet', 'Suburban' union all select
2008, 'Chevrolet', 'Equinox' union all select
2008, 'Chevrolet', 'Aveo' union all select
2008, 'Chevrolet', 'Uplander' union all select
2008, 'Chevrolet', 'Express' union all select
2008, 'Chevrolet', 'Express 1500' union all select
2008, 'Chevrolet', 'Express 2500' union all select
2008, 'Chevrolet', 'Express 3500' union all select
2008, 'Chevrolet', 'Silverado 1500' union all select
2008, 'Chevrolet', 'Silverado 2500' union all select
2008, 'Chevrolet', 'Silverado 3500' union all select
2008, 'Chevrolet', 'Suburban 1500' union all select
2008, 'Chevrolet', 'Suburban 2500' union all select
2008, 'Dodge', 'Ram' union all select
2008, 'Dodge', 'Nitro' union all select
2008, 'Dodge', 'Sprinter' union all select
2008, 'Dodge', 'Avenger' union all select
2008, 'Dodge', 'Dakota' union all select
2008, 'Dodge', 'Charger' union all select
2008, 'Dodge', 'Viper' union all select
2008, 'Dodge', 'Challenger' union all select
2008, 'Dodge', 'Caliber' union all select
2008, 'Dodge', 'Caravan' union all select
2008, 'Dodge', 'Magnum' union all select
2008, 'Dodge', 'Durango' union all select
2008, 'Dodge', 'Grand Caravan' union all select
2008, 'Dodge', 'Ram 1500' union all select
2008, 'Dodge', 'Ram 2500' union all select
2008, 'Dodge', 'Ram 3500' union all select
2008, 'Mercury', 'Sable' union all select
2008, 'Mercury', 'Grand Marquis' union all select
2008, 'Mercury', 'Milan' union all select
2008, 'Mercury', 'Mariner' union all select
2008, 'Mercury', 'Mountaineer' union all select
2008, 'Aston Martin', 'DB9' union all select
2008, 'Aston Martin', 'DBS' union all select
2008, 'Aston Martin', 'V8 Vantage' union all select
2008, 'Aston Martin', 'Vantage' union all select
2008, 'Jaguar', 'XK' union all select
2008, 'Jaguar', 'S-Type' union all select
2008, 'Jaguar', 'X-Type' union all select
2008, 'Jaguar', 'XJ' union all select
2008, 'Kia', 'Amanti' union all select
2008, 'Kia', 'Carens' union all select
2008, 'Kia', 'Spectra' union all select
2008, 'Kia', 'Sportage' union all select
2008, 'Kia', 'Rio5' union all select
2008, 'Kia', 'Rio' union all select
2008, 'Kia', 'Sorento' union all select
2008, 'Kia', 'Sedona' union all select
2008, 'Kia', 'Optima' union all select
2008, 'Kia', 'Rondo' union all select
2008, 'Saturn', 'Astra' union all select
2008, 'Saturn', 'VUE' union all select
2008, 'Saturn', 'Aura' union all select
2008, 'Saturn', 'Sky' union all select
2008, 'Saturn', 'Outlook' union all select
2008, 'Isuzu', 'i-Series' union all select
2008, 'Isuzu', 'Ascender' union all select
2008, 'Isuzu', 'i-290' union all select
2008, 'Isuzu', 'i-370' union all select
2008, 'Pontiac', 'G6' union all select
2008, 'Pontiac', 'Solstice' union all select
2008, 'Pontiac', 'Torrent' union all select
2008, 'Pontiac', 'G5' union all select
2008, 'Pontiac', 'G8' union all select
2008, 'Pontiac', 'Grand Prix' union all select
2008, 'Pontiac', 'Vibe' union all select
2008, 'Morgan', 'Aero 8' union all select
2008, 'Acura', 'RDX' union all select
2008, 'Acura', 'TSX' union all select
2008, 'Acura', 'TL' union all select
2008, 'Acura', 'MDX' union all select
2008, 'Acura', 'RL' union all select
2008, 'Ferrari', '599 GTB Fiorano' union all select
2008, 'Ferrari', 'F430' union all select
2008, 'Ferrari', '430 Scuderia' union all select
2008, 'Ferrari', '612 Scaglietti' union all select
2008, 'MINI', 'Cooper' union all select
2008, 'MINI', 'Clubman' union all select
2008, 'MINI', 'Cooper Clubman' union all select
2008, 'Hummer', 'H2' union all select
2008, 'Hummer', 'H3' union all select
2008, 'Buick', 'Enclave' union all select
2008, 'Buick', 'Lucerne' union all select
2008, 'Buick', 'LaCrosse' union all select
2008, 'Panoz', 'Esperante' union all select
2008, 'Aptera', 'Typ-1' union all select
2008, 'Maybach', '57' union all select
2008, 'Maybach', '62' union all select
2008, 'Maserati', 'GranTurismo' union all select
2008, 'Maserati', 'Quattroporte' union all select
2008, 'Smart', 'Fortwo' union all select
2008, 'Scion', 'tC' union all select
2008, 'Scion', 'xB' union all select
2008, 'Scion', 'xD' union all select
2008, 'Lotus', 'Elise' union all select
2008, 'Lotus', 'Exige' union all select
2009, 'Mercedes-Benz', 'E-Class' union all select
2009, 'Mercedes-Benz', 'SL-Class' union all select
2009, 'Mercedes-Benz', 'GL-Class' union all select
2009, 'Mercedes-Benz', 'CLK-Class' union all select
2009, 'Mercedes-Benz', 'S-Class' union all select
2009, 'Mercedes-Benz', 'CLS-Class' union all select
2009, 'Mercedes-Benz', 'CL-Class' union all select
2009, 'Mercedes-Benz', 'C-Class' union all select
2009, 'Mercedes-Benz', 'SLK55 AMG' union all select
2009, 'Mercedes-Benz', 'R-Class' union all select
2009, 'Mercedes-Benz', 'M-Class' union all select
2009, 'Mercedes-Benz', 'CL65 AMG' union all select
2009, 'Mercedes-Benz', 'SLK-Class' union all select
2009, 'Mercedes-Benz', 'SLR McLaren' union all select
2009, 'Mercedes-Benz', 'G-Class' union all select
2009, 'Saab', '9-5' union all select
2009, 'Saab', '9-3' union all select
2009, 'Saab', '9-7X' union all select
2009, 'Audi', 'A4' union all select
2009, 'Audi', 'S5' union all select
2009, 'Audi', 'A3' union all select
2009, 'Audi', 'R8' union all select
2009, 'Audi', 'TT' union all select
2009, 'Audi', 'A6' union all select
2009, 'Audi', 'S6' union all select
2009, 'Audi', 'A8' union all select
2009, 'Audi', 'Q7' union all select
2009, 'Audi', 'S8' union all select
2009, 'Audi', 'S4' union all select
2009, 'Audi', 'A5' union all select
2009, 'Audi', 'Q5' union all select
2009, 'Honda', 'Civic' union all select
2009, 'Honda', 'Ridgeline' union all select
2009, 'Honda', 'CR-V' union all select
2009, 'Honda', 'S2000' union all select
2009, 'Honda', 'Accord' union all select
2009, 'Honda', 'Fit' union all select
2009, 'Honda', 'Pilot' union all select
2009, 'Honda', 'Element' union all select
2009, 'Honda', 'Odyssey' union all select
2009, 'Hyundai', 'Santa Fe' union all select
2009, 'Hyundai', 'Accent' union all select
2009, 'Hyundai', 'Tucson' union all select
2009, 'Hyundai', 'Entourage' union all select
2009, 'Hyundai', 'Veracruz' union all select
2009, 'Hyundai', 'Elantra' union all select
2009, 'Hyundai', 'Tiburon' union all select
2009, 'Hyundai', 'Sonata' union all select
2009, 'Hyundai', 'Genesis' union all select
2009, 'Hyundai', 'Azera' union all select
2009, 'Hummer', 'H3' union all select
2009, 'Hummer', 'H2' union all select
2009, 'HUMMER', 'H3T' union all select
2009, 'Subaru', 'Outback' union all select
2009, 'Subaru', 'Impreza' union all select
2009, 'Subaru', 'Tribeca' union all select
2009, 'Subaru', 'Forester' union all select
2009, 'Subaru', 'Legacy' union all select
2009, 'BMW', '1 Series' union all select
2009, 'BMW', '3 Series' union all select
2009, 'BMW', '5 Series' union all select
2009, 'BMW', '6 Series' union all select
2009, 'BMW', '7 Series' union all select
2009, 'BMW', 'Z4 M Roadster' union all select
2009, 'BMW', 'Z4 M' union all select
2009, 'BMW', 'M3' union all select
2009, 'BMW', 'M5' union all select
2009, 'BMW', 'M6' union all select
2009, 'BMW', 'X3' union all select
2009, 'BMW', 'X6' union all select
2009, 'BMW', 'X5' union all select
2009, 'BMW', 'Z4' union all select
2009, 'Chevrolet', 'Aveo' union all select
2009, 'Chevrolet', 'Corvette' union all select
2009, 'Chevrolet', 'HHR' union all select
2009, 'Chevrolet', 'Cobalt' union all select
2009, 'Chevrolet', 'Cobalt SS' union all select
2009, 'Chevrolet', 'Silverado' union all select
2009, 'Chevrolet', 'Tahoe' union all select
2009, 'Chevrolet', 'Trailblazer' union all select
2009, 'Chevrolet', 'Express' union all select
2009, 'Chevrolet', 'Equinox' union all select
2009, 'Chevrolet', 'Suburban' union all select
2009, 'Chevrolet', 'Colorado' union all select
2009, 'Chevrolet', 'Traverse' union all select
2009, 'Chevrolet', 'Malibu' union all select
2009, 'Chevrolet', 'Avalanche' union all select
2009, 'Chevrolet', 'Impala' union all select
2009, 'Chevrolet', 'Express 1500' union all select
2009, 'Chevrolet', 'Express 2500' union all select
2009, 'Chevrolet', 'Express 3500' union all select
2009, 'Chevrolet', 'Silverado 1500' union all select
2009, 'Chevrolet', 'Silverado 2500' union all select
2009, 'Chevrolet', 'Silverado 3500' union all select
2009, 'Chevrolet', 'Suburban 1500' union all select
2009, 'Chevrolet', 'Suburban 2500' union all select
2009, 'Volkswagen', 'Passat' union all select
2009, 'Volkswagen', 'R32' union all select
2009, 'Volkswagen', 'CC' union all select
2009, 'Volkswagen', 'GLI' union all select
2009, 'Volkswagen', 'Eos' union all select
2009, 'Volkswagen', 'Jetta' union all select
2009, 'Volkswagen', 'GTI' union all select
2009, 'Volkswagen', 'New Beetle' union all select
2009, 'Volkswagen', 'Touareg' union all select
2009, 'Volkswagen', 'Rabbit' union all select
2009, 'Volkswagen', 'Tiguan' union all select
2009, 'Volkswagen', 'Routan' union all select
2009, 'Volkswagen', 'Touareg 2' union all select
2009, 'Mazda', 'Mazdaspeed 3' union all select
2009, 'Mazda', 'Mazda3' union all select
2009, 'Mazda', 'B-Series' union all select
2009, 'Mazda', 'Tribute' union all select
2009, 'Mazda', 'CX-9' union all select
2009, 'Mazda', 'MX-5' union all select
2009, 'Mazda', 'Mazda6' union all select
2009, 'Mazda', 'RX-8' union all select
2009, 'Mazda', 'CX-7' union all select
2009, 'Mazda', 'Mazda5' union all select
2009, 'Mazda', 'Miata MX-5' union all select
2009, 'GMC', 'Sierra' union all select
2009, 'GMC', 'Savana' union all select
2009, 'GMC', 'Yukon' union all select
2009, 'GMC', 'Canyon' union all select
2009, 'GMC', 'Acadia' union all select
2009, 'GMC', 'Envoy' union all select
2009, 'GMC', 'Savana 1500' union all select
2009, 'GMC', 'Savana 2500' union all select
2009, 'GMC', 'Savana 3500' union all select
2009, 'GMC', 'Sierra 1500' union all select
2009, 'GMC', 'Sierra 2500' union all select
2009, 'GMC', 'Sierra 3500' union all select
2009, 'GMC', 'Yukon XL 1500' union all select
2009, 'GMC', 'Yukon XL 2500' union all select
2009, 'Kia', 'Carens' union all select
2009, 'Kia', 'Spectra' union all select
2009, 'Kia', 'Optima' union all select
2009, 'Kia', 'Rio' union all select
2009, 'Kia', 'Amanti' union all select
2009, 'Kia', 'Sorento' union all select
2009, 'Kia', 'Sedona' union all select
2009, 'Kia', 'Mohave/Borrego' union all select
2009, 'Kia', 'Sportage' union all select
2009, 'Kia', 'Borrego' union all select
2009, 'Kia', 'Rondo' union all select
2009, 'Infiniti', 'M' union all select
2009, 'Infiniti', 'QX56' union all select
2009, 'Infiniti', 'EX' union all select
2009, 'Infiniti', 'FX' union all select
2009, 'Infiniti', 'G37' union all select
2009, 'Infiniti', 'G' union all select
2009, 'Infiniti', 'QX' union all select
2009, 'Scion', 'xB' union all select
2009, 'Scion', 'xD' union all select
2009, 'Scion', 'tC' union all select
2009, 'Volvo', 'V70' union all select
2009, 'Volvo', 'XC60' union all select
2009, 'Volvo', 'C30' union all select
2009, 'Volvo', 'S80' union all select
2009, 'Volvo', 'XC70' union all select
2009, 'Volvo', 'S40' union all select
2009, 'Volvo', 'XC90' union all select
2009, 'Volvo', 'S60' union all select
2009, 'Volvo', 'V50' union all select
2009, 'Volvo', 'C70' union all select
2009, 'Toyota', 'Highlander' union all select
2009, 'Toyota', 'Land Cruiser' union all select
2009, 'Toyota', 'Camry' union all select
2009, 'Toyota', 'Corolla' union all select
2009, 'Toyota', 'Tacoma' union all select
2009, 'Toyota', 'RAV4' union all select
2009, 'Toyota', 'Sequoia' union all select
2009, 'Toyota', 'FJ Cruiser' union all select
2009, 'Toyota', 'Venza' union all select
2009, 'Toyota', 'Prius' union all select
2009, 'Toyota', 'Sienna' union all select
2009, 'Toyota', 'Avalon' union all select
2009, 'Toyota', 'Camry Hybrid' union all select
2009, 'Toyota', 'Yaris' union all select
2009, 'Toyota', 'Matrix' union all select
2009, 'Toyota', '4Runner' union all select
2009, 'Toyota', 'TundraMax' union all select
2009, 'Toyota', 'Tundra' union all select
2009, 'Lexus', 'IS-F' union all select
2009, 'Lexus', 'RX' union all select
2009, 'Lexus', 'LS' union all select
2009, 'Lexus', 'GX' union all select
2009, 'Lexus', 'IS' union all select
2009, 'Lexus', 'LX' union all select
2009, 'Lexus', 'ES' union all select
2009, 'Lexus', 'GS' union all select
2009, 'Lexus', 'SC' union all select
2009, 'Lexus', 'IS F' union all select
2009, 'Cadillac', 'Escalade' union all select
2009, 'Cadillac', 'DTS' union all select
2009, 'Cadillac', 'CTS-V' union all select
2009, 'Cadillac', 'SRX' union all select
2009, 'Cadillac', 'STS' union all select
2009, 'Cadillac', 'XLR' union all select
2009, 'Cadillac', 'CTS' union all select
2009, 'Cadillac', 'STS-V' union all select
2009, 'Cadillac', 'XLR-V' union all select
2009, 'Cadillac', 'Escalade ESV' union all select
2009, 'Cadillac', 'Escalade EXT' union all select
2009, 'Lamborghini', 'Gallardo' union all select
2009, 'Lamborghini', 'Murcielago' union all select
2009, 'Buick', 'LaCrosse' union all select
2009, 'Buick', 'Lucerne' union all select
2009, 'Buick', 'Enclave' union all select
2009, 'Pontiac', 'G8' union all select
2009, 'Pontiac', 'G6' union all select
2009, 'Pontiac', 'G5' union all select
2009, 'Pontiac', 'G3' union all select
2009, 'Pontiac', 'Torrent' union all select
2009, 'Pontiac', 'Vibe' union all select
2009, 'Pontiac', 'Solstice' union all select
2009, 'Ferrari', '612 Scaglietti' union all select
2009, 'Ferrari', '430 Scuderia' union all select
2009, 'Ferrari', 'California' union all select
2009, 'Ferrari', '599 GTB Fiorano' union all select
2009, 'Ferrari', 'F430' union all select
2009, 'Acura', 'TL' union all select
2009, 'Acura', 'RDX' union all select
2009, 'Acura', 'TSX' union all select
2009, 'Acura', 'RL' union all select
2009, 'Acura', 'MDX' union all select
2009, 'Maybach', '57' union all select
2009, 'Maybach', '62' union all select
2009, 'Maybach', 'Landaulet' union all select
2009, 'Dodge', 'Challenger' union all select
2009, 'Dodge', 'Charger' union all select
2009, 'Dodge', 'Ram' union all select
2009, 'Dodge', 'Caliber' union all select
2009, 'Dodge', 'Nitro' union all select
2009, 'Dodge', 'Durango' union all select
2009, 'Dodge', 'Journey' union all select
2009, 'Dodge', 'Sprinter' union all select
2009, 'Dodge', 'Avenger' union all select
2009, 'Dodge', 'Viper' union all select
2009, 'Dodge', 'Caravan' union all select
2009, 'Dodge', 'Dakota' union all select
2009, 'Dodge', 'Grand Caravan' union all select
2009, 'Dodge', 'Ram 1500' union all select
2009, 'Dodge', 'Ram 2500' union all select
2009, 'Dodge', 'Ram 3500' union all select
2009, 'Nissan', 'Frontier' union all select
2009, 'Nissan', 'Versa' union all select
2009, 'Nissan', 'Pathfinder' union all select
2009, 'Nissan', '350Z' union all select
2009, 'Nissan', 'Murano' union all select
2009, 'Nissan', 'Altima' union all select
2009, 'Nissan', 'Xterra' union all select
2009, 'Nissan', 'Rogue' union all select
2009, 'Nissan', 'Quest' union all select
2009, 'Nissan', 'Cube' union all select
2009, 'Nissan', 'GT-R' union all select
2009, 'Nissan', 'Maxima' union all select
2009, 'Nissan', 'Titan' union all select
2009, 'Nissan', 'Armada' union all select
2009, 'Nissan', '370Z' union all select
2009, 'Nissan', 'Sentra' union all select
2009, 'Land Rover', 'Range Rover' union all select
2009, 'Land Rover', 'Freelander' union all select
2009, 'Land Rover', 'Range Rover Sport' union all select
2009, 'Land Rover', 'LR2' union all select
2009, 'Land Rover', 'LR3' union all select
2009, 'Chrysler', '300' union all select
2009, 'Chrysler', 'Sebring' union all select
2009, 'Chrysler', 'Aspen' union all select
2009, 'Chrysler', 'Town & Country' union all select
2009, 'Chrysler', 'PT Cruiser' union all select
2009, 'Ford', 'E-Series' union all select
2009, 'Ford', 'F-Series Super Duty' union all select
2009, 'Ford', 'Fusion' union all select
2009, 'Ford', 'Escape' union all select
2009, 'Ford', 'Focus' union all select
2009, 'Ford', 'Ranger' union all select
2009, 'Ford', 'GT500' union all select
2009, 'Ford', 'Taurus' union all select
2009, 'Ford', 'Crown Victoria' union all select
2009, 'Ford', 'Taurus X' union all select
2009, 'Ford', 'Explorer Sport Trac' union all select
2009, 'Ford', 'Edge' union all select
2009, 'Ford', 'Expedition' union all select
2009, 'Ford', 'F-Series' union all select
2009, 'Ford', 'Mustang' union all select
2009, 'Ford', 'Flex' union all select
2009, 'Ford', 'Explorer' union all select
2009, 'Ford', 'E150' union all select
2009, 'Ford', 'E250' union all select
2009, 'Ford', 'E350' union all select
2009, 'Ford', 'Expedition EL' union all select
2009, 'Ford', 'F150' union all select
2009, 'Ford', 'F250' union all select
2009, 'Ford', 'F350' union all select
2009, 'Ford', 'F450' union all select
2009, 'Bentley', 'Continental GT' union all select
2009, 'Bentley', 'Arnage' union all select
2009, 'Bentley', 'Brooklands' union all select
2009, 'Bentley', 'Azure' union all select
2009, 'Bentley', 'Continental GTC' union all select
2009, 'Bentley', 'Continental Flying Spur' union all select
2009, 'Bentley', 'Continental' union all select
2009, 'Morgan', 'Aero 8' union all select
2009, 'Suzuki', 'SX4' union all select
2009, 'Suzuki', 'Equator' union all select
2009, 'Suzuki', 'Grand Vitara' union all select
2009, 'Suzuki', 'XL7' union all select
2009, 'Mitsubishi', 'Raider' union all select
2009, 'Mitsubishi', 'Galant' union all select
2009, 'Mitsubishi', 'Tundra' union all select
2009, 'Mitsubishi', 'Endeavor' union all select
2009, 'Mitsubishi', 'Eclipse' union all select
2009, 'Mitsubishi', 'Lancer' union all select
2009, 'Mitsubishi', 'Outlander' union all select
2009, 'Lotus', 'Exige' union all select
2009, 'Lotus', 'Elise' union all select
2009, 'Jeep', 'Wrangler' union all select
2009, 'Jeep', 'Patriot' union all select
2009, 'Jeep', 'Compass' union all select
2009, 'Jeep', 'Grand Cherokee' union all select
2009, 'Jeep', 'Commander' union all select
2009, 'Jeep', 'Liberty' union all select
2009, 'Mercury', 'Mariner' union all select
2009, 'Mercury', 'Grand Marquis' union all select
2009, 'Mercury', 'Mountaineer' union all select
2009, 'Mercury', 'Milan' union all select
2009, 'Mercury', 'Sable' union all select
2009, 'Lincoln', 'Town Car' union all select
2009, 'Lincoln', 'Navigator' union all select
2009, 'Lincoln', 'MKS' union all select
2009, 'Lincoln', 'MKZ' union all select
2009, 'Lincoln', 'MKX' union all select
2009, 'Lincoln', 'Navigator L' union all select
2009, 'Jaguar', 'XJ' union all select
2009, 'Jaguar', 'XK' union all select
2009, 'Jaguar', 'XF' union all select
2009, 'Maserati', 'Quattroporte' union all select
2009, 'Maserati', 'GranTurismo' union all select
2009, 'Smart', 'Fortwo' union all select
2009, 'Saturn', 'Outlook' union all select
2009, 'Saturn', 'Aura' union all select
2009, 'Saturn', 'VUE' union all select
2009, 'Saturn', 'Astra' union all select
2009, 'Saturn', 'Sky' union all select
2009, 'Porsche', '911' union all select
2009, 'Porsche', 'Cayenne' union all select
2009, 'Porsche', 'Boxster' union all select
2009, 'Porsche', 'Cayman' union all select
2009, 'Isuzu', 'Ascender' union all select
2009, 'MINI', 'Cooper' union all select
2009, 'MINI', 'Clubman' union all select
2009, 'MINI', 'Cooper Clubman' union all select
2009, 'Aptera', '2e' union all select
2009, 'Aptera', 'Typ-1' union all select
2009, 'Rolls-Royce', 'Phantom' union all select
2009, 'Bugatti', 'Veyron' union all select
2009, 'Aston Martin', 'DBS' union all select
2009, 'Aston Martin', 'V8 Vantage' union all select
2009, 'Aston Martin', 'DB9' union all select
2009, 'Aston Martin', 'Vantage' union all select
2010, 'BMW', '1 Series' union all select
2010, 'BMW', '3 Series' union all select
2010, 'BMW', '5 Series' union all select
2010, 'BMW', '6 Series' union all select
2010, 'BMW', '7 Series' union all select
2010, 'BMW', 'M3' union all select
2010, 'BMW', 'X6' union all select
2010, 'BMW', 'M6' union all select
2010, 'BMW', 'Z4' union all select
2010, 'BMW', 'X3' union all select
2010, 'BMW', 'X5' union all select
2010, 'BMW', 'M5' union all select
2010, 'BMW', 'X5 M' union all select
2010, 'BMW', 'X6 M' union all select
2010, 'Honda', 'CR-V' union all select
2010, 'Honda', 'Civic' union all select
2010, 'Honda', 'Ridgeline' union all select
2010, 'Honda', 'Accord' union all select
2010, 'Honda', 'Odyssey' union all select
2010, 'Honda', 'Pilot' union all select
2010, 'Honda', 'Insight' union all select
2010, 'Honda', 'Fit' union all select
2010, 'Honda', 'Element' union all select
2010, 'Honda', 'Accord Crosstour' union all select
2010, 'Volkswagen', 'Jetta' union all select
2010, 'Volkswagen', 'Passat' union all select
2010, 'Volkswagen', 'Routan' union all select
2010, 'Volkswagen', 'Eos' union all select
2010, 'Volkswagen', 'Touareg' union all select
2010, 'Volkswagen', 'Rabbit' union all select
2010, 'Volkswagen', 'GTI' union all select
2010, 'Volkswagen', 'CC' union all select
2010, 'Volkswagen', 'Tiguan' union all select
2010, 'Volkswagen', 'Golf' union all select
2010, 'Volkswagen', 'New Beetle' union all select
2010, 'Mercedes-Benz', 'SLK-Class' union all select
2010, 'Mercedes-Benz', 'Sprinter' union all select
2010, 'Mercedes-Benz', 'G-Class' union all select
2010, 'Mercedes-Benz', 'CLS-Class' union all select
2010, 'Mercedes-Benz', 'C-Class' union all select
2010, 'Mercedes-Benz', 'E-Class' union all select
2010, 'Mercedes-Benz', 'GL-Class' union all select
2010, 'Mercedes-Benz', 'GLK-Class' union all select
2010, 'Mercedes-Benz', 'CL-Class' union all select
2010, 'Mercedes-Benz', 'R-Class' union all select
2010, 'Mercedes-Benz', 'S-Class' union all select
2010, 'Mercedes-Benz', 'M-Class' union all select
2010, 'Aston Martin', 'Rapide' union all select
2010, 'Aston Martin', 'V8 Vantage' union all select
2010, 'Aston Martin', 'DBS' union all select
2010, 'Aston Martin', 'DB9' union all select
2010, 'Aston Martin', 'Vantage' union all select
2010, 'Nissan', 'Altima' union all select
2010, 'Nissan', 'Pathfinder' union all select
2010, 'Nissan', 'Armada' union all select
2010, 'Nissan', '370Z' union all select
2010, 'Nissan', 'Frontier' union all select
2010, 'Nissan', 'GT-R' union all select
2010, 'Nissan', 'Xterra' union all select
2010, 'Nissan', 'Rogue' union all select
2010, 'Nissan', 'Versa' union all select
2010, 'Nissan', 'Sentra' union all select
2010, 'Nissan', 'Cube' union all select
2010, 'Nissan', 'Murano' union all select
2010, 'Nissan', 'Maxima' union all select
2010, 'Nissan', 'Titan' union all select
2010, 'Hyundai', 'Santa Fe' union all select
2010, 'Hyundai', 'Veracruz' union all select
2010, 'Hyundai', 'Tucson' union all select
2010, 'Hyundai', 'Accent' union all select
2010, 'Hyundai', 'Sonata' union all select
2010, 'Hyundai', 'Elantra' union all select
2010, 'Hyundai', 'Genesis' union all select
2010, 'Hyundai', 'Azera' union all select
2010, 'Hyundai', 'Genesis Coupe' union all select
2010, 'Porsche', '911' union all select
2010, 'Porsche', 'Panamera' union all select
2010, 'Porsche', 'Cayman' union all select
2010, 'Porsche', 'Cayenne' union all select
2010, 'Porsche', 'Boxster' union all select
2010, 'Mercury', 'Milan' union all select
2010, 'Mercury', 'Mariner' union all select
2010, 'Mercury', 'Grand Marquis' union all select
2010, 'Mercury', 'Mountaineer' union all select
2010, 'Land Rover', 'Freelander' union all select
2010, 'Land Rover', 'Range Rover Sport' union all select
2010, 'Land Rover', 'Discovery' union all select
2010, 'Land Rover', 'Range Rover' union all select
2010, 'Land Rover', 'LR2' union all select
2010, 'Land Rover', 'LR4' union all select
2010, 'Mazda', 'CX-9' union all select
2010, 'Mazda', 'Mazdaspeed 3' union all select
2010, 'Mazda', 'RX-8' union all select
2010, 'Mazda', 'CX-7' union all select
2010, 'Mazda', 'Tribute' union all select
2010, 'Mazda', 'Mazda3' union all select
2010, 'Mazda', 'Mazda6' union all select
2010, 'Mazda', 'Mazda5' union all select
2010, 'Mazda', 'MX-5' union all select
2010, 'Mazda', 'Miata MX-5' union all select
2010, 'Toyota', 'Tundra' union all select
2010, 'Toyota', 'Camry Hybrid' union all select
2010, 'Toyota', 'Avalon' union all select
2010, 'Toyota', 'Sienna' union all select
2010, 'Toyota', 'FJ Cruiser' union all select
2010, 'Toyota', 'Matrix' union all select
2010, 'Toyota', 'RAV4' union all select
2010, 'Toyota', 'Highlander' union all select
2010, 'Toyota', 'Yaris' union all select
2010, 'Toyota', 'Camry' union all select
2010, 'Toyota', 'Venza' union all select
2010, 'Toyota', 'Tacoma' union all select
2010, 'Toyota', 'Prius' union all select
2010, 'Toyota', 'Sequoia' union all select
2010, 'Toyota', '4Runner' union all select
2010, 'Toyota', 'Land Cruiser' union all select
2010, 'Toyota', 'Corolla' union all select
2010, 'Toyota', 'TundraMax' union all select
2010, 'Kia', 'Soul' union all select
2010, 'Kia', 'Optima' union all select
2010, 'Kia', 'Sportage' union all select
2010, 'Kia', 'Sedona' union all select
2010, 'Kia', 'Forte' union all select
2010, 'Kia', 'Rio' union all select
2010, 'Kia', 'Rondo' union all select
2010, 'Infiniti', 'QX56' union all select
2010, 'Infiniti', 'M' union all select
2010, 'Infiniti', 'G37' union all select
2010, 'Infiniti', 'EX' union all select
2010, 'Infiniti', 'FX' union all select
2010, 'Infiniti', 'G' union all select
2010, 'Infiniti', 'QX' union all select
2010, 'Chevrolet', 'Aveo' union all select
2010, 'Chevrolet', 'Traverse' union all select
2010, 'Chevrolet', 'Equinox' union all select
2010, 'Chevrolet', 'Silverado' union all select
2010, 'Chevrolet', 'HHR' union all select
2010, 'Chevrolet', 'Express' union all select
2010, 'Chevrolet', 'Corvette' union all select
2010, 'Chevrolet', 'Impala' union all select
2010, 'Chevrolet', 'Colorado' union all select
2010, 'Chevrolet', 'Suburban' union all select
2010, 'Chevrolet', 'Tahoe' union all select
2010, 'Chevrolet', 'Avalanche' union all select
2010, 'Chevrolet', 'Malibu' union all select
2010, 'Chevrolet', 'Camaro' union all select
2010, 'Chevrolet', 'Cobalt' union all select
2010, 'Chevrolet', 'Express 1500' union all select
2010, 'Chevrolet', 'Express 2500' union all select
2010, 'Chevrolet', 'Express 3500' union all select
2010, 'Chevrolet', 'Silverado 1500' union all select
2010, 'Chevrolet', 'Silverado 2500' union all select
2010, 'Chevrolet', 'Silverado 3500' union all select
2010, 'Chevrolet', 'Suburban 1500' union all select
2010, 'Chevrolet', 'Suburban 2500' union all select
2010, 'Subaru', 'Impreza' union all select
2010, 'Subaru', 'Tribeca' union all select
2010, 'Subaru', 'Legacy' union all select
2010, 'Subaru', 'Forester' union all select
2010, 'Subaru', 'Impreza WRX' union all select
2010, 'Subaru', 'Outback' union all select
2010, 'Maybach', '57' union all select
2010, 'Maybach', '62' union all select
2010, 'Maybach', 'Landaulet' union all select
2010, 'Cadillac', 'Escalade' union all select
2010, 'Cadillac', 'SRX' union all select
2010, 'Cadillac', 'DTS' union all select
2010, 'Cadillac', 'CTS-V' union all select
2010, 'Cadillac', 'CTS' union all select
2010, 'Cadillac', 'STS' union all select
2010, 'Cadillac', 'Escalade ESV' union all select
2010, 'Cadillac', 'Escalade EXT' union all select
2010, 'Audi', 'Q7' union all select
2010, 'Audi', 'Q5' union all select
2010, 'Audi', 'S5' union all select
2010, 'Audi', 'TT' union all select
2010, 'Audi', 'A4' union all select
2010, 'Audi', 'A5' union all select
2010, 'Audi', 'A8' union all select
2010, 'Audi', 'R8' union all select
2010, 'Audi', 'S4' union all select
2010, 'Audi', 'A6' union all select
2010, 'Audi', 'A3' union all select
2010, 'Audi', 'S6' union all select
2010, 'Lincoln', 'Town Car' union all select
2010, 'Lincoln', 'MKX' union all select
2010, 'Lincoln', 'Navigator' union all select
2010, 'Lincoln', 'MKZ' union all select
2010, 'Lincoln', 'MKT' union all select
2010, 'Lincoln', 'MKS' union all select
2010, 'Lincoln', 'Navigator L' union all select
2010, 'Rolls-Royce', 'Phantom' union all select
2010, 'Rolls-Royce', 'Ghost' union all select
2010, 'Ford', 'Escape' union all select
2010, 'Ford', 'Mustang' union all select
2010, 'Ford', 'Transit Connect' union all select
2010, 'Ford', 'F-Series Super Duty' union all select
2010, 'Ford', 'E-Series' union all select
2010, 'Ford', 'Focus' union all select
2010, 'Ford', 'Explorer' union all select
2010, 'Ford', 'Flex' union all select
2010, 'Ford', 'Edge' union all select
2010, 'Ford', 'F-Series' union all select
2010, 'Ford', 'Fusion' union all select
2010, 'Ford', 'Crown Victoria' union all select
2010, 'Ford', 'Ranger' union all select
2010, 'Ford', 'Taurus' union all select
2010, 'Ford', 'Expedition' union all select
2010, 'Ford', 'E150' union all select
2010, 'Ford', 'E250' union all select
2010, 'Ford', 'E350' union all select
2010, 'Ford', 'Expedition EL' union all select
2010, 'Ford', 'Explorer Sport Trac' union all select
2010, 'Ford', 'F150' union all select
2010, 'Ford', 'F250' union all select
2010, 'Ford', 'F350' union all select
2010, 'Ford', 'F450' union all select
2010, 'Dodge', 'Caravan' union all select
2010, 'Dodge', 'Viper' union all select
2010, 'Dodge', 'Charger' union all select
2010, 'Dodge', 'Journey' union all select
2010, 'Dodge', 'Caliber' union all select
2010, 'Dodge', 'Ram' union all select
2010, 'Dodge', 'Challenger' union all select
2010, 'Dodge', 'Nitro' union all select
2010, 'Dodge', 'Avenger' union all select
2010, 'Dodge', 'Dakota' union all select
2010, 'Dodge', 'Grand Caravan' union all select
2010, 'Dodge', 'Ram 1500' union all select
2010, 'Dodge', 'Ram 2500' union all select
2010, 'Dodge', 'Ram 3500' union all select
2010, 'Lexus', 'LS' union all select
2010, 'Lexus', 'GS' union all select
2010, 'Lexus', 'IS' union all select
2010, 'Lexus', 'IS-F' union all select
2010, 'Lexus', 'LS Hybrid' union all select
2010, 'Lexus', 'LX' union all select
2010, 'Lexus', 'RX Hybrid' union all select
2010, 'Lexus', 'HS' union all select
2010, 'Lexus', 'GX' union all select
2010, 'Lexus', 'RX' union all select
2010, 'Lexus', 'ES' union all select
2010, 'Lexus', 'IS F' union all select
2010, 'Lexus', 'SC' union all select
2010, 'Mitsubishi', 'Lancer Evolution' union all select
2010, 'Mitsubishi', 'Eclipse' union all select
2010, 'Mitsubishi', 'Lancer' union all select
2010, 'Mitsubishi', 'Galant' union all select
2010, 'Mitsubishi', 'Endeavor' union all select
2010, 'Mitsubishi', 'Outlander' union all select
2010, 'Ferrari', '458 Italia' union all select
2010, 'Ferrari', 'California' union all select
2010, 'Ferrari', '612 Scaglietti' union all select
2010, 'Ferrari', '599 GTB Fiorano' union all select
2010, 'Maserati', 'Quattroporte' union all select
2010, 'Maserati', 'GranTurismo' union all select
2010, 'Scion', 'xB' union all select
2010, 'Scion', 'tC' union all select
2010, 'Scion', 'xD' union all select
2010, 'Volvo', 'C30' union all select
2010, 'Volvo', 'S40' union all select
2010, 'Volvo', 'V50' union all select
2010, 'Volvo', 'XC90' union all select
2010, 'Volvo', 'S60' union all select
2010, 'Volvo', 'C70' union all select
2010, 'Volvo', 'XC70' union all select
2010, 'Volvo', 'S80' union all select
2010, 'Volvo', 'XC60' union all select
2010, 'Volvo', 'V70' union all select
2010, 'Jeep', 'Grand Cherokee' union all select
2010, 'Jeep', 'Commander' union all select
2010, 'Jeep', 'Patriot' union all select
2010, 'Jeep', 'Compass' union all select
2010, 'Jeep', 'Liberty' union all select
2010, 'Jeep', 'Wrangler' union all select
2010, 'Lotus', 'Exige' union all select
2010, 'Lotus', 'Elise' union all select
2010, 'Lotus', 'Evora' union all select
2010, 'Chrysler', '300' union all select
2010, 'Chrysler', 'Sebring' union all select
2010, 'Chrysler', 'Town & Country' union all select
2010, 'Chrysler', 'PT Cruiser' union all select
2010, 'GMC', 'Savana' union all select
2010, 'GMC', 'Sierra' union all select
2010, 'GMC', 'Canyon' union all select
2010, 'GMC', 'Terrain' union all select
2010, 'GMC', 'Yukon' union all select
2010, 'GMC', 'Acadia' union all select
2010, 'GMC', 'Savana 1500' union all select
2010, 'GMC', 'Savana 2500' union all select
2010, 'GMC', 'Savana 3500' union all select
2010, 'GMC', 'Sierra 1500' union all select
2010, 'GMC', 'Sierra 2500' union all select
2010, 'GMC', 'Sierra 3500' union all select
2010, 'GMC', 'Yukon XL 1500' union all select
2010, 'GMC', 'Yukon XL 2500' union all select
2010, 'Jaguar', 'XF' union all select
2010, 'Jaguar', 'XK' union all select
2010, 'Jaguar', 'XJ' union all select
2010, 'Bentley', 'Brooklands' union all select
2010, 'Bentley', 'Azure' union all select
2010, 'Bentley', 'Continental Flying Spur' union all select
2010, 'Bentley', 'Continental Super' union all select
2010, 'Bentley', 'Continental GT' union all select
2010, 'Bentley', 'Continental GTC' union all select
2010, 'Bentley', 'Azure T' union all select
2010, 'Bentley', 'Continental' union all select
2010, 'Suzuki', 'SX4' union all select
2010, 'Suzuki', 'Grand Vitara' union all select
2010, 'Suzuki', 'Equator' union all select
2010, 'Suzuki', 'Kizashi' union all select
2010, 'Saab', '9-3' union all select
2010, 'Saab', '9-5' union all select
2010, 'Buick', 'Lucerne' union all select
2010, 'Buick', 'LaCrosse' union all select
2010, 'Buick', 'Enclave' union all select
2010, 'Lamborghini', 'Gallardo' union all select
2010, 'Lamborghini', 'Murcielago' union all select
2010, 'MINI', 'Clubman' union all select
2010, 'MINI', 'Cooper' union all select
2010, 'MINI', 'Cooper Clubman' union all select
2010, 'Acura', 'TL' union all select
2010, 'Acura', 'RL' union all select
2010, 'Acura', 'ZDX' union all select
2010, 'Acura', 'TSX' union all select
2010, 'Acura', 'MDX' union all select
2010, 'Acura', 'RDX' union all select
2010, 'Tesla', 'Roadster' union all select
2010, 'Smart', 'Fortwo' union all select
2010, 'Aptera', 'Type-1h' union all select
2010, 'Land Rover', 'Defender Ice Edition' union all select
2010, 'HUMMER', 'H3' union all select
2010, 'HUMMER', 'H3T' union all select
2010, 'Pontiac', 'G3' union all select
2010, 'Pontiac', 'G6' union all select
2010, 'Pontiac', 'Vibe' union all select
2010, 'Saturn', 'Outlook' union all select
2010, 'Saturn', 'VUE' union all select
2011, 'Ford', 'Taurus' union all select
2011, 'Ford', 'Escape' union all select
2011, 'Ford', 'F-Series Super Duty' union all select
2011, 'Ford', 'Mustang' union all select
2011, 'Ford', 'Fusion' union all select
2011, 'Ford', 'E-Series' union all select
2011, 'Ford', 'Fiesta' union all select
2011, 'Ford', 'Explorer' union all select
2011, 'Ford', 'Focus' union all select
2011, 'Ford', 'F-Series' union all select
2011, 'Ford', 'Ranger' union all select
2011, 'Ford', 'Transit Connect' union all select
2011, 'Ford', 'Edge' union all select
2011, 'Ford', 'Expedition' union all select
2011, 'Ford', 'Flex' union all select
2011, 'Ford', 'E150' union all select
2011, 'Ford', 'E250' union all select
2011, 'Ford', 'E350' union all select
2011, 'Ford', 'Expedition EL' union all select
2011, 'Ford', 'F150' union all select
2011, 'Ford', 'F250' union all select
2011, 'Ford', 'F350' union all select
2011, 'Ford', 'F450' union all select
2011, 'Ford', 'Crown Victoria' union all select
2011, 'Toyota', 'Yaris' union all select
2011, 'Toyota', '4Runner' union all select
2011, 'Toyota', 'Camry' union all select
2011, 'Toyota', 'Sequoia' union all select
2011, 'Toyota', 'Land Cruiser' union all select
2011, 'Toyota', 'Avalon' union all select
2011, 'Toyota', 'Matrix' union all select
2011, 'Toyota', 'Tacoma' union all select
2011, 'Toyota', 'Prius' union all select
2011, 'Toyota', 'Highlander' union all select
2011, 'Toyota', 'Tundra' union all select
2011, 'Toyota', 'FJ Cruiser' union all select
2011, 'Toyota', 'RAV4' union all select
2011, 'Toyota', 'Corolla' union all select
2011, 'Toyota', 'Sienna' union all select
2011, 'Toyota', 'Venza' union all select
2011, 'Toyota', 'Camry Hybrid' union all select
2011, 'Toyota', 'TundraMax' union all select
2011, 'Jaguar', 'XJ' union all select
2011, 'Jaguar', 'XK' union all select
2011, 'Jaguar', 'XF' union all select
2011, 'Mazda', 'CX-9' union all select
2011, 'Mazda', 'Mazda3' union all select
2011, 'Mazda', 'RX-8' union all select
2011, 'Mazda', 'Mazda6' union all select
2011, 'Mazda', 'Mazdaspeed 3' union all select
2011, 'Mazda', 'Mazda2' union all select
2011, 'Mazda', 'MX-5' union all select
2011, 'Mazda', 'Tribute' union all select
2011, 'Mazda', 'CX-7' union all select
2011, 'Mazda', 'Miata MX-5' union all select
2011, 'Mercedes-Benz', 'GLK-Class' union all select
2011, 'Mercedes-Benz', 'S-Class' union all select
2011, 'Mercedes-Benz', 'CLS-Class' union all select
2011, 'Mercedes-Benz', 'SLK-Class' union all select
2011, 'Mercedes-Benz', 'E-Class' union all select
2011, 'Mercedes-Benz', 'GL-Class' union all select
2011, 'Mercedes-Benz', 'C-Class' union all select
2011, 'Mercedes-Benz', 'G-Class' union all select
2011, 'Mercedes-Benz', 'CL-Class' union all select
2011, 'Mercedes-Benz', 'SLS AMG' union all select
2011, 'Mercedes-Benz', 'R-Class' union all select
2011, 'Mercedes-Benz', 'Sprinter' union all select
2011, 'Mercedes-Benz', 'M-Class' union all select
2011, 'Mercedes-Benz', 'SL-Class' union all select
2011, 'Mercedes-Benz', 'SLS-Class' union all select
2011, 'Mercedes-Benz', 'Sprinter 2500' union all select
2011, 'Mercedes-Benz', 'Sprinter 3500' union all select
2011, 'Audi', 'S6' union all select
2011, 'Audi', 'S5' union all select
2011, 'Audi', 'Q5' union all select
2011, 'Audi', 'A6' union all select
2011, 'Audi', 'TT' union all select
2011, 'Audi', 'A4' union all select
2011, 'Audi', 'A5' union all select
2011, 'Audi', 'R8' union all select
2011, 'Audi', 'A8' union all select
2011, 'Audi', 'A3' union all select
2011, 'Audi', 'Q7' union all select
2011, 'Audi', 'S4' union all select
2011, 'Honda', 'Accord' union all select
2011, 'Honda', 'Odyssey' union all select
2011, 'Honda', 'Civic' union all select
2011, 'Honda', 'Pilot' union all select
2011, 'Honda', 'Element' union all select
2011, 'Honda', 'Fit' union all select
2011, 'Honda', 'CR-Z' union all select
2011, 'Honda', 'Ridgeline' union all select
2011, 'Honda', 'CR-V' union all select
2011, 'Honda', 'Insight' union all select
2011, 'Honda', 'Accord Crosstour' union all select
2011, 'Jeep', 'Patriot' union all select
2011, 'Jeep', 'Grand Cherokee' union all select
2011, 'Jeep', 'Liberty' union all select
2011, 'Jeep', 'Wrangler' union all select
2011, 'Jeep', 'Compass' union all select
2011, 'BMW', '1 Series' union all select
2011, 'BMW', '3 Series' union all select
2011, 'BMW', '5 Series' union all select
2011, 'BMW', '7 Series' union all select
2011, 'BMW', 'X6' union all select
2011, 'BMW', 'M3' union all select
2011, 'BMW', 'X3' union all select
2011, 'BMW', 'X5' union all select
2011, 'BMW', 'Z4' union all select
2011, 'BMW', 'X5 M' union all select
2011, 'BMW', 'X6 M' union all select
2011, 'Lexus', 'RX Hybrid' union all select
2011, 'Lexus', 'IS' union all select
2011, 'Lexus', 'GX' union all select
2011, 'Lexus', 'LS Hybrid' union all select
2011, 'Lexus', 'GS' union all select
2011, 'Lexus', 'LS' union all select
2011, 'Lexus', 'IS-F' union all select
2011, 'Lexus', 'CT' union all select
2011, 'Lexus', 'RX' union all select
2011, 'Lexus', 'HS' union all select
2011, 'Lexus', 'LX' union all select
2011, 'Lexus', 'ES' union all select
2011, 'Lexus', 'IS F' union all select
2011, 'Dodge', 'Challenger' union all select
2011, 'Dodge', 'Ram' union all select
2011, 'Dodge', 'Journey' union all select
2011, 'Dodge', 'Avenger' union all select
2011, 'Dodge', 'Durango' union all select
2011, 'Dodge', 'Dakota' union all select
2011, 'Dodge', 'Caliber' union all select
2011, 'Dodge', 'Nitro' union all select
2011, 'Dodge', 'Caravan' union all select
2011, 'Dodge', 'Charger' union all select
2011, 'Dodge', 'Grand Caravan' union all select
2011, 'Nissan', 'Pathfinder' union all select
2011, 'Nissan', 'Altima' union all select
2011, 'Nissan', 'Quest' union all select
2011, 'Nissan', 'Cube' union all select
2011, 'Nissan', 'Frontier' union all select
2011, 'Nissan', 'Sentra' union all select
2011, 'Nissan', 'Titan' union all select
2011, 'Nissan', 'Maxima' union all select
2011, 'Nissan', '370Z' union all select
2011, 'Nissan', 'GT-R' union all select
2011, 'Nissan', 'Rogue' union all select
2011, 'Nissan', 'Xterra' union all select
2011, 'Nissan', 'Leaf' union all select
2011, 'Nissan', 'Armada' union all select
2011, 'Nissan', 'Versa' union all select
2011, 'Nissan', 'JUKE' union all select
2011, 'Nissan', 'Murano' union all select
2011, 'GMC', 'Sierra' union all select
2011, 'GMC', 'Yukon' union all select
2011, 'GMC', 'Canyon' union all select
2011, 'GMC', 'Savana' union all select
2011, 'GMC', 'Acadia' union all select
2011, 'GMC', 'Terrain' union all select
2011, 'GMC', 'Savana 1500' union all select
2011, 'GMC', 'Savana 2500' union all select
2011, 'GMC', 'Savana 3500' union all select
2011, 'GMC', 'Sierra 1500' union all select
2011, 'GMC', 'Sierra 2500' union all select
2011, 'GMC', 'Sierra 3500' union all select
2011, 'GMC', 'Yukon XL 1500' union all select
2011, 'GMC', 'Yukon XL 2500' union all select
2011, 'MINI', 'Clubman' union all select
2011, 'MINI', 'Countryman' union all select
2011, 'MINI', 'Cooper' union all select
2011, 'MINI', 'Cooper Clubman' union all select
2011, 'MINI', 'Cooper Countryman' union all select
2011, 'Acura', 'RDX' union all select
2011, 'Acura', 'TSX' union all select
2011, 'Acura', 'ZDX' union all select
2011, 'Acura', 'RL' union all select
2011, 'Acura', 'MDX' union all select
2011, 'Acura', 'TL' union all select
2011, 'Chevrolet', 'Tahoe' union all select
2011, 'Chevrolet', 'Corvette' union all select
2011, 'Chevrolet', 'Equinox' union all select
2011, 'Chevrolet', 'Suburban' union all select
2011, 'Chevrolet', 'Malibu' union all select
2011, 'Chevrolet', 'Volt' union all select
2011, 'Chevrolet', 'Aveo' union all select
2011, 'Chevrolet', 'HHR' union all select
2011, 'Chevrolet', 'Cruze' union all select
2011, 'Chevrolet', 'Express' union all select
2011, 'Chevrolet', 'Camaro' union all select
2011, 'Chevrolet', 'Silverado' union all select
2011, 'Chevrolet', 'Traverse' union all select
2011, 'Chevrolet', 'Colorado' union all select
2011, 'Chevrolet', 'Avalanche' union all select
2011, 'Chevrolet', 'Impala' union all select
2011, 'Chevrolet', 'Express 1500' union all select
2011, 'Chevrolet', 'Express 2500' union all select
2011, 'Chevrolet', 'Express 3500' union all select
2011, 'Chevrolet', 'Silverado 1500' union all select
2011, 'Chevrolet', 'Silverado 2500' union all select
2011, 'Chevrolet', 'Silverado 3500' union all select
2011, 'Chevrolet', 'Suburban 1500' union all select
2011, 'Chevrolet', 'Suburban 2500' union all select
2011, 'Aston Martin', 'V8 Vantage S' union all select
2011, 'Aston Martin', 'V8 Vantage' union all select
2011, 'Aston Martin', 'Rapide' union all select
2011, 'Aston Martin', 'DBS' union all select
2011, 'Aston Martin', 'V12 Vantage' union all select
2011, 'Aston Martin', 'Virage' union all select
2011, 'Aston Martin', 'DB9' union all select
2011, 'Aston Martin', 'Vantage' union all select
2011, 'Bentley', 'Mulsanne' union all select
2011, 'Bentley', 'Continental Super' union all select
2011, 'Bentley', 'Continental GTC' union all select
2011, 'Bentley', 'Continental Flying Spur' union all select
2011, 'Bentley', 'Continental' union all select
2011, 'Volkswagen', 'Touareg' union all select
2011, 'Volkswagen', 'Golf' union all select
2011, 'Volkswagen', 'Routan' union all select
2011, 'Volkswagen', 'CC' union all select
2011, 'Volkswagen', 'Jetta' union all select
2011, 'Volkswagen', 'GTI' union all select
2011, 'Volkswagen', 'Eos' union all select
2011, 'Volkswagen', 'Tiguan' union all select
2011, 'Infiniti', 'EX' union all select
2011, 'Infiniti', 'G25' union all select
2011, 'Infiniti', 'G37' union all select
2011, 'Infiniti', 'QX56' union all select
2011, 'Infiniti', 'FX' union all select
2011, 'Infiniti', 'M' union all select
2011, 'Infiniti', 'IPL G' union all select
2011, 'Infiniti', 'G' union all select
2011, 'Infiniti', 'QX' union all select
2011, 'Subaru', 'Legacy' union all select
2011, 'Subaru', 'Impreza WRX' union all select
2011, 'Subaru', 'Impreza' union all select
2011, 'Subaru', 'Outback' union all select
2011, 'Subaru', 'Tribeca' union all select
2011, 'Subaru', 'Forester' union all select
2011, 'Saab', '9-3' union all select
2011, 'Saab', '9-5' union all select
2011, 'Saab', '9-4X' union all select
2011, 'Porsche', '911' union all select
2011, 'Porsche', 'Cayenne' union all select
2011, 'Porsche', 'Panamera' union all select
2011, 'Porsche', 'Boxster' union all select
2011, 'Porsche', 'Cayman' union all select
2011, 'Land Rover', 'Freelander' union all select
2011, 'Land Rover', 'Range Rover Sport' union all select
2011, 'Land Rover', 'Range Rover' union all select
2011, 'Land Rover', 'Discovery' union all select
2011, 'Land Rover', 'LR2' union all select
2011, 'Land Rover', 'LR4' union all select
2011, 'Buick', 'LaCrosse' union all select
2011, 'Buick', 'Regal' union all select
2011, 'Buick', 'Lucerne' union all select
2011, 'Buick', 'Enclave' union all select
2011, 'Scion', 'tC' union all select
2011, 'Scion', 'xB' union all select
2011, 'Scion', 'xD' union all select
2011, 'Lotus', 'Elise' union all select
2011, 'Lotus', 'Evora' union all select
2011, 'Lotus', 'Exige' union all select
2011, 'Kia', 'Optima' union all select
2011, 'Kia', 'Forte' union all select
2011, 'Kia', 'Rio' union all select
2011, 'Kia', 'Sedona' union all select
2011, 'Kia', 'Sorento' union all select
2011, 'Kia', 'Sportage' union all select
2011, 'Kia', 'Soul' union all select
2011, 'Hyundai', 'Elantra' union all select
2011, 'Hyundai', 'Sonata' union all select
2011, 'Hyundai', 'Genesis' union all select
2011, 'Hyundai', 'Santa Fe' union all select
2011, 'Hyundai', 'Tucson' union all select
2011, 'Hyundai', 'Equus' union all select
2011, 'Hyundai', 'Veracruz' union all select
2011, 'Hyundai', 'Accent' union all select
2011, 'Hyundai', 'Azera' union all select
2011, 'Hyundai', 'Genesis Coupe' union all select
2011, 'Suzuki', 'Grand Vitara' union all select
2011, 'Suzuki', 'SX4' union all select
2011, 'Suzuki', 'Kizashi' union all select
2011, 'Suzuki', 'Equator' union all select
2011, 'Smart', 'Fortwo' union all select
2011, 'Volvo', 'C30' union all select
2011, 'Volvo', 'V50' union all select
2011, 'Volvo', 'XC90' union all select
2011, 'Volvo', 'S60' union all select
2011, 'Volvo', 'XC60' union all select
2011, 'Volvo', 'XC70' union all select
2011, 'Volvo', 'C70' union all select
2011, 'Volvo', 'S80' union all select
2011, 'Volvo', 'S40' union all select
2011, 'Rolls-Royce', 'Phantom' union all select
2011, 'Rolls-Royce', 'Ghost' union all select
2011, 'Lincoln', 'Navigator' union all select
2011, 'Lincoln', 'MKT' union all select
2011, 'Lincoln', 'MKS' union all select
2011, 'Lincoln', 'MKZ' union all select
2011, 'Lincoln', 'Town Car' union all select
2011, 'Lincoln', 'MKX' union all select
2011, 'Lincoln', 'Navigator L' union all select
2011, 'Mitsubishi', 'Eclipse' union all select
2011, 'Mitsubishi', 'Outlander' union all select
2011, 'Mitsubishi', 'Endeavor' union all select
2011, 'Mitsubishi', 'Lancer' union all select
2011, 'Mitsubishi', 'Galant' union all select
2011, 'Mitsubishi', 'Lancer Evolution' union all select
2011, 'Mitsubishi', 'Outlander Sport' union all select
2011, 'Mercury', 'Mariner' union all select
2011, 'Mercury', 'Grand Marquis' union all select
2011, 'Mercury', 'Milan' union all select
2011, 'Maserati', 'GranTurismo' union all select
2011, 'Maserati', 'Quattroporte' union all select
2011, 'Chrysler', '200' union all select
2011, 'Chrysler', '300' union all select
2011, 'Chrysler', 'Town & Country' union all select
2011, 'Cadillac', 'DTS' union all select
2011, 'Cadillac', 'CTS-V' union all select
2011, 'Cadillac', 'CTS' union all select
2011, 'Cadillac', 'STS' union all select
2011, 'Cadillac', 'SRX' union all select
2011, 'Cadillac', 'Escalade' union all select
2011, 'Cadillac', 'Escalade ESV' union all select
2011, 'Cadillac', 'Escalade EXT' union all select
2011, 'Maybach', '57' union all select
2011, 'Maybach', '62' union all select
2011, 'Maybach', 'Landaulet' union all select
2011, 'Ferrari', '458 Italia' union all select
2011, 'Bugatti', 'Veyron' union all select
2011, 'Lamborghini', 'Gallardo' union all select
2011, 'Tesla', 'Roadster' union all select
2011, 'Ram', '1500' union all select
2011, 'Ram', '2500' union all select
2011, 'Ram', '3500' union all select
2011, 'Ram', 'Dakota' union all select
2012, 'Porsche', '911' union all select
2012, 'Porsche', 'Cayenne' union all select
2012, 'Porsche', 'Panamera' union all select
2012, 'Porsche', 'Boxster' union all select
2012, 'Porsche', 'Cayman' union all select
2012, 'Nissan', 'Altima' union all select
2012, 'Nissan', '370Z' union all select
2012, 'Nissan', 'Murano' union all select
2012, 'Nissan', 'Armada' union all select
2012, 'Nissan', 'Pathfinder' union all select
2012, 'Nissan', 'Leaf' union all select
2012, 'Nissan', 'Xterra' union all select
2012, 'Nissan', 'Titan' union all select
2012, 'Nissan', 'JUKE' union all select
2012, 'Nissan', 'Rogue' union all select
2012, 'Nissan', 'Maxima' union all select
2012, 'Nissan', 'Versa' union all select
2012, 'Nissan', 'Quest' union all select
2012, 'Nissan', 'Sentra' union all select
2012, 'Nissan', 'GT-R' union all select
2012, 'Nissan', 'cube' union all select
2012, 'Nissan', 'Frontier' union all select
2012, 'Nissan', 'NV1500' union all select
2012, 'Nissan', 'NV2500' union all select
2012, 'Nissan', 'NV3500' union all select
2012, 'Cadillac', 'CTS' union all select
2012, 'Cadillac', 'CTS-V' union all select
2012, 'Cadillac', 'Escalade' union all select
2012, 'Cadillac', 'SRX' union all select
2012, 'Cadillac', 'Escalade ESV' union all select
2012, 'Cadillac', 'Escalade EXT' union all select
2012, 'Audi', 'A3' union all select
2012, 'Audi', 'R8' union all select
2012, 'Audi', 'A6' union all select
2012, 'Audi', 'Q5' union all select
2012, 'Audi', 'A5' union all select
2012, 'Audi', 'A8' union all select
2012, 'Audi', 'TT' union all select
2012, 'Audi', 'A7' union all select
2012, 'Audi', 'S5' union all select
2012, 'Audi', 'A4' union all select
2012, 'Audi', 'Q7' union all select
2012, 'Audi', 'S4' union all select
2012, 'Volkswagen', 'Jetta' union all select
2012, 'Volkswagen', 'Golf' union all select
2012, 'Volkswagen', 'Routan' union all select
2012, 'Volkswagen', 'Touareg' union all select
2012, 'Volkswagen', 'Eos' union all select
2012, 'Volkswagen', 'New Beetle' union all select
2012, 'Volkswagen', 'Passat' union all select
2012, 'Volkswagen', 'Tiguan' union all select
2012, 'Volkswagen', 'GTI' union all select
2012, 'Volkswagen', 'CC' union all select
2012, 'Land Rover', 'Range Rover' union all select
2012, 'Land Rover', 'Discovery' union all select
2012, 'Land Rover', 'Range Rover Sport' union all select
2012, 'Land Rover', 'Range Rover Evoque' union all select
2012, 'Land Rover', 'LR2' union all select
2012, 'Land Rover', 'LR4' union all select
2012, 'Honda', 'Odyssey' union all select
2012, 'Honda', 'Accord' union all select
2012, 'Honda', 'Civic' union all select
2012, 'Honda', 'Ridgeline' union all select
2012, 'Honda', 'Fit' union all select
2012, 'Honda', 'Insight' union all select
2012, 'Honda', 'CR-Z' union all select
2012, 'Honda', 'Pilot' union all select
2012, 'Honda', 'FCX Clarity' union all select
2012, 'Honda', 'Crosstour' union all select
2012, 'Honda', 'CR-V' union all select
2012, 'Hyundai', 'HED-5' union all select
2012, 'Hyundai', 'Genesis' union all select
2012, 'Hyundai', 'Accent' union all select
2012, 'Hyundai', 'Equus' union all select
2012, 'Hyundai', 'Santa Fe' union all select
2012, 'Hyundai', 'Elantra' union all select
2012, 'Hyundai', 'Veracruz' union all select
2012, 'Hyundai', 'Sonata' union all select
2012, 'Hyundai', 'Tucson' union all select
2012, 'Hyundai', 'Veloster' union all select
2012, 'Hyundai', 'Azera' union all select
2012, 'Ford', 'Focus' union all select
2012, 'Ford', 'Mustang' union all select
2012, 'Ford', 'F-Series Super Duty' union all select
2012, 'Ford', 'E-Series' union all select
2012, 'Ford', 'Transit Connect' union all select
2012, 'Ford', 'Flex' union all select
2012, 'Ford', 'Escape' union all select
2012, 'Ford', 'Fusion' union all select
2012, 'Ford', 'Taurus' union all select
2012, 'Ford', 'Fiesta' union all select
2012, 'Ford', 'Explorer' union all select
2012, 'Ford', 'Expedition' union all select
2012, 'Ford', 'Edge' union all select
2012, 'Ford', 'E150' union all select
2012, 'Ford', 'E250' union all select
2012, 'Ford', 'E350' union all select
2012, 'Ford', 'Expedition EL' union all select
2012, 'Ford', 'F150' union all select
2012, 'Ford', 'F250' union all select
2012, 'Ford', 'F350' union all select
2012, 'Ford', 'F450' union all select
2012, 'GMC', 'Canyon' union all select
2012, 'GMC', 'Yukon' union all select
2012, 'GMC', 'Sierra' union all select
2012, 'GMC', 'Acadia' union all select
2012, 'GMC', 'Terrain' union all select
2012, 'GMC', 'Savana' union all select
2012, 'GMC', 'Savana 1500' union all select
2012, 'GMC', 'Savana 2500' union all select
2012, 'GMC', 'Savana 3500' union all select
2012, 'GMC', 'Sierra 1500' union all select
2012, 'GMC', 'Sierra 2500' union all select
2012, 'GMC', 'Sierra 3500' union all select
2012, 'GMC', 'Yukon XL 1500' union all select
2012, 'GMC', 'Yukon XL 2500' union all select
2012, 'Saab', '9-3' union all select
2012, 'Volvo', 'C30' union all select
2012, 'Volvo', 'XC70' union all select
2012, 'Volvo', 'XC60' union all select
2012, 'Volvo', 'XC90' union all select
2012, 'Volvo', 'C70' union all select
2012, 'Volvo', 'S80' union all select
2012, 'Volvo', 'S60' union all select
2012, 'Chevrolet', 'Corvette' union all select
2012, 'Chevrolet', 'Colorado' union all select
2012, 'Chevrolet', 'Volt' union all select
2012, 'Chevrolet', 'Express' union all select
2012, 'Chevrolet', 'Sonic' union all select
2012, 'Chevrolet', 'Camaro' union all select
2012, 'Chevrolet', 'Cruze' union all select
2012, 'Chevrolet', 'Malibu' union all select
2012, 'Chevrolet', 'Traverse' union all select
2012, 'Chevrolet', 'Equinox' union all select
2012, 'Chevrolet', 'Impala' union all select
2012, 'Chevrolet', 'Avalanche' union all select
2012, 'Chevrolet', 'Express 1500' union all select
2012, 'Chevrolet', 'Express 2500' union all select
2012, 'Chevrolet', 'Express 3500' union all select
2012, 'Chevrolet', 'Silverado 1500' union all select
2012, 'Chevrolet', 'Silverado 2500' union all select
2012, 'Chevrolet', 'Silverado 3500' union all select
2012, 'Chevrolet', 'Suburban 1500' union all select
2012, 'Chevrolet', 'Suburban 2500' union all select
2012, 'Chevrolet', 'Tahoe' union all select
2012, 'MINI', 'Cooper' union all select
2012, 'MINI', 'Countryman' union all select
2012, 'MINI', 'Clubman' union all select
2012, 'MINI', 'Cooper Clubman' union all select
2012, 'MINI', 'Cooper Countryman' union all select
2012, 'BMW', '1 Series' union all select
2012, 'BMW', '3 Series' union all select
2012, 'BMW', '5 Series' union all select
2012, 'BMW', '6 Series' union all select
2012, 'BMW', '7 Series' union all select
2012, 'BMW', 'M3' union all select
2012, 'BMW', 'X3' union all select
2012, 'BMW', 'X5' union all select
2012, 'BMW', 'X5 M' union all select
2012, 'BMW', 'X6' union all select
2012, 'BMW', 'X6 M' union all select
2012, 'BMW', 'Z4' union all select
2012, 'Lincoln', 'MKX' union all select
2012, 'Lincoln', 'Navigator' union all select
2012, 'Lincoln', 'MKS' union all select
2012, 'Lincoln', 'MKT' union all select
2012, 'Lincoln', 'MKZ' union all select
2012, 'Lincoln', 'Navigator L' union all select
2012, 'Toyota', '4Runner' union all select
2012, 'Toyota', 'Highlander' union all select
2012, 'Toyota', 'Yaris' union all select
2012, 'Toyota', 'Prius v' union all select
2012, 'Toyota', 'FJ Cruiser' union all select
2012, 'Toyota', 'Camry Hybrid' union all select
2012, 'Toyota', 'Sequoia' union all select
2012, 'Toyota', 'RAV4' union all select
2012, 'Toyota', 'Sienna' union all select
2012, 'Toyota', 'Camry' union all select
2012, 'Toyota', 'Prius Plug-in Hybrid' union all select
2012, 'Toyota', 'Avalon' union all select
2012, 'Toyota', 'Corolla' union all select
2012, 'Toyota', 'Matrix' union all select
2012, 'Toyota', 'Prius' union all select
2012, 'Toyota', 'Prius c' union all select
2012, 'Toyota', 'Prius Plug-in' union all select
2012, 'Toyota', 'Tacoma' union all select
2012, 'Toyota', 'TundraMax' union all select
2012, 'Toyota', 'Tundra' union all select
2012, 'Toyota', 'Venza' union all select
2012, 'Acura', 'ZDX' union all select
2012, 'Acura', 'MDX' union all select
2012, 'Acura', 'TSX' union all select
2012, 'Acura', 'TL' union all select
2012, 'Acura', 'RL' union all select
2012, 'Acura', 'RDX' union all select
2012, 'Mercedes-Benz', 'G-Class' union all select
2012, 'Mercedes-Benz', 'CLS-Class' union all select
2012, 'Mercedes-Benz', 'GL-Class' union all select
2012, 'Mercedes-Benz', 'E-Class' union all select
2012, 'Mercedes-Benz', 'GLK-Class' union all select
2012, 'Mercedes-Benz', 'SLS AMG' union all select
2012, 'Mercedes-Benz', 'S-Class' union all select
2012, 'Mercedes-Benz', 'CL-Class' union all select
2012, 'Mercedes-Benz', 'C-Class' union all select
2012, 'Mercedes-Benz', 'SL-Class' union all select
2012, 'Mercedes-Benz', 'M-Class' union all select
2012, 'Mercedes-Benz', 'R-Class' union all select
2012, 'Mercedes-Benz', 'SLK-Class' union all select
2012, 'Mercedes-Benz', 'SLS-Class' union all select
2012, 'Mercedes-Benz', 'Sprinter 2500' union all select
2012, 'Mercedes-Benz', 'Sprinter 3500' union all select
2012, 'Infiniti', 'FX' union all select
2012, 'Infiniti', 'M' union all select
2012, 'Infiniti', 'G37' union all select
2012, 'Infiniti', 'G25' union all select
2012, 'Infiniti', 'QX56' union all select
2012, 'Infiniti', 'IPL G' union all select
2012, 'Infiniti', 'EX' union all select
2012, 'Infiniti', 'G' union all select
2012, 'Infiniti', 'QX' union all select
2012, 'Aston Martin', 'DBS' union all select
2012, 'Aston Martin', 'DB9' union all select
2012, 'Aston Martin', 'V12 Vantage' union all select
2012, 'Aston Martin', 'Virage' union all select
2012, 'Aston Martin', 'V8 Vantage' union all select
2012, 'Aston Martin', 'Rapide' union all select
2012, 'Aston Martin', 'V8 Vantage S' union all select
2012, 'Lexus', 'RX' union all select
2012, 'Lexus', 'LS' union all select
2012, 'Lexus', 'IS' union all select
2012, 'Lexus', 'IS-F' union all select
2012, 'Lexus', 'CT' union all select
2012, 'Lexus', 'RX Hybrid' union all select
2012, 'Lexus', 'LS Hybrid' union all select
2012, 'Lexus', 'ES' union all select
2012, 'Lexus', 'LFA' union all select
2012, 'Lexus', 'HS' union all select
2012, 'Lexus', 'GX' union all select
2012, 'FIAT', '500' union all select
2012, 'Fiat', 'Nuova 500' union all select
2012, 'Dodge', 'Avenger' union all select
2012, 'Dodge', 'Caravan' union all select
2012, 'Dodge', 'Charger' union all select
2012, 'Dodge', 'Challenger' union all select
2012, 'Dodge', 'Caliber' union all select
2012, 'Dodge', 'Durango' union all select
2012, 'Dodge', 'Journey' union all select
2012, 'Dodge', 'Grand Caravan' union all select
2012, 'Suzuki', 'Kizashi' union all select
2012, 'Suzuki', 'Grand Vitara' union all select
2012, 'Suzuki', 'Equator' union all select
2012, 'Suzuki', 'SX4' union all select
2012, 'Subaru', 'Legacy' union all select
2012, 'Subaru', 'Impreza' union all select
2012, 'Subaru', 'Forester' union all select
2012, 'Subaru', 'Tribeca' union all select
2012, 'Subaru', 'Outback' union all select
2012, 'Ferrari', '458 Italia' union all select
2012, 'Ferrari', 'FF' union all select
2012, 'Smart', 'Fortwo' union all select
2012, 'Jaguar', 'XF' union all select
2012, 'Jaguar', 'XK' union all select
2012, 'Jaguar', 'XJ' union all select
2012, 'Jeep', 'Wrangler' union all select
2012, 'Jeep', 'Compass' union all select
2012, 'Jeep', 'Grand Cherokee' union all select
2012, 'Jeep', 'Patriot' union all select
2012, 'Jeep', 'Liberty' union all select
2012, 'Mazda', 'Mazda5' union all select
2012, 'Mazda', 'Mazda2' union all select
2012, 'Mazda', 'CX-9' union all select
2012, 'Mazda', 'MX-5' union all select
2012, 'Mazda', 'Mazda6' union all select
2012, 'Mazda', 'Mazda3' union all select
2012, 'Mazda', 'Mazdaspeed 3' union all select
2012, 'Mazda', 'CX-7' union all select
2012, 'Mazda', 'Miata MX-5' union all select
2012, 'Lamborghini', 'Gallardo' union all select
2012, 'Lamborghini', 'Aventador' union all select
2012, 'Tesla', 'Model S' union all select
2012, 'Tesla', 'Roadster' union all select
2012, 'Buick', 'Verano' union all select
2012, 'Buick', 'LaCrosse' union all select
2012, 'Buick', 'Regal' union all select
2012, 'Buick', 'Enclave' union all select
2012, 'Chrysler', '200' union all select
2012, 'Chrysler', '300' union all select
2012, 'Chrysler', 'Town & Country' union all select
2012, 'Kia', 'Sportage' union all select
2012, 'Kia', 'Forte' union all select
2012, 'Kia', 'Optima' union all select
2012, 'Kia', 'Sedona' union all select
2012, 'Kia', 'Soul' union all select
2012, 'Kia', 'Sorento' union all select
2012, 'Kia', 'Rio' union all select
2012, 'Lotus', 'Exige' union all select
2012, 'Lotus', 'Evora' union all select
2012, 'Bentley', 'Continental GT' union all select
2012, 'Bentley', 'Mulsanne' union all select
2012, 'Bentley', 'Continental GTC' union all select
2012, 'Bentley', 'Continental Flying Spur' union all select
2012, 'Bentley', 'Continental Super' union all select
2012, 'Bentley', 'Continental' union all select
2012, 'Mitsubishi', 'Galant' union all select
2012, 'Mitsubishi', 'Eclipse' union all select
2012, 'Mitsubishi', 'Outlander' union all select
2012, 'Mitsubishi', 'i-MiEV' union all select
2012, 'Mitsubishi', 'Lancer' union all select
2012, 'Mitsubishi', 'Outlander Sport' union all select
2012, 'Scion', 'xB' union all select
2012, 'Scion', 'tC' union all select
2012, 'Scion', 'iQ' union all select
2012, 'Scion', 'xD' union all select
2012, 'Rolls-Royce', 'Ghost' union all select
2012, 'Rolls-Royce', 'Phantom' union all select
2012, 'Maserati', 'GranTurismo' union all select
2012, 'Maserati', 'Quattroporte' union all select
2012, 'Maybach', '57' union all select
2012, 'Maybach', '62' union all select
2012, 'Maybach', 'Landaulet' union all select
2012, 'McLaren', 'MP4-12C' union all select
2012, 'Ram', '1500' union all select
2012, 'Ram', '2500' union all select
2012, 'Ram', '3500' union all select
2012, 'Ram', 'C/V' union all select
2013, 'Ford', 'Taurus' union all select
2013, 'Ford', 'C-MAX Hybrid' union all select
2013, 'Ford', 'Edge' union all select
2013, 'Ford', 'Escape' union all select
2013, 'Ford', 'Explorer' union all select
2013, 'Ford', 'Fiesta' union all select
2013, 'Ford', 'Flex' union all select
2013, 'Ford', 'Focus' union all select
2013, 'Ford', 'Focus ST' union all select
2013, 'Ford', 'Fusion' union all select
2013, 'Ford', 'Mustang' union all select
2013, 'Ford', 'Transit Connect' union all select
2013, 'Hyundai', 'Veloster' union all select
2013, 'Hyundai', 'Accent' union all select
2013, 'Hyundai', 'Elantra' union all select
2013, 'Hyundai', 'Equus' union all select
2013, 'Hyundai', 'Genesis Coupe' union all select
2013, 'Hyundai', 'Sonata' union all select
2013, 'Chevrolet', 'Cruze' union all select
2013, 'Chevrolet', 'Malibu' union all select
2013, 'Chevrolet', 'Tahoe' union all select
2013, 'Audi', 'S4' union all select
2013, 'BMW', 'X5' union all select
2013, 'BMW', 'X5 M' union all select
2013, 'BMW', 'X6' union all select
2013, 'BMW', 'X6 M' union all select
2013, 'GMC', 'Sierra 1500' union all select
2013, 'GMC', 'Yukon' union all select
2013, 'GMC', 'Yukon XL 1500' union all select
2013, 'GMC', 'Yukon XL 2500' union all select
2013, 'Infiniti', 'JX' union all select
2013, 'Jaguar', 'XK Series' union all select
2013, 'Kia', 'Rio' union all select
2013, 'Kia', 'Sorento' union all select
2013, 'Lexus', 'GS' union all select
2013, 'Lexus', 'LX' union all select
2013, 'Lexus', 'RX' union all select
2013, 'Lincoln', 'MKS' union all select
2013, 'Lincoln', 'MKT' union all select
2013, 'Lincoln', 'MKX' union all select
2013, 'Mazda', 'CX-5' union all select
2013, 'Mazda', 'MAZDA6' union all select
2013, 'Nissan', 'Altima' union all select
2013, 'Nissan', 'GT-R' union all select
2013, 'Porsche', '911' union all select
2013, 'Porsche', 'Boxster' union all select
2013, 'Porsche', 'Cayenne' union all select
2013, 'Porsche', 'Panamera' union all select
2013, 'Rolls-Royce', 'Phantom' union all select
2013, 'Scion', 'FR-S' union all select
2013, 'Scion', 'tC' union all select
2013, 'Subaru', 'BRZ' union all select
2013, 'Toyota', 'Land Cruiser' union all select
2013, 'Toyota', 'Venza' union all select
2013, 'Volkswagen', 'CC' union all select
2013, 'Volvo', 'C30' union all select
2013, 'Volvo', 'C70' union all select
2013, 'Volvo', 'S60' union all select
2013, 'Volvo', 'XC90' union all select
2014, 'Acura', 'RLX' union all select
2014, 'Acura', 'MDX' union all select
2014, 'BMW', '2 series' union all select
2014, 'BMW', '4 series' union all select
2014, 'BMW', 'i3' union all select
2014, 'BMW', 'i8' union all select
2014, 'BMW', 'X5' union all select
2014, 'Buick', 'Encore' union all select
2014, 'Cadillac', 'CTS' union all select
2014, 'Cadillac', 'ELR' union all select
2014, 'Chevrolet', 'Corevette' union all select
2014, 'Chevrolet', 'Impala' union all select
2014, 'Chevrolet', 'Silverado' union all select
2014, 'Chevrolet', 'SS' union all select
2014, 'Fiat', '500L' union all select
2014, 'Fiat', '500L Trekking' union all select
2014, 'Ford', 'Transit Connect Wagon' union all select
2014, 'GMC', 'Sierra' union all select
2014, 'Infiniti', 'Q50' union all select
2014, 'Jaguar', 'F-Type' union all select
2014, 'Jeep', 'Cherokee' union all select
2014, 'Kia', 'Cadenza' union all select
2014, 'Kia', 'Forte' union all select
2014, 'Kia', 'Forte5' union all select
2014, 'Kia', 'Forte Koup' union all select
2014, 'Kia', 'Sorento' union all select
2014, 'Kia', 'Soul' union all select
2014, 'Land Rover', 'Range Rover Sport' union all select
2014, 'Lexus', 'IS' union all select
2014, 'Maserati', 'Ghibli' union all select
2014, 'Maserati' ,'Qauttroporte' union all select
2014, 'Mazda', 'Mazda3' union all select
2014, 'Mazda', 'Mazda6' union all select
2014, 'Mercedes-Benz', 'B-Class' union all select
2014, 'Mercedes-Benz', 'CLA-Class' union all select
2014, 'Mercedes-Benz', 'S-Class' union all select
2014, 'MINI', 'Cooper' union all select
2014, 'Mitsubishi', 'Mirage' union all select
2014, 'Mitsubishi', 'Outlander' union all select
2014, 'Nissan', 'NV200' union all select
2014, 'Nissan', 'Rogue' union all select
2014, 'Nissan', 'Versa Note' union all select
2014, 'Porsche', '918 Spyder' union all select
2014, 'Porsche', 'Cayman' union all select
2014, 'Porsche', 'Cayman S' union all select
2014, 'Dodge', 'Ram ProMaster' union all select
2014, 'Subaru', 'Forester' union all select
2014, 'Toyota', 'Corolla' union all select
2014, 'Toyota', 'Highlander' union all select
2014, 'Toyota', 'Tundra' union all select
2015, 'Acura', 'NSX' union all select
2015, 'Acura', 'TLX' union all select
2015, 'Alfa', 'Romeo 4C' union all select
2015, 'Aston Martin', 'Vantage GT' union all select
2015, 'Audi', 'A3' union all select
2015, 'Audi', 'Q3' union all select
2015, 'BMW', '4 Series' union all select
2015, 'BMW', 'M3' union all select
2015, 'BMW', 'M4' union all select
2015, 'BMW', 'M4 Convertible' union all select
2015, 'BMW', 'X4' union all select
2015, 'Cadillac', 'ATS Coupe' union all select
2015, 'Cadillac', 'Escalade' union all select
2015, 'Chevrolet', 'City Express' union all select
2015, 'Chevrolet', 'Colorado' union all select
2015, 'Chevrolet', 'Silverado HD' union all select
2015, 'Chevrolet', 'Suburban' union all select
2015, 'Chevrolet', 'Tahoe' union all select
2015, 'Chevrolet', 'Trax' union all select
2015, 'Chrysler', '200' union all select
2015, 'Dodge', 'Challenger' union all select
2015, 'Dodge', 'Charger' union all select
2015, 'Ford', 'Expedition' union all select
2015, 'Ford', 'F-150' union all select
2015, 'Ford', 'Mustang' union all select
2015, 'Ford', 'Transit 150 Wagon' union all select
2015, 'GMC', 'Canyon' union all select
2015, 'GMC', 'Sierra HD' union all select
2015, 'GMC', 'Yukon' union all select
2015, 'GMC', 'Yukon XL' union all select
2015, 'Honda', 'Fit' union all select
2015, 'Honda', 'HR-V' union all select
2015, 'Hyundai', 'Genesis' union all select
2015, 'Hyundai', 'Sonata' union all select
2015, 'Infiniti', 'Q70L' union all select
2015, 'Jaguar', 'F-Type' union all select
2015, 'Jeep', 'Renegade' union all select
2015, 'Kia', 'K900' union all select
2015, 'Kia', 'Sedona' union all select
2015, 'Kia', 'Soul EV' union all select
2015, 'Lexus', 'NX' union all select
2015, 'Lexus', 'RC F' union all select
2015, 'Lincoln', 'MKC' union all select
2015, 'Lincoln', 'Navigator' union all select
2015, 'McLaren', '650S' union all select
2015, 'Mercedes-Benz', 'C-Class' union all select
2015, 'Mercedes-Benz', 'GLA-Class' union all select
2015, 'Mercedes-Benz', 'S-Class' union all select
2015, 'MINI', 'Cooper' union all select
2015, 'Nissan', 'Murano' union all select
2015, 'Porsche', 'Macan' union all select
2015, 'Subaru', 'Legacy' union all select
2015, 'Subaru', 'Outback' union all select
2015, 'Subaru', 'WRX' union all select
2015, 'Subaru', 'WRX STI' union all select
2015, 'Toyota', 'Camry' union all select
2015, 'Volkswagen', 'Golf' union all select
2015, 'Volvo', 'V60'
) a
order by make, model

select * from dbo.CarsUS


