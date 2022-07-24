import ejs from 'ejs';
import path from 'path';
import pupperteer from 'puppeteer';
import { IDepositOrder } from '../interfaces/wallet.interfaces';
import CustomError from './CustomError';

const makepdf = (/* operation: IDepositOrder */) => {
  const filePath = path.join(__dirname, 'template.ejs');

  ejs.renderFile(filePath, {/* ...operation */}, (err, data) => {
    if (err) {
      throw new CustomError(500, 'Erro na leitura do arquivo');
    } else {
      return data;
    }
  });
};

const getPdf = async () => {
  const browser = await pupperteer.launch()
  const boleto = await browser.newPage()

  await boleto.goto('http://localhost:3002/', {
    waitUntil: 'networkidle0'
  })
  const pdf = boleto.pdf({
    printBackground: true,
    format: 'Letter'
  })
  await browser.close()
  return pdf
}

export default {
  makepdf,
  getPdf
};




