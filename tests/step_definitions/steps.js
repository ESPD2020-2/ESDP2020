const { I } = inject();
// Add in your custom step files

Given('я нахожусь на странице регистрации', () => {
  I.amOnPage('/register');
});

Given('я нахожусь на странице логина', () => {
  I.amOnPage('/login');
});

When('я заполняю поля формы:', table => {
  const tableData = table.parse().rawData;

  tableData.forEach((row) => {
    I.fillField(row[0], row[1]);
  });
});

When('выберем позицию на карте', () => {
  I.click("//div[contains(@class,'leaflet-container')]");
});

When('нажимаю на кнопку {string}', name => {
  I.wait(1);
  I.click(name);
});

When('нажимаю на иконку еще', () => {
  I.click();
});

Then('я вижу текст {string}', text => {
  I.waitForText(text);
});

Given('я нахожусь на странице заказа', () => {
  I.amOnPage('/add-order');
});
