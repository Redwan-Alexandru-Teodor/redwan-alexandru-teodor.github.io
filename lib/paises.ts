// Prefijos telefónicos de todos los países (formato compacto: "ISO prefijo Nombre").
// Los países de +1 (Norteamérica y Caribe) comparten prefijo; el número lleva el código de zona.
const TABLA = `
AF 93 Afganistán;AL 355 Albania;DE 49 Alemania;AD 376 Andorra;AO 244 Angola;AI 1 Anguila;AG 1 Antigua y Barbuda;
SA 966 Arabia Saudí;DZ 213 Argelia;AR 54 Argentina;AM 374 Armenia;AW 297 Aruba;AU 61 Australia;AT 43 Austria;
AZ 994 Azerbaiyán;BS 1 Bahamas;BD 880 Bangladés;BB 1 Barbados;BH 973 Baréin;BE 32 Bélgica;BZ 501 Belice;
BJ 229 Benín;BM 1 Bermudas;BY 375 Bielorrusia;BO 591 Bolivia;BA 387 Bosnia y Herzegovina;BW 267 Botsuana;
BR 55 Brasil;BN 673 Brunéi;BG 359 Bulgaria;BF 226 Burkina Faso;BI 257 Burundi;BT 975 Bután;CV 238 Cabo Verde;
KH 855 Camboya;CM 237 Camerún;CA 1 Canadá;QA 974 Catar;TD 235 Chad;CZ 420 Chequia;CL 56 Chile;CN 86 China;
CY 357 Chipre;VA 39 Ciudad del Vaticano;CO 57 Colombia;KM 269 Comoras;CG 242 Congo;KP 850 Corea del Norte;
KR 82 Corea del Sur;CI 225 Costa de Marfil;CR 506 Costa Rica;HR 385 Croacia;CU 53 Cuba;CW 599 Curazao;
DK 45 Dinamarca;DM 1 Dominica;EC 593 Ecuador;EG 20 Egipto;SV 503 El Salvador;AE 971 Emiratos Árabes Unidos;
ER 291 Eritrea;SK 421 Eslovaquia;SI 386 Eslovenia;ES 34 España;US 1 Estados Unidos;EE 372 Estonia;
SZ 268 Esuatini;ET 251 Etiopía;PH 63 Filipinas;FI 358 Finlandia;FJ 679 Fiyi;FR 33 Francia;GA 241 Gabón;
GM 220 Gambia;GE 995 Georgia;GH 233 Ghana;GI 350 Gibraltar;GD 1 Granada;GR 30 Grecia;GL 299 Groenlandia;
GP 590 Guadalupe;GU 1 Guam;GT 502 Guatemala;GF 594 Guayana Francesa;GN 224 Guinea;GQ 240 Guinea Ecuatorial;
GW 245 Guinea-Bisáu;GY 592 Guyana;HT 509 Haití;HN 504 Honduras;HK 852 Hong Kong;HU 36 Hungría;IN 91 India;
ID 62 Indonesia;IQ 964 Irak;IR 98 Irán;IE 353 Irlanda;IS 354 Islandia;KY 1 Islas Caimán;CK 682 Islas Cook;
FO 298 Islas Feroe;FK 500 Islas Malvinas;MP 1 Islas Marianas del Norte;MH 692 Islas Marshall;
SB 677 Islas Salomón;TC 1 Islas Turcas y Caicos;VG 1 Islas Vírgenes Británicas;VI 1 Islas Vírgenes de EE. UU.;
IL 972 Israel;IT 39 Italia;JM 1 Jamaica;JP 81 Japón;JO 962 Jordania;KZ 7 Kazajistán;KE 254 Kenia;
KG 996 Kirguistán;KI 686 Kiribati;XK 383 Kosovo;KW 965 Kuwait;LA 856 Laos;LS 266 Lesoto;LV 371 Letonia;
LB 961 Líbano;LR 231 Liberia;LY 218 Libia;LI 423 Liechtenstein;LT 370 Lituania;LU 352 Luxemburgo;
MO 853 Macao;MK 389 Macedonia del Norte;MG 261 Madagascar;MY 60 Malasia;MW 265 Malaui;MV 960 Maldivas;
ML 223 Mali;MT 356 Malta;MA 212 Marruecos;MQ 596 Martinica;MU 230 Mauricio;MR 222 Mauritania;YT 262 Mayotte;
MX 52 México;FM 691 Micronesia;MD 373 Moldavia;MC 377 Mónaco;MN 976 Mongolia;ME 382 Montenegro;
MS 1 Montserrat;MZ 258 Mozambique;MM 95 Myanmar;NA 264 Namibia;NR 674 Nauru;NP 977 Nepal;NI 505 Nicaragua;
NE 227 Níger;NG 234 Nigeria;NU 683 Niue;NO 47 Noruega;NC 687 Nueva Caledonia;NZ 64 Nueva Zelanda;OM 968 Omán;
NL 31 Países Bajos;PK 92 Pakistán;PW 680 Palaos;PS 970 Palestina;PA 507 Panamá;PG 675 Papúa Nueva Guinea;
PY 595 Paraguay;PE 51 Perú;PF 689 Polinesia Francesa;PL 48 Polonia;PT 351 Portugal;PR 1 Puerto Rico;
GB 44 Reino Unido;CF 236 República Centroafricana;CD 243 República Democrática del Congo;
DO 1 República Dominicana;RE 262 Reunión;RW 250 Ruanda;RO 40 Rumanía;RU 7 Rusia;EH 212 Sáhara Occidental;
WS 685 Samoa;AS 1 Samoa Americana;BL 590 San Bartolomé;KN 1 San Cristóbal y Nieves;SM 378 San Marino;
MF 590 San Martín;PM 508 San Pedro y Miquelón;VC 1 San Vicente y las Granadinas;SH 290 Santa Elena;
LC 1 Santa Lucía;ST 239 Santo Tomé y Príncipe;SN 221 Senegal;RS 381 Serbia;SC 248 Seychelles;
SL 232 Sierra Leona;SG 65 Singapur;SX 1 Sint Maarten;SY 963 Siria;SO 252 Somalia;LK 94 Sri Lanka;
ZA 27 Sudáfrica;SD 249 Sudán;SS 211 Sudán del Sur;SE 46 Suecia;CH 41 Suiza;SR 597 Surinam;TH 66 Tailandia;
TW 886 Taiwán;TZ 255 Tanzania;TJ 992 Tayikistán;TL 670 Timor Oriental;TG 228 Togo;TK 690 Tokelau;TO 676 Tonga;
TT 1 Trinidad y Tobago;TN 216 Túnez;TM 993 Turkmenistán;TR 90 Turquía;TV 688 Tuvalu;UA 380 Ucrania;
UG 256 Uganda;UY 598 Uruguay;UZ 998 Uzbekistán;VU 678 Vanuatu;VE 58 Venezuela;VN 84 Vietnam;
WF 681 Wallis y Futuna;YE 967 Yemen;DJ 253 Yibuti;ZM 260 Zambia;ZW 263 Zimbabue
`

export interface Pais {
  codigo: string
  nombre: string
  prefijo: string
  regex: RegExp
  placeholder: string
}

// Reglas propias de los países habituales; el resto usa una validación genérica.
const ESPECIFICOS: Record<string, [RegExp, string]> = {
  ES: [/^[6-9]\d{8}$/, '612 345 678'],
  PT: [/^[29]\d{8}$/, '912 345 678'],
  FR: [/^[1-9]\d{8}$/, '612 345 678'],
  DE: [/^\d{6,12}$/, '15123456789'],
  IT: [/^\d{6,11}$/, '312 345 6789'],
  GB: [/^7\d{9}$/, '7911 123456'],
  RO: [/^7\d{8}$/, '712 345 678'],
  MA: [/^[5-7]\d{8}$/, '612 345 678'],
  MX: [/^\d{10}$/, '5512345678'],
  AR: [/^\d{10}$/, '1123456789'],
  CO: [/^3\d{9}$/, '3001234567'],
  VE: [/^[24]\d{9}$/, '4121234567'],
  PE: [/^9\d{8}$/, '912345678'],
  CL: [/^9\d{8}$/, '912345678'],
  BR: [/^\d{10,11}$/, '11912345678'],
}
const NORTEAMERICA: [RegExp, string] = [/^\d{10}$/, '2125551234']
const GENERICO: [RegExp, string] = [/^\d{4,14}$/, '']

// Primero España y los países más habituales; después el resto por orden alfabético.
const DESTACADOS = ['ES', 'PT', 'FR', 'DE', 'IT', 'GB', 'RO', 'MA', 'US', 'MX', 'AR', 'CO', 'VE', 'PE', 'CL', 'BR']
const clave = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

const todos: Pais[] = TABLA.split(';')
  .map(t => t.trim().match(/^([A-Z]{2}) (\d+) (.+)$/))
  .filter((m): m is RegExpMatchArray => !!m)
  .map(([, codigo, num, nombre]) => {
    const [regex, placeholder] = ESPECIFICOS[codigo] ?? (num === '1' ? NORTEAMERICA : GENERICO)
    return { codigo, nombre, prefijo: `+${num}`, regex, placeholder }
  })

export const PAISES: Pais[] = [
  ...DESTACADOS.map(c => todos.find(p => p.codigo === c)!),
  ...todos
    .filter(p => !DESTACADOS.includes(p.codigo))
    .sort((a, b) => (clave(a.nombre) < clave(b.nombre) ? -1 : 1)),
]

export const PAIS_DEFAULT = PAISES[0]
