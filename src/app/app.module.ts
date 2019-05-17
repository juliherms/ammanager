import { CoreModule } from './core/core.module'; //importacao do módulo core da aplicacao
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    CoreModule//modulo basico da aplicacao
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
