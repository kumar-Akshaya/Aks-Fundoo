import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl = "http://34.213.106.173/api/"

  postJSON(url: string, body: any): any {
   url=this.baseUrl+url;
   console.log()
   const httpOptions={
     headers : new HttpHeaders({
     'const-Type' : 'application/json',
     'Authorization':localStorage.getItem('token')
     })
   }
   return this.http.post(url,body,httpOptions)
  }

  postJSON1(url: string, body: any): any {
    url=this.baseUrl+url;
    console.log()
    const httpOptions={
      headers : new HttpHeaders({
      'const-Type' : 'application/json',
      })
    }
    return this.http.post(url,body,httpOptions)
   }

  getJSON(url) {
    url = this.baseUrl + url;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization':localStorage.getItem('token')
      })
    }
    return this.http.get(url, httpOptions)
  }
 
  static postRequest: any;
  constructor(private http: HttpClient) { }

  postRequest(url, data) {
    console.log("Datasssss");
    
    console.log(data);
    
    return this.http.post(this.baseUrl + url, data);
  }

  getEncodedData(toConvert){
   const formBody = [];
   for(const property in toConvert){
     const encodedKey= encodeURIComponent(property);
     const encodedValue=encodeURIComponent(toConvert[property]);
     formBody.push(encodedKey + '=' +encodedValue);
   }
   return formBody.join('&');
  }

  getRequest(url,data){
    console.log("get request");
    console.log(data);

    return this.http.get(this.baseUrl+url,data);
  }

  encodedPostForm(url: any, data: any){
    url=this.baseUrl+url;
    const httpOptions ={
      headers : new HttpHeaders({
      'content-Type' : 'application/x-www-form-urlencoded',
      'Authorization' : localStorage.getItem('token')
    })
    }
    return this.http.post(url, this.getEncodedData(data),httpOptions);
  }

  encodedGetForm(url: any) {
    url = this.baseUrl + url;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization' : localStorage.getItem('token')
      })
    };
    return this.http.get(url, httpOptions)
  }

  PostHeader(url: any, data: any){
    url=this.baseUrl+url;
    const httpOptions ={
      headers : new HttpHeaders({
      'content-Type' : 'application/x-www-form-urlencoded',
      'Authorization' : localStorage.getItem('token')

    })
    }
    return this.http.post(url,httpOptions);
  }
getHttp(url){
  const httpToken={
  headers : new HttpHeaders({
    'content-Type' : 'application/json',
    'Authorization' : localStorage.getItem('token')
  })
}
  return this.http.get(this.baseUrl+url,httpToken);
}
httpAddImage(url, body, token){
  url = this.baseUrl + url;
  var httpOptions = {
    headers: new HttpHeaders({
      'Authorization': token
    })
  };
  return this.http.post(url, body, httpOptions)
}
deletecollaborator(url){
  url = this.baseUrl + url;
  var httpOptions = {
    headers : new HttpHeaders({
      'content-Type' : 'application/json',
      'Authorization' : localStorage.getItem('token')
    })
  }
  return this.http.delete(url);
  };
  // return this.http.post(url, body, httpOptions)


}
