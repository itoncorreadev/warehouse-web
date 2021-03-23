import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ngxLoadingAnimationTypes, NgxLoadingModule } from "ngx-loading";
import { LoaderComponent } from "./loader.component";

@NgModule({
  declarations: [LoaderComponent],
  exports: [LoaderComponent],
  imports: [
    CommonModule,
    NgxLoadingModule.forRoot({
        animationType: ngxLoadingAnimationTypes.threeBounce,
        backdropBackgroundColour: 'rgba(0,0,0,0)',
        backdropBorderRadius: '14px',
        primaryColour: '#2752b8',
        secondaryColour: '#db1f1f',
        tertiaryColour: '#f0bc2e'
    })
  ]
})

export class LoaderModule {}
