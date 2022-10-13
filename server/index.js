import { writeFile, readFile } from 'fs/promises';
import express from 'express';
import cors from 'cors';

const GOODS_PATH = './static/goods.json'
const BASKET_GOODS_PATH = './static/basket-goods.json'

function getGoods() {
  return readFile(GOODS_PATH, 'utf-8').then((file) => JSON.parse(file))
}
function getRawBasketGoods() {
  return readFile(BASKET_GOODS_PATH, 'utf-8').then((file) => JSON.parse(file))
}

function getBasketGoods() {
  return Promise.all([
    getRawBasketGoods(),
    getGoods()
  ]).then(([ basketGoods, goods ]) => {
    return basketGoods.map((_basketGood) => {
      const _good = goods.find(({ id }) => id === _basketGood.id);
      return {
        ..._basketGood,
        data: _good,
        total: _good.price * _basketGood.count
      }
    })
  })
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.get('/goods', (res, req) => {
  getGoods().then((goods) => {
    req.send(JSON.stringify(goods));
  })
});

app.get('/basketgoods', (res, req) => {
  getBasketGoods().then((basketGoods) => {
    req.send(JSON.stringify(basketGoods))
  });
});

app.post('/basketgoods', (res, req) => {
  getRawBasketGoods().then((basketGoods) => {
    let hasGod = false;
    const result = basketGoods.map((basketGood) => {
      if (basketGood.id === res.body.id) {
        hasGod = true;
        return {
          ...basketGood,
          count: basketGood.count + 1
        }
      } else {
        return basketGood
      }
    })
    if (!hasGod) {
      result.push({
        id: res.body.id,
        count: 1
      })
    }

    writeFile(BASKET_GOODS_PATH, JSON.stringify(result)).then(() => {
      getBasketGoods().then((basketGoods) => {
        req.send(JSON.stringify(basketGoods))
      });
    })
  })
});

app.delete('/basketgoods', (res, req) => {
  getRawBasketGoods().then((basketGoods) => {
    return basketGoods.map((basketGood) => {
      if (basketGood.id === res.body.id) {
        return {
          ...basketGood,
          count: basketGood.count - 1
        }
      } else {
        return basketGood;
      }
    }).filter(({ count }) => count > 0);
  }).then((result) => {
    return writeFile(BASKET_GOODS_PATH, JSON.stringify(result)).then(() => {
      getBasketGoods().then((basketGoods) => {
        req.send(JSON.stringify(basketGoods))
      });
    })
  })
});

app.listen('8000', () => {
  console.log('server is starting!')
});