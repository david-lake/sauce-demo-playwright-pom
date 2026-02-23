import { test } from '@fixtures/app.fixture';
import { users } from '@data/users';

test('standard user can login', async ({ app }) => {
  await app.login.visit();
  await app.login.login_as(users.standard);
  await app.products.assertLoaded();
});