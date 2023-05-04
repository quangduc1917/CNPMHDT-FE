import { BrowserModule } from '@angular/platform-browser';
import { enableProdMode, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageRouterRoutes } from './routes/page-router.routing';
import { FooterComponent } from './components/footer/footer.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { ManagerUsersComponent } from './components/manager-users/manager-users.component';
import { NgbDropdown, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import '@angular/localize/init';
import { DashBroadComponent } from './components/dash-broad/dash-broad.component';
import { ManagerBrandsComponent } from './components/manager-brands/manager-brands.component';
import { ManagerProductsComponent } from './components/manager-products/manager-products.component';
import { ProfileAdminComponent } from './components/profile-admin/profile-admin.component';
import { ClientHeaderComponent } from './components/user/components/client-header/client-header.component';
import { HomeComponent } from './components/user/pages/home/home.component';
import { BrandProductComponent } from './components/user/components/brand-product/brand-product.component';
import { TrendingProductComponent } from './components/user/components/trending-product/trending-product.component';
import { ProductOneComponent } from './components/user/components/product-one/product-one.component';
import { ProductInfoComponent } from './components/user/components/product-info/product-info.component';
import { ProductTwoComponent } from './components/user/components/product-two/product-two.component';
import { IconInfoComponent } from './components/user/components/icon-info/icon-info.component';
import { ClientFooterComponent } from './components/user/components/client-footer/client-footer.component';
import { CartComponent } from './components/user/pages/cart/cart.component';
import { CategoryComponent } from './components/user/pages/category/category.component';
import { ProductComponent } from './components/user/pages/product/product.component';
import { Page404Component } from './components/page404/page404.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { authInterceptorProviders } from './helper/auth.interceptor';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ManagerOrderComponent } from './components/manager-order/manager-order.component';
import { ManagerStatisticalComponent } from './components/manager-statistical/manager-statistical.component';
import { ManagerNotifyComponent } from './components/manager-notify/manager-notify.component';
import { ChartsModule } from 'ng2-charts';









enableProdMode();
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    EditProductComponent,
    NavBarComponent,
    SideBarComponent,
    ManagerUsersComponent,
    ManagerBrandsComponent,
    DashBroadComponent,
    ManagerProductsComponent,
    ProfileAdminComponent,
    ClientHeaderComponent,
    HomeComponent,
    BrandProductComponent,
    TrendingProductComponent,
    ProductOneComponent,
    ProductInfoComponent,
    ProductTwoComponent,
    IconInfoComponent,
    ClientFooterComponent,
    CartComponent,
    CategoryComponent,
    ProductComponent,
    Page404Component,
    ManagerOrderComponent,
    ManagerStatisticalComponent,
    ManagerNotifyComponent


  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    PageRouterRoutes,
    NgbModule,
    NgxPaginationModule,
    NgSelectModule,
    ImageCropperModule,
    ChartsModule
  ],
  providers: [
    authInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
