const $mainData = () => {

  const renderAnimeList = (arrayAnimes, ganres) => {
    // console.log('ganres: ', ganres);
    // console.log('arrayAnimes: ', arrayAnimes);

  }
  // выводит топ анимэ справа
  const renderTopAnime = (topAnime) => {
    const cardWrapper = document.querySelector('.filter__gallery');
    cardWrapper.innerHTML = '';

    topAnime.forEach((item) => {
      // 1-й вариант вставки
      //       cardWrapper.innerHTML += `
      //       <div class="product__sidebar__view__item set-bg mix day years"
      // data-setbg="img/trending/trend-1.jpg">
      // <div class="ep">18 / ?</div>
      // <div class="view"><i class="fa fa-eye"></i> 9141</div>
      // <h5><a href="anime-details.html">Boruto: Naruto next generations</a></h5>
      // </div>
      //      `;

      // 2-й вариант вставки
      cardWrapper.insertAdjacentHTML('afterbegin', `
       <div class="product__sidebar__view__item set-bg mix"
data-setbg="${item.image}">
<div class="ep">${item.rating} / 10</div>
<div class="view"><i class="fa fa-eye"></i> ${item.views}</div>
<h5><a href="anime-details.html">${item.title}</a></h5>
</div>
      `)

      // 1 способ,снова вызвать эту функцию
      // bgElements()

    });

    // проверяю scope функции и вызываю bgElements(),чтобы создались картинки,иначе пусто
    console.dir(renderTopAnime)

    cardWrapper.querySelectorAll('.set-bg').forEach((elem, index, array) => {
      const src = elem.dataset.setbg

      elem.style.backgroundImage = `url(${src})`

    })

  };


  const data = fetch('./db.json')
    .then(responce => {
      // console.log('responce: ', responce);
      return responce.json() //распаковка данных
    }).then(data => {
      // console.log('data:', );
      // let res = data.anime.sort((a, b) => {
      //   //демонстрация в консоли как работает
      //   console.log('id:', a.id, 'a:', a.views, 'id:', b.id, 'b:', b.views);
      //   console.log('a-b:', a.views - b.views);
      // })

      //сортирую массив по просмотрам от большего к меньшему
      let sortViews = data.anime.sort((a, b) => b.views - a.views);
      // методом splice отрезаю 5 самых просматриваемых от начала,они попадут в переменную topAnime
      //в виде массива из 5 элементов 
      let topAnime = sortViews.splice(0, 5);
      // отправляю в функцию данные
      renderTopAnime(topAnime)

      // 1 способ:удалить дубли в массиве с помощью коллекции,туда попадут уникальные элементы
      const ganres = new Set();
      data.anime.forEach((elem) => {

        // add - метод коллекции,в нее записываю жанры
        ganres.add(elem.ganre)
      });

      // глянуть методы коллекции в прототипе
      // console.log('ganres: ', ganres);

      // передаю в функцию массив с анимэ и коллекцию жанров 
      renderAnimeList(data.anime, ganres)


      // 2 способ:удалить дубли в массиве с помощью метода фильтр
      // const ganres = [];

      // data.anime.forEach((anime) => {
      //   ganres.push(anime.ganre)
      // });

      // let clearGanres = ganres.filter((one, index) => {
      //   return ganres.indexOf(one) === index
      // });

      // console.log('clearGanres: ', clearGanres);


    });

};

$mainData()

// удалить дубли в массиве с помощью метода фильтр
// let arr3 = ['мишка', 'заяц', 'мишка', 'лампа', 'рыба', 'торт', 'заяц']
// let clearGanres = arr3.filter((one, index) => {

//   // код ниже покажет дубли слова,indexOf всегда возращает индекс по которому слово уже найдено
//   console.log('word: ', arr3[arr3.indexOf(one)]);
// //если в результате сравнения index === arr3.indexOf(one) будет false элемент не попадает в массив
// //который вернет фильтр
//   console.log(one, 'index:', index, 'arr3.indexOf:', arr3.indexOf(one), 'сравнение:', arr3.indexOf(one) === index);
//   // return arr3.indexOf(one) === index
// });
// console.log('clearGanres: ', clearGanres) //вернет ['мишка', 'заяц', 'лампа', 'рыба', 'торт']


// другой пример распаковки массива
// const renderDate = async (data) => {
//   const obj = await data;
//   const anime = obj.anime;
//   console.log('anime: ', anime);

//   for (let i = 0; i < anime.length; i++) {
//     // console.log(`${i}:`, anime[i]);
//   }

// }
// const $mainData = async () => {
//   const data = await fetch('./db.json')
//   console.log('link status: ', data.status);
//   console.log('link ok: ', data.ok);

//   renderDate(data.json())

// }

// $mainData()


/*теория метода filter*/
// const array = [1,2,3,4,5]

/* 1)в колбэке всегда булевое значение,если true: item попадает в переменную newArray ,или false: то нет
2)еще filter всегда возращает массив*/
// const newArray = array.filter((item) => {
//   return item <=3
// })

/*сокращенная запись того что выше*/
// const newArray = array.filter((item) => item <=3)
// console.log('newArray-filter',newArray)

/*теория метода sort*/
// обычный sort() без колбэка внутри,преобразует числа в строки и сравнивает по кодовому весу

//кавычку ниже переместить вниз и раскомментится
/*
let arr = [1, 2, 15, 19, 3, 25];
let arr2 = arr.sort()
console.log('arr2: ', arr2);// вывод [1, 15, 19, 2, 25, 3]

// обычный sort(),с таким колбэком внутри,нормально отсортирует числа
let arr0 = [1, 2, 15, 19, 3, 25];
let arr3 = arr.sort((a, b) => {
  if (a > b) return 1;
  if (a == b) return 0;
  if (a < b) return -1;
}
)
console.log('arr3: ', arr3);// вывод [1, 2, 3, 15, 19, 25]

//sort(),с упрощенным колбэком внутри,нормально отсортирует числа как пример выше,если b - a обратный порядок будет
const array2 = [7, 5, 3, 2, 4, 1, 6]
const newArray2 = array2.sort((a,b) => a - b)
// сортирует массив по возрастанию

console.log('newArray2-sort', newArray2)

// работа sort с объектом в котором массивы
const obj = [

  {
    id: 2,
    value: 300
  },
  {
    id: 0,
    value: 100
  },
  {
    id: 1,
    value: 200
  }

]


//обычная запись
const sortArr = obj.sort((a, b) => {
  // console.log('a:', a)
  // console.log('b:', b)

  // сортирует по свойству value,я пока хз почему вычитать,но при таком варианте отсчет
  //от меньшего к большему,если нужно наоборот то b - a
  //метод возращает сортированные массив в переменную
  return a.value - b.value
})

// без колбэка ничего не выйдет
// console.log('sortArr:', sortArr)

//сокращенная запись

// const sortArr = obj.sort((a,b) => a.value - b.value)

// // без колбэка ничего не выйдет
// console.log('sortArr:',sortArr)


*/

// split делает массив из строк,2-ой аргумент говорит сколько слов брать массив,метод join делает наоборот
// let arrSplit = 'Вася, Петя, Маша, Саша'.split(', ', 3);
// console.log('arrSplit: ', arrSplit); //вернет [Вася, Петя, Маша]


/*замыкания*/
// let y = 20;
// function one(x, z) {
//   console.log(x + y + z);
//   function three() {
//     console.log('3:', x, z, y);
//   }
//   three();
//   console.dir(three);
// };

// function two() {
//   let z = 100 + y;
//   one(67, z)

// };

// two();
// console.dir(one);
// console.dir(two);

