import { test, expect, selectors } from '@playwright/test';

//Test Scenario 1
test('Test Scenario 1 : Simple Form Demo', async ({ page },testInfo) => {
  await page.goto('https://www.lambdatest.com/selenium-playground/');
  await page.getByText("Simple Form Demo").click();
  let valuetoenterActual = 'Welcome to LambdaTest';
  await page.getByPlaceholder('Please enter your Message').fill(valuetoenterActual);
  await page.getByRole('button', { name: 'Get Checked Value' }).click();

  await testInfo.attach("success",{
    body: await page.screenshot({fullPage: true}),
    contentType: "image/png",
  });

  await expect(page.locator('#message')).toHaveText(valuetoenterActual);
  // let actualValue = await page.locator('#message').textContent();
  // await expect(page.locator('#message')).toHaveText('test') //used to test negative scenario
});

//Test Scenario 2
test('Test Scenario 2 : Drag & Drop Sliders', async ({ page },testInfo) => {
  await page.goto('https://www.lambdatest.com/selenium-playground/');
  await page.getByText("Drag & Drop Sliders").click();
  const slider = await page.locator('//*[@id="slider3"]/div/input');
  let slidervalueTarget = '95';
  let slidervalueObj = await page.locator('//*[@id="rangeSuccess"]');
  let slidervalue = await page.locator('//*[@id="rangeSuccess"]').textContent();
  console.log(slidervalue);

  const sliderWidth = await slider.evaluate(el => {
    return el.getBoundingClientRect().width
  })

  await slider.hover({ force: true, position: { x: 0, y: 0 } })
  await page.mouse.down()
  await slider.hover({ force: true, position: { x: sliderWidth * ((parseInt(slidervalueTarget)-2)/100)  , y: 0 } })
  await page.mouse.up()

  await testInfo.attach("success",{
    body: await page.screenshot({fullPage: true}),
    contentType: "image/png",
  });
  
  slidervalue = await page.locator('//*[@id="rangeSuccess"]').textContent();
  console.log("slider value after move : " + slidervalue);

  await expect(slidervalueObj).toHaveText(slidervalueTarget);
  // await expect(slidervalueObj).toHaveText('94'); //negative validation

  // let srcBound = await slider.boundingBox();
  // if (srcBound) {
  // await page.mouse.move(srcBound.x + srcBound.width * 15 / 100, srcBound.y + srcBound.height / 2);
  // await page.mouse.down();
  // console.log("slidervalue mouse down : " + slidervalue);
  // await page.mouse.move(srcBound.x + srcBound.width * 93/100, srcBound.y + srcBound.height / 2);
  // slidervalue = await page.locator('//*[@id="rangeSuccess"]').textContent();
  // console.log("slidervalue mouse move : " + slidervalue);
  // await page.mouse.up();
  // slidervalue = await page.locator('//*[@id="rangeSuccess"]').textContent();
  // console.log("slidervalue mouse up : " + slidervalue);
  // }



    // while(!istargetreached){
    //   console.log("Entered While Loop")
    //   let srcBound = await slider.boundingBox();
    //   console.log("srcBound : " + srcBound);
    //   if (srcBound) {
    //     console.log(srcBound.x);
    //     console.log(srcBound.width);
    //     console.log(srcBound.y);
    //     console.log(srcBound.height);
    //     await page.mouse.move(srcBound.x + srcBound.width / 2, srcBound.y + srcBound.height / 2);
    //     await page.mouse.down();
    //     console.log("slidervalue mouse down : " + slidervalue);
    //     await page.mouse.move(srcBound.x + srcBound.width / 2, srcBound.y + srcBound.height / 2);
    //     console.log("slidervalue mouse move : " + slidervalue);
    //     await page.mouse.up();
    //     slidervalue = await page.locator('//*[@id="rangeSuccess"]').textContent();
    //     console.log("slidervalue mouse up : " + slidervalue);
    //     if (slidervalue == '51') {
    //       istargetreached = true;
    //     } 
    //   }
    // }


  });
   


//Test Scenario 3
test('Test Scenario 3 : Input Forms', async ({ page }, testInfo) => {
  const expectedsuccessMessage = 'Thanks for contacting us, we will get back to you shortly.';
  await page.goto('https://www.lambdatest.com/selenium-playground/');
  await page.getByText("Input Form Submit").click();
  await page.locator('//*[@id="name"]').fill('Vinodh');
  await page.locator('//*[@id="inputEmail4"]').fill('abc@abc.com');
  await page.getByPlaceholder('Password').fill('password');
  await page.getByPlaceholder('Company').fill('CTS');
  await page.getByPlaceholder('Website').fill('CTS@company.com');
  await page.locator('//*[@id="seleniumform"]/div[3]/div[1]/select').selectOption('GB');
  await page.getByPlaceholder('City').fill('London');
  await page.getByPlaceholder('Address 1').fill('1 Street');
  await page.getByPlaceholder('Address 2').fill('Lewisham');
  await page.getByPlaceholder('State').fill('UK');
  await page.getByPlaceholder('Zip code').fill('SE1 2EY');
  await page.getByRole('button', { name: 'Submit' }).click();

  await testInfo.attach("success",{
    body: await page.screenshot({fullPage: true}),
    contentType: "image/png",
  });

  const successMessageObj = await page.locator('//*[@id="__next"]/div/section[2]/div/div/div/div/p');
  const actualsuccessMessage = await successMessageObj.textContent();
  console.log(actualsuccessMessage);
  await expect(successMessageObj).toHaveText(expectedsuccessMessage);
  // await expect(successMessageObj).toHaveText('test negative scenario');
});