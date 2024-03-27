import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, Routes, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule } from '@angular/forms';
import { CarikomikComponent } from './carikomik/carikomik.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { KategoriComponent } from './kategori/kategori.component';
import { KomikService } from './komik.service';
import { IonicStorageModule } from '@ionic/storage-angular';
import { HttpClientModule } from '@angular/common/http';
import { KategoriService } from './kategori.service';
import { BacakomikComponent } from './bacakomik/bacakomik.component';
import { KomikkategoriComponent } from './komikkategori/komikkategori.component';
import { CommentComponent } from './comment/comment.component';
import { ServiceWorkerModule } from '@angular/service-worker';

const appRoutes = [
  { path: 'carikomik', component: CarikomikComponent },
  { path: 'favourites/:id', component: FavouritesComponent },
  { path: 'kategori', component: KategoriComponent },
  { path: 'bacakomik/:id', component: BacakomikComponent },
  { path: 'komikkategori/:id', component: KomikkategoriComponent },
  { path: 'comment/:id', component: CommentComponent },
];

@NgModule({
  declarations: [AppComponent, CarikomikComponent, FavouritesComponent, KategoriComponent, BacakomikComponent, KomikkategoriComponent, CommentComponent],
  imports: [IonicStorageModule.forRoot(), RouterModule.forRoot(appRoutes), FormsModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: !isDevMode(),
  // Register the ServiceWorker as soon as the application is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
})],
  providers: [KomikService, KategoriService, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
