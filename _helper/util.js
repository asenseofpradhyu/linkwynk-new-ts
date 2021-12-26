export default class Utility {
    static isAlwaysLogin(val){
      console.log(val)
      localStorage.setItem('alwaysLogin', val)
    }
  
    static getisAlwaysLogin(){
      localStorage.getItem('alwaysLogin')
    }
  
    static setUserId(val){
     localStorage.setItem('userId', val);
    }
  
    static getUserId(){
      return localStorage.getItem('userId')
    }
  
    static deleteUserId(){
      localStorage.removeItem('userId')
    }
  
    static setToken(val){
      localStorage.setItem('token', val)
    }
    static setName(val){
      localStorage.setItem('name', val)
    }
  
    static getToken(){
      return localStorage.getItem('token')
    }
  
    static deleteToken(){
      localStorage.removeItem('token')
    }
    static setLocalIteam(key,val){
      localStorage.setItem(key, val)
    }
    static getLocalIteam(key){
      console.log('get iteam'+key)
      return localStorage.getItem(key)
    }
    static deleteLocalIteam(key){
      localStorage.removeItem(key)
    }
  }