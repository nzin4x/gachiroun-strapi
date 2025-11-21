// history 컬렉션 샘플 데이터 자동 입력 스크립트
const fs = require('fs');
const path = require('path');

const axios = require('axios');

const dataPath = path.join(__dirname, '../data/history-sample.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

const API_URL = 'http://localhost:1337/api/histories';
const TOKEN = '1a6b324f8d6d2e9f7ba6e8518e2c05555e6349dbe6f0b6677c28468b267c63109c5e65758bbe659c16e414edc3d8f48152b398358edc485f053a71c901610e6de3a86eb364c24f671ff81ec14c1d171c6479703c328cd6a6c1c2a2448d935d2b1557b780de5166d4500cbd70dc5155afbdef8caa38091aa400ac84b832a97218';

(async () => {
  for (const item of data) {
    try {
      const res = await axios.post(
        API_URL,
        { data: item },
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Created:', res.data.data);
    } catch (err) {
      console.error('Error:', err.response?.data || err.message);
    }
  }
})();
