export const ENV_CONFIG = {
  'process.env.HOST_API': JSON.stringify(process.env.HOST_API || 'http://localhost:9080'),
  'process.env.CUSTOMER_API': JSON.stringify(process.env.CUSTOMER_API || '/api/customers'),
  'process.env.ORDER_API': JSON.stringify(process.env.ORDER_API || '/api/orders'),
  'process.env.FILE_ID': JSON.stringify(process.env.FILE_ID || 'http://192.168.99.100:3014/api/files'),
  'process.env.GOOGLE_BOOKS_API': JSON.stringify(process.env.GOOGLE_BOOKS_API || 'https://www.googleapis.com/books/v1/volumes'),
  'process.env.GOOGLE_BOOKS_API_KEY': JSON.stringify(process.env.GOOGLE_BOOKS_API_KEY || 'AIzaSyBDXNcM4j1zuzyv0lEIb7O_5LgOP3uRbp4')
};
