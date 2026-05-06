const { Builder, By, until } = require('selenium-webdriver');
const fs = require('fs');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function takeScreenshot(driver, filename) {
  const screenshot = await driver.takeScreenshot();
  fs.writeFileSync(filename, screenshot, 'base64');
  console.log(`Screenshot salvo: ${filename}`);
}

async function testeNavegacao() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // Página de login
    await driver.get('file:///C:/Users/anabe/Atividade Selenium/index.html');
    await sleep(3000);
    await takeScreenshot(driver, 'screenshot_login.png');

    // Ir para signup
    await driver.findElement(By.xpath("//a[contains(text(), 'Cadastre-se')]")).click();
    await driver.wait(until.urlContains('signup.html'), 5000);
    console.log('Navegou para signup.html');
    await sleep(3000);
    await takeScreenshot(driver, 'screenshot_signup.png');

    // Preencher signup
    await driver.findElement(By.id('nome')).sendKeys('Teste Usuario');
    await sleep(2000);
    await driver.findElement(By.id('email')).sendKeys('teste@gmail.com');
    await sleep(2000);
    await driver.findElement(By.id('senha')).sendKeys('123');
    await sleep(2000);
    await driver.findElement(By.id('senha2')).sendKeys('123');
    await sleep(2000);
    await driver.findElement(By.xpath("//button[contains(text(), 'Continuar')]")).click();

    await driver.wait(until.urlContains('otp.html'), 5000);
    console.log('Navegou para otp.html');
    await sleep(3000);
    await takeScreenshot(driver, 'screenshot_otp.png');

    // Digitar OTP
    await driver.findElement(By.id('d1')).sendKeys('1');
    await sleep(1000);
    await driver.findElement(By.id('d2')).sendKeys('2');
    await sleep(1000);
    await driver.findElement(By.id('d3')).sendKeys('3');
    await sleep(1000);
    await driver.findElement(By.id('d4')).sendKeys('4');
    await sleep(1000);
    await driver.findElement(By.xpath("//button[contains(text(), 'Verificar')]")).click();

    await driver.wait(until.urlContains('home.html'), 5000);
    console.log('OTP verificado, chegou em home.html');
    await sleep(3000);
    await takeScreenshot(driver, 'screenshot_home.png');

    // Ir para profile
    await driver.findElement(By.xpath("//a[.//strong[text()='Perfil']]")).click();
    await driver.wait(until.urlContains('profile.html'), 5000);
    console.log('Navegou para profile.html');
    await sleep(3000);
    await takeScreenshot(driver, 'screenshot_profile.png');

    // Voltar para home
    await driver.findElement(By.xpath("//button[contains(text(), 'Completo')]")).click();
    await driver.wait(until.urlContains('home.html'), 5000);
    console.log('Retornou para home.html');
    await sleep(3000);

    // Ir para fraudes
    await driver.findElement(By.xpath("//a[.//strong[text()='Fraudes']]")).click();
    await driver.wait(until.urlContains('fraudes.html'), 5000);
    console.log('Navegou para fraudes.html');
    await sleep(3000);
    await takeScreenshot(driver, 'screenshot_fraudes.png');

    // Ir para menu
    await driver.findElement(By.xpath("//button[contains(text(), 'Abrir menu')]")).click();
    await driver.wait(until.urlContains('menu.html'), 5000);
    console.log('Navegou para menu.html');
    await sleep(3000);
    await takeScreenshot(driver, 'screenshot_menu.png');

    // Logout
    await driver.findElement(By.xpath("//button[contains(text(), 'Sign Out')]")).click();
    await driver.wait(until.urlContains('index.html'), 5000);
    console.log('Fez sign out e voltou para index.html');
    await sleep(3000);
    await takeScreenshot(driver, 'screenshot_logout.png');
  } finally {
    await driver.quit();
  }
}

testeNavegacao();