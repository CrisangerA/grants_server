import axios from 'axios';
import puppeteer from 'puppeteer';
import cheerio from 'cheerio';
import log from '../helpers/log';

const names = ['opportunity_number', 'opportunity_title', 'agency', 'opportunity_status', 'posted_date', 'close_date'];
const button = 'a[title="Click Next Page"]';
const container = '#synopsisDetailsContent fieldset';

export const getDataFromWebsite = async () => {
  try {
    console.log("Opening the browser......");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const uri = await getUrlFromIframe();
    await page.goto(`https://www.grants.gov${uri}`, {// #jp=shvsp&cp=1&searchParams={"startRecordNum":0,"sortBy":"openDate|desc","oppStatuses":"forecasted|posted"}
      waitUntil: 'networkidle2'
    });
    //await page.screenshot({ path: 'example.png' });

    let grants = [];
    for (let k = 0; k < 40; k++) { // 40 * 25 rows = 1000
      const items = await getDataFromTable(page);
      grants = [...grants, ...items];
      //console.log(grants.length);
      //console.log(items);
      // Click next page
      await page.click(button);
      // await for new data table
      await page.waitForSelector('#searchResultsDiv table.grid tr');
    }

    // Cerramos el puppeteer
    await browser.close();
    return grants;
  } catch (e) {
    log.createLog(e, ['scrap.controller.js', 'getDataFromWebsite()'])
  }
}

export const getDetailFromGrant = async (oppid) => {
  try {
    console.log("Opening the browser......");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    //const uri = await getUrlFromIframe();
    //const oppid = 329450;
    await page.goto(`https://www.grants.gov/custom/viewOppDetails.jsp?oppId=${oppid}`, { waitUntil: 'networkidle2' });
    await page.waitForSelector(container);
    let detail = {};
    // Select rows left
    const lrows = await page.$$(`${container} #synopsisDetailsGeneralInfoTableLeft table tr`);
    for (let i = 0; i < lrows.length; i++) {
      const title = await lrows[i].$eval('th', fieldset => fieldset.textContent);
      const value = await lrows[i].$eval('td', fieldset => fieldset.textContent);
      detail = { ...detail, [title.replace(/ /g, "").slice(0, -1)]: value };
      //console.log(title + ' ' + value);
    }

    // Select rows right
    const rrows = await page.$$(`${container} #synopsisDetailsGeneralInfoTableRight table tr`);
    for (let i = 0; i < rrows.length; i++) {
      const title = await rrows[i].$eval('th', fieldset => fieldset.textContent);
      const value = await rrows[i].$eval('td', fieldset => fieldset.textContent);
      detail = { ...detail, [title.replace(/ /g, "").slice(0, -1)]: value };
    }
    // Other section
    const eligibility = await page.$$(`${container} #synopsisDetailsEligibilityTable table tr`);
    for (let i = 0; i < eligibility.length; i++) {
      const title = await eligibility[i].$eval('th', fieldset => fieldset.textContent);
      const value = await eligibility[i].$eval('td', fieldset => fieldset.textContent);
      detail = { ...detail, [title.replace(/ /g, "").slice(0, -1)]: value };
    }
    // Other section
    const additional = await page.$$(`${container} #synopsisDetailsAdditionalInfoTable table tr`);
    for (let i = 0; i < additional.length; i++) {
      const title = await additional[i].$eval('th', fieldset => fieldset.textContent);
      const value = await additional[i].$eval('td', fieldset => fieldset.textContent);
      detail = { ...detail, [title.replace(/ /g, "").slice(0, -1)]: value };
    }

    //console.log(detail);
    return detail;
  } catch (e) {

  }
}

export const getDataFromTable = async (page) => {
  try {
    //  Get rows for table
    const rows = await page.$$('#searchResultsDiv table.grid tr');
    let items = [];
    // Each rows
    for (let i = 0; i < rows.length; i++) {
      if (i !== 0) {
        const href = await rows[i].$eval('td a', a => a.getAttribute('href'));
        // Get list text from cell
        const cells = await rows[i].$$eval('td', xcells => xcells.map((cell, ind) => cell.textContent));
        let xrow = {};
        for (let j = 0; j < cells.length; j++) {
          xrow = { ...xrow, [names[j]]: cells[j] };
        }
        xrow = { ...xrow, href: href.substring(26, 32) };
        items.push(xrow);
        //console.log(xrow);
        //console.log(xrow.length);
      }
    }
    return items;
  } catch (e) {
    log.createLog(e, ['scrap.controller.js', 'getDataFromTable()'])
  }
}

export const getUrlFromIframe = async () => {
  try {
    const res = await axios.get('https://www.grants.gov/web/grants/search-grants.html');
    const $ = getContextHtml(res.data);
    return $('iframe').attr('src');
  } catch (e) {
    log.createLog(e, ['scrap.controller.js', 'getUrlFromIframe()'])
  }
}

export const getContextHtml = (data) => {
  try {
    return cheerio.load(data, { normalizeWhitespace: false });
  } catch (e) {
    log.createLog(e, ['scrap.controller.js', 'getDataFromWebsite()'])
  }
}























// Other =====================================================================================
// cheerio
export const xgetDataFromWebsite = async () => {
  try {
    const uri = await getUrlFromIframe();
    const res = await axios.get(`https://www.grants.gov${uri}`);
    const $ = getContextHtml(res.data);
    $('body').find('table').children('tbody').children().map((_, el) => {
      el = $(el);
      console.log(el.html());
      console.log('====================');
    });
  } catch (e) {

  }
}



        //const cells = await rows[i].$$('td');
        // for (let j = 0; j < cells.length; j++) {
        //   //const element = cells[j];
        //   const y = cells[j].asElement().
        //   console.log(await cells[j].$eval('a', i => i));
        // }
        // const id = await rows[i].$eval('td', el => el.textContent);
        // const on = await rows[i].$eval('td', el => el.nextSibling.textContent);
        // const a = await rows[i].$eval('td', el => el.nextSibling.nextSibling.textContent);
        // const os = await rows[i].$eval('td', el => el.nextSibling.nextSibling.nextSibling.textContent);
        // const pd = await rows[i].$eval('td', el => el.nextSibling.nextSibling.nextSibling.nextSibling.textContent);
        // const cd = await rows[i].$eval('td', el => el.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.textContent);
        // items.push({ id, on, a, os, pd, cd });

        //rows[0].$$eval('td', el => el.map((it,i) => it.textContent))

                  // for (let j = 0; j < cell.length; j++) {
          //   const element = cell[j];
          //   console.log(element.textContent);
          //   // switch (j) {
          //   //   case 0:
          //   //     zz.id = element.textContent;
          //   //     break;
          //   //   case 1:
          //   //     zz.on = element.textContent;
          //   //   case 2:
          //   //     zz.a = element.textContent;
          //   //   default:
          //   //     break;
          //   // }
          //   //element.textContent
          // }
          //items.push(zz);