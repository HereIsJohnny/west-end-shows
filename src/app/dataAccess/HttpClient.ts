import { Observable } from 'rxjs'
import { ajax, AjaxResponse } from 'rxjs/ajax'

export class HttpClientClass {
  public get(url: string, headers?: object): Observable<AjaxResponse> {
    return ajax.get(this.addBaseUrl(url), { ...this.getDefaultHeaders(), ...headers })
  }

  public post(url: string, body?: any, headers?: object): Observable<AjaxResponse> {
    return ajax.post(this.addBaseUrl(url), body, { ...this.getDefaultHeaders(), ...headers })
  }

  public put(url: string, body?: any, headers?: object): Observable<AjaxResponse> {
    return ajax.put(this.addBaseUrl(url), body, { ...this.getDefaultHeaders(), ...headers })
  }

  public patch(url: string, body?: any, headers?: object): Observable<AjaxResponse> {
    return ajax.patch(this.addBaseUrl(url), body, { ...this.getDefaultHeaders(), ...headers })
  }

  public delete(url: string, headers?: object): Observable<AjaxResponse> {
    return ajax.delete(this.addBaseUrl(url), { ...this.getDefaultHeaders(), ...headers })
  }

  public getJSON<T>(url: string, headers?: object): Observable<T> {
    return ajax.getJSON(this.addBaseUrl(url), { ...this.getDefaultHeaders(), ...headers })
  }

  protected getDefaultHeaders() {
    return {
      'Content-Type': 'application/json',
    }
  }

  private addBaseUrl(url: string) {
    return `http://localhost:8000/api${url[0] === '/' ? '' : '/'}${url}`
  }
}

export const httpClient = new HttpClientClass()
