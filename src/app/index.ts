const express = require('express');
const app = express();
function isNotMatch(input: string, regex: RegExp): boolean {
  return !regex.test(input);
}

// 啟動服務
const PORT = process.env.PORT || 3000;
app.listen(PORT, (err:boolean) => {
  if(err){
    console.error(err);
  }
  console.log(`Server is running on http://localhost:${PORT}`);
});

// #region [路徑- get請求]
  // 默認根路徑
  app.get('/', (_req: any, res: any) => {
    res.send("<h1>Hello World</h1>");
  });
  // 重定向路徑:當沒有找到路徑時，重定向到根路徑
  app.get('/blog', (_req: any, res: any) => {
    res.redirect('/');
  });

  // 返回Json數據
  app.get('/api', (_req: any, res: any) => {
    res.json({
      name: 'John Doe',
      result:'ok' 
    });
  });

  // 返回html狀態碼
  app.get('/html', (_req: any, res: any) => {
    res.redirect(404,"/");
  });

  // 返回404
  app.get('/err', (_req: any, res: any) => {
    res.status(404).send('404 - Not Found');
    // res.status(404).end();
  });
// #endregion

// #region [路徑- post請求]
// 使用body-parser中間件
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.post("/login", (req: any, res: any) => {
  console.log(req.body);
  res.json({
    message: 'Login Success',
    data: req.body
  }); 
});
// Login Success  輸出結果
// Invoke-RestMethod -Uri "http://localhost:3000/login" -Method Post -ContentType "application/json" -Body '{"username":"admin","password":"admin"}'
// #endregion

// #region [顯示常用方法]
const http = require('http');
  app.get('/methods', (req: any, res: any) => {
    res.json({
      // http.METHODS: 返回所有HTTP方法
      methods: http.METHODS,
      // http.STATUS_CODES: 返回所有HTTP狀態碼"
      statusCodes: http.STATUS_CODES,
      // 顯示請求頭
      headers: req.headers,
      // hostname顯示主機名稱
      hostname: req.hostname,
      // 顯示請求IP
      ip:req.ip,
      // 顯示請求方法
      method:req.method,
      // 顯示請求協議
      protocol:req.protocol,
      // 顯示請求URL
      url:req.url,
      // 顯示請求參數
      params:req.params,
      // 顯示請求串
      query:req.query,
      // 顯示請求表單數據
      body:req.body, 
      // 顯示數組
      subdomains: req.subdomains,
      // http.globalAgent: 返回http.Agent對象，用於管理HTTP客戶端連接
      globalAgent: http.globalAgent,

    })
    res.send(http.METHODS);
  });
// #endregion

// #region [中間件]
  // 定義中間件
  const debug =(req: any, _res: any, next: any) => {
    console.log('I am a middleware', req.method, req.url);
    next(); // 調用下一個中間件
  };
  // 使用中間件
  app.use(debug);
// #endregion

// #region [驗證使用者身分]
const auth = (req: any, res: any, next: any) => {
  console.log("middleware auth -->", req.method, req.url, req.query);
  if(req.query.username == "admin")
    next();
  else
    res.status(403).send("Unauthorized");
}
// 前往http://localhost:3000/admin?username=admin就會通過驗證
app.get("/admin", auth, (req: any, res: any) => {
  res.send("Admin Page");
});
// #endregion

// #region [只給特定IP訪問API]
// 1.安裝cors模塊 npm install cors --save
// 2.引入cors模塊
const cors = require('cors');
// 類型1: 對所有路由啟用cors
// app.use(cors())
app.get("/search", cors(), (req: any, res: any) => {
  res.send("search page");
});
// 類型2: 只對特定路由啟用cors
const corsOptions = {
  origin: 'http://ziting.com',
  // origin: 'http://localhost:3000/app/search',
  optionSuccessStatus: 200
};
// app.use(cors(corsOptions))
app.get("/app/search", cors(corsOptions), (req: any, res: any) => {
  if(req){
    res.send("search page");
  }else{
    res.send("nono page");
  
  }
});


// #endregion

