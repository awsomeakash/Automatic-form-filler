const puppeteer = require('puppeteer');
const { fillFormField, fillCheckBox, uploadFile } = require('./helpers/formHelper.js');
const fs = require('fs');
const yaml = require('js-yaml');

async function openForm() {
    const browser = await puppeteer.launch({ 
        headless:  false, 
        args: ['--no-sandbox', '--disable-setuid-sandbox'] 
    });
    const page = await browser.newPage();

    try {
        await page.goto('https://bukabantuan.bukalapak.com/form/175');

        // Loading values for form from the yaml file
        const configFilePath = './config/formConfig.yaml';
        const formConfig = yaml.load(fs.readFileSync(configFilePath, 'utf8'));

        // Fill form using configuration object
        await fillFormField(page, '#name', formConfig.name);
        await fillFormField(page, '#email', formConfig.email);
        await fillFormField(page, 'input[name="merek"]', formConfig.merek);
        await fillFormField(page, 'input[name="nomor_registrasi"]', formConfig.nomor_registrasi);
        await fillFormField(page, 'input[name="nama_pemilik"]', formConfig.nama_pemilik);
        await fillFormField(page, 'input[name="hubungan_pelapor"]', formConfig.hubungan_pelapor);
        await fillFormField(page, 'input[name="nama_perusahaan"]', formConfig.nama_perusahaan);
        await fillFormField(page, 'input[name="website_perusahaan"]', formConfig.website_perusahaan);
        await fillFormField(page, 'input[name="alamat_perusahaan"]', formConfig.alamat_perusahaan);
        await fillFormField(page, 'input[name="alamat_email_pemilik_merek"]', formConfig.alamat_email_pemilik_merek);
        await fillFormField(page, 'input[name="no_telepon_pelapor"]', formConfig.no_telepon_pelapor);
        await fillFormField(page, 'input[name="link_barang"]', formConfig.link_barang);
        await fillFormField(page, 'textarea[name="body"]', formConfig.body);

        await fillCheckBox(page, 'input[value="Iya (Yes)"]');
        //Handling file upload
        await uploadFile(page, '#link_barang_banyak', formConfig.link_barang_banyak_path);
        await uploadFile(page, '#surat_kepemilikan_merek', formConfig.surat_kepemilikan_merek_path);
        await uploadFile(page, '#bukti_surat_kuasa', formConfig.bukti_surat_kuasa_path);
        await uploadFile(page, '#bukti_surat_izin_usaha', formConfig.bukti_surat_izin_usaha_path);

        await fillCheckBox(page, 'input[type="checkbox"]');


        await page.click('button[type="submit"]');
        await page.waitForTimeout(1000);

        const errorMessageSelector = 'div.bl-snackbar.is-active.is-error';
        const errorMessage = await page.$(errorMessageSelector).catch(() => null);
    
        if (errorMessage) {
            console.error('Form submission failed!');
        } else {
            console.log('Form submitted successfully!');
        }
    } catch (error) {
        console.error('Error occurred:', error);
    } finally {
        await browser.close();
    }
}

openForm();
