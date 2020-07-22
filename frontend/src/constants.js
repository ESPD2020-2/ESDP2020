export const links = [
  {path: '/add-order', name: 'заказать доставку'},
  {path: '/about', name: 'о нас'},
  {path: '/faq', name: 'faq'},
  {path: '/contacts', name: 'контакты'},
];

export const admLinks = [
  {path: '/orders/created', name: 'Заказы', role: ['admin', 'super_admin', 'operator']},
  {path: '/orders/published', name: 'Опубликованные', role: ['admin', 'super_admin','courier']},
  {path: '/orders/accepted', name: 'В процессе', role: ['admin', 'super_admin', 'operator']},
  {path: '/orders/courier/accepted', name: 'Мои заказы', role: ['courier']},
  {path: '/trecking', name: 'Трэкинг', role: ['admin', 'super_admin', 'operator']},
  {path: '/users', name: 'Сотрудники', role: ['admin', 'super_admin']}
];

export const timeUnit = [
  {id: 1, title: 'Сегодня', value: 'today'},
  {id: 2, title: 'На этой неделе', value: 'week'},
  {id: 3, title: 'За месяц', value: 'month'},
  {id: 4, title: 'За год', value: 'year'},
];

export const revenueStatus = ['Ожидаемый доход','Полученный доход','Упущенный доход'];
// eslint-disable-next-line no-extend-native
Date.prototype.daysInMonth = function() {
  return 33 - new Date(this.getFullYear(), this.getMonth(), 33).getDate();
};
const daysInMonth = new Date().daysInMonth() +1;

const getTimeUnitArr = (begin, count, option) => {
  const currYear = new Date().getFullYear();
  const currMonth = new Date().getMonth();

  const timeUnitArr = [];
  let data = [currYear,currMonth,];
  if (count === 24 ) {
    data = [2020,1,1,] 
  } else if (count === 9) {
    data = [2020,5,] 
  } else if (count === 12) {
    data = [currYear,]
  }
  
   for (let i=begin;i<count;i++) {
     count === 24 
     ? timeUnitArr.push(new Date(...data,i).toLocaleString('ru', option)+':00' )
     : timeUnitArr.push(new Date(...data,i).toLocaleString('ru', option))
   }
   return timeUnitArr
 }

export const scales = {
  today: getTimeUnitArr(0, 24, {hour: '2-digit'}),
  week: getTimeUnitArr(2,9, {weekday: 'long', timeZone: 'UTC'}),
  month: getTimeUnitArr(1, daysInMonth, {day: 'numeric'}),
  year: getTimeUnitArr(0, 12, {month: 'long'}),
}

export const staff = {
  all: ['admin', 'operator', 'super_admin', 'courier'],
  adm: ['admin', 'super_admin'],
  admAndOper: ['operator', 'admin', 'super_admin'],
  onlyOper: ['operator'],
  onlyCourier: ['courier']
}

export const localization = {
  header: {
    actions: 'Действия'
  },
  pagination: {
    labelRowsSelect: 'записей на странице',
    firstTooltip: 'К первой странице',
    previousTooltip: 'Предыдущая',
    nextTooltip: 'Следующая',
    lastTooltip: 'К последней странице',
  },
  body: {
    emptyDataSourceMessage: 'Нет данных',
    addTooltip: 'Добавить',
    deleteTooltip: 'Удалить',
    editTooltip: 'Редактировать',
    editRow: {
      deleteText: 'Вы уверены что хотите удалить эту запись?',
      cancelTooltip: 'Отмена',
      saveTooltip: 'Сохранить' 
    }
  },
  toolbar: {
    searchTooltip: 'Поиск',
    searchPlaceholder: 'Введите текст для начала поиска'
  }
}