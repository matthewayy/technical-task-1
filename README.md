npm##Info
-Testy som sa rozhodol pisat pomocou Playwright+Typescript, kedze ma tento framework poslednu dobu dost bavi

##Obsah
- 4 zakladne testy na otestovanie zakladnej funkcionality. V kazdom teste su zakomentovane steps.
- UserValidity test - na overenie ci zadavame spravne username a password
- Login/Logout test - na overenie ci funguje login a logout spravne 
- AddToCart test - na overenie ci vieme produkty pridat a odstranit z kosika
- Checkout test - na overenie ci objednavka prebehla uspesne

##Poziadavky
- Node.js v24.11.0
- npm v 11.6.1

##Install
git clone https://github.com/matthewayy/technical-task-1
cd techtask
npm install
npx playwright install

##Run
##bash 
npm test
npm run:test --headed
## VSCode 
npx playwright test
npx playwright test --headed ##spusti v headed mode
npx playwright show-report
