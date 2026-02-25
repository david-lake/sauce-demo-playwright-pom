import { test } from '@fixtures/app.fixture';
import { users } from '@data/users';

import { test } from '@fixtures/app.fixture';
import { users } from '@data/users';

test.describe('Authentication tests', () => {

  test('standard user can login', async ({ app }) => {
    await app.login.visit();
    await app.login.loginAs(users.standard);
    await app.products.assertLoaded();
  });

  test('locked out user can not login', async ({ app }) => {
    await app.login.visit();
    await app.login.loginAs(users.locked);
    await app.login.assertLoaded();
    await app.login.assertError();
  });

});
