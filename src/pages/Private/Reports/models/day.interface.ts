export interface IDay {
  id: number;
  date: Date;
  precip: number;
  temp: number;
  name: string;
  tempMax: number;
  tempMin: number;
  holiday: boolean;
  weatherCode: number;
}

export enum WeatherbitCodes {}

export enum TypeFootfall {
  REAL = 'REAL',
  SIMULATED = 'SIMULATED',
  PREDICTED = 'PREDICTED'
}

export interface Footfall {
  id: number;
  date: Date;
  type: TypeFootfall;
  quantity: number;
}

interface Codes {
  [id: number]: {
    code: number;
    description: string;
    descriptionEs: string;
    iconDay: string;
    nightIcon: string;
  };
}

export const codes: Codes = {
  200: {
    code: 200,
    description: 'Thunderstorm with light rain',
    descriptionEs: 'Tormenta con lluvia ligera',
    iconDay: 't01d',
    nightIcon: 't01n'
  },
  201: {
    code: 201,
    description: 'Thunderstorm with rain',
    descriptionEs: 'Tormenta con lluvia',
    iconDay: 't02d',
    nightIcon: 't02n'
  },
  202: {
    code: 202,
    description: 'Thunderstorm with heavy rain',
    descriptionEs: 'Tormenta con lluvia fuerte',
    iconDay: 't03d',
    nightIcon: 't03n'
  },
  230: {
    code: 230,
    description: 'Thunderstorm with light drizzle',
    descriptionEs: 'Tormenta con llovizna ligera',
    iconDay: 't04d',
    nightIcon: 't04n'
  },
  231: {
    code: 231,
    description: 'Thunderstorm with drizzle',
    descriptionEs: 'Tormenta con llovizna',
    iconDay: 't04d',
    nightIcon: 't04n'
  },
  232: {
    code: 232,
    description: 'Thunderstorm with heavy drizzle',
    descriptionEs: 'Tormenta con llovizna fuerte',
    iconDay: 't04d',
    nightIcon: 't04n'
  },
  233: {
    code: 233,
    description: 'Thunderstorm with hail',
    descriptionEs: 'Tormenta con granizo',
    iconDay: 't04d',
    nightIcon: 't04n'
  },
  300: {
    code: 300,
    description: 'Light drizzle',
    descriptionEs: 'Llovizna ligera',
    iconDay: 'd01d',
    nightIcon: 'd01n'
  },
  301: {
    code: 301,
    description: 'Drizzle',
    descriptionEs: 'Llovizna',
    iconDay: 'd02d',
    nightIcon: 'd02n'
  },
  302: {
    code: 302,
    description: 'Heavy drizzle',
    descriptionEs: 'Llovizna fuerte',
    iconDay: 'd03d',
    nightIcon: 'd03n'
  },
  500: {
    code: 500,
    description: 'Light rain',
    descriptionEs: 'Lluvia ligera',
    iconDay: 'r01d',
    nightIcon: 'r01n'
  },
  501: {
    code: 501,
    description: 'Moderate rain',
    descriptionEs: 'Lluvia moderada',
    iconDay: 'r02d',
    nightIcon: 'r02n'
  },
  502: {
    code: 502,
    description: 'Heavy rain',
    descriptionEs: 'Lluvia fuerte',
    iconDay: 'r03d',
    nightIcon: 'r03n'
  },
  511: {
    code: 511,
    description: 'Freezing rain',
    descriptionEs: 'Lluvia helada',
    iconDay: 'r04d',
    nightIcon: 'r04n'
  },
  520: {
    code: 520,
    description: 'Light shower rain',
    descriptionEs: 'Lluvia ligera con chubascos',
    iconDay: 'r05d',
    nightIcon: 'r05n'
  },
  521: {
    code: 521,
    description: 'Shower rain',
    descriptionEs: 'Lluvia con chubascos',
    iconDay: 'r06d',
    nightIcon: 'r06n'
  },
  522: {
    code: 522,
    description: 'Heavy shower rain',
    descriptionEs: 'Lluvia fuerte con chubascos',
    iconDay: 'r07d',
    nightIcon: 'r07n'
  },
  600: {
    code: 600,
    description: 'Light snow',
    descriptionEs: 'Nieve ligera',
    iconDay: 's01d',
    nightIcon: 's01n'
  },
  601: {
    code: 601,
    description: 'Snow',
    descriptionEs: 'Nieve',
    iconDay: 's02d',
    nightIcon: 's02n'
  },
  602: {
    code: 602,
    description: 'Heavy snow',
    descriptionEs: 'Nieve fuerte',
    iconDay: 's03d',
    nightIcon: 's03n'
  },
  610: {
    code: 610,
    description: 'Mix snow/rain',
    descriptionEs: 'Nieve y lluvia mezcladas',
    iconDay: 's04d',
    nightIcon: 's04n'
  },
  611: {
    code: 611,
    description: 'Sleet',
    descriptionEs: 'Aguanieve',
    iconDay: 's05d',
    nightIcon: 's05n'
  },
  612: {
    code: 612,
    description: 'Heavy sleet',
    descriptionEs: 'Aguanieve fuerte',
    iconDay: 's06d',
    nightIcon: 's06n'
  },
  621: {
    code: 621,
    description: 'Snow shower',
    descriptionEs: 'Nieve con chubascos',
    iconDay: 's07d',
    nightIcon: 's07n'
  },
  622: {
    code: 622,
    description: 'Heavy snow shower',
    descriptionEs: 'Nieve fuerte con chubascos',
    iconDay: 's08d',
    nightIcon: 's08n'
  },
  701: {
    code: 701,
    description: 'Mist',
    descriptionEs: 'Niebla',
    iconDay: 'a01d',
    nightIcon: 'a01n'
  },
  711: {
    code: 711,
    description: 'Smoke',
    descriptionEs: 'Humo',
    iconDay: 'a02d',
    nightIcon: 'a02n'
  },
  721: {
    code: 721,
    description: 'Haze',
    descriptionEs: 'Calima',
    iconDay: 'a03d',
    nightIcon: 'a03n'
  },
  731: {
    code: 731,
    description: 'Sand, dust whirls',
    descriptionEs: 'Torbellinos de arena y polvo',
    iconDay: 'a04d',
    nightIcon: 'a04n'
  },
  741: {
    code: 741,
    description: 'Fog',
    descriptionEs: 'Niebla',
    iconDay: 'a05d',
    nightIcon: 'a05n'
  },
  751: {
    code: 751,
    description: 'Sand',
    descriptionEs: 'Arena',
    iconDay: 'a06d',
    nightIcon: 'a06n'
  },
  761: {
    code: 761,
    description: 'Dust',
    descriptionEs: 'Polvo',
    iconDay: 'a07d',
    nightIcon: 'a07n'
  },
  762: {
    code: 762,
    description: 'Volcanic ash',
    descriptionEs: 'Ceniza volcánica',
    iconDay: 'a08d',
    nightIcon: 'a08n'
  },
  771: {
    code: 771,
    description: 'Squalls',
    descriptionEs: 'Chubascos',
    iconDay: 'a09d',
    nightIcon: 'a09n'
  },
  781: {
    code: 781,
    description: 'Tornado',
    descriptionEs: 'Tornado',
    iconDay: 'a10d',
    nightIcon: 'a10n'
  },
  800: {
    code: 800,
    description: 'Clear',
    descriptionEs: 'Despejado',
    iconDay: 'c01d',
    nightIcon: 'c01n'
  },
  801: {
    code: 801,
    description: 'Few clouds',
    descriptionEs: 'Pocas nubes',
    iconDay: 'c02d',
    nightIcon: 'c02n'
  },
  802: {
    code: 802,
    description: 'Scattered clouds',
    descriptionEs: 'Nubes dispersas',
    iconDay: 'c03d',
    nightIcon: 'c03n'
  },
  803: {
    code: 803,
    description: 'Broken clouds',
    descriptionEs: 'Nubes rotas',
    iconDay: 'c04d',
    nightIcon: 'c04n'
  },
  804: {
    code: 804,
    description: 'Overcast clouds',
    descriptionEs: 'Nubes cubiertas',
    iconDay: 'c04d',
    nightIcon: 'c04n'
  },
  900: {
    code: 900,
    description: 'Unknown Precipitation',
    descriptionEs: 'Precipitación desconocida',
    iconDay: 'u00d',
    nightIcon: 'u00n'
  }
};

export enum WeatherCode {
  ThunderstormLightRain = 200,
  ThunderstormRain = 201,
  ThunderstormHeavyRain = 202,
  ThunderstormLightDrizzle = 230,
  ThunderstormDrizzle = 231,
  ThunderstormHeavyDrizzle = 232,
  ThunderstormHail = 233,
  LightDrizzle = 300,
  Drizzle = 301,
  HeavyDrizzle = 302,
  LightRain = 500,
  ModerateRain = 501,
  HeavyRain = 502,
  FreezingRain = 511,
  LightShowerRain = 520,
  ShowerRain = 521,
  HeavyShowerRain = 522,
  LightSnow = 600,
  Snow = 601,
  HeavySnow = 602,
  MixSnowRain = 610,
  Sleet = 611,
  HeavySleet = 612,
  SnowShower = 621,
  HeavySnowShower = 622,
  Flurries = 623,
  Mist = 700,
  Smoke = 711,
  Haze = 721,
  SandDust = 731,
  Fog = 741,
  FreezingFog = 751,
  ClearSky = 800,
  FewClouds = 801,
  ScatteredClouds = 802,
  BrokenClouds = 803,
  OvercastClouds = 804,
  UnknownPrecipitation = 900
}

export enum WeatherInSpanish {
  ThunderstormLightRain = 'Tormenta con lluvia ligera',
  ThunderstormRain = 'Tormenta con lluvia',
  ThunderstormHeavyRain = 'Tormenta con lluvia fuerte',
  ThunderstormLightDrizzle = 'Tormenta con llovizna ligera',
  ThunderstormDrizzle = 'Tormenta con llovizna',
  ThunderstormHeavyDrizzle = 'Tormenta con llovizna fuerte',
  ThunderstormHail = 'Tormenta con granizo',
  LightDrizzle = 'Llovizna ligera',
  Drizzle = 'Llovizna',
  HeavyDrizzle = 'Llovizna fuerte',
  LightRain = 'Lluvia ligera',
  ModerateRain = 'Lluvia moderada',
  HeavyRain = 'Lluvia fuerte',
  FreezingRain = 'Lluvia helada',
  LightShowerRain = 'Lluvia ligera con chubascos',
  ShowerRain = 'Lluvia con chubascos',
  HeavyShowerRain = 'Lluvia fuerte con chubascos',
  LightSnow = 'Nevada ligera',
  Snow = 'Nevada',
  HeavySnow = 'Nevada fuerte',
  MixSnowRain = 'Nevada con lluvia',
  Sleet = 'Aguanieve',
  HeavySleet = 'Aguanieve fuerte',
  SnowShower = 'Nevada con chubascos',
  HeavySnowShower = 'Nevada fuerte con chubascos',
  Flurries = 'Copos de nieve',
  Mist = 'Niebla',
  Smoke = 'Humo',
  Haze = 'Bruma',
  SandDust = 'Arena',
  Fog = 'Niebla',
  FreezingFog = 'Niebla helada',
  ClearSky = 'Cielo despejado',
  FewClouds = 'Pocas nubes',
  ScatteredClouds = 'Nubes dispersas',
  BrokenClouds = 'Nubes rotas',
  OvercastClouds = 'Nubes cubiertas',
  UnknownPrecipitation = 'Precipitación desconocida'
}

export interface WeatherIcon {
  code: WeatherCode;
  dayIcon: string;
  nightIcon: string;
}

export const weatherIcons: WeatherIcon[] = [
  {
    code: WeatherCode.ThunderstormLightRain,
    dayIcon: 't01d',
    nightIcon: 't01n'
  },
  { code: WeatherCode.ThunderstormRain, dayIcon: 't02d', nightIcon: 't02n' },
  {
    code: WeatherCode.ThunderstormHeavyRain,
    dayIcon: 't03d',
    nightIcon: 't03n'
  },
  {
    code: WeatherCode.ThunderstormLightDrizzle,
    dayIcon: 't04d',
    nightIcon: 't04n'
  },
  { code: WeatherCode.ThunderstormDrizzle, dayIcon: 't04d', nightIcon: 't04n' },
  {
    code: WeatherCode.ThunderstormHeavyDrizzle,
    dayIcon: 't04d',
    nightIcon: 't04n'
  },
  { code: WeatherCode.ThunderstormHail, dayIcon: 't05d', nightIcon: 't05n' },
  { code: WeatherCode.LightDrizzle, dayIcon: 'd01d', nightIcon: 'd01n' },
  { code: WeatherCode.Drizzle, dayIcon: 'd02d', nightIcon: 'd02n' },
  { code: WeatherCode.HeavyDrizzle, dayIcon: 'd03d', nightIcon: 'd03n' },
  { code: WeatherCode.LightRain, dayIcon: 'r01d', nightIcon: 'r01n' },
  { code: WeatherCode.ModerateRain, dayIcon: 'r02d', nightIcon: 'r02n' },
  { code: WeatherCode.HeavyRain, dayIcon: 'r03d', nightIcon: 'r03n' },
  { code: WeatherCode.FreezingRain, dayIcon: 'f01d', nightIcon: 'f01n' },
  { code: WeatherCode.LightShowerRain, dayIcon: 'r04d', nightIcon: 'r04n' },
  { code: WeatherCode.ShowerRain, dayIcon: 'r05d', nightIcon: 'r05n' },
  { code: WeatherCode.HeavyShowerRain, dayIcon: 'r06d', nightIcon: 'r06n' },
  { code: WeatherCode.LightSnow, dayIcon: 's01d', nightIcon: 's01n' },
  { code: WeatherCode.Snow, dayIcon: 's02d', nightIcon: 's02n' },
  { code: WeatherCode.HeavySnow, dayIcon: 's03d', nightIcon: 's03n' },
  { code: WeatherCode.MixSnowRain, dayIcon: 's04d', nightIcon: 's04n' },
  { code: WeatherCode.Sleet, dayIcon: 's05d', nightIcon: 's05n' },
  { code: WeatherCode.HeavySleet, dayIcon: 's05d', nightIcon: 's05n' },
  { code: WeatherCode.SnowShower, dayIcon: 's01d', nightIcon: 's01n' },
  { code: WeatherCode.HeavySnow, dayIcon: 's02d', nightIcon: 's02n' },
  { code: WeatherCode.Flurries, dayIcon: 's06d', nightIcon: 's06n' },
  { code: WeatherCode.Mist, dayIcon: 'a01d', nightIcon: 'a01n' },
  { code: WeatherCode.Smoke, dayIcon: 'a02d', nightIcon: 'a02n' },
  { code: WeatherCode.Haze, dayIcon: 'a03d', nightIcon: 'a03n' },
  { code: WeatherCode.SandDust, dayIcon: 'a04d', nightIcon: 'a04n' },
  { code: WeatherCode.Fog, dayIcon: 'a05d', nightIcon: 'a05n' },
  { code: WeatherCode.FreezingFog, dayIcon: 'a06d', nightIcon: 'a06n' },
  { code: WeatherCode.ClearSky, dayIcon: 'c01d', nightIcon: 'c01n' },
  { code: WeatherCode.FewClouds, dayIcon: 'c02d', nightIcon: 'c02n' },
  { code: WeatherCode.ScatteredClouds, dayIcon: 'c02d', nightIcon: 'c02n' },
  { code: WeatherCode.BrokenClouds, dayIcon: 'c03d', nightIcon: 'c03n' },
  { code: WeatherCode.OvercastClouds, dayIcon: 'c04d', nightIcon: 'c04n' },
  {
    code: WeatherCode.UnknownPrecipitation,
    dayIcon: 'u00d',
    nightIcon: 'u00n'
  }
];

/*
200	Thunderstorm with light rain t01d, t01n
201	Thunderstorm with rain t02d, t02n
202	Thunderstorm with heavy rain t03d, t03n
230	Thunderstorm with light drizzle t04d, t04n
231	Thunderstorm with drizzle t04d, t04n
232	Thunderstorm with heavy drizzle t04d, t04n
233	Thunderstorm with Hail t05d, t05n
300	Light Drizzle d01d, d01n
301	Drizzle d02d, d02n
302	Heavy Drizzle d03d, d03n
500	Light Rain r01d, r01n
501	Moderate Rain r02d, r02n
502	Heavy Rain Heavy r03d, Heavy r03n
511	Freezing rain f01d, f01n
520	Light shower rain r04d, r04n
521	Shower rain r05d, r05n
522	Heavy shower rain r06d, r06n
600	Light snow s01d, s01n
601	Snow s02d, s02n
602	Heavy Snow s03d, s03n
610	Mix snow/rain s04d, s04n
611	Sleet s05d, s05n
612	Heavy sleet s05d, s05n
621	Snow shower s01d, s01n
622	Heavy snow shower s02d, s02n
623	Flurries s06d, s06n
700	Mist a01d, a01n
711	Smoke a02d, a02n
721	Haze a03d, a03n
731	Sand/dust a04d, a04n
741	Fog a05d, a05n
751	Freezing Fog a06d, a06n
800	Clear sky c01d, c01n
801	Few clouds c02d, c02n
802	Scattered clouds c02d, c02n
803	Broken clouds c03d, c03n
804	Overcast clouds c04d, c04n
900	Unknown Precipitation u00d, u00n

*/
