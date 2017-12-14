import React from "react";
import Translate from "react-translate-component";
import SettingsStore from "stores/SettingsStore";
import classnames from "classnames";
import axios from "axios";
import ls from "common/localStorage";
import IntlTelInput from "../CountriesSelectInput/main.js";
import "react-intl-tel-input/dist/libphonenumber.js";
import "../CountriesSelectInput/main.css";
import TextField from "material-ui-next/TextField";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MenuItem from "material-ui-next/es/Menu/MenuItem";
import DatePicker from "material-ui/DatePicker/DatePicker";
import IconButton from 'material-ui/IconButton';
import DatePickerIcon from 'material-ui-icons/Event';
// import mui from "material-ui";
import jQuery from 'jquery';
import 'jquery-mask-plugin';
import "inputmask/dist/inputmask/inputmask.numeric.extensions";
import Inputmask from "inputmask/dist/inputmask/inputmask.date.extensions";
import InputMask from 'react-input-mask';

// let ThemeManager = new mui.Styles.ThemeManager();
var validator = require("email-validator");

const STORAGE_KEY = "__graphene__";
let ss = new ls(STORAGE_KEY);

const travelchainThemeSetts = {
    fontFamily: "Roboto-Regular",
    palette: {
        pickerHeaderColor: "#00caf3",
        primary1Color: "#00caf3",
        primary2Color: "#00caf3",
        textColor: "#060e26",
        iconColor: "#FFFFFF"
    }
};

const travelchainTheme = getMuiTheme(travelchainThemeSetts);

class Kyc extends React.Component {

    constructor(props) {
        super(props);
        this.state = Kyc.getInitialState();
        this.datepickerPopuper = null;
    }

    static getInitialState() {
        return {
            first_name: "",
            surname: "",
            country: "",
            birthday: "",
            email: "",
            phone: "",
            address: "",
            activity: "",
            isAgreedTerms: false,
            isAgreedTermsTokens: false,
            currentCountryISO2: "ru",
            currentCountryDialCode: "ru"
        };

    };

    resetForm() {
        this.setState({
            first_name: "",
            surname: "",
            country: "",
            birthday: "",
            email: "",
            phone: "",
            address: "",
            activity: "",
            isAgreedTerms: false,
            isAgreedTermsTokens: false,
            currentCountryISO2: "",
            currentCountryDialCode: ""
        });
    }


    componentWillMount () {
        // jQuery('.dateinput input').mask('0000-00-00', {
        //   placeholder: "YYYY-MM-DD"
        // });
      // $('№phone').mask('0000-0000');
      // $("#phone").intlTelInput();
      // axios.get("https://testnet.travelchain.io/api/accounts/me/", {
      //   headers: {
      //     Authorization: `JWT ${ss.get("backend_token")}`
      //   }
      // }).then((response) => response.data.is_verified ? this.props.router.push("/dashboard") : false)npm start
      //   .catch(() => this.props.router.push("/dashboard"));
    }

    componentDidMount () {
      var im = new Inputmask("yyyy-mm-dd");
      im.mask(jQuery(".dateinput input"));
    }

    onSubmit(e) {
        e.preventDefault();

      let faucetAddress = SettingsStore.getSetting("faucet_address");
      var current_chain  = faucetAddress.split("/")[2].split(".")[0];

        axios({
          method: "PUT",
          url: "https://" + current_chain + ".travelchain.io/api/accounts/me/",
          data: {...this.state},
          headers: {
            'Authorization': `JWT ${ss.get('backend_token')}`
          }
        }).then(() => this.props.router.push('/token-sale'))
          .catch((e) => console.log(e));
    }



    setDatepickerPopuper( el )
    {
        this.datepickerPopuper = el;
    }

    getDatepickerPopuper()
    {
        return this.datepickerPopuper;
    }

    onKYCformInputChanged (e) {
        this.setState({[e.target.id]: e.target.value});
    }


  updatePhoneNumber = (event) => {
    this.setState({
      phone: event.target.value
    });
  }



  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  }

  setBirthday = date =>
  {
    this.setState({birthday: date.toLocaleString().substring(0, 10).split(".").reverse().join("-")});
  }

    render() {

      const defaultCountriesData = [
        [
          'Afghanistan (‫افغانستان‬‎)',
          'af',
          '93',
        ],
        [
          'Albania (Shqipëri)',
          'al',
          '355',
        ],
        [
          'Algeria (‫الجزائر‬‎)',
          'dz',
          '213',
        ],
        [
          'American Samoa',
          'as',
          '1684',
        ],
        [
          'Andorra',
          'ad',
          '376',
        ],
        [
          'Angola',
          'ao',
          '244',
        ],
        [
          'Anguilla',
          'ai',
          '1264',
        ],
        [
          'Antigua and Barbuda',
          'ag',
          '1268',
        ],
        [
          'Argentina',
          'ar',
          '54',
        ],
        [
          'Armenia (Հայաստան)',
          'am',
          '374',
        ],
        [
          'Aruba',
          'aw',
          '297',
        ],
        [
          'Australia',
          'au',
          '61',
          0,
        ],
        [
          'Austria (Österreich)',
          'at',
          '43',
        ],
        [
          'Azerbaijan (Azərbaycan)',
          'az',
          '994',
        ],
        [
          'Bahamas',
          'bs',
          '1242',
        ],
        [
          'Bahrain (‫البحرين‬‎)',
          'bh',
          '973',
        ],
        [
          'Bangladesh (বাংলাদেশ)',
          'bd',
          '880',
        ],
        [
          'Barbados',
          'bb',
          '1246',
        ],
        [
          'Belarus (Беларусь)',
          'by',
          '375',
        ],
        [
          'Belgium (België)',
          'be',
          '32',
        ],
        [
          'Belize',
          'bz',
          '501',
        ],
        [
          'Benin (Bénin)',
          'bj',
          '229',
        ],
        [
          'Bermuda',
          'bm',
          '1441',
        ],
        [
          'Bhutan (འབྲུག)',
          'bt',
          '975',
        ],
        [
          'Bolivia',
          'bo',
          '591',
        ],
        [
          'Bosnia and Herzegovina (Босна и Херцеговина)',
          'ba',
          '387',
        ],
        [
          'Botswana',
          'bw',
          '267',
        ],
        [
          'Brazil (Brasil)',
          'br',
          '55',
        ],
        [
          'British Indian Ocean Territory',
          'io',
          '246',
        ],
        [
          'British Virgin Islands',
          'vg',
          '1284',
        ],
        [
          'Brunei',
          'bn',
          '673',
        ],
        [
          'Bulgaria (България)',
          'bg',
          '359',
        ],
        [
          'Burkina Faso',
          'bf',
          '226',
        ],
        [
          'Burundi (Uburundi)',
          'bi',
          '257',
        ],
        [
          'Cambodia (កម្ពុជា)',
          'kh',
          '855',
        ],
        [
          'Cameroon (Cameroun)',
          'cm',
          '237',
        ],
        [
          'Canada',
          'ca',
          '1',
          1,
          [
            '204', '226', '236', '249', '250', '289',
            '306', '343', '365', '387', '403', '416',
            '418', '431', '437', '438', '450', '506',
            '514', '519', '548', '579', '581', '587',
            '604', '613', '639', '647', '672', '705',
            '709', '742', '778', '780', '782', '807',
            '819', '825', '867', '873', '902', '905',
          ],
        ],
        [
          'Cape Verde (Kabu Verdi)',
          'cv',
          '238',
        ],
        [
          'Caribbean Netherlands',
          'bq',
          '599',
          1,
        ],
        [
          'Cayman Islands',
          'ky',
          '1345',
        ],
        [
          'Central African Republic (République centrafricaine)',
          'cf',
          '236',
        ],
        [
          'Chad (Tchad)',
          'td',
          '235',
        ],
        [
          'Chile',
          'cl',
          '56',
        ],
        [
          'China (中国)',
          'cn',
          '86',
        ],
        [
          'Christmas Island',
          'cx',
          '61',
          2,
        ],
        [
          'Cocos (Keeling) Islands',
          'cc',
          '61',
          1,
        ],
        [
          'Colombia',
          'co',
          '57',
        ],
        [
          'Comoros (‫جزر القمر‬‎)',
          'km',
          '269',
        ],
        [
          'Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)',
          'cd',
          '243',
        ],
        [
          'Congo (Republic) (Congo-Brazzaville)',
          'cg',
          '242',
        ],
        [
          'Cook Islands',
          'ck',
          '682',
        ],
        [
          'Costa Rica',
          'cr',
          '506',
        ],
        [
          'Côte d’Ivoire',
          'ci',
          '225',
        ],
        [
          'Croatia (Hrvatska)',
          'hr',
          '385',
        ],
        [
          'Cuba',
          'cu',
          '53',
        ],
        [
          'Curaçao',
          'cw',
          '599',
          0,
        ],
        [
          'Cyprus (Κύπρος)',
          'cy',
          '357',
        ],
        [
          'Czech Republic (Česká republika)',
          'cz',
          '420',
        ],
        [
          'Denmark (Danmark)',
          'dk',
          '45',
        ],
        [
          'Djibouti',
          'dj',
          '253',
        ],
        [
          'Dominica',
          'dm',
          '1767',
        ],
        [
          'Dominican Republic (República Dominicana)',
          'do',
          '1',
          2,
          ['809', '829', '849'],
        ],
        [
          'Ecuador',
          'ec',
          '593',
        ],
        [
          'Egypt (‫مصر‬‎)',
          'eg',
          '20',
        ],
        [
          'El Salvador',
          'sv',
          '503',
        ],
        [
          'Equatorial Guinea (Guinea Ecuatorial)',
          'gq',
          '240',
        ],
        [
          'Eritrea',
          'er',
          '291',
        ],
        [
          'Estonia (Eesti)',
          'ee',
          '372',
        ],
        [
          'Ethiopia',
          'et',
          '251',
        ],
        [
          'Falkland Islands (Islas Malvinas)',
          'fk',
          '500',
        ],
        [
          'Faroe Islands (Føroyar)',
          'fo',
          '298',
        ],
        [
          'Fiji',
          'fj',
          '679',
        ],
        [
          'Finland (Suomi)',
          'fi',
          '358',
          0,
        ],
        [
          'France',
          'fr',
          '33',
        ],
        [
          'French Guiana (Guyane française)',
          'gf',
          '594',
        ],
        [
          'French Polynesia (Polynésie française)',
          'pf',
          '689',
        ],
        [
          'Gabon',
          'ga',
          '241',
        ],
        [
          'Gambia',
          'gm',
          '220',
        ],
        [
          'Georgia (საქართველო)',
          'ge',
          '995',
        ],
        [
          'Germany (Deutschland)',
          'de',
          '49',
        ],
        [
          'Ghana (Gaana)',
          'gh',
          '233',
        ],
        [
          'Gibraltar',
          'gi',
          '350',
        ],
        [
          'Greece (Ελλάδα)',
          'gr',
          '30',
        ],
        [
          'Greenland (Kalaallit Nunaat)',
          'gl',
          '299',
        ],
        [
          'Grenada',
          'gd',
          '1473',
        ],
        [
          'Guadeloupe',
          'gp',
          '590',
          0,
        ],
        [
          'Guam',
          'gu',
          '1671',
        ],
        [
          'Guatemala',
          'gt',
          '502',
        ],
        [
          'Guernsey',
          'gg',
          '44',
          1,
        ],
        [
          'Guinea (Guinée)',
          'gn',
          '224',
        ],
        [
          'Guinea-Bissau (Guiné Bissau)',
          'gw',
          '245',
        ],
        [
          'Guyana',
          'gy',
          '592',
        ],
        [
          'Haiti',
          'ht',
          '509',
        ],
        [
          'Honduras',
          'hn',
          '504',
        ],
        [
          'Hong Kong (香港)',
          'hk',
          '852',
        ],
        [
          'Hungary (Magyarország)',
          'hu',
          '36',
        ],
        [
          'Iceland (Ísland)',
          'is',
          '354',
        ],
        [
          'India (भारत)',
          'in',
          '91',
        ],
        [
          'Indonesia',
          'id',
          '62',
        ],
        [
          'Iran (‫ایران‬‎)',
          'ir',
          '98',
        ],
        [
          'Iraq (‫العراق‬‎)',
          'iq',
          '964',
        ],
        [
          'Ireland',
          'ie',
          '353',
        ],
        [
          'Isle of Man',
          'im',
          '44',
          2,
        ],
        [
          'Israel (‫ישראל‬‎)',
          'il',
          '972',
        ],
        [
          'Italy (Italia)',
          'it',
          '39',
          0,
        ],
        [
          'Jamaica',
          'jm',
          '1876',
        ],
        [
          'Japan (日本)',
          'jp',
          '81',
        ],
        [
          'Jersey',
          'je',
          '44',
          3,
        ],
        [
          'Jordan (‫الأردن‬‎)',
          'jo',
          '962',
        ],
        [
          'Kazakhstan (Казахстан)',
          'kz',
          '7',
          1,
        ],
        [
          'Kenya',
          'ke',
          '254',
        ],
        [
          'Kiribati',
          'ki',
          '686',
        ],
        [
          'Kosovo',
          'xk',
          '383',
        ],
        [
          'Kuwait (‫الكويت‬‎)',
          'kw',
          '965',
        ],
        [
          'Kyrgyzstan (Кыргызстан)',
          'kg',
          '996',
        ],
        [
          'Laos (ລາວ)',
          'la',
          '856',
        ],
        [
          'Latvia (Latvija)',
          'lv',
          '371',
        ],
        [
          'Lebanon (‫لبنان‬‎)',
          'lb',
          '961',
        ],
        [
          'Lesotho',
          'ls',
          '266',
        ],
        [
          'Liberia',
          'lr',
          '231',
        ],
        [
          'Libya (‫ليبيا‬‎)',
          'ly',
          '218',
        ],
        [
          'Liechtenstein',
          'li',
          '423',
        ],
        [
          'Lithuania (Lietuva)',
          'lt',
          '370',
        ],
        [
          'Luxembourg',
          'lu',
          '352',
        ],
        [
          'Macau (澳門)',
          'mo',
          '853',
        ],
        [
          'Macedonia (FYROM) (Македонија)',
          'mk',
          '389',
        ],
        [
          'Madagascar (Madagasikara)',
          'mg',
          '261',
        ],
        [
          'Malawi',
          'mw',
          '265',
        ],
        [
          'Malaysia',
          'my',
          '60',
        ],
        [
          'Maldives',
          'mv',
          '960',
        ],
        [
          'Mali',
          'ml',
          '223',
        ],
        [
          'Malta',
          'mt',
          '356',
        ],
        [
          'Marshall Islands',
          'mh',
          '692',
        ],
        [
          'Martinique',
          'mq',
          '596',
        ],
        [
          'Mauritania (‫موريتانيا‬‎)',
          'mr',
          '222',
        ],
        [
          'Mauritius (Moris)',
          'mu',
          '230',
        ],
        [
          'Mayotte',
          'yt',
          '262',
          1,
        ],
        [
          'Mexico (México)',
          'mx',
          '52',
        ],
        [
          'Micronesia',
          'fm',
          '691',
        ],
        [
          'Moldova (Republica Moldova)',
          'md',
          '373',
        ],
        [
          'Monaco',
          'mc',
          '377',
        ],
        [
          'Mongolia (Монгол)',
          'mn',
          '976',
        ],
        [
          'Montenegro (Crna Gora)',
          'me',
          '382',
        ],
        [
          'Montserrat',
          'ms',
          '1664',
        ],
        [
          'Morocco (‫المغرب‬‎)',
          'ma',
          '212',
          0,
        ],
        [
          'Mozambique (Moçambique)',
          'mz',
          '258',
        ],
        [
          'Myanmar (Burma) (မြန်မာ)',
          'mm',
          '95',
        ],
        [
          'Namibia (Namibië)',
          'na',
          '264',
        ],
        [
          'Nauru',
          'nr',
          '674',
        ],
        [
          'Nepal (नेपाल)',
          'np',
          '977',
        ],
        [
          'Netherlands (Nederland)',
          'nl',
          '31',
        ],
        [
          'New Caledonia (Nouvelle-Calédonie)',
          'nc',
          '687',
        ],
        [
          'New Zealand',
          'nz',
          '64',
        ],
        [
          'Nicaragua',
          'ni',
          '505',
        ],
        [
          'Niger (Nijar)',
          'ne',
          '227',
        ],
        [
          'Nigeria',
          'ng',
          '234',
        ],
        [
          'Niue',
          'nu',
          '683',
        ],
        [
          'Norfolk Island',
          'nf',
          '672',
        ],
        [
          'North Korea (조선 민주주의 인민 공화국)',
          'kp',
          '850',
        ],
        [
          'Northern Mariana Islands',
          'mp',
          '1670',
        ],
        [
          'Norway (Norge)',
          'no',
          '47',
          0,
        ],
        [
          'Oman (‫عُمان‬‎)',
          'om',
          '968',
        ],
        [
          'Pakistan (‫پاکستان‬‎)',
          'pk',
          '92',
        ],
        [
          'Palau',
          'pw',
          '680',
        ],
        [
          'Palestine (‫فلسطين‬‎)',
          'ps',
          '970',
        ],
        [
          'Panama (Panamá)',
          'pa',
          '507',
        ],
        [
          'Papua New Guinea',
          'pg',
          '675',
        ],
        [
          'Paraguay',
          'py',
          '595',
        ],
        [
          'Peru (Perú)',
          'pe',
          '51',
        ],
        [
          'Philippines',
          'ph',
          '63',
        ],
        [
          'Poland (Polska)',
          'pl',
          '48',
        ],
        [
          'Portugal',
          'pt',
          '351',
        ],
        [
          'Puerto Rico',
          'pr',
          '1',
          3,
          ['787', '939'],
        ],
        [
          'Qatar (‫قطر‬‎)',
          'qa',
          '974',
        ],
        [
          'Réunion (La Réunion)',
          're',
          '262',
          0,
        ],
        [
          'Romania (România)',
          'ro',
          '40',
        ],
        [
          'Russia (Россия)',
          'ru',
          '7',
          0,
        ],
        [
          'Rwanda',
          'rw',
          '250',
        ],
        [
          'Saint Barthélemy (Saint-Barthélemy)',
          'bl',
          '590',
          1,
        ],
        [
          'Saint Helena',
          'sh',
          '290',
        ],
        [
          'Saint Kitts and Nevis',
          'kn',
          '1869',
        ],
        [
          'Saint Lucia',
          'lc',
          '1758',
        ],
        [
          'Saint Martin (Saint-Martin (partie française))',
          'mf',
          '590',
          2,
        ],
        [
          'Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)',
          'pm',
          '508',
        ],
        [
          'Saint Vincent and the Grenadines',
          'vc',
          '1784',
        ],
        [
          'Samoa',
          'ws',
          '685',
        ],
        [
          'San Marino',
          'sm',
          '378',
        ],
        [
          'São Tomé and Príncipe (São Tomé e Príncipe)',
          'st',
          '239',
        ],
        [
          'Saudi Arabia (‫المملكة العربية السعودية‬‎)',
          'sa',
          '966',
        ],
        [
          'Senegal (Sénégal)',
          'sn',
          '221',
        ],
        [
          'Serbia (Србија)',
          'rs',
          '381',
        ],
        [
          'Seychelles',
          'sc',
          '248',
        ],
        [
          'Sierra Leone',
          'sl',
          '232',
        ],
        [
          'Singapore',
          'sg',
          '65',
        ],
        [
          'Sint Maarten',
          'sx',
          '1721',
        ],
        [
          'Slovakia (Slovensko)',
          'sk',
          '421',
        ],
        [
          'Slovenia (Slovenija)',
          'si',
          '386',
        ],
        [
          'Solomon Islands',
          'sb',
          '677',
        ],
        [
          'Somalia (Soomaaliya)',
          'so',
          '252',
        ],
        [
          'South Africa',
          'za',
          '27',
        ],
        [
          'South Korea (대한민국)',
          'kr',
          '82',
        ],
        [
          'South Sudan (‫جنوب السودان‬‎)',
          'ss',
          '211',
        ],
        [
          'Spain (España)',
          'es',
          '34',
        ],
        [
          'Sri Lanka (ශ්‍රී ලංකාව)',
          'lk',
          '94',
        ],
        [
          'Sudan (‫السودان‬‎)',
          'sd',
          '249',
        ],
        [
          'Suriname',
          'sr',
          '597',
        ],
        [
          'Svalbard and Jan Mayen',
          'sj',
          '47',
          1,
        ],
        [
          'Swaziland',
          'sz',
          '268',
        ],
        [
          'Sweden (Sverige)',
          'se',
          '46',
        ],
        [
          'Switzerland (Schweiz)',
          'ch',
          '41',
        ],
        [
          'Syria (‫سوريا‬‎)',
          'sy',
          '963',
        ],
        [
          'Taiwan (台灣)',
          'tw',
          '886',
        ],
        [
          'Tajikistan',
          'tj',
          '992',
        ],
        [
          'Tanzania',
          'tz',
          '255',
        ],
        [
          'Thailand (ไทย)',
          'th',
          '66',
        ],
        [
          'Timor-Leste',
          'tl',
          '670',
        ],
        [
          'Togo',
          'tg',
          '228',
        ],
        [
          'Tokelau',
          'tk',
          '690',
        ],
        [
          'Tonga',
          'to',
          '676',
        ],
        [
          'Trinidad and Tobago',
          'tt',
          '1868',
        ],
        [
          'Tunisia (‫تونس‬‎)',
          'tn',
          '216',
        ],
        [
          'Turkey (Türkiye)',
          'tr',
          '90',
        ],
        [
          'Turkmenistan',
          'tm',
          '993',
        ],
        [
          'Turks and Caicos Islands',
          'tc',
          '1649',
        ],
        [
          'Tuvalu',
          'tv',
          '688',
        ],
        [
          'U.S. Virgin Islands',
          'vi',
          '1340',
        ],
        [
          'Uganda',
          'ug',
          '256',
        ],
        [
          'Ukraine (Україна)',
          'ua',
          '380',
        ],
        [
          'United Arab Emirates (‫الإمارات العربية المتحدة‬‎)',
          'ae',
          '971',
        ],
        [
          'United Kingdom',
          'gb',
          '44',
          0,
        ],
        [
          'United States',
          'us',
          '1',
          0,
        ],
        [
          'Uruguay',
          'uy',
          '598',
        ],
        [
          'Uzbekistan (Oʻzbekiston)',
          'uz',
          '998',
        ],
        [
          'Vanuatu',
          'vu',
          '678',
        ],
        [
          'Vatican City (Città del Vaticano)',
          'va',
          '39',
          1,
        ],
        [
          'Venezuela',
          've',
          '58',
        ],
        [
          'Vietnam (Việt Nam)',
          'vn',
          '84',
        ],
        [
          'Wallis and Futuna',
          'wf',
          '681',
        ],
        [
          'Western Sahara (‫الصحراء الغربية‬‎)',
          'eh',
          '212',
          1,
        ],
        [
          'Yemen (‫اليمن‬‎)',
          'ye',
          '967',
        ],
        [
          'Zambia',
          'zm',
          '260',
        ],
        [
          'Zimbabwe',
          'zw',
          '263',
        ],
        [
          'Åland Islands',
          'ax',
          '358',
          1,
        ],
      ];

        let {first_name, surname, country, birthday, email, phone, address, isAgreedTerms, isAgreedTermsTokens, currentCountryISO2} = this.state;

        const isSendNotValid = !first_name || !surname || !country || !birthday || !address || !isAgreedTerms || !isAgreedTermsTokens ||
          !validator.validate(email) || !phone || !/[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(birthday);

        return (

            <div className="grid-block vertical">
            <div className="grid-block shrink vertical medium-horizontal" style={{paddingTop: "2rem"}}>

                <form style={{paddingBottom: 20, overflow: "visible"}} className="grid-content small-12 medium-6 large-5 large-offset-1 full-width-content user-form" onSubmit={this.onSubmit.bind(this)} noValidate>

                    <Translate content="kyc.header" component="h2" />
                  {/*  First name  */}
                    <div className="content-block transfer-input">
                        {/*<Translate className="left-label tooltip" component="label" content="kyc.first_name" data-place="top"/>*/}
                        {/*<input type="text" style={{marginBottom: 0}} id="first_name" onChange={this.onKYCformInputChanged.bind(this)} />*/}


                      {/* warning */}
                      {/*{ !first_name ?*/}
                        {/*<div className="error-area" style={{position: "absolute"}}>*/}
                            {/*Field is required*/}
                        {/*</div>*/}
                        {/*:null}*/}


                        <TextField
                            required
                            id="first_name"
                            label="FIRST NAME"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={this.handleChange("first_name")}
                            placeholder="Tim"
                            fullWidth
                            margin="normal"
                        />
                    </div>


                  {/*  Surname  */}
                    <div className="content-block transfer-input">
                        {/*<Translate className="left-label tooltip" component="label" content="kyc.surname" data-place="top"/>*/}
                        {/*<input type="text" style={{marginBottom: 0}} id="surname" onChange={this.onKYCformInputChanged.bind(this)} />*/}
                        {/*/!* warning *!/*/}
                        {/*{ !surname ?*/}
                          {/*<div className="error-area" style={{position: "absolute"}}>*/}
                            {/*Field is required*/}
                          {/*</div>*/}
                          {/*:null}*/}

                        <TextField
                            required
                            id="surname"
                            label="LAST NAME"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={this.handleChange("surname")}
                            placeholder="Smith"
                            margin="normal"
                            fullWidth
                        />
                    </div>

                  {/* Country */}
                    <div className="content-block transfer-input">
                        {/*<Translate className="left-label tooltip" component="label" content="kyc.country" data-place="top"/>*/}
                        {/*<input type="text" style={{marginBottom: 0}}  id="country" onChange={this.onKYCformInputChanged.bind(this)} />*/}
                        {/*/!* warning *!/*/}
                        {/*{ !country ?*/}
                          {/*<div className="error-area" style={{position: "absolute"}}>*/}
                            {/*Field is required*/}
                          {/*</div>*/}
                          {/*:null}*/}

                      <TextField
                          select
                          error={!country}
                          label="Country"
                          className="c227 c228 c213 c216"
                          value={country}
                          InputLabelProps={{
                              shrink: true,
                          }}
                          onChange={this.handleChange("country")}
                          // helperText="Please select your country"
                          margin="normal"
                          fullWidth
                      >
                          {defaultCountriesData.map((option, index) => (
                              <MenuItem key={index} value={option[1]}>
                                  {option[0]}
                              </MenuItem>
                          ))}
                      </TextField>
                    </div>

                  {/* Birthday */}

                    <div className="content-block transfer-input">

                        <TextField
                            required
                            data-inputmask-alias="datetime"
                            data-inputmask-inputformat="yyyy/mm/dd"
                            value={ this.state.birthday }
                            className="dateinput"
                            label="Date birth"
                            InputLabelProps={{ shrink: true }}
                            onChange={this.handleChange("birthday")}
                            fullWidth
                        />

                        <MuiThemeProvider>
                            <IconButton
                                className="datepicker-popover"
                                aria-haspopup="true"
                                onClick={ (e) => { this.getDatepickerPopuper().openDialog() } }
                            >
                              <DatePickerIcon />
                            </IconButton>
                        </MuiThemeProvider>

                        <div className="datepicker-by-icon">
                          <MuiThemeProvider muiTheme={travelchainTheme}>
                            <DatePicker
                                ref={(input)=> {this.setDatepickerPopuper(input); }}
                                onChange={(something, date) => {this.setBirthday(date);}}
                                hintText="day . month . year"
                            />
                          </MuiThemeProvider>
                        </div>
                    </div>

                  {/* Contact email */}
                    <div className="content-block transfer-input">
                        {/*<Translate className="left-label tooltip" component="label" content="kyc.email" data-place="top"/>*/}
                        {/*<input type="email" style={{marginBottom: 0}}  id="email" onChange={this.onKYCformInputChanged.bind(this)} />*/}
                      {/*/!* warning *!/*/}
                      {/*{ !validator.validate(email) ?*/}
                        {/*<div className="error-area" style={{position: "absolute"}}>*/}
                          {/*Email is wrong*/}
                        {/*</div>*/}
                        {/*:null}*/}

                        <TextField
                            required
                            id="email"
                            label="CONTACT EMAIL"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={this.handleChange("email")}
                            placeholder=""
                            fullWidth
                            margin="normal"
                        />
                    </div>

                  {/* Contact phone */}
                    <div className="content-block transfer-input">
                      <div className="MuiFormControl-root-1 MuiFormControl-marginNormal-2 MuiFormControl-fullWidth-4 c1 c2 c4">
                        {/*<Translate className="left-label tooltip" component="label" content="kyc.phone" data-place="top"/>*/}
                        <label data-shrink="true" className="MuiFormLabel-root-11 MuiInputLabel-root-5 MuiInputLabel-formControl-6 MuiInputLabel-animated-9 MuiInputLabel-shrink-8 c11 c5 c6 c9 c8" htmlFor="phone">Phone</label>
                        {/*<input type="tel" style={{marginBottom: 0}}  id="phone" onChange={this.onKYCformInputChanged.bind(this)} />*/}
                        {/*<IntlTelInput id="phone" css={['intl-tel-input', 'form-control']}*/}
                            {/*currentCountryISO2={currentCountryISO2}*/}
                            {/*onPhoneNumberChange={(...args) => this.updatePhoneNumber(args[1])}*/}
                            {/*utilsScript={'libphonenumber.js'}*/}
                            {/*defaultCountry={'ru'}*/}
                            {/*onSelectFlag={(currentNumber, countryDetails) => {*/}
                                {/*this.setState({*/}
                                    {/*currentCountryISO2: countryDetails.iso2,*/}
                                    {/*currentCountryDialCode: countryDetails.dialCode*/}
                                {/*});*/}
                            {/*}}*/}
                            {/*fullWidth*/}
                        {/*/>*/}
<div className="MuiInput-root-15 MuiInput-formControl-16 MuiInput-inkbar-17 MuiInput-underline-21 c15 c16 c17 c21">
                      <InputMask value={phone} onChange={this.updatePhoneNumber} className="MuiInput-input-24 MuiInput-inputSingleline-27 c24 c27 phoneInput" mask="+9999999999999999999999" maskChar=" " />
</div>

                        {/* warning */}
                        {/*{ (!phone.length >= 2) ?*/}
                          {/*<div className="error-area" style={{position: "absolute"}}>*/}
                            {/*Field is required*/}
                          {/*</div>*/}
                          {/*:null}*/}
                      </div>
                    </div>

                  {/* Address */}
                    <div className="content-block transfer-input">
                        {/*<Translate className="left-label tooltip" component="label" content="kyc.address" data-place="top"/>*/}
                        {/*<input type="text" style={{marginBottom: 0}}  id="address" onChange={this.onKYCformInputChanged.bind(this)} />*/}
                      {/*/!* warning *!/*/}
                      {/*{ !address ?*/}
                        {/*<div className="error-area" style={{position: "absolute"}}>*/}
                          {/*Field is required*/}
                        {/*</div>*/}
                        {/*:null}*/}

                        <TextField
                            required
                            id="address"
                            label="CITY"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={this.handleChange("address")}
                            placeholder=""
                            fullWidth
                            margin="normal"
                        />
                    </div>

                  {/* Kind of activity */}
                    <div className="content-block transfer-input">
                        {/*<Translate className="left-label tooltip" component="label" content="kyc.activity" data-place="top"/>*/}
                        {/*<input type="text" style={{marginBottom: 0}}  id="activity" onChange={this.onKYCformInputChanged.bind(this)} />*/}
                      {/*/!* warning *!/*/}
                      {/*{ !activity ?*/}
                        {/*<div className="error-area" style={{position: "absolute"}}>*/}
                          {/*Field is required*/}
                        {/*</div>*/}
                        {/*:null}*/}


                        <TextField
                            required
                            id="activity"
                            label="KIND OF ACTIVITY"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={this.handleChange("activity")}
                            placeholder=""
                            fullWidth
                            margin="normal"
                        />
                    </div>


                    <div className="confirm-checks">
                        <label>
                            <input value={isAgreedTerms} id='terms_agreement_checkbox' type="checkbox" onChange={(e) => { this.setState({isAgreedTerms: e.target.value == "false" })}}/>
                            <span>I agree to the processing of personal data</span>
                        </label>
                    </div>

                    <div className="confirm-checks">
                        <label>
                            <input value={isAgreedTermsTokens} id='terms_agreement_checkbox_2' type="checkbox" onChange={(e) => this.setState({isAgreedTermsTokens: e.target.value == "false"})}/>
                            <span>You are acquainted and you agree with the
                                <a href="https://drive.google.com/file/d/1f0zviV_rN6LgXyO-bWQqNzfix7YfwSEn/view?usp=sharing" target="_blank"> TRAVELCHAIN TRAVELTOKENS SALE AGREEMENT
                                </a>
                            </span>
                        </label>
                    </div>

                    <button className={classnames("button float-right no-margin", {disabled: isSendNotValid})} type="submit" value="Submit">
                        <Translate component="span" content="transfer.send" />
                    </button>
                </form>
              </div>
            </div>
        );
    }
}

export default Kyc;
