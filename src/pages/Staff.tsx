import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DepartmentCard } from "@/components/departments/DepartmentCard";
import { ElectedRepresentatives } from "@/components/departments/ElectedRepresentatives";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Building, Phone, Mail } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Staff = () => {
  const departments = {
    "Mandal Office Administration": [
      {
        name: "P.SAI LAHARI",
        position: "MPDO",
        mobile: "9491071391",
        email: "kuppam.brgf@gmail.com"
      },
      {
        name: "L VIJAYDATH",
        position: "EOPRD",
        mobile: "9440237609",
        email: "kuppam.eoprd@gmail.com"
      },
      {
        name: "N. GANGADHARAM",
        position: "ADMINISTRATIVE OFFICER",
        mobile: "9985569187",
        email: ""
      },
      {
        name: "S.A. SHABBEER AHMED",
        position: "SENIOR ASSISTANT",
        mobile: "9494747440",
        email: ""
      },
      {
        name: "E. SESHADRI",
        position: "JUNIOR ASSISTANT",
        mobile: "9494072682",
        email: ""
      },
      {
        name: "B. RAMU NAICK",
        position: "TYPIST",
        mobile: "9966505098",
        email: ""
      },
      {
        name: "SHAIK MAHABOOB BASHA",
        position: "MANDAL EDUCATIONAL OFFICER",
        mobile: "9481108991",
        email: ""
      },
      {
        name: "RAMAKRISHANA",
        position: "OFFICE SUBORDINATE",
        mobile: "9959868799",
        email: ""
      },
      {
        name: "VENKATESH",
        position: "OFFICE SUBORDINATE",
        mobile: "9550133409",
        email: ""
      },
      {
        name: "H MALLIGA",
        position: "OFFICE SUBORDINATE",
        mobile: "7799102114",
        email: ""
      },
      {
        name: "VENKATAPATHI",
        position: "OFFICE SUBORDINATE",
        mobile: "9154461724",
        email: ""
      }
    ],
    "Panchayat Secretaries": [
      {
        name: "A SREELAKSHMI",
        position: "PANCHAYAT SECRETARY G-III",
        mobile: "9703323857",
        email: ""
      },
      {
        name: "B BHASKAR",
        position: "PANCHAYAT SECRETARY G-III",
        mobile: "9849819256",
        email: ""
      },
      {
        name: "B SRINIVASULU",
        position: "PANCHAYAT SECRETARY G-IV",
        mobile: "9573536655",
        email: ""
      },
      {
        name: "R MANJUNATH",
        position: "PANCHAYAT SECRETARY G-IV",
        mobile: "9963256110",
        email: ""
      },
      {
        name: "M.BALAJINAIK",
        position: "PANCHAYAT SECRETARY G-IV",
        mobile: "7799020789",
        email: ""
      },
      {
        name: "D VENKATESH",
        position: "PANCHAYAT SECRETARY G-IV",
        mobile: "8712949075",
        email: ""
      },
      {
        name: "C RAMYALAKSHMI",
        position: "PANCHAYAT SECRETARY G-IV",
        mobile: "8374791248",
        email: ""
      },
      {
        name: "T SUNEETHA",
        position: "PANCHAYAT SECRETARY G-IV",
        mobile: "8686765681",
        email: ""
      },
      {
        name: "SAMARAJ",
        position: "PANCHAYAT SECRETARY G-IV",
        mobile: "8008786117",
        email: ""
      },
      {
        name: "RAVI ASHOK",
        position: "PANCHAYAT SECRETARY G-IV",
        mobile: "9441995711",
        email: ""
      },
      {
        name: "V RENUKA",
        position: "PANCHAYAT SECRETARY G-IV",
        mobile: "9581466834",
        email: ""
      },
      {
        name: "J MURALI KRISHNA",
        position: "PANCHAYAT SECRETARY G-IV",
        mobile: "8639615003",
        email: ""
      },
      {
        name: "THANDAVA KRISHNA",
        position: "PANCHAYAT SECRETARY G-V",
        mobile: "8919143396",
        email: ""
      },
      {
        name: "V SASIKUMAR",
        position: "PANCHAYAT SECRETARY G-V",
        mobile: "9000593316",
        email: ""
      },
      {
        name: "SIVAPPA",
        position: "PANCHAYAT SECRETARY G-V",
        mobile: "9398271788",
        email: ""
      },
      {
        name: "K SUGUNA",
        position: "PANCHAYAT SECRETARY G-V",
        mobile: "9121744390",
        email: ""
      },
      {
        name: "V RAJAPPA",
        position: "PANCHAYAT SECRETARY G-V",
        mobile: "7989882354",
        email: ""
      },
      {
        name: "D GOPAL GOWDU",
        position: "PANCHAYAT SECRETARY G-V",
        mobile: "9573580431",
        email: ""
      },
      {
        name: "SUBRAMANYAM",
        position: "PANCHAYAT SECRETARY G-V",
        mobile: "8688886177",
        email: ""
      },
      {
        name: "Y NARESH",
        position: "PANCHAYAT SECRETARY G-V",
        mobile: "7989404203",
        email: ""
      },
      {
        name: "BALAKRISHNA",
        position: "PANCHAYAT SECRETARY G-V",
        mobile: "6300373080",
        email: ""
      },
      {
        name: "BHAVYASREE",
        position: "PANCHAYAT SECRETARY G-V",
        mobile: "9066833545",
        email: ""
      },
      {
        name: "VS MOUNIKA",
        position: "PANCHAYAT SECRETARY G-V",
        mobile: "7981669656",
        email: ""
      }
    ],
    "Elected Representatives": {
      "MPP": [
        {
          name: "H M Aswini",
          position: "MPP",
          mobile: "9949408783"
        },
        {
          name: "Suguna",
          position: "MPP",
          mobile: "9550133403"
        }
      ],
      "ZPTC": [
        {
          name: "A D S Saravana",
          position: "ZPTC",
          mobile: "9550300080"
        }
      ],
      "Sarpanch": [
        {
          name: "CHINNATHAYEE",
          position: "Sarpanch - ADAVIBUDUGURU",
          mobile: "9440282283"
        },
        {
          name: "L N RAJENDRAN",
          position: "Sarpanch - BRAHMADEVARACHENU",
          mobile: "9553152188"
        },
        {
          name: "M KUMARASWAMY",
          position: "Sarpanch - CHANDAM",
          mobile: "9177305294"
        },
        {
          name: "S PERUMALU",
          position: "Sarpanch - CHEKKUNATHAM",
          mobile: "8309153683"
        },
        {
          name: "KANNAMMA",
          position: "Sarpanch - DASEGOUNURU",
          mobile: "9398631703"
        },
        {
          name: "T CHINNAIA",
          position: "Sarpanch - DEVARAJAPURAM",
          mobile: "6374352755"
        },
        {
          name: "A POOMALAR",
          position: "Sarpanch - GARIGACHINNEPALLI",
          mobile: "7729931155"
        },
        {
          name: "T R DEEPTHI",
          position: "Sarpanch - GONUGUR",
          mobile: "9849928777"
        },
        {
          name: "P JAANSI",
          position: "Sarpanch - GUDLANAYANAPALLI",
          mobile: "9676332005"
        },
        {
          name: "S MALLIGA",
          position: "Sarpanch - JARUGU",
          mobile: "9121415116"
        },
        {
          name: "M SAMPOORANA",
          position: "Sarpanch - KANGUNDI",
          mobile: "9989918026"
        },
        {
          name: "K RAJENDRA",
          position: "Sarpanch - KOTALURU",
          mobile: "9444313269"
        },
        {
          name: "K RAJASEKHAR",
          position: "Sarpanch - KOTHAPALLI",
          mobile: "8008367714"
        },
        {
          name: "M SARASWATHI",
          position: "Sarpanch - KRISHNADASANAPALLI",
          mobile: "9849095032"
        },
        {
          name: "SAIDABEGAM",
          position: "Sarpanch - MAHAMADPURAM",
          mobile: "9676269341"
        },
        {
          name: "E SRINIVASULU",
          position: "Sarpanch - MANKALADODDI",
          mobile: "9989976121"
        },
        {
          name: "ANJALI",
          position: "Sarpanch - MITTAPALLI",
          mobile: "9502109152"
        },
        {
          name: "J MADHAMMA",
          position: "Sarpanch - NADIMURU",
          mobile: "8106142404"
        },
        {
          name: "G KAVYA",
          position: "Sarpanch - NAYANURU",
          mobile: "9912542533"
        },
        {
          name: "KRISHNAMURTHY",
          position: "Sarpanch - NOOLAKUNTA",
          mobile: "9502420944"
        },
        {
          name: "PUSHPA",
          position: "Sarpanch - PAIPALYAM",
          mobile: "9440942192"
        },
        {
          name: "R ROHITH",
          position: "Sarpanch - PEDDABANGARUNATHAM",
          mobile: "8500420910"
        },
        {
          name: "ABBU",
          position: "Sarpanch - URLAOBANAPALLI",
          mobile: "9505554763"
        },
        {
          name: "J PARVATHI",
          position: "Sarpanch - VANAGUTTAPALLI",
          mobile: "8328667409"
        },
        {
          name: "V.G BALASUBRAMANYAM",
          position: "Sarpanch - VASANADU",
          mobile: "9394134267"
        },
        {
          name: "D LAKSHMI",
          position: "Sarpanch - VENDUGAMPALLI",
          mobile: "9959816634"
        }
      ]
    },
    "Mandal Level Officers": [
      {
        name: "Chittibabu",
        position: "Mandal Revenue Officer",
        mobile: "9491077081"
      },
      {
        name: "Munirathnam",
        position: "AD-KRESCO",
        mobile: "9440625640"
      },
      {
        name: "Reddy Kumari",
        position: "AD-Veterinary",
        mobile: "9441007345"
      },
      {
        name: "Purushotham",
        position: "DEE RWS & S",
        mobile: "9100121835"
      },
      {
        name: "T Guruvareddy",
        position: "DEE PR",
        mobile: "9440044134"
      },
      {
        name: "Venkateswar rao",
        position: "DE- Housing",
        mobile: "7093931002"
      },
      {
        name: "GuruPrasad",
        position: "DE-R & B",
        mobile: "7013222106"
      },
      {
        name: "S.Ganenaik",
        position: "DE - Irrigation",
        mobile: "7901090342"
      },
      {
        name: "Smt.S.Amruthavalli",
        position: "Mandal Agricultural Officer",
        mobile: "8886612540"
      },
      {
        name: "Shaik Mahaboob Basha",
        position: "Mandal Educational Officer",
        mobile: "9481108991"
      },
      {
        name: "Sri.Rajaram",
        position: "Mandal Educational Officer 2",
        mobile: "9441862325"
      },
      {
        name: "Dimpul Priya",
        position: "Horticulture Officer",
        mobile: "7731881596"
      },
      {
        name: "Ampaiah",
        position: "Sericulture Officer",
        mobile: "7396166656"
      },
      {
        name: "Kodanda (Incharge)",
        position: "Veterinary Assistant Surgeon Animal Husbandry",
        mobile: "7981538462"
      },
      {
        name: "Kodanda",
        position: "Veterinary Assistant Surgeon (Paipalyam)",
        mobile: "7981538462"
      },
      {
        name: "U Arunasree",
        position: "CDPO",
        mobile: "9440814498"
      },
      {
        name: "Abhishaik",
        position: "AE Housing",
        mobile: "7093931056"
      },
      {
        name: "Madhu Sudhan ",
        position: "AE-RWS & S",
        mobile: "9100121836"
      },
      {
        name: "Krishnaiah",
        position: "AE-PR",
        mobile: "9010399189"
      },
      {
        name: "Krishna Naik",
        position: "AE-R & B Gudipalli,rkpm,santhipurm ",
        mobile: "9440818948"
      },
      {
        name: "C.M. Sandhya Vandana",
        position: "AEE-Irrigation",
        mobile: "9494160360"
      },
      {
        name: "Meenakshmi",
        position: "ASWO",
        mobile: "9490322528"
      },
      {
        name: "Chandrasekhar",
        position: "APM",
        mobile: "9390504568"
      },
      {
        name: "Jyothi ",
        position: "APO I/C",
        mobile: "9491580410"
      },
      {
        name: "Maheswari",
        position: "PHC Paipalyam",
        mobile: "9344468441"
      },
      {
        name: "Raja Sekhar",
        position: "PHC Kangundi",
        mobile: "7981902590"
      },
      {
        name: "Mary Suseela",
        position: "PHC Mallanuru",
        mobile: "9703077823"
      },
      {
        name: "R. Vanajakshmi",
        position: "PHC N.Kothapalli",
        mobile: "9652110683"
      },
      {
        name: "Murali",
        position: "Social Welfare (bc hostel chellepalle)",
        mobile: "9491066219"
      },
      {
        name: "Rajesh",
        position: "Fisheries Asst",
        mobile: "9398065593"
      },
      {
        name: "M C Penchulaiah",
        position: "APSRTC DPPO Manager",
        mobile: "9959225681"
      },
      {
        name: "Anvesh Naidu",
        position: "Exerise SI",
        mobile: "8187809160"
      },
      {
        name: "Subba Reddy",
        position: "Police SI",
        mobile: "7013636392"
      },
      {
        name: "Eswar Reddy",
        position: "Police CI(Urban)",
        mobile: "9440796737"
      },
      {
        name: "Surya Prakesh ",
        position: "HDT (Tahsildar Office)",
        mobile: "9573056183"
      }
    ],
    "Sachivalayam Staff": [
      {
        name: "V.RENUKA",
        position: "PANCHAYAT SECRETARY (PS GRADE I-IV)",
        mobile: "9581466834",
        location: "ADAVIBUDUGURU"
      },
      {
        name: "C SUNDARESAN",
        position: "WELFARE & EDUCATION ASSISTANT (WEA)",
        mobile: "8374115221",
        location: "ADAVIBUDUGURU"
      },
      {
        name: "M VENKATESH",
        position: "ENGINEERING ASSISTANT (ENA)",
        mobile: "9603414681",
        location: "ADAVIBUDUGURU"
      },
      {
        name: "M MAHENDRA",
        position: "VILLAGE SURVEYOR (VS)",
        mobile: "6303895129",
        location: "ADAVIBUDUGURU"
      },
      {
        name: "PEDDANNA GIRAKA",
        position: "VILLAGE SERICULTURE ASSISTANT (VSA)",
        mobile: "9052589523",
        location: "ADAVIBUDUGURU"
      },
      {
        name: "N R PRAVEEN",
        position: "VETERINARY /ANIMAL HUSBANDRY ASSISTANT (VAHA)",
        mobile: "9490484601",
        location: "ADAVIBUDUGURU"
      },
      {
        name: "A PRABHAKAR",
        position: "DIGITAL ASSISTANT (DA - PS GRADE VI)",
        mobile: "9177448224",
        location: "CHANDAM"
      },
      {
        name: "K SREENIVASULU",
        position: "WELFARE & EDUCATION ASSISTANT (WEA)",
        mobile: "7702784640",
        location: "CHANDAM"
      },
      {
        name: "R BHAGYARAJU",
        position: "ENGINEERING ASSISTANT (ENA)",
        mobile: "7032162840",
        location: "CHANDAM"
      },
      {
        name: "A HARI",
        position: "VILLAGE SURVEYOR (VS)",
        mobile: "7893179281",
        location: "CHANDAM"
      },
      {
        name: "C ADI LAKSHMI",
        position: "VILLAGE HORTICULTURE ASSISTANT (VHA)",
        mobile: "9959801157",
        location: "CHANDAM"
      },
      {
        name: "S NITHIN KUMAR",
        position: "VETERINARY /ANIMAL HUSBANDRY ASSISTANT (VAHA)",
        mobile: "9494395582",
        location: "CHANDAM"
      },
      {
        name: "P V KOMALA",
        position: "AUXILIARY NURSE MIDWIFE (ANM)",
        mobile: "9676269396",
        location: "CHANDAM"
      },
      {
        name: "S LAKSHMI",
        position: "GRAMA MAHILA SAMRAKSHANA KARYADARSI (GMSK)",
        mobile: "9705524707",
        location: "CHANDAM"
      },
      {
        name: "NOWZIA",
        position: "VILLAGE REVENUE OFFICER (VRO)",
        mobile: "",
        location: "CHANDAM"
      },
      {
        name: "J MURALI KRISHNA",
        position: "PANCHAYAT SECRETARY (PS GRADE I-IV)",
        mobile: "9441653473",
        location: "CHEKKUNATHAM"
      },
      {
        name: "T JYOTHSNA",
        position: "DIGITAL ASSISTANT (DA - PS GRADE VI)",
        mobile: "8106351696",
        location: "CHEKKUNATHAM"
      },
      {
        name: "V KEERTHI",
        position: "ENGINEERING ASSISTANT (ENA)",
        mobile: "7339491393",
        location: "CHEKKUNATHAM"
      },
      {
        name: "V RAVI CHANDRA",
        position: "WELFARE & EDUCATION ASSISTANT (WEA)",
        mobile: "9948381460",
        location: "CHEKKUNATHAM"
      },
      {
        name: "R GANESH",
        position: "VILLAGE SURVEYOR (VS)",
        mobile: "6281819502",
        location: "CHEKKUNATHAM"
      },
      {
        name: "M BALARAJU NAICK",
        position: "VILLAGE AGRICULTURE ASSISTANT (VAA)",
        mobile: "9951428501",
        location: "CHEKKUNATHAM"
      },
      {
        name: "V SUMATHI",
        position: "AUXILIARY NURSE MIDWIFE (ANM)",
        mobile: "9398326403",
        location: "CHEKKUNATHAM"
      },
      {
        name: "K C KUMAR RAJA",
        position: "DIGITAL ASSISTANT (DA - PS GRADE VI)",
        mobile: "9494353562",
        location: "DASEGOWNUR"
      },
      {
        name: "L CHANDRAKALA",
        position: "WELFARE & EDUCATION ASSISTANT (WEA)",
        mobile: "7013611550",
        location: "DASEGOWNUR"
      },
      {
        name: "N KULADEEP KUMAR",
        position: "ENGINEERING ASSISTANT (ENA)",
        mobile: "9703995882",
        location: "DASEGOWNUR"
      },
      {
        name: "ALI SHAIK SHAHABAZ ALI",
        position: "VILLAGE REVENUE OFFICER (VRO)",
        mobile: "9052291613",
        location: "DASEGOWNUR"
      },
      {
        name: "V VARALAKSHMI",
        position: "VILLAGE SURVEYOR (VS)",
        mobile: "9900418668",
        location: "DASEGOWNUR"
      },
      {
        name: "B CHANDRASEKHAR NAICK",
        position: "VILLAGE HORTICULTURE ASSISTANT (VHA)",
        mobile: "9963282035",
        location: "DASEGOWNUR"
      },
      {
        name: "S BHARATHI",
        position: "VETERINARY /ANIMAL HUSBANDRY ASSISTANT (VAHA)",
        mobile: "6301987733",
        location: "DASEGOWNUR"
      },
      {
        name: "V BABY RANI",
        position: "AUXILIARY NURSE MIDWIFE (ANM)",
        mobile: "9704003677",
        location: "DASEGOWNUR"
      },
      {
        name: "M VARALAKSHMI",
        position: "GRAMA MAHILA SAMRAKSHANA KARYADARSI (GMSK)",
        mobile: "7995416028",
        location: "DASEGOWNUR"
      },
      {
        name: "G M RANJITH KUMAR",
        position: "DIGITAL ASSISTANT (DA - PS GRADE VI)",
        mobile: "7842339361",
        location: "JARUGU"
      },
      {
        name: "R SATHISH KUMAR",
        position: "WELFARE & EDUCATION ASSISTANT (WEA)",
        mobile: "9676873731",
        location: "JARUGU"
      },
      {
        name: "K MURUGESH",
        position: "VILLAGE REVENUE OFFICER (VRO)",
        mobile: "6303409706",
        location: "JARUGU"
      },
      {
        name: "R ROOPESH KUMAR",
        position: "ENGINEERING ASSISTANT (ENA)",
        mobile: "9160782415",
        location: "JARUGU"
      },
      {
        name: "K LAVANYA",
        position: "VETERINARY /ANIMAL HUSBANDRY ASSISTANT (VAHA)",
        mobile: "7981935029",
        location: "JARUGU"
      },
      {
        name: "B SRINIVASULU",
        position: "PANCHAYAT SECRETARY (PS GRADE IV)",
        mobile: "9573536655",
        location: "KANGUNDI1"
      },
      {
        name: "I AZIM BASHA",
        position: "DIGITAL ASSISTANT (DA - PS GRADE VI)",
        mobile: "8919373639",
        location: "KANGUNDI1"
      },
      {
        name: "ASLAM",
        position: "WELFARE & EDUCATION ASSISTANT (WEA)",
        mobile: "9398841085",
        location: "KANGUNDI1"
      },
      {
        name: "M DEVENDRA NAICK",
        position: "VILLAGE SURVEYOR (VS)",
        mobile: "9000018621",
        location: "KANGUNDI1"
      },
      {
        name: "KOTHAPALEM SURESH",
        position: "VILLAGE SERICULTURE ASSISTANT (VSA)",
        mobile: "6303669548",
        location: "KANGUNDI1"
      },
      {
        name: "VS MOUNIKA",
        position: "PANCHAYAT SECRETARY (PS GRADE V)",
        mobile: "7981669656",
        location: "KANGUNDI2"
      },
      {
        name: "K V DILEEP KUMAR",
        position: "DIGITAL ASSISTANT (DA - PS GRADE VI)",
        mobile: "9573934983",
        location: "KANGUNDI2"
      },
      {
        name: "G T VAMSI KRISHNA",
        position: "WELFARE & EDUCATION ASSISTANT (WEA)",
        mobile: "7013928217",
        location: "KANGUNDI2"
      },
      {
        name: "R MANJUNATH",
        position: "PANCHAYAT SECRETARY (PS GRADE IV)",
        mobile: "9963256110",
        location: "KOTALURU"
      },
      {
        name: "M SURESH",
        position: "DIGITAL ASSISTANT (DA - PS GRADE VI)",
        mobile: "8688032952",
        location: "KOTALURU"
      },
      {
        name: "N JAYAPRAKASH",
        position: "WELFARE & EDUCATION ASSISTANT (WEA)",
        mobile: "8639073567",
        location: "KOTALURU"
      },
      {
        name: "C S NEERAJA",
        position: "VETERINARY /ANIMAL HUSBANDRY ASSISTANT (VAHA)",
        mobile: "9000043400",
        location: "KOTALURU"
      },
      {
        name: "DILLEP KUMAR",
        position: "VILLAGE SURVEYOR (VS)",
        mobile: "9949776737",
        location: "KOTALURU"
      },
      {
        name: "M.BALAJINAIK",
        position: "PANCHAYAT SECRETARY (PS GRADE IV)",
        mobile: "7799020789",
        location: "KOTHAPALLI"
      },
      {
        name: "K N PREMA",
        position: "WELFARE & EDUCATION ASSISTANT (WEA)",
        mobile: "8008417642",
        location: "KOTHAPALLI"
      },
      {
        name: "PRAKASH SOMPALLI",
        position: "VILLAGE SERICULTURE ASSISTANT (VSA)",
        mobile: "7558145999",
        location: "KOTHAPALLI"
      },
      {
        name: "B MOHANAMMA",
        position: "AUXILIARY NURSE MIDWIFE (ANM)",
        mobile: "9866981526",
        location: "KOTHAPALLI"
      },
      {
        name: "B HEMAVATHI",
        position: "GRAMA MAHILA SAMRAKSHANA KARYADARSI (GMSK)",
        mobile: "6361132073",
        location: "KOTHAPALLI"
      },
      {
        name: "HARITHA PRIYA",
        position: "DIGITAL ASSISTANT (DA - PS GRADE VI)",
        mobile: "",
        location: "KOTHAPALLI"
      },
      {
        name: "D VENKATESH",
        position: "PANCHAYAT SECRETARY (PS GRADE IV)",
        mobile: "8712949075",
        location: "KRISHNADASANAPALLI"
      },
      {
        name: "D KUSUMA PRIYA",
        position: "DIGITAL ASSISTANT (DA - PS GRADE VI)",
        mobile: "8660969663",
        location: "KRISHNADASANAPALLI"
      },
      {
        name: "N HITHESH",
        position: "WELFARE & EDUCATION ASSISTANT (WEA)",
        mobile: "6302669219",
        location: "KRISHNADASANAPALLI"
      },
      {
        name: "B MADHAN KUMAR",
        position: "VILLAGE REVENUE OFFICER (VRO)",
        mobile: "7093131399",
        location: "KRISHNADASANAPALLI"
      },
      {
        name: "M SASIKALA",
        position: "VILLAGE AGRICULTURE ASSISTANT (VAA)",
        mobile: "6300814976",
        location: "KRISHNADASANAPALLI"
      },
      {
        name: "SUDHARANI",
        position: "VETERINARY /ANIMAL HUSBANDRY ASSISTANT (VAHA)",
        mobile: "9663980466",
        location: "KRISHNADASANAPALLI"
      },
      {
        name: "A MALLESWARI",
        position: "AUXILIARY NURSE MIDWIFE (ANM)",
        mobile: "9502688553",
        location: "KRISHNADASANAPALLI"
      },
      {
        name: "ADITHYA SRIVAKSHA",
        position: "ENGINEERING ASSISTANT (ENA)",
        mobile: "9704050084",
        location: "KRISHNADASANAPALLI"
      },
      {
        name: "C RAMYALAKSHMI",
        position: "PANCHAYAT SECRETARY (PS GRADE IV)",
        mobile: "8374791248",
        location: "MALLANURU-1"
      },
      {
        name: "D SONIYA",
        position: "DIGITAL ASSISTANT (DA - PS GRADE VI)",
        mobile: "9618838148",
        location: "MALLANURU-1"
      },
      {
        name: "Y LAKSHMIPATHI",
        position: "ENGINEERING ASSISTANT (ENA)",
        mobile: "8919310291",
        location: "MALLANURU-1"
      },
      {
        name: "S VENKATESH",
        position: "VILLAGE SURVEYOR (VS)",
        mobile: "7995828069",
        location: "MALLANURU-1"
      },
      {
        name: "SHAIK SANJUNIGAR",
        position: "AUXILIARY NURSE MIDWIFE (ANM)",
        mobile: "8861934133",
        location: "MALLANURU-1"
      },
      {
        name: "V SASIKUMAR",
        position: "PANCHAYAT SECRETARY (PS GRADE V)",
        mobile: "9000593316",
        location: "MALLANURU-2"
      },
      {
        name: "B NARESH RAJU NAIK",
        position: "WELFARE & EDUCATION ASSISTANT (WEA)",
        mobile: "9502651436",
        location: "MALLANURU-2"
      },
      {
        name: "M SHANMUGAM",
        position: "VILLAGE SERICULTURE ASSISTANT (VSA)",
        mobile: "7842397814",
        location: "MALLANURU-2"
      },
      {
        name: "BALAKRISHNA",
        position: "VILLAGE REVENUE OFFICER (VRO)",
        mobile: "9490996260",
        location: "MALLANURU-2"
      },
      {
        name: "BALAJI",
        position: "DIGITAL ASSISTANT (DA - PS GRADE VI)",
        mobile: "",
        location: "MALLANURU-2"
      },
      {
        name: "B BHASKAR",
        position: "PANCHAYAT SECRETARY (PS GRADE IV)",
        mobile: "9849819256",
        location: "MANKALDODDI"
      },
      {
        name: "S NARAYANAPPA",
        position: "WELFARE & EDUCATION ASSISTANT (WEA)",
        mobile: "9515808693",
        location: "MANKALDODDI"
      },
      {
        name: "S SUBRAMANYAM",
        position: "VILLAGE REVENUE OFFICER (VRO)",
        mobile: "7799858363",
        location: "MANKALDODDI"
      },
      {
        name: "K G JAYASUDHA",
        position: "VILLAGE AGRICULTURE ASSISTANT (VAA)",
        mobile: "8374415842",
        location: "MANKALDODDI"
      },
      {
        name: "A PALLAVI",
        position: "GRAMA MAHILA SAMRAKSHANA KARYADARSI (GMSK)",
        mobile: "7659936673",
        location: "MANKALDODDI"
      },
      {
        name: "S ASHRAF",
        position: "WELFARE & EDUCATION ASSISTANT (WEA)",
        mobile: "8341554248",
        location: "MITTAPALLI"
      },
      {
        name: "KARNAM CHANDRA",
        position: "DIGITAL ASSISTANT (DA - PS GRADE VI)",
        mobile: "8019317355",
        location: "MITTAPALLI"
      },
      {
        name: "B ASWANI",
        position: "ENGINEERING ASSISTANT (ENA)",
        mobile: "7095602465",
        location: "MITTAPALLI"
      },
      {
        name: "P KIRAN KUMAR",
        position: "VILLAGE REVENUE OFFICER (VRO)",
        mobile: "7780434848",
        location: "MITTAPALLI"
      },
      {
        name: "K N BHARATH KUMAR",
        position: "VILLAGE AGRICULTURE ASSISTANT (VAA)",
        mobile: "9701953673",
        location: "MITTAPALLI"
      },
      {
        name: "T M DAMODARAM",
        position: "VETERINARY /ANIMAL HUSBANDRY ASSISTANT (VAHA)",
        mobile: "8985756952",
        location: "MITTAPALLI"
      },
      {
        name: "T SUNEETHA",
        position: "PANCHAYAT SECRETARY (PS GRADE IV)",
        mobile: "8686765681",
        location: "NADIMURU"
      },
      {
        name: "V DURGA",
        position: "DIGITAL ASSISTANT (DA - PS GRADE VI)",
        mobile: "8790044346",
        location: "NADIMURU"
      },
      {
        name: "K BHASKARIAH",
        position: "WELFARE & EDUCATION ASSISTANT (WEA)",
        mobile: "7799339098",
        location: "NADIMURU"
      },
      {
        name: "T SILAMBARASAN",
        position: "ENGINEERING ASSISTANT (ENA)",
        mobile: "8790407063",
        location: "NADIMURU"
      },
      {
        name: "I MUNILAVANAYA",
        position: "VILLAGE SURVEYOR (VS)",
        mobile: "9492423745",
        location: "NADIMURU"
      },
      {
        name: "M SOUNDHAR NAICK",
        position: "VILLAGE AGRICULTURE ASSISTANT (VAA)",
        mobile: "9000690536",
        location: "NADIMURU"
      },
      {
        name: "R. MOHANA",
        position: "AUXILIARY NURSE MIDWIFE (ANM)",
        mobile: "9502577062",
        location: "NADIMURU"
      },
      {
        name: "A SASI KUMARI",
        position: "GRAMA MAHILA SAMRAKSHANA KARYADARSI (GMSK)",
        mobile: "8179219629",
        location: "NADIMURU"
      },
      {
        name: "THANDAVA KRISHNA",
        position: "PANCHAYAT SECRETARY (PS GRADE V)",
        mobile: "8919143396",
        location: "NOOLAKUNTA"
      },
      {
        name: "V KOKILA",
        position: "DIGITAL ASSISTANT (DA - PS GRADE VI)",
        mobile: "9705465341",
        location: "NOOLAKUNTA"
      },
      {
        name: "M BUVANESHWARI",
        position: "WELFARE & EDUCATION ASSISTANT (WEA)",
        mobile: "9393932355",
        location: "NOOLAKUNTA"
      },
      {
        name: "JANARDHAN REDDY",
        position: "VILLAGE REVENUE OFFICER (VRO)",
        mobile: "6304117826",
        location: "NOOLAKUNTA"
      },
      {
        name: "R INDRAJA",
        position: "VILLAGE SERICULTURE ASSISTANT (VSA)",
        mobile: "9553641834",
        location: "NOOLAKUNTA"
      },
      {
        name: "A SREELAKSHMI",
        position: "PANCHAYAT SECRETARY (PS GRADE III)",
        mobile: "9703323857",
        location: "PAIALYAM"
      },
      {
        name: "M DURGA BHAVANI",
        position: "WELFARE & EDUCATION ASSISTANT (WEA)",
        mobile: "6300355326",
        location: "PAIALYAM"
      },
      {
        name: "MONICA RAJYAM",
        position: "VILLAGE SURVEYOR (VS)",
        mobile: "9492075540",
        location: "PAIALYAM"
      },
      {
        name: "B ASMIN",
        position: "VILLAGE HORTICULTURE ASSISTANT (VHA)",
        mobile: "7337249974",
        location: "PAIALYAM"
      },
      {
        name: "B SUNEETHA",
        position: "AUXILIARY NURSE MIDWIFE (ANM)",
        mobile: "8978628959",
        location: "PAIALYAM"
      },
      {
        name: "KARTHIK",
        position: "DIGITAL ASSISTANT (DA - PS GRADE VI)",
        mobile: "9908199072",
        location: "PAIALYAM"
      },
      {
        name: "SAMARAJ",
        position: "PANCHAYAT SECRETARY (PS GRADE IV)",
        mobile: "8008786117",
        location: "PEDDABANGARUNATHAM"
      },
      {
        name: "C SURESH",
        position: "DIGITAL ASSISTANT (DA - PS GRADE VI)",
        mobile: "9490474394",
        location: "PEDDABANGARUNATHAM"
      },
      {
        name: "V KANAKA",
        position: "WELFARE & EDUCATION ASSISTANT (WEA)",
        mobile: "7569605105",
        location: "PEDDABANGARUNATHAM"
      },
      {
        name: "M VIJAYA KUMAR",
        position: "ENGINEERING ASSISTANT (ENA)",
        mobile: "9866217615",
        location: "PEDDABANGARUNATHAM"
      },
      {
        name: "B SELVAN NAIK",
        position: "VILLAGE SURVEYOR (VS)",
        mobile: "8639236145",
        location: "PEDDABANGARUNATHAM"
      },
      {
        name: "G RAMESH REDDY",
        position: "VILLAGE SERICULTURE ASSISTANT (VSA)",
        mobile: "9538601550",
        location: "PEDDABANGARUNATHAM"
      },
      {
        name: "T RAJESH",
        position: "VILLAGE FISHERIES ASSISTANT (VFA)",
        mobile: "9398065593",
        location: "PEDDABANGARUNATHAM"
      },
      {
        name: "T LAVANYA",
        position: "GRAMA MAHILA SAMRAKSHANA KARYADARSI (GMSK)",
        mobile: "8374734815",
        location: "PEDDABANGARUNATHAM"
      },
      {
        name: "H A SHAFEERULLA",
        position: "VILLAGE REVENUE OFFICER (VRO GR-1)",
        mobile: "7981146166",
        location: "PEDDABANGARUNATHAM"
      },
      {
        name: "RAVI ASHOK",
        position: "PANCHAYAT SECRETARY (PS GRADE V)",
        mobile: "9441995711",
        location: "URLAOBANAPALLI"
      },
      {
        name: "V VINOD BABU",
        position: "DIGITAL ASSISTANT (DA - PS GRADE VI)",
        mobile: "9951775866",
        location: "URLAOBANAPALLI"
      },
      {
        name: "K SARAVANA KUMAR",
        position: "WELFARE & EDUCATION ASSISTANT (WEA)",
        mobile: "6300290371",
        location: "URLAOBANAPALLI"
      },
      {
        name: "GOVINDA RAJULU",
        position: "VILLAGE REVENUE OFFICER (VRO)",
        mobile: "9533737660",
        location: "URLAOBANAPALLI"
      },
      {
        name: "T SRINIVASULU",
        position: "VILLAGE SURVEYOR (VS)",
        mobile: "9490980717",
        location: "URLAOBANAPALLI"
      },
      {
        name: "M MURUGA NAIK",
        position: "VILLAGE AGRICULTURE ASSISTANT (VAA)",
        mobile: "7702486455",
        location: "URLAOBANAPALLI"
      },
      {
        name: "N BHUVANESWAR",
        position: "VETERINARY /ANIMAL HUSBANDRY ASSISTANT (VAHA)",
        mobile: "8074130065",
        location: "URLAOBANAPALLI"
      },
      {
        name: "V M THIRUMALESWARI",
        position: "AUXILIARY NURSE MIDWIFE (ANM)",
        mobile: "6301855363",
        location: "URLAOBANAPALLI"
      },
      {
        name: "P KRISHNAVENI",
        position: "GRAMA MAHILA SAMRAKSHANA KARYADARSI (GMSK)",
        mobile: "9966661019",
        location: "URLAOBANAPALLI"
      },
      {
        name: "SIVAPPA",
        position: "PANCHAYAT SECRETARY (PS GRADE V)",
        mobile: "9398271788",
        location: "VANAGUTTAPALLI"
      },
      {
        name: "K V THARUN KUMAR",
        position: "DIGITAL ASSISTANT (DA - PS GRADE VI)",
        mobile: "9848474861",
        location: "VANAGUTTAPALLI"
      },
      {
        name: "B RAJAMMA",
        position: "WELFARE & EDUCATION ASSISTANT (WEA)",
        mobile: "9902456323",
        location: "VANAGUTTAPALLI"
      },
      {
        name: "B SUBHASHINI",
        position: "VILLAGE REVENUE OFFICER (VRO)",
        mobile: "9154456975",
        location: "VANAGUTTAPALLI"
      },
      {
        name: "B PRASANNA KUMARI",
        position: "VILLAGE SERICULTURE ASSISTANT (VSA)",
        mobile: "9676377467",
        location: "VANAGUTTAPALLI"
      },
      {
        name: "B SHEKAR",
        position: "VETERINARY /ANIMAL HUSBANDRY ASSISTANT (VAHA)",
        mobile: "9700306767",
        location: "VANAGUTTAPALLI"
      },
      {
        name: "T PRIYA",
        position: "GRAMA MAHILA SAMRAKSHANA KARYADARSI (GMSK)",
        mobile: "9347733913",
        location: "VANAGUTTAPALLI"
      },
      {
        name: "K SUGUNA",
        position: "PANCHAYAT SECRETARY (PS GRADE IV)",
        mobile: "9121744390",
        location: "VENDUGAMPALLI"
      },
      {
        name: "V RAJAPPA",
        position: "PANCHAYAT SECRETARY (PS GRADE V)",
        mobile: "7989882354",
        location: "VENDUGAMPALLI"
      },
      {
        name: "J THANGARAJU",
        position: "DIGITAL ASSISTANT (DA - PS GRADE VI)",
        mobile: "9515909710",
        location: "VENDUGAMPALLI"
      },
      {
        name: "R NARASIMHULU",
        position: "WELFARE & EDUCATION ASSISTANT (WEA)",
        mobile: "6281693776",
        location: "VENDUGAMPALLI"
      },
      {
        name: "M R KARTHIKEYAN",
        position: "VILLAGE HORTICULTURE ASSISTANT (VHA)",
        mobile: "9948933742",
        location: "VENDUGAMPALLI"
      },
      {
        name: "S. GNANESWARI",
        position: "VETERINARY /ANIMAL HUSBANDRY ASSISTANT (VAHA)",
        mobile: "7989983393",
        location: "VENDUGAMPALLI"
      },
      {
        name: "INDARLA DHANAMMA",
        position: "AUXILIARY NURSE MIDWIFE (ANM)",
        mobile: "9676858423",
        location: "VENDUGAMPALLI"
      },
      {
        name: "D GOPAL GOWDU",
        position: "PANCHAYAT SECRETARY (PS GRADE V)",
        mobile: "9573580431",
        location: "GARIGACHINNEPALLI"
      },
      {
        name: "Y HAREESH",
        position: "WELFARE &  EDUCATION ASSISTANT (WEA)",
        mobile: "9177109937",
        location: "GARIGACHINNEPALLI"
      },
      {
        name: "K J BHARATH KUMAR",
        position: "DIGITAL ASSISTANT (DA - PS GRADE VI)",
        mobile: "9676207918",
        location: "GARIGACHINNEPALLI"
      },
      {
        name: "D SWATHI",
        position: "VETERINARY /ANIMAL HUSBANDRY ASSISTANT (VAHA)",
        mobile: "7095288689",
        location: "GARIGACHINNEPALLI"
      },
      {
        name: "P.BHUDEVI",
        position: "VILLAGE SURVEYOR",
        mobile: "9676045930",
        location: "GARIGACHINNEPALLI"
      },
      {
        name: "R BHANU PRAKASH",
        position: "VILLAGE AGRICULTURAL ASSISTANT",
        mobile: "8332941124",
        location: "GARIGACHINNEPALLI"
      },
      {
        name: "V BABU",
        position: "VILLAGE REVENUE OFFICER",
        mobile: "6304167532",
        location: "GARIGACHINNEPALLI"
      },
      {
        name: "N PUSHPAMBA",
        position: "AUXILIARY NURSE MIDWIFE (ANM)",
        mobile: "9391024718",
        location: "GARIGACHINNEPALLI"
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-gray-900">Departments</h1>
          
          <Tabs defaultValue="administration" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
              <TabsTrigger value="administration">Administration</TabsTrigger>
              <TabsTrigger value="elected">Elected Representatives</TabsTrigger>
              <TabsTrigger value="mandal">Mandal Officers</TabsTrigger>
              <TabsTrigger value="sachivalayam">Sachivalayam Staff</TabsTrigger>
            </TabsList>
            
            <TabsContent value="administration" className="mt-6">
              <DepartmentCard
                title="Mandal Office Administration"
                staff={departments["Mandal Office Administration"]}
              />
            </TabsContent>
            
            <TabsContent value="elected" className="mt-6">
              <ElectedRepresentatives
                data={departments["Elected Representatives"] as any}
              />
            </TabsContent>
            
            <TabsContent value="mandal" className="mt-6">
              <DepartmentCard
                title="Mandal Level Officers"
                staff={departments["Mandal Level Officers"]}
              />
            </TabsContent>
            
            <TabsContent value="sachivalayam" className="mt-6">
              <DepartmentCard
                title="Sachivalayam Staff"
                staff={departments["Sachivalayam Staff"]}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Staff;
