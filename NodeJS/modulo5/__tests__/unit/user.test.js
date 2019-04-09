/* eslint-disable no-undef */
const bcrypt = require('bcryptjs');

const { User } = require('../../src/app/models');
const truncate = require('../utils/truncate');

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should encrypt user password', async () => {
    const user = await User.create({
      name: 'Daigo',
      email: 'daigo@god.com',
      password: '12345'
    });

    const compareHash = await bcrypt.compare('12345', user.password_hash);

    expect(compareHash).toBe(true);
  });
});