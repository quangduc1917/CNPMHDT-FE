import { Routes, RouterModule } from '@angular/router';
import { DashBroadComponent } from '../components/dash-broad/dash-broad.component';
import { EditProductComponent } from '../components/edit-product/edit-product.component';
import { ManagerBrandsComponent } from '../components/manager-brands/manager-brands.component';
import { ManagerNotifyComponent } from '../components/manager-notify/manager-notify.component';
import { ManagerOrderComponent } from '../components/manager-order/manager-order.component';
import { ManagerProductsComponent } from '../components/manager-products/manager-products.component';
import { ManagerStatisticalComponent } from '../components/manager-statistical/manager-statistical.component';
import { ManagerUsersComponent } from '../components/manager-users/manager-users.component';
import { Page404Component } from '../components/page404/page404.component';
import { ProfileAdminComponent } from '../components/profile-admin/profile-admin.component';
import { CartComponent } from '../components/user/pages/cart/cart.component';
import { CategoryComponent } from '../components/user/pages/category/category.component';
import { HomeComponent } from '../components/user/pages/home/home.component';
import { ProductComponent } from '../components/user/pages/product/product.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'managerusers', component: ManagerUsersComponent, },
  { path: 'dashbroad', component: DashBroadComponent, },
  { path: 'managerbrands', component: ManagerBrandsComponent },
  { path: 'managerproducts', component: ManagerProductsComponent },
  { path: 'adminprofile', component: ProfileAdminComponent },
  { path: 'home', component: HomeComponent },
  { path: 'cart', component: CartComponent },
  { path: 'products/:key', component: CategoryComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'edit/:id', component: EditProductComponent },
  { path: 'managerorders', component: ManagerOrderComponent},
  { path: 'managernotify', component: ManagerNotifyComponent},
  { path: 'managerstatistical', component: ManagerStatisticalComponent},
  { path: '**', component: Page404Component },
  
  



];

export const PageRouterRoutes = RouterModule.forChild(routes);
