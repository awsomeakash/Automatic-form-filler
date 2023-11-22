async function fillFormField(page, selector, value) {
    await page.type(selector, value);
}

async function fillCheckBox(page, selector) {
    await page.waitForSelector(selector);
    const checkbox = await page.$(selector);
    if (checkbox) {
        await checkbox.click();
    } else {
        console.error('Checkbox element not found!');
    }
}

async function uploadFile(page, selector, filePath) {
    await page.waitForSelector(selector);
    const [fileChooser] = await Promise.all([
        page.waitForFileChooser(),
        page.click(selector)
    ]);
    await fileChooser.accept([filePath]);
    await page.waitForTimeout(2000); 
}

module.exports = {
    fillFormField,
    fillCheckBox,
    uploadFile,
};
