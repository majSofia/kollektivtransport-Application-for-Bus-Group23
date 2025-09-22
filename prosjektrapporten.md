## **prosjektraporten** 

*Vi har bestemt å bruke Github hosting tjeneste, hovedgrunnen til dette at Github er brukervennlig og at vi har brukte det mye på våres studie linje, så vi er litt vant med, en ting til at kansje det blir lettere for veileder og emneansvarlig å få tilgang til koden.
vi har lagt en repository som er public*
[kollektivtransoprt GitHub link](https://github.com/majSofia/kollektivtransport-Application-for-Bus-Group23.git)

### **Branching-strategi:**
*vi har tenkt til å ha en renslig kode, reyddig og unngå koden problem, vi har tenkt å bruke den enkelste strategi avhengig av 3 hovedtyper av branches:*
1. Main
2. Develop
3.  feature/branch (funcjonelt branch)

*la oss å beskrive en kort besekrivelsen om de tre branches*
* ##### **main:**
*Som vi vet at Main/Master barnch skapet allerede når man lage new repositery, på dette branche ingen kan jobber direkte.
Main må innholde den siste version, stabil av koden av prosjektet, vi legger koden her  når en sprint er avsluttet og prosjektet er klart for levering.*
* ##### **Develop:**
*I denne branchen samler vi alle nye kode fra våres utviklene, Når noen av våre utvikler har laget en ny funksjon,  legger vi den inn her på develop branch.
Det er den nyeste versjonen, men den kan fortsatt ha noen småfeil som vi må fikse.*
* ##### **feature/branch:**
*Under den develop branch, vi har noe som heter feature så dette på en måte kan vi kalles også funksjonalitet branch, det betyr at hvert medllemer av våres utvikler har egen branch som å jobbe med, for eksempel: Mahmoud har feature/login og Majed har feature/map,
så man kan jobbe i ro uten å krasje med hverandre arbied.
Det er viktig at når man er ferdig med å skrive koden på denne branchen, bør man teste koden til å sjekkke at alt funker som det skal, deretter man kan push dette inn i develop branch-en.*

*Gjennom å bruke denne strategien, så vi beholde at prosjektet vårt er ryddig, og redusere risiko konflikter i koden.
grunnen til det at hver utvikler har egen branch/funksjonalitet, så blir lettere å finne feil og prøve å fikse dette.*