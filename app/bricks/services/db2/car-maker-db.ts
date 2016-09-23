import { Injectable } from "@angular/core";
import { SQLite } from 'ionic-native';
import { BaseDb, TypedDb, DbTypes, DbCmdFailure, DbCmdSuccess } from "../../../core/db2/";
import { CarMaker } from "../../models";
import * as ditto from "../../../core/helpers/ditto";

@Injectable() 
export class CarMakerDb extends TypedDb<CarMaker> {

	constructor(
		dbName: string,
		provider: number
	) {
		super(CarMakerDb.getSchema(), dbName, 'car_makers', provider);
	}

	/**
	 * Defines the schema used by a Car model.
	 */
	static getSchema(): any {
		return {
			'id': DbTypes.PRIMARY_KEY,
			'type': DbTypes.STRING,
			'manufacturer': DbTypes.STRING,
			'models': DbTypes.JSON
		}		
	}

	prime(): Promise<number> {
		return super.createTable()
			.then((tableCreated: DbCmdSuccess) => {

				return super.getRowCount()
					.then((rowCount: number) => {
						if (rowCount <= 0) {
							// haven't primed the data yet!
							let makers: Array<CarMaker> = this.getCarMakerList();
							return super.bulkInsert(makers);

						} else {
							// -1 => it's already been done
							return Promise.resolve(-1);

						}
					});

			})
		;

	}	// prime


	/**
	 * Gets all car makers by type (car, bike, lorry, etc).
	 */
	getByType(type: string): Promise<Array<CarMaker>> {
		return super.getByFilter('SELECT * FROM ' + this._tableName + ' WHERE type = ?', [type]);
	}

	/**
	 * 
	 */
	getByMaker(type: string, manufacturer: string): Promise<CarMaker> {
		return super.getByFilter('SELECT * FROM ' + this._tableName + ' WHERE type = ? AND manufacturer = ?', [type, manufacturer])
			.then((hits: Array<CarMaker>) => {
				if (ditto.any(hits))
					return ditto.first(hits);
				else 
					return null;
			})
		;
	}
	

	/**
	 * Initialises and primes the database with car manufacturer data.
	 */
	private getCarMakerList(): Array<CarMaker> {
		let makers: Array<CarMaker> = new Array<CarMaker>();
		
		// see "views.sql" in design folder to produce the data imput
		makers.push( CarMaker.create("CAR", "Abarth", "Abarth 500,Abarth 595,Abarth 695,Abarth Punto") );
		makers.push( CarMaker.create("CAR", "Acura", "Acura Tl") );
		makers.push( CarMaker.create("LORRY", "Acura", "Acura Mdx") );
		makers.push( CarMaker.create("BIKE", "Adly", "Adly Airtech,Adly Cat 100,Adly Citybird 50,Adly Fox 50,Adly Jet 100,Adly Jet 50,Adly Panther 50,Adly Sf50,Adly Ss 100 Activator,Adly Ss 125d Activator,Adly Supersonic,Adly Tb 100,Adly Tb 100 Predator,Adly Tb 125,Adly Tb 125 D,Adly Tb 125d Activator,Adly Tb50 Thunderbike") );
		makers.push( CarMaker.create("LORRY", "Adly", "Adly Atv 320,Adly Atv 400") );
		makers.push( CarMaker.create("BIKE", "Aeon", "Aeon Argon,Aeon Pulsar") );
		makers.push( CarMaker.create("LORRY", "Aeon", "Aeon Argon,Aeon Ra56") );
		makers.push( CarMaker.create("CAR", "Aixam", "Aixam 400,Aixam 500,Aixam A751,Aixam Coupe,Aixam Crossline,Aixam Crossover,Aixam Mega,Aixam Scouty") );
		makers.push( CarMaker.create("LORRY", "Aixam", "Aixam Coupe,Aixam Mega") );
		makers.push( CarMaker.create("BIKE", "Ajp", "Ajp Enduro,Ajp Supermotard") );
		makers.push( CarMaker.create("BIKE", "Ajs", "Ajs Cr3 125,Ajs Dd 100,Ajs Dd 125,Ajs Dd 250,Ajs Dd 350,Ajs Dd 50,Ajs Dfe 50,Ajs Digita,Ajs Eco,Ajs Firefox,Ajs Flight,Ajs Js 125,Ajs Jsm 125,Ajs Jsm 50,Ajs Modena 125,Ajs Modena 50,Ajs Nac 12,Ajs R7,Ajs Spt 350,Ajs Tn 12,Ajs Yx-r 125,Ajs Zn 125") );
		makers.push( CarMaker.create("CAR", "Alfa Romeo", "Alfa Romeo 145,Alfa Romeo 146,Alfa Romeo 147,Alfa Romeo 155,Alfa Romeo 156,Alfa Romeo 159,Alfa Romeo 164,Alfa Romeo 166,Alfa Romeo 1750,Alfa Romeo 2000,Alfa Romeo 33,Alfa Romeo 4c,Alfa Romeo 6,Alfa Romeo 75,Alfa Romeo 8c,Alfa Romeo 90,Alfa Romeo Alfasud,Alfa Romeo Alfetta,Alfa Romeo Asd,Alfa Romeo Berlina,Alfa Romeo Brera,Alfa Romeo Giulia,Alfa Romeo Giulietta,Alfa Romeo Gt,Alfa Romeo Gtv,Alfa Romeo Junior,Alfa Romeo Mito,Alfa Romeo Montreal,Alfa Romeo Series S3,Alfa Romeo Spider,Alfa Romeo Sprint,Alfa Romeo Sz") );
		makers.push( CarMaker.create("LORRY", "Alfa Romeo", "Alfa Romeo 156,Alfa Romeo Giulia,Alfa Romeo Gtv,Alfa Romeo Spider") );
		makers.push( CarMaker.create("CAR", "All Wheel Drive", "All Wheel Drive Tl 10-14,All Wheel Drive Tl 8-14") );
		makers.push( CarMaker.create("LORRY", "All Wheel Drive", "All Wheel Drive Mt 12-18,All Wheel Drive Tl 10-14,All Wheel Drive Tl 12-16,All Wheel Drive Tl 13-16,All Wheel Drive Tl 17-18,All Wheel Drive Tl 20-18,All Wheel Drive Tl 21-16,All Wheel Drive Tl 7-14,All Wheel Drive Tl 8-14,All Wheel Drive Tl 9-14") );
		makers.push( CarMaker.create("BIKE", "Aprilia", "Aprilia 125 Sport Prod.,Aprilia Area 51,Aprilia Atlantic,Aprilia Atlantic 200,Aprilia Atlantic 500,Aprilia Caponord,Aprilia Classic 125,Aprilia Classic 50,Aprilia Dorsoduro,Aprilia Etv Caponord,Aprilia Etx 125,Aprilia Gulliver,Aprilia Leonardo,Aprilia Leonardo 125,Aprilia Leonardo 150,Aprilia Leonardo 250,Aprilia Leonardo 300,Aprilia Mana,Aprilia Mojito,Aprilia Moto 6.5,Aprilia Mx 125,Aprilia Mx 50,Aprilia Pegaso 125,Aprilia Pegaso 650,Aprilia Pegaso 660,Aprilia Rally 50,Aprilia Red Rose 125,Aprilia Rs 125,Aprilia Rs 125r Extrema,Aprilia Rs 250 R,Aprilia Rs4,Aprilia Rs50,Aprilia Rst Futura,Aprilia Rsv 07,Aprilia Rsv 1000,Aprilia Rsv 1000 R,Aprilia Rsv 1000 Sp,Aprilia Rsv 4,Aprilia Rsv Mille,Aprilia Rsv Tuono,Aprilia Rx 125,Aprilia Rx50,Aprilia Rxv,Aprilia Scarabeo,Aprilia Scarabeo 100,Aprilia Scarabeo 125,Aprilia Scarabeo 50,Aprilia Scarbeo 50,Aprilia Shiver 750,Aprilia Sl 1000,Aprilia Sl 750,Aprilia Sonic,Aprilia Sonic Ft,Aprilia Sonic Gp,Aprilia Sport City,Aprilia Sr 125,Aprilia Sr 50,Aprilia Sr 50 Di Tec,Aprilia Sr Max,Aprilia Sr Motard 125,Aprilia Srv 850,Aprilia Svx,Aprilia Sx 125,Aprilia Sx 50,Aprilia Sxv,Aprilia Tuareg 600 Wind,Aprilia Tuono 1000,Aprilia Tuono 125,Aprilia Tuono 50,Aprilia Tuono Fighter,Aprilia Tuono V4") );
		makers.push( CarMaker.create("CAR", "Asia", "Asia Rocsta") );
		makers.push( CarMaker.create("LORRY", "Asia", "Asia Rocsta") );
		makers.push( CarMaker.create("CAR", "Aston Martin", "Aston Martin Cygnet,Aston Martin Db1,Aston Martin Db2,Aston Martin Db2/4,Aston Martin Db3,Aston Martin Db4,Aston Martin Db5,Aston Martin Db6,Aston Martin Db7,Aston Martin Db9,Aston Martin Db9o,Aston Martin Dbs,Aston Martin Lagonda,Aston Martin One-77,Aston Martin Rapide,Aston Martin V12 Vanquish,Aston Martin V8,Aston Martin Vanquish,Aston Martin Vanquish V12,Aston Martin Vantage,Aston Martin Virage,Aston Martin Volante,Aston Martin Zagato") );
		makers.push( CarMaker.create("LORRY", "Aston Martin", "Aston Martin Db7") );
		makers.push( CarMaker.create("CAR", "Audi", "Audi 100,Audi 200,Audi 60,Audi 70,Audi 80,Audi 90,Audi A1,Audi A2,Audi A3,Audi A4,Audi A5,Audi A6,Audi A7,Audi A8,Audi Allroad,Audi Avant,Audi C,Audi Cabriolet,Audi Coupe,Audi Q3,Audi Q5,Audi Q7,Audi Quattro,Audi R8,Audi Rio,Audi Rs2,Audi Rs3,Audi Rs4,Audi Rs5,Audi Rs6,Audi Rs7,Audi Rsq3,Audi S1,Audi S3,Audi S4,Audi S5,Audi S6,Audi S7,Audi S8,Audi Sq5,Audi Tt,Audi Tts,Audi V8") );
		makers.push( CarMaker.create("LORRY", "Audi", "Audi 100,Audi A3,Audi A4,Audi A6,Audi Allroad,Audi Q3,Audi Q5,Audi Q7,Audi S4,Audi Tt") );
		makers.push( CarMaker.create("BIKE", "Austin", "Austin A35,Austin A55") );
		makers.push( CarMaker.create("CAR", "Austin", "Austin 10cwt,Austin 1100,Austin 1300,Austin 1800,Austin 2200,Austin 3 Litre,Austin 7cwt,Austin A105,Austin A110,Austin A135,Austin A30,Austin A35,Austin A40,Austin A50,Austin A55,Austin A60,Austin A95,Austin A99,Austin Allegro,Austin Ambassador,Austin Car-derived Van,Austin Healey,Austin Maestro,Austin Maxi,Austin Metro,Austin Mini,Austin Montego,Austin Nash,Austin Princess,Austin Seven,Austin Six,Austin Sprite,Austin Taxi") );
		makers.push( CarMaker.create("LORRY", "Austin", "Austin 10cwt,Austin 1300,Austin 1800,Austin 3 Litre,Austin 6cwt,Austin 7cwt,Austin 8cwt,Austin A30,Austin A35,Austin A40,Austin A50,Austin A55,Austin A60,Austin Allegro,Austin Car-derived Van,Austin Half Ton Van,Austin Maestro,Austin Maxi,Austin Metro,Austin Mini,Austin Princess,Austin Seven,Austin Taxi") );
		makers.push( CarMaker.create("CAR", "Austin Morris", "Austin Morris Maxi,Austin Morris Mini,Austin Morris Princess") );
		makers.push( CarMaker.create("LORRY", "Austin Morris", "Austin Morris Mini") );
		makers.push( CarMaker.create("LORRY", "Auto-trail", "Auto-trail Ducato,Auto-trail Scudo") );
		makers.push( CarMaker.create("BIKE", "Bajaj", "Bajaj 125 Chetak,Bajaj Classic,Bajaj Kb 100") );
		makers.push( CarMaker.create("BIKE", "Baotian", "Baotian Bt 110,Baotian Bt 125,Baotian Bt 49,Baotian Bt 50,Biatian Bt 49") );
		makers.push( CarMaker.create("BIKE", "Baron", "Baron Zn 125") );
		makers.push( CarMaker.create("BIKE", "Baroni", "Baroni Efv 150,Baroni Efv 200") );
		makers.push( CarMaker.create("BIKE", "Barossa", "Barossa Xs 125,Barossa Xs 50") );
		makers.push( CarMaker.create("LORRY", "Barossa", "Barossa Cheetah") );
		makers.push( CarMaker.create("BIKE", "Bashan", "Bashan Bs 125 Gy,Bashan Bs 200,Bashan Bs 200 Gy,Bashan Vx 250") );
		makers.push( CarMaker.create("CAR", "Bashan", "Bashan Bs 200") );
		makers.push( CarMaker.create("LORRY", "Bashan", "Bashan Bs 200") );
		makers.push( CarMaker.create("BIKE", "Battistinis", "Battistinis Chopper") );
		makers.push( CarMaker.create("CAR", "Bedford", "Bedford Astra,Bedford Beagle,Bedford Midi") );
		makers.push( CarMaker.create("LORRY", "Bedford", "Bedford 10cwt,Bedford 6cwt,Bedford 8cwt,Bedford 97,Bedford 99,Bedford Astra,Bedford Astramax,Bedford Astravan,Bedford Beagle,Bedford Brava,Bedford Car-derived Van,Bedford Chevanne,Bedford Kb26,Bedford Midi,Bedford Non-car Derived Van") );
		makers.push( CarMaker.create("BIKE", "Beeline", "Beeline Memory,Beeline Pista,Beeline Supermoto,Beeline Veloce") );
		makers.push( CarMaker.create("BIKE", "Benelli", "Benelli 491 Rr,Benelli 491 Sport,Benelli 491 St,Benelli 491 Superbike,Benelli 49x,Benelli Adiva 125,Benelli Adiva 150,Benelli Bn,Benelli K2,Benelli K2 100,Benelli Naked 50,Benelli Pepe,Benelli Tnt,Benelli Tornado,Benelli Tornado 900,Benelli Tornado 900 Le,Benelli Tre,Benelli Velvet 125,Benelli Velvet 150,Benelli Velvet 250,Benelli Velvet 400") );
		makers.push( CarMaker.create("CAR", "Bentley", "Bentley Arnage,Bentley Azure,Bentley Brooklands,Bentley Continental,Bentley Eight,Bentley Flying Spur,Bentley Mulsanne,Bentley Turbo") );
		makers.push( CarMaker.create("LORRY", "Bentley", "Bentley Arnage") );
		makers.push( CarMaker.create("BIKE", "Beta", "Beta Alp,Beta Ark,Beta Eikon,Beta Euro,Beta Evo,Beta Jonathan,Beta Mini,Beta Motard,Beta Rev,Beta Rr 2t,Beta Rr 4t,Beta Techno,Beta Tempo,Beta Trials,Beta Xtrainer") );
		makers.push( CarMaker.create("BIKE", "Better", "Better Bt 125") );
		makers.push( CarMaker.create("BIKE", "Bimota", "Bimota 500 V-due,Bimota Bb1 Supermono,Bimota Db10,Bimota Db3 Mantra,Bimota Db5,Bimota Db6,Bimota Db9,Bimota Sb6,Bimota Sb8r,Bimota Sb8r Special,Bimota Yb11,Bimota Yb9 Sr,Bimota Yb9 Sri") );
		makers.push( CarMaker.create("BIKE", "Blata", "Blata 125 Enduro,Blata 125 Motard") );
		makers.push( CarMaker.create("BIKE", "Bmw", "Bmw 1502,Bmw 1802,Bmw 2000,Bmw 2002,Bmw 2800,Bmw 3 Series,Bmw 3.0 S,Bmw 3.3 L,Bmw 3000,Bmw 5 Series,Bmw 7 Series,Bmw C 600,Bmw C 650,Bmw C Evolution,Bmw C1,Bmw F 650,Bmw F 650 Gs,Bmw F 700,Bmw F 800,Bmw F650 Cs,Bmw Fraser Nash,Bmw G 450,Bmw G 650,Bmw Hp2,Bmw Hp4,Bmw K 100,Bmw K 100 Lt,Bmw K 100 Rs,Bmw K 100 Rt,Bmw K 1100 Lt,Bmw K 1100 Rs,Bmw K 1200 Gt,Bmw K 1200 Lt,Bmw K 1200 R,Bmw K 1200 Rs,Bmw K 1200 S,Bmw K 1600,Bmw K 75,Bmw K 75 C,Bmw K 75 Rt,Bmw K 75 S,Bmw K1,Bmw K1300,Bmw K1300 R,Bmw K1300 S,Bmw R 100,Bmw R 100 Cs,Bmw R 100 Gs,Bmw R 100 R,Bmw R 100 Rs,Bmw R 100 Rt,Bmw R 100 T,Bmw R 1100 Gs,Bmw R 1100 R,Bmw R 1100 Rs,Bmw R 1100 Rt,Bmw R 1100 S,Bmw R 1150 Gs,Bmw R 1150 R,Bmw R 1150 Rs,Bmw R 1150 Rt,Bmw R 1200,Bmw R 1200 C,Bmw R 45,Bmw R 45 T,Bmw R 65,Bmw R 65 Ls,Bmw R 80,Bmw R 80 Gs,Bmw R 80 Rt,Bmw R 80 Rt T,Bmw R 80 St,Bmw R 80 T,Bmw R 850 C,Bmw R 850 Gs,Bmw R 850 R,Bmw R 850 Rt,Bmw R Nine T,Bmw S 1000") );
		makers.push( CarMaker.create("CAR", "Bmw", "Bmw 1 Series,Bmw 1500,Bmw 1502,Bmw 1600,Bmw 1602,Bmw 1800,Bmw 1802,Bmw 2 Series,Bmw 2000,Bmw 2002,Bmw 2500,Bmw 2800,Bmw 3 Series,Bmw 3.0 Cs,Bmw 3.0 S,Bmw 3.3 L,Bmw 4 Series,Bmw 5 Series,Bmw 6 Series,Bmw 7 Series,Bmw 8 Series,Bmw Alpina,Bmw C1,Bmw Ci,Bmw Fraser Nash,Bmw I3,Bmw I8,Bmw K 100 Rt,Bmw K 75 C,Bmw K 75 S,Bmw M Coupe,Bmw M Roadster,Bmw M1,Bmw M2,Bmw M3,Bmw M4,Bmw M5,Bmw M6,Bmw R 1100 R,Bmw R 850 Rt,Bmw X1,Bmw X3,Bmw X4,Bmw X5,Bmw X6,Bmw Z1,Bmw Z3,Bmw Z4,Bmw Z8") );
		makers.push( CarMaker.create("LORRY", "Bmw", "Bmw 1600,Bmw 2 Series,Bmw 2000,Bmw 3 Series,Bmw 3.0 Cs,Bmw 3.0 S,Bmw 5 Series,Bmw 6 Series,Bmw 7 Series,Bmw X1,Bmw X3,Bmw X5,Bmw X6,Bmw Z3,Bmw Z4") );
		makers.push( CarMaker.create("LORRY", "Bombardier", "Bombardier Ds 250,Bombardier Outlander,Bombardier Renegade") );
		makers.push( CarMaker.create("CAR", "Bond", "Bond 250g,Bond 875,Bond Bug,Bond Equipe,Bond Petrol Tricycle") );
		makers.push( CarMaker.create("LORRY", "Bond", "Bond 875") );
		makers.push( CarMaker.create("BIKE", "Boom", "Boom Chopper") );
		makers.push( CarMaker.create("BIKE", "Bra", "Bra Mr3") );
		makers.push( CarMaker.create("BIKE", "Branson", "Branson Bc 125,Branson Bk 50,Branson Bk 70,Branson Bm 125,Branson Bs 125,Branson Bs 49,Branson Bs 50,Branson Bt 200") );
		makers.push( CarMaker.create("LORRY", "Bremach", "Bremach Extreme") );
		makers.push( CarMaker.create("CAR", "Bristol", "Bristol 400,Bristol 401,Bristol 402,Bristol 403,Bristol 404,Bristol 405,Bristol 406,Bristol 407,Bristol 408,Bristol 409,Bristol 410,Bristol 411,Bristol 412,Bristol 603,Bristol Beaufighter,Bristol Blenheim,Bristol Brigand,Bristol Britannia,Bristol Fighter,Bristol Speedster") );
		makers.push( CarMaker.create("BIKE", "British Trackstar", "British Trackstar Gy 125,British Trackstar Gy 150,British Trackstar Gy 200,British Trackstar Gy 250") );
		makers.push( CarMaker.create("BIKE", "Bsa", "Bsa Gold Sr") );
		makers.push( CarMaker.create("BIKE", "Btm", "Btm Tanco") );
		makers.push( CarMaker.create("BIKE", "Buell", "Buell 1125r,Buell 750 Strike,Buell Blast,Buell Firebolt Xb9r,Buell M2 Cyclone,Buell S1 Lightning,Buell S1w,Buell S3 Thunderbolt,Buell S3t Thunderbolt,Buell X1 Lightning,Buell Xb12r Firebolt,Buell Xb12s Lightning,Buell Xb12ss Lightning,Buell Xb12stt,Buell Xb12sx Lightning City X,Buell Xb12x Ulysses,Buell Xb9s Lightning,Buell Xb9sx Lightning City X") );
		makers.push( CarMaker.create("CAR", "Buick", "Buick Electra,Buick Riviera,Buick Sabre,Buick Special,Buick Wildcat") );
		makers.push( CarMaker.create("LORRY", "Buick", "Buick Special") );
		makers.push( CarMaker.create("BIKE", "Bullit", "Bulit Hunt") );
		makers.push( CarMaker.create("BIKE", "Bultaco", "Bultaco Astro,Bultaco Lobito") );
		makers.push( CarMaker.create("CAR", "Cadillac", "Cadillac Bls,Cadillac Cts,Cadillac Escalade,Cadillac Seville,Cadillac Srx Srx,Cadillac Sts,Cadillac Xlr") );
		makers.push( CarMaker.create("LORRY", "Cadillac", "Cadillac Escalade,Cadillac Srx Srx") );
		makers.push( CarMaker.create("BIKE", "Cagiva", "Cagiva 125 Mito,Cagiva 125 Roadster,Cagiva 50 City,Cagiva 650 Raptor,Cagiva 650 V Raptor,Cagiva 750 Elefant,Cagiva 900 Elefant,Cagiva Canyon,Cagiva Mito,Cagiva Navigator,Cagiva Nuvola,Cagiva Planet,Cagiva Raptor,Cagiva River,Cagiva Super City 125,Cagiva V-raptor,Cagiva W12 350,Cagiva W8,Cagiva X Raptor") );
		makers.push( CarMaker.create("BIKE", "Can-am", "Can-am Spyder") );
		makers.push( CarMaker.create("CAR", "Can-am", "Can-am Outlander,Can-am Renegade") );
		makers.push( CarMaker.create("LORRY", "Can-am", "Can-am Commander,Can-am Ds,Can-am Maverick,Can-am Outlander,Can-am Renegade,Can-am Spyder") );
		makers.push( CarMaker.create("CAR", "Carbodies", "Carbodies Taxi") );
		makers.push( CarMaker.create("CAR", "Caterham", "Caterham 21") );
		makers.push( CarMaker.create("BIKE", "Ccm", "Ccm 404,Ccm 604 E Sport,Ccm 604 E Supermoto,Ccm 604 R,Ccm 604 Sport,Ccm Cr40,Ccm C-xr 125,Ccm C-xr 230,Ccm Dual Sport,Ccm Ft 35s,Ccm Gp 450,Ccm Lx 125,Ccm R 30 Supermoto,Ccm Sm 125,Ccm Sr-40 Street Scrambler,Ccm Tl 125") );
		makers.push( CarMaker.create("CAR", "Ccm", "Ccm 604 R") );
		makers.push( CarMaker.create("LORRY", "Ccm", "Ccm Utv 700") );
		makers.push( CarMaker.create("LORRY", "Cectek", "Cectek Gladiator,Cectek Quadrift") );
		makers.push( CarMaker.create("BIKE", "Cf Moto", "Cf Moto Cf 650,Cf Moto E-charm,Cf Moto E-jewell,Cf Moto V5,Cf Moto Z8") );
		makers.push( CarMaker.create("CAR", "Cf Moto", "Cf Moto X6") );
		makers.push( CarMaker.create("LORRY", "Cf Moto", "Cf Moto 800,Cf Moto Cf 550,Cf Moto Cf 600,Cf Moto Cf 625,Cf Moto Tracker 800,Cf Moto Uforce 550,Cf Moto X6,Cf Moto Z8") );
		makers.push( CarMaker.create("BIKE", "Ch Racing", "Ch Racing Wsm 125,Ch Racing Wsm 50,Ch Racing Wxe 125,Ch Racing Wxe 50") );
		makers.push( CarMaker.create("BIKE", "Champ", "Champ Californian Cf 125,Champ Californian Cf 250,Champ City Monkey Cm50,Champ City Monkey Cm90,Champ Commuter Rs 125,Champ Commuter Rs 50,Champ Dakar Dk 125") );
		makers.push( CarMaker.create("LORRY", "Chausson", "Chausson Best Of,Chausson Flash,Chausson Welcome") );
		makers.push( CarMaker.create("CAR", "Chevrolet", "Chevrolet Aveo,Chevrolet Camaro,Chevrolet Captiva,Chevrolet Corvette,Chevrolet Cruze,Chevrolet Epica,Chevrolet Kalos,Chevrolet Lacetti,Chevrolet Matiz,Chevrolet Orlando,Chevrolet Spark,Chevrolet Tacuma,Chevrolet Trax,Chevrolet Volt") );
		makers.push( CarMaker.create("LORRY", "Chevrolet", "Chevrolet Captiva,Chevrolet Kalos") );
		makers.push( CarMaker.create("CAR", "Chevrolet Gmc", "Chevrolet Gmc Belair,Chevrolet Gmc Biscayne,Chevrolet Gmc Blazer,Chevrolet Gmc Camaro,Chevrolet Gmc Chevelle,Chevrolet Gmc Chevy,Chevrolet Gmc Corvette,Chevrolet Gmc Impala,Chevrolet Gmc Kalos,Chevrolet Gmc Lacetti,Chevrolet Gmc Matiz,Chevrolet Gmc Non-car Derived Van,Chevrolet Gmc Silverado,Chevrolet Gmc Tacuma,Chevrolet Gmc Tahoe,Chevrolet Gmc Vega") );
		makers.push( CarMaker.create("LORRY", "Chevrolet Gmc", "Chevrolet Gmc Blazer,Chevrolet Gmc Car-derived Van,Chevrolet Gmc Chevelle,Chevrolet Gmc Chevy,Chevrolet Gmc Non-car Derived Van,Chevrolet Gmc Silverado,Chevrolet Gmc Vega") );
		makers.push( CarMaker.create("BIKE", "Chituma", "Chituma Ctm 125,Chituma Ctm 50,Chituma Gy 125,Chituma Gy 200") );
		makers.push( CarMaker.create("CAR", "Chrysler", "Chrysler 180,Chrysler 2 Litre,Chrysler 300,Chrysler 300c,Chrysler Alpine,Chrysler Avenger,Chrysler Ch,Chrysler Charger,Chrysler Crossfire,Chrysler Delta,Chrysler Grand Voyager,Chrysler Hunter,Chrysler Neon,Chrysler New Yorker,Chrysler Pt Cruiser,Chrysler Regal,Chrysler Sebring,Chrysler Street Cruiser,Chrysler Sunbeam,Chrysler Town & Country,Chrysler Valiant,Chrysler Viper,Chrysler Voyager,Chrysler Ypsilon") );
		makers.push( CarMaker.create("LORRY", "Chrysler", "Chrysler Pt Cruiser,Chrysler Town & Country,Chrysler Voyager") );
		makers.push( CarMaker.create("BIKE", "Chunlan", "Chunlan Starway") );
		makers.push( CarMaker.create("LORRY", "Cimotorhome", "Cimotorhome 316,Cimotorhome Ducato") );
		makers.push( CarMaker.create("CAR", "Citroen", "Citroen 1500,Citroen 2cv,Citroen Ami,Citroen Ax,Citroen Berlingo,Citroen Bx,Citroen C1,Citroen C15,Citroen C2,Citroen C3,Citroen C4,Citroen C5,Citroen C6,Citroen C8,Citroen C-crosser,Citroen Cx,Citroen C-zero,Citroen D Safari,Citroen D Special,Citroen D Super,Citroen D19,Citroen D20,Citroen Dispatch,Citroen Ds,Citroen Ds19,Citroen Ds20,Citroen Ds21,Citroen Ds23,Citroen Ds3,Citroen Ds4,Citroen Ds5,Citroen Dyane,Citroen G Special,Citroen Gs,Citroen Gsa,Citroen Gsx,Citroen Id,Citroen Id19,Citroen Id20,Citroen Lna,Citroen Nemo,Citroen Pallas,Citroen Pluriel,Citroen Relay,Citroen Safari,Citroen Saxo,Citroen Sm,Citroen Synergie,Citroen Visa,Citroen Xantia,Citroen Xm,Citroen Xsara,Citroen Zx") );
		makers.push( CarMaker.create("LORRY", "Citroen", "Citroen 1800,Citroen 2cv,Citroen Ami,Citroen Berlingo,Citroen C15,Citroen C2,Citroen C25,Citroen C4,Citroen C5,Citroen C6,Citroen C8,Citroen Car-derived Van,Citroen C-crosser,Citroen Cx,Citroen Dispatch,Citroen Ds23,Citroen Ds3,Citroen Dyane,Citroen G Special,Citroen Gs,Citroen Nemo,Citroen Relay,Citroen Synergie,Citroen Xm,Citroen Xsara,Citroen Zx") );
		makers.push( CarMaker.create("BIKE", "Ckr", "Ckr Sonic 125,Ckr Sonic 50") );
		makers.push( CarMaker.create("BIKE", "Classic Custom", "Classic Custom Softail Custom") );
		makers.push( CarMaker.create("CAR", "Classic Replicas", "Classic Replicas Mule,Classic Replicas Viper") );
		makers.push( CarMaker.create("CAR", "Colt", "Colt 1400,Colt Celeste,Colt Cordia,Colt Galant,Colt Hatchback,Colt Lancer,Colt Sapporo,Colt Shogun,Colt Sigma") );
		makers.push( CarMaker.create("LORRY", "Colt", "Colt Galant,Colt Lancer") );
		makers.push( CarMaker.create("CAR", "Corvette", "Corvette C6,Corvette Z06") );
		makers.push( CarMaker.create("BIKE", "Cpi", "Cpi Aragon,Cpi Bravo 125,Cpi Bravo 50,Cpi Formula,Cpi Gtr,Cpi Hussar,Cpi Oliver,Cpi Popcorn,Cpi Sm 250,Cpi Sm 50,Cpi Supermoto 125,Cpi Suv,Cpi Sx 250,Cpi Sx 50,Cpi Velvet,Cpi Xr 125") );
		makers.push( CarMaker.create("LORRY", "Cpi", "Cpi Xs 250") );
		makers.push( CarMaker.create("BIKE", "Csr", "Csr Nkt") );
		makers.push( CarMaker.create("BIKE", "Ctm", "Ctm 150,Ctm 250,Ctm 50,Ctm Ob 100") );
		makers.push( CarMaker.create("BIKE", "Cz", "Cz 125,Cz 125 D/l,Cz 175 D/l,Cz 180,Cz 250 D/l,Cz 250 Single,Cz 350") );
		makers.push( CarMaker.create("CAR", "Dacia", "Dacia Duster,Dacia Logan,Dacia Sandero") );
		makers.push( CarMaker.create("LORRY", "Dacia", "Dacia Duster,Dacia Pick-up") );
		makers.push( CarMaker.create("BIKE", "Daelim", "Daelim Citi,Daelim City Ace,Daelim Cordi,Daelim Daystar,Daelim Delpino,Daelim E5,Daelim Es50,Daelim Message,Daelim Nc 125,Daelim Ql 125,Daelim Roadwin,Daelim S Five,Daelim S5,Daelim Sc 125,Daelim Se 50,Daelim Sl 125,Daelim Sn 125,Daelim Su 125,Daelim Sv 125,Daelim Sv 250,Daelim Trans,Daelim Vee,Daelim Vf 125,Daelim Vj 125,Daelim Vjf 125,Daelim Vjf 250,Daelim Vl 125,Daelim Vl 250,Daelim Vs 125,Daelim Yc 125") );
		makers.push( CarMaker.create("CAR", "Daewoo", "Daewoo Espero,Daewoo Kalos,Daewoo Korando,Daewoo Lacetti,Daewoo Lanos,Daewoo Leganza,Daewoo Matiz,Daewoo Musso,Daewoo Nexia,Daewoo Nubira,Daewoo Tacuma") );
		makers.push( CarMaker.create("LORRY", "Daewoo", "Daewoo Korando,Daewoo Matiz,Daewoo Musso") );
		makers.push( CarMaker.create("CAR", "Daf Trucks", "Daf Trucks 33,Daf Trucks 44,Daf Trucks 46,Daf Trucks 55,Daf Trucks 66") );
		makers.push( CarMaker.create("LORRY", "Daf Trucks", "Daf Trucks 33,Daf Trucks 44,Daf Trucks 55,Daf Trucks Fa 1900,Daf Trucks Fa 1900 Dns,Daf Trucks Fa 2500,Daf Trucks Fa 45,Daf Trucks Fa 45lf,Daf Trucks Fa 55,Daf Trucks Fa 55lf,Daf Trucks Fa 65cf,Daf Trucks Fa 75cf,Daf Trucks Fa 85cf,Daf Trucks Fa 95xf,Daf Trucks Fad 75cf,Daf Trucks Fad 85cf,Daf Trucks Fag 75cf,Daf Trucks Fan 55lf,Daf Trucks Fan 75cf,Daf Trucks Far 85cf,Daf Trucks Fas 2100,Daf Trucks Fas 2500,Daf Trucks Fas 75cf,Daf Trucks Fas 85cf,Daf Trucks Fas 95xf,Daf Trucks Fat 75cf,Daf Trucks Fat 85cf,Daf Trucks Fax 85cf,Daf Trucks Ft 2500,Daf Trucks Ft 55,Daf Trucks Ft 55lf,Daf Trucks Ft 75cf,Daf Trucks Ft 85cf,Daf Trucks Ft 95xf,Daf Trucks Ftg 85cf,Daf Trucks Ftg 95xf,Daf Trucks Ftm 95xf,Daf Trucks Ftp 85cf,Daf Trucks Ftp 95xf,Daf Trucks Ftr 95xf,Daf Trucks Fts 95xf,Daf Trucks Ftt 85cf,Daf Trucks Ftt 95xf") );
		makers.push( CarMaker.create("BIKE", "Daihatsu", "Daihatsu F20") );
		makers.push( CarMaker.create("CAR", "Daihatsu", "Daihatsu Applause,Daihatsu Charade,Daihatsu Charmant,Daihatsu Copen,Daihatsu Cuore,Daihatsu Domino,Daihatsu F20,Daihatsu F50,Daihatsu Fourtrak,Daihatsu Grand Move,Daihatsu Hi-jet,Daihatsu Materia,Daihatsu Mira,Daihatsu Move,Daihatsu Sirion,Daihatsu Sportrak,Daihatsu Terios,Daihatsu Yrv") );
		makers.push( CarMaker.create("LORRY", "Daihatsu", "Daihatsu Charade,Daihatsu Copen,Daihatsu Cuore,Daihatsu Extol,Daihatsu F20,Daihatsu F50,Daihatsu F55,Daihatsu Fourtrak,Daihatsu Hi-jet,Daihatsu Midget,Daihatsu S70,Daihatsu Sportrak,Daihatsu Terios") );
		makers.push( CarMaker.create("CAR", "Daimler", "Daimler 2.8,Daimler 3.6,Daimler 4.0,Daimler 4.2,Daimler Century,Daimler Conquest,Daimler Dk 400,Daimler Double Six,Daimler Drop Head Coupe,Daimler Eagle,Daimler Landaulette,Daimler Limousine,Daimler Majestic,Daimler One-o-four,Daimler Six,Daimler Sovereign,Daimler Sp 250,Daimler Super 8,Daimler V8,Daimler Xj6") );
		makers.push( CarMaker.create("LORRY", "Daimler", "Daimler Double Six") );
		makers.push( CarMaker.create("BIKE", "Dajiang", "Dajiang X-dirt") );
		makers.push( CarMaker.create("CAR", "Datsun", "Datsun 100,Datsun 1000,Datsun 120,Datsun 1200,Datsun 140,Datsun 1400,Datsun 160,Datsun 1600,Datsun 180,Datsun 2.8,Datsun 200,Datsun 2000,Datsun 240,Datsun 260,Datsun 280,Datsun 510,Datsun Bluebird,Datsun Cherry,Datsun Laurel,Datsun Micra,Datsun Patrol,Datsun Prairie,Datsun Skyline,Datsun Stanza,Datsun Sunny") );
		makers.push( CarMaker.create("LORRY", "Datsun", "Datsun 1600,Datsun 260,Datsun G620") );
		makers.push( CarMaker.create("BIKE", "Dayun", "Dayun Dy 125") );
		makers.push( CarMaker.create("BIKE", "Derbi", "Derbi Atlantis,Derbi Baja,Derbi Boulevard,Derbi Gp1,Derbi Gpr,Derbi Gpr 50,Derbi Hunter,Derbi Mulhacen,Derbi Paddock,Derbi Predator,Derbi Senda,Derbi Terra,Derbi Terra 125 Adventure,Derbi X-race") );
		makers.push( CarMaker.create("LORRY", "Dethleffs", "Dethleffs Advantage,Dethleffs Esprit,Dethleffs Evan,Dethleffs Globebus,Dethleffs Globetrotter,Dethleffs Magic Edition,Dethleffs Sunlight,Dethleffs Trend") );
		makers.push( CarMaker.create("LORRY", "Dfsk", "Dfsk Loadhopper") );
		makers.push( CarMaker.create("CAR", "Dinli", "Dinli Dl 801") );
		makers.push( CarMaker.create("LORRY", "Dinli", "Dinli Dl 801") );
		makers.push( CarMaker.create("BIKE", "Dirt Pro", "Dirt Pro Gy 125,Dirt Pro Gy 200") );
		makers.push( CarMaker.create("CAR", "Dodge", "Dodge Avenger,Dodge Caliber,Dodge Car-derived Van,Dodge Durango,Dodge Journey,Dodge Nitro,Dodge Ram 1500,Dodge S35,Dodge Srt") );
		makers.push( CarMaker.create("LORRY", "Dodge", "Dodge 1100,Dodge Car-derived Van,Dodge Durango,Dodge Journey,Dodge Nitro,Dodge Ram 1500,Dodge S35,Dodge Srt") );
		makers.push( CarMaker.create("CAR", "Ds", "Ds Ds3,Ds Ds4,Ds Ds5") );
		makers.push( CarMaker.create("BIKE", "Ducati", "Ducati 1000 Ss,Ducati 1098,Ducati 1098 R,Ducati 1098 S,Ducati 1198,Ducati 1198s,Ducati 1199 Panigale,Ducati 1199 Superleggera,Ducati 1299 Panigale,Ducati 400 Ss,Ducati 600 M,Ducati 600 Super Sport,Ducati 620 S Ff,Ducati 748 B,Ducati 748 Biposto,Ducati 748 E,Ducati 748 R,Ducati 748 S,Ducati 748 S Biposto,Ducati 748 Sp,Ducati 748 Sps,Ducati 749,Ducati 749 Biposto,Ducati 749 Dark,Ducati 749 Mono,Ducati 749 R,Ducati 749 S,Ducati 749 S Biposto,Ducati 750 F1,Ducati 750 M,Ducati 750 S,Ducati 750 Sport,Ducati 750 Ss,Ducati 800 S,Ducati 800 Ss,Ducati 848,Ducati 851 Streetbike,Ducati 888 Sp Iv,Ducati 888 Sps,Ducati 888 Strada,Ducati 899 Panigale,Ducati 900 M,Ducati 900 S,Ducati 900 Sl,Ducati 900 Ss,Ducati 900 Super Sport,Ducati 906 Paso,Ducati 907 Ie,Ducati 916,Ducati 916 Biposto,Ducati 916 Sp,Ducati 916 Sps,Ducati 996,Ducati 996 Biposto,Ducati 996 R,Ducati 996 S,Ducati 996 Sps,Ducati 998 Biposto,Ducati 998 R,Ducati 998 S,Ducati 999,Ducati 999 Biposto,Ducati 999 Mono,Ducati 999 R,Ducati 999 S,Ducati 999 S Biposto,Ducati Desmosedici,Ducati Diavel,Ducati F848,Ducati Gt 1000,Ducati Hypermotard,Ducati Hyperstrada,Ducati M 1000,Ducati M 800,Ducati M1000 S,Ducati M1100,Ducati M1200,Ducati M1200 S,Ducati M600,Ducati M620,Ducati M620 Dark,Ducati M620 S,Ducati M695,Ducati M696,Ducati M750,Ducati M750 Dark,Ducati M796,Ducati M800 Dark,Ducati M800 S,Ducati M821,Ducati M900,Ducati M900 Dark,Ducati M900s,Ducati Mh900e,Ducati Monster 400,Ducati Monster S2r,Ducati Multistrada 1000 S,Ducati Multistrada 1100,Ducati Multistrada 1200,Ducati Multistrada 620,Ducati Panigale,Ducati Paul Smart 1000,Ducati S2r,Ducati S4,Ducati S4 R,Ducati Scrambler,Ducati Sport,Ducati St2,Ducati St3,Ducati St4,Ducati St4 S,Ducati Street Fighter") );
		makers.push( CarMaker.create("BIKE", "Easy Rider", "Easy Rider Cj 50,Easy Rider Cj 50k,Easy Rider Cj 70 Holiday,Easy Rider Dx 50,Easy Rider Dx 90,Easy Rider Jc 100,Easy Rider Jc 110,Easy Rider Jc 125,Easy Rider Jc 250,Easy Rider Jc 50 Q,Easy Rider Jc 90,Easy Rider Jh 125l,Easy Rider K 100,Easy Rider M 50,Easy Rider Qf 130,Easy Rider St 50,Easy Rider St 90") );
		makers.push( CarMaker.create("BIKE", "Ego", "Ego Ec,Ego Me Helio Cycle") );
		makers.push( CarMaker.create("BIKE", "Enfield", "Enfield Bullet,Enfield Explorer,Enfield Silver,Enfield Sports,Enfield Thunderbird") );
		makers.push( CarMaker.create("BIKE", "Epc", "Epc Shining 150") );
		makers.push( CarMaker.create("BIKE", "Erider", "Erider B2000,Erider B3000,Erider T4000") );
		makers.push( CarMaker.create("BIKE", "Erik Buell Racing", "Erik Buell Racing Ebr 1190") );
		makers.push( CarMaker.create("BIKE", "Eton", "Eton Magic") );
		makers.push( CarMaker.create("BIKE", "Evt", "Evt 4000") );
		makers.push( CarMaker.create("BIKE", "Explorer", "Explorer Sm 50") );
		makers.push( CarMaker.create("BIKE", "Factory", "Factory Yr 250 Desert") );
		makers.push( CarMaker.create("BIKE", "Fantic Motor", "Fantic Motor Trials,Fantic Motor Tz 170,Fantic Motor Tz 200") );
		makers.push( CarMaker.create("BIKE", "Feiying", "Feiying Fy 110,Feiying Fy 125") );
		makers.push( CarMaker.create("CAR", "Ferrari", "Ferrari 360,Ferrari 430,Ferrari 458,Ferrari 488,Ferrari 575,Ferrari 575m,Ferrari 599,Ferrari 612,Ferrari California,Ferrari F12,Ferrari F430,Ferrari Ff,Ferrari Laferrari,Ferrari Sa Aperta") );
		makers.push( CarMaker.create("CAR", "Fiat", "Fiat 1050,Fiat 1100,Fiat 124,Fiat 125,Fiat 126,Fiat 127,Fiat 128,Fiat 130,Fiat 1300,Fiat 131,Fiat 132,Fiat 1500,Fiat 1600,Fiat 2300,Fiat 5,Fiat 500,Fiat 500l,Fiat 600,Fiat 850,Fiat Barchetta,Fiat Berlinetta,Fiat Brava,Fiat Bravo,Fiat Cinquecento,Fiat Coupe,Fiat Croma,Fiat Dino,Fiat Doblo,Fiat Ducato,Fiat Fiorino,Fiat Freedom,Fiat Idea,Fiat Marea,Fiat Mirafiori,Fiat Multipla,Fiat Non-car Derived Van,Fiat Panda,Fiat Punto,Fiat Qubo,Fiat Regata,Fiat Scudo,Fiat Sedici,Fiat Seicento,Fiat Stilo,Fiat Strada,Fiat Swift,Fiat Tempra,Fiat Tipo,Fiat Ulysse,Fiat Uno,Fiat X1/9") );
		makers.push( CarMaker.create("LORRY", "Fiat", "Fiat 1100,Fiat 124,Fiat 127,Fiat 128,Fiat 130,Fiat 131,Fiat 1500,Fiat 2300,Fiat 5,Fiat 500,Fiat 600,Fiat 850,Fiat Adria,Fiat Auto Trail,Fiat Autocruise,Fiat Bessacarr,Fiat Bravo,Fiat Burstner,Fiat Carado,Fiat Ci,Fiat Cinquecento,Fiat Citivan,Fiat Coupe,Fiat Croma,Fiat Dino,Fiat Doblo,Fiat Dreamer,Fiat Ducato,Fiat Esprit,Fiat Fiorino,Fiat Idea,Fiat Itineo,Fiat Marea,Fiat Mizar,Fiat Multipla,Fiat Non-car Derived Van,Fiat Panda,Fiat Punto,Fiat Rapido,Fiat Regata,Fiat Rimor,Fiat Rollerteam,Fiat Scudo,Fiat Sedici,Fiat Stilo,Fiat Strada,Fiat Swift,Fiat Tempra,Fiat Tipo,Fiat Tribute,Fiat Trigano,Fiat Ulysse,Fiat Uno,Fiat Westfalia,Fiat X1/9") );
		makers.push( CarMaker.create("BIKE", "Ford", "Ford Popular") );
		makers.push( CarMaker.create("CAR", "Ford", "Ford 12m/15m,Ford 17m/20m,Ford Anglia,Ford B-max,Ford Capri,Ford Cardinal Hearse,Ford Classic,Ford C-max,Ford Consul,Ford Corsair,Ford Cortina,Ford Cougar,Ford Crown Victoria,Ford Dorchester,Ford Ecosport,Ford Escort,Ford Executive,Ford Explorer,Ford F150,Ford Fiesta,Ford Focus,Ford Fusion,Ford Galaxy,Ford Granada,Ford Grand C-max,Ford Grosvenor,Ford Gt,Ford Ka,Ford Kuga,Ford Ltd,Ford Maverick,Ford Minster,Ford Monarch,Ford Mondeo,Ford Mustang,Ford Orion,Ford P100,Ford Popular,Ford Prefect,Ford Probe,Ford Puma,Ford Ranger,Ford Rs 200,Ford Sapphire,Ford Scorpio,Ford Sierra,Ford S-max,Ford Streetka,Ford Taurus,Ford Thunderbird,Ford Tourneo,Ford Transit,Ford Zephyr,Ford Zodiac") );
		makers.push( CarMaker.create("LORRY", "Ford", "Ford Anglia,Ford Auto Trail,Ford B-max,Ford Capri,Ford Car-derived Van,Ford Ci,Ford Classic,Ford C-max,Ford Consul,Ford Cortina,Ford Cougar,Ford Courier,Ford Ecosport,Ford Escort,Ford Executive,Ford Explorer,Ford F150,Ford Fiesta,Ford Focus,Ford Fusion,Ford Galaxy,Ford Granada,Ford Ka,Ford Kuga,Ford Maverick,Ford Mondeo,Ford Mustang,Ford Non-car Derived Van,Ford Orion,Ford P100,Ford Popular,Ford Prefect,Ford Puma,Ford Ranger,Ford Rimor,Ford Rollerteam,Ford Scorpio,Ford Sierra,Ford S-max,Ford Thunderbird,Ford Tourneo,Ford Transit,Ford Trigano,Ford V6,Ford Zephyr,Ford Zodiac") );
		makers.push( CarMaker.create("LORRY", "Forest River", "Forest River Georgetown") );
		makers.push( CarMaker.create("BIKE", "Fosti", "Fosti Ft 125") );
		makers.push( CarMaker.create("LORRY", "Freight Rover", "Freight Rover Sherpa") );
		makers.push( CarMaker.create("CAR", "Fso Cars", "Fso Cars 125,Fso Cars Caro,Fso Cars Polonez") );
		makers.push( CarMaker.create("LORRY", "Fso Cars", "Fso Cars Caro,Fso Cars Pick-up") );
		makers.push( CarMaker.create("BIKE", "Futong", "Futong Ft 150") );
		makers.push( CarMaker.create("BIKE", "Fym", "Fym Fy 110,Fym Fy 125,Fym X-sport") );
		makers.push( CarMaker.create("BIKE", "Gamax", "Gamax Spillo") );
		makers.push( CarMaker.create("BIKE", "Garelli", "Garelli Moped") );
		makers.push( CarMaker.create("BIKE", "Gas Gas", "Gas Gas Cc 250,Gas Gas Cc 300,Gas Gas Ec 125,Gas Gas Ec 200,Gas Gas Ec 250,Gas Gas Ec 300,Gas Gas Ec 400 Fse,Gas Gas Ec 450,Gas Gas Ec 450 Fse,Gas Gas Ec Racing,Gas Gas Ec Rookie 50,Gas Gas Ecf 250,Gas Gas Ecf 300,Gas Gas Ecf 450,Gas Gas Endurocross 250,Gas Gas Hobby 200,Gas Gas Pampera 250,Gas Gas Pampera 280,Gas Gas Pro 250,Gas Gas Pro 280,Gas Gas Supermotard Fse 400,Gas Gas Supermotard X250,Gas Gas Supermotard X450,Gas Gas Tx 125,Gas Gas Tx 200,Gas Gas Tx 250,Gas Gas Tx 270,Gas Gas Tx 320,Gas Gas Tx Randonne 200,Gas Gas Txt 125,Gas Gas Txt 200,Gas Gas Txt 250,Gas Gas Txt 280,Gas Gas Txt 300,Gas Gas Txt 80,Gas Gas Txt Replica 280,Gas Gas Txt Replica 300") );
		makers.push( CarMaker.create("CAR", "Gas Gas", "Gas Gas Wild E Hp 450") );
		makers.push( CarMaker.create("BIKE", "Geely", "Geely Jl 125,Geely Jl 150,Geely Xy 125,Geely Xy 200 Gy,Geely Xy 250") );
		makers.push( CarMaker.create("LORRY", "Geely", "Geely Xy 250") );
		makers.push( CarMaker.create("LORRY", "Gem", "Gem E4") );
		makers.push( CarMaker.create("BIKE", "Generic", "Generic Code 125,Generic Cracker,Generic Cracker 50,Generic Epico,Generic Epico 50,Generic Evolution,Generic Ideo,Generic Onyx 50,Generic Race,Generic Roc 50,Generic Sirion 50,Generic Soho,Generic Tr 125,Generic Trigger,Generic Vertigo 125,Generic Worx 125,Generic Xor 125,Generic Xor 50,Generic Zion 125") );
		makers.push( CarMaker.create("BIKE", "Giantco", "Giantco Hy 125,Giantco Hy 150,Giantco Hy 50,Giantco Sprint,Giantco Xe") );
		makers.push( CarMaker.create("BIKE", "Gilera", "Gilera 125 Enduro,Gilera 125 Gfr,Gilera Apache 125,Gilera Cougar,Gilera Cx 125,Gilera Dna 125,Gilera Dna 180,Gilera Dna 50,Gilera Enduro 49,Gilera Fuocco,Gilera Gp 800,Gilera Gsm 50,Gilera H@k 50,Gilera Ice 50,Gilera Nexus,Gilera Rcr,Gilera Re,Gilera Rs,Gilera Runner,Gilera Runner 125,Gilera Runner 180,Gilera Runner 200,Gilera Runner 50,Gilera Saturno,Gilera Sc 125,Gilera Sioux,Gilera Smt,Gilera Stalker,Gilera Storm,Gilera Ts") );
		makers.push( CarMaker.create("CAR", "Goka", "Goka Gk 250") );
		makers.push( CarMaker.create("LORRY", "Goka", "Goka Gk1100") );
		makers.push( CarMaker.create("LORRY", "Goupil", "Goupil G3") );
		makers.push( CarMaker.create("BIKE", "Govecs", "Govecs S1.4,Govecs S2.4,Govecs S3.4,Govecs T2.4,Govecs T3.4") );
		makers.push( CarMaker.create("LORRY", "Great Wall", "Great Wall Steed") );
		makers.push( CarMaker.create("BIKE", "Greeves", "Greeves Anglian") );
		makers.push( CarMaker.create("CAR", "Gsmoon", "Gsmoon Xy Kd 260") );
		makers.push( CarMaker.create("LORRY", "Gsmoon", "Gsmoon Xy Kd 260") );
		makers.push( CarMaker.create("BIKE", "Hanway", "Hanway Dfe 50") );
		makers.push( CarMaker.create("BIKE", "Haotian", "Haotian Ht 125") );
		makers.push( CarMaker.create("BIKE", "Harley-davidson", "Harley-davidson 1200,Harley-davidson 1200 Custom,Harley-davidson 1200 Sport,Harley-davidson Fat Bob,Harley-davidson Fatboy,Harley-davidson Fatboy Flstf,Harley-davidson Fld,Harley-davidson Flhp,Harley-davidson Flhr,Harley-davidson Flhrc,Harley-davidson Flhs,Harley-davidson Flht,Harley-davidson Flhtk,Harley-davidson Flhtkl,Harley-davidson Flhx,Harley-davidson Fls,Harley-davidson Flss,Harley-davidson Flst,Harley-davidson Flstn,Harley-davidson Fltc,Harley-davidson Fltr,Harley-davidson Forty Eight,Harley-davidson Fxcw,Harley-davidson Fxd,Harley-davidson Fxd35,Harley-davidson Fxdb,Harley-davidson Fxdc,Harley-davidson Fxdf,Harley-davidson Fxdl,Harley-davidson Fxdw,Harley-davidson Fxdx,Harley-davidson Fxlr,Harley-davidson Fxr,Harley-davidson Fxs,Harley-davidson Fxsb,Harley-davidson Fxst,Harley-davidson Heritage,Harley-davidson Iron,Harley-davidson Roadster,Harley-davidson Seventy Two,Harley-davidson Softail,Harley-davidson Street,Harley-davidson Super Glide,Harley-davidson Superlow,Harley-davidson Switchback Fld,Harley-davidson Vrsc,Harley-davidson Wide Glide Fxdwg,Harley-davidson Xl 1200,Harley-davidson Xl 883,Harley-davidson Xl883c Sportster,Harley-davidson Xlh 1200,Harley-davidson Xr 1200") );
		makers.push( CarMaker.create("BIKE", "Hartford", "Hartford Hd 125l,Hartford Hd 125s,Hartford Hd 200s,Hartford Mini,Hartford Vr 125 H,Hartford Vr 125 X,Hartford Vr 125 Z,Hartford Vr 150h,Hartford Vr 150z,Hartford Vr 200 H") );
		makers.push( CarMaker.create("BIKE", "Herald Motor Company", "Herald Motor Classic 250,Herald Motor Company Haze 125,Herald Motor Company Haze 50,Herald Motor Company Vogue 50,Herald Motor Company Xf 125") );
		makers.push( CarMaker.create("BIKE", "Herche", "Herche Fun 50") );
		makers.push( CarMaker.create("BIKE", "Hillman", "Hillman Minx") );
		makers.push( CarMaker.create("CAR", "Hillman", "Hillman Avenger,Hillman Hunter,Hillman Husky,Hillman Imp,Hillman Minx") );
		makers.push( CarMaker.create("LORRY", "Hillman", "Hillman Husky,Hillman Imp,Hillman Minx") );
		makers.push( CarMaker.create("BIKE", "Himo", "Himo Gy 125,Himo Gy 200") );
		makers.push( CarMaker.create("LORRY", "Hino", "Hino Fs 2plkd,Hino Fy 2puka") );
		makers.push( CarMaker.create("CAR", "Holden", "Holden Gts,Holden Maloo") );
		makers.push( CarMaker.create("LORRY", "Holden", "Holden Grange,Holden Maloo") );
		makers.push( CarMaker.create("BIKE", "Honda", "Glr 125,Honda 1300,Honda Accord,Honda Afs1102sh,Honda Afs110csf,Honda Anc125,Honda Anc125e,Honda Anf125,Honda Anf125t,Honda Anf126,Honda Anf126t,Honda Atc110d,Honda C50,Honda C50c,Honda C50e,Honda C50la,Honda C50zal,Honda C50zz,Honda C70,Honda C70c,Honda C70e,Honda C70z2,Honda C70zz,Honda C90,Honda C90c,Honda C90e,Honda C90m,Honda C90-n,Honda C90z2,Honda C90zz,Honda Ca125,Honda Cb 1000 Ra,Honda Cb 650 Fa,Honda Cb1000,Honda Cb1000ra,Honda Cb100n,Honda Cb1100a,Honda Cb1100r,Honda Cb1100sa,Honda Cb1100sf,Honda Cb125,Honda Cb125j,Honda Cb125rsd,Honda Cb125t,Honda Cb125td,Honda Cb1300,Honda Cb1300a,Honda Cb1300f,Honda Cb1300sa,Honda Cb1300sf,Honda Cb200,Honda Cb250,Honda Cb250n,Honda Cb250r,Honda Cb350s,Honda Cb400,Honda Cb400at,Honda Cb400f,Honda Cb400n,Honda Cb400s,Honda Cb400sf,Honda Cb450d,Honda Cb500,Honda Cb500f,Honda Cb500s,Honda Cb500t,Honda Cb500xa,Honda Cb50j,Honda Cb550f,Honda Cb550k,Honda Cb600 Hornet,Honda Cb600f,Honda Cb650sc,Honda Cb650z,Honda Cb750,Honda Cb750f,Honda Cb750k,Honda Cb750ss,Honda Cb900,Honda Cb900f,Honda Cbf1000,Honda Cbf1000a,Honda Cbf1000f,Honda Cbf1000t,Honda Cbf125m,Honda Cbf250,Honda Cbf500,Honda Cbf600f,Honda Cbf600n,Honda Cbf600na,Honda Cbf600s,Honda Cbf600sa,Honda Cbr 1000 Ra,Honda Cbr 1000 Rr,Honda Cbr 1000 S,Honda Cbr 1000 Sa,Honda Cbr 650 Fa,Honda Cbr1000f,Honda Cbr1000r,Honda Cbr1000ra,Honda Cbr1000rr,Honda Cbr1000s,Honda Cbr1000sa,Honda Cbr1100x,Honda Cbr1100xx,Honda Cbr125r,Honda Cbr150r,Honda Cbr250,Honda Cbr300ra,Honda Cbr400,Honda Cbr400rr,Honda Cbr500ra,Honda Cbr600,Honda Cbr600f,Honda Cbr600fa,Honda Cbr600fr,Honda Cbr600ra,Honda Cbr600rr,Honda Cbr700sd,Honda Cbr900rr,Honda Cbx,Honda Cbx250rs-e,Honda Cbx550f,Honda Cbx750fe,Honda Cd125tc,Honda Cd175a5,Honda Cd185t,Honda Cd200t,Honda Cd250u,Honda Cf70,Honda Cf70c,Honda Cf70k,Honda Cg125,Honda Cg125b,Honda Cg125c,Honda Cg125e,Honda Cg125k,Honda Ch125e,Honda Ch125g,Honda Ch250f,Honda Ch250g,Honda City Fly Clr 125,Honda Civic,Honda Cj250t,Honda Cj360t,Honda Cl250sc,Honda Cm125c,Honda Cm200t,Honda Cm250t,Honda Cmx250,Honda Cmx250c,Honda Cmx450,Honda Cn250-l,Honda Cn250-m,Honda Cr125m,Honda Cr125r,Honda Cr125re,Honda Cr250m,Honda Cr250r,Honda Cr250re,Honda Cr450r,Honda Cr480r,Honda Cr500r,Honda Cr500re,Honda Cr60r,Honda Cr80r,Honda Crf1000a,Honda Crf230f,Honda Crf250,Honda Crf250l,Honda Crf250me,Honda Crf250r,Honda Crf250x,Honda Crf450,Honda Crf450f,Honda Crf450r,Honda Crf450x,Honda Crf50,Honda Crv,Honda Crx,Honda Ct125c,Honda Ctx 1300 A,Honda Cx500,Honda Cx500a,Honda Cx500b,Honda Cx500c,Honda Cx500e,Honda Cx500t,Honda Cx650e,Honda Cx650t,Honda Cy80z,Honda Dr400t,Honda Dream 50,Honda F6c,Honda Fes125,Honda Fes250,Honda Fjs600,Honda Fjs600a,Honda Fmx 650,Honda Ft500c,Honda Ftr223,Honda Fx650,Honda Gl 1800 B,Honda Gl 1800 E,Honda Gl1000k,Honda Gl1100a,Honda Gl1100b,Honda Gl1100c,Honda Gl1100d,Honda Gl1200a,Honda Gl1200d,Honda Gl1500aj Aspencade,Honda Gl1500c,Honda Gl1500j,Honda Gl1500k,Honda Gl1500l,Honda Gl1500se,Honda Gl1800a,Honda Gl1800b,Honda Gl1800c,Honda Gl1800d,Honda Gl1800f,Honda Gl500d,Honda Gl650d,Honda Gorilla,Honda H100a,Honda H100s,Honda Lead,Honda Ls125r,Honda Mb50sa,Honda Mbx125fe,Honda Mbx50sd,Honda Mbx80fwd,Honda Monkey,Honda Mrt250c,Honda Msx125,Honda Mt50s,Honda Mt50sg,Honda Mtf50s,Honda Mtx125rw,Honda Mtx200rw,Honda Mtx50s,Honda Mtx80rf,Honda Nb50m,Honda Nc 650 D,Honda Nc 700 D,Honda Nc 750 Sa,Honda Nc 750 Sd,Honda Nc50b,Honda Nc50g,Honda Nc50k,Honda Nc700sa,Honda Nc700x,Honda Nc750j,Honda Nc750xa,Honda Nc750xd,Honda Ncz50b,Honda Nd50mc,Honda Ne50m,Honda Ne50t,Honda Nes125,Honda Nh125g,Honda Nh125md,Honda Nh80md,Honda Nhx110wh,Honda Np50d,Honda Nps50,Honda Nrx 1800,Honda Ns125f,Honda Ns125r,Honda Ns250re,Honda Ns400rf,Honda Ns50msb,Honda Nsa700,Honda Nsc110e,Honda Nsc110wh,Honda Nsc50e,Honda Nsc50wh,Honda Nsr125,Honda Nsr125f,Honda Nsr125r,Honda Nss 125 Ad,Honda Nss300a,Honda Nt50f,Honda Nt50g,Honda Nt50h,Honda Nt650v,Honda Nt650v Deauville,Honda Nt700v,Honda Ntv600j,Honda Ntv600k,Honda Ntv600m,Honda Ntv650,Honda Nu50mc,Honda Nv50msd,Honda Nx125v,Honda Nx400,Honda Nx50b,Honda Nx650,Honda Nx650k,Honda Nx650l,Honda Nx650m,Honda Nx650n,Honda Nxr125,Honda Pa50l,Honda Pa50vc,Honda Pa50vl,Honda Pantheon Fes 125,Honda Pes 125,Honda Pf50mr2,Honda Phantom,Honda Px50,Honda Pxr50,Honda Qr50d,Honda Rs250r,Honda Rtl250s,Honda Rvf750,Honda Sa50j,Honda Sa50m,Honda Scv100,Honda Scv100f,Honda Ses125,Honda Sfx50,Honda Sgx50,Honda Sgx50x,Honda Sgx50y,Honda Sh125,Honda Sh150,Honda Sh300a,Honda Sh50,Honda Sh50e,Honda Sh50h,Honda Sh50k,Honda Sj100,Honda Sj50,Honda Sl230,Honda Slr650,Honda Sonic Nova,Honda Srx50,Honda Srx90t,Honda Ss50zb2,Honda St 1300 A,Honda St1100,Honda St1100 Police,Honda St1100a,Honda St1100l,Honda St1100m,Honda St1300,Honda St1300a,Honda St50j,Honda St50k,Honda St70,Honda Storm,Honda Szx50s,Honda Szx50x,Honda Tl125s,Honda Tl200e,Honda Tlr200,Honda Tlr200e,Honda Tlr250f,Honda Today 50,Honda Transalp,Honda Transalp 600vj,Honda Trx300fw,Honda Trx350d,Honda Trx350g,Honda Vf1000f,Honda Vf1000r,Honda Vf400f,Honda Vf500f,Honda Vf750c,Honda Vf750f,Honda Vf750s,Honda Vfr 1200,Honda Vfr400r,Honda Vfr750f,Honda Vfr750r,Honda Vfr800,Honda Vfr800 Aniv,Honda Vfr800a,Honda Vfr800f,Honda Vfr800x,Honda Vt 1100,Honda Vt 1300,Honda Vt 750 C2,Honda Vt 750s,Honda Vt125,Honda Vt125c,Honda Vt250f,Honda Vt500e,Honda Vt600c,Honda Vt750c,Honda Vt750c2,Honda Vt750c4,Honda Vt750cs,Honda Vt750dc,Honda Vtr1000,Honda Vtr1000f,Honda Vtr1000s,Honda Vtr1000sp,Honda Vtr250,Honda Vtx1300s,Honda Vtx1800,Honda Vtx1800c,Honda Ww125,Honda Ww125ex2,Honda X8r,Honda Xbr500f,Honda Xbr500g,Honda Xbr500h,Honda Xbr500s,Honda Xl1000v,Honda Xl125k,Honda Xl125r,Honda Xl125s,Honda Xl125v,Honda Xl185s,Honda Xl200,Honda Xl230,Honda Xl250k,Honda Xl250r,Honda Xl250re,Honda Xl250s,Honda Xl500r,Honda Xl500s,Honda Xl600l,Honda Xl600re,Honda Xl600v,Honda Xl650v,Honda Xl700v,Honda Xlr125,Honda Xlr250,Honda Xr100r,Honda Xr125l,Honda Xr200r,Honda Xr250,Honda Xr250r,Honda Xr350r,Honda Xr400r,Honda Xr50,Honda Xr500,Honda Xr600r,Honda Xr650,Honda Xr650l,Honda Xr650r,Honda Xrv750,Honda Xrv750l,Honda Xrv750m,Honda Xrv750n,Honda Xrv750p,Honda Xrv750y,Honda Z50jp,Honda Z50r") );
		makers.push( CarMaker.create("CAR", "Honda", "Honda Accord,Honda Acty,Honda Atc185s,Honda Atc200b,Honda Atc250es,Honda Atc70b,Honda Ballade,Honda C50,Honda C50e,Honda C50zal,Honda C70c,Honda C90,Honda Cb1100r,Honda Cb125t,Honda Cb250r,Honda Cb750f,Honda Cbr1000f,Honda Cbx,Honda Cbx550f,Honda Cd185t,Honda Cd200t,Honda Cf70,Honda Cf70c,Honda Civic,Honda Cm200t,Honda Concerto,Honda Coupe,Honda Cr125r,Honda Cr250r,Honda Cr480r,Honda Cr500r,Honda Cr60r,Honda Cr80r,Honda Crf450x,Honda Crv,Honda Crx,Honda Cr-z,Honda Ct125c,Honda Cx500b,Honda Cx500c,Honda Ent 550,Honda Fr-v,Honda Ft500d,Honda Gl1100a,Honda Gl1100c,Honda Gl1100d,Honda Gl1200d,Honda Gl500d,Honda H100a,Honda H100s,Honda Hr-v,Honda Insight,Honda Inspire,Honda Integra,Honda Jazz,Honda Legend,Honda Logo,Honda Me360,Honda Mtf50s,Honda Mtx80rf,Honda N360,Honda N600,Honda N600t,Honda Nc50a,Honda Ne50t,Honda Nfr250rgk,Honda Nh80md,Honda Ns50d,Honda Ns50msb,Honda Nsx,Honda Nt50h,Honda Odyssey,Honda Pa50dxv,Honda Pf50dxr,Honda Pr750f2,Honda Prelude,Honda Px50,Honda Pxr50,Honda Quintet,Honda Rs125r,Honda S2000,Honda S800,Honda Sh50h,Honda Shuttle,Honda Sports,Honda St50j,Honda Stepwagon,Honda Stream,Honda Tlm240r,Honda Tn360,Honda Touring,Honda Transalp,Honda Trx250r,Honda Trx300fw,Honda Trx350g,Honda Vf1000r,Honda Vf750c,Honda Vf750s,Honda Xbr500g,Honda Xbr500h,Honda Xl125k,Honda Xl125s,Honda Xl250k,Honda Xl250r,Honda Xl250s,Honda Xr200a,Honda Xr250r,Honda Xr500a,Honda Xr80,Honda Z50r,Honda Z600") );
		makers.push( CarMaker.create("LORRY", "Honda", "Honda Acty,Honda Cbf600s,Honda Civic,Honda Cr80r,Honda Crf450x,Honda Crv,Honda Fr-v,Honda H100s,Honda Hr-v,Honda Integra,Honda Jazz,Honda Non-car Derived Van,Honda Odyssey,Honda S2000,Honda Ses125,Honda Stepwagon,Honda Stream,Honda Tn550,Honda Touring,Honda Trx250t,Honda Trx300l,Honda Trx350d,Honda Trx350f,Honda Trx350t,Honda Trx420f,Honda Trx420t,Honda Trx500f") );
		makers.push( CarMaker.create("BIKE", "Hongdou", "Hongdou 110,Hongdou 125,Hongdou 250,Hongdou 50,Hongdou Gy 200,Hongdou Hd 125,Hongdou Hd 200,Hongdou Shenda") );
		makers.push( CarMaker.create("BIKE", "Hongyang", "Hongyang Hy 250") );
		makers.push( CarMaker.create("BIKE", "Hongyi", "Hongyi Diablo") );
		makers.push( CarMaker.create("BIKE", "Honley", "Honley Hd1,Honley Hd2,Honley Nm 125,Honley Oliver,Honley Rx3") );
		makers.push( CarMaker.create("BIKE", "Hrd", "Hrd Cabriolet Sm") );
		makers.push( CarMaker.create("BIKE", "Huasha", "Huasha Hs 50") );
		makers.push( CarMaker.create("BIKE", "Huatian", "Huatian Ht 125,Huatian Ht 50") );
		makers.push( CarMaker.create("CAR", "Humber", "Humber Hawk,Humber Imperial,Humber Sceptre,Humber Snipe") );
		makers.push( CarMaker.create("LORRY", "Humber", "Humber Snipe") );
		makers.push( CarMaker.create("CAR", "Hummer", "Hummer H1,Hummer H2,Hummer H3") );
		makers.push( CarMaker.create("LORRY", "Hummer", "Hummer H2,Hummer H3") );
		makers.push( CarMaker.create("BIKE", "Huoniao", "Huoniao Hn 125,Huoniao Hn 50") );
		makers.push( CarMaker.create("BIKE", "Huoniau", "Huoniau Hn 125") );
		makers.push( CarMaker.create("BIKE", "Husaberg", "Husaberg Fc 550,Husaberg Fe 250,Husaberg Fe 350,Husaberg Fe 390 Enduro,Husaberg Fe 400 E Elduro,Husaberg Fe 400 Enduro,Husaberg Fe 450,Husaberg Fe 501,Husaberg Fe 501 Elduro,Husaberg Fe 501 Enduro,Husaberg Fe 550,Husaberg Fe 570,Husaberg Fe 650 E,Husaberg Fs 450 E,Husaberg Fs 570,Husaberg Fs 570 Supersport,Husaberg Fs 650 Enduro,Husaberg Fs 650 Motard,Husaberg Te 125,Husaberg Te 250,Husaberg Te 300") );
		makers.push( CarMaker.create("BIKE", "Husqvarna", "Husqvarna 701 Enduro,Husqvarna 701 Supermoto,Husqvarna Chwxe 50,Husqvarna Fe250,Husqvarna Fe350,Husqvarna Fe450,Husqvarna Fe501,Husqvarna Nuda 900,Husqvarna Sm 125,Husqvarna Sm 450,Husqvarna Sm 510,Husqvarna Sm 570,Husqvarna Sm 610,Husqvarna Smr 511,Husqvarna Sms 125,Husqvarna Sms 4,Husqvarna Sms 630,Husqvarna Te 125,Husqvarna Te 250,Husqvarna Te 300,Husqvarna Te 310,Husqvarna Te 410,Husqvarna Te 449,Husqvarna Te 450,Husqvarna Te 510,Husqvarna Te 511,Husqvarna Te 570,Husqvarna Te 610,Husqvarna Te 630,Husqvarna Te125,Husqvarna Te250,Husqvarna Te300,Husqvarna Tr 650,Husqvarna Txc 250,Husqvarna Txc 310,Husqvarna Wr 125,Husqvarna Wr 250,Husqvarna Wr 300,Husqvarna Wr 360,Husqvarna Wre 125") );
		makers.push( CarMaker.create("LORRY", "Hymer", "Hymer B Class,Hymer Bsl,Hymer Cape Town,Hymer Car,Hymer Compact Class,Hymer Ex Class,Hymer Exsis,Hymer Grand Canyon,Hymer Ml,Hymer Serengeti,Hymer Sierra Nevada,Hymer Starline,Hymer Sydney,Hymer T Class,Hymer Tclass,Hymer Tramp,Hymer Van,Hymer Yellowstone") );
		makers.push( CarMaker.create("BIKE", "Hyosung", "Hyosung Cruise,Hyosung Ez 100,Hyosung Gd 250,Hyosung Gf 125,Hyosung Grand Prix,Hyosung Gt 125,Hyosung Gt 250,Hyosung Gt 650,Hyosung Gv 125,Hyosung Gv 250,Hyosung Gv 650,Hyosung Hyper,Hyosung Midas Deluxe,Hyosung Ms3 125,Hyosung Ms3 250,Hyosung Rt 125,Hyosung Rx 125,Hyosung Sense,Hyosung Sf50,Hyosung St7") );
		makers.push( CarMaker.create("CAR", "Hyundai", "Hymer Genesis,Hyundai 1400,Hyundai Accent,Hyundai Amica,Hyundai Atoz,Hyundai Coupe,Hyundai Elantra,Hyundai Genesis,Hyundai Getz,Hyundai Grandeur,Hyundai H100,Hyundai I10,Hyundai I20,Hyundai I30,Hyundai I40,Hyundai I800,Hyundai Iload,Hyundai Ix20,Hyundai Ix35,Hyundai Lantra,Hyundai Matrix,Hyundai Pony,Hyundai Santa,Hyundai S-coupe,Hyundai Sonata,Hyundai Stellar,Hyundai Terracan,Hyundai Trajet,Hyundai Tucson,Hyundai Veloster,Hyundai X2,Hyundai Xg") );
		makers.push( CarMaker.create("LORRY", "Hyundai", "Hyundai Amica,Hyundai Coupe,Hyundai H100,Hyundai I800,Hyundai Iload,Hyundai Ix35,Hyundai Matrix,Hyundai Pick Up,Hyundai Santa,Hyundai Terracan,Hyundai Trajet,Hyundai Tucson") );
		makers.push( CarMaker.create("BIKE", "Indian", "Indian Chief,Indian Chieftain,Indian Dark Horse,Indian Roadmaster,Indian Scout") );
		makers.push( CarMaker.create("CAR", "Infiniti", "Infiniti Ex30,Infiniti Ex37,Infiniti Fx30,Infiniti Fx37,Infiniti Fx50,Infiniti G20,Infiniti G37,Infiniti I30,Infiniti M30,Infiniti M35h,Infiniti M37,Infiniti Q50,Infiniti Q60,Infiniti Q70,Infiniti Qx50,Infiniti Qx70") );
		makers.push( CarMaker.create("LORRY", "Infiniti", "Infiniti Ex30,Infiniti Ex37,Infiniti Fx37,Infiniti Fx50,Infiniti Q50") );
		makers.push( CarMaker.create("CAR", "Irisbus", "Irisbus Daily") );
		makers.push( CarMaker.create("LORRY", "Irisbus", "Irisbus Daily") );
		makers.push( CarMaker.create("CAR", "issan ", "Nissan  Micra") );
		makers.push( CarMaker.create("CAR", "Isuzu", "Isuzu Bighorn,Isuzu Mu,Isuzu Piazza,Isuzu Trooper") );
		makers.push( CarMaker.create("LORRY", "Isuzu", "Isuzu Bighorn,Isuzu D-max,Isuzu Mu,Isuzu Piazza,Isuzu Pick-up,Isuzu Rodeo,Isuzu Trooper") );
		makers.push( CarMaker.create("CAR", "Isuzu Trucks", "Isuzu Trucks Nkr") );
		makers.push( CarMaker.create("LORRY", "Isuzu Trucks", "Isuzu Trucks Forward,Isuzu Trucks Grafter,Isuzu Trucks Nkr,Isuzu Trucks Npr,Isuzu Trucks Nqr") );
		makers.push( CarMaker.create("BIKE", "Italjet", "Italjet Dragster,Italjet Dragster D125,Italjet Dragster D180,Italjet F50,Italjet Formula 125,Italjet Jetset 125,Italjet Jetset 150,Italjet Jetset 50,Italjet Jupiter,Italjet Millennium 100,Italjet Millennium 125,Italjet Millennium 150,Italjet T125,Italjet Tiffany,Italjet Torpedo 50,Italjet V50") );
		makers.push( CarMaker.create("BIKE", "Iveco", "Iveco Daily") );
		makers.push( CarMaker.create("CAR", "Iveco", "Iveco Daily,Iveco Turbodaily") );
		makers.push( CarMaker.create("LORRY", "Iveco", "Iveco Daily,Iveco Eurocargo,Iveco Stralis,Iveco Trakker,Iveco Turbodaily") );
		makers.push( CarMaker.create("LORRY", "Iveco Ford", "Iveco Ford Daily,Iveco Ford Eurotrakker,Iveco Ford Turbodaily") );
		makers.push( CarMaker.create("LORRY", "Iveco-ford", "Iveco-ford 35,Iveco-ford Daily,Iveco-ford Eurocargo,Iveco-ford Eurotech,Iveco-ford Turbodaily") );
		makers.push( CarMaker.create("CAR", "Jaguar", "Jaguar 240,Jaguar 3.8,Jaguar 340,Jaguar 420,Jaguar E Type,Jaguar Eagle,Jaguar F Type,Jaguar F-pace,Jaguar Mk Ii,Jaguar Mk Ix,Jaguar Mk Vii,Jaguar Mk Viii,Jaguar Mk X,Jaguar S Type,Jaguar Sovereign,Jaguar X Type,Jaguar Xe Series,Jaguar Xf Series,Jaguar Xj Series,Jaguar Xk Series") );
		makers.push( CarMaker.create("LORRY", "Jaguar", "Jaguar E Type,Jaguar S Type,Jaguar Sovereign,Jaguar X Type,Jaguar Xj Series,Jaguar Xk Series") );
		makers.push( CarMaker.create("BIKE", "Jawa", "Jawa 350,Jawa 500 R,Jawa Automatic 210,Jawa Economy,Jawa Jazz,Jawa Nippy") );
		makers.push( CarMaker.create("LORRY", "Jcb", "Jcb 1tht,Jcb 2cx,Jcb 300,Jcb 3220,Jcb 3tft,Jcb 3tfth,Jcb 3tsth,Jcb 3tstm,Jcb 535,Jcb 6tft,Jcb 6tst,Jcb 714,Jcb 800d,Jcb 9tft,Jcb Workmax") );
		makers.push( CarMaker.create("BIKE", "Jcm", "Jcm Jc 50 Q") );
		makers.push( CarMaker.create("CAR", "Jeep", "Jeep Cherokee,Jeep Commander,Jeep Compass,Jeep G-cherokee,Jeep Grand Cherokee,Jeep Patriot,Jeep Renegade,Jeep Wrangler") );
		makers.push( CarMaker.create("LORRY", "Jeep", "Jeep Cherokee,Jeep Compass,Jeep Grand Cherokee,Jeep Patriot,Jeep Wrangler") );
		makers.push( CarMaker.create("CAR", "Jensen", "Jensen Ff,Jensen Gt,Jensen Interceptor,Jensen Jensen-healey,Jensen Sp,Jensen S-v8") );
		makers.push( CarMaker.create("BIKE", "Jialing", "Jialing Jd 90,Jialing Jh 125,Jialing Jh 50,Jialing Jh 70,Jialing Jl 70,Jialing Jl125") );
		makers.push( CarMaker.create("BIKE", "Jianshe", "Jianshe Js 100,Jianshe Js 125,Jianshe Js 125 Y") );
		makers.push( CarMaker.create("BIKE", "Jincheng", "Jincheng Jc 125,Jincheng Jc 250,Jincheng Jc 50 Q,Jincheng Jc 90,Jincheng M 50") );
		makers.push( CarMaker.create("BIKE", "Jinlin", "Jinlin Jl 150") );
		makers.push( CarMaker.create("BIKE", "Jinlun", "Jinlun Jl 125,Jinlun Jl 250,Jinlun Jl 50 Q") );
		makers.push( CarMaker.create("BIKE", "Jm Star", "Jm Star Jsd 50") );
		makers.push( CarMaker.create("LORRY", "John Deere", "John Deere 2000 Series,John Deere 4000 Series,John Deere 6100 Series,John Deere 6e Series,John Deere 800 Series,John Deere Hpx Series,John Deere Te400 Series,John Deere Ts400 Series,John Deere Xuv 800 Series") );
		makers.push( CarMaker.create("BIKE", "Jonway", "Jonway Ln Florida 50,Jonway Yy 125,Jonway Yy 50") );
		makers.push( CarMaker.create("BIKE", "Jordan", "Jordan Easy 100,Jordan Easy 50") );
		makers.push( CarMaker.create("BIKE", "Kaisar", "Kaisar Ks 125") );
		makers.push( CarMaker.create("BIKE", "Kangda", "Kangda Kd 125,Kangda Kd 50") );
		makers.push( CarMaker.create("BIKE", "Kanuni", "Kanuni 251 Seyhan,Kanuni 301 Seyhan,Kanuni Etz 251,Kanuni Etz 301") );
		makers.push( CarMaker.create("CAR", "Kasea", "Kasea Quadzilla") );
		makers.push( CarMaker.create("LORRY", "Kasea", "Kasea Quadzilla") );
		makers.push( CarMaker.create("BIKE", "Kawasaki", "Kawasaki Ae80,Kawasaki Ar125,Kawasaki Ar50,Kawasaki Ar80,Kawasaki Bn125,Kawasaki Br250,Kawasaki Bx250,Kawasaki Dx175,Kawasaki Dx250,Kawasaki Ej650,Kawasaki Ej800,Kawasaki El250,Kawasaki En450,Kawasaki En500,Kawasaki En650,Kawasaki Er250,Kawasaki Er300,Kawasaki Er500,Kawasaki Er650,Kawasaki Ex 250,Kawasaki Ex 300,Kawasaki Ex 650,Kawasaki Ex250,Kawasaki Ex305,Kawasaki Ex500,Kawasaki Ex650,Kawasaki Kc100,Kawasaki Kdx125,Kawasaki Kdx200,Kawasaki Kdx220,Kawasaki Kdx250,Kawasaki Ke100,Kawasaki Ke125,Kawasaki Ke175,Kawasaki Kh100,Kawasaki Kh125,Kawasaki Kh250,Kawasaki Kl250,Kawasaki Kl600,Kawasaki Kl650,Kawasaki Kle500,Kawasaki Kle650,Kawasaki Klv1000,Kawasaki Klx125,Kawasaki Klx250,Kawasaki Klx300,Kawasaki Klx400,Kawasaki Klx650,Kawasaki Klz1000,Kawasaki Kmx125,Kawasaki Kmx200,Kawasaki Kr250,Kawasaki Ksr110,Kawasaki Kx125,Kawasaki Kx250,Kawasaki Kx85,Kawasaki Rn 125,Kawasaki Sc300,Kawasaki Tr250,Kawasaki Vn 900,Kawasaki Vn1500,Kawasaki Vn1600,Kawasaki Vn1700,Kawasaki Vn2000,Kawasaki Vn750,Kawasaki Vn800,Kawasaki Vn900,Kawasaki Z1000,Kawasaki Z1100,Kawasaki Z1300,Kawasaki Z200,Kawasaki Z250,Kawasaki Z400,Kawasaki Z440,Kawasaki Z550,Kawasaki Z650,Kawasaki Z750,Kawasaki Zg1000,Kawasaki Zg1300,Kawasaki Zg1400,Kawasaki Zl1000,Kawasaki Zl600,Kawasaki Zr1000,Kawasaki Zr1100,Kawasaki Zr1200,Kawasaki Zr400,Kawasaki Zr550,Kawasaki Zr750,Kawasaki Zr800,Kawasaki Zx10,Kawasaki Zx1000,Kawasaki Zx1100,Kawasaki Zx1200,Kawasaki Zx1400,Kawasaki Zx400,Kawasaki Zx550,Kawasaki Zx600,Kawasaki Zx636,Kawasaki Zx7,Kawasaki Zx750,Kawasaki Zx900") );
		makers.push( CarMaker.create("LORRY", "Kawasaki", "Kawasaki Dx250,Kawasaki Kaf400,Kawasaki Kaf950,Kawasaki Klf300,Kawasaki Kvf650") );
		makers.push( CarMaker.create("BIKE", "Kazuma", "Kazuma Cheetah") );
		makers.push( CarMaker.create("BIKE", "Keen", "Keen Bad Boy") );
		makers.push( CarMaker.create("BIKE", "Keeway", "Keeway Arn,Keeway Blackster,Keeway Cityblade,Keeway Cruiser 250,Keeway F-act,Keeway Flash,Keeway Focus,Keeway Hacker,Keeway Hurricane,Keeway Landcruiser,Keeway Logik,Keeway Matrix,Keeway Partner,Keeway Pixel,Keeway Rk 125,Keeway Rks 125,Keeway Rkv 125,Keeway Speed,Keeway Strike 125,Keeway Superlight,Keeway Swan,Keeway Target 125,Keeway Tx 125,Keeway Tx 50,Keeway X-ray") );
		makers.push( CarMaker.create("CAR", "Kia", "Kia Carens,Kia Ceed,Kia Cerato,Kia Clarus,Kia Magentis,Kia Mentor,Kia Optima,Kia Picanto,Kia Pride,Kia Pro Ceed,Kia Rio,Kia Sedona,Kia Shuma,Kia Sorento,Kia Soul,Kia Sportage,Kia Venga") );
		makers.push( CarMaker.create("LORRY", "Kia", "Kia Carens,Kia Picanto,Kia Pride,Kia Sedona,Kia Sorento,Kia Sportage") );
		makers.push( CarMaker.create("BIKE", "Kinetic", "Kinetic Style") );
		makers.push( CarMaker.create("BIKE", "Kinlon", "Kinlon Jl 125,Kinlon Jl 250,Kinlon Jl 50 Q,Kinlon Jl125") );
		makers.push( CarMaker.create("BIKE", "Kinroad", "Kinroad Gy 125,Kinroad Xt 125,Kinroad Xt 200,Kinroad Xt 50,Kinroad Xthxf,Kinroad Xtly") );
		makers.push( CarMaker.create("LORRY", "Knaus", "Knaus Boxstar,Knaus Sky,Knaus Sun,Knaus Van") );
		makers.push( CarMaker.create("BIKE", "Ksr Moto", "Ksr Moto Grs 125,Ksr Moto Tr 50,Ksr Moto Tw 125,Ksr Moto Worx 125") );
		makers.push( CarMaker.create("BIKE", "Ktm", "Ktm 1050 Adventure,Ktm 1190 Adventure,Ktm 1190 Rc8,Ktm 125,Ktm 125 1000,Ktm 125 Duke,Ktm 125 Exc,Ktm 125 Lc2,Ktm 125 Sting,Ktm 125 Supermoto,Ktm 1290 Super Adventure,Ktm 1290 Superduke,Ktm 200 Duke,Ktm 200 Egs,Ktm 200 Exc,Ktm 200 Sx,Ktm 250 Exc,Ktm 250 Sx,Ktm 300 Egs,Ktm 300 Exc,Ktm 350 Exc,Ktm 360 Ex,Ktm 390 Duke,Ktm 400 Egs/exc,Ktm 400 Exc,Ktm 400 Sc,Ktm 400 Sxc,Ktm 450,Ktm 450 Exc,Ktm 450 Rally,Ktm 450 Sx,Ktm 500 Enduro,Ktm 500 Exc,Ktm 520 Exc,Ktm 520 Sx,Ktm 525 Exc,Ktm 525 Mxc,Ktm 525 Sx,Ktm 530 Exc,Ktm 560 Gs Enduro,Ktm 620 Adventure,Ktm 620 Duke,Ktm 620 Egs/exc,Ktm 620 Sc,Ktm 620 Sx,Ktm 625 Smc,Ktm 625 Sxc,Ktm 640 Adventure-r,Ktm 640 Duke,Ktm 640 Egs/exc,Ktm 640 Lc4,Ktm 640 Supermoto,Ktm 660,Ktm 660 Rallye,Ktm 690 Duke,Ktm 690 Enduro,Ktm 690 Lc4,Ktm 690 Smc,Ktm 950 Adventure-s,Ktm 950 Super Enduro,Ktm 950 Supermoto,Ktm 990 Adventure,Ktm 990 Superduke,Ktm 990 Supermoto,Ktm Duke 2,Ktm Freeride,Ktm Lc 8,Ktm Lc4 400,Ktm Lc4 640,Ktm Rc 125,Ktm Rc 390") );
		makers.push( CarMaker.create("LORRY", "Ktm", "Ktm 525 Xc") );
		makers.push( CarMaker.create("LORRY", "Kubota", "Kubota M135gx,Kubota Rtv1140,Kubota Rtv400,Kubota Rtv500,Kubota Rtv900,Kubota Rtvx900") );
		makers.push( CarMaker.create("BIKE", "Kymco", "Kymco Agility,Kymco Ck 125,Kymco Ck1 125,Kymco Cobra Cross,Kymco Cobra Racer,Kymco Cruiser,Kymco Dj 50,Kymco Downtown,Kymco Downtown 125,Kymco Ego,Kymco Fever,Kymco Filly,Kymco Grand Dink,Kymco Heroism,Kymco Hipster,Kymco K12,Kymco K-pipe 125,Kymco K-pipe 50,Kymco Kr Naked,Kymco Kr Sport,Kymco Ks 125,Kymco Ks 50,Kymco Like,Kymco Miler,Kymco Movie X2,Kymco Nexxon,Kymco People,Kymco Pulsar,Kymco Queen,Kymco Scout,Kymco Sector,Kymco Sento,Kymco Spacer,Kymco Spacer 50,Kymco Stryker,Kymco Super 8,Kymco Super 9,Kymco Top Boy,Kymco Uxv 500,Kymco Venox,Kymco Vitality,Kymco Vivio,Kymco Xciting,Kymco Xiting,Kymco Yager,Kymco Yup 50,Kymco Zing,Kymco Zx 50") );
		makers.push( CarMaker.create("CAR", "Kymco", "Kymco Kxr,Kymco Maxxer,Kymco Mxer,Kymco Mxu 150,Kymco Mxu 250,Kymco Mxu 300,Kymco Mxu 400,Kymco Mxu 500") );
		makers.push( CarMaker.create("LORRY", "Kymco", "Kymco Kxr,Kymco Maxxer,Kymco Mxer,Kymco Mxu 150,Kymco Mxu 300,Kymco Mxu 450,Kymco Mxu 500,Kymco Uxv 500") );
		makers.push( CarMaker.create("CAR", "Lada", "Lada 1200,Lada 1500,Lada 1600,Lada Cossack,Lada Hussar,Lada Niva,Lada Riva,Lada Samara") );
		makers.push( CarMaker.create("LORRY", "Lada", "Lada Niva") );
		makers.push( CarMaker.create("CAR", "Lamborghini", "Lamborghini Aventador,Lamborghini Diablo,Lamborghini Gallardo,Lamborghini Huracan,Lamborghini Murcielago") );
		makers.push( CarMaker.create("LORRY", "Lamborghini", "Lamborghini Gallardo") );
		makers.push( CarMaker.create("BIKE", "Lambretta", "Lambretta Gp 150,Lambretta Gp 200,Lambretta V4003") );
		makers.push( CarMaker.create("BIKE", "Lancia", "Lancia 2000,Lancia Flavia") );
		makers.push( CarMaker.create("CAR", "Lancia", "Lancia 2000,Lancia Beta,Lancia Coupe,Lancia Cpe,Lancia Dedra,Lancia Delta,Lancia Flaminia,Lancia Flavia,Lancia Fulvia,Lancia Gamma,Lancia Hf,Lancia Hpe,Lancia Montecarlo,Lancia Prisma,Lancia Spyder,Lancia Thema,Lancia Trevi,Lancia Y10") );
		makers.push( CarMaker.create("CAR", "Land Rover", "Land Rover 109,Land Rover 110,Land Rover 127,Land Rover 88,Land Rover 90,Land Rover Defender,Land Rover Discovery,Land Rover Freelander,Land Rover Range Rover") );
		makers.push( CarMaker.create("LORRY", "Land Rover", "Land Rover 109,Land Rover 110,Land Rover 127,Land Rover 88,Land Rover 90,Land Rover Defender,Land Rover Discovery,Land Rover Freelander,Land Rover Range Rover") );
		makers.push( CarMaker.create("BIKE", "Laverda", "Laverda 750s,Laverda Diamante,Laverda Formula,Laverda Formula 750,Laverda Ghost,Laverda Ghost Strike") );
		makers.push( CarMaker.create("CAR", "Ldv", "Ldv 200 Series,Ldv 400 Series,Ldv Cub,Ldv Maxus") );
		makers.push( CarMaker.create("LORRY", "Ldv", "Ldv 200 Series,Ldv 400 Series,Ldv Cub,Ldv Maxus") );
		makers.push( CarMaker.create("BIKE", "Leike", "Leike Lk 125,Leike Lk 50") );
		makers.push( CarMaker.create("BIKE", "Lexmoto", "Aspire 125,Assault 125,Diablo 125,Lexmoto Arizona,Lexmoto Arrow,Lexmoto Dart 125,Lexmoto Dfe,Lexmoto Flash,Lexmoto Fmr 125,Lexmoto Fmr 50,Lexmoto Fms 125,Lexmoto Fmx 125,Lexmoto Gladiator,Lexmoto Ht 125,Lexmoto Matador,Lexmoto Milano,Lexmoto Scout 49,Lexmoto Str 125,Lexmoto Str125,Lexmoto Str50,Lexmoto Texan,Lexmoto Tommy,Lexmoto Tornado,Lexmoto Valencia,Lexmoto Valiant,Lexmoto Venom 125,Lexmoto Verona,Lexmoto Wy 125,Lexmoto Wy 50,Lexmoto Xflm 125,Lexmoto Xtr 125,Lexmoto Zn 125,Lexmoto Zoom,Lexmoto Zsa 125,Lexmoto Zsb 125,Lexmoto Zsf 125,Lexmoto Zsx 125,Michigan 125,Oregon 125") );
		makers.push( CarMaker.create("CAR", "Lexus", "Lexus Ct 200,Lexus Gs 250,Lexus Gs 450,Lexus Gs 460,Lexus Gs300,Lexus Gs430,Lexus Is F,Lexus Is200,Lexus Is220,Lexus Is250,Lexus Is300,Lexus Lfa,Lexus Ls400,Lexus Ls430,Lexus Ls460,Lexus Ls600,Lexus Nx200,Lexus Nx300,Lexus Rc 200,Lexus Rc 300,Lexus Rc F,Lexus Rx200,Lexus Rx300,Lexus Rx350,Lexus Rx400,Lexus Rx450,Lexus Sc430") );
		makers.push( CarMaker.create("LORRY", "Lexus", "Lexus Is300,Lexus Rx300,Lexus Rx350,Lexus Rx400") );
		makers.push( CarMaker.create("LORRY", "Leyland", "Leyland Constructor,Leyland Freighter,Leyland Roadrunner,Leyland Roadtrain") );
		makers.push( CarMaker.create("CAR", "Leyland Cars", "Leyland Cars Maxi,Leyland Cars Mini,Leyland Cars Princess") );
		makers.push( CarMaker.create("LORRY", "Leyland Cars", "Leyland Cars Mini") );
		makers.push( CarMaker.create("CAR", "Leyland Daf", "Leyland Daf 400") );
		makers.push( CarMaker.create("LORRY", "Leyland Daf", "Leyland Daf 200,Leyland Daf 400,Leyland Daf Fa 1700 Dnt,Leyland Daf Fa 1900 Dns,Leyland Daf Fa 2700,Leyland Daf Fa 45,Leyland Daf Fa 50,Leyland Daf Fa 55,Leyland Daf Fa 60,Leyland Daf Fa 65,Leyland Daf Fa 65cf,Leyland Daf Fa 75,Leyland Daf Fa 75cf,Leyland Daf Fa 85,Leyland Daf Fa 85cf,Leyland Daf Fa 95xf,Leyland Daf Fad 80,Leyland Daf Fad 85,Leyland Daf Fad 85cf,Leyland Daf Fan 75cf,Leyland Daf Far 95,Leyland Daf Far 95xf,Leyland Daf Fas 75,Leyland Daf Fas 75cf,Leyland Daf Fas 85,Leyland Daf Fas 85cf,Leyland Daf Fas 95xf,Leyland Daf Fat 75,Leyland Daf Fat 75cf,Leyland Daf Fat 80,Leyland Daf Fav12,Leyland Daf Ft 2300,Leyland Daf Ft 2700,Leyland Daf Ft 55,Leyland Daf Ft 60,Leyland Daf Ft 75,Leyland Daf Ft 75cf,Leyland Daf Ft 80,Leyland Daf Ft 85,Leyland Daf Ft 85cf,Leyland Daf Ft 95,Leyland Daf Ft 95xf,Leyland Daf Ftg 80,Leyland Daf Ftg 85,Leyland Daf Ftg 85cf,Leyland Daf Ftg 95,Leyland Daf Ftg 95xf,Leyland Daf Ftr 95xf,Leyland Daf Fts 95,Leyland Daf Ftt 95,Leyland Daf Ftt 95xf,Leyland Daf Roadrunner") );
		makers.push( CarMaker.create("BIKE", "Lifan", "Lifan Lf 100,Lifan Lf 125,Lifan Lf 150,Lifan Lf 250,Lifan Lf 50,Lifan Lf 70,Lifan Lf110,Lifan Lf200") );
		makers.push( CarMaker.create("CAR", "Ligier", "Ligier Ambra") );
		makers.push( CarMaker.create("CAR", "Lincoln", "Lincoln Town Car") );
		makers.push( CarMaker.create("LORRY", "Lincoln", "Lincoln Town Car") );
		makers.push( CarMaker.create("BIKE", "Lml", "Lml Star") );
		makers.push( CarMaker.create("BIKE", "Loncin", "Loncin Lx 110") );
		makers.push( CarMaker.create("LORRY", "Loncin", "Loncin Ls2") );
		makers.push( CarMaker.create("CAR", "London Taxis Int.", "London Taxis Int. Tx1,London Taxis Int. Tx4,London Taxis Int. Txii") );
		makers.push( CarMaker.create("LORRY", "London Taxis Int.", "London Taxis Int. Txii") );
		makers.push( CarMaker.create("BIKE", "Longjia", "Longjia Lj") );
		makers.push( CarMaker.create("CAR", "Lotus", "Lotus 2 Eleven,Lotus Cortina,Lotus Eclat,Lotus Elan,Lotus Elise,Lotus Elite,Lotus Esprit,Lotus Europa,Lotus Evora,Lotus Exige,Lotus Seven") );
		makers.push( CarMaker.create("LORRY", "Lotus", "Lotus Elise,Lotus Europa,Lotus Seven") );
		makers.push( CarMaker.create("LORRY", "Mahindra", "Mahindra Indian") );
		makers.push( CarMaker.create("BIKE", "Malaguti", "Malaguti Centro,Malaguti Ciak 125,Malaguti Ciak 50,Malaguti Crosser,Malaguti Drakon,Malaguti Drakon 50,Malaguti F-10,Malaguti F-15 Firefox,Malaguti F-15 Rr,Malaguti F-18 150,Malaguti F-69,Malaguti Madison 125,Malaguti Madison 250,Malaguti Madison 400,Malaguti Phantom,Malaguti Phantom 100,Malaguti Phantom Max,Malaguti Xsm,Malaguti Xtm,Malaguti Yesterday,Malaguti Yesterday - West One") );
		makers.push( CarMaker.create("BIKE", "Manet", "Manet Super Maxi") );
		makers.push( CarMaker.create("LORRY", "Martin Conquest", "Martin Conquest The Conquest") );
		makers.push( CarMaker.create("CAR", "Maserati", "Maserati 222,Maserati 3200,Maserati 425,Maserati 430,Maserati Biturbo,Maserati Bora,Maserati Coupe,Maserati Ghibli,Maserati Gran Turismo,Maserati Grancabrio,Maserati Gransport,Maserati Granturismo,Maserati Indy,Maserati Karif,Maserati Khamsin,Maserati Mc12,Maserati Merak,Maserati Mexico,Maserati Quattroporte,Maserati Shamal,Maserati Spyder") );
		makers.push( CarMaker.create("BIKE", "Mash", "Mash Xy 400") );
		makers.push( CarMaker.create("BIKE", "Maxus", "Maxus X-dirt") );
		makers.push( CarMaker.create("CAR", "Maybach", "Maybach 57,Maybach 62,Maybach Saloon") );
		makers.push( CarMaker.create("CAR", "Mazda", "Mazda 1000,Mazda 110s,Mazda 121,Mazda 1300,Mazda 1400,Mazda 1500,Mazda 1600,Mazda 1800,Mazda 2,Mazda 2000,Mazda 3,Mazda 323,Mazda 5,Mazda 6,Mazda 600,Mazda 616,Mazda 626,Mazda 800,Mazda 818,Mazda 929,Mazda B2000,Mazda B2500,Mazda Bt-50,Mazda Cx3,Mazda Cx5,Mazda Cx7,Mazda Demio,Mazda E2000,Mazda E2200,Mazda Eunos,Mazda Familia,Mazda Miata,Mazda Millenia,Mazda Montrose,Mazda Mps,Mazda Mpv,Mazda Mx-3,Mazda Mx-5,Mazda Mx-6,Mazda Premacy,Mazda R100,Mazda Rx2,Mazda Rx3,Mazda Rx4,Mazda Rx7,Mazda Rx8,Mazda Rx87,Mazda Tribute,Mazda Xedos") );
		makers.push( CarMaker.create("LORRY", "Mazda", "Mazda 323,Mazda 5,Mazda 6,Mazda 616,Mazda B1500,Mazda B2000,Mazda B2200,Mazda B2500,Mazda Bt-50,Mazda Cx7,Mazda E2000,Mazda E2200,Mazda Mpv,Mazda Mx-5,Mazda Non-car Derived Van,Mazda Premacy,Mazda Rx7,Mazda Tribute") );
		makers.push( CarMaker.create("BIKE", "Mbk", "Mbk Booster,Mbk Doodo,Mbk Ew50 Stunt,Mbk Flame,Mbk Kilibre,Mbk Mach G,Mbk Ng Booster,Mbk Nitro,Mbk Ovetto 100,Mbk Ovetto 50,Mbk Rocket,Mbk Skyliner,Mbk Thunder,Mbk X-power,Mbk Yn50 Ovetto") );
		makers.push( CarMaker.create("BIKE", "Mcc", "Mcc Smart") );
		makers.push( CarMaker.create("CAR", "Mcc", "Mcc Smart") );
		makers.push( CarMaker.create("LORRY", "Mcc", "Mcc Smart") );
		makers.push( CarMaker.create("CAR", "Mclaren", "Mclaren 540c,Mclaren 570s,Mclaren 650s,Mclaren 675lt,Mclaren Mp4,Mclaren P1") );
		makers.push( CarMaker.create("BIKE", "Megelli", "Megelli 125") );
		makers.push( CarMaker.create("CAR", "Mercedes", "Mercedes 190,Mercedes 200,Mercedes 300,Mercedes 400,Mercedes 500,Mercedes 600,Mercedes A Class,Mercedes Amg Class,Mercedes B Class,Mercedes C Class,Mercedes Citan,Mercedes Cl Class,Mercedes Cla Class,Mercedes Clc,Mercedes Clk,Mercedes Cls Class,Mercedes E Class,Mercedes G Class,Mercedes Gl Class,Mercedes Gla Class,Mercedes Glc Class,Mercedes Gle Class,Mercedes Mclaren,Mercedes Ml Class,Mercedes R Class,Mercedes S Class,Mercedes Sl Class,Mercedes Slk,Mercedes Slr,Mercedes Sls Class,Mercedes Sprinter,Mercedes V Class,Mercedes Vaneo,Mercedes Viano,Mercedes Vito") );
		makers.push( CarMaker.create("LORRY", "Mercedes", "Mercedes 190,Mercedes 200,Mercedes 300,Mercedes 400,Mercedes 500,Mercedes A Class,Mercedes B Class,Mercedes C Class,Mercedes Citan,Mercedes Clc,Mercedes Clk,Mercedes E Class,Mercedes G Class,Mercedes Gl Class,Mercedes Lunar,Mercedes Ml Class,Mercedes Non-car Derived Van,Mercedes R Class,Mercedes Rapido,Mercedes S Class,Mercedes Slk,Mercedes Sprinter,Mercedes V Class,Mercedes Vaneo,Mercedes Viano,Mercedes Vito") );
		makers.push( CarMaker.create("CAR", "Metrocab", "Metrocab Metrocab") );
		makers.push( CarMaker.create("BIKE", "Mg", "Mg Mgb") );
		makers.push( CarMaker.create("CAR", "Mg", "Mg 1100,Mg 1300,Mg 3,Mg 6,Mg Maestro,Mg Magnette,Mg Metro,Mg Mg6,Mg Mga,Mg Mgb,Mg Mgc,Mg Mgf,Mg Midget,Mg Montego,Mg Roadster,Mg Rv8,Mg Td/tf,Mg Tf,Mg Zr,Mg Zs,Mg Zt") );
		makers.push( CarMaker.create("LORRY", "Mg", "Mg Mga,Mg Mgb,Mg Roadster,Mg Tf,Mg Zr,Mg Zs") );
		makers.push( CarMaker.create("CAR", "Mg Xpower", "Mg Xpower Sv,Mg Xpower Sv-r") );
		makers.push( CarMaker.create("CAR", "Mia", "Mia C,Mia L3") );
		makers.push( CarMaker.create("LORRY", "Mia", "Mia U2") );
		makers.push( CarMaker.create("CAR", "Microcar", "Microcar M-8,Microcar Mc1,Microcar Mc2,Microcar M-go,Microcar Virgo") );
		makers.push( CarMaker.create("CAR", "Mini", "Mini Challenge,Mini Clubman Cooper,Mini Cooper,Mini Countryman,Mini First,Mini Inspired,Mini John Cooper Works,Mini One,Mini Paceman Cooper,Mini Roadster,Mini Roadster Cooper") );
		makers.push( CarMaker.create("LORRY", "Mini", "Mini Clubvan,Mini Cooper,Mini Countryman,Mini One") );
		makers.push( CarMaker.create("CAR", "Mitsubishi", "Mitsubishi 1400,Mitsubishi 3000,Mitsubishi Asx,Mitsubishi Canter,Mitsubishi Carisma,Mitsubishi Challenger,Mitsubishi Chariot,Mitsubishi Colt,Mitsubishi Cordia,Mitsubishi Delica,Mitsubishi Eclipse,Mitsubishi Fto,Mitsubishi Galant,Mitsubishi Grandis,Mitsubishi I City,Mitsubishi I Miev,Mitsubishi I-miev,Mitsubishi L200,Mitsubishi L300,Mitsubishi Lancer,Mitsubishi Legnum,Mitsubishi Mirage,Mitsubishi Outlander,Mitsubishi Pajero,Mitsubishi Rvr,Mitsubishi Shogun,Mitsubishi Sigma,Mitsubishi Space Runner,Mitsubishi Space Star,Mitsubishi Space Wagon,Mitsubishi Starion,Mitsubishi Town Box") );
		makers.push( CarMaker.create("LORRY", "Mitsubishi", "Mitsubishi 3000,Mitsubishi Asx,Mitsubishi Canter,Mitsubishi Carisma,Mitsubishi Challenger,Mitsubishi Chariot,Mitsubishi Colt,Mitsubishi Delica,Mitsubishi Dion,Mitsubishi Galant,Mitsubishi Grandis,Mitsubishi L200,Mitsubishi L300,Mitsubishi Lancer,Mitsubishi Mirage,Mitsubishi Montero,Mitsubishi Outlander,Mitsubishi Pajero,Mitsubishi Shogun,Mitsubishi Sigma,Mitsubishi Space Star,Mitsubishi Space Wagon,Mitsubishi Starion") );
		makers.push( CarMaker.create("LORRY", "Mitsubishi Fuso", "Mitsubishi Fuso Canter") );
		makers.push( CarMaker.create("BIKE", "Modenas", "Modenas Kriss") );
		makers.push( CarMaker.create("BIKE", "Montesa", "Montesa Cota 315 R,Montesa Cota 315 Rv,Montesa Cota 315 Rw,Montesa Cota 315 Rx,Montesa Cota 315 Ry,Montesa Cota 315 Rz,Montesa Cota 4rt") );
		makers.push( CarMaker.create("CAR", "Morgan", "Morgan 4/4,Morgan Aero,Morgan Aero 8,Morgan Plus 4,Morgan Plus 8,Morgan Roadster,Morgan Sports") );
		makers.push( CarMaker.create("LORRY", "Morgan", "Morgan 4/4,Morgan Plus 4,Morgan Plus 8") );
		makers.push( CarMaker.create("BIKE", "Morris", "Morris Oxford") );
		makers.push( CarMaker.create("CAR", "Morris", "Morris 1.0,Morris 1/2 Ton Van,Morris 10cwt,Morris 1100,Morris 1300,Morris 1800,Morris 2200,Morris 440,Morris 7cwt,Morris 8cwt,Morris Cowley,Morris Isis,Morris Ital,Morris Marina,Morris Mini,Morris Minor,Morris Oxford") );
		makers.push( CarMaker.create("LORRY", "Morris", "Morris 1.0,Morris 1/2 Ton Van,Morris 10cwt,Morris 1100,Morris 1300,Morris 2200,Morris 440,Morris 575,Morris 6cwt,Morris 7cwt,Morris 8cwt,Morris Car-derived Van,Morris Cowley,Morris Ital,Morris Marina,Morris Mini,Morris Minor,Morris Oxford") );
		makers.push( CarMaker.create("CAR", "Moskvich", "Moskvich 408,Moskvich 412,Moskvich 427") );
		makers.push( CarMaker.create("LORRY", "Moskvich", "Moskvich 434") );
		makers.push( CarMaker.create("BIKE", "Moto Guzzi", "Moto Guzzi 1000 California,Moto Guzzi 1000s,Moto Guzzi 1100 Sport,Moto Guzzi 1100 Sport Injection,Moto Guzzi 1200 Sport,Moto Guzzi 750 Nevada,Moto Guzzi 750 Strada,Moto Guzzi 750 T,Moto Guzzi Bellagio 940,Moto Guzzi Breva,Moto Guzzi Breva 1100,Moto Guzzi Breva 1200,Moto Guzzi California,Moto Guzzi Centauro,Moto Guzzi Daytona,Moto Guzzi Daytona Rs,Moto Guzzi Griso,Moto Guzzi Jackal,Moto Guzzi Le Mans 1000,Moto Guzzi Nevada 750,Moto Guzzi Nevada Classic,Moto Guzzi Nevada Club,Moto Guzzi Nevada L.a.p.d,Moto Guzzi Norge,Moto Guzzi Quota,Moto Guzzi Sp 1000 Iii,Moto Guzzi Stelvio,Moto Guzzi V 65 Gt,Moto Guzzi V11 Le Mans,Moto Guzzi V11 Le Mans Tenni,Moto Guzzi V11 Naked,Moto Guzzi V11 Sport,Moto Guzzi V11 Sport Le Mans,Moto Guzzi V12 Sport,Moto Guzzi V7 Cafe,Moto Guzzi V7 Classic,Moto Guzzi V7 Racer,Moto Guzzi V7 Special,Moto Guzzi V7 Stone") );
		makers.push( CarMaker.create("CAR", "Moto Guzzi", "Moto Guzzi 1000 California,Moto Guzzi California") );
		makers.push( CarMaker.create("BIKE", "Moto Morini", "Moto Morini Corsaro,Moto Morini Granpasso,Moto Morini Nine &amp; A Half,Moto Morini Scrambler") );
		makers.push( CarMaker.create("BIKE", "Moto Roma", "Moto Roma Bee,Moto Roma E4 50,Moto Roma G10,Moto Roma Go Go,Moto Roma Grand Prix,Moto Roma Lambros,Moto Roma Mrx,Moto Roma Rdg 125,Moto Roma Road Runner,Moto Roma Scrambler,Moto Roma Sk 125,Moto Roma Sky Quad,Moto Roma Smx 125,Moto Roma Stinger,Moto Roma Virage,Moto Roma Wasp") );
		makers.push( CarMaker.create("CAR", "Moto Roma", "Moto Roma Sky Quad") );
		makers.push( CarMaker.create("LORRY", "Moto Roma", "Moto Roma Gk 125") );
		makers.push( CarMaker.create("BIKE", "Moto Zeta", "Moto Zeta Rally 50") );
		makers.push( CarMaker.create("BIKE", "Motobi", "Motobi Imola,Motobi Imola 125,Motobi Misano 125,Motobi Pesaro") );
		makers.push( CarMaker.create("BIKE", "Motor Hispania", "Motor Hispania Furia,Motor Hispania Rx 50,Motor Hispania Ryz 50") );
		makers.push( CarMaker.create("BIKE", "Motor Jikov", "Motor Jikov Mjf 50,Motor Jikov Mjf 50 Moped") );
		makers.push( CarMaker.create("BIKE", "Motorhispania", "Motorhispania Duna,Motorhispania Mh6u-sm,Motorhispania Mh6v-x,Motorhispania Mh7,Motorhispania Rx 125,Motorhispania Rx 50") );
		makers.push( CarMaker.create("BIKE", "Motorini", "Motorini Exp 125,Motorini Xp 125,Motorini Xp 50") );
		makers.push( CarMaker.create("BIKE", "Mv Agusta", "Mv Agusta 1000 F4,Mv Agusta 1078 F4,Mv Agusta 750 F4,Mv Agusta Brutale,Mv Agusta F3,Mv Agusta F4,Mv Agusta Rivale,Mv Agusta Senna 750 F4,Mv Agusta Stradale,Mv Agusta Tamburini,Mv Agusta Turismo") );
		makers.push( CarMaker.create("BIKE", "Mz", "Mz 1000,Mz 1000 Sf,Mz 125 Sm,Mz 125 Sx,Mz 500,Mz Baghira,Mz Etx 251,Mz Etz 125,Mz Etz Saxon,Mz Mastiff,Mz Moskito,Mz Rt 125,Mz Skorpion,Mz Ts125 Alpine") );
		makers.push( CarMaker.create("LORRY", "Mz", "Mz Etz 125,Mz Ts125 Alpine") );
		makers.push( CarMaker.create("BIKE", "Necht", "Necht Gy 125") );
		makers.push( CarMaker.create("BIKE", "Neco", "Neco Abruzzi,Neco Borsalino Uno,Neco Bt 49,Neco Econeco,Neco E-space,Neco Gpx 50,Neco Vico 125,Neco Zn 50") );
		makers.push( CarMaker.create("BIKE", "Neval", "Neval Dnepr 11 30s Classic,Neval Dnepr 11 Classic,Neval Soviet Knight") );
		makers.push( CarMaker.create("LORRY", "Nfm", "Nfm Sports,Nfm Utility") );
		makers.push( CarMaker.create("LORRY", "Niesmann + Bischoff", "Niesmann + Bischoff Arto,Niesmann + Bischoff Flair") );
		makers.push( CarMaker.create("BIKE", "Nipponia", "Nipponia Brio 125,Nipponia Dion 125,Nipponia Miro 125,Nipponia Neon 50") );
		makers.push( CarMaker.create("CAR", "Nissan", "Nissan 100,Nissan 200,Nissan 280,Nissan 300,Nissan 350,Nissan 370,Nissan 720,Nissan Almera,Nissan Bluebird,Nissan Cabstar,Nissan Cherry,Nissan Cube,Nissan D21,Nissan D22,Nissan E24,Nissan E-nv200,Nissan Fairlady,Nissan Gt,Nissan Gt-r,Nissan Infiniti,Nissan Interstar,Nissan Juke,Nissan Kubistar,Nissan Laurel,Nissan Leaf,Nissan Lunar,Nissan March,Nissan Maxima,Nissan Micra,Nissan Murano,Nissan Navara,Nissan Note,Nissan Nt400,Nissan Nv200,Nissan Nv400,Nissan Pathfinder,Nissan Patrol,Nissan Pixo,Nissan Prairie,Nissan President,Nissan Primastar,Nissan Primera,Nissan Pulsar,Nissan Qashqai,Nissan Qx,Nissan Serena,Nissan Silvia,Nissan Skyline,Nissan Stagea,Nissan Stanza,Nissan Sunny,Nissan Terrano,Nissan Urvan,Nissan Vanette,Nissan X-trail") );
		makers.push( CarMaker.create("LORRY", "Nissan", "Nissan 100,Nissan 350,Nissan Almera,Nissan Bluebird,Nissan Cabstar,Nissan Cherry,Nissan D21,Nissan D22,Nissan Datsun,Nissan E24,Nissan E-nv200,Nissan Interstar,Nissan Juke,Nissan Kubistar,Nissan Lunar,Nissan Micra,Nissan Murano,Nissan Navara,Nissan Note,Nissan Np300,Nissan Nt400,Nissan Nv200,Nissan Nv400,Nissan Pathfinder,Nissan Patrol,Nissan Prairie,Nissan Primastar,Nissan Primera,Nissan Qashqai,Nissan Safari,Nissan Serena,Nissan Single Cab,Nissan Skyline,Nissan Stagea,Nissan Sunny,Nissan Terrano,Nissan Urvan,Nissan Vanette,Nissan X-trail") );
		makers.push( CarMaker.create("CAR", "Noble", "Noble M600") );
		makers.push( CarMaker.create("BIKE", "Norton", "Norton Commando 1000,Norton Commando 750,Norton Commando 850,Norton Commando 961,Norton Dominator") );
		makers.push( CarMaker.create("CAR", "Norton", "Norton Commando 750") );
		makers.push( CarMaker.create("BIKE", "Norton Villiers", "Norton Villiers Firefly") );
		makers.push( CarMaker.create("CAR", "Nsu", "Nsu 1000,Nsu 1200,Nsu Prinz,Nsu Ro80") );
		makers.push( CarMaker.create("CAR", "Oldsmobile", "Oldsmobile Delmont,Oldsmobile Delta,Oldsmobile F85,Oldsmobile Toronado") );
		makers.push( CarMaker.create("BIKE", "ontesa ", "Montesa  Cota 4rt") );
		makers.push( CarMaker.create("BIKE", "Opel", "Opel Gt") );
		makers.push( CarMaker.create("CAR", "Opel", "Opel Agila,Opel Ascona,Opel Astra,Opel Astravan,Opel Combo,Opel Commodore,Opel Corsa,Opel Gt,Opel Insignia,Opel Kadett,Opel Kapitan,Opel Manta,Opel Monza,Opel Olympia,Opel Rekord,Opel Senator,Opel Speedster,Opel Vectra,Opel Zafira") );
		makers.push( CarMaker.create("LORRY", "Opel", "Opel Astravan,Opel Combo,Opel Corsa,Opel Corsavan,Opel Kadett,Opel Manta,Opel Movano,Opel Vivaro,Opel Zafira") );
		makers.push( CarMaker.create("LORRY", "Optare", "Optare Alero,Optare Excel,Optare Metrorider,Optare Solo") );
		makers.push( CarMaker.create("CAR", "ord ", "Ford  Fusion") );
		makers.push( CarMaker.create("BIKE", "Orion", "Orion A31") );
		makers.push( CarMaker.create("BIKE", "Ossa", "Ossa Explorer,Ossa Tr250,Ossa Tr280,Ossa Tr300") );
		makers.push( CarMaker.create("BIKE", "Over", "Over Thor 125") );
		makers.push( CarMaker.create("BIKE", "Panther", "Panther Solo") );
		makers.push( CarMaker.create("CAR", "Panther", "Panther Kallista") );
		makers.push( CarMaker.create("CAR", "Perodua", "Perodua Kelisa,Perodua Kenari,Perodua Myvi,Perodua Nippa") );
		makers.push( CarMaker.create("LORRY", "Perodua", "Perodua Myvi,Perodua Nippa") );
		makers.push( CarMaker.create("BIKE", "Peugeot", "Peugeot 104,Peugeot 304,Peugeot 309,Peugeot 504,Peugeot 505,Peugeot 604,Peugeot Buxy,Peugeot Citystar,Peugeot Django 125,Peugeot Django 150,Peugeot Django 50,Peugeot Elyseo,Peugeot Elystar,Peugeot Geopolis,Peugeot Jet Force,Peugeot Kisbee,Peugeot Looxor,Peugeot Ludix,Peugeot Lxr 125,Peugeot Metal X,Peugeot Satelis,Peugeot Scoot,Peugeot Speedfight,Peugeot Squab,Peugeot Sum Up,Peugeot Sv 125,Peugeot Trekker,Peugeot Tweet 125,Peugeot Tweet 150,Peugeot Tweet 50,Peugeot V Clic,Peugeot Vivacity,Peugeot Vogue,Peugeot Vox 110,Peugeot Xp6,Peugeot Xps,Peugeot Xr6,Peugeot Zenith") );
		makers.push( CarMaker.create("CAR", "Peugeot", "Peugeot 1007,Peugeot 104,Peugeot 106,Peugeot 107,Peugeot 108,Peugeot 2008,Peugeot 204,Peugeot 205,Peugeot 206,Peugeot 207,Peugeot 208,Peugeot 3008,Peugeot 304,Peugeot 305,Peugeot 306,Peugeot 307,Peugeot 308,Peugeot 309,Peugeot 4007,Peugeot 403,Peugeot 404,Peugeot 405,Peugeot 406,Peugeot 407,Peugeot 5008,Peugeot 504,Peugeot 505,Peugeot 508,Peugeot 604,Peugeot 605,Peugeot 607,Peugeot 806,Peugeot 807,Peugeot Bipper,Peugeot Boxer,Peugeot Buxy,Peugeot E7,Peugeot Eurobus,Peugeot Eurotaxi,Peugeot Expert,Peugeot Horizon,Peugeot Independance,Peugeot Independence,Peugeot Ion,Peugeot Jet Force,Peugeot Metal X,Peugeot Partner,Peugeot Premier,Peugeot Rcz,Peugeot Satelis") );
		makers.push( CarMaker.create("LORRY", "Peugeot", "Peugeot 1007,Peugeot 106,Peugeot 107,Peugeot 205,Peugeot 206,Peugeot 207,Peugeot 208,Peugeot 3008,Peugeot 304,Peugeot 305,Peugeot 306,Peugeot 307,Peugeot 308,Peugeot 309,Peugeot 403,Peugeot 404,Peugeot 405,Peugeot 406,Peugeot 407,Peugeot 5008,Peugeot 504,Peugeot 505,Peugeot 508,Peugeot 604,Peugeot 605,Peugeot 607,Peugeot 806,Peugeot 807,Peugeot Autocruise,Peugeot Bipper,Peugeot Boxer,Peugeot Buxy,Peugeot Elddis,Peugeot Expert,Peugeot Horizon,Peugeot Metal X,Peugeot Non-car Derived Van,Peugeot Partner,Peugeot Rcz,Peugeot Tweet 50") );
		makers.push( CarMaker.create("BIKE", "Pgo", "Pgo Big Max,Pgo Comet,Pgo G-max,Pgo Libra,Pgo Ligero,Pgo Mega,Pgo Pms,Pgo Pmx,Pgo Rodoshow,Pgo Tigra,Pgo T-rex") );
		makers.push( CarMaker.create("LORRY", "Pgo", "Pgo G-max,Pgo Quadzilla") );
		makers.push( CarMaker.create("BIKE", "Piaggio", "Piaggio 125 Prima,Piaggio 150 Super,Piaggio 200 Rally,Piaggio 50 Special,Piaggio Ape,Piaggio B 125,Piaggio B 500,Piaggio Beverley,Piaggio Beverly,Piaggio Bravo Evl,Piaggio C1a0 C7v,Piaggio Carnaby,Piaggio Cosa,Piaggio Diesis 100,Piaggio Et2,Piaggio Fly,Piaggio Free,Piaggio Hexagon,Piaggio Liberty,Piaggio Lx 125,Piaggio Mp3,Piaggio New Skipper,Piaggio Nrg,Piaggio P125 X,Piaggio P150 X,Piaggio Pk100 Xl,Piaggio Pk50 S,Piaggio Pk50 Xl,Piaggio Px 200,Piaggio Px125,Piaggio Px125e,Piaggio Px200 E,Piaggio Px200 K,Piaggio Quartz,Piaggio Sfera,Piaggio Si,Piaggio Skipper,Piaggio T5 125,Piaggio Typhoon,Piaggio Velofax,Piaggio Vespa,Piaggio Vespino,Piaggio X10,Piaggio X7,Piaggio X8,Piaggio X9,Piaggio Xevo,Piaggio Zip") );
		makers.push( CarMaker.create("CAR", "Piaggio", "Piaggio Ape,Piaggio Porter") );
		makers.push( CarMaker.create("LORRY", "Piaggio", "Piaggio Ape,Piaggio C1a0 C7v,Piaggio Porter") );
		makers.push( CarMaker.create("LORRY", "Pilote", "Pilote G600,Pilote P716,Pilote P740") );
		makers.push( CarMaker.create("BIKE", "Pioneer", "Pioneer Xf 125,Pioneer Xf 250") );
		makers.push( CarMaker.create("CAR", "Plymouth", "Plymouth Prowler") );
		makers.push( CarMaker.create("CAR", "Polaris", "Polaris Predator,Polaris Rzr,Polaris Scrambler,Polaris Trailblazer") );
		makers.push( CarMaker.create("LORRY", "Polaris", "Polaris Atp,Polaris Outlaw,Polaris Phoenix,Polaris Predator,Polaris Ranger,Polaris Rzr,Polaris Scrambler,Polaris Sportsman,Polaris Trailblazer") );
		makers.push( CarMaker.create("CAR", "Pontiac", "Pontiac Bonneville,Pontiac Catalina,Pontiac Executive,Pontiac Firebird,Pontiac Tempest") );
		makers.push( CarMaker.create("BIKE", "Por", "Por Apache 125") );
		makers.push( CarMaker.create("CAR", "Porsche", "Porsche 911,Porsche 918,Porsche 924,Porsche 928,Porsche 944,Porsche 968,Porsche Boxster,Porsche Carrera,Porsche Cayenne,Porsche Cayman,Porsche Gt,Porsche Macan,Porsche Panamera") );
		makers.push( CarMaker.create("LORRY", "Porsche", "Porsche 911,Porsche Boxster,Porsche Cayenne,Porsche Macan") );
		makers.push( CarMaker.create("BIKE", "Proton", "Proton Torch") );
		makers.push( CarMaker.create("CAR", "Proton", "Proton Compact,Proton Gen 2,Proton Impian,Proton Persona,Proton Persona Compact,Proton Proton,Proton Satria,Proton Savvy,Proton Suprima,Proton Wira") );
		makers.push( CarMaker.create("LORRY", "Proton", "Proton Jumbuck") );
		makers.push( CarMaker.create("BIKE", "Ps Motor Manet", "Ps Motor Manet Korado Lux") );
		makers.push( CarMaker.create("BIKE", "Puch", "Puch City,Puch Free Spirit(x30 Better),Puch Maxi 2 Speed,Puch Maxi N Quickly,Puch Maxi Nk Zippy,Puch Maxi Ska Executive,Puch Maxi Sw,Puch Mini Maxi") );
		makers.push( CarMaker.create("LORRY", "Puch", "Puch Maxi 2 Speed,Puch Maxi Super D2,Puch Monza") );
		makers.push( CarMaker.create("BIKE", "Pulse", "Pulse Asrenaline 250,Pulse Bt 49,Pulse Rage,Pulse Rhythm,Pulse Wy 125,Pulse Wy50,Pulse Xf 125") );
		makers.push( CarMaker.create("BIKE", "Qingqi", "Qingqi Qm 125,Qingqi Qm 125 Gy,Qingqi Qm 125t,Qingqi Qm 200,Qingqi Qm 250,Qingqi Qm 50,Qingqi Renegade,Qingqi Rsr 125,Qingqi Xf 110,Qingqi Xf 125,Qingqi Xf 200") );
		makers.push( CarMaker.create("CAR", "Quadzilla", "Quadzilla Cf 500") );
		makers.push( CarMaker.create("LORRY", "Quadzilla", "Quadzilla 300,Quadzilla Cf 500") );
		makers.push( CarMaker.create("BIKE", "Raleigh", "Raleigh 15") );
		makers.push( CarMaker.create("BIKE", "Reliant", "Reliant 21 E,Reliant Estate,Reliant Regal,Reliant Robin") );
		makers.push( CarMaker.create("CAR", "Reliant", "Reliant 21 E,Reliant Car-derived Van,Reliant Fox,Reliant Kitten,Reliant Petrol Tricycle,Reliant Rebel,Reliant Regal,Reliant Rialto,Reliant Robin,Reliant Sabre,Reliant Scimitar") );
		makers.push( CarMaker.create("LORRY", "Reliant", "Reliant 21 E,Reliant Fox,Reliant Kitten,Reliant Petrol Tricycle,Reliant Rebel,Reliant Regal,Reliant Robin,Reliant Scimitar,Reliant Supervan") );
		makers.push( CarMaker.create("BIKE", "Renault", "Renault 5") );
		makers.push( CarMaker.create("CAR", "Renault", "Renault 10,Renault 11,Renault 12,Renault 14,Renault 15,Renault 16,Renault 17,Renault 18,Renault 19,Renault 20,Renault 21,Renault 25,Renault 30,Renault 4,Renault 5,Renault 50 Series,Renault 6,Renault 8,Renault 9,Renault A610,Renault Avantime,Renault B110,Renault Captur,Renault Caravelle,Renault Clio,Renault Dauphine,Renault Espace,Renault Extra,Renault Fluence,Renault Fuego,Renault Gordini,Renault Grand Scenic,Renault Gta,Renault Kadjar,Renault Kangoo,Renault Koleos,Renault Laguna,Renault Master,Renault Megane,Renault Modus,Renault Safrane,Renault Scenic,Renault Spider,Renault Trafic,Renault Twingo,Renault Twizy,Renault Vel Satis,Renault Wind Roadster,Renault Zoe") );
		makers.push( CarMaker.create("LORRY", "Renault", "Renault 11,Renault 12,Renault 14,Renault 15,Renault 16,Renault 17,Renault 18,Renault 19,Renault 20,Renault 21,Renault 25,Renault 30,Renault 4,Renault 5,Renault 50 Series,Renault 7cwt,Renault 8,Renault 9,Renault Adria,Renault B110,Renault Caravelle,Renault Car-derived Van,Renault Clio,Renault Espace,Renault Extra,Renault Grand Scenic,Renault Kangoo,Renault Laguna,Renault Mascott,Renault Master,Renault Megane,Renault Rimor,Renault Safrane,Renault Scenic,Renault Trafic,Renault Vel Satis") );
		makers.push( CarMaker.create("CAR", "Renault Trucks", "Renault Trucks Master") );
		makers.push( CarMaker.create("LORRY", "Renault Trucks", "Renault Trucks Mascott,Renault Trucks Master,Renault Trucks Maxity") );
		makers.push( CarMaker.create("CAR", "Reva", "Reva G-wiz") );
		makers.push( CarMaker.create("LORRY", "Rewaco", "Rewaco Hs 4") );
		makers.push( CarMaker.create("BIKE", "Rhon", "Rhon Lh 125,Rhon Lh 250,Rhon Lh 50") );
		makers.push( CarMaker.create("BIKE", "Rieju", "Rieju City Line 125,Rieju Marathon,Rieju Mius,Rieju Mrx 125,Rieju Mrx 50,Rieju Nkd,Rieju Pacific,Rieju Rr 125,Rieju Rr 50,Rieju Rrx Sport 50,Rieju Rs 1,Rieju Rs 2,Rieju Rs 3,Rieju Rs 50,Rieju Smx 125,Rieju Smx 50,Rieju Spike,Rieju Tango") );
		makers.push( CarMaker.create("CAR", "Riley", "Riley 1.5,Riley 2.5,Riley 2.6,Riley 4/68,Riley 4/72,Riley Elf,Riley Kestrel,Riley Lynx,Riley Pathfinder") );
		makers.push( CarMaker.create("LORRY", "Ris Bus", "Ris Bus Daily") );
		makers.push( CarMaker.create("CAR", "Rolls Royce", "Rolls Royce Corniche,Rolls Royce Flying Spur,Rolls Royce Ghost,Rolls Royce Park Ward,Rolls Royce Phantom,Rolls Royce Silver Dawn,Rolls Royce Silver Seraph,Rolls Royce Silver Shadow,Rolls Royce Silver Spirit,Rolls Royce Silver Spur,Rolls Royce Wraith") );
		makers.push( CarMaker.create("CAR", "Rover", "Rover 100 Series,Rover 200 Series,Rover 2000,Rover 25,Rover 3 Litre,Rover 3.5 Litre,Rover 400 Series,Rover 45,Rover 60,Rover 600 Series,Rover 75,Rover 80,Rover 800 Series,Rover 90,Rover 95,Rover Cityrover,Rover Coupe,Rover Maestro,Rover Metro,Rover Mini,Rover Montego,Rover Range Rover,Rover Sd1,Rover Sterling,Rover Streetwise,Rover V8,Rover Vitesse") );
		makers.push( CarMaker.create("LORRY", "Rover", "Rover 100 Series,Rover 200 Series,Rover 2000,Rover 25,Rover 3.5 Litre,Rover 45,Rover 60,Rover 80,Rover 800 Series,Rover 90,Rover Maestro,Rover Metro,Rover Mini,Rover Range Rover,Rover Sd1,Rover Sterling,Rover Streetwise") );
		makers.push( CarMaker.create("BIKE", "Royal Enfield", "Royal Enfield Bullet,Royal Enfield Continental") );
		makers.push( CarMaker.create("LORRY", "R-vision", "R-vision Trail") );
		makers.push( CarMaker.create("CAR", "Saab", "Saab 90,Saab 900,Saab 9000,Saab 9-3,Saab 95,Saab 9-5,Saab 96,Saab 99,Saab Aero,Saab Sonett") );
		makers.push( CarMaker.create("LORRY", "Saab", "Saab 900,Saab 9-3,Saab 9-5,Saab 99") );
		makers.push( CarMaker.create("BIKE", "Sachs", "Sachs 49er,Sachs B 805,Sachs Bee,Sachs Madass,Sachs Roadster,Sachs Speedforce,Sachs Speedjet,Sachs Sx,Sachs X-road,Sachs Xtc,Sachs Zx Enduro,Sachs Zz Funbike") );
		makers.push( CarMaker.create("BIKE", "Saiting", "Saiting St") );
		makers.push( CarMaker.create("BIKE", "Sanben", "Sanben Sb 125,Sanben Sb 50,Sanben Wy 125,Sanben Wy 50") );
		makers.push( CarMaker.create("BIKE", "Sanli", "Sanli Ts 125") );
		makers.push( CarMaker.create("CAR", "Santana", "Santana Ps10,Santana Ps10 Van") );
		makers.push( CarMaker.create("LORRY", "Santana", "Santana Ps10,Santana Ps10 Van") );
		makers.push( CarMaker.create("BIKE", "Sanya", "Sanya Sy 125") );
		makers.push( CarMaker.create("BIKE", "Sanyang", "Sanyang Duke") );
		makers.push( CarMaker.create("BIKE", "Scomadi", "Scomadi Turismo") );
		makers.push( CarMaker.create("BIKE", "Scorpa", "Scorpa Sy 175,Scorpa Sy 250,Scorpa Tride 250,Scorpa Twenty 125,Scorpa Twenty 250,Scorpa Twenty 300,Scorpa Ty 125,Scorpa Tys 125,Scorpa Tys 175") );
		makers.push( CarMaker.create("CAR", "Seat", "Seat Alhambra,Seat Altea,Seat Arosa,Seat Cordoba,Seat Exeo,Seat Ibiza,Seat Inca,Seat Leon,Seat Malaga,Seat Marbella,Seat Mii,Seat Terra,Seat Toledo") );
		makers.push( CarMaker.create("LORRY", "Seat", "Seat Alhambra,Seat Arosa,Seat Ibiza,Seat Inca,Seat Leon,Seat Terra,Seat Toledo") );
		makers.push( CarMaker.create("CAR", "Secma", "Secma F16,Secma Fun,Secma Qpod") );
		makers.push( CarMaker.create("LORRY", "Secma", "Secma Fun") );
		makers.push( CarMaker.create("BIKE", "Sfm", "Sfm Roadster,Sfm Zx 125,Sfm Zz 125") );
		makers.push( CarMaker.create("BIKE", "She Lung", "She Lung Freespirit") );
		makers.push( CarMaker.create("BIKE", "Shenke", "Shenke Yy 50") );
		makers.push( CarMaker.create("BIKE", "Sherco", "Sherco 250,Sherco 300,Sherco 450,Sherco Hrd,Sherco Se,Sherco Sherco,Sherco X-ride") );
		makers.push( CarMaker.create("BIKE", "Shineray", "Shineray Jl 125,Shineray Jl 50 Q,Shineray Jl125") );
		makers.push( CarMaker.create("BIKE", "Siamoto", "Siamoto Bd 125,Siamoto Enduro,Siamoto Favourite,Siamoto Fv 125,Siamoto Geco,Siamoto Kd 125") );
		makers.push( CarMaker.create("CAR", "Simca", "Simca 1000,Simca 1100,Simca 1200,Simca 1300,Simca 1301,Simca 1500,Simca 1501,Simca Bagheera") );
		makers.push( CarMaker.create("LORRY", "Simca", "Simca 1100") );
		makers.push( CarMaker.create("CAR", "Singer", "Singer 1500,Singer Chamois,Singer Gazelle,Singer Hunter,Singer Vogue") );
		makers.push( CarMaker.create("LORRY", "Singer", "Singer Hunter") );
		makers.push( CarMaker.create("BIKE", "Sinnis", "Sinnis Bd 250,Sinnis Cruise Star,Sinnis Js 125,Sinnis Qm 125,Sinnis Qm 250,Sinnis R8 125,Sinnis Shuttle,Sinnis Xf 125") );
		makers.push( CarMaker.create("BIKE", "Sinski", "Sinski Xsj 125,Sinski Xsj 50") );
		makers.push( CarMaker.create("CAR", "Skoda", "Skoda 105,Skoda 120,Skoda 130,Skoda 136,Skoda Citigo,Skoda Combi,Skoda Estelle,Skoda Fabia,Skoda Favorit,Skoda Felicia,Skoda Mb,Skoda Octavia,Skoda Rapid,Skoda Roomster,Skoda S100,Skoda S110,Skoda Superb,Skoda Yeti") );
		makers.push( CarMaker.create("LORRY", "Skoda", "Skoda Fabia,Skoda Favorit,Skoda Felicia,Skoda Octavia,Skoda Superb,Skoda Yeti") );
		makers.push( CarMaker.create("BIKE", "Skygo", "Skygo Lf 125,Skygo Lf 250,Skygo Lf 400,Skygo Lf 50,Skygo Sg 125,Skygo Sg 200") );
		makers.push( CarMaker.create("BIKE", "Skyjet", "Skyjet Sj 125") );
		makers.push( CarMaker.create("BIKE", "Skyteam", "Skyteam Ace 125,Skyteam Ace 50,Skyteam Bongo,Skyteam Bubbly,Skyteam Cobra 125,Skyteam Cobra 50,Skyteam Cougar,Skyteam E-max,Skyteam Le Mans 125,Skyteam Monkey 125,Skyteam Monkey 50,Skyteam Pbr 125,Skyteam Pbr 50,Skyteam Shymax 125,Skyteam Skymax 125,Skyteam Skymax 50,Skyteam St 110,Skyteam St 125,Skyteam St 200,Skyteam St 50,Skyteam St 90,Skyteam T-rex 125,Skyteam T-rex 50,Skyteam V-raptor 125,Skyteam V-raptor 250") );
		makers.push( CarMaker.create("BIKE", "Skywing", "Skywing Sw 50 F") );
		makers.push( CarMaker.create("CAR", "Smart", "Smart City,Smart Crossblade,Smart Forfour,Smart Fortwo,Smart Roadster") );
		makers.push( CarMaker.create("LORRY", "Smart", "Smart City,Smart Roadster") );
		makers.push( CarMaker.create("BIKE", "Smc", "Smc Ndf,Smc Ngf,Smc Nmf,Smc Saf Hyperflight") );
		makers.push( CarMaker.create("CAR", "Smc", "Smc Ram,Smc Ram 250e") );
		makers.push( CarMaker.create("LORRY", "Smc", "Smc Cg 500,Smc Jmax,Smc Quadzilla,Smc Ram 250e") );
		makers.push( CarMaker.create("BIKE", "Sonik", "Sonik Starway") );
		makers.push( CarMaker.create("BIKE", "Sp Moto", "Sp Moto Sp 125") );
		makers.push( CarMaker.create("BIKE", "Ssangyong", "Ssangyong Rexton") );
		makers.push( CarMaker.create("CAR", "Ssangyong", "Ssangyong Korando,Ssangyong Kyron,Ssangyong Musso,Ssangyong Rexton,Ssangyong Rodius,Ssangyong Tivoli") );
		makers.push( CarMaker.create("LORRY", "Ssangyong", "Ssangyong Korando,Ssangyong Kyron,Ssangyong Musso,Ssangyong Rexton") );
		makers.push( CarMaker.create("BIKE", "Starway", "Starway City Hopper") );
		makers.push( CarMaker.create("CAR", "Strathcarron", "Strathcarron Sc-5a") );
		makers.push( CarMaker.create("BIKE", "Stuart Taylor", "Stuart Taylor Loco Blade") );
		makers.push( CarMaker.create("CAR", "Stuart Taylor", "Stuart Taylor Loco Blade") );
		makers.push( CarMaker.create("BIKE", "Subaru", "Subaru 283") );
		makers.push( CarMaker.create("CAR", "Subaru", "Subaru 282,Subaru 284,Subaru Brz,Subaru Custom,Subaru Dl,Subaru Forester,Subaru Impreza,Subaru Justy,Subaru Legacy,Subaru Levorg,Subaru Outback,Subaru Subaru,Subaru Svx,Subaru Tribeca B9,Subaru Vivio,Subaru Wrx,Subaru Xv") );
		makers.push( CarMaker.create("LORRY", "Subaru", "Subaru 284,Subaru 700,Subaru Dl,Subaru Forester,Subaru Impreza,Subaru Justy,Subaru Legacy,Subaru Outback,Subaru Subaru,Subaru Sumo,Subaru Tribeca B9") );
		makers.push( CarMaker.create("BIKE", "Sukida", "Sukida Sk 125,Sukida Sk 200,Sukida Sk 50") );
		makers.push( CarMaker.create("BIKE", "Sumoto", "Sumoto 50 Qgy,Sumoto Gy 125,Sumoto Gy 200") );
		makers.push( CarMaker.create("BIKE", "Sunbeam", "Sunbeam Imp") );
		makers.push( CarMaker.create("CAR", "Sunbeam", "Sunbeam Alpine,Sunbeam Imp,Sunbeam Rapier,Sunbeam Stiletto,Sunbeam Sunbeam,Sunbeam Talbot,Sunbeam Tiger") );
		makers.push( CarMaker.create("BIKE", "Sundiro", "Sundiro Xdz 125 T") );
		makers.push( CarMaker.create("BIKE", "Superbyke", "Superbyke Cruz,Superbyke Powerband 125,Superbyke Powerband 50,Superbyke Powerband R50,Superbyke Powermax 50,Superbyke Rbp 125,Superbyke Rfx 125,Superbyke Rfx 50,Superbyke Rmr 125,Superbyke Rmx 125,Superbyke Rsp 125,Superbyke Rsr 125,Superbyke Sb 125,Superbyke Sbs 125") );
		makers.push( CarMaker.create("BIKE", "Suzuki", "Suxuki Gsxr 1000,Suxuki Gsxr 600,Suxuki Gsxs 1000,Suzuki A 100,Suzuki Ae 50,Suzuki Ah 100,Suzuki An 125,Suzuki An 250,Suzuki An 400,Suzuki An 650,Suzuki Ap 50,Suzuki Ay 50,Suzuki Cp 80,Suzuki Cs 50,Suzuki Djebel 200,Suzuki Dl 1000,Suzuki Dl 650,Suzuki Dr 125,Suzuki Dr 200,Suzuki Dr 350,Suzuki Dr 400,Suzuki Dr 650,Suzuki Dr 650 Res,Suzuki Dr 650 Rse,Suzuki Dr 750,Suzuki Dr Z400,Suzuki En 125,Suzuki Fl 125,Suzuki Fr 50,Suzuki Fr 80,Suzuki Fs 50,Suzuki Fz 50,Suzuki Gn 125,Suzuki Gn 250,Suzuki Gp 100,Suzuki Gp 125,Suzuki Gs 1000,Suzuki Gs 1100,Suzuki Gs 1200,Suzuki Gs 125,Suzuki Gs 250,Suzuki Gs 500,Suzuki Gs 550,Suzuki Gs 650,Suzuki Gs 850,Suzuki Gsf 1200,Suzuki Gsf 1250,Suzuki Gsf 400,Suzuki Gsf 600,Suzuki Gsf 650,Suzuki Gsr 600,Suzuki Gsr 750,Suzuki Gsx 1000,Suzuki Gsx 1100,Suzuki Gsx 1250,Suzuki Gsx 1300,Suzuki Gsx 1400,Suzuki Gsx 250,Suzuki Gsx 400,Suzuki Gsx 600,Suzuki Gsx 650,Suzuki Gsx 750,Suzuki Gsxr 1000,Suzuki Gsxr 1100,Suzuki Gsxr 1300,Suzuki Gsxr 600,Suzuki Gsxr 750,Suzuki Gsxs 1000,Suzuki Gt 200,Suzuki Gt 250,Suzuki Gw 250,Suzuki Gx 125,Suzuki Gz 125,Suzuki Gz 250,Suzuki Ls 650,Suzuki Or 50,Suzuki Pe 175,Suzuki Pe 250,Suzuki Pe 400,Suzuki Rf 600,Suzuki Rf 900,Suzuki Rg 125,Suzuki Rg 150,Suzuki Rg 250,Suzuki Rg 500,Suzuki Rgv 250,Suzuki Rl 250,Suzuki Rm 125,Suzuki Rmx 250,Suzuki Rmx 50,Suzuki Rmz 250,Suzuki Rmz 450,Suzuki Rv 125,Suzuki Rv 200,Suzuki Sb 200,Suzuki Sfv 650,Suzuki Sj,Suzuki Sp 400,Suzuki Sv 1000,Suzuki Sv 400,Suzuki Sv 650,Suzuki Tl 1000,Suzuki Tr 50,Suzuki Ts 100,Suzuki Ts 125,Suzuki Ts 185,Suzuki Ts 250,Suzuki Ts 50,Suzuki Tu 250,Suzuki Uc 125,Suzuki Uf 50,Suzuki Ug 110,Suzuki Uh 125,Suzuki Uh 200,Suzuki Uk 110,Suzuki Ux 125,Suzuki Ux 50,Suzuki Vl 125,Suzuki Vl 1500,Suzuki Vl 800,Suzuki Vlr1800,Suzuki Vs 1400,Suzuki Vs 600,Suzuki Vs 750,Suzuki Vs 800,Suzuki Vx 800,Suzuki Vz 1500,Suzuki Vz 1600,Suzuki Vz 800,Suzuki Vzr 1800,Suzuki Xf 650,Suzuki Xn 85,Suzuki Zr 50") );
		makers.push( CarMaker.create("CAR", "Suzuki", "Suzuki Alto,Suzuki Alto Cruz,Suzuki Ay 50,Suzuki Baleno,Suzuki Cappuccino,Suzuki Carry,Suzuki Celerio,Suzuki Escudo,Suzuki Grand Vitara,Suzuki Gs 500,Suzuki Gsf 600,Suzuki Gsx 1300,Suzuki Gsxr 750,Suzuki Ignis,Suzuki Jimny,Suzuki Kizashi,Suzuki Liana,Suzuki Rf 600,Suzuki Rf 900,Suzuki Sa,Suzuki Samurai,Suzuki Sc,Suzuki Sj,Suzuki Splash,Suzuki Supercarry,Suzuki Swift,Suzuki Sx,Suzuki Sx4,Suzuki Tu 250,Suzuki Vitara,Suzuki Wagon R+,Suzuki X-90,Suzuki Xn 85") );
		makers.push( CarMaker.create("LORRY", "Suzuki", "Suzuki Baleno,Suzuki Carry,Suzuki Escudo,Suzuki Jimny,Suzuki Liana,Suzuki Lj,Suzuki Samurai,Suzuki Sj,Suzuki St,Suzuki Supercarry,Suzuki Swift,Suzuki Vitara,Suzuki Wagon R+") );
		makers.push( CarMaker.create("BIKE", "Swap", "Swap L") );
		makers.push( CarMaker.create("BIKE", "Swm", "Swm Rs 650,Swm Sm 650") );
		makers.push( CarMaker.create("BIKE", "Sym", "Sym Ae Xpro 125,Sym Allo,Sym Attila,Sym Cha Cha,Sym City,Sym City Hopper,Sym Crox 125,Sym Dd,Sym Efi,Sym Euro,Sym Fiddle,Sym Gts,Sym Hd 125,Sym Hd 180,Sym Hd 200,Sym Hd Orbit,Sym Husky,Sym Jet,Sym Jet 50,Sym Joymax,Sym Joyride,Sym Jungle,Sym Lm,Sym Mask,Sym Maxsym,Sym Megalo,Sym Mio,Sym Orbit,Sym Red Devil,Sym Shark,Sym Super Duke,Sym Super Fancy,Sym Symphony,Sym Symply,Sym Tonik,Sym Voyager,Sym Vs 125,Sym Wolf,Sym Xs 125") );
		makers.push( CarMaker.create("BIKE", "Taishan", "Taishan Commuter,Taishan Sport") );
		makers.push( CarMaker.create("BIKE", "Taiwan Golden Bee", "Taiwan Golden Bee Starway") );
		makers.push( CarMaker.create("CAR", "Talbot", "Talbot Alpine,Talbot Avenger,Talbot Express,Talbot Horizon,Talbot Matra,Talbot Samba,Talbot Solara,Talbot Sunbeam,Talbot Tagora") );
		makers.push( CarMaker.create("LORRY", "Talbot", "Talbot 1100,Talbot Avenger,Talbot Express") );
		makers.push( CarMaker.create("BIKE", "Tamoretti", "Tamoretti 125") );
		makers.push( CarMaker.create("CAR", "Tata", "Tata Safari") );
		makers.push( CarMaker.create("LORRY", "Tata", "Tata Gurkha,Tata Loadbeta,Tata Safari,Tata Tl") );
		makers.push( CarMaker.create("BIKE", "Tec", "Tec 125 Gy") );
		makers.push( CarMaker.create("LORRY", "Terberg", "Terberg Bc182,Terberg Dt183,Terberg Yt182") );
		makers.push( CarMaker.create("CAR", "Tesla", "Tesla Model S,Tesla Roadster") );
		makers.push( CarMaker.create("BIKE", "Tgb", "Tgb 101,Tgb 202,Tgb 204,Tgb 302,Tgb 303 R,Tgb 303 Revolution,Tgb 304,Tgb 404,Tgb Akros,Tgb Bellavita,Tgb Br8,Tgb Cub,Tgb Delivery,Tgb Fbe,Tgb High Wheel,Tgb R50,Tgb X-motion 300") );
		makers.push( CarMaker.create("CAR", "Tgb", "Tgb Fbe") );
		makers.push( CarMaker.create("LORRY", "Tgb", "Tgb Est,Tgb Fbe,Tgb Fbf,Tgb Fbg,Tgb Fcc,Tgb Fwg") );
		makers.push( CarMaker.create("CAR", "Think", "Think Thinkcity") );
		makers.push( CarMaker.create("BIKE", "Thumpstar", "Thumpstar Road Ripper") );
		makers.push( CarMaker.create("BIKE", "Tm", "Tm Tm 125,Tm Tm 250,Tm Tm 300") );
		makers.push( CarMaker.create("BIKE", "Tomos", "Tomos Alpino,Tomos Classic,Tomos Flexer,Tomos Racing,Tomos Standard,Tomos Streetmate,Tomos Tango Injection") );
		makers.push( CarMaker.create("CAR", "Toyota", "Toyota 1000,Toyota 2000,Toyota 4-runner,Toyota Altezza,Toyota Aristo,Toyota Auris,Toyota Avalon,Toyota Avensis,Toyota Aygo,Toyota Camry,Toyota Carina,Toyota Celica,Toyota Celsior,Toyota Century,Toyota Corolla,Toyota Corona,Toyota Cressida,Toyota Crown,Toyota Dyna,Toyota Estima,Toyota Granvia,Toyota Gt86,Toyota Harrier,Toyota Hiace,Toyota Hilux,Toyota Ipsum,Toyota Iq,Toyota Landcruiser,Toyota Lite Ace,Toyota Mark Ii,Toyota Mirai,Toyota Model F,Toyota Mr2,Toyota Paseo,Toyota Picnic,Toyota Previa,Toyota Prius,Toyota Prius+,Toyota Rav4,Toyota Soarer,Toyota Space Cruiser,Toyota Sprinter,Toyota Starlet,Toyota Supra,Toyota Tercel,Toyota Townace,Toyota Urban Cruiser,Toyota Verso,Toyota Vista,Toyota Vitz,Toyota Will Vi,Toyota Yaris") );
		makers.push( CarMaker.create("LORRY", "Toyota", "Toyota 4-runner,Toyota Avensis,Toyota Aygo,Toyota Carina,Toyota Celica,Toyota Century,Toyota Corolla,Toyota Corona,Toyota Crown,Toyota Dyna,Toyota Estima,Toyota Granvia,Toyota Harrier,Toyota Hiace,Toyota Hilux,Toyota Ipsum,Toyota Landcruiser,Toyota Lite Ace,Toyota Mr2,Toyota Picnic,Toyota Previa,Toyota Proace,Toyota Rav4,Toyota Space Cruiser,Toyota Starlet,Toyota Supra,Toyota Townace,Toyota Verso,Toyota Yaris") );
		makers.push( CarMaker.create("LORRY", "Trigano", "Trigano Tribute Ducato") );
		makers.push( CarMaker.create("BIKE", "Triumph", "Triumph 1500,Triumph Adventurer,Triumph Bonneville,Triumph Daytona 1200,Triumph Daytona 600,Triumph Daytona 650,Triumph Daytona 675,Triumph Daytona 900,Triumph Daytona 955i,Triumph Daytona Centennial,Triumph Daytona Super Iii,Triumph Dolomite,Triumph Legend Tt,Triumph Rocket,Triumph Speed Four,Triumph Speed Master,Triumph Speed Master 865,Triumph Speed Triple,Triumph Speed Triple 1050,Triumph Speed Triple 750,Triumph Speed Triple 94,Triumph Speed Triple 955i,Triumph Speed Triple R 1050,Triumph Spitfire,Triumph Sprint Ex,Triumph Sprint Gt,Triumph Sprint Rs,Triumph Sprint St,Triumph Sprint St 1050,Triumph Street Triple,Triumph T309 Trident,Triumph T309 Trophy,Triumph T312 Trophy,Triumph T375 Trident,Triumph T509 Speed Triple,Triumph T595 Daytona,Triumph Thruxton,Triumph Thunderbird,Triumph Tiger,Triumph Tr2,Triumph Tr3,Triumph Tr4,Triumph Tr5,Triumph Tr6,Triumph Tr7,Triumph Trident Sprint,Triumph Trophy,Triumph Tt600") );
		makers.push( CarMaker.create("CAR", "Triumph", "Triumph 1300,Triumph 1500,Triumph 2.5,Triumph 2000,Triumph 2500,Triumph Acclaim,Triumph Dolomite,Triumph Gt6,Triumph Herald,Triumph Spitfire,Triumph Stag,Triumph T309 Trident,Triumph T375 Trident,Triumph Toledo,Triumph Tr2,Triumph Tr3,Triumph Tr4,Triumph Tr5,Triumph Tr6,Triumph Tr7,Triumph Tr8,Triumph Vitesse") );
		makers.push( CarMaker.create("LORRY", "Triumph", "Triumph 1500,Triumph 2.5,Triumph Dolomite,Triumph Herald,Triumph Tr3,Triumph Tr4") );
		makers.push( CarMaker.create("CAR", "Tvr", "Tvr 280,Tvr 290,Tvr 400,Tvr 450,Tvr Cerbera,Tvr Chimera,Tvr Griffith,Tvr Sagaris,Tvr T350,Tvr Tamora,Tvr Tasmin,Tvr Tuscan,Tvr V8") );
		makers.push( CarMaker.create("LORRY", "Tvr", "Tvr Griffith,Tvr Tamora,Tvr Tuscan") );
		makers.push( CarMaker.create("BIKE", "Ural", "Ural Dalesman,Ural Gear-up,Ural Red Star,Ural Solo,Ural Sportsman,Ural Star,Ural Wolf") );
		makers.push( CarMaker.create("BIKE", "Urban", "Urban Dz 125,Urban Dz 200") );
		makers.push( CarMaker.create("BIKE", "Uvm", "Uvm Bingo") );
		makers.push( CarMaker.create("CAR", "Vanden Plas", "Vanden Plas 1500,Vanden Plas Princess") );
		makers.push( CarMaker.create("CAR", "Vauxhall", "Vauxhall 2300,Vauxhall Adam,Vauxhall Agila,Vauxhall Ampera,Vauxhall Antara,Vauxhall Arena,Vauxhall Astra,Vauxhall Astramax,Vauxhall Astravan,Vauxhall Belmont,Vauxhall Calibra,Vauxhall Carlton,Vauxhall Cascada,Vauxhall Cavalier,Vauxhall Chevette,Vauxhall Combo,Vauxhall Corsa,Vauxhall Corsavan,Vauxhall Cresta,Vauxhall Eagle Quest,Vauxhall Firenza,Vauxhall Frontera,Vauxhall Insignia,Vauxhall Magnum,Vauxhall Meriva,Vauxhall Midi,Vauxhall Mokka,Vauxhall Monaro,Vauxhall Monterey,Vauxhall Movano,Vauxhall Nova,Vauxhall Omega,Vauxhall Rascal,Vauxhall Royale,Vauxhall Senator,Vauxhall Signum,Vauxhall Sintra,Vauxhall Sports,Vauxhall Tigra,Vauxhall Vectra,Vauxhall Velox,Vauxhall Ventora,Vauxhall Viceroy,Vauxhall Victor,Vauxhall Viscount,Vauxhall Viva,Vauxhall Vivaro,Vauxhall Vx,Vauxhall Vx220,Vauxhall Vxr8,Vauxhall Wyvern,Vauxhall Zafira") );
		makers.push( CarMaker.create("LORRY", "Vauxhall", "Vauxhall Agila,Vauxhall Arena,Vauxhall Astra,Vauxhall Astramax,Vauxhall Astravan,Vauxhall Belmont,Vauxhall Brava,Vauxhall Carlton,Vauxhall Cavalier,Vauxhall Combo,Vauxhall Corsa,Vauxhall Corsavan,Vauxhall Firenza,Vauxhall Frontera,Vauxhall Insignia,Vauxhall Midi,Vauxhall Monaro,Vauxhall Monterey,Vauxhall Movano,Vauxhall Nova,Vauxhall Omega,Vauxhall Rascal,Vauxhall Signum,Vauxhall Vectra,Vauxhall Velox,Vauxhall Viva,Vauxhall Vivaro,Vauxhall Zafira") );
		makers.push( CarMaker.create("BIKE", "Vectrix", "Vectrix Maxi Scooter") );
		makers.push( CarMaker.create("BIKE", "Velosolex", "Velosolex S 3800") );
		makers.push( CarMaker.create("CAR", "Ventui", "Ventui Atlantique") );
		makers.push( CarMaker.create("BIKE", "Vertemati", "Vertemati S 570,Vertemati Sr 600") );
		makers.push( CarMaker.create("BIKE", "Vespa (douglas)", "Vespa (douglas) 100,Vespa (douglas) 125 Prima,Vespa (douglas) 150 Super,Vespa (douglas) 200 Rally,Vespa (douglas) 50 Special,Vespa (douglas) 90 Standard,Vespa (douglas) Bravo Evl,Vespa (douglas) C1a0 C7v,Vespa (douglas) P125x,Vespa (douglas) P150x,Vespa (douglas) P200e,Vespa (douglas) Px125e") );
		makers.push( CarMaker.create("CAR", "Vespa (douglas)", "Vespa (douglas) 125 Prima") );
		makers.push( CarMaker.create("BIKE", "Victory", "Victory 8 Ball,Victory Boardwalk,Victory Cross Country,Victory Cross Roads,Victory Gunner,Victory Hammer,Victory Hard-ball,Victory High Ball,Victory Jackpot,Victory Judge,Victory Kingpin,Victory Magnum,Victory Scout,Victory V92,Victory Vegas,Victory Vision") );
		makers.push( CarMaker.create("BIKE", "Volkswagen", "Volkswagen Beetle") );
		makers.push( CarMaker.create("CAR", "Volkswagen", "Volkswagen 1000,Volkswagen 1200,Volkswagen 1300,Volkswagen 1303,Volkswagen 1500,Volkswagen 1600,Volkswagen 181,Volkswagen 411,Volkswagen 412,Volkswagen 800,Volkswagen A Variant,Volkswagen Amarok,Volkswagen Beetle,Volkswagen Bora,Volkswagen Caddy,Volkswagen Caddymaxi,Volkswagen California,Volkswagen Caravelle,Volkswagen Cc,Volkswagen Clipper,Volkswagen Corrado,Volkswagen Crafter,Volkswagen Delivery Van,Volkswagen Derby,Volkswagen E-golf,Volkswagen Eos,Volkswagen Fox,Volkswagen Golf,Volkswagen Jetta,Volkswagen K 70,Volkswagen Karmann Ghia,Volkswagen Kombi,Volkswagen Lt 28,Volkswagen Lt 31,Volkswagen Lt 35,Volkswagen Lt 40,Volkswagen Lt 46,Volkswagen Lupo,Volkswagen Microbus,Volkswagen Motor Caravan,Volkswagen Passat,Volkswagen Phaeton,Volkswagen Pick-up,Volkswagen Polo,Volkswagen Santana,Volkswagen Scirocco,Volkswagen Sharan,Volkswagen Syncro,Volkswagen Tiguan,Volkswagen Tl,Volkswagen Touareg,Volkswagen Touran,Volkswagen Transporter,Volkswagen Up,Volkswagen Urban,Volkswagen Variant,Volkswagen Vento,Volkswagen Xl1") );
		makers.push( CarMaker.create("LORRY", "Volkswagen", "Volkswagen 1000,Volkswagen 1100,Volkswagen 1200,Volkswagen 1300,Volkswagen 1303,Volkswagen 1500,Volkswagen 1600,Volkswagen 181,Volkswagen 411,Volkswagen 412,Volkswagen 800,Volkswagen A Variant,Volkswagen Amarok,Volkswagen Beetle,Volkswagen Bora,Volkswagen Caddy,Volkswagen Caddymaxi,Volkswagen California,Volkswagen Caravelle,Volkswagen Clipper,Volkswagen Corrado,Volkswagen Crafter,Volkswagen Delivery Van,Volkswagen Derby,Volkswagen Eos,Volkswagen Golf,Volkswagen Jetta,Volkswagen K 70,Volkswagen Karmann Ghia,Volkswagen Kombi,Volkswagen Lt 28,Volkswagen Lt 31,Volkswagen Lt 32,Volkswagen Lt 35,Volkswagen Lt 40,Volkswagen Lt 46,Volkswagen Lupo,Volkswagen Microbus,Volkswagen Motor Caravan,Volkswagen Non-car Derived Van,Volkswagen Passat,Volkswagen Phaeton,Volkswagen Pick-up,Volkswagen Polo,Volkswagen Scirocco,Volkswagen Sharan,Volkswagen Syncro,Volkswagen Taro,Volkswagen Tiguan,Volkswagen Tl,Volkswagen Touareg,Volkswagen Touran,Volkswagen Transporter,Volkswagen Variant,Volkswagen Vento,Volkswagen Westfalia") );
		makers.push( CarMaker.create("CAR", "Volvo", "Volvo 121,Volvo 122,Volvo 123,Volvo 131,Volvo 132,Volvo 133,Volvo 142,Volvo 144,Volvo 145,Volvo 164,Volvo 1800,Volvo 221,Volvo 240,Volvo 244,Volvo 245,Volvo 260,Volvo 262,Volvo 264,Volvo 265,Volvo 340,Volvo 343,Volvo 345,Volvo 360,Volvo 363,Volvo 365,Volvo 440,Volvo 460,Volvo 480,Volvo 66,Volvo 740,Volvo 760,Volvo 850,Volvo 940,Volvo 960,Volvo C 30,Volvo C30,Volvo C70,Volvo P1800,Volvo S40,Volvo S60,Volvo S70,Volvo S80,Volvo S90,Volvo V40,Volvo V50,Volvo V60,Volvo V70,Volvo V90,Volvo Xc60,Volvo Xc70,Volvo Xc90") );
		makers.push( CarMaker.create("LORRY", "Volvo", "Volvo 121,Volvo 145,Volvo 240,Volvo 244,Volvo 260,Volvo 340,Volvo 440,Volvo 460,Volvo 760,Volvo 850,Volvo 940,Volvo C70,Volvo P1800,Volvo S40,Volvo S70,Volvo S80,Volvo V40,Volvo V70,Volvo Xc60,Volvo Xc90") );
		makers.push( CarMaker.create("BIKE", "Vonroad", "Vonroad Yb 125") );
		makers.push( CarMaker.create("BIKE", "Vulcan", "Vulcan Custom,Vulcan Fy 125,Vulcan Harrier,Vulcan Supermoto,Vulcan V50") );
		makers.push( CarMaker.create("LORRY", "Wacker Neuson", "Wacker Neuson 1001,Wacker Neuson 1301,Wacker Neuson 2001,Wacker Neuson 3001,Wacker Neuson Dw100,Wacker Neuson Dw60,Wacker Neuson Dw90") );
		makers.push( CarMaker.create("BIKE", "Wangye", "Wangye Wy 125,Wangye Wy 50") );
		makers.push( CarMaker.create("BIKE", "Warrior", "Warrior Despatch,Warrior Urban") );
		makers.push( CarMaker.create("CAR", "Wartburg", "Wartburg Knight,Wartburg Tourist") );
		makers.push( CarMaker.create("BIKE", "White Knuckle", "White Knuckle 125,White Knuckle Aragon,White Knuckle Cf 125,White Knuckle Cf 250,White Knuckle Gtr,White Knuckle Oliver,White Knuckle Supermoto,White Knuckle Wk 300,White Knuckle Xy 125") );
		makers.push( CarMaker.create("BIKE", "Wk Bikes", "Wk Bikes 125,Wk Bikes Bd 125,Wk Bikes Bellissima 50,Wk Bikes Gfm 50,Wk Bikes Go 50,Wk Bikes Gp 125,Wk Bikes Gp2,Wk Bikes Gtr 300,Wk Bikes Ht 125,Wk Bikes Matador,Wk Bikes Moto 125,Wk Bikes Rt 125,Wk Bikes Rx 450,Wk Bikes Sp 50,Wk Bikes Ss 250,Wk Bikes Tomcat 125,Wk Bikes Trail 400,Wk Bikes Vs 125,Wk Bikes Wasp,Wkbikes Mii 50,Wkbikes Vs 50") );
		makers.push( CarMaker.create("BIKE", "Wolseley", "Wolseley 4/44") );
		makers.push( CarMaker.create("CAR", "Wolseley", "Wolseley 1100,Wolseley 1300,Wolseley 15/50,Wolseley 15/60,Wolseley 1500,Wolseley 16/60,Wolseley 18/85,Wolseley 2200,Wolseley 4/44,Wolseley 6/110,Wolseley 6/90,Wolseley 6/99,Wolseley Hornet,Wolseley Six") );
		makers.push( CarMaker.create("LORRY", "Wolseley", "Wolseley 15/60") );
		makers.push( CarMaker.create("BIKE", "Wuyang", "Wuyang Wy 125,Wuyang Wy 50") );
		makers.push( CarMaker.create("CAR", "X-bow", "X-bow X-bow") );
		makers.push( CarMaker.create("BIKE", "Xgjao", "Xgjao Xgj125,Xgjao Xgj200") );
		makers.push( CarMaker.create("BIKE", "Xingyue", "Xingyue Xy 125,Xingyue Xy 50") );
		makers.push( CarMaker.create("BIKE", "Xinling", "Xinling Txm 125,Xinling Xl 50") );
		makers.push( CarMaker.create("LORRY", "Xinling", "Xinling Xl 250") );
		makers.push( CarMaker.create("BIKE", "Yamaha", "Yamaha 125 Exc,Yamaha 990 Superduke,Yamaha Adventure 990,Yamaha Bt 1100,Yamaha Bw 50,Yamaha Bw Spy,Yamaha Bws 125,Yamaha Cg 50 Jog,Yamaha Cs 50,Yamaha Cs 50 Jog,Yamaha Cw 50,Yamaha Cw 50 Ng,Yamaha Cy 50,Yamaha Cygnus,Yamaha Dt 100,Yamaha Dt 125 Lc,Yamaha Dt 125 Mx,Yamaha Dt 125 R,Yamaha Dt 125 Re,Yamaha Dt 50,Yamaha Dt 50 Mx,Yamaha Dt 50 Sm,Yamaha Dt 80,Yamaha Ed06,Yamaha Enticer,Yamaha Ew 50 (slider),Yamaha Fj 1200,Yamaha Fjr 1300,Yamaha Fs 1,Yamaha Fz 750,Yamaha Fz1,Yamaha Fz6,Yamaha Fz8,Yamaha Fzr 1000 R,Yamaha Fzr 1000 Ru,Yamaha Fzr 400 Rr,Yamaha Fzr 400 Rr Sp,Yamaha Fzr 600,Yamaha Fzr 600 R,Yamaha Fzr 750,Yamaha Fzs 1000,Yamaha Fzs 400,Yamaha Fzs 600,Yamaha Fzx 750 Z,Yamaha Gts 1000 A,Yamaha Hw 125,Yamaha Jog R,Yamaha Majesty,Yamaha Mt-01,Yamaha Mt-03,Yamaha Mt07,Yamaha Mt09,Yamaha Mt125,Yamaha Mw125,Yamaha Nouvo,Yamaha Ns 50,Yamaha Nxc 125,Yamaha Qt 50,Yamaha R6,Yamaha Rd 125,Yamaha Rd 250,Yamaha Rd 350 F2,Yamaha Rd 350 R,Yamaha Roadster,Yamaha Royal Star Tour Deluxe,Yamaha Rxs 100,Yamaha Sa 50m,Yamaha Serow 225,Yamaha Sh 50,Yamaha Slider,Yamaha Sr 125,Yamaha Sr 250,Yamaha Sr 400,Yamaha Sr 500,Yamaha Szr 660,Yamaha T 80,Yamaha Tdm 850,Yamaha Tdm 900,Yamaha Tdm 900 A,Yamaha Tdr 125,Yamaha Tdr 250,Yamaha Teo S,Yamaha Tmax,Yamaha Trx 850,Yamaha Tt 250 R,Yamaha Tt 600 R,Yamaha Ttr 125 Lw,Yamaha Ttr 250,Yamaha Ttr 600 R,Yamaha Tw 125,Yamaha Tw 200,Yamaha Tw 225,Yamaha Ty 125,Yamaha Ty 250 On/off,Yamaha Ty 80,Yamaha Tzr 125 Lc,Yamaha Tzr 125 R,Yamaha Tzr 50,Yamaha Vmax 1700,Yamaha Vmx 1200,Yamaha Vp 300 Versity,Yamaha Why,Yamaha Wr 125,Yamaha Wr 250,Yamaha Wr 250 F,Yamaha Wr 400,Yamaha Wr 450 F,Yamaha Xc 125,Yamaha Xc 125 T,Yamaha Xc115,Yamaha X-city 125,Yamaha X-city 250,Yamaha Xf 50,Yamaha Xj 600,Yamaha Xj 600 N,Yamaha Xj 600 S Diversion,Yamaha Xj 900,Yamaha Xj 900 S,Yamaha Xj6,Yamaha Xjr 1200,Yamaha Xjr 1300,Yamaha Xp 500,Yamaha Xq 125,Yamaha Xs 1100 S,Yamaha Xsr 700,Yamaha Xt 1200,Yamaha Xt 125,Yamaha Xt 225 S,Yamaha Xt 250,Yamaha Xt 350,Yamaha Xt 500,Yamaha Xt 600,Yamaha Xtz 750 Z,Yamaha Xv 1100 Se,Yamaha Xv 125 S,Yamaha Xv 125 Sp,Yamaha Xv 1600,Yamaha Xv 1700,Yamaha Xv 1900 A,Yamaha Xv 250 S,Yamaha Xv 535,Yamaha Xv 535 Dx,Yamaha Xv 535 S,Yamaha Xv 750,Yamaha Xv125,Yamaha Xvs 1100,Yamaha Xvs 1100 A,Yamaha Xvs 125,Yamaha Xvs 1300,Yamaha Xvs 250,Yamaha Xvs 400,Yamaha Xvs 650,Yamaha Xvs 950,Yamaha Xvz 1300,Yamaha Xvz 1300 A,Yamaha Xvz 1300 Tf,Yamaha Y 2426f/y 2f426,Yamaha Ybr 125,Yamaha Ybr 250,Yamaha Yn 100,Yamaha Yn 50 Neos,Yamaha Yp 125,Yamaha Yp 125 R,Yamaha Yp 250,Yamaha Yp 250 R,Yamaha Yp 250 Ra,Yamaha Yp 400,Yamaha Yq 100,Yamaha Yq 50 Aerox,Yamaha Yz 125,Yamaha Yz 250,Yamaha Yz 250 F,Yamaha Yz 450 F,Yamaha Yzf 1000 R,Yamaha Yzf 600 R,Yamaha Yzf 750 P,Yamaha Yzf 750 R,Yamaha Yzf R1,Yamaha Yzf R125,Yamaha Yzf R3,Yamaha Yzf R6,Yamaha Yzf R7,Yamaha Ze 50 P") );
		makers.push( CarMaker.create("CAR", "Yamaha", "Yamaha Yfm 350,Yamaha Yfm 400") );
		makers.push( CarMaker.create("LORRY", "Yamaha", "Yamaha Yfm 350,Yamaha Yfm 400,Yamaha Yfm 660") );
		makers.push( CarMaker.create("BIKE", "Yamoto", "Yamoto Dragon") );
		makers.push( CarMaker.create("BIKE", "Yiben Meiduo", "Yiben Meiduo Yb 125,Yiben Meiduo Yb 50") );
		makers.push( CarMaker.create("BIKE", "Yinhua", "Yinhua Tdr") );
		makers.push( CarMaker.create("BIKE", "Yiying", "Yiying Yy 125,Yiying Yy 150,Yiying Yy 50") );
		makers.push( CarMaker.create("BIKE", "Yuan", "Yuan Sj 125,Yuan Xgj 125") );
		makers.push( CarMaker.create("CAR", "Zastava", "Zastava Yugo") );
		makers.push( CarMaker.create("LORRY", "Zastava", "Zastava Yugo") );
		makers.push( CarMaker.create("BIKE", "Zennco", "Zennco Ht 125,Zennco Yb 125") );
		makers.push( CarMaker.create("CAR", "Zenos", "Zenos E10") );
		makers.push( CarMaker.create("BIKE", "Zhenhua", "Zhenhua Zh A 50") );
		makers.push( CarMaker.create("BIKE", "Zhongneng", "Zhongneng Zn 125,Zhongneng Zn 50") );
		makers.push( CarMaker.create("BIKE", "Zhongyu", "Zhongyu Zy 125,Zhongyu Zy 50") );
		makers.push( CarMaker.create("BIKE", "Znen", "Znen Zn 125,Znen Zn 50") );
		makers.push( CarMaker.create("BIKE", "Zongshen", "Zonghen Zs 125,Zongshen Lzx 250,Zongshen Zs,Zongshen Zs 125") );
		makers.push( CarMaker.create("BIKE", "Zontes", "Zontes Tiger 50,Zontes Zt 125") );

		return makers;
	} // load	


}
