export class KomikModel {
    public id: number;
    public judul: string;
    public sinopsis: string;
    public url_poster: string;
    public view: number;
    public total_ulasan: number;
    public rating: number;
    public ulasan: string;
    public user_name: string;
    public nilai: number;
    public idKomentar: number;

    constructor(id:number, judul:string, sinopsis:string, url_poster:string, view:number, total_ulasan:number){
        this.id = id;
        this.judul = judul;
        this.sinopsis = sinopsis;
        this.url_poster = url_poster;
        this.view = view;
        this.total_ulasan = total_ulasan;
        this.rating = 0;
        this.ulasan = "";
        this.user_name = "";
        this.nilai = 0;
        this.idKomentar = 0;

    }
}