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
  I.wait(1);
  I.click("//div[contains(@class,'leaflet-container')]");
});

When('нажимаю на кнопку {string}', name => {
  I.wait(1);
  I.click(name);
});

When('нажимаю на кнопку добавления заказа', () => {
  I.amOnPage('/add-order')
});

When('нажимаю на кнопку еще', () => {
  I.click('//div[1]/div[3]/main/div[2]/div[2]/div/table/tbody/tr[1]/td[7]/div/button');
});

When('нажимаю на кнопку опубликовать', () => {
  I.click('//div[5]/div[3]/ul/span/li[2]');
});

When('нажимаю на кнопку удалить', () => {
  I.click('//div[5]/div[3]/ul/span/li[5]');
});

When('нажимаю на кнопку редактировать', () => {
  I.click('//div[5]/div[3]/ul/span/li[4]');
});

When('нажимаю на кнопку принять', () => {
  I.click('//div[5]/div[3]/ul/span/li[1]');
});

When('нажимаю на сам инпут', () => {
  I.click('//div[8]/div[3]/div/div[2]/div');
});

Then('я вижу текст {string}', text => {
  I.waitForText(text);
  I.wait(3)
});

Given('я нахожусь на странице заказа', () => {
  I.amOnPage('/add-order');
});

Given('я нахожусь на странице добавление пользователей', () => {
  I.amOnPage('/adm/users');
});
