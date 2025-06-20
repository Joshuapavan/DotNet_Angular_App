import { Routes } from '@angular/router';
import { Home } from './_components/home/home';
import { Register } from './_components/register/register';
import { MemberList } from './_components/members/member-list/member-list';
import { MemberDetail } from './_components/members/member-detail/member-detail';
import { Lists } from './_components/lists/lists';
import { Messages } from './_components/messages/messages';
import { authGuard } from './_gaurds/auth-guard';
import { Login } from './_components/login/login';
import { Base } from './_components/base/base';
import { TestErrors } from './_components/test-errors/test-errors';
import { NotFound } from './_components/not-found/not-found';
import { ServerError } from './_components/server-error/server-error';

export const routes: Routes = [
  { path: '', component: Base },
  { path: 'register', component: Register },
  { path: 'login', component: Login },
  { path: 'home', component: Home },
  { path: 'errors', component: TestErrors },
  { path: 'not-found', component: NotFound },
  { path: 'server-error', component: ServerError },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      { path: 'members', component: MemberList },
      { path: 'member/:username', component: MemberDetail },
      { path: 'lists', component: Lists },
      { path: 'messages', component: Messages },
    ],
  },
  { path: '**', component: Home, pathMatch: 'full' },
];
