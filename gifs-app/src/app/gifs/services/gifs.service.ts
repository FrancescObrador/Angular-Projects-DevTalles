
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Gif, SearchResponse } from '../interfaces/gifs.interface';

@Injectable({providedIn: 'root'})
export class GifsService {
    
    public gifsList: Gif[] = []

    private _tagsHistory: string[] = []
    private apiKey: string = 'MMcViUXnvjQEpLAeDtSjVwQTQ0KXNUKr'
    private serviceUrl: string = 'https://api.giphy.com/v1/gifs'
    private gifLimit: number = 12

    constructor(private http: HttpClient) { 
        this.loadLocalStorage() 
    }

    get tagsHistory(){
        return [...this._tagsHistory]
    }

    private organizeHistory(tag: string):void{
        tag = tag.toLowerCase()
        if(this._tagsHistory.includes(tag)){
            this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag )
        }
        this._tagsHistory.unshift(tag)
        this._tagsHistory = this._tagsHistory.splice(0,this.gifLimit)
        this.saveLocalStorage()
    }

    private saveLocalStorage():void{
        localStorage.setItem('history', JSON.stringify(this._tagsHistory))
    }

    private loadLocalStorage():void{
        const data = localStorage.getItem('history')
        if(!data) return

        this._tagsHistory = JSON.parse(data)

        if(this._tagsHistory.length > 0)
            this.searchTag(this._tagsHistory.at(0)!)
    }

    searchTag(tag:string):void {
        if(tag.length === 0) return
        this.organizeHistory(tag)

        const params = new HttpParams()
        .set('api_key', this.apiKey)
        .set('limit', this.gifLimit.toString())
        .set('q',tag)

        this.http.get<SearchResponse>(`${this.serviceUrl}/search`, {params} )
        .subscribe(res => {
            this.gifsList = res.data
        })
    }
    
}